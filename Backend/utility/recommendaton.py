import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sqlmodel import Session, select
from schema.models import Product, Review
from db import engine

class ContentRecommenderWithReviews: 
    def __init__(self):
        # Load products
        with Session(engine) as session:
            products = session.exec(select(Product)).all()
            self.df = pd.DataFrame([p.dict() for p in products])

        self.df["description"] = self.df["description"].fillna("")

        # Precompute global TF-IDF for product descriptions
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.tfidf_matrix = self.vectorizer.fit_transform(self.df["description"])

    def recommend_for_user(self, user_id: int, top_k: int = 6):
        # Load reviews for this user
        with Session(engine) as session:
            reviews = session.exec(
                select(Review).where(Review.user_id == user_id, Review.rating > 0)
            ).all()

        if not reviews:
            return []  # cold start → no reviews yet

        # Build weighted user profile vector using ratings + comments
        user_profile = None
        total_weight = 0
        for r in reviews:
            idx = self.df[self.df["id"] == r.product_id].index
            if idx.empty:
                continue

            # Combine product description with user's review comment
            product_text = self.df.loc[idx[0], "description"]
            review_text = r.comment or ""
            combined_text = product_text + " " + review_text

            # Transform combined text into TF-IDF vector
            product_vec = self.vectorizer.transform([combined_text])

            # Weight by user rating
            weight = r.rating
            if user_profile is None:
                user_profile = weight * product_vec
            else:
                user_profile += weight * product_vec
            total_weight += weight

        if user_profile is None:
            return []

        user_profile /= total_weight  # normalize

        # Compute similarity with all products
        cosine_sim = linear_kernel(user_profile, self.tfidf_matrix).flatten()

        # Exclude already reviewed products
        reviewed_ids = {r.product_id for r in reviews}
        candidates = self.df[~self.df["id"].isin(reviewed_ids)].copy() 
        candidates["similarity"] = cosine_sim[~self.df["id"].isin(reviewed_ids)]

        # Get top-k recommendations
        recommendations = candidates.nlargest(top_k, "similarity")[[
            "id", "title", "category", "description", "image", "price", "stock"
        ]].to_dict(orient="records")

        return recommendations



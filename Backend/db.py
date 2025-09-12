from sqlmodel import Session, create_engine, SQLModel
import pandas as pd

from models import Product

DB_NAME = "mboakako.db"
DB_URL = f"sqlite:///{DB_NAME}"

connect_args = {"check_same_thread":False}
engine = create_engine(DB_URL, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

df = pd.read_csv("products_clean.csv")
with Session(engine) as session:
    for _, row in df.iterrows():
        product = Product(
            title=row["title"],
            description=row["description"],
            price=row["price"],
            stock=row["stock"],
            image=row["image"],
            category=row["category"],
        )
        session.add(product)
    session.commit()

print("success")


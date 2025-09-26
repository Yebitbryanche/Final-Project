// SearchBar.tsx

import React, { useState, useEffect } from "react"; // React + hooks
import { useNavigate } from "react-router-dom"; // used to navigate to /market with results
import { api } from "../API/Registration"; // your axios instance (keeps baseURL, interceptors, etc.)
import { IoSearchSharp } from "react-icons/io5"; // search icon

// TypeScript product type - adjust if your backend sends different fields
interface ProductType {
  id: number;
  title?: string;
  description?: string; 
  category?: string; 
  price?: number;
  image?: string; 
}

const SearchBar: React.FC = () => {
  // Controlled input state for the search query
  const [query, setQuery] = useState<string>(""); // current text in search input

  const [products, setProducts] = useState<ProductType[]>([]); // all products list

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products for search:", err);
      }
    };

    fetchProducts(); // actually run the fetch
  }, []); // empty dependency array -> runs only once on mount

  const performSearch = (q: string) => {
    const normalizedQuery = q.trim().toLowerCase();

    // If query is empty, decide behavior: here we return all products (so blank shows everything).
    // If you prefer blank to show nothing, return [] instead.
    if (!normalizedQuery) return products;

    // Filter products: build a combined text (title + description + category),
    // make it lowercase and check if it includes the normalized query.
    const results = products.filter((product) => {
      const haystack =
        ((product?.title ?? "") + " " + (product?.description ?? "") + " " + (product?.category ?? ""))
          .toLowerCase();

      // returns true if any of those fields contain the query substring
      return haystack.includes(normalizedQuery);
    });

    return results; // return the filtered array
  };

  // handleSubmit: called when the form is submitted (Enter pressed or search button clicked)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form navigation / page reload

    // get filtered results using performSearch
    const filteredResults = performSearch(query);

    // navigate to the market page and pass the search results via router state
    navigate("/market", { state: { searchResults: filteredResults } });
  };

  return (
    // Use a form so Enter triggers the onSubmit handler automatically
    <form onSubmit={handleSubmit} className="flex items-center ml-4">
      {/* Controlled input field: value comes from `query`, onChange updates `query` */}
      <input
        type="text"
        placeholder="Search products..."
        // styling classes — keep your existing styles
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary text-sm w-[200px]"
        value={query} // controlled input value
        onChange={(e) => setQuery(e.target.value)} // update query as user types
        // optional accessibility hint
        aria-label="Search products"
      />

      {/* submit button: clicking this triggers the form's onSubmit */}
      <button
        type="submit" // submitting the form (also activated by Enter)
        className="px-3 py-2 bg-secondary text-white rounded-r-md font-semibold hover:bg-secondary/90 transition"
      >
        <IoSearchSharp size={21} /> {/* the search icon */}
      </button>
    </form>
  );
};

export default SearchBar; // export component as default




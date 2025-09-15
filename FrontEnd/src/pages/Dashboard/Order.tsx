import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/mboakakologo.png";
import UserAvatar from '../../components/UseAvatar';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "Pending" | "Complete";
}

function Order() {
  const [Products, SetProducts] = useState<Product[]>([]);

  // fake data set for testing
  useEffect(() => {
    const fakeData: Product[] = [
      { id: 1, name: "Wireless Mouse", category: "Electronics", price: 12000, status: "Pending" },
      { id: 2, name: "Leather Wallet", category: "Accessories", price: 8000, status: "Complete" },
      { id: 3, name: "Running Shoes", category: "Footwear", price: 25000, status: "Pending" },
      { id: 4, name: "Smartphone", category: "Electronics", price: 120000, status: "Complete" },
      { id: 5, name: "Backpack", category: "Bags", price: 18000, status: "Pending" }, 
    ];
    setTimeout(() => SetProducts(fakeData), 500);
  }, []);

  return (
    <div className=" p-4 md:p-6 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl shadow-md px-4 py-4 md:px-6 gap-3 md:gap-0">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl md:text-3xl text-gray-800">Orders</h1>
          <p className="text-sm md:text-base text-primary">
            All Products Ordered
            <hr className='text-primary w-24 md:w-36 mt-1'/>
          </p>
        </div>
        <UserAvatar />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
        {Products.length === 0 ? (
          <p className="text-center text-gray-400 py-6 text-lg">
            No recent data
          </p>
        ) : (
          <table className="min-w-[600px] md:min-w-full w-full table-auto border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-tertiary text-secondary">
                <th className="p-3 text-left text-sm md:text-base">Product</th>
                <th className="p-3 text-left text-sm md:text-base">Category</th>
                <th className="p-3 text-left text-sm md:text-base">Price</th>
                <th className="p-3 text-left text-sm md:text-base">Status</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((product, i) => (
                <tr
                  key={product.id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
                >
                  <td className="p-2 md:p-3 text-sm md:text-base">{product.name}</td>
                  <td className="p-2 md:p-3 text-sm md:text-base">{product.category}</td>
                  <td className="p-2 md:p-3 text-sm md:text-base">{product.price} XAF</td>
                  <td className="p-2 md:p-3 text-sm md:text-base">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                        product.status === "Complete"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Order;

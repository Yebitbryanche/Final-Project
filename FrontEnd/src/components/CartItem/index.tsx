import React, { useState } from "react";

type Props = {
  item: {
    id: string;
    description: string;
    price: number;
    image: string;
  };
  onQuantityChange: (id: string, quantity: number) => void;
};

const CartItem = ({ item, onQuantityChange }: Props) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const sizes = [38, 39, 40, 41, 42, 43, 44, 45];
  const discountedPrice = item.price * 0.9;

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // React.ChangeEvent<HTMLInputElement> tells TypeScript that this event is coming from an <input> element.
    const value = parseInt(e.target.value);
    // coonvert string to num
    if (value > 0) {
      onQuantityChange(item.id, value);
      // This tells the parent component:
      // Hey, update the quantity of item 652XAF to 3.
    } else {
      onQuantityChange(item.id, 0);
      // If the user types 0, -5, or something invalid, this sets the quantity to 0.
      // It’s a safety check to prevent negative or empty values from breaking your cart logic.
    }
  };
  //   This function runs when the user types a quantity into the input field for a product. It:
  // Reads the number the user typed
  // Makes sure it’s valid (greater than 0)
  // Sends that number to the parent component using onQuantityChange

  return (
    <div className="flex items-start mb-6 border-b border-gray-300 pb-4">
      <img src={item.image} alt="Product" className="w-30 h-50 rounded" />
      {/* producty detail section */}
      <div className="ml-4 text-base text-black w-full">
        <p>{item.description}</p>

        <label className="block mt-2">
          Color:
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="ml-2 border px-2 py-1 rounded text-sm"
          >
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
          </select>
        </label>

        <p className="mt-2">Size:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-1 border rounded text-sm ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {/* Price Display */}
        <p className="font-bold text-black mt-2">{discountedPrice} XAF</p>
        {/* Shows the price after discount (e.g. 8100 XAF) */}
        <input
          type="number"
          min={1}
          placeholder="enter the qtt"
          className="mt-2 w-full border border-black rounded px-2 py-1"
          onChange={handleQuantityInput}
          // onChange is a React event handler. It runs a function whenever the user changes something—like typing in an input box or selecting a dropdown option.
        />
      </div>
    </div>
  );
};

export default CartItem;
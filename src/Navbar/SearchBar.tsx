import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState([]);

  const fetchData = async (value: string) => {
    try {
      const response = await fetch(
        "https://assignment-3-l2-ten.vercel.app/api/facility"
      );
      const json = await response.json();
      const data = Array.isArray(json) ? json : json.data || [];

      const filteredResults = data.filter(
        (product: any) =>
          value &&
          product &&
          product.name &&
          product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResult(filteredResults);
      setIsOpen(filteredResults.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsOpen(false);
    }
  };

  const navigate = useNavigate();
  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  const handleSelect = (product: any) => {
    navigate(`/facility/${product._id}`, { state: { product } });
    setIsOpen(false);
    setInput("");
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div>
        <input
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          placeholder="Search..."
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
      {isOpen && result.length > 0 && (
        <ul className="absolute mt-2 w-full border border-gray-300 rounded-md shadow-lg bg-white z-50">
          {result.map((product: any) => (
            <li key={product._id}>
              <div
                onClick={() => handleSelect(product)}
                className="block px-4 py-2 text-sm cursor-pointer hover:bg-slate-300 transition-colors duration-200"
              >
                {product.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

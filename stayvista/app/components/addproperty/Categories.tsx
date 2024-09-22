import { FiHome } from "react-icons/fi";

interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ dataCategory, setCategory }) => {
  const categories = ['Beach', 'Villas', 'Cabins', 'Tiny Homes'];

  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      {categories.map((category) => (
        <div
          key={category}
          onClick={() => setCategory(category)}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
            ${
              dataCategory === category
                ? 'border-gray-800 opacity-100' // Active styling (underline and full opacity)
                : 'border-white opacity-60' // Inactive styling
            } 
            hover:opacity-100 hover:border-gray-200 cursor-pointer`}
        >
          <FiHome size={20} /> {/* Home icon */}
          <span className="text-xs">{category}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;

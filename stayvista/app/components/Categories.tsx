'use client'

import { FiHome } from "react-icons/fi"; // Import the home icon
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal"
import { useState } from "react";

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bathrooms: searchModal.query.bathrooms,
            bedrooms: searchModal.query.bedrooms,
            category: _category,
        }

        searchModal.setQuery(query);
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div onClick={() => _setCategory('')} className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <FiHome size={20} /> {/* Home icon */}
                <span className="text-xs">All</span>
            </div>

            <div onClick={() => _setCategory('Beach')} className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <FiHome size={20} /> {/* Home icon */}
                <span className="text-xs">Beach</span>
            </div>

            <div onClick={() => _setCategory('Villas')} className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <FiHome size={20} /> {/* Home icon */}
                <span className="text-xs">Villas</span>
            </div>

            <div onClick={() => _setCategory('Cabins')} className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <FiHome size={20} /> {/* Home icon */}
                <span className="text-xs">Cabins</span>
            </div>

            <div onClick={() => _setCategory('Tiny Homes')} className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <FiHome size={20} /> {/* Home icon */}
                <span className="text-xs">Tiny Homes</span>
            </div>
        </div>
    )
}

export default Categories;

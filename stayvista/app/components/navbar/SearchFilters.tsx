'use client'
import { FiSearch } from 'react-icons/fi';
import useSearchModal from "@/app/hooks/useSearchModal"

const SearchFilters = () => {
    const searchModal=useSearchModal();
  return (
    <div onClick={()=>searchModal.open('location')} className="h-[64px] flex flex-row items-center justify-between border rounded-full">
        <div className="hidden lg:block">
            <div className="flex flex-row items-center justify-between">

                <div className="h-[64px] px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center cursor-pointer">
                    <p className="text-xs font-semibold">Where</p>
                    <p className="text-sm">Wanted Location</p>
                </div>

                <div className="h-[64px] px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center cursor-pointer">
                    <p className="text-xs font-semibold">Check in</p>
                    <p className="text-sm">Add dates</p>
                </div>

                <div className="h-[64px] px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center cursor-pointer">
                    <p className="text-xs font-semibold">Check out</p>
                    <p className="text-sm">Add dates</p>
                </div>

                <div className="h-[64px] px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center cursor-pointer">
                    <p className="text-xs font-semibold">Who</p>
                    <p className="text-sm">Add guests</p>
                </div>
            </div>
        </div>

        <div className="p-2">
            <div className="p-4 bg-stayvista rounded-full text-white transition hover:bg-stayvista-dark cursor-pointer">
            <FiSearch className="text-white w-4 h-4" />
            </div>
        </div>
    </div>
  )
}

export default SearchFilters

'use client'
import useAddPropertyModal from "@/app/hooks/useAddPropertyModel";

const AddPropertyButton = () =>{

    const addPropertyModal =useAddPropertyModal();

    const stayvistaYourHome=()=>{
        addPropertyModal.open();
    }
    return (
        <div onClick={stayvistaYourHome} className="p-2 bg-stayvista text-white text-sm font-semibold rounded-xl cursor-pointer hover:bg-stayvista-dark transition">
            Stayvista Your Home
        </div>
    )
}

export default AddPropertyButton;
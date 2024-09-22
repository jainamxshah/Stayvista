'use client'

import Image from "next/image"
import Modals from "./Modals"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModel"
import useLoginModal from "@/app/hooks/useLoginModal"
import CustumButton from "../forms/CustumButton"
import Categories from "../addproperty/Categories"
import { ChangeEvent, useState } from "react"
import SelectCountry,{SelectCountryValue} from "../forms/SelectCountry"
import apiService from "@/app/services/apiServices"
import { useRouter } from "next/navigation"

interface AddPropertyButtonProps{
    userId?: string|null;
}
 
const AddPropertyModal:React.FC<AddPropertyButtonProps> = ({userId}) => {
    const [currentStep,setCurrentStep]=useState(1);
    const [dataCategory,setDataCategory]=useState('')
    const [dataTitle,setDataTitle]=useState('')
    const [dataDescription,setDataDescription]=useState('')
    const [dataPrice,setDataPrice]=useState('')
    const [dataBedrooms,setDataBedrooms]=useState('')
    const [dataBathrooms,setDataBathrooms]=useState('')
    const [dataGuests,setDataGuests]=useState('')
    const [dataCountry,setDataCountry]=useState<SelectCountryValue>()
    const [dataImage,setDataImage]=useState<File | null>(null)

    const addPropertyModal = useAddPropertyModal()
    const loginModal = useLoginModal()
    const router=useRouter()

    const setCategory = (category: string)=>{
        setDataCategory(category)
    }

    const setImage=(event: ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files && event.target.files.length>0){
            setDataImage(event.target.files[0])
        }
    }

    const submitForm = async() =>{
        console.log("submit form")

        if(
            dataCategory &&
            dataTitle &&
            dataDescription &&
            dataPrice &&
            dataCountry &&
            dataImage
        ){
            console.log("hel")
            const formData = new FormData()
            formData.append("category",dataCategory)
            formData.append("title",dataTitle)
            formData.append("description",dataDescription)
            formData.append("price_per_night",dataPrice)
            formData.append("bedrooms",dataBedrooms)
            formData.append("bathrooms",dataBathrooms)
            formData.append("guests",dataGuests)
            formData.append("country",dataCountry.label)
            formData.append("country_code",dataCountry.value)
            formData.append("image",dataImage)

            console.log(formData)

            const response= await apiService.post('/api/properties/create/',formData)

            if(response.success){
                console.log("Property created successfully")
                setCurrentStep(1)

                router.push('/')

                addPropertyModal.close()
                window.location.reload();
            }else{
                console.error("Error creating property: ",response.data)
            }
        }
    }

    const stayvistaYourHome=()=>{
        if(userId){
            addPropertyModal.open()
        }else{
            loginModal.open()
        }
    }

    const content=(
        <>
            {currentStep==1?(
                <>
                    <h2 className="mb-6 text-2xl">Choose Category</h2>
                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category)=>setCategory(category)}
                    />
                    <CustumButton
                        classname={"w-full sm:w-auto"}
                        onClick={()=>{setCurrentStep(2)}}
                        label="Next"
                    />
                </>
            ): currentStep==2?(
                <>
                    <h2 className="mb-6 text-2xl">Describe your place</h2>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={dataTitle}
                                onChange={(e)=>setDataTitle(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={dataDescription}
                                onChange={(e)=>setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>
                    <CustumButton
                        classname={"w-full sm:w-auto mb-2 bg-black hover:bg-gray-800"}
                        onClick={()=>{setCurrentStep(1)}}
                        label="Previous"
                    />
                    <CustumButton
                    classname={"w-full sm:w-auto"}
                    onClick={()=>{setCurrentStep(3)}}
                    label="Next"
                />
                </>
            ): currentStep==3?(
                <>
                    <h2 className="mb-6 text-2xl">Details</h2>

                    <div className="flex flex-col space-y-2">
                            <label>Price per night:</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e)=>setDataPrice(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                    </div>
                    <div className="flex flex-col space-y-2">
                            <label>Bedrooms:</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e)=>setDataBedrooms(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                    </div>
                    <div className="flex flex-col space-y-2">
                            <label>Bathrooms:</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e)=>setDataBathrooms(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                    </div>
                    <div className="flex flex-col space-y-2">
                            <label>Maximum number of Guests:</label>
                            <input
                                type="number"
                                value={dataGuests}
                                onChange={(e)=>setDataGuests(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                    </div>

                    <CustumButton
                        classname={"w-full sm:w-auto my-2 bg-black hover:bg-gray-800"}
                        onClick={()=>{setCurrentStep(2)}}
                        label="Previous"
                    />
                    <CustumButton
                    classname={"w-full sm:w-auto"}
                    onClick={()=>{setCurrentStep(4)}}
                    label="Next"
                />
                </>
            ): currentStep==4?(
                <>
                    <h2 className="mb-6 text-2xl">Location</h2>
                    <div className="pt-3 pb-6 space-y-4">
                        <SelectCountry 
                            value={dataCountry}
                            onChange={(value)=>setDataCountry(value as SelectCountryValue)}
                        />
                    </div>
                    <CustumButton
                        classname={"w-full sm:w-auto my-2 bg-black hover:bg-gray-800"}
                        onClick={()=>{setCurrentStep(3)}}
                        label="Previous"
                    />
                    <CustumButton
                        classname={"w-full sm:w-auto"}
                        onClick={()=>{setCurrentStep(5)}}
                        label="Next"
                    />
                </>
            ):currentStep==5?(
                <>
                    <h2 className="mb-6 text-2xl">Image</h2>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                            <input 
                                id="imageInput"
                                type="file" 
                                accept="image/*" 
                                onChange={setImage}
                            />
                        </div>
                            {dataImage && ( 
                                <div className="w-[200px] h-[150px] relative mt-4">
                                    <Image
                                        fill
                                        src={URL.createObjectURL(dataImage)}
                                        alt={dataCategory}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            )}
                    </div>
                    <CustumButton
                        classname={"w-full sm:w-auto my-2 bg-black hover:bg-gray-800"}
                        onClick={()=>{setCurrentStep(4)}}
                        label="Previous"
                    />
                    <CustumButton
                        classname={"w-full sm:w-auto"}
                        onClick={submitForm}
                        label="Submit"
                    />  
                </>
            ):(
                <>asdfghjkl</>
            )}
        </>
    )

    return (
        <Modals 
            label="Add Property" 
            content={content} 
            isopen={addPropertyModal.isOpen}
            close={addPropertyModal.close}
        />  
    )
}

export default AddPropertyModal

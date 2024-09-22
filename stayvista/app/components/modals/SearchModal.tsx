'use client'

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal"
import Modals from "./Modals";
import { useState } from "react";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import CustumButton from "../forms/CustumButton";
import { Calendar, Range } from "react-date-range";
import DatePicker from "../forms/Calendar";

const initialDateRange ={
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
}

const SearchModal=()=>{
    let content=(<></>)
    const searchModal=useSearchModal();
    const[dateRange,setDateRange]=useState<Range>(initialDateRange);
    const[country,setCountry]=useState<SelectCountryValue>();
    const[numGuests,setNumGuests]=useState<string>('1');
    const[numBathrooms,setNumBathrooms]=useState<string>('0');
    const[numBedrooms,setNumBedrooms]=useState<string>('0');

    const _setDateRange = (selection: Range) =>{
        if(searchModal.step==='checkin'){
            searchModal.open("checkout");
        }
        else if(searchModal.step ==='checkout'){
            searchModal.open("details");
        }

        setDateRange(selection)
    }

    const closeAndSearch=()=>{
        const newSearchQuery: SearchQuery={
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bathrooms: parseInt(numBathrooms),
            bedrooms: parseInt(numBedrooms),
            category: ''
        }
        searchModal.setQuery(newSearchQuery)
        searchModal.close()   
    }

    const contentLocation=(
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

            <SelectCountry
                value={country}
                onChange={(value)=>setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustumButton
                    label="Check in date ->"
                    onClick={()=>searchModal.open("checkin")}
                    classname="w-[150px]"
                />
            </div>
        </>
    )

    const contentCheckin=(
        <>
            <h2 className="mb-6 text-2xl">When do you want to Check in?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value)=>_setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustumButton
                    label="<- Location"
                    onClick={()=>searchModal.open("location")}
                    classname="w-[150px]"
                />
                <CustumButton
                    label="Check out date ->"
                    onClick={()=>searchModal.open("checkout")}
                    classname="w-[150px]"
                />
            </div>
        </>

    )

    const contentCheckout=(
        <>
            <h2 className="mb-6 text-2xl">When do you want to Check out?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value)=>_setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustumButton
                    label="<- Check in date"
                    onClick={()=>searchModal.open("checkin")}
                    classname="w-[150px]"
                />
                <CustumButton
                    label="details ->"
                    onClick={()=>searchModal.open("details")}
                    classname="w-[150px]"
                />
            </div>
        </>
    )

    const contentDetail=(
        <>
            <h2 className="mb-6 text-2xl">Details:</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        min="1"
                        value={numGuests}
                        placeholder="Number of guests..."
                        onChange={(e)=>setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
                <div className="space-y-4">
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        min="1"
                        value={numBedrooms}
                        placeholder="Number of guests..."
                        onChange={(e)=>setNumBedrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of bathrooms:</label>
                    <input
                        type="number"
                        min="1"
                        value={numBathrooms}
                        placeholder="Number of bathrooms..."
                        onChange={(e)=>setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustumButton
                    label="<- check out"
                    onClick={()=>searchModal.open("checkout")}
                    classname="w-[150px]"
                />
                <CustumButton
                    label="Search"
                    onClick={()=>closeAndSearch()}
                    classname="w-[150px]"
                />
            </div>
        </>
    )

    if(searchModal.step == 'location'){
        content=contentLocation;
    }
    else if(searchModal.step == 'checkin'){
        content=contentCheckin;
    }
    else if(searchModal.step == 'checkout'){
        content=contentCheckout;
    }
    else if(searchModal.step == 'details'){
        content=contentDetail;
    }

    
    return (
        <Modals
            label="Search"
            content={content}
            isopen={searchModal.isOpen}
            close={searchModal.close}
        />
    )
}

export default SearchModal;
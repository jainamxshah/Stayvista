'use client'

import useLoginModal from "@/app/hooks/useLoginModal"
import { differenceInDays , eachDayOfInterval, format} from "date-fns";
import { useEffect, useState } from "react"
import {Range} from 'react-date-range';
import DatePicker from "../forms/Calendar";
import apiService from "@/app/services/apiServices";

const initialDateRange={
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

export type Property={
    data: any;
    id: string,
    guests: number,
    price_per_night: number
}

interface ReservationsSidebarProps{
    userId: string | null,
    property: Property
}

const ReservationsSidebar: React.FC<ReservationsSidebarProps> = ({property,userId}) => {
  
    const loginModal = useLoginModal()
    const[fee,setFee]=useState<number>(0);
    const[totalPrice,setTotalPrice]=useState<number>(0);
    const[nights,setNights]=useState<number>(1);
    const[guests,setGuests]=useState<number>(1);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [bookedDates, setBookedDates] = useState<Date[]>();
    const guestsRange=Array.from({length: property.data.guests},(_,index)=>index+1)
    
    const performBooking=async()=>{
        if(userId){
            if (dateRange.startDate && dateRange.endDate){
                const formData=new FormData()
                console.log(guests)
                formData.append('guest',guests.toString())
                formData.append('start_date',format(dateRange.startDate, 'yyyy-MM-dd'))
                formData.append('end_date',format(dateRange.startDate, 'yyyy-MM-dd'))
                formData.append('number_of_nights',nights.toString())
                formData.append('total_price',totalPrice.toString())

                console.log("hello")
                const response=await apiService.post(`/api/properties/${property.data.id}/book`,formData)
                if(response.success){
                    console.log("booking successfull")
                }
                else{
                    console.error("Error booking property: ",response.data)
                }
            }
        }
        else{
            loginModal.open();
        }
    }

    const _setDateRange=(selection:any)=>{
        const newStartDate= new Date(selection.startDate)
        const newEndDate= new Date(selection.endDate)

        if(newEndDate<=newStartDate){
            newEndDate.setDate(newStartDate.getDate()+1)
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate,
        })
    }

    const getReservations = async()=>{
        const reservations=await apiService.get(`/api/properties/${property.data.id}/reservations`)
        let dates: Date[]=[];

        reservations.forEach((reservations: any) => {
            const range=eachDayOfInterval({
                start: new Date(reservations.start_date),
                end: new Date(reservations.end_date)
            })

            dates=dates.concat(range)
        });

        setBookedDates(dates)
    }
     
    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount=differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && property.data.price_per_night){
                const _fee=((dayCount*property.data.price_per_night)/100)*5
                setFee(_fee)
                setTotalPrice((dayCount*property.data.price_per_night)+_fee)
                setNights(dayCount)
            }
            else{
                const _fee=((property.data.price_per_night)/100)*5
                setFee(_fee)
                setTotalPrice((dayCount*property.data.price_per_night)+_fee)
                setNights(1)
            }
        }
    },[dateRange])
    
    return (
    <aside className="p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl mt-6">
        <h2 className="mb-5 text-2xl">Rs. {property.data.price_per_night} per night</h2>

        <DatePicker
            value={dateRange}
            bookedDates={bookedDates}
            onChange={(value) => _setDateRange(value.selection)}
        />

        <div className="mb-6 p-3 border border-gray-400 rounded-xl">

            <label className="block font-bold text-xs mb-2" htmlFor="">Guests:</label>
            <select value={guests} onChange={(e) => {setGuests(parseInt(e.target.value)) 
                console.log(guests)}} className="w-full -ml-1 text-xm" name="" id="">
                {guestsRange.map(number => (
                    <option value={number} key={number}>{number}</option>
                ))}
            </select>
        </div>

        <div onClick={performBooking} className="w-full mb-6 py-6 text-center text-white bg-stayvista rounded-xl hover:bg-stayvista-dark cursor-pointer">Book</div>

        <div className="mb-4 flex justify-between align-center">
            <p>Rs. {property.data.price_per_night} * {nights}</p>

            <p>Rs. {property.data.price_per_night*nights}</p>
        </div>

        <div className="mb-4 flex justify-between align-center">
            <p>Stayvista Fees</p>

            <p>Rs. {fee}</p>
        </div>

        <hr />

        <div className="mb-4 flex justify-between align-center">
            <p>Total</p>

            <p>Rs. {totalPrice}</p>
        </div>
    </aside>
  )
}

export default ReservationsSidebar

'use client'

import { useEffect,useState } from "react"
import PropertyListItem from "./PropertyListItem"
import apiService from "@/app/services/apiServices"
import useSearchModal from "@/app/hooks/useSearchModal"
import { format } from "date-fns"

export type PropertyType ={
  image_url: string ;
  title: string;
  price_per_night: number;
  id: string;
}

interface PropertyListProps{
  landlord_id?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({landlord_id}) => {
  const searchModal=useSearchModal();
  const country=searchModal.query.country;
  const numGuests=searchModal.query.guests;
  const numBathrooms=searchModal.query.bathrooms;
  const numBedrooms=searchModal.query.bedrooms;
  const checkinDate=searchModal.query.checkIn;
  const checkoutDate=searchModal.query.checkOut;
  const category=searchModal.query.category;
  const [properties,setProperties]=useState<PropertyType[]>([]);

  console.log('quer::',searchModal.query)
  console.log('bedrooms',numBedrooms)

  const getProperties = async ()=>{
    let url="/api/properties"

    if(landlord_id){
      url+= `?landlord_id=${landlord_id}`
    }else{
      let urlQuery=''

      if(country){
        urlQuery+= '&country='+country
      }
      
      if(numGuests){
        urlQuery+= '&numGuests='+numGuests
      }
      if(numBathrooms){
        urlQuery+= '&numBathrooms='+numBathrooms
      }
      
      if(numBedrooms){
        urlQuery+= '&numBedrooms='+numBedrooms
      }
      
      if(checkinDate){
        urlQuery+= '&checkIn='+format(checkinDate,'yyyy-MM-dd')
      }
      
      if(checkoutDate){
        urlQuery+= '&checkOut='+format(checkoutDate,'yyyy-MM-dd')
      }
      
      if(category){
        urlQuery+= '&category='+category
      }
      
      if(urlQuery.length){
        console.log('Query',urlQuery)
        urlQuery='?'+urlQuery.substring(1); 
        url+= urlQuery;
      }
    }

    const tmpProperties = await apiService.get(url);

    setProperties(tmpProperties.data);
  }

  useEffect(()=>{
    getProperties()
  },[category,searchModal.query]);

  return (
    <>
        {properties.map((property)=>{
          return(
            <>
            <PropertyListItem 
                key={property.id}
                property={property}
            />  
            </>
          )
        })}
    </>
  )
}

export default PropertyList

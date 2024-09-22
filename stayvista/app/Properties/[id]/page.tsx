
import ReservationsSidebar from "@/app/components/Properties/ReservationsSidebar";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiServices";
import Image from "next/image";
import Link from "next/link";

const PropertyDetailPage = async({params}:{params: {id: string}}) => {
    const property = await apiService.get(`/api/properties/${params.id}`);
    const userId=await getUserId();

    if (!property) {
        return <div>No property data found.</div>;
    }


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.data.image_url}
                    className="object-cover w-full h-full"
                    alt="Property Image"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="col-span-3 py-6 pr-6">
                    <h1 className="mb-4 text-4xl">{property.data.title}</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        {property.data.guests} Guests - {property.data.bedrooms} bedrooms - {property.data.bathrooms} bathrooms
                    </span>
                    <hr />
                    <Link href={`/Landlords/${property.data.landlord.id}/`} className="py-6 flex items-center space-x-4">
                        {property.data.landlord.avatar_url && (
                            <Image 
                                src="/"
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The User Name"
                            />
                        )}
                        <p><strong>{property.data.landlord.name}</strong> is your host</p>
                    </Link>
                    <hr />
                    <p className="mt-6 text-lg">{property.data.description}</p>
                </div>

                <ReservationsSidebar property={property} userId={userId}/>
            </div>
        </main>
    );
}

export default PropertyDetailPage;

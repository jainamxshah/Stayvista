import Image from "next/image";
import apiService from "../services/apiServices";
import Link from "next/link";

const MyReservationsPage = async() => {
    try {
        const response = await apiService.get('/api/auth/myreservations/');
        console.log('API Response:', response);

        const reservations = response.data || [];  // Adjust this based on how the API returns data

        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <h1 className="my-6 text-2xl">My Reservations</h1>
                <div className="space-y-4">
                    {reservations.length > 0 ? (
                        reservations.map((reservation: any) => (
                            <div key={reservation.id} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                                <div className="col-span-1">
                                    <div className="relative overflow-hidden aspect-square rounded-xl">
                                        <Image
                                            fill
                                            src={reservation.property.image_url}
                                            alt={reservation.property.title}
                                            className="object-cover h-full w-full hover:scale-110 transition"
                                        />
                                    </div> 
                                </div>

                                <div className="col-span-3 space-y-2">
                                    <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                                    <p className="mb-2"><strong>Check-in date:</strong> {reservation.start_date}</p>
                                    <p className="mb-2"><strong>Check-out date:</strong> {reservation.end_date}</p>
                                    <p className="mb-2"><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
                                    <p className="mb-2"><strong>Total Price:</strong> Rs. {reservation.total_price}</p>

                                    <Link
                                        href={`/Properties/${reservation.property.id}`} 
                                        className="cursor-pointer py-4 px-6 bg-stayvista hover:bg-stayvista-dark text-white rounded-xl mt-6 inline-block"
                                    >
                                        Go to Property     
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reservations found.</p>
                    )}
                </div>
            </main>
        );
    } catch (error) {
        console.error('API fetch error:', error);
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <h1 className="my-6 text-2xl">My Reservations</h1>
                <p>Unable to load reservations. Please try again later.</p>
            </main>
        );
    }
}

export default MyReservationsPage;
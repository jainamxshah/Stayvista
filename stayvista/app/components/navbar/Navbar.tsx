import Link from "next/link"
import SearchFilters from "./SearchFilters"
import UserNav from "./UserNav"
import AddPropertyButton from "./AddPropertyButton"
import { getUserId } from "@/app/lib/actions"
import Image from "next/image"
import logo from '/public/Screenshot 2024-09-21 071452.png'

const navbar = async() => {
    const userId = await getUserId()
    console.log(userId)

  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
        <div className="max-w-[1500px] mx-auto px-6">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src={logo}
                        width={200}
                        height={50}
                        alt="Stayvista"
                    />
                </Link>
                <div className="flex space-x-6">
                    <SearchFilters />
                </div>
                <div className="flex items-center space-x-6">
                    <AddPropertyButton />
                    <UserNav userId={userId}/>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default navbar

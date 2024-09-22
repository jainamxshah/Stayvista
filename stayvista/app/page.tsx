import CarouselComponent from "./components/CarousalComponent";
import Categories from "./components/Categories";
import PropertyList from "./components/Properties/PropertyList";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6 ">
      <CarouselComponent />
      <p className="text-lg font-semibold mb-2">Choose From Our Categories</p>
      <Categories />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-10 mb-5 pb-5">
        <PropertyList />
      </div>
    </main>
  );
}

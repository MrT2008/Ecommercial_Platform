import Carosel from "../components/Carosel";
import FlashSaleSection from "../components/FlashSaleSection";

const HomePage = () => {
    return (
      <div className=" mx-auto text-center p-8">
        <Carosel />
        <FlashSaleSection />
        <h2 className="text-2xl font-bold">Welcome to My App</h2>
        <p className="mt-4 text-gray-600">This is the homepage of our application.</p>
      </div>
    );
  };
  
  export default HomePage;
  
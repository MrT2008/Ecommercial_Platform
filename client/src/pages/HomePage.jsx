import Carosel from "../components/Carosel";
import FlashSalesSection from "../components/FlashSalesSection";
import OurProductsSection from "../components/OurProductsSection";

const HomePage = () => {
    return (
      <div className=" mx-auto text-center p-8">
        <Carosel />
        <FlashSalesSection />
        <OurProductsSection /> 
       
      </div>
    );
  };
  
  export default HomePage;
  
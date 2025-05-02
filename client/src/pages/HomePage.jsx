import Carosel from "../components/Carosel";
import SalesSection from "../components/shoppingElements/SalesSection";
import OurProductsSection from "../components/shoppingElements/OurProductsSection";

const HomePage = () => {
    return (
      <div className=" mx-auto text-center p-8">
        <Carosel />
        {/* <SalesSection /> */}
        <OurProductsSection /> 
      </div>
    );
  };
  
  export default HomePage;
  
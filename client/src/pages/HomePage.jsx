import Carosel from "../components/Carosel";
import SalesSection from "../components/shoppingElements/SalesSection";
import OurProductsSection from "../components/shoppingElements/OurProductsSection";

const HomePage = () => {
    return (
      <div style={{ zoom: "90%" }} className="flex-1 p-8 justify-center">
        <Carosel />
        {/* <SalesSection /> */}
        <OurProductsSection /> 
      </div>
    );
  };
  
  export default HomePage;
  
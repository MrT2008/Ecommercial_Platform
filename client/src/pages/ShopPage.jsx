import { useParams } from 'react-router-dom';
import Carousel from '../components/Carosel';
import ShopHeaderShopPage from '../components/shoppingElements/ShopHeaderShopPage';
import ShopCategories from '../components/shoppingElements/ShopCategories';
import ShopProducts from '../components/shoppingElements/ShopProducts';

function ShopPage() {
  const { id } = useParams();
  
  return (
    <div className="mx-auto p-8">
      {/* Shop Header */}
      <ShopHeaderShopPage shopId={id}/>
      
      {/* Shop Banner/Carousel */}
      <Carousel />
      
      {/* Categories - now full width above products */}
      <ShopCategories shopId={id}/>
      
      {/* Main content with products - now full width */}
      <ShopProducts shopId={id} />
    </div>
  );
}

export default ShopPage;
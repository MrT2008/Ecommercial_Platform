// ShopPage.js
import Carosel from '../components/Carosel';
import ShopHeaderShopPage from '../components/shoppingElements/ShopHeaderShopPage';
function ShopPage() {
  return (
    <div className="app">
      <ShopHeaderShopPage/>
      <Carosel />
      {/* <Categories />
      <ProductList /> */}
    </div>
  );
}

export default ShopPage;
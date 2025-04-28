import BecomeSellerForm from "./becomeSellerForm";
import Template from "./template";

const BecomeSellerContainer = () => {
  return (
    <div className="flex items-center h-screen mt-10">
        <Template />
        <BecomeSellerForm/>
    </div>
  );    
}
export default BecomeSellerContainer;
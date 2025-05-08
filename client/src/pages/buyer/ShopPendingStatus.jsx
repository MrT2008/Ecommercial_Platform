import { useNavigate } from 'react-router-dom';
import SecondaryButton from "../../components/shares/SecondaryButton";

const ShopPendingStatus = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg mb-6 max-w-md text-center">
        <p className="text-lg font-medium">Your shop creation request is pending approval.</p>
      </div>
      
      <SecondaryButton
        onClick={handleBackToHome}
          
        title="Back to Home"/>
    </div>
  );
};

export default ShopPendingStatus;
import TitleSection from "./TitleSection";

const FlashSaleSection = () =>{
    return (
        
        <div className="container mx-auto px-4 py-4">
            <TitleSection />
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-orange-500 mb-3 font-bold">FLASH SALE</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                  <img src={`/api/placeholder/180/180?text=Sale ${index+1}`} alt={`Flash Sale Item ${index+1}`} className="w-full h-auto" />
                  <div className="p-2">
                    <div className="text-red-500 font-bold">₫{(Math.random() * 1000000).toFixed(0)}</div>
                    <div className="text-xs text-gray-500">Đã bán {Math.floor(Math.random() * 1000)}</div>
                    <div className="mt-1 bg-red-100 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: `${Math.random() * 100}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
};
export default FlashSaleSection ;
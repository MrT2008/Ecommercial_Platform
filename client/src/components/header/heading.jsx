import './../../styles/global.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEarthAmericas} from '@fortawesome/free-solid-svg-icons';

const Heading = () => {
    return (
        <div className="heading w-full flex flex-col sm:flex-row items-center bg-gray-100 text-sm md:text-base">
            <div className="w-full sm:w-4/5 text-center p-2 whitespace-nowrap overflow-x-auto">
                <p>
                Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%!
                </p>
            </div>
            <div className="w-full sm:w-1/5 flex items-center justify-center sm:justify-end p-2">
                <FontAwesomeIcon icon={faEarthAmericas} className="earth-icon mr-2" />
                <select 
                    name="language" 
                    id="language" 
                    className="outline-none border-none bg-transparent text-sm md:text-base"
                >
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                </select>
            </div>
        </div>
    );
}
export default Heading;
import './../../styles/global.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEarthAmericas} from '@fortawesome/free-solid-svg-icons';
const Heading = () => {
    return (
        <div className="heading w-full flex align-center">
            <div className="heading-announcement w-4/5 text-center p-2">
                <p>
                Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%!
                </p>
            </div>
            <div className="w-1/5 ml-auto p-2">
                <FontAwesomeIcon icon={faEarthAmericas} className="earth-icon" />
                <select name="language" id="language" className="ml-4 outline-none border-none">
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                </select>
            </div>
        </div>
    );
}
export default Heading;
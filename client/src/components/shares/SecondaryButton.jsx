import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SecondaryButton = ({ title, onClick, href, align }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (href) {
            navigate(href); // điều hướng đến route
        } else {
            onClick(); // gọi hàm onClick nếu không có href
        }
    };
     // Chọn class theo align
     const alignmentClass = align === 'left' ? 'text-left' : 'text-center';

    return (
        <div className={`${alignmentClass} mt-6`}>
            <button
                style={{ backgroundColor: "var(--button)", color: "var(--main)" }}
                className="px-6 py-2 rounded-lg font-medium hover:bg-opacity-80"
                onClick={handleClick}
            >
                {title}
            </button>
        </div>
    );
};

SecondaryButton.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center']),
};

SecondaryButton.defaultProps = {
    title: "Button",
    onClick: () => {},
    href: "", // mặc định không điều hướng
    align: "center", //mặc định căn giữa
};

export default SecondaryButton;

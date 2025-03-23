import PropTypes from 'prop-types';
const SecondaryButton = ({ title }) => {
    return (
        <div className="text-center mt-6">
            {/* Nút với title động */}
            <button 
                style={{ backgroundColor: "var(--button)", color: "var(--main)" }} 
                className="px-6 py-2 rounded-lg font-medium hover:bg-opacity-80"
            >
                {title}
            </button>
        </div>
    );
};
SecondaryButton.propTypes = {
    title: PropTypes.string,
};
export default SecondaryButton;

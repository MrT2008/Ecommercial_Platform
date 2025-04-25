import PropTypes from 'prop-types';

const SecondaryButton = ({ title, onClick }) => {
    return (
        <div className="text-center mt-6">
            {/* Button with dynamic title and onClick handler */}
            <button 
                style={{ backgroundColor: "var(--button)", color: "var(--main)" }} 
                className="px-6 py-2 rounded-lg font-medium hover:bg-opacity-80"
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};

SecondaryButton.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func
};

// Add default props
SecondaryButton.defaultProps = {
    title: "Button",
    onClick: () => {} // Empty function as default to prevent errors if onClick is not provided
};

export default SecondaryButton;
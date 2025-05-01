import PropTypes from 'prop-types';

const OutlineButton = ({ title, onClick }) => {
    return (
        <div className="text-center mt-6">
            <button 
                className="px-6 py-2 rounded-lg font-medium border border-current text-current hover:bg-gray-100 transition"
                onClick={onClick}
                style={{
                    color: "var(--main)",
                    borderColor: "var(--main)",
                    backgroundColor: "transparent"
                }}
            >
                {title}
            </button>
        </div>
    );
};

OutlineButton.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func
};

OutlineButton.defaultProps = {
    title: "Button",
    onClick: () => {}
};

export default OutlineButton;

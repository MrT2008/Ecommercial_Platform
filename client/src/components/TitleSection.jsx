import PropTypes from 'prop-types';

const TitleSection = ({ title = "Today's" }) => {
  return (
    <div className="flex items-center">
      <div style={{ backgroundColor: "var(--secondary)" }} className="w-8 h-12 rounded-r-md mr-3"></div>
      <h2 style={{ color: "var(--secondary" }}className="text-2xl font-medium text-orange-500">{title}</h2>
    </div>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string
};

export default TitleSection;
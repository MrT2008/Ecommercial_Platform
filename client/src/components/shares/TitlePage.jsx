import PropTypes from 'prop-types';

const TitlePage = ({ title = "Today's" }) => {
  return (
    <div className="flex items-center">
      {/* <div style={{ backgroundColor: "var(--secondary)" }} className="w-8 h-12 rounded-r-md mr-3"></div> */}
      <h1 style={{ color: "var(--secondary" }}className="text-2xl font-bold text-orange-500">{title}</h1>
    </div>
  );
};

TitlePage.propTypes = {
  title: PropTypes.string
};

export default TitlePage;
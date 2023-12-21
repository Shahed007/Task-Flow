import PropTypes from "prop-types";
const Container = ({ className, children }) => {
  return (
    <div className={`max-w-6xl mx-auto xl:px-3 px-4 ${className}`}>
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;

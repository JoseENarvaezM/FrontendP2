import PropTypes from "prop-types";

function AdminLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}   

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
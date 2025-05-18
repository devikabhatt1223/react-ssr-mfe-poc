import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Shell App</h2>
      <p>Navigate through the menu to explore different applications</p>
      <Link to="/testErrorBoundry" className="button-link">
        Test Error Boundary
      </Link>
    </div>
  );
};

export default Welcome;

import { useNavigate } from "react-router-dom";
import "../assets/css/Button.css";

function Button() {
  const navigate = useNavigate();

  return (
      <div className="button-row">
        <div className="btn-group">
          <button
            className="admin-btn"
            onClick={() => navigate("/")}
          >
            Admin Login
          </button>

          <button
            className="user-btn"
            onClick={() => navigate("/login")}
          >
            User Login
          </button>
        </div>
      </div>
  );
}

export default Button;
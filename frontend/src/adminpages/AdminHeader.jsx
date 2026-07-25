import { Link, useNavigate } from "react-router-dom";
import "./AdminHeader.css";

function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("userid");
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="admin-sidebar">

            <div className="admin-logo-section">
                <img
                    src="/fixora_logo.png"
                    alt="fixora_logo"
                    className="admin-logo"
                />

                <h2 className="admin-heading">
                    Fixora Admin
                </h2>
            </div>

            <div className="admin-menu-section">
                <Link
                    to="/admin/landing"
                    className="admin-menu-link"
                >
                    Admin Home
                </Link>

                <Link
                    to="/admin/allUser"
                    className="admin-menu-link"
                >
                    All User
                </Link>

                <Link
                    to="/admin/allProvider"
                    className="admin-menu-link"
                >
                    All Provider
                </Link>

                <Link
                    to="/admin/addService"
                    className="admin-menu-link"
                >
                    Add Service
                </Link>

                <button
                    onClick={handleLogout}
                    className="admin-logout-btn"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}

export default AdminHeader;
import { Link, useNavigate } from "react-router-dom";
import "./UserHeader.css";

function UserHeader() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("userid");
        localStorage.removeItem("token");

        navigate("/");
        window.location.reload();
    };

    return (

        <div className="userSidebar">

            {/* LOGO SECTION */}

            <div className="logoSection">

                <img
                    src={"/fixora_logo.png"}
                    alt="fixora_logo"
                    className="logoImage"
                />

                <h2 className="logoHeading">
                    Fixora User
                </h2>

            </div>

            {/* MENU SECTION */}

            <div className="menuSection">

                <Link
                    to={"/user/landing"}
                    className="menuLink"
                >
                    User Home
                </Link>

                <Link
                    to={"/user/allServices"}
                    className="menuLink"
                >
                    All Services
                </Link>

                <Link
                    to={"/user/viewSubService"}
                    className="menuLink"
                >
                    View Sub-Services
                </Link>

                <Link
                    to={"/user/myBookings"}
                    className="menuLink"
                >
                    View My Bookings
                </Link>
                

                <button
                    onClick={handleLogout}
                    className="logoutBtn"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default UserHeader;
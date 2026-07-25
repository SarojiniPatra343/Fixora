import { Link, useNavigate } from "react-router-dom";

import {
    Home,
    Upload,
    Briefcase,
    ListChecks,
    LogOut
} from "lucide-react";

import "./ProviderHeader.css";

function ProviderHeader() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("userid");

        navigate("/");
        window.location.reload();
    };

    return (

        <header className="providerHeader">

            {/* LOGO */}
            <div className="providerLogo">

                <img
                    src="/fixora_logo.png"
                    alt="Fixora Logo"
                />

                <h2>
                    Fixora <span>Provider</span>
                </h2>

            </div>

            {/* NAVIGATION */}
            <nav className="providerNav">

                <Link to="/provider/providerHome">

                    <Home size={18} />
                    <span>Home</span>

                </Link>

                <Link to="/provider/uploadInfo">

                    <Upload size={18} />
                    <span>Upload Info</span>

                </Link>

                <Link to="/provider/createSubservice">

                    <Briefcase size={18} />
                    <span>Create Sub Service</span>

                </Link>

                <Link to="/provider/allSubService">

                    <ListChecks size={18} />
                    <span>All Sub Services</span>

                </Link>

                <Link to="/provider/orders">

                    <ListChecks size={18} />
                    <span>Orders</span>

                </Link>

            </nav>

            {/* LOGOUT BUTTON */}
            <button
                className="providerBtn"
                onClick={handleLogout}
            >

                <LogOut size={18} />
                Logout

            </button>

        </header>

    );
}

export default ProviderHeader;
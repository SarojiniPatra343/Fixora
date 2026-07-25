import "./ProviderLanding.css";

import {
    Wrench,
    ShieldCheck,
    Star,
    Users,
    Briefcase
} from "lucide-react";

function ProviderLanding() {

    return (

        <div className="providerLanding">

            {/* HERO SECTION */}
            <div className="heroSection">

                <div className="heroContent">

                    <span className="welcomeTag">
                        Welcome To Fixora Provider
                    </span>

                    <h1>
                        Manage Your Services
                        <br />
                        With Smart Dashboard
                    </h1>

                    <p>
                        Grow your professional business, manage
                        sub-services, upload documents and connect
                        with thousands of customers easily.
                    </p>

                    <div className="heroButtons">

                        <button className="primaryBtn">
                            Get Started
                        </button>

                        <button className="secondaryBtn">
                            Explore More
                        </button>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="heroImage">

                    <div className="floatingCard card1">

                        <Wrench size={28} />

                        <h3>
                            Service Management
                        </h3>

                    </div>

                    <div className="floatingCard card2">

                        <ShieldCheck size={28} />

                        <h3>
                            Verified Provider
                        </h3>

                    </div>

                    <div className="floatingCard card3">

                        <Star size={28} />

                        <h3>
                            Top Rated Services
                        </h3>

                    </div>

                </div>

            </div>

            {/* STATS SECTION */}
            <div className="statsSection">

                <div className="statCard">

                    <Users size={34} />

                    <h2>10K+</h2>

                    <p>Happy Customers</p>

                </div>

                <div className="statCard">

                    <Briefcase size={34} />

                    <h2>500+</h2>

                    <p>Professional Providers</p>

                </div>

                <div className="statCard">

                    <Star size={34} />

                    <h2>4.9</h2>

                    <p>Average Ratings</p>

                </div>

            </div>

        </div>

    );
}

export default ProviderLanding;
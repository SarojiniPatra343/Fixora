import { Route, Routes } from "react-router-dom";
import UserLanding from "./UserLanding";
import UserHeader from "./UserHeader";
import AllService from "./AllServices";
import ViewSubService from "./ViewSubService";
import MyBooking from "./MyBooking";

function UserLayout() {

    const styles = {
        layoutContainer: {
            display: "flex"
        },

        content: {
            marginLeft: "280px", // same width as sidebar
            width: "100%",
            padding: "20px",
            boxSizing: "border-box"
        }
    };

    return (
        <div style={styles.layoutContainer}>

            <UserHeader />

            <div style={styles.content}>

                <Routes>
                    <Route
                        path="/user/landing"
                        element={<UserLanding />}
                    />
                    <Route
                        path="/user/allServices"
                        element={<AllService />}
                    />
                    <Route
                        path="/user/viewSubService"
                        element={<ViewSubService />}
                    />
                    <Route
                        path="/user/myBookings"
                        element={<MyBooking />}
                    />
                </Routes>

            </div>

        </div>
    );
}

export default UserLayout;
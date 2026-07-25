import { Route, Routes } from "react-router-dom";
import AdminLanding from "./AdminLanding";
import AdminHeader from "./AdminHeader";
import AddService from "./AddService";
import AllUser from "./AllUser";
import AllProvider from "./AllProvider";

function AdminLayout() {

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

            <AdminHeader />

            <div style={styles.content}>

                <Routes>
                    <Route
                        path="/admin/landing"
                        element={<AdminLanding />}
                    />
                    <Route
                        path="/admin/addService"
                        element={<AddService />}
                    />
                    <Route
                        path="/admin/allUser"
                        element={<AllUser />}
                    />
                    <Route
                        path="/admin/allProvider"
                        element={<AllProvider />}
                    />
                </Routes>

            </div>

        </div>
    );
}

export default AdminLayout;
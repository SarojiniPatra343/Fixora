import AdminHeader from "./AdminHeader";
import "./AdminLanding.css";

function AdminLanding() {
    return (
        <>
            <AdminHeader />

            <div className="adminLanding">

                <div className="dashboard-header">
                    <h1>Welcome Admin 👋</h1>
                    <p>
                        Manage users, providers, services and monitor
                        platform activities from one place.
                    </p>
                </div>

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h2>👥 Users</h2>
                        <p>Manage all registered users.</p>
                    </div>

                    <div className="dashboard-card">
                        <h2>🛠 Providers</h2>
                        <p>View and manage service providers.</p>
                    </div>

                    <div className="dashboard-card">
                        <h2>📋 Services</h2>
                        <p>Add and update platform services.</p>
                    </div>

                    <div className="dashboard-card">
                        <h2>📊 Analytics</h2>
                        <p>Track bookings and platform growth.</p>
                    </div>

                </div>

                <div className="dashboard-banner">
                    <h2>Fixora Administration Panel</h2>
                    <p>
                        Control users, providers and services efficiently
                        with a clean and secure admin dashboard.
                    </p>
                </div>

            </div>
        </>
    );
}

export default AdminLanding;
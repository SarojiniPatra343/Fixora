import { useEffect, useState } from "react";
import axios from "axios";
import ViewProvider from "./ViewProvider";

function AllProvider() {

    const [providers, setProviders] = useState([]);
    const [providerData, setProviderData] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/admin/allProvider")
          
            .then((res) => {
                setProviders(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const viewData = (id) => {
        axios.get(`http://localhost:8000/admin/viewProvider/${id}`)
            .then((res) => {
                setProviderData(res.data);
                setOpenModal(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={styles.container}>

            {/* Modal */}
            {
                providerData && (
                    <ViewProvider
                        openModal={openModal}
                        providerData={providerData}
                        closeModal={() => setOpenModal(false)}
                    />
                )
            }

            {/* Page Header */}
            <div style={styles.header}>
                <h1 style={styles.heading}>All Providers</h1>
                <p style={styles.subHeading}>
                    Manage and view all registered providers
                </p>
            </div>

            {/* Cards Grid */}
            <div style={styles.grid}>

                {providers.map((provider) => (

                    <div
                        key={provider._id}
                        style={styles.card}
                    >

                        {/* Top Banner */}
                        <div style={styles.banner}>

                            <img
                                src={`http://localhost:8000${provider.profileImage}`}
                                alt="Profile"
                                style={styles.profileImage}
                            />

                        </div>

                        {/* Card Content */}
                        <div style={styles.content}>

                            <h2 style={styles.name}>
                                {provider.name}
                            </h2>

                            <span style={styles.role}>
                                {provider.role.toUpperCase()}
                            </span>

                            {/* Information */}
                            <div style={styles.infoSection}>

                                <div style={styles.infoRow}>
                                    <span style={styles.label}>Email</span>
                                    <span style={styles.value}>
                                        {provider.email}
                                    </span>
                                </div>

                                <div style={styles.infoRow}>
                                    <span style={styles.label}>Phone</span>
                                    <span style={styles.value}>
                                        {provider.phone}
                                    </span>
                                </div>

                                <div style={styles.infoRow}>
                                    <span style={styles.label}>City</span>
                                    <span style={styles.value}>
                                        {provider.address?.city}
                                    </span>
                                </div>

                                <div style={styles.infoRow}>
                                    <span style={styles.label}>State</span>
                                    <span style={styles.value}>
                                        {provider.address?.state}
                                    </span>
                                </div>

                                <div style={styles.infoRow}>
                                    <span style={styles.label}>Pincode</span>
                                    <span style={styles.value}>
                                        {provider.address?.pincode}
                                    </span>
                                </div>

                            </div>

                            {/* Button */}
                            <button
                                style={styles.button}
                                onClick={() => viewData(provider._id)}
                            >
                                View Provider Info
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

const styles = {

    container: {
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "40px 30px",
        fontFamily: "Arial"
    },

    header: {
        textAlign: "center",
        marginBottom: "40px"
    },

    heading: {
        fontSize: "40px",
        marginBottom: "10px",
        color: "#222",
        fontWeight: "bold"
    },

    subHeading: {
        color: "#666",
        fontSize: "18px"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "30px"
    },

    card: {
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        transition: "0.3s ease",
        cursor: "pointer"
    },

    banner: {
        height: "130px",
        background: "linear-gradient(135deg,#4e73df,#1cc88a)",
        position: "relative"
    },

    profileImage: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "5px solid #fff",
        position: "absolute",
        bottom: "-60px",
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
    },

    content: {
        padding: "80px 25px 25px",
        textAlign: "center"
    },

    name: {
        margin: "0",
        color: "#222",
        fontSize: "26px"
    },

    role: {
        display: "inline-block",
        marginTop: "10px",
        background: "#eef3ff",
        color: "#4e73df",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "bold"
    },

    infoSection: {
        marginTop: "25px",
        textAlign: "left"
    },

    infoRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #f0f0f0"
    },

    label: {
        fontWeight: "bold",
        color: "#444"
    },

    value: {
        color: "#777",
        maxWidth: "55%",
        textAlign: "right"
    },

    button: {
        marginTop: "25px",
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "12px",
        background: "linear-gradient(135deg,#4e73df,#1cc88a)",
        color: "#fff",
        fontSize: "15px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s"
    }

};

export default AllProvider;
import axios from "axios";

function ViewProvider({ openModal, providerData, closeModal }) {

    if (!openModal || openModal === false) return null;

    const handleApprove = async () => {

        try {

            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/admin/approveProvider/${providerData._id}`
            );

            alert(res.data.message);

            closeModal();

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    };

    const handleReject = async () => {

        try {

            await axios.put(
                `${import.meta.env.VITE_API_URL}/admin/rejectProvider/${providerData._id}`
            );

            alert("Provider Rejected");

            closeModal();

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={styles.overlay}>

            <div style={styles.modal}>

                {/* Close Button */}
                <button
                    style={styles.closeBtn}
                    onClick={closeModal}
                >
                    ✖
                </button>

                {/* Heading */}
                <h2 style={styles.heading}>
                    Provider Details
                </h2>

                {/* Aadhaar Card Style Image */}
                <div style={styles.imageContainer}>

                    <div style={styles.aadharCard}>

                        {/* Document Image */}
                        <img
                            src={`${import.meta.env.VITE_API_URL}${providerData.documents[0].document}`}
                            alt="document"
                            style={styles.image}
                        />

                    </div>

                </div>

                {/* Details */}
                <div style={styles.detailsContainer}>

                    <div style={styles.card}>
                        <span style={styles.label}>
                            Name
                        </span>

                        <p style={styles.value}>
                            {providerData.userId.name}
                        </p>
                    </div>

                    <div style={styles.card}>
                        <span style={styles.label}>
                            Experience
                        </span>

                        <p style={styles.value}>
                            {providerData.experience} Years
                        </p>
                    </div>

                    <div style={styles.card}>
                        <span style={styles.label}>
                            Description
                        </span>

                        <p style={styles.value}>
                            {providerData.description}
                        </p>
                    </div>

                    <div style={styles.card}>
                        <span style={styles.label}>
                            Document Name
                        </span>

                        <p style={styles.value}>
                            {providerData.documents[0].documentName}
                        </p>
                    </div>

                </div>

                {/* Buttons */}
                <div style={styles.buttonContainer}>

                    <button
                        style={styles.approveBtn}
                        onClick={handleApprove}
                    >
                        Approved
                    </button>

                    <button
                        style={styles.rejectBtn}
                        onClick={handleReject}
                    >
                        Rejected
                    </button>

                </div>
                <div style={styles.card}>
                    <span style={styles.label}>Status</span>

                    <p style={styles.value}>
                        {
                            providerData.isApproved == true?"Approved":"Rejected"
                        }
                        </p>

                </div>

            </div>

        </div>
    );
}

const styles = {

    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
    },

    modal: {
        width: "650px",
        backgroundColor: "#fff",
        borderRadius: "18px",
        padding: "25px",
        position: "relative",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        maxHeight: "90vh",
        overflowY: "auto"
    },

    closeBtn: {
        position: "absolute",
        top: "15px",
        right: "15px",
        border: "none",
        background: "red",
        color: "#fff",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    },

    heading: {
        textAlign: "center",
        marginBottom: "25px",
        color: "#222",
        fontSize: "28px"
    },

    imageContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "25px"
    },

    aadharCard: {
        width: "320px",
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        border: "2px solid #ddd",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    },

    image: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
        padding: "10px",
        boxSizing: "border-box"
    },

    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    card: {
        background: "#f7f7f7",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.08)"
    },

    label: {
        fontWeight: "bold",
        color: "#555",
        fontSize: "14px",
        textTransform: "uppercase"
    },

    value: {
        marginTop: "5px",
        color: "#222",
        fontSize: "17px"
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "25px"
    },

    approveBtn: {
        background: "green",
        color: "#fff",
        border: "none",
        padding: "12px 25px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    },

    rejectBtn: {
        background: "red",
        color: "#fff",
        border: "none",
        padding: "12px 25px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    }

};

export default ViewProvider;
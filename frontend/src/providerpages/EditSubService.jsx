import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSubService() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        subserviceName: "",
        duration: "",
        price: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/provider/singleSubService/${id}`,{
            headers: { Authorization: token }
        })
            .then((res) => {
                setFormData({
                    subserviceName: res.data.subserviceName || "",
                    duration: res.data.duration || "",
                    price: res.data.price || "",
                    description: res.data.description || "",
                    image: res.data.image || "",
                });
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.put(
            `http://localhost:8000/provider/updateSubService/${id}`,
            formData,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        alert(res.data.message);
        navigate("/provider/allsubservice");

    } catch (error) {
        console.log(error);
    }
};

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Edit Sub Service</h1>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        name="subserviceName"
                        placeholder="Sub Service Name"
                        value={formData.subserviceName}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        name="duration"
                        placeholder="Duration"
                        value={formData.duration}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        style={styles.textarea}
                    />

<input
    name="image"
    placeholder="Image URL"
    value={formData.image || ""}
    onChange={handleChange}
    style={styles.input}
/>
{formData.image && (
    <img
        src={formData.image}
        alt="preview"
        style={styles.previewImage}
    />
)}

                    <button type="submit" style={styles.button}>
                        Update Sub Service
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    /* DARK BACKGROUND */
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: "linear-gradient(135deg, #05070f, #0b1220, #0a1a33)",
        animation: "bgGlow 8s ease infinite",
    },

    /* DARK CARD */
    card: {
        width: "100%",
        maxWidth: "600px",
        background: "rgba(10, 15, 30, 0.85)",
        padding: "30px",
        borderRadius: "16px",
        border: "1px solid rgba(59, 130, 246, 0.25)",
        boxShadow: "0 0 25px rgba(0, 140, 255, 0.15)",
        backdropFilter: "blur(12px)",
        animation: "slideUp 0.6s ease",
    },

    title: {
        textAlign: "center",
        marginBottom: "25px",
        color: "#60a5fa",
        fontSize: "30px",
        fontWeight: "700",
        textShadow: "0 0 10px rgba(96,165,250,0.6)",
        animation: "fadeIn 1s ease",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
    },

    input: {
        padding: "14px",
        borderRadius: "10px",
        fontSize: "15px",
        outline: "none",
        color: "#e5e7eb",
        background: "#0b1220",
        border: "1px solid rgba(59,130,246,0.25)",
        transition: "0.3s",
    },

    textarea: {
        padding: "14px",
        borderRadius: "10px",
        fontSize: "15px",
        minHeight: "120px",
        resize: "none",
        outline: "none",
        color: "#e5e7eb",
        background: "#0b1220",
        border: "1px solid rgba(59,130,246,0.25)",
        transition: "0.3s",
    },

    button: {
        padding: "14px",
        border: "none",
        borderRadius: "10px",
        background: "linear-gradient(90deg, #2563eb, #1e3a8a)",
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 0 15px rgba(37,99,235,0.5)",
        transition: "0.3s",
    },

    previewImage: {
        width: "110px",
        height: "110px",
        objectFit: "cover",
        borderRadius: "10px",
        border: "1px solid rgba(59,130,246,0.4)",
        boxShadow: "0 0 12px rgba(0,140,255,0.25)",
        animation: "pop 0.4s ease",
    },
};

/* ANIMATIONS */
const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes pop {
  from { transform: scale(0.7); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes bgGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`, styleSheet.cssRules.length);

export default EditSubService;
import { useEffect, useState } from "react";
import axios from "axios";


function AllUser() {
    const [users, setUsers] = useState([]);
   

    useEffect(() => {
       
      

axios.get("${import.meta.env.VITE_API_URL}/admin/allUser")
   

.then((res) => {
    setUsers(res.data);
})
.catch((err) => console.log(err));
}, []);
    return (
        <div
            style={{
                padding: "30px",
                background: "#f4f6f9",
                minHeight: "100vh"
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    color: "#333"
                }}
            >
                All Users
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "25px"
                }}
            >
                {users.map((user) => (
                    <div
                        key={user._id}
                        style={{
                            background: "#fff",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                            transition: "0.3s"
                        }}
                    >
                        {/* Top Header */}
                        <div
                            style={{
                                background: "linear-gradient(135deg,#4e73df,#1cc88a)",
                                height: "90px",
                                position: "relative"
                            }}
                        >
                            <img
                                src={`${import.meta.env.VITE_API_URL}${user.profileImage}`}
                                alt="Profile"
                                style={{
                                    width: "110px",
                                    height: "110px",
                                    borderRadius: "50%",
                                    border: "5px solid white",
                                    objectFit: "cover",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: "-55px",
                                    transform: "translateX(-50%)"
                                }}
                            />
                        </div>

                        {/* User Info */}
                        <div
                            style={{
                                padding: "70px 20px 20px",
                                textAlign: "center"
                            }}
                        >
                            <h2
                                style={{
                                    marginBottom: "5px",
                                    color: "#222"
                                }}
                            >
                                {user.name}
                            </h2>

                            <p
                                style={{
                                    color: "#777",
                                    marginBottom: "20px"
                                }}
                            >
                                {user.role.toUpperCase()}
                            </p>

                            <div
                                style={{
                                    textAlign: "left",
                                    lineHeight: "1.9"
                                }}
                            >
                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong> {user.phone}
                                </p>

                                <p>
                                    <strong>City:</strong> {user.address?.city}
                                </p>

                                <p>
                                    <strong>State:</strong> {user.address?.state}
                                </p>

                                <p>
                                    <strong>Pincode:</strong> {user.address?.pincode}
                                </p>
                            </div>

                            {/* Footer */}
                            <div
                                style={{
                                    marginTop: "20px",
                                    paddingTop: "15px",
                                    borderTop: "1px solid #eee",
                                    color: "#666",
                                    fontSize: "14px"
                                }}
                            >
                                User ID: {user._id}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AllUser;
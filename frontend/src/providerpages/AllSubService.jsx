import "./AllSubService.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllSubService() {
    const navigate = useNavigate();
    const [subServices, setSubServices] = useState([]);
    const token = localStorage.getItem("token");

    const handleEdit = (id) => {
        navigate(`/provider/edit-subservice/${id}`);
    };

    const handleClick = (id) => {
        axios
            .get(
                 `${import.meta.env.VITE_API_URL}/provider/changeSubServiceStatus/${id}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            .then((res) => {
                alert(res.data.message);
                fetchData();
            })
            .catch((err) => console.log(err));
    };

    const fetchData = () => {
        const userId = localStorage.getItem("userid");

        if (userId) {
            axios
                .get(
                      `${import.meta.env.VITE_API_URL}/provider/allSubService/${userId}`,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                )
                .then((res) => {
                    setSubServices(res.data);
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="subservice-page">
            <h1 className="title">All Sub Services</h1>

            <div className="table-container">
                <div className="table-header">
                    <div>Sl No</div>
                    <div>Service</div>
                    <div>Sub Service</div>
                    <div>Duration</div>
                    <div>Price</div>
                    <div>Description</div>
                    <div>Image</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>

                {subServices.map((service, index) => (
                    <div
                        className="table-row"
                        key={service._id}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div>{index + 1}</div>
                        <div>{service.serviceId?.ServiceName || "N/A"}</div>
                        <div>{service.subserviceName}</div>
                        <div>{service.duration}</div>
                        <div>₹ {service.price}</div>
                        <div>{service.description}</div>

                        <div>
                            <img
                                src={service.image}
                                alt=""
                                className="img"
                            />
                        </div>

                        <div>
                            <button
                                className={
                                    service.isActive
                                        ? "activeBtn"
                                        : "inactiveBtn"
                                }
                                onClick={() => handleClick(service._id)}
                            >
                                {service.isActive ? "Active" : "Inactive"}
                            </button>
                        </div>

                        <div>
                            <button
                                className="editBtn"
                                onClick={() => handleEdit(service._id)}
                            >
                                ✏️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllSubService;
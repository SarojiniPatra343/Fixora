import { useEffect, useState } from "react";
import axios from "axios";
import "./AddService.css";
function AddService() {
    const [formData, setFormData] = useState({
        ServiceName: "",
        Description: "",
        ServiceImage: null,
    });

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const token = localStorage.getItem("token");

    const handleClick = (id) => {
    axios
        .patch(
            `${import.meta.env.VITE_API_URL}/admin/changeStatus/${id}`,
            {},
            {
                headers: {
                    Authorization: token
                }
            }
        )
        .then((res) => {
            alert(res.data.message);
            fetchServices();
        })
        .catch((err) => console.log(err));
};

   const fetchServices = () => {
    axios
        .get("${import.meta.env.VITE_API_URL}/admin/allService", {
            headers: {
                Authorization: token
            }
        })
        .then((res) => setServices(res.data))
        .catch((err) => console.log(err));
};



    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("ServiceName", formData.ServiceName);
        data.append("Description", formData.Description);
        data.append("image", formData.ServiceImage);

        axios
            .post("${import.meta.env.VITE_API_URL}/admin/createService", data, {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                alert(res.data.message);
                setFormData({
                    ServiceName: "",
                    Description: "",
                    ServiceImage: null,
                });

                fetchServices();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="service-page">
            {/* FORM */}
            <div className="service-form">
                <h2>Add New Service</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="ServiceName"
                        placeholder="Service Name"
                        value={formData.ServiceName}
                        onChange={handleChange}
                    />

                    <textarea
                        name="Description"
                        placeholder="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        rows="4"
                    />

                    <input type="file" name="ServiceImage" onChange={handleChange} />

                    <button type="submit">Create Service</button>
                </form>
            </div>

            {/* GRID */}
            <h2 className="title">All Services</h2>

            <div className="service-grid">
                {services.map((service, index) => (
                    <div
                        className="service-card"
                        key={service._id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <img
                            src={`${import.meta.env.VITE_API_URL}${service.ServiceImage}`}
                            alt=""
                        />

                        <div className="card-body">
                            <h3>{service.ServiceName}</h3>
                            <p>{service.Description}</p>

                            <button
                                className={service.isActive ? "active" : "inactive"}
                                onClick={() => handleClick(service._id)}
                            >
                                {service.isActive ? "Active" : "Inactive"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddService;
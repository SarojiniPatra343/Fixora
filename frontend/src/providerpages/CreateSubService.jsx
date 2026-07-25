import "./CreateSubService.css";
import { useEffect, useState } from "react";
import axios from "axios";

function CreateSubService() {

    const [services, setServices] = useState([]);

    const [formData, setFormData] = useState({
        userId: localStorage.getItem("userid"),
        serviceId: "",
        subserviceName: "",
        price: "",
        duration: "",
        description: ""
    });

    // Get All Services
    useEffect(() => {

        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:8000/provider/allServices",{
            headers: { Authorization: token }
        })

            .then((res) => {

                setServices(res.data);

                console.log(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);




    // Handle Input Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };




    // Submit Form
   const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(
            "http://localhost:8000/provider/subService",
            formData,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        alert(response.data.message);

        setFormData({
            userId: localStorage.getItem("userid"),
            serviceId: "",
            subserviceName: "",
            price: "",
            duration: "",
            description: ""
        });

    } catch (error) {
        console.log(error);
    }
};




   return (

    <div className="createSubService">

        <div className="subServiceContainer">

            <div className="subServiceTitle">
                <h1>Create Sub Service</h1>
                <p>
                    Add your professional sub service details
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="subServiceForm"
            >

                {/* Service Dropdown */}
                <div className="inputGroup">

                    <label>Service Name</label>

                    <select
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                    >

                        <option value="">
                            Choose Your Service
                        </option>

                        {
                            services.map((service) => (

                                <option
                                    key={service._id}
                                    value={service._id}
                                >
                                    {service.ServiceName}
                                </option>

                            ))
                        }

                    </select>

                </div>

                {/* Sub Service Name */}
                <div className="inputGroup">

                    <label>Sub Service Name</label>

                    <input
                        type="text"
                        name="subserviceName"
                        placeholder="Enter Sub Service Name"
                        value={formData.subserviceName}
                        onChange={handleChange}
                    />

                </div>

                {/* Price */}
                <div className="inputGroup">

                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                </div>

                {/* Duration */}
                <div className="inputGroup">

                    <label>Duration</label>

                    <input
                        type="text"
                        name="duration"
                        placeholder="Enter Duration"
                        value={formData.duration}
                        onChange={handleChange}
                    />

                </div>

                {/* Description */}
                <div className="inputGroup fullWidth">

                    <label>Description</label>

                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="submitBtn"
                >

                    Create Sub Service

                </button>

            </form>

        </div>

    </div>

);

}




const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f4f4"
    },

    form: {
        width: "400px",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },

    heading: {
        textAlign: "center",
        marginBottom: "20px"
    },

    label: {
        display: "block",
        marginTop: "10px",
        marginBottom: "5px",
        fontWeight: "bold"
    },

    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "10px"
    },

    textarea: {
        width: "100%",
        height: "100px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "15px"
    },

    button: {
        width: "100%",
        padding: "12px",
        background: "linear-gradient(to right, #4facfe, #00c6fb)",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold"
    }

};

export default CreateSubService;
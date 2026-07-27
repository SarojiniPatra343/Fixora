import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllServices.css";

function AllService() {
    const [services, setServices] = useState([]);
    const navigate=useNavigate();
   useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_API_URL}/admin/allService`, {
        headers: { Authorization: token }
    })
    .then((res) => {
        console.log("Services:", res.data);
        setServices(res.data.services);
    })
    .catch((err) => console.log(err));
}, []);
    const handleClick=(id)=>{
        alert(id);
    }
    return (

        <div className="servicePage">

            {/* TITLE */}

            <div className="sectionHeader">

                <h2>Services Provided</h2>

            </div>

            {/* GRID */}

            <div className="serviceGrid">

                {Array.isArray(services) &&
  services.map((service) => (

                    <div
                        className="serviceCard"
                        key={service._id}
                        onClick={()=>handleClick(service._id)}
                    >

                        <div className="imageWrapper">

                            <img
                                src={`${import.meta.env.VITE_API_URL}${service.ServiceImage}`}
                                alt="service"
                                className="serviceImage"
                            />

                            <div className="imageOverlay"></div>

                        </div>

                        <div className="serviceBody">

                            <h3>
                                {service.ServiceName}
                            </h3>

                            <p>
                                {service.Description}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AllService;
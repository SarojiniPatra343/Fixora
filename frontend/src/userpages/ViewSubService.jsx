import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewSubService.css";

function ViewSubService() {

    const [subServices, setSubServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedService , setSelectedService ] = useState(null);

    const [bookingData, setBookingData] = useState({
        bookingDate: "",
        bookingTime: "",
        address: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios
            .get(`${import.meta.env.VITE_API_URL}/user/subServices` ,{
            headers: { Authorization: token }
        })

            .then((res) => {

                setSubServices(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e)=>{
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

   const openBookingModal = (subService) => {
    console.log("Book Now Clicked");
    console.log(subService);

    setSelectedService(subService);
    setShowModal(true);
};

    const closeModal = () => {
        setShowModal(false);
        setSelectedService(null);
        setBookingData({
            bookingDate: "",
            bookingTime: "",
            address: ""
        });
    };

    const handlePayment = async () => {
        try {
            const userId = localStorage.getItem("userid");
             const token = localStorage.getItem("token");

            if (
                !bookingData.bookingDate ||
                !bookingData.bookingTime ||
                !bookingData.address
            ) {
                alert("Please fill all booking details");
                return;
            }

          const orderRes = await axios.post(
    "${import.meta.env.VITE_API_URL}/user/create-order",
    {
        amount: selectedService.price
    },
    {
        headers: { Authorization: token }
    }
);

            

            const order = orderRes.data;

            const options = {
                key: "rzp_test_Sxy9dCgei2frmE", // Razorpay Key

                amount: order.amount,

                currency: order.currency,

                name: "Fixora",

                description:
                    selectedService.subServiceName,

                order_id: order.id,

                handler: async function (response) {
                    try {
                        const verifyRes =
                            await axios.post(
                                "${import.meta.env.VITE_API_URL}/user/verify-payment",
                                {
                                    razorpay_order_id:
                                        response.razorpay_order_id,
                                    razorpay_payment_id:
                                        response.razorpay_payment_id,
                                    razorpay_signature:
                                        response.razorpay_signature,
                                    userId,
                                    providerUserId: selectedService.userId,
                                    serviceId:
                                        selectedService.serviceId._id,
                                    subServiceId:
                                        selectedService._id,
                                    bookingDate:
                                        bookingData.bookingDate,
                                    bookingTime:
                                        bookingData.bookingTime,
                                    amount:
                                        selectedService.price,
                                    address:
                                        bookingData.address
                                },
                                {
                                    headers: {
                                         Authorization: token 
                                        }
                                }
                            );

                        alert("Booking Successful");

                        console.log(
                            verifyRes.data
                        );

                        closeModal();
                    } catch (err) {
                        console.log(err);

                        alert(
                            "Payment Verification Failed"
                        );
                    }
                },
                prefill: {
                    name: "Customer"
                },
                theme: {
                    color: "#2563eb"
                }
            };
            const razor = new window.Razorpay(
                options
            );

            razor.open();
        } catch (err) {
            console.log(err);
        }

    };

   

    return (

        <div className="dashboardContent">

            <div className="headerSection">

                <div className="headerLeft">

                    <h1>
                        ✨ All Sub Services
                    </h1>

                </div>

            </div>

            {/* ================= SERVICES ================= */}

            {
                subServices.length > 0 ? (

                    <div className="servicesGrid">

                        {
                            subServices.map((subService, index) => (

                                <div
                                    className="serviceCard"
                                    key={index}
                                >

                                    {/* IMAGE */}

                                    <div className="imageWrapper">

                                        <img
                                            src={`${import.meta.env.VITE_API_URL}${subService.serviceId.ServiceImage}`}
                                            alt={subService.subServiceName}
                                            className="serviceImage"
                                        />

                                        <div className="imageOverlay"></div>

                                        <span
                                            className={`statusBadge ${
                                                subService.status
                                                    ? "active"
                                                    : "inactive"
                                            }`}
                                        >

                                            {
                                                subService.status
                                                    ? "ACTIVE"
                                                    : "INACTIVE"
                                            }

                                        </span>

                                    </div>

                                    {/* BODY */}

                                    <div className="cardBody">

                                        <h2 className="subServiceTitle">

                                            {subService.subServiceName}

                                        </h2>

                                        <div className="serviceName">

                                            🛠️ {subService.serviceId.ServiceName}

                                        </div>

                                        {/* DETAILS */}

                                        <div className="infoRow">

                                            <span className="infoLabel">
                                                Duration
                                            </span>

                                            <span className="infoValue">
                                                {subService.duration} Hour
                                            </span>

                                        </div>

                                        <div className="infoRow">

                                            <span className="infoLabel">
                                                Status
                                            </span>

                                            <span className="infoValue">

                                                {
                                                    subService.status
                                                        ? "Available"
                                                        : "Unavailable"
                                                }

                                            </span>

                                        </div>

                                        {/* PRICE */}

                                        <div className="price">

                                            ₹{subService.price}

                                        </div>

                                        {/* DESCRIPTION */}

                                        <p className="description">

                                            {subService.description}

                                        </p>

                                        {/* BUTTONS */}

                                        <div className="cardFooter">

                                            <button className="btn btnView" 
                                            onClick={() => openBookingModal(subService)}>

                                                Book Now

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                ) : (

                    <div className="emptyState">

                        <h2>
                            No Sub Services Found
                        </h2>

                    </div>

                )
            }
            {/* BOOKING MODAL */}

            {showModal && selectedService && (
                <div className="bookingModalOverlay">
                    <div className="bookingModal">

                        <h2>Book Service</h2>

                        <label>Booking Date</label>

                        <input
                            type="date"
                            name="bookingDate"
                            value={bookingData.bookingDate}
                            onChange={handleChange}
                        />

                        <label>Booking Time</label>

                        <input
                            type="time"
                            name="bookingTime"
                            value={bookingData.bookingTime}
                            onChange={handleChange}
                        />

                        <label>Address</label>

                        <textarea
                            rows="4"
                            name="address"
                            value={bookingData.address}
                            onChange={handleChange}
                        />

                        <div className="amountBox">
                            <h3>
                                ₹ {selectedService?.price}
                            </h3>
                        </div>

                        <div className="modalButtons">

                            <button
                                className="payBtn"
                                onClick={handlePayment}
                            >
                                Pay Now
                            </button>

                            <button
                                className="cancelBtn"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default ViewSubService;
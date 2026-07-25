import axios from "axios";
import { useEffect, useState } from "react";
import "./ProviderOrders.css";

function ProviderOrders() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const providerId = localStorage.getItem("userid");
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8000/provider/providerOrders/${providerId}`,{
            headers: { Authorization: token }
        })
            .then((res) => {
                const bookingsWithStatus = res.data.map((booking) => ({
                    ...booking,
                    selectedStatus: "",
                }));

                setBookings(bookingsWithStatus);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleSelectChange = (bookingId, value) => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking._id === bookingId
                    ? { ...booking, selectedStatus: value }
                    : booking
            )
        );
    };

    const handleStatusChange = async (bookingId, status) => {
        try {
            const token = localStorage.getItem("token");

const res = await axios.patch(
    `http://localhost:8000/provider/changeBookingStatus/${bookingId}`,
    { status },
    {
        headers: {
            Authorization: token
        }
    }
);
            alert(res.data.message || "Status Updated Successfully");

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, bookingStatus: status }
                        : booking
                )
            );
        } catch (err) {
            console.log(err);
            alert("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="provider-orders">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="provider-orders">
            <h1>User Orders</h1>

            {bookings.length === 0 ? (
                <p className="no-orders">No Orders Found</p>
            ) : (
                bookings.map((order) => (
                    <div key={order._id} className="order-card">
                        <h3>{order.userId?.name || "Unknown User"}</h3>

                        <p>
                            <strong>Email:</strong>{" "}
                            {order.userId?.email || "N/A"}
                        </p>

                        <p>
                            <strong>Service:</strong>{" "}
                            {order.serviceId?.serviceName ||
                                order.serviceId?.ServiceName ||
                                order.serviceId?.name ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>Sub Service:</strong>{" "}
                            {order.subServiceId?.subserviceName || "N/A"}
                        </p>

                        <p>
                            <strong>Amount:</strong> ₹{order.amount || 0}
                        </p>

                        <p>
                            <strong>Current Status:</strong>{" "}
                            <span
                                className={`status ${
                                    order.bookingStatus
                                        ?.toLowerCase()
                                        .replace(/\s+/g, "-") || "pending"
                                }`}
                            >
                                {order.bookingStatus || "Pending"}
                            </span>
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {order.bookingDate
                                ? new Date(
                                      order.bookingDate
                                  ).toLocaleDateString("en-IN")
                                : "N/A"}
                        </p>

                        <form
                            className="status-form"
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (!order.selectedStatus) {
                                    alert("Please select a status");
                                    return;
                                }

                                handleStatusChange(
                                    order._id,
                                    order.selectedStatus
                                );
                            }}
                        >
                            <select
                                className="status-select"
                                value={order.selectedStatus}
                                onChange={(e) =>
                                    handleSelectChange(
                                        order._id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Select Status
                                </option>
                                <option value="Accepted">
                                    Accepted
                                </option>
                                <option value="In Progress">
                                    In Progress
                                </option>
                                <option value="Completed">
                                    Completed
                                </option>
                                <option value="Cancelled">
                                    Cancelled
                                </option>
                            </select>

                            <button
                                type="submit"
                                className="update-btn"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProviderOrders;
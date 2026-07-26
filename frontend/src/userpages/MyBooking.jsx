import axios from "axios";
import { useEffect, useState } from "react";
import "./MyBooking.css";
import jsPDF from "jspdf";

function MyBooking() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userid");
        const token = localStorage.getItem("token");
        console.log("User ID from localStorage:", userId);

        axios
            .get(`${import.meta.env.VITE_API_URL}/user/allBookings/${userId}`,{
            headers: { Authorization: token }
        }) 
            .then((res) => {
                console.log("Bookings Response:", res.data);

                setBookings(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="myBookingPage">
                <h2>Loading...</h2>
            </div>
        );
        
    }

    const downloadInvoice = (booking) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("FIXORA SERVICE INVOICE", 20, 20);

    doc.setFontSize(12);

    doc.text(`Invoice ID: ${booking._id}`, 20, 40);

    doc.text(
        `Booking Date: ${formatDate(booking.bookingDate)}`,
        20,
        50
    );

    doc.text(
        `Customer Name: ${booking.userId?.name || "Customer"}`,
        20,
        70
    );

    doc.text(
        `Service: ${booking.serviceId?.ServiceName || "N/A"}`,
        20,
        90
    );

    doc.text(
        `Sub Service: ${booking.subServiceId?.subServiceName || "N/A"}`,
        20,
        100
    );

    doc.text(
        `Provider: ${booking.providerUserId?.name || "N/A"}`,
        20,
        120
    );

    doc.text(
        `Provider Phone: ${booking.providerUserId?.phone || "N/A"}`,
        20,
        130
    );

    doc.text(
        `Booking Time: ${booking.bookingTime || "N/A"}`,
        20,
        150
    );

    doc.text(
        `Address: ${booking.address || "N/A"}`,
        20,
        160
    );

    doc.text(
        `Amount Paid: ₹${booking.amount || 0}`,
        20,
        180
    );

    doc.text(
        `Payment Status: ${booking.paymentStatus || "Pending"}`,
        20,
        190
    );

    doc.text(
        `Booking Status: ${booking.bookingStatus || "Pending"}`,
        20,
        200
    );

    doc.setFontSize(14);
    doc.text(
        "Thank you for choosing Fixora!",
        20,
        230
    );

    doc.save(`Invoice-${booking._id}.pdf`);
};

  return (
    <div className="myBookingPage">
        <h1>My Bookings</h1>

        {bookings.length === 0 ? (
            <p className="no-bookings">No bookings found.</p>
        ) : (
            bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                    <h3>
                        Service:{" "}
                        {booking.serviceId?.serviceName ||
                            booking.serviceId?.ServiceName ||
                            "N/A"}
                    </h3>

                    <p>
                        <strong>Amount:</strong> ₹{booking.amount || 0}
                    </p>

                    <p>
                        <strong>Booking Date:</strong>{" "}
                        {formatDate(booking.bookingDate)}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span
                            className={`status ${
                                booking.bookingStatus
                                    ? booking.bookingStatus.toLowerCase()
                                    : "pending"
                            }`}
                        >
                            {booking.bookingStatus || "Pending"}
                        </span>
                    </p>

                    <p>
                        <strong>Provider:</strong>{" "}
                        {booking.providerUserId?.name || "N/A"}
                    </p>

                    <button onClick={() => downloadInvoice(booking)}>
                        Download Invoice
                    </button>
                </div>
                
            ))
        )}
    </div>
    
);
}

export default MyBooking;
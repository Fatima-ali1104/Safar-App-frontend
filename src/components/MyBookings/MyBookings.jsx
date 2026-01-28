// src/components/MyBookings/MyBookings.jsx
import { useEffect, useState } from "react";
import { getUserBookings } from "../../services/bookingService";
import './MyBookings.css';


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const bookingsData = await getUserBookings();
        setBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p>{error}</p>;
  if (!bookings || bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <main className="my-bookings-container">
    <h1>My Bookings</h1>
    <div className="bookings-container">
        {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
                <h2>{booking.trip?.title}</h2>
                
                <div className="booking-info-list">
                    <p><strong>Destination:</strong> {booking.trip?.destination}</p>
                    <p><strong>Hotel:</strong> {booking.trip?.hotel}</p>
                    <p><strong>Days:</strong> {booking.trip?.days}</p>
                    <p><strong>Total Paid:</strong> {booking.totalPrice} BHD</p>
                </div>

                <div className="status-container">
        <span className="status-badge">{booking.status}</span>
    </div>
                <div className="travelers-section">
                <h3>Travelers Info</h3>
                <ul>
                    {booking.travelers.map((traveler, index) => (
                        <li key={index}>
                            <strong>{traveler.name}</strong> | CPR: {traveler.CPR} | Age: {traveler.age}
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        ))}
    </div>
</main>
  );
};

export default MyBookings;

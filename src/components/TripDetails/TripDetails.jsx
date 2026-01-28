// src/components/TripDetails/TripDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTripDetails } from "../../services/tripService";
import "./TripDetails.css"


const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrip() {
      try {
        setLoading(true);
        const tripData = await getTripDetails(id);
        setTrip(tripData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        setError("Failed to load trip details.");
        setLoading(false);
      }
    }
    fetchTrip();
  }, [id]);

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p>{error}</p>;
  if (!trip) return <p>No trip found.</p>;

  return (
    <div className="trip-details-container">
    <main className="trip-details-card">
      
      <img
        src={Array.isArray(trip.images) ? trip.images[0] : trip.images}
        alt={trip.title}
        />
        <div className="trip-info-content">
        <h1>{trip.title}</h1>

        <div className="trip-details-list">
      <p><strong>Destination:</strong> {trip.destination}</p>
      <p><strong>Days:</strong> {trip.days}</p>
      <p><strong>Hotel:</strong> {trip.hotel}</p>
      <p><strong>Price:</strong> {trip.price} BHD</p>
        </div>
      
      <Link to={`/bookings/new/${trip._id}`} state={{price: trip.price}}>
        <button className="book-now-btn">Book Now</button>
      </Link>
      </div>
    </main>
    </div>
  );
};

export default TripDetails;

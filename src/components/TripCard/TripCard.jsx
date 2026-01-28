// src/components/TripCard/TripCard.jsx
import { Link } from "react-router-dom";
import './TripCard.css'

const TripCard = ({ trip }) => {
  return (
    <div className="trip-card">
      <img src={trip.images} alt={trip.title} className="trip-card-img"  />
      <h2>{trip.title}</h2>
      <p>Destination: {trip.destination}</p>
      <p>Price: {trip.price} BHD</p>
      <Link to={`/trips/${trip._id}`}>View Details</Link>
    </div>
  );
};

export default TripCard;

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { getTrips } from "../../services/tripService";
import TripCard from "../TripCard/TripCard";
import TripSearchBar from "../TripSearchBar/TripSearchBar";
import './TripPage.css'
function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

//bring in all trips
async function getTripsFromService() {
    try{
    setLoading(true);
    setError(null);
    const tripsData = await getTrips();
    setTrips(tripsData);
    setFilteredTrips(tripsData);
    setLoading(false);
} catch (error) {
    console.error("Error fetching trips:", error);
    setError("Failed to load trips. Please try again later.");
    setLoading(false);
}
}
useEffect(() => {
    getTripsFromService();
}, []);

//search and filter trips
const fuse = useMemo(() => {
    return new Fuse(trips, {
        keys: ['destination', 'title', 'price'],
        threshold: 0.4,
    });
}, [trips]);

function filteredTripsBySearch() {
    if (!searchQuery) {
        setFilteredTrips(trips);
        return;
    }
    const results = fuse.search(searchQuery);
    const matchedTrips = results.map(({ item }) => item);
    setFilteredTrips(matchedTrips);
}
useEffect(() => {
    filteredTripsBySearch();
}, [searchQuery, fuse]);

if (loading) {
  return (
    <div>Loading trips...</div>
  );
}

if (error) {
  return (
    <div>
      <h1>Trips</h1>
      <p>{error}</p>
    </div>
  );
}

return (
    <div className="trips-page">
      <h1>Trips</h1>
      <TripSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="trip-cards-container">
       {filteredTrips && filteredTrips.length > 0 ? (
  filteredTrips.map((trip) => (
    <TripCard key={trip._id} trip={trip} />
  ))
) : (
  <p>No trips found</p>
)}

      </div>
    </div>
  );
}
export default TripsPage;
// src/components/TripSearchBar/TripSearchBar.jsx
import './TripSearchBar.css'
const TripSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="trip-search-bar">
      <input
        type="text"
        placeholder="Search trips"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default TripSearchBar;

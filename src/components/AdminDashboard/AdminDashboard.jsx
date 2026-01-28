// src/components/AdminDashboard/AdminDashboard.jsx
import { useEffect, useState } from "react";
import {getTrips, createTrip, updateTrip, deleteTrip } from "../../services/tripService";
import axios from "axios";
import './AdminDashboard.css';

const AdminDashboard = ({user}) => {
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    hotel: "",
    days: "",
    price: "",
    images:""
  });
  const [editingTrip, setEditingTrip] = useState(null);
  
  console.log(user);
  if (!user || user.role !== "admin") {
      return <h2>Access Denied. Admins only.</h2>; 
    }
    
  useEffect(() => {
    async function fetchTrips() {
      try {
        // const response = await axios.get(
        //   `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`
        // );
        const response = await getTrips()
        console.log(response)
        setTrips(response);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    }
    fetchTrips();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrip) {
        const updated = await updateTrip(editingTrip._id, formData);
        setTrips(trips.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTrip(null);
      } else {
        const newTrip = await createTrip(formData);
        setTrips([...trips, newTrip]);
      }
      setFormData({ title: "", destination: "", hotel: "", days: "", price: "", images:"" });
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTrip(id);
      setTrips(trips.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setFormData({
      title: trip.title,
      destination: trip.destination,
      hotel: trip.hotel,
      days: trip.days,
      price: trip.price,
      images: trip.images,
    });
  };

  return (
    <div className="admin-dashboard">
    <main>
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Trip Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <input
          type="text"
          name="hotel"
          placeholder="Hotel"
          value={formData.hotel}
          onChange={handleChange}
        />
        <input
          type="number"
          name="days"
          placeholder="Days"
          value={formData.days}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="images"
          placeholder="Trip Image"
          value={formData.images}
          onChange={handleChange}
        />
        {/* <input type="file" name="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} /> */}
   
        <button type="submit">{editingTrip ? "Update Trip" : "Add Trip"}</button>
      </form>

      <h2>All Trips</h2>
      <div className="trips-container">
        {trips.map((trip) => (
          <div key={trip._id} className="trip-card">
            <img src={trip.images} alt={trip.title} className="trip-card-img"  />
            <h3>{trip.title}</h3>
            <p>Destination: {trip.destination}</p>
            <p>Hotel: {trip.hotel}</p>
            <p>Days: {trip.days}</p>
            <p>Price: {trip.price} BHD</p>
            
            <div className="trip-card-actions">
                <button onClick={() => handleEdit(trip)}>Edit</button>
                <button onClick={() => handleDelete(trip._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
    </div>
  );
};

export default AdminDashboard;

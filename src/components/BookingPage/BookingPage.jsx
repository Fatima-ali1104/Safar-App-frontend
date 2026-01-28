// src/components/BookingPage/BookingPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createBooking } from "../../services/bookingService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './BookingPage.css';

const BookingPage = () => {
    const navigate = useNavigate();
  const { id } = useParams(); 
  const [travelers, setTravelers] = useState([{ name: "", CPR: "", age: "" }]);
    const location = useLocation();
    const tripPrice = location.state?.price;


  const handleTravelerChange = (index, field, value) => {
    const updated = [...travelers];
    updated[index][field] = value;
    setTravelers(updated);
  };

  const addTraveler = () => {
    setTravelers([...travelers, { name: "", CPR: "", age: "" }]);
  };

  const handleBooking = async () => {
    try {
        const totalPrice = travelers.length * tripPrice;
        await createBooking(id, travelers, totalPrice);
        navigate('/bookings/me');
    } catch (err) {
      console.error("Error creating booking:", err);
     
    }
  };

  return (



<main className="booking-page-container">
    <h1>Book Your Trip</h1>
    
    {travelers.map((traveler, index) => (
        <div key={index} className="traveler-form-card">
            <h3>Traveler {index + 1}</h3>
            
            <div className="input-group">
                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={traveler.name}
                    onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>CPR Number</label>
                <input
                    type="text"
                    placeholder="Enter CPR"
                    value={traveler.CPR}
                    onChange={(e) => handleTravelerChange(index, "CPR", e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Age</label>
                <input
                    type="number"
                    placeholder="Age"
                    value={traveler.age}
                    onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
                />
            </div>
        </div>
    ))}

    <div className="booking-actions">
        <button className="add-traveler-btn" onClick={addTraveler}>+ Add Another Traveler</button>
        <button className="confirm-booking-btn" onClick={handleBooking}>Confirm & Pay</button>
    </div>

    <p className="total-price-tag">
        Total: {travelers.length * tripPrice} BHD
    </p>
</main>
  );
};

export default BookingPage;

// src/services/bookingService.js
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bookings`;

// create booking
export async function createBooking(tripId, travelers, totalPrice) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");
    const response = await axios.post(
      BASE_URL,
      { trip: tripId, travelers, totalPrice },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.booking; 
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

// get user bookings
export async function getUserBookings() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.bookings; 
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

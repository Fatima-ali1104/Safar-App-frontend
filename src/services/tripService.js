import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

//all trips
async function getTrips() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("reeeeeeeeeeeeeee",response)
    return response.data.trips; 
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
}

// create trip
const createTrip = async (tripData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(BASE_URL, tripData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.Trip;
  } catch (error) {
    console.error("Error creating trip:", error);
  }
};

// show trip details
const getTripDetails = async (tripId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.trip; 
  } catch (error) {
    console.error("Error fetching trip details:", error);
  }
};

// update trip
const updateTrip = async (tripId, tripData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/${tripId}`, tripData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.trip; 
  } catch (error) {
    console.error("Error updating trip:", error);
  }
};

// delete trip
const deleteTrip = async (tripId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.message; 
  } catch (error) {
    console.error("Error deleting trip:", error);
  }
};

export { getTrips, createTrip, getTripDetails, updateTrip, deleteTrip };
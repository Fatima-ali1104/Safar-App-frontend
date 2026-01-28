import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as testService from '../../services/testService';
import "./Dashboard.css"


const Dashboard = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);

  // Create state to store the message we'll receive from the backend
  const [ message, setMessage ] = useState('');

  // useEffect runs after the component renders
  // This is where we perform side effects like API calls
  useEffect(() => {
    const fetchTest = async () => {
      try {
        // Make an authenticated API call to the backend test endpoint. The JWT token is automatically sent in the request headers inside the service function
        const data = await testService.test();

        // Take the response data and show message
        setMessage(data.message);
      } catch (err) {
        console.log(err)
      }
    }

    // Only fetch data if user exists (i.e., someone is logged in)
    // This prevents errors from trying to make authenticated requests without a user
    if (user) fetchTest();

  }, [user]); // only fetch if after context loads the user from localStorage

  return (
    <div className="dashboard-container">
      <main className="dashboard-card">
        <h1>Welcome, {user.username}</h1>
        <p>
          Discover unforgettable journeys, exclusive deals, and personalized experiences—all in one place. Whether you’re planning your next adventure or managing your bookings, our platform makes it simple, secure, and inspiring. Your dashboard is the gateway to explore, dream, and travel smarter.</p>
        
        {/* {message && (
          <div className="dashboard-message">
            {message}
          </div>
        )} */}
      </main>
    </div>
  );
};

export default Dashboard;

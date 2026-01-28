import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import TripsPage from './components/TripsPage/TripsPage';
import TripDetails from './components/TripDetails/TripDetails';
import BookingPage from './components/BookingPage/BookingPage';
import MyBookings from './components/MyBookings/MyBookings';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

import { UserContext } from './contexts/UserContext';

const App = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar/>
      <Routes>
        {/* if the user is logged in we have the user object else we have the user set to null */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/signin' element={<SignInForm />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/bookings/new/:id" element={<BookingPage />} />
        <Route path="/bookings/me" element={<MyBookings />} />
        <Route path="/admin" element={<AdminDashboard user={user}/>} />

      </Routes>
    </>
  );
};

export default App;

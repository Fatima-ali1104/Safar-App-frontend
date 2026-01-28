import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
      {user ? (
        <ul className='nav-links'>
          <li className='nav-welcome'>Welcome, {user.username}</li>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/trips'>Trips</Link></li>
          <li><Link to='/bookings/me'>My Bookings</Link></li>

       
          {user.role === "admin" && (
            <li><Link to='/admin' className="admin-link">Admin Dashboard</Link></li>
          )}

          <li><Link to='/' onClick={handleSignOut} className="signout-btn">Sign Out</Link></li>
        </ul>
      ) : (
        <ul className='nav-links'>
          {/* <li><Link to='/trips'>Trips</Link></li> */}
          {/* <li><Link to='/'>Home</Link></li> */}
          <li><Link to='/signin'>Sign In</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </ul>
      )}
      </div>
    </nav>
  );
};

export default NavBar;

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import './SignInForm.css'; 

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.err || err.message);
    }
  };

  return (
    <div className="auth-container">
      <main className="auth-card">
        <h1>Sign In</h1>
        {message && <p className="auth-error-message">{message}</p>}
        
        <form autoComplete='off' onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              autoComplete='off'
              id='username'
              value={formData.username}
              name='username'
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              autoComplete='off'
              id='password'
              value={formData.password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-buttons">
            <button className="btn-submit">Log In</button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignInForm;
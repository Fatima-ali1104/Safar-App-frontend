import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });
  const { setUser } = useContext(UserContext);

  const { username, password, passwordConf, email } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await authService.signUp(formData);
      setUser(user);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.err || err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  return (
    <div className="auth-container">
      <main className="auth-card">
        <h1>Sign Up</h1>
        {message && <p className="auth-error-message">{message}</p>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              name='username'
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              name='email'
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor='confirm'>Confirm Password</label>
            <input
              type='password'
              id='confirm'
              value={passwordConf}
              name='passwordConf'
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-buttons">
            <button className="btn-submit" disabled={isFormInvalid()}>Create Account</button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUpForm;
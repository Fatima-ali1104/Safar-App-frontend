// This page is a simple component that just loads when the page first loads and you are not signed in
import './Landing.css'

const Landing = () => {
  return (
    <div className="landing-container">
    <main className="landing-content">
      <h1>Your next adventure starts here!  </h1>
      <p>
Join our community of explorers and unlock exclusive trips, unbeatable deals, and personalized experiences tailored just for you. Don’t just dream about traveling—make it happen today. Sign up now and step into a world of endless journeys!</p>
    </main>
    </div>
  );
};

export default Landing;

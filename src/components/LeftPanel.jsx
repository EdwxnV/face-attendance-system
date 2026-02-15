import Dither from "../components/Dither";
import "../styles/signup.css";

export default function LeftPanel() {
  return (
    <div className="left-panel">
      
      {/* Animated Background */}
      <div className="left-anim">
        <Dither
          waveColor={[0.13, 0.68, 0.83]}
          waveAmplitude={0.25}
          waveFrequency={2.8}
          waveSpeed={0.03}
          colorNum={5}
          pixelSize={2}
          enableMouseInteraction={true}
          mouseRadius={0.4}
        />
      </div>

      {/* Premium Overlay Glow */}
      <div className="left-overlay"></div>

      {/* Content */}
      <div className="left-content">
        <p className="brand">F.A.C.E</p>
        <h1>Get Started With Us</h1>
        <p>
          Complete these simple steps to create your secure account
        </p>

        <button
          className="outline-btn"
          onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

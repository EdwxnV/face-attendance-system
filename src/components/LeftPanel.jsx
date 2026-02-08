import Dither from "../components/Dither";
import "../styles/signup.css";

export default function LeftPanel() {
  return (
    <div className="left-panel">
      {/* Animated Background */}
      <div className="left-anim">
        <Dither
          waveColor={[0.13, 0.68, 0.83]}      // #21add3
          waveAmplitude={0.25}
          waveFrequency={2.8}
          waveSpeed={0.03}
          colorNum={5}
          pixelSize={2}
          enableMouseInteraction={true}
          mouseRadius={0.4}
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="left-content">
        <p className="brand">F.A.C.E</p>
        <h1>Get Start With Us</h1>
        <p>Complete these easy steps to register your account</p>

        <button
          className="outline-btn"
          onClick={() => window.scrollTo(0, 999)}
        >
          Sign up your account
        </button>
      </div>
    </div>
  );
}

// src/components/hero/Hero.jsx
import { useEffect, useRef } from "react";
import { Renderer, PointerHandler } from "./StarTrekRenderer";
import "./StarTrek.css"; // optional, for styling

function Hero() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // High-DPI support
    let resolution = 0.5;
    let dpr = Math.max(1, resolution * window.devicePixelRatio);

    // Initialize Renderer and PointerHandler
    const renderer = new Renderer(canvas, dpr);
    const pointers = new PointerHandler(canvas, dpr);

    // Resize function
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      renderer.updateScale(dpr);
    };
    window.addEventListener("resize", resize);
    resize();

    // Initialize shader
    renderer.setup();
    renderer.init();

    // Animation loop
    const loop = (time) => {
      renderer.updateMouse(pointers.first);
      renderer.updatePointerCount(pointers.count);
      renderer.updatePointerCoords(pointers.coords);
      renderer.updateMove(pointers.move);
      renderer.render(time);
      animationRef.current = requestAnimationFrame(loop);
    };
    animationRef.current = requestAnimationFrame(loop);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
  <div className="hero-container">
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
    <div className="hero-content">
      <h1>Welcome to DreamJar</h1>
      <p>Your dream-like home page starts here</p>
    </div>
  </div>
);

}

export default Hero;
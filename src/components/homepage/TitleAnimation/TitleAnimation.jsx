import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TitleAnimation.css"

gsap.registerPlugin(ScrollTrigger);

function TitleAnimation() {
  return (
    <section className="title">
        <h1>DreamJar</h1>
    </section>
  );
}

export default TitleAnimation;
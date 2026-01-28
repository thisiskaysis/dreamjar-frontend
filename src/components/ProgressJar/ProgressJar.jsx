import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ProgressJar.css'; // we'll handle the gradient CSS here

const ProgressJar = () => {
  const jarRef = useRef();

  useEffect(() => {
    if (!jarRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const container = document.createElement('div');
    jarRef.current.appendChild(container);

    const WIDTH = jarRef.current.clientWidth;
    const HEIGHT = jarRef.current.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    camera.position.z = 300;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    // Gradient background handled by CSS
    jarRef.current.style.background = 'linear-gradient(45deg, #ff6ec4, #7873f5, #00ffea, #ffea00)';
    jarRef.current.style.backgroundSize = '600% 600%';
    jarRef.current.style.animation = 'gradientMove 20s ease infinite';

    // Particle setup
    const particleCount = 6000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 2000 - 1000;
      positions[i * 3 + 1] = Math.random() * 2000 - 1000;
      positions[i * 3 + 2] = Math.random() * 2000 - 1000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const parameters = [
      [[1, 1, 0.5], 5],
      [[0.95, 1, 0.5], 4],
      [[0.9, 1, 0.5], 3],
      [[0.85, 1, 0.5], 2],
      [[0.8, 1, 0.5], 1]
    ];

    const materials = parameters.map(([color, size]) => 
      new THREE.PointsMaterial({
        size,
        color: new THREE.Color().setHSL(color[0], color[1], color[2]),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        // make particles round
        sizeAttenuation: true
      })
    );

    const particlesArray = materials.map(material => {
      const points = new THREE.Points(geometry, material);
      points.rotation.x = Math.random() * 6;
      points.rotation.y = Math.random() * 6;
      points.rotation.z = Math.random() * 6;
      scene.add(points);
      return points;
    });

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    const windowHalfX = WIDTH / 2;
    const windowHalfY = HEIGHT / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        mouseX = e.touches[0].pageX - windowHalfX;
        mouseY = e.touches[0].pageY - windowHalfY;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const time = Date.now() * 0.00005;

      particlesArray.forEach((points, i) => {
        points.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
      });

      materials.forEach((material, i) => {
        const color = parameters[i][0];
        const h = (360 * (color[0] + time) % 360) / 360;
        material.color.setHSL(h, color[1], color[2]);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const onWindowResize = () => {
      const WIDTH = jarRef.current.clientWidth;
      const HEIGHT = jarRef.current.clientHeight;

      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
      renderer.setSize(WIDTH, HEIGHT);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
  <div ref={jarRef} className="jar" />
  );
};

export default ProgressJar;

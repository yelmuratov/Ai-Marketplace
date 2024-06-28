// components/ThreeScene.tsx
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(3, 3, 3);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;

    const particleGeometry = new THREE.BufferGeometry();
    const position = new Float32Array(100000 * 3);
    const color = new Float32Array(100000 * 3);

    for (let i = 0; i < 100000 * 3; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 5;
      const branch = (i % 4) / 4 * 2 * Math.PI;
      const spin = radius * 1;
      const randomnessX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomnessY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomnessZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);

      position[i3] = Math.cos(branch + spin) * radius + randomnessX;
      position[i3 + 1] = randomnessY;
      position[i3 + 2] = Math.sin(branch + spin) * radius + randomnessZ;

      const insideColor = new THREE.Color('#ff6030');
      const outsideColor = new THREE.Color('#1b3894');

      const mixed = insideColor.clone();
      mixed.lerp(outsideColor, radius / 5);

      color[i3] = mixed.r;
      color[i3 + 1] = mixed.g;
      color[i3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(color, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.01,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particle = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particle);

    const starGeometry = new THREE.BufferGeometry();
    const starPos = new Float32Array(100000 * 3);

    for (let i = 0; i < 100000 * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 50;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const points = new THREE.Points(starGeometry, new THREE.PointsMaterial({ size: 0.001, sizeAttenuation: true }));
    scene.add(points);

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      points.rotation.y = elapsedTime / 8;
      particle.rotation.y = elapsedTime / 8;

      controls.update();
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', () => {});
      renderer.dispose();
      controls.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default ThreeScene;

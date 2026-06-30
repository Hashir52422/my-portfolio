import * as THREE from "three";

/**
 * Hero background scene: a layered, semi-transparent stack of
 * geometric "shells" representing the MERN stack (React/Next on top,
 * Express/Node in the middle, MongoDB at the base), connected by
 * thin vertical struts and drifting in a quiet particle field.
 * Reacts gently to pointer position and scroll.
 */
export function createHeroScene(canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    42,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.4, 9.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  const palette = [0x5ee0c0, 0x5ee0c0, 0xf2a65a];
  const layerY = [2.1, 0, -2.1];
  const layers = [];

  layerY.forEach((y, i) => {
    const geo = new THREE.IcosahedronGeometry(1.6, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: palette[i],
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = y;
    mesh.scale.set(1, 0.3, 1);
    group.add(mesh);
    layers.push(mesh);

    const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: palette[i] });
    for (let j = 0; j < 6; j++) {
      const angle = (j / 6) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 1.65, y, Math.sin(angle) * 1.65);
      group.add(node);
    }
  });

  for (let j = 0; j < 6; j++) {
    const angle = (j / 6) * Math.PI * 2;
    const points = layerY.map(
      (y) => new THREE.Vector3(Math.cos(angle) * 1.65, y, Math.sin(angle) * 1.65)
    );
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2f6e62,
      transparent: true,
      opacity: 0.45,
    });
    group.add(new THREE.Line(lineGeo, lineMat));
  }

  // ambient particle field
  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x5ee0c0,
    size: 0.022,
    transparent: true,
    opacity: 0.45,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  group.rotation.x = 0.3;
  group.rotation.y = 0.4;

  const pointer = { x: 0, y: 0 };
  let scrollFactor = 0;

  function setPointer(nx, ny) {
    pointer.x = nx;
    pointer.y = ny;
  }

  function setScroll(t) {
    scrollFactor = t; // 0..1 roughly across the hero section
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  const clock = new THREE.Clock();

  function tick() {
    const t = clock.getElapsedTime();

    group.rotation.y += 0.0026;
    group.rotation.x += (0.3 + pointer.y * 0.22 - group.rotation.x) * 0.04;
    group.rotation.z += (pointer.x * 0.12 - group.rotation.z) * 0.04;

    layers.forEach((l, i) => {
      l.position.y = layerY[i] + Math.sin(t * 0.6 + i) * 0.08;
    });

    group.position.y = -scrollFactor * 1.4;
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  resize();
  tick();

  return { setPointer, setScroll, resize };
}

var scene, camera, renderer;
var matrixGroup;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 20;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create matrix group
  matrixGroup = new THREE.Group();
  scene.add(matrixGroup);

  // Create glyphs for the matrix
  const glyphGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const glyphMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

  for (let i = 0; i < 1000; i++) {
    const glyph = new THREE.Mesh(glyphGeometry, glyphMaterial);
    glyph.position.set(Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20);
    glyph.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    matrixGroup.add(glyph);
  }

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the matrix group
  matrixGroup.rotation.x += 0.005;
  matrixGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

init();
animate();

const SCENE = new THREE.Scene();
const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;
const MAXPARTICLES = 3000;
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);
//CAMERA
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 200;
camera.lookAt(new THREE.Vector3(0, 0, 0));
//RING
let particlesGeometry = new THREE.Geometry();
for (let i = 0; i < MAXPARTICLES; i++) {
  let particle = new THREE.Vector3(
    random(-250, 250 ),
    random(-8, 8),
    random(-250, 250)
  );
  particlesGeometry.vertices.push(particle);
}
let particleMaterial = new THREE.ParticleBasicMaterial({
  color: "orange",
  size: 1.4,
});
let saturn = new THREE.ParticleSystem(particlesGeometry, particleMaterial);
saturn.sortParticles = true;
SCENE.add(saturn);

//SATURN
let saturnLoader = new THREE.TextureLoader().load('images/saturnTexture.jpg');
let saturnGeometry = new THREE.SphereGeometry( 50, 32, 32 );
let saturnMaterial = new THREE.MeshBasicMaterial( {map: saturnLoader} );
let saturnMesh = new THREE.Mesh( saturnGeometry, saturnMaterial );
SCENE.add( saturnMesh );

//spaceBackground
let spaceGeometry  = new THREE.SphereGeometry(200, 40, 40)
let spaceMaterial  = new THREE.MeshBasicMaterial()
spaceMaterial.map   = THREE.ImageUtils.loadTexture('images/spaceTexture.jpg')
spaceMaterial.side  = THREE.BackSide
let space  = new THREE.Mesh(spaceGeometry, spaceMaterial)
SCENE.add(space);
space.position.z=0
//LIGHT
let light = new THREE.AmbientLight( "#FFFFFF" );
SCENE.add( light );
//RANDOM NUMBER GENERATOR
function random(min, max) {
  if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

//LOOP FUNCTION
function render() {
    requestAnimationFrame(render);
    saturn.rotation.y += -0.000100;
    saturnMesh.rotation.y += -0.00200;
    space.rotation.y += -0.00008;
    RENDERER.render(SCENE, camera);
  }
  render();
//RESIZE
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);
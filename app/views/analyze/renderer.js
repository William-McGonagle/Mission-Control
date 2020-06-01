var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var renderer = new THREE.WebGLRenderer();

document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousedown', onMouseDown, false);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Simulation

var fuel = 200;

var rocketVelocity = {
  x: 0,
  y: 0,
  z: 0
};

// TERRAIN

var terrainGeometry = new THREE.PlaneGeometry(1000, 1000, 150, 150);

for (var i = 0, l = terrainGeometry.vertices.length; i < l; i++) {

  terrainGeometry.vertices[i].z = noise.simplex2((i % 148) / 100, (i / 148) / 50) * 25;

}

var ground = new THREE.Mesh(
  terrainGeometry,
  new THREE.MeshLambertMaterial({
    color: 0x33ee33,
    side: THREE.DoubleSide,
    castShadow: true
  })
);

ground.rotation.x = 90;

var rocket = new THREE.Mesh(
  new THREE.BoxGeometry(0.4, 1.6, 0.4),
  new THREE.MeshLambertMaterial({
    color: 0xffffff,
    castShadow: true
  })
);

rocket.position.y = 0.8;

var launchPad = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.2, 1),
  new THREE.MeshLambertMaterial({
    color: 0xff0000,
    castShadow: true
  })
);

var lineGeometry = new THREE.Geometry();

lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(rocket.position);

var line = new THREE.Line(
  lineGeometry,
  new THREE.LineBasicMaterial({
    color: 0x0000ff,
    castShadow: true
  })
);

var ambientLight = new THREE.AmbientLight(0x101010, 5.0);
ambientLight.castShadow = true;
ambientLight.shadowDarkness = 0.5;
ambientLight.shadowCameraVisible = true;

directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
directionalLight.position.set(0.0, 0.0, 20.0);
directionalLight.rotation.x = 50;
directionalLight.castShadow = true;
directionalLight.shadowDarkness = 0.5;
directionalLight.shadowCameraVisible = true;

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(ground);
scene.add(rocket);
scene.add(launchPad);
scene.add(line);

function animate() {

  requestAnimationFrame(animate);

  camera.position.x = rocket.position.x;
  camera.position.y = rocket.position.y + 1;
  camera.position.z = rocket.position.z + 5;

  rocket.position.x += rocketVelocity.x;
  rocket.position.y += rocketVelocity.y;
  rocket.position.z += rocketVelocity.z;

  lineGeometry.vertices[0].copy(new THREE.Vector3(0, 0, 0));
  lineGeometry.vertices[1].copy(rocket.position);
  lineGeometry.verticesNeedUpdate = true;

  if (rocket.position.y > 1.6) {

    rocketVelocity.y -= 0.005; // Gravity

  } else {

    rocket.position.y = 1.6;

  }

  if (fuel > 0) {

    rocketVelocity.y += rocket.up.y * 0.01;
    rocketVelocity.x += rocket.up.x * 0.01;
    rocketVelocity.z += rocket.up.z * 0.01;
    fuel--;

  }

  camera.lookAt(rocket.position);
  renderer.render(scene, camera);

}

animate();

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function manageRaycasterIntersections(scene, camera) {
    camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

    }
    else {

    }
}

function onMouseDown(event){

   console.log("mouse position: (" + mouse.x + ", "+ mouse.y + ")");

}

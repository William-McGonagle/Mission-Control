'use strict';

Physijs.scripts.worker = '../physijs_worker.js';
Physijs.scripts.ammo = 'examples/js/ammo.js';

var initScene, render, createShape, NoiseGen, loader,
  renderer, render_stats, physics_stats, scene, light, ground, ground_geometry, ground_material, camera;
var rocketShape;
var fuel = 65;

NoiseGen = new SimplexNoise;

initScene = function() {
  TWEEN.start();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  document.getElementById( 'viewport' ).appendChild( renderer.domElement );

  // render_stats = new Stats();
  // render_stats.domElement.style.position = 'absolute';
  // render_stats.domElement.style.top = '0px';
  // render_stats.domElement.style.zIndex = 100;
  // document.getElementById( 'viewport' ).appendChild( render_stats.domElement );
  //
  // physics_stats = new Stats();
  // physics_stats.domElement.style.position = 'absolute';
  // physics_stats.domElement.style.top = '50px';
  // physics_stats.domElement.style.zIndex = 100;
  // document.getElementById( 'viewport' ).appendChild( physics_stats.domElement );

  scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
  scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
  scene.addEventListener(
    'update',
    function() {
      scene.simulate( undefined, 2 );

      if (fuel > 0) {

        rocketShape.applyCentralImpulse(new THREE.Vector3(0, 1, 0).applyMatrix4(rocketShape.matrix));
        fuel--;

      }

      rocketShape.applyCentralImpulse(new THREE.Vector3(Math.random() * rocketShape.position.y / 50, 0, Math.random() * rocketShape.position.y / 50));

      displayCamera(0);

    }
  );

  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set( 60, 50, 60 );
  scene.add( camera );

  // Light
  light = new THREE.DirectionalLight( 0xFFFFFF );
  light.position.set( 20, 40, -15 );
  light.target.position.copy( scene.position );
  light.castShadow = true;
  light.shadowCameraLeft = -60;
  light.shadowCameraTop = -60;
  light.shadowCameraRight = 60;
  light.shadowCameraBottom = 60;
  light.shadowCameraNear = 20;
  light.shadowCameraFar = 200;
  light.shadowBias = -.0001
  light.shadowMapWidth = light.shadowMapHeight = 2048;
  light.shadowDarkness = .7;
  scene.add( light );

  // Loader
  loader = new THREE.TextureLoader();

  // Materials
  ground_material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'images/grass.png' ) }),
    .8, // high friction
    .5 // low restitution
  );
  ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
  ground_material.map.repeat.set( 25.0, 25.0 );

  // Ground

  ground_geometry = new THREE.PlaneGeometry( 1000, 1000, 100, 100 );
  for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
    var vertex = ground_geometry.vertices[i];
    vertex.z = NoiseGen.noise( vertex.x / 500, (vertex.y / 500)) * 20;
  }
  ground_geometry.computeFaceNormals();
  ground_geometry.computeVertexNormals();

  // If your plane is not square as far as face count then the HeightfieldMesh
  // takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
  ground = new Physijs.HeightfieldMesh(
    ground_geometry,
    ground_material,
    0, // mass
    100,
    100
  );
  ground.rotation.x = Math.PI / -2;
  ground.receiveShadow = true;
  scene.add( ground );

  requestAnimationFrame( render );
  scene.simulate();

  createLandingPad();
  createRocket();

};

function displayCamera(index) {

  switch (index) {
    case 0:

    camera.lookAt(rocketShape.position);

      break;
    case 1:

    // camera.lookAt(rocketShape.position);
    camera.localPosition = new THREE.Vector3(0, 0, -2);
    camera.parent = rocketShape;
    // camera.position = new THREE.Vector3(0, 5, -5);

      break;
    default:

  }

}

render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  // render_stats.update();
};

function createRocket() {

  var rocketGeometry = new THREE.BoxGeometry( 0.6, 3, 0.6 );

  rocketShape = new Physijs.BoxMesh(
    rocketGeometry,
    new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      castShadow: true,
      receiveShadow: true
    }),
    10
  );

  rocketShape.position.y = 8.5;

  scene.add(rocketShape);

}

function createLandingPad() {

  var landingPadGeometry = new THREE.BoxGeometry( 10, 10, 10 );

  var landingPadShape = new Physijs.BoxMesh(
    landingPadGeometry,
    new THREE.MeshLambertMaterial({
      color: 0xff0000,
      castShadow: true,
      receiveShadow: true
    }),
    0
  );

  scene.add(landingPadShape);

}

window.onload = initScene;

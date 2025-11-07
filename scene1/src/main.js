import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from './objects/Water';
import { Ground } from './objects/Ground';
import { setupUI } from './ui'; 
import { fill } from 'three/src/extras/TextureUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { TextureLoader, RepeatWrapping, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';
import { highpModelNormalViewMatrix } from 'three/tsl';

// Animation
const clock = new THREE.Clock();

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);


const imgPlaneLoader = new THREE.TextureLoader();

// function createFacePlane(imagePath, tankSize, tankCenter) {
//   imgPlaneLoader.load(imagePath, (texture) => {
//     texture.encoding = THREE.sRGBEncoding;
//     texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

//     // ⬇️ Match the plane’s size to the tank’s visible width/height
//     const geometry = new THREE.PlaneGeometry(tankSize.x * 1.2, tankSize.y * 1.2); // 1.2 = small margin
//     const material = new THREE.MeshBasicMaterial({
//       map: texture,
//       transparent: true,
//       opacity: 0.7,           // blend nicely
//       depthWrite: false,
//       side: THREE.FrontSide,
//     });

//     const facePlane = new THREE.Mesh(geometry, material);

//     // ⬇️ Place it slightly *behind* the tank
//     facePlane.position.set(tankCenter.x, tankCenter.y, tankCenter.z - tankSize.z * 0.6);

//     // Optional: subtle blur/fade feel by lowering opacity or adding emissive tint
//     facePlane.renderOrder = -1;

//     scene.add(facePlane);
//   });
// }

// Example usage
let facePlane; // store reference globally
const imgPaths = [ '/image1.png', '/image2.png',
                   '/image3.png', '/image4.png',
                   '/image5.png', '/image6.png','/image7.png', '/image8.png',
                   '/image9.png', '/image10.png',
 '/image12.png','/image13.png', '/image14.png',
                   '/image15.png', '/image16.png',
                   '/image17.png'];
let currentImgIndex = 0;

function createFacePlane(imagePath, tankSize, tankCenter) {
  imgPlaneLoader.load(imagePath, (texture) => {
    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    if (!facePlane) {
      // First time, create the mesh
      const geometry = new THREE.PlaneGeometry(tankSize.x * 1.1, tankSize.y * 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        side: THREE.FrontSide,
      });

      facePlane = new THREE.Mesh(geometry, material);
      facePlane.position.set(tankCenter.x, tankCenter.y, tankCenter.z - tankSize.z * 0.6);
      facePlane.renderOrder = -1;
      scene.add(facePlane);

    } else {
      // Just update texture for next image
      facePlane.material.map = texture;
      facePlane.material.needsUpdate = true;
    }
  });
}
const tankSize = { x: 10, y: 6, z: 8 };   // adjust to your tank dimensions
const tankCenter = { x: 0, y: 0, z: 0 };
setInterval(() => {
  currentImgIndex = (currentImgIndex + 1) % imgPaths.length;
  createFacePlane(imgPaths[currentImgIndex], tankSize, tankCenter);
}, 1000); // change image every 3 seconds

// Add camera to scene (if not already)
if (!camera.parent) scene.add(camera);


// // Initialize background with first image
// bgLoader.load(imgPaths[currentImgIndex], (tex) => {
//   tex.encoding = THREE.sRGBEncoding;
//   const initial = tex;
//   bgMesh = makeBackgroundPlane(initial);
//   // Position the plane directly in front of the camera
//   bgMesh.position.set(0, 0, -bgDistance);
//   camera.add(bgMesh); // attach to camera so it always faces and follows
// });

// // --- Update background function (switch textures) ---
// function changeBackgroundPlane() {
//   const path = imgPaths[currentImgIndex];
//   bgLoader.load(path, (texture) => {
//     texture.encoding = THREE.sRGBEncoding;
//     if (!bgMesh) {
//       // If mesh not created yet, create now
//       bgMesh = makeBackgroundPlane(texture);
//       bgMesh.position.set(0, 0, -bgDistance);
//       camera.add(bgMesh);
//     } else {
//       // swap the texture on the existing material cleanly
//       const mat = bgMesh.material;
//       mat.map && mat.map.dispose();
//       mat.map = texture;
//       mat.needsUpdate = true;
//     }
//   }, undefined, (err) => console.error('bg load err', err));
//   currentImgIndex = (currentImgIndex + 1) % imgPaths.length;
// }

// // call periodically like you were already doing
// changeBackgroundPlane();
// setInterval(changeBackgroundPlane, 10000);

// const loader = new THREE.TextureLoader();
// const imgPaths = [ '/static/css/image1.png', '/static/css/image2.png',
//                    '/static/css/image3.png', '/static/css/image4.png',
//                    '/static/css/image5.png', '/static/css/image6.png' ];
// let currentImgIndex = 0;
// let environmentMap; 

// function changeBackground() {
//     const path = imgPaths[currentImgIndex];
//     loader.load(
//         path,
//         function (texture) {
//             console.log('Background texture loaded:', texture);
//             texture.mapping = THREE.EquirectangularReflectionMapping;
//             texture.encoding = THREE.sRGBEncoding;
//             scene.background = texture;
//             console.log('Background applied.');
//         },
//         undefined,
//         function (error) {
//             console.error('Error loading background image:', error);
//         }
//     );
//     currentImgIndex = (currentImgIndex + 1) % imgPaths.length;
//      // Change every 10 seconds
// }

// changeBackground();
// setInterval(changeBackground, 1000); // Change every 10 seconds
// loader.load(
//   '/static/skybox/ny.png',
//   function (texture) {
//     console.log('Background texture loaded:', texture);
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     texture.encoding = THREE.sRGBEncoding;
//     scene.background = texture;
//     console.log('Background applied.');
//   },
//   undefined,
//   function (error) {
//     console.error('Error loading background image:', error);
//   }
// );


// const poolTexture = new THREE.TextureLoader().load('/threejs-water-shader/ocean_floor.png');
// const noiseTexture = loader.load('/threejs-water-shader/noise.png');


// new RGBELoader().load('./studio_small_08_4k.hdr', function(hdrTexture) {
//   hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
//   scene.environment = hdrTexture;
//   // scene.background = new THREE.Color("#00152e");
//   scene.background = hdrTexture;
//   scene.environmentIntensity = 0.5; // Optional: to show it as background
// })

// const loader1 = new THREE.TextureLoader();
// loader1.load('./skybox/px.png', function(texture) {
//     const geometry = new THREE.PlaneGeometry(100, 100);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const facePlane = new THREE.Mesh(geometry, material);
//     facePlane.position.z = -50; // Behind your water
//     scene.add(facePlane);
//     scene.environment = texture;
// });
// const backgroundloader = new THREE.TextureLoader();
// loader.load('./assets/background.png', function(texture){
//   scene.background = texture;
// });
// Camera position
camera.position.set(0, 3, 15);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add some light to see the ground material
const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);

scene.add(ambientLight);



const waterResolution = { size: 512 };
const water = new Water({
  // environmentMap: environmentMap,
  resolution: waterResolution.size
  
});
water.scale.set(3,5,2) // Adjust the scale to fit your scene

 // Adjust the position to fit your scene
water.renderOrder = 0; 

const modelloader = new GLTFLoader();
modelloader.load('/models/glass.glb', function (gltf) {
  const model = gltf.scene;

  model.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        thickness: 0,
        transparent: true,
        depthWrite: false,
      });
      child.renderOrder = 1;
    }
  });

  model.scale.set(0.84, 0.3, 0.5);
  model.position.set(0, 0, -0.5);
  scene.add(model);

  
  // ⬇️ Get bounding box size (so face matches tank height/width)
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // ⬇️ Now create face planes dynamically
  createFacePlane('/static/css/image1.png', size, center);
});

water.scale.set(3, 15, 5); // Adjust the scale to fit your scene

water.rotation.y = Math.PI/2; // Rotate to face camera

water.position.set(0.7, 15, 0.1); // Adjust the position to fit your scene
scene.add(water);

const bubbleGeometry = new THREE.BufferGeometry();
const bubbleCount = 150;
const positions = new Float32Array(bubbleCount * 3);
const radius = 0.9; // slightly less than water radius
const height = 2; // full water height

function createCircleTexture(size = 64) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, 'white');       // center
  gradient.addColorStop(1, 'rgba(255,255,255,0)'); // edges
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

for (let i = 0; i < bubbleCount; i++) {
  const angle = Math.random() * Math.PI * 2; // around the circle
  const r = radius * (0.8 + 0.2 * Math.random()); // slightly random radius
  positions[i * 3] = r * Math.cos(angle); // x
  positions[i * 3 + 1] = Math.random() * height-1; // y (height)
  positions[i * 3 + 2] = r * Math.sin(angle); // z
}

bubbleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const bubbleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, opacity: 0.7, depthWrite: false, map: createCircleTexture() });
const bubbles = new THREE.Points(bubbleGeometry, bubbleMaterial);
water.add(bubbles); // add to water mesh

//Adding a duck model
// //add ripples
// let duck = null;
// const duckloader = new GLTFLoader();
// duckloader.load(
//   '/models/duck.glb',  // path to your exported .glb
//   function (gltf) {
//     duck = gltf.scene;
//     duck.traverse((child) => {
//   if (child.isMesh) {
//     child.material = new THREE.MeshPhysicalMaterial({
//       color: "#F7F2BE",

      
//     });
//     child.renderOrder = 2;
//   }

// });
//     duck.scale.set(0.5,0.5,0.5);  // scale if necessary
//     scene.add(duck);
//   },
//   function (xhr) {  // called while loading
//     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//   },
//   function (error) {
//     console.error('Error loading GLTF model:', error);
//   },

// );

// Parameters: size, divisions, colorCenterLine, colorGrid
const grid = new THREE.GridHelper(10, 10, 0xffffff, 0x888888);

function spawnFirework(scene, position) {
const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: blue,
    size: 0.08,
    transparent: false,
    opacity: 1,
  });

  const firework = new THREE.Points(geometry, material);
  firework.position.copy(position);
  scene.add(firework);

  // Animate fade out + scale
  let opacity = 1;
   function animate() {
    requestAnimationFrame(animate);
    opacity -= 0.005;
    firework.material.opacity = opacity;
    firework.scale.multiplyScalar(1.05);

    if (opacity <= 0) {
      scene.remove(firework);
      geometry.dispose();
      material.dispose();
    }
  }
  animate();

}

function spawnMegaFirework(scene, positions) {
const particleCount = 50;
const colors=['#FF3CAC', '#2DE2E6', '#ffb6c1'];
for (let j = 0; j < colors.length; j++) {
  const color = colors[j];
  const particlepositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlepositions[i * 3] = (Math.random() - 0.5) * 2;
    particlepositions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    particlepositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(particlepositions, 3));

 const material = new THREE.PointsMaterial({
        size: 0.28,
        color:color,
        transparent: false,
        opacity: 1,
        map: createCircleTexture(64), // your radial gradient texture
        depthWrite: false,
      });

  const firework = new THREE.Points(geometry, material);
  firework.position.copy(positions[j]);
  scene.add(firework);

  // Animate fade out + scale
  let opacity = 1;
   function animate() {
    requestAnimationFrame(animate);
    opacity -= 0.001;
    firework.material.opacity = opacity;
    firework.scale.multiplyScalar(1.05);

    if (opacity <= 0) {
      scene.remove(firework);
      geometry.dispose();
      material.dispose();
    }
  }
  animate();
}
}

function animate() {
  const elapsedTime = clock.getElapsedTime();
  water.update(elapsedTime);
  controls.update();
  // if (duck) {
  //   duck.position.y = water.position.y + water.scale.y / 2  -0.1;
  // }
  
    // Get current water height at duck's (x, z)
    // Make duck float at water surface
  

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
}

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
    // resize the background plane geometry

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// fetch("http://127.0.0.1:5000/api/total_amount")
//     .then(res => res.json())
//     .then(data => {
//         console.log('Water amount:', data.total_amount);
//         console.log(THREE);
//         document.getElementById('waterAmount').textContent = data.total_amount;
//         const amount = data.total_amount; 
//         // Convert cents to dollars
//     });

function getRandomFireworkPositions(fireworkno, radius = 5, heightMin = 5, heightMax = 15) {
  const positions = [];
  for (let i = 0; i < fireworkno; i++) {
    const angle = Math.random() * Math.PI * 2; // around circle
    const r = Math.random() * radius; // random radius
    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);
    const y = heightMin + Math.random() * (heightMax - heightMin); // random height
    positions.push(new THREE.Vector3(x, y, z));
  }
  return positions;
}

// Usage: generate 3 random positions
const fireworkPositions = getRandomFireworkPositions(3);

function showgoalpopup(){
  const popup = document.getElementById('goal-popup');
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove = 'show';
  }, 3000); // Hide after 3 seconds
}

function showNotification(name,amount){
  const container = document.getElementById("donation-notification");
  const notif = document.createElement("div");
  notif.className = "notification";
  container.appendChild(notif);
  console.log("notification shown");
  setTimeout(() => {
    notif.classList.add('show');
  }, 100); // Slight delay to allow CSS transition
  setTimeout(() => {
    notif.classList.remove('show');
    setTimeout(() => {
      container.removeChild(notif);
    }, 500); // Wait for transition to finish before removing
  }, 4000); // Show for 4 seconds
}
async function takeScreenshow() {
  console.log("🟦 takeScreenshow() called");

  renderer.render(scene, camera);
  renderer.domElement.toBlob(async (blob) => {
    if (!blob) {
      console.error("❌ No blob generated — check renderer or WebGL context.");
      return;
    }
    console.log("✅ Blob created, size:", blob.size);

    // Upload to Cloudinary
    const cloudinaryUrl = await uploadScreenshotToCloudinary(blob);
    
    if (cloudinaryUrl) {
      console.log("✅ Screenshot uploaded to Cloudinary:", cloudinaryUrl);
      
      // Send to Python API
      try {
        const response = await fetch("http://127.0.0.1:8000/api/scene3/save-screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            screenshot_url: cloudinaryUrl,
            timestamp: new Date().toISOString(),
            totalUsers: lastTotalUsers || 0  // ← Make sure lastTotalUsers exists
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Screenshot URL sent to API:", result);
        } else {
          console.error("❌ Failed to send screenshot to API:", response.status);
        }
      } catch (err) {
        console.error("⚠️ Error sending screenshot to API:", err);
      }
    }
  }, "image/png");
}

async function uploadScreenshotToCloudinary(blob) {
  console.log("☁️ Uploading screenshot to Cloudinary...");
  
  const cloudName = "do7xjnowr";
  const uploadPreset = "ml_souvenirs";
  
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "water_tank_screenshots");
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );
    
    if (!response.ok) {
      console.error("❌ Cloudinary upload failed:", response.status);
      return null;
    }
    
    const data = await response.json();
    console.log("☁️ Cloudinary response:", data);
    return data.secure_url;
    
  } catch (error) {
    console.error("❌ Error uploading to Cloudinary:", error);
    return null;
  }
}


// Add this temporarily to Scene 1 HTML or at the end of your script


let fillPercent = 0; // Initial fill percentage (40% full)
const goalAmount = 500;// Assuming the goal is 1000 cents (or $10)
const newgoalAmount = 500; // New goal amount in cents (or $120)
let lastTotalAmount = 0; // To track the last fetched amount  
let lastTotalUsers = 0;
async function fetchtotalAmount(){
  try{
    const response = await fetch("https://adithir.pythonanywhere.com/api/total_users");
    const data = await response.json();
    const waterLevel = data.total_users; 
    const name = data.latest_user;
    const name_list = data.contributors;
    console.log("Total amount from Flask:", data.total_users);
    document.getElementById('waterAmount').textContent = data.total_users;
    const totalUsers = data.total_users;
    
    if(totalUsers !== lastTotalUsers){
      console.log("Updating contributor list");
      lastTotalUsers = totalUsers;
      takeScreenshow();
    }
    fillPercent = 1-(waterLevel / goalAmount); // Convert to a percentage (assuming 1000 is the max)
    console.log("Total percent from Flask:",fillPercent);
    animateFill();
    updateProgressBar(1-fillPercent);
    if (waterLevel > lastTotalAmount) {
      console.log('fireworks now');
      showNotification(name,data.latest_amount);
      spawnMegaFirework(scene, fireworkPositions);
      
      

    }
    if (waterLevel >= newgoalAmount) {
      console.log('Goal reached!'); 
      spawnMegaFirework(scene, fireworkPositions);
      showgoalpopup();
      
      
// You can trigger any additional actions here
    }
    lastTotalAmount = waterLevel; // Update last total amount
  }catch (error) {
    console.error('Error fetching total amount:', error);
  }
}

fetchtotalAmount();
setInterval(fetchtotalAmount, 2000); // Fetch every 10 seconds

let currentFill = 1;

const waterHeight = 8.5;// Full height of the water cylinder

function updateProgressBar(percent) {
  const bar = document.getElementById('progressBarFill');
  if (bar) {
    bar.style.width = `${percent * 100}%`;
    // bar.textContent = Math.round(percent * 100) + '%';
  }
}

function updateWaterLevel(percent) {
    percent = Math.max(0, Math.min(1, percent)); // clamp 0–1
    water.scale.y = percent * waterHeight;
    water.position.y = -3.2 + (waterHeight * percent) / 2;
}


// // Set initial fi

function animateFill() {
    if (currentFill < fillPercent) {
        currentFill += 0.00003;

        if (currentFill > fillPercent) currentFill = fillPercent;
    } else if (currentFill > fillPercent) {
        currentFill -= 0.00005;
        if (currentFill < fillPercent) currentFill = fillPercent;
    }
    updateWaterLevel(currentFill);
    // console.log("Current fill:", currentFill);

    if (currentFill !== fillPercent) {
        requestAnimationFrame(animateFill);
    }
}

animateFill();

// function setFillPercent(newPercent) {
//     _fillPercent = THREE.MathUtils.clamp(newPercent, 0, 1);
//     requestAnimationFrame(animateFill);
// }


animate();
setupUI({ waterResolution, water });



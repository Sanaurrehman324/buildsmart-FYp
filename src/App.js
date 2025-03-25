import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ControlsCard from "./components/Controlscard";
import Sidebar from "./components/Sidebar";

function App() {
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  );
  const rendererRef = useRef(new THREE.WebGLRenderer({ antialias: true }));
  const controlsRef = useRef(null);
  const selectedObjectRef = useRef(null);
  const captureScreenshot = () => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    // Ensure the latest frame is rendered before taking a screenshot
    renderer.render(sceneRef.current, cameraRef.current);

    // Convert the WebGL canvas to an image
    const link = document.createElement("a");
    link.href = renderer.domElement.toDataURL("image/png");
    link.download = "scene_screenshot.png";
    link.click();
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xfffffff);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 5, 15);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = true;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controlsRef.current = controls;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Load layout model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/Layout.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -1, 0);
        model.scale.set(1, 1, 1);
        model.name = "room_layout";
        scene.add(model);
      },
      undefined,
      (error) => console.error("Error loading GLB model:", error)
    );

    /** 🔄 Handle Keyboard Movement */
    const handleKeydown = (event) => {
      const selectedObject = selectedObjectRef.current;
      if (!selectedObject) return;

      const sizeSpeed = 0.1;
      const moveSpeed = 0.1;

      switch (event.key) {
        case "w": // Move forward (Z+)
          selectedObject.position.z -= moveSpeed;
          break;
        case "s": // Move backward (Z-)
          selectedObject.position.z += moveSpeed;
          break;
        case "a": // Move left (X-)
          selectedObject.position.x -= moveSpeed;
          break;
        case "d": // Move right (X+)
          selectedObject.position.x += moveSpeed;
          break;
        case "e": // Move up (Y+)
          selectedObject.position.y += moveSpeed;
          break;
        case "q": // Move down (Y-)
          selectedObject.position.y -= moveSpeed;
          break;
        case "+": // Increase size
          selectedObject.scale.multiplyScalar(1 + sizeSpeed);
          break;
        case "-": // Decrease size
          selectedObject.scale.multiplyScalar(1 - sizeSpeed);
          break;
        case "r": // Rotate clockwise
          selectedObject.rotation.y -= Math.PI / 30;
          break;
        case "f": // Rotate counterclockwise
          selectedObject.rotation.y += Math.PI / 30;
          break;
        case "Delete":
        case "Backspace": // 🚀 Delete selected object
          if (selectedObject.parent) {
            selectedObject.parent.remove(selectedObject); // Remove from scene
            selectedObjectRef.current = null; // Deselect object
          }
          break;
        default:
          break;
      }
    };


    /** 🖱 Handle Mouse Click (Select Object) */
    const onMouseDown = (event) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let selectedObject = intersects[0].object;
        while (selectedObject.parent && selectedObject.parent !== scene) {
          selectedObject = selectedObject.parent;
        }

        if (selectedObject.userData.isMovable) {
          selectedObjectRef.current = selectedObject;
        }
      } else {
        selectedObjectRef.current = null;
      }
    };

    document.addEventListener("keydown", handleKeydown);
    renderer.domElement.addEventListener("mousedown", onMouseDown);

    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      document.removeEventListener("keydown", handleKeydown);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /** ➕ Function to Add Furniture */
  const addFurniture = (modelPath) => {
    const scene = sceneRef.current;
    if (!scene) return;

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      modelPath,
      (gltf) => {
        const object = gltf.scene;
        object.position.set(Math.random() * 5, 0, Math.random() * 5);
        object.scale.set(1, 1, 1);
        object.rotation.y = Math.random() * Math.PI * 2;
        object.userData.isMovable = true; // Mark as movable
        scene.add(object);
      },
      undefined,
      (error) => console.error("Failed to load GLB model:", error)
    );
  };

  return (
    <>
      <Sidebar onAddFurniture={addFurniture} onCaptureScreenshot={captureScreenshot} />

      <ControlsCard />
    </>
  );
}

export default App;

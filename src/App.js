import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Sidebar from "./components/Sidebar";

function App() {
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef(new THREE.WebGLRenderer());
  const selectedObjectRef = useRef(null);
  const [furnitureObjects, setFurnitureObjects] = useState([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x808080);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 5, 15);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.maxPolarAngle = Math.PI / 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    mtlLoader.load("/models/JAIMEx.mtl", (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load("/models/JAIMEx.obj", (object) => {
        object.position.set(0, -1, 0);
        object.scale.set(0.1, 0.1, 0.1);
        object.name = "room_layout";
        scene.add(object);
      });
    });

    const onKeyDown = (event) => {
      const selectedObject = selectedObjectRef.current;
      if (selectedObject) {
        const { key } = event;
        switch (key) {
          case "w": selectedObject.position.z -= 0.07; break;
          case "a": selectedObject.position.x -= 0.07; break;
          case "s": selectedObject.position.z += 0.07; break;
          case "d": selectedObject.position.x += 0.07; break;
          case "e": selectedObject.position.y -= 0.07; break;
          case "q": selectedObject.position.y += 0.07; break;
          case "+": selectedObject.scale.x += 0.01; selectedObject.scale.y += 0.01; selectedObject.scale.z += 0.01; break;
          case "-": selectedObject.scale.x = Math.max(0.1, selectedObject.scale.x - 0.01); selectedObject.scale.y = Math.max(0.01, selectedObject.scale.y - 0.01); selectedObject.scale.z = Math.max(0.01, selectedObject.scale.z - 0.01); break;
          case "r": selectedObject.rotation.y += Math.PI / 20; break;
          case "f": selectedObject.rotation.y -= Math.PI / 20; break;
          default: break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      controls.dispose();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addFurniture = (modelPath) => {
    const scene = sceneRef.current;
    if (!scene) return;

    const loader = new OBJLoader();
    loader.load(
      modelPath,
      (object) => {
        object.position.set(Math.random() * 5, 1, Math.random() * 5);
        scene.add(object);
        selectedObjectRef.current = object;
        setFurnitureObjects((prevObjects) => [...prevObjects, object]);
      },
      undefined,
      (error) => console.error("Failed to load model:", error)
    );
  };

  const exportImage = () => {
    const canvas = rendererRef.current.domElement; // Get the WebGL canvas element
    const dataURL = canvas.toDataURL("image/png"); // Capture the canvas as a base64 image

    const link = document.createElement("a"); // Create a temporary link element
    link.href = dataURL; // Set the href to the captured image data
    link.download = "scene_image.png"; // Set the download filename
    link.click(); // Simulate a click to download the image
  };

  return (
    <>
      <Sidebar onAddFurniture={addFurniture} />
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={exportImage}
      >
        Export Image
      </button>

    </>
  );
}

export default App;

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ControlsCard from "./components/Controlscard";
import LayoutSidebar from "./components/LayoutSidebar";
import Sidebar from "./components/Sidebar";
import DimensionsCard from "./components/dimensionscard"; // ✅ import
function App() {
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
  );
  const rendererRef = useRef(new THREE.WebGLRenderer({ antialias: true }));
  const controlsRef = useRef(null);
  const selectedObjectRef = useRef(null);

  const captureScreenshot = () => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    renderer.render(sceneRef.current, cameraRef.current);
    const link = document.createElement("a");
    link.href = renderer.domElement.toDataURL("image/png");
    link.download = "scene_screenshot.png";
    link.click();
  };

  const [dimensions, setDimensions] = useState(null);

  const updateDimensions = (object) => {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);

    const metersToFeet = 3.28084;

    setDimensions({
      width: size.x * metersToFeet,
      height: size.y * metersToFeet,
      depth: size.z * metersToFeet,
    });
  };


  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 5, 15);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.5;
    controls.screenSpacePanning = true;
    controls.enablePan = true;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controlsRef.current = controls;


    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const handleKeydown = (event) => {
      const selectedObject = selectedObjectRef.current;
      if (!selectedObject) return;

      const sizeSpeed = 0.1;
      const moveSpeed = 0.1;

      switch (event.key) {
        case "w":
        case "W":
        case "ArrowUp":
          selectedObject.position.z -= moveSpeed;
          break;
        case "s":
        case "S":
        case "ArrowDown":
          selectedObject.position.z += moveSpeed;
          break;
        case "a":
        case "A":
        case "ArrowLeft":
          selectedObject.position.x -= moveSpeed;
          break;
        case "d":
        case "D":
        case "ArrowRight":
          selectedObject.position.x += moveSpeed;
          break;
        case "e":
        case "E":
          selectedObject.position.y += moveSpeed;
          break;
        case "q":
        case "Q":
          selectedObject.position.y -= moveSpeed;
          break;

        case "+":
          selectedObject.scale.multiplyScalar(1 + sizeSpeed);
          updateDimensions(selectedObject); // ✅ update size
          break;
        case "-":
          selectedObject.scale.multiplyScalar(1 - sizeSpeed);
          updateDimensions(selectedObject); // ✅ update size
          break;
        case "r":
        case "R":
          selectedObject.rotation.y -= Math.PI / 100;
          break;
        case "f":
        case "F":
          selectedObject.rotation.y += Math.PI / 100;
          break;
        case "Delete":
        case "Backspace":
          if (selectedObject.parent) {
            selectedObject.parent.remove(selectedObject);
            selectedObjectRef.current = null;
          }
          break;
        default:
          break;
      }
    };

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
          updateDimensions(selectedObject); // ✅ update on selection
        } else {
          selectedObjectRef.current = null;
          setDimensions(null);
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

  /** ➕ Add Furniture Model */
  const addFurniture = (modelPath) => {
    const scene = sceneRef.current;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      modelPath,
      (gltf) => {
        const object = gltf.scene;
        object.position.set(Math.random() * 5, 0, Math.random() * 5);
        object.scale.set(1, 1, 1);
        object.rotation.y = Math.random() * Math.PI * 2;
        object.userData.isMovable = true;
        scene.add(object);
      },
      undefined,
      (error) => console.error("Failed to load furniture model:", error)
    );
  };

  /** 🏠 Select Layout from Sidebar */
  const loadLayout = (modelPath) => {
    const scene = sceneRef.current;
    const gltfLoader = new GLTFLoader();

    const oldLayout = scene.getObjectByName("room_layout");
    if (oldLayout) scene.remove(oldLayout);

    gltfLoader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.name = "room_layout";
        model.position.set(0, -1, 0);
        model.scale.set(1, 1, 1);
        scene.add(model);
      },
      undefined,
      (error) => console.error("Failed to load layout:", error)
    );
  };

  return (
    <>
      <Sidebar onAddFurniture={addFurniture} onCaptureScreenshot={captureScreenshot} />
      <LayoutSidebar onSelectLayout={loadLayout} />
      <ControlsCard />
      <DimensionsCard dimensions={dimensions} />
    </>
  );
}

export default App;

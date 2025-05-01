import html2canvas from "html2canvas";
import React, { useState } from "react";
import {
    FaBars, FaBath, FaBed, FaChair, FaCouch, FaKitchenSet,
    FaLeaf, FaLightbulb, FaRug, FaTable, FaTv
} from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

const furnitureItems = [
    { name: "Bed", path: "/models/king_bed.glb", icon: <FaBed />, },
    { name: "Wood-Bed", path: "/models/WoodenBed.glb", icon: <FaBed /> },
    { name: "ModernBed", path: "/models/ModernBed.glb", icon: <FaBed /> },
    { name: "Chandelier", path: "/models/Chandelier.glb", icon: <FaLightbulb /> },
    { name: "Chandelier", path: "/models/Chandelier2.glb", icon: <FaLightbulb /> },
    { name: "Chair", path: "/models/furniture_sofa.glb", icon: <FaChair />, },
    { name: "Planter", path: "/models/Planter.glb", icon: <FaLeaf />, },
    { name: "Kitchen", path: "/models/Kitchen.glb", icon: <FaKitchenSet />, },
    { name: "3 Seater Sofa", path: "/models/3Sofa.glb", icon: <FaCouch />, },
    { name: "Tv-Console", path: "/models/Tv-Console.glb", icon: <FaTv />, },
    { name: "Pendant-Light", path: "/models/PendantLight.glb", icon: <FaLightbulb /> },
    { name: "Sofa", path: "/models/SofaChair.glb", icon: <FaCouch /> },
    { name: "Couch", path: "/models/Couch.glb", icon: <FaCouch /> },
    { name: "SofaSet", path: "/models/SofaSet.glb", icon: <FaCouch /> },
    { name: "CoffeeTable", path: "/models/CoffeeTable.glb", icon: <FaTable /> },
    { name: "Table", path: "/models/Table.glb", icon: <FaTable /> },
    { name: "Rug", path: "/models/Rug.glb", icon: <FaRug /> },
    { name: "Curtain", path: "/models/Curtain.glb", icon: <FaRug /> },
    { name: "Curtain2", path: "/models/Curtain2.glb", icon: <FaRug /> },
    { name: "DinningTable", path: "/models/Dinning Table.glb", icon: <FaTable /> },
    { name: "Dining Table", path: "/models/Dinning.glb", icon: <FaTable /> },
    { name: "DressingTable", path: "/models/DressingTable.glb", icon: <FaTable /> },
    { name: "Vanity", path: "/models/Vanity.glb", icon: <FaBath /> },
];

const Sidebar = ({ onAddFurniture, onCaptureScreenshot }) => {
    const [isOpen, setIsOpen] = useState(true);

    const captureScreenshot = () => {
        const targetElement = document.getElementById("canvas-container");
        if (!targetElement) return;

        html2canvas(targetElement, { useCORS: true }).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "scene_screenshot.png";
            link.click();
        });
    };

    return (
        <div style={{
            ...styles.sidebar,
            width: isOpen ? "400px" : "60px",
            padding: isOpen ? "20px" : "10px",
            alignItems: isOpen ? "flex-start" : "center"
        }}>
            <button style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
                <FaBars />
            </button>

            {isOpen && <h2 style={styles.title}>Furniture Library</h2>}

            {isOpen && (
                <div style={styles.listContainer}>
                    {furnitureItems.map(item => (
                        <div key={item.name} style={styles.itemWrapper}>
                            <button
                                onClick={() => onAddFurniture(item.path)}
                                style={styles.itemButton}
                            >
                                <span style={styles.icon}>{item.icon}</span>
                                {item.name}
                            </button>

                        </div>
                    ))}
                </div>
            )}

            {isOpen && (
                <button onClick={onCaptureScreenshot} style={styles.exportButton}>
                    <FiDownload style={{ marginRight: "8px", fontSize: "18px" }} />
                    Export Image
                </button>
            )}
        </div>
    );
};

const styles = {
    sidebar: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        background: "linear-gradient(to bottom, #2c3e50, #34495e)",
        boxSizing: "border-box",
        overflowY: "auto",
        zIndex: 10,
        borderRight: "2px solid #79869b",
        boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "0px 10px 10px 0px",
        fontFamily: "'Roboto', sans-serif",
        color: "#EEEEEE",
        transition: "width 0.3s ease-in-out, padding 0.3s ease-in-out"
    },
    title: {
        textAlign: "center",
        fontSize: "24px",
        marginBottom: "20px",
        fontWeight: "600",
        letterSpacing: "1px"
    },
    toggleButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "24px",
        cursor: "pointer"
    },
    listContainer: {
        marginBottom: "20px",
        width: "100%"
    },
    itemWrapper: {
        marginBottom: "10px"
    },
    itemButton: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "5px 0",
        padding: "12px",
        width: "100%",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
    },
    icon: {
        fontSize: "20px"
    },
    dimensions: {
        paddingLeft: "20px",
        fontSize: "14px",
        color: "#ddd"
    },
    exportButton: {
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 24px",
        backgroundColor: "#e67e22",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
};

export default Sidebar;

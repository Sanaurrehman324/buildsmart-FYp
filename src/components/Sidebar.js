import html2canvas from "html2canvas";
import React, { useState } from "react";
import {
    FaBars, FaBed, FaChair, FaCouch, FaKitchenSet,
    FaLeaf, FaTable, FaTv
} from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

const furnitureItems = [
    { name: "Sofa", path: "/models/sillon.glb", icon: <FaCouch />, dimensions: { length: 200, width: 90, height: 85 } },
    { name: "Dining Table", path: "/models/Dinning.glb", icon: <FaTable />, dimensions: { length: 180, width: 90, height: 75 } },
    { name: "Bed", path: "/models/king_bed.glb", icon: <FaBed />, dimensions: { length: 210, width: 190, height: 100 } },
    { name: "Chair", path: "/models/furniture_sofa.glb", icon: <FaChair />, dimensions: { length: 60, width: 60, height: 90 } },
    { name: "Planter", path: "/models/Planter.glb", icon: <FaLeaf />, dimensions: { length: 30, width: 30, height: 60 } },
    { name: "Kitchen", path: "/models/Kitchen.glb", icon: <FaKitchenSet />, dimensions: { length: 240, width: 60, height: 90 } },
    { name: "3 Seater Sofa", path: "/models/3Sofa.glb", icon: <FaCouch />, dimensions: { length: 220, width: 95, height: 85 } },
    { name: "Tv-Console", path: "/models/Tv-Console.glb", icon: <FaTv />, dimensions: { length: 160, width: 45, height: 55 } },
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
                            <div style={styles.dimensions}>
                                <span>📏 {item.dimensions.length} x {item.dimensions.width} x {item.dimensions.height} cm</span>
                            </div>
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

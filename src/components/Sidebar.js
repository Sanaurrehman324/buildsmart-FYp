import React, { useState } from "react";
import {
    FaBars, FaBath, FaBed, FaChair, FaCouch, FaDoorClosed, FaImage, FaKitchenSet,
    FaLeaf, FaLightbulb, FaRug, FaTable, FaTv
} from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

const furnitureItems = [
    { name: "Bed", path: "/models/king_bed.glb", icon: <FaBed /> },
    { name: "Wood-Bed", path: "/models/WoodenBed.glb", icon: <FaBed /> },
    { name: "Wood-Bed2", path: "/models/WoodBed.glb", icon: <FaBed /> },
    { name: "ModernBed", path: "/models/ModernBed.glb", icon: <FaBed /> },
    { name: "Classic Bed", path: "/models/Classic Bed.glb", icon: <FaBed /> },
    { name: "Classic Bed-2", path: "/models/ClassicalBed.glb", icon: <FaBed /> },
    { name: "FirePlace Built-in", path: "/models/Fireplace Builtin.glb", icon: <FaBed /> },
    { name: "Chandelier", path: "/models/Chandelier.glb", icon: <FaLightbulb /> },
    { name: "Chandelier2", path: "/models/Chandelier2.glb", icon: <FaLightbulb /> },
    { name: "Chair", path: "/models/furniture_sofa.glb", icon: <FaChair /> },
    { name: "Planter", path: "/models/Planter.glb", icon: <FaLeaf /> },
    { name: "Kitchen", path: "/models/Kitchen.glb", icon: <FaKitchenSet /> },
    { name: "Classic Kitchen", path: "/models/Classic Kitchen.glb", icon: <FaKitchenSet /> },
    { name: "Kitchen Island", path: "/models/Kitchen-Island.glb", icon: <FaKitchen /> },
    { name: "L Kitchen", path: "/models/L-Kitchen.glb", icon: <FaKitchenSet /> },
    { name: "3 Seater Sofa", path: "/models/3Sofa.glb", icon: <FaCouch /> },
    { name: "Tv-Console", path: "/models/Tv-Console.glb", icon: <FaTv /> },
    { name: "Tv-Console", path: "/models/TV Console2.glb", icon: <FaTv /> },
    { name: "Pendant-Light", path: "/models/PendantLight.glb", icon: <FaLightbulb /> },
    { name: "Sofa", path: "/models/SofaChair.glb", icon: <FaCouch /> },
    { name: "Couch", path: "/models/Couch.glb", icon: <FaCouch /> },
    { name: "SofaSet", path: "/models/SofaSet.glb", icon: <FaCouch /> },
    { name: "CoffeeTable", path: "/models/CoffeeTable.glb", icon: <FaTable /> },
    { name: "Table", path: "/models/Table.glb", icon: <FaTable /> },
    { name: "Rug", path: "/models/Rug.glb", icon: <FaRug /> },
    { name: "Round Rug", path: "/models/Round_Rug.glb", icon: <FaRug /> },
    { name: "Curtain", path: "/models/Curtain.glb", icon: <FaRug /> },
    { name: "Curtain2", path: "/models/Curtain2.glb", icon: <FaRug /> },
    { name: "DinningTable", path: "/models/Dinning Table.glb", icon: <FaTable /> },
    { name: "Dining Table", path: "/models/Dinning.glb", icon: <FaTable /> },
    { name: "Round Dining Table", path: "/models/RoundDinning.glb", icon: <FaTable /> },
    { name: "DressingTable", path: "/models/DressingTable.glb", icon: <FaTable /> },
    { name: "Vanity", path: "/models/Vanity.glb", icon: <FaBath /> },
    { name: "Image Portrait", path: "/models/Portraits.glb", icon: <FaImage /> },
    { name: "Wood Door", path: "/models/wood Door.glb", icon: <FaDoorClosed /> },








];

const Sidebar = ({ onAddFurniture, onCaptureScreenshot }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [hovered, setHovered] = useState(null);

    return (
        <>
            {isOpen && (
                <button onClick={onCaptureScreenshot} style={styles.exportButton}>
                    <FiDownload style={{ marginRight: "8px", fontSize: "18px" }} />
                    Export
                </button>
            )}

            <div style={{
                ...styles.sidebar,
                width: isOpen ? "300px" : "60px",
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
                                    onMouseEnter={() => setHovered(item.name)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{
                                        ...styles.itemButton,
                                        backgroundColor: hovered === item.name ? "#a8e6cf" : "#4e5a65",
                                        color: hovered === item.name ? "#333" : "#fff"
                                    }}
                                >
                                    <span style={styles.icon}>{item.icon}</span>
                                    {item.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const styles = {
    sidebar: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
        overflowY: "auto",
        zIndex: 10,
        borderRight: "1px solid #ccc",
        boxShadow: "4px 0px 12px rgba(0, 0, 0, 0.05)",
        borderRadius: "0 10px 10px 0",
        fontFamily: "'Roboto', sans-serif",
        transition: "width 0.3s ease, padding 0.3s ease",
        padding: "20px"
    },
    title: {
        textAlign: "left",
        fontSize: "22px",
        marginBottom: "18px",
        fontWeight: "bold",
        color: "#333",
        paddingLeft: "10px"
    },
    toggleButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        color: "#333",
        fontSize: "22px",
        cursor: "pointer"
    },
    listContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    itemWrapper: {},
    itemButton: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "6px 0",
        padding: "12px",
        width: "100%",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)"
    },
    icon: {
        fontSize: "18px"
    },
    exportButton: {
        position: "fixed",
        top: "15px",
        left: "320px",
        zIndex: 101,
        padding: "10px 18px",
        backgroundColor: "#10B981",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
        transition: "background-color 0.3s ease"
    }
};

export default Sidebar;

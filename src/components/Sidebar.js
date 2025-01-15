import React from "react";

const Sidebar = ({ onAddFurniture, onExportImage }) => {
    const furnitureItems = [
        { name: "Sofa", path: "/models/furniture_chair.obj" },
        { name: "Table", path: "/models/furniture_table.obj" },
        { name: "Bed", path: "/models/bed.obj" },
        { name: "Chair", path: "/models/furniture_sofa.obj" }
    ];

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "350px",
            backgroundColor: "#333d48",  // Light grey
            padding: "20px",
            boxSizing: "border-box",
            overflowY: "auto",
            zIndex: 10,
            borderRight: "2px solid #79869b",
            boxShadow: "4px 0px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "0px 10px 10px 0px",
            fontFamily: "'Roboto', sans-serif"
        }}>
            <h2 style={{
                textAlign: "center",
                color: "#EEEEEE",  // Dark grey font color
                fontSize: "24px",
                marginBottom: "20px",
                fontWeight: "600"
            }}>
                Furniture Library
            </h2>
            <div style={{ marginBottom: "20px" }}>
                {furnitureItems.map(item => (
                    <button
                        key={item.name}
                        onClick={() => onAddFurniture(item.path)}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "12px",
                            width: "100%",
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease, transform 0.2s ease",
                        }}
                    // onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
                    // onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
                    >
                        Add {item.name}
                    </button>
                ))}
            </div>
            <button
                onClick={onExportImage}
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "12px 24px",
                    backgroundColor: "#2196F3", // Initial Blue color
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#1e88e5"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#2196F3"}
            // onClick={(e) => {
            //     e.target.style.backgroundColor = "#1976D2"; // Blue on click
            // }}
            >
                Export Image
            </button>
        </div>
    );
};

export default Sidebar;

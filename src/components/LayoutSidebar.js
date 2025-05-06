import React, { useState } from "react";
import "./LayoutSidebar.css"; // ✅ Optional: use if you want separate CSS

const layouts = [
    {
        name: "Evergreen Duplex Residence",
        modelPath: "/models/jaime.glb",
        icon: "🏠",
    },
    {
        name: "Luxury Classical Villa",
        modelPath: "/models/mdab.glb",
        icon: "🏡",
    },
    {
        name: "Modern Appartment Interior Layout",
        modelPath: "/models/Hamisha.glb",
        icon: "🏢",

    },
    {
        name: "Contemporary House Layout",
        modelPath: "/models/Allysa.glb",
        icon: "🏢",

    },

];

const LayoutSidebar = ({ onSelectLayout }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`layout-sidebar ${isOpen ? "open" : "closed"}`}>
            <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "→" : "←"}
            </button>

            {isOpen && (
                <div className="sidebar-content">
                    <h3>🗂 Choose a Layout</h3>
                    <ul className="layout-list">
                        {layouts.map((layout) => (
                            <li
                                key={layout.name}
                                className="layout-item"
                                onClick={() => onSelectLayout(layout.modelPath)}
                            >
                                <span className="icon">{layout.icon}</span>
                                <span>{layout.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LayoutSidebar;

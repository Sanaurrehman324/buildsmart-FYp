import React from "react";
import "./ControlsCard.css"; // Add styling for the cards

const ControlsCard = () => {
    return (
        <div className="controls-card">
            <h3>Controls</h3>
            <ul>
                <li><strong>Camera Movement:</strong> Mouse (OrbitControls)</li>
                <li><strong>Select Object:</strong> Click</li>
                <li><strong>Move Object (X/Y):</strong> W/A/S/D</li>
                <li><strong>Move Object (Z):</strong> Q/E</li>
                <li><strong>Rotate Object:</strong> O/P</li>
                <li><strong>Scale Object:</strong> -/+</li>
            </ul>
        </div>
    );
};

export default ControlsCard;
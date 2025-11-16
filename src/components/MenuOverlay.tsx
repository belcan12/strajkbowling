import React from "react";
import type { View } from "../types";

interface MenuOverlayProps {
  isOpen: boolean;
  currentView: View;
  hasBooking: boolean;
  onNavigate: (view: View) => void;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  currentView,
  hasBooking,
  onNavigate,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleClick = (view: View) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="menu-overlay">
      <div className="menu-content">
        <button
          className={`menu-link ${
            currentView === "booking" ? "active" : ""
          }`}
          onClick={() => handleClick("booking")}
        >
          BOOKING
        </button>
        <button
          className={`menu-link ${
            currentView === "confirmation" ? "active" : ""
          }`}
          onClick={() => hasBooking && handleClick("confirmation")}
          disabled={!hasBooking}
        >
          CONFIRMATION
        </button>
      </div>
    </div>
  );
};

export default MenuOverlay;

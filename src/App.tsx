import React, { useEffect, useState } from "react";
import BookingView from "./components/BookingView";
import LoadingScreen from "./components/LoadingScreen";
import ConfirmationView from "./components/ConfirmationView";
import MenuOverlay from "./components/MenuOverlay";
import type { BookingResponse, View } from "./types";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("loading");
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView("booking");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBookingSuccess = (response: BookingResponse) => {
    setBooking(response);
    setCurrentView("confirmation");
  };

  const hasBooking = booking !== null;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navigateTo = (view: View) => {
    if (view === "confirmation" && !booking) {
      // ingen bokning än → stanna kvar
      return;
    }
    setCurrentView(view);
  };

  const handleBackToBooking = () => {
    setCurrentView("booking");
  };

  return (
    <div className="app-root">
      <div className="app-shell">
        <button
          type="button"
          className="hamburger-button"
          aria-label="Öppna meny"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        {currentView === "loading" && <LoadingScreen />}

        {currentView === "booking" && (
          <BookingView onBookingSuccess={handleBookingSuccess} />
        )}

        {currentView === "confirmation" && booking && (
          <ConfirmationView
            booking={booking}
            onBackToBooking={handleBackToBooking}
          />
        )}

        {currentView === "confirmation" && !booking && (
          <div className="screen">
            <p>Ingen bokning ännu. Gå till BOOKING i menyn först.</p>
          </div>
        )}

        <MenuOverlay
          isOpen={isMenuOpen}
          currentView={currentView}
          hasBooking={hasBooking}
          onNavigate={navigateTo}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;

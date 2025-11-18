
import React from "react";
import bowlingLogo from "../assets/bowlinglogo.png";
import type { BookingResponse } from "../types";

interface ConfirmationViewProps {
  booking: BookingResponse;
  onBackToBooking: () => void;
}

function formatWhen(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  const day = date.getDate();
  const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
  ];
  const month = monthNames[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}.${minutes}, ${day} ${month}`;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  booking,
  onBackToBooking,
}) => {
  return (
    <div className="screen confirmation-screen">
      <div className="logo-row">
        <img
          src={bowlingLogo}
          alt="Strajk Bowling logo"
          className="logo-image"
        />
      </div>

      <h1 className="confirmation-title">SEE YOU SOON!</h1>

      <h2 className="section-title">BOOKING DETAILS</h2>

      <section className="booking-details-section">
        <div className="field-group">
          <span className="field-label">WHEN</span>
          <div className="detail-card">{formatWhen(booking.when)}</div>
        </div>

        <div className="field-group">
          <span className="field-label">WHO</span>
          <div className="detail-card">{booking.people} pers</div>
        </div>

        <div className="field-group">
          <span className="field-label">LANES</span>
          <div className="detail-card">
            {booking.lanes} {booking.lanes === 1 ? "lane" : "lanes"}
          </div>
        </div>

        <div className="field-group">
          <span className="field-label">BOOKING NUMBER</span>
          <div className="detail-card">{booking.id}</div>
        </div>

        <div className="total-row">
          <span className="total-label">total</span>
          <span className="total-value">{booking.price} SEK</span>
        </div>
      </section>

      <button
        className="primary-button"
        type="button"
        onClick={onBackToBooking}
      >
        SWEET, LETS GO!
      </button>
    </div>
  );
};

export default ConfirmationView;

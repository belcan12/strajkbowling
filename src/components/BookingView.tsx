
import React, { useEffect, useState } from "react";
import bowlingLogo from "../assets/bowlinglogo.png";
import type { BookingRequest, BookingResponse } from "../types";
import { createBooking } from "../api/strajkApi";

interface BookingViewProps {
  onBookingSuccess: (booking: BookingResponse) => void;
}

const BookingView: React.FC<BookingViewProps> = ({ onBookingSuccess }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [lanes, setLanes] = useState(1);
  const [shoes, setShoes] = useState<string[]>([""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Håll antal skostorlekar i sync med antal spelare
  useEffect(() => {
    setShoes((prev) => {
      const arr = [...prev];
      if (people > arr.length) {
        return [...arr, ...Array(people - arr.length).fill("")];
      } else if (people < arr.length) {
        return arr.slice(0, people);
      }
      return arr;
    });
  }, [people]);

  const handleChangeShoe = (index: number, value: string) => {
    setShoes((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  const handleRemoveShoe = (index: number) => {
    if (people <= 1) return;
    const newPeople = people - 1;
    setPeople(newPeople);
    setShoes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPlayer = () => {
    const maxPlayers = lanes * 4;
    if (people >= maxPlayers) {
      setErrorMessage(
        `Max 4 spelare per bana. Med ${lanes} bana/banaor kan du ha max ${maxPlayers} spelare.`
      );
      return;
    }
    setErrorMessage(null);
    setPeople((prev) => prev + 1);
  };

  const handleStepperKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const allowed = ["ArrowUp", "ArrowDown", "Tab"];
    if (!allowed.includes(event.key)) {
      event.preventDefault();
    }
  };

  const validate = (): boolean => {
    if (!date || !time) {
      setErrorMessage("Välj datum och tid.");
      return false;
    }

    if (people < 1) {
      setErrorMessage("Minst 1 spelare behövs.");
      return false;
    }

    if (lanes < 1) {
      setErrorMessage("Minst 1 bana behövs.");
      return false;
    }

    const maxPlayers = lanes * 4;
    if (people > maxPlayers) {
      setErrorMessage(
        `Max 4 spelare per bana. Med ${lanes} bana/banaor kan du ha max ${maxPlayers} spelare.`
      );
      return false;
    }

    if (shoes.length !== people) {
      setErrorMessage("Antalet skostorlekar måste matcha antalet spelare.");
      return false;
    }

    if (shoes.some((s) => s.trim() === "")) {
      setErrorMessage("Fyll i skostorlek för alla spelare.");
      return false;
    }

    if (shoes.some((s) => Number.isNaN(Number(s)))) {
      setErrorMessage("Skostorlekar måste vara siffror.");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingRequest: BookingRequest = {
        when: `${date}T${time}`,
        lanes,
        people,
        shoes: shoes.map((s) => Number(s)),
      };

      const response = await createBooking(bookingRequest);
      onBookingSuccess(response);
    } catch (error) {
      console.error(error);
      let message = "Något gick fel med bokningen. Försök igen om en stund.";

      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          message =
            "Kunde inte nå bokningsservern (CORS/internet-fel). Prova igen strax eller be läraren kolla servern.";
        } else {
          message = error.message;
        }
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen booking-screen">
      <div className="logo-row">
        <img
          src={bowlingLogo}
          alt="Strajk Bowling logo"
          className="logo-image"
        />
      </div>

      <h1 className="page-title">BOOKING</h1>

      <form onSubmit={handleSubmit} noValidate>
        <h2 className="section-title">WHEN, WHAT & WHO</h2>

        <div className="form-grid">
          <div className="field-group">
            <label className="field-label" htmlFor="date">
              DATE
            </label>
            <input
              id="date"
              type="date"
              className="field-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="time">
              TIME
            </label>
            <input
              id="time"
              type="time"
              className="field-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="field-group full-width">
            <label className="field-label" htmlFor="people">
              NUMBER OF AWESOME BOWLERS
            </label>
            <input
              id="people"
              type="number"
              min={1}
              className="field-input"
              value={people}
              onChange={(e) =>
                setPeople(Math.max(1, Number(e.target.value) || 1))
              }
              onKeyDown={handleStepperKeyDown}
            />
          </div>

          <div className="field-group full-width">
            <label className="field-label" htmlFor="lanes">
              NUMBER OF LANES
            </label>
            <input
              id="lanes"
              type="number"
              min={1}
              className="field-input"
              value={lanes}
              onChange={(e) =>
                setLanes(Math.max(1, Number(e.target.value) || 1))
              }
              onKeyDown={handleStepperKeyDown}
            />
          </div>
        </div>

        <section className="shoes-section">
          <h2 className="section-title">SHOES</h2>
          <div className="shoes-list">
            {shoes.map((size, index) => (
              <div key={index} className="shoe-row">
                <div className="field-group">
                  <label className="field-label" htmlFor={`shoe-${index}`}>
                    SHOE SIZE / PERSON {index + 1}
                  </label>
                  <input
                    id={`shoe-${index}`}
                    type="number"
                    className="field-input"
                    placeholder="Euro 44"
                    value={size}
                    onChange={(e) => handleChangeShoe(index, e.target.value)}
                  />
                </div>
                {people > 1 && (
                  <button
                    type="button"
                    className="remove-shoe-btn"
                    aria-label={`Ta bort spelare ${index + 1}`}
                    onClick={() => handleRemoveShoe(index)}
                  >
                    −
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="add-shoe-btn"
            onClick={handleAddPlayer}
            aria-label="Lägg till spelare"
          >
            +
          </button>
        </section>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "BOKAR..." : "STRIIIKE!"}
        </button>
      </form>
    </div>
  );
};

export default BookingView;

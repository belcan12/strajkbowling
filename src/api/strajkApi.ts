import type { BookingRequest, BookingResponse } from "../types";

const BASE_URL = "/api";

let cachedApiKey: string | null = null;

async function fetchApiKey(): Promise<string> {
  if (cachedApiKey) {
    return cachedApiKey;
  }

  const response = await fetch(`${BASE_URL}/key`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta API-nyckel.");
  }

  const data: { key: string } = await response.json();
  cachedApiKey = data.key;
  return cachedApiKey;
}

export async function createBooking(
  booking: BookingRequest
): Promise<BookingResponse> {
  const apiKey = await fetchApiKey();

  const response = await fetch(`${BASE_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    
    let message = "Servern kunde inte genomföra bokningen.";
    try {
      const errorBody = await response.json();
      if (errorBody && typeof errorBody.message === "string") {
        message = errorBody.message;
      }
    } catch {
      
    }
    throw new Error(message);
  }

  const data: BookingResponse = await response.json();
  return data;
}

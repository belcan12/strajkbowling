export interface BookingRequest {
  when: string;   // ISO-tid: "2022-11-11T18:00"
  lanes: number;
  people: number;
  shoes: number[];
}

export interface BookingResponse extends BookingRequest {
  price: number;  // 120 kr / person + 100 kr / bana (räknas på servern)
  id: string;     // bokningsnummer, typ "str7283472"
  active: boolean;
}

export type View = "loading" | "booking" | "confirmation";

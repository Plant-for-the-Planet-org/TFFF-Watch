import { create } from "zustand";
import { ForestChangeForCountry } from "./types";

type WorldMapStore = {
  year: string;
  country: string;
  latitude: number;
  longitude: number;
  point: { x: number; y: number };
  setYear: (year: string) => void;
  setCountry: (country: string) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  setPoint: (point: { x: number; y: number }) => void;
};

type ForestCoverChangeStore = {
  forestCoverChangeData: ForestChangeForCountry[];
  setForestCoverChangeData: (data: ForestChangeForCountry[]) => void;
};

export const useForestCoverChangeData = create<ForestCoverChangeStore>(
  (set) => ({
    forestCoverChangeData: [],
    setForestCoverChangeData: (data) => set({ forestCoverChangeData: data }),
  })
);

export const useWorldMap = create<WorldMapStore>((set) => ({
  year: "",
  country: "",
  latitude: 0,
  longitude: 0,
  point: { x: 0, y: 0 },
  setYear: (year) => set({ year }),
  setCountry: (country) => set({ country }),
  setCoordinates: ({ lat, lng }) => set({ latitude: lat, longitude: lng }),
  setPoint: (point) => set({ point }),
}));

export const usePopupStore = create((set) => ({
  popup: Date.now(),
  setPopup: () => set({ popup: Date.now() }),
}));

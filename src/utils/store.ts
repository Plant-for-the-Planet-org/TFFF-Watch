import { create } from "zustand";
import { ForestCoverChange } from "./types";

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
  forestCoverChangeData: ForestCoverChange[];
  forestCiverChangeDataByCountry: ForestCoverChange[];
  setForestCoverChangeData: (data: ForestCoverChange[]) => void;
  setForestCoverChangeDataByCountry: (data: ForestCoverChange[]) => void;
};

export const useForestCoverChangeData = create<ForestCoverChangeStore>(
  (set) => ({
    forestCoverChangeData: [],
    forestCiverChangeDataByCountry: [],
    setForestCoverChangeData: (data) => set({ forestCoverChangeData: data }),
    setForestCoverChangeDataByCountry: (data) =>
      set({ forestCiverChangeDataByCountry: data }),
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

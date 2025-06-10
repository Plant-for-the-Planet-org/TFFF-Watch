import { create } from "zustand";
import { ForestChangeForCountry } from "./types";

type WorldMapStore = {
  year: string;
  country: string;
  latitude: number;
  longitude: number;
  forestCoverChangeData: ForestChangeForCountry[];
  setYear: (year: string) => void;
  setCountry: (country: string) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  setForestCoverChangeData: (data: ForestChangeForCountry[]) => void;
};

export const useWorldMap = create<WorldMapStore>((set) => ({
  year: "",
  country: "",
  latitude: 0,
  longitude: 0,
  forestCoverChangeData: [],
  setYear: (year) => set({ year }),
  setCountry: (country) => set({ country }),
  setCoordinates: ({ lat, lng }) => set({ latitude: lat, longitude: lng }),
  setForestCoverChangeData: (data) => set({ forestCoverChangeData: data }),
}));

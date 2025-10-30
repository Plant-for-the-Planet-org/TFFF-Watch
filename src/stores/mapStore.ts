import { create } from "zustand";
import {
  CountryData,
  DatasetType,
  TFFFData,
  LayerData,
  WorldMapState,
  CountryMapState,
} from "../components/maps/shared/types";

interface WorldMapStore extends WorldMapState {
  setSelectedCountry: (country: CountryData | null) => void;
  setSelectedYear: (year: string) => void;
  setSelectedDataset: (dataset: DatasetType) => void;
  setClickPosition: (position: { x: number; y: number } | null) => void;
  setForestData: (dataset: DatasetType, data: TFFFData[]) => void;
  setIsLoading: (loading: boolean) => void;
  setDefaultCountryLoaded: (loaded: boolean) => void;
  getCurrentForestData: () => TFFFData[];
  getSelectedCountryData: () => TFFFData | null;
}

export const useWorldMapStore = create<WorldMapStore>((set, get) => ({
  selectedCountry: null,
  selectedYear: "2024",
  selectedDataset: "JRC",
  clickPosition: null,
  forestData: { GFW: [], JRC: [] },
  isLoading: false,
  defaultCountryLoaded: false,

  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedDataset: (dataset) => set({ selectedDataset: dataset }),
  setClickPosition: (position) => set({ clickPosition: position }),
  setForestData: (dataset, data) =>
    set((state) => ({
      forestData: { ...state.forestData, [dataset]: data },
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setDefaultCountryLoaded: (loaded) => set({ defaultCountryLoaded: loaded }),

  getCurrentForestData: () => {
    const state = get();
    return state.forestData[state.selectedDataset];
  },
  getSelectedCountryData: () => {
    const state = get();
    const currentData = state.forestData[state.selectedDataset];
    if (!state.selectedCountry || !currentData.length) return null;

    return (
      currentData.find(
        (data) => data["country-iso2"] === state.selectedCountry?.iso2
      ) || null
    );
  },
}));

interface CountryMapStore extends CountryMapState {
  setCountry: (country: CountryData) => void;
  setYear: (year: string) => void;
  setDataset: (dataset: DatasetType) => void;
  setLayerData: (dataset: DatasetType, data: LayerData | null) => void;
  setTfffData: (dataset: DatasetType, data: TFFFData | null) => void;
  setIsLoading: (loading: boolean) => void;
  getCurrentLayerData: () => LayerData | null;
  getCurrentTfffData: () => TFFFData | null;
}

export const useCountryMapStore = create<CountryMapStore>((set, get) => ({
  country: { iso2: "", iso3: "", name: "", slug: "", flagImgUrl: "" },
  year: "2024",
  dataset: "GFW",
  layerData: { GFW: null, JRC: null },
  tfffData: { GFW: null, JRC: null },
  isLoading: false,

  setCountry: (country) => set({ country }),
  setYear: (year) => set({ year }),
  setDataset: (dataset) => set({ dataset }),
  setLayerData: (dataset, data) =>
    set((state) => ({
      layerData: { ...state.layerData, [dataset]: data },
    })),
  setTfffData: (dataset, data) =>
    set((state) => ({
      tfffData: { ...state.tfffData, [dataset]: data },
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),

  getCurrentLayerData: () => {
    const state = get();
    return state.layerData[state.dataset];
  },
  getCurrentTfffData: () => {
    const state = get();
    return state.tfffData[state.dataset];
  },
}));

export const BRAZIL_DEFAULT_COUNTRY: CountryData = {
  iso2: "BR",
  iso3: "BRA",
  name: "Brazil",
  slug: "brazil",
  flagImgUrl:
    "http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg",
};

export const initializeBrazilDefault = (store: WorldMapStore) => {
  if (!store.defaultCountryLoaded && !store.selectedCountry) {
    store.setSelectedCountry(BRAZIL_DEFAULT_COUNTRY);
    store.setDefaultCountryLoaded(true);
  }
};

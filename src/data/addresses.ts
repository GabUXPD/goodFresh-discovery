export type SavedAddress = {
  id: string;
  emoji: string;
  label: string;
  address: string;
  favorite: boolean;
};

export const SAVED_ADDRESSES: SavedAddress[] = [
  { id: "casa", emoji: "🏠", label: "Casa", address: "Av. Los leones 50, casa A, Providencia, Región Metropolitana", favorite: true },
  { id: "trabajo", emoji: "🏢", label: "Trabajo", address: "Mariano Sanchez Fontecilla 310, Las Condes", favorite: true },
  { id: "casa-playa", emoji: "📍", label: "Casa playa", address: "Los Litres 2023, Pichidangui, Región de Valparaíso", favorite: true },
  { id: "universidad", emoji: "🎓", label: "Universidad", address: "Tabancura 1515, Vitacura, Región Metropolitana", favorite: false },
];

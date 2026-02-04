// Real Kazakhstan customs checkpoint pairs
export interface CheckpointPair {
  id: string;
  start: string;
  end: string;
  description?: string;
}

export const CHECKPOINT_ROUTES: CheckpointPair[] = [
  { id: 'route-1', start: 'Baxti, Kazakhstan', end: 'Pokitu, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-2', start: 'Dostyk, Kazakhstan', end: 'Alashankou, China', description: 'Kazakhstan-China border (Major rail crossing)' },
  { id: 'route-3', start: 'Kaljat, Kazakhstan', end: 'Dulaty, Kazakhstan', description: 'Domestic checkpoint' },
  { id: 'route-4', start: 'Maykapchagay, Kazakhstan', end: 'Zimunay, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-5', start: 'Nur Joli, Kazakhstan', end: 'Xorgos, China', description: 'Kazakhstan-China border' },
  { id: 'route-6', start: 'Atameken, Kazakhstan', end: 'Guliston, Uzbekistan', description: 'Kazakhstan-Uzbekistan border' },
  { id: 'route-7', start: 'B. Qonysbaeva, Kazakhstan', end: 'Yallama, Uzbekistan', description: 'Kazakhstan-Uzbekistan border' },
  { id: 'route-8', start: 'Qazygurt, Kazakhstan', end: 'Mayskiy, Uzbekistan', description: 'Kazakhstan-Uzbekistan border' },
  { id: 'route-9', start: 'Kaplanbek, Kazakhstan', end: 'Navoiy, Uzbekistan', description: 'Kazakhstan-Uzbekistan border' },
  { id: 'route-10', start: 'Tajen, Kazakhstan', end: 'Qoraqalpog\'iston, Uzbekistan', description: 'Kazakhstan-Uzbekistan border' },
  { id: 'route-11', start: 'Temir-Bobo, Kazakhstan', end: 'Qarabog\'oz, Uzbekistan', description: 'Kazakhstan-Uzbekistan border' },
  { id: 'route-12', start: 'Port Kuryk, Kazakhstan', end: 'Port Kuryk, Kazakhstan', description: 'Caspian Sea port' },
  { id: 'route-13', start: 'Aysha-Bibi, Kazakhstan', end: 'Chon-Kakpa, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-14', start: 'Auhatty, Kazakhstan', end: 'Kenbulyn, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-15', start: 'Qarasu, Kazakhstan', end: 'Ak-Tilek, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-16', start: 'Kegen, Kazakhstan', end: 'Qarkira, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-17', start: 'Qorday, Kazakhstan', end: 'Oq-Jol, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-18', start: 'Sartobe, Kazakhstan', end: 'To\'qmoq, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-19', start: 'Sypatay Batyr, Kazakhstan', end: 'Chaldybar, Kyrgyzstan', description: 'Kazakhstan-Kyrgyzstan border' },
  { id: 'route-20', start: 'Akbalshik, Kazakhstan', end: 'Voskresenskoye, Russia', description: 'Kazakhstan-Russia border' },
];

// Predefined coordinates for major checkpoints (for faster rendering)
export const KNOWN_COORDINATES: Record<string, [number, number]> = {
  'Dostyk, Kazakhstan': [45.3072, 82.6389],
  'Alashankou, China': [45.1786, 82.5676],
  'Port Kuryk, Kazakhstan': [43.7872, 51.6158],
  'Nur Joli, Kazakhstan': [43.2840, 79.9340],
  'Xorgos, China': [44.2116, 80.4148],
};

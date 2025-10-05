export interface ExoplanetData {
  id: string;
  name: string;
  starName: string;
  position: [number, number, number];
  koi_period: number;
  koi_duration: number;
  koi_depth: number;
  koi_model_snr: number;
  koi_impact: number;
  koi_prad: number;
  koi_teq: number;
  koi_insol: number;
  koi_steff: number;
  koi_slogg: number;
  koi_srad: number;
  koi_fpflag_nt: number;
  koi_fpflag_ss: number;
  koi_fpflag_co: number;
  koi_fpflag_ec: number;
  sciFiMatch?: string;
  confidence?: number;
  classification?: string;
}

export const exoplanets: ExoplanetData[] = [
  {
    id: "kepler-186f",
    name: "Kepler-186f",
    starName: "Kepler-186",
    position: [5, 2, -3],
    koi_period: 129.9,
    koi_duration: 6.24,
    koi_depth: 302,
    koi_model_snr: 12.8,
    koi_impact: 0.34,
    koi_prad: 1.11,
    koi_teq: 188,
    koi_insol: 0.29,
    koi_steff: 3788,
    koi_slogg: 4.74,
    koi_srad: 0.47,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Dagobah (Star Wars) - Similar temperature and size",
    confidence: 92,
    classification: "Confirmed Planet"
  },
  {
    id: "kepler-442b",
    name: "Kepler-442b",
    starName: "Kepler-442",
    position: [-4, 1, 4],
    koi_period: 112.3,
    koi_duration: 5.86,
    koi_depth: 280,
    koi_model_snr: 15.2,
    koi_impact: 0.28,
    koi_prad: 1.34,
    koi_teq: 233,
    koi_insol: 0.70,
    koi_steff: 4402,
    koi_slogg: 4.65,
    koi_srad: 0.60,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Pandora (Avatar) - Earth-like conditions",
    confidence: 95,
    classification: "Confirmed Planet"
  },
  {
    id: "kepler-62f",
    name: "Kepler-62f",
    starName: "Kepler-62",
    position: [3, -2, 5],
    koi_period: 267.3,
    koi_duration: 7.12,
    koi_depth: 195,
    koi_model_snr: 11.4,
    koi_impact: 0.42,
    koi_prad: 1.41,
    koi_teq: 208,
    koi_insol: 0.41,
    koi_steff: 4925,
    koi_slogg: 4.60,
    koi_srad: 0.64,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Solaris (Solaris) - Ocean world possibility",
    confidence: 88,
    classification: "Confirmed Planet"
  },
  {
    id: "kepler-452b",
    name: "Kepler-452b",
    starName: "Kepler-452",
    position: [-2, 3, -4],
    koi_period: 384.8,
    koi_duration: 8.94,
    koi_depth: 312,
    koi_model_snr: 18.6,
    koi_impact: 0.18,
    koi_prad: 1.63,
    koi_teq: 265,
    koi_insol: 1.11,
    koi_steff: 5757,
    koi_slogg: 4.32,
    koi_srad: 1.11,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Earth 2.0 - Most Earth-like exoplanet",
    confidence: 97,
    classification: "Confirmed Planet"
  },
  {
    id: "kepler-22b",
    name: "Kepler-22b",
    starName: "Kepler-22",
    position: [6, -1, 2],
    koi_period: 289.9,
    koi_duration: 6.78,
    koi_depth: 543,
    koi_model_snr: 22.1,
    koi_impact: 0.52,
    koi_prad: 2.38,
    koi_teq: 262,
    koi_insol: 1.11,
    koi_steff: 5518,
    koi_slogg: 4.45,
    koi_srad: 0.98,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Kamino (Star Wars) - Super-Earth water world",
    confidence: 94,
    classification: "Confirmed Planet"
  },
  {
    id: "trappist-1e",
    name: "TRAPPIST-1e",
    starName: "TRAPPIST-1",
    position: [-5, 2, 1],
    koi_period: 6.10,
    koi_duration: 0.88,
    koi_depth: 645,
    koi_model_snr: 25.4,
    koi_impact: 0.15,
    koi_prad: 0.92,
    koi_teq: 230,
    koi_insol: 0.66,
    koi_steff: 2559,
    koi_slogg: 5.24,
    koi_srad: 0.12,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Vulcan (Star Trek) - Red dwarf system",
    confidence: 96,
    classification: "Confirmed Planet"
  },
  {
    id: "proxima-b",
    name: "Proxima Centauri b",
    starName: "Proxima Centauri",
    position: [1, 1, -2],
    koi_period: 11.19,
    koi_duration: 1.12,
    koi_depth: 420,
    koi_model_snr: 16.8,
    koi_impact: 0.38,
    koi_prad: 1.07,
    koi_teq: 234,
    koi_insol: 0.65,
    koi_steff: 3042,
    koi_slogg: 5.01,
    koi_srad: 0.15,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Proxima (The Expanse) - Closest exoplanet",
    confidence: 91,
    classification: "Confirmed Planet"
  },
  {
    id: "kepler-16b",
    name: "Kepler-16b",
    starName: "Kepler-16",
    position: [4, 4, -5],
    koi_period: 228.8,
    koi_duration: 9.24,
    koi_depth: 1842,
    koi_model_snr: 31.2,
    koi_impact: 0.22,
    koi_prad: 8.45,
    koi_teq: 171,
    koi_insol: 0.19,
    koi_steff: 4450,
    koi_slogg: 4.55,
    koi_srad: 0.65,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    sciFiMatch: "Tatooine (Star Wars) - Binary star system",
    confidence: 99,
    classification: "Confirmed Planet"
  }
];

export const getLightCurveData = (planetId: string) => {
  const baseData = [];
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  for (let i = 0; i < 100; i++) {
    const time = i * 0.1;
    let flux = 1.0;
    
    if (i >= 40 && i <= 50) {
      flux = 1.0 - (0.003 * (1 - Math.pow((i - 45) / 5, 2)));
    }
    
    flux += (random(i * 0.12345) - 0.5) * 0.0005;
    
    baseData.push({
      time: time,
      flux: flux,
      error: 0.0001
    });
  }
  
  return baseData;
};
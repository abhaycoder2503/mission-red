export const launchCards = [
  { title: 'Atlas V-541', desc: 'Powerful booster stage delivering 34.5 MN of thrust.', metric: 'ULA Launch Vehicle' },
  { title: 'TMI Injection', desc: 'Trans-Mars Injection burn reaching Earth escape velocity.', metric: '11.2 km/s' },
  { title: 'Heliocentric Arc', desc: 'Transfer trajectory spanning 471 million km.', metric: '203-day Transit' },
];

export const trajectoryData = {
  hohmann: {
    duration: '203 Days',
    fuel: 'Optimized',
    risk: 'Nominal',
    note: 'The actual July 30, 2020 to Feb 18, 2021 trajectory used for Mars 2020 mission.',
  },
  fast: {
    duration: '160 Days',
    fuel: 'Extreme',
    risk: 'High Thermal',
    note: 'Hypothetical high-energy trajectory for faster transit but increased heat shield stress.',
  },
};

export const hotspots = [
  { id: 'valles', title: 'Valles Marineris', detail: 'A vast canyon system revealing Mars geologic history.', x: 28, y: 58 },
  { id: 'jezero', title: 'Jezero Crater Delta', detail: '18.45°N 77.45°E: Site of an ancient river delta and microbial hunt.', x: 54, y: 46 },
  { id: 'olympus', title: 'Olympus Mons', detail: 'Largest volcano in the solar system, standing 21km high.', x: 70, y: 35 },
  { id: 'gale', title: 'Gale Crater', detail: '9-year exploration site of the Mars Science Laboratory (Curiosity).', x: 42, y: 72 },
  { id: 'hellas', title: 'Hellas Basin', detail: 'Deepest point on Mars, where liquid water could theoretically exist.', x: 82, y: 65 },
  { id: 'utopia', title: 'Utopia Planitia', detail: 'Vast lava plain containing massive amounts of underground ice.', x: 10, y: 25 },
  { id: 'arcyre', title: 'Argyre Planitia', detail: 'Highland basin with potential ancient subsurface deposits.', x: 20, y: 80 },
  { id: 'syrtis', title: 'Syrtis Major', detail: 'Region of dark volcanic rock and seasonal dust activity.', x: 15, y: 45 }
];

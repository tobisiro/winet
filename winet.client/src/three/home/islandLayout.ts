// ═══ ISLAND POSITIONS (world coordinates) — spread further apart ═══
export const island1Pos: [number, number, number] = [0, 0, 0];       // Tower Island (center)
export const island2Pos: [number, number, number] = [-35, 3, -14];   // Winet Building Island (further left)
export const island3Pos: [number, number, number] = [30, -1, -18];   // Residential Island (further right)

export const towerHeight = 12;

// ═══ RESIDENTIAL VILLAGE LAYOUT ═══
// Houses along the pole "street". Fiber box is at house local Z=-1.01.
// Houses on +Z side: fiber box faces road (no rotation)
// Houses on -Z side: rotated 180° so fiber box faces road
export const housePositions: { pos: [number, number, number]; rotY: number; fiberBox: boolean; wifiReceiver: boolean }[] = [
    { pos: [-7, 0, 4], rotY: 0, fiberBox: true, wifiReceiver: false }, // H1: +Z side, near P1
    { pos: [1, 0, 5], rotY: 0, fiberBox: true, wifiReceiver: false }, // H2: +Z side, near P2
    { pos: [-3, 0, -4], rotY: Math.PI, fiberBox: true, wifiReceiver: false }, // H3: -Z side, near P1
    { pos: [5, 0, -5], rotY: Math.PI, fiberBox: true, wifiReceiver: false }, // H4: -Z side, near P3
    { pos: [9, 0, 4], rotY: 0, fiberBox: false, wifiReceiver: true }, // H5: +Z side, near P4
];

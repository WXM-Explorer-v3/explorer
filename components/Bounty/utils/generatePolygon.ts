function generatePolygon(center: {lat: number, lon: number}, radius: number, numSides: number) {
    const coords = [];
    const angleStep = (2 * Math.PI) / numSides;

    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep;
        const dx = radius * Math.cos(angle);
        const dy = radius * Math.sin(angle);

        // Latitude: center.lat + dy, Longitude: center.lon + dx
        const lat = center.lat + (dy / 111000); // 1 degree latitude ~ 111 km
        const lon = center.lon + (dx / (111000 * Math.cos(center.lat * Math.PI / 180))); // Adjust for longitude

        coords.push({ lat, lon });
    }

    // Close the polygon by adding the first point at the end
    coords.push(coords[0]);

    return coords;
}

export default {
    generatePolygon
}
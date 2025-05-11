import * as projection from "@arcgis/core/geometry/operators/projectOperator.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as geodeticLengthOperator from "@arcgis/core/geometry/operators/geodeticLengthOperator.js"

export const projectedGeometry = async (graphic: __esri.Graphic): Promise<__esri.Geometry | undefined> => {

    if (!graphic.geometry) return;

    if (SpatialReference.WGS84.equals(graphic.geometry.spatialReference))
        return graphic.geometry;

    if (!projection.isLoaded()) await projection.load();

    return projection.execute(graphic.geometry, SpatialReference.WGS84);
};

export const calcDistance = async (geometry: __esri.Polyline, unit: __esri.LengthUnit) => {
    if (!geodeticLengthOperator.isLoaded()) await geodeticLengthOperator.load();

    return geodeticLengthOperator.execute(geometry, {unit});
}

export const formatDistance = (meters: number) => {
    if (meters < 1000)
        return `${meters.toFixed(2)} m`;
    return `${(meters / 1000).toFixed(2)} km`;
};

export const calculateOffset = (startPoint: number[], endPoint: number[]) => {
    const deltaX = endPoint[0] - startPoint[0];
    const deltaY = endPoint[1] - startPoint[1];

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const offsetAmount = 15;

    const offsetX = (-deltaY / distance) * offsetAmount;
    const offsetY = (deltaX / distance) * offsetAmount;

    return {offsetX, offsetY};
}

export const calculateAngleDegrees = (startPoint: number[], endPoint: number[]): number => {
    const deltaY = endPoint[1] - startPoint[1];
    const deltaX = endPoint[0] - startPoint[0];

    const angleInRadians = Math.atan2(deltaY, deltaX);
    return angleInRadians * (180 / Math.PI);
}

export const calculateMidPoint = (startPoint: number[], endPoint: number[]): number[] => {
    const midX = (startPoint[0] + endPoint[0]) / 2;
    const midY = (startPoint[1] + endPoint[1]) / 2;
    return [midX, midY];
}
export const inside = (
    point: [number, number],
    polygon: [number, number][],
) => {
    const [x, y] = point;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        const intersect =
            yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }

    return inside;
};

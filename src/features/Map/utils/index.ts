import * as projection from "@arcgis/core/geometry/operators/projectOperator.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

export const projectedGeometry = async (graphic: __esri.Graphic): Promise<__esri.Geometry | undefined> => {
  if (!graphic.geometry) return;

  if (SpatialReference.WGS84.equals(graphic.geometry.spatialReference))
    return graphic.geometry;

  if (!projection.isLoaded()) await projection.load();

  return projection.execute(
    graphic.geometry as __esri.Point,
      SpatialReference.WGS84
  );
};

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


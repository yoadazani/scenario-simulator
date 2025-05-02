import {useMap} from "@/features/Map/contexts/MapContainer.tsx";
import {useWidget} from "@/features/Map/hooks/useWidget.ts";
import Draw from "@arcgis/core/views/draw/Draw";
import {useCallback, useEffect, useRef, useState} from "react";
import Polyline from "@arcgis/core/geometry/Polyline";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import Graphic from "@arcgis/core/Graphic";
import {useGraphic} from "@/features/Map/hooks/useGraphic.ts";
import {useGraphicsLayer} from "@/features/Map/contexts/GraphicLayer.tsx";
import Ruler from "@/assets/ruler.svg?react";
import Collection from "@arcgis/core/core/Collection";
import {
    calcDistance,
    calculateAngleDegrees,
    calculateMidPoint,
    calculateOffset,
    formatDistance
} from "@/features/Map/utils";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import {labelSymbol, rulerSymbol} from "@/features/Map/constants/symbols.ts";

const Measurement = () => {
    const {mapView} = useMap();
    const {elementRef} = useWidget("top-left");
    const graphicsRef = useGraphic({})
    const {graphicsLayer} = useGraphicsLayer()
    const [isActive, setIsActive] = useState(false);
    const [totalDistance, setTotalDistance] = useState(0);
    const drawRef = useRef<Draw>(new Draw({
        view: mapView.current
    }));
    const rulerSymbolRef = useRef<CIMSymbol>(new CIMSymbol(rulerSymbol));
    const rulerLength = useRef(1);
    const distances = useRef(new Collection())

    const handleVertexAdd = useCallback(async (e: __esri.PolylineDrawActionVertexAddEvent) => {
        const polyline = new Polyline({
            paths: [e.vertices],
            spatialReference: mapView.current.spatialReference
        });

        const length = await calcDistance(polyline, "meters");
        setTotalDistance(length);

        graphicsRef.current.geometry = polyline
        graphicsRef.current.symbol = rulerSymbolRef.current;

        await calculateAndDisplaySegmentLengths(e);

        graphicsLayer.add(distances.current.at(distances.current.length - 1));
    },[])

    const startMeasurement = useCallback(() => {
        if (!isActive) return resetMeasurement();

        document.body.classList.add('cursor-crosshair');


        const action = drawRef.current.create("polyline");

        action.on("vertex-add", handleVertexAdd);
    }, [isActive]);

    async function calculateAndDisplaySegmentLengths(e: __esri.PolylineDrawActionVertexAddEvent) {
        while (rulerLength.current < e.vertices.length) {
            const startPoint = e.vertices[rulerLength.current - 1];
            const endPoint = e.vertices[rulerLength.current];

            const segmentPolyline = new Polyline({
                paths: [[startPoint, endPoint]],
                spatialReference: mapView.current.spatialReference
            });

            const segmentLength = await calcDistance(segmentPolyline, "meters");

            const midPoint = calculateMidPoint(startPoint, endPoint);
            const angle = calculateAngleDegrees(startPoint, endPoint);
            const {offsetX, offsetY} = calculateOffset(startPoint, endPoint);

            const textGraphic = createSegmentLengthLabel(segmentLength, offsetX, offsetY, angle, midPoint);

            distances.current.add(textGraphic);

            rulerLength.current++;
        }
    }

    function resetMeasurement() {
        drawRef.current.complete();
        graphicsRef.current.geometry = undefined;
        graphicsLayer.graphics.removeMany(distances.current);
        distances.current.removeAll();
        rulerLength.current = 1;
        setTotalDistance(0)

        document.body.classList.remove('cursor-crosshair');
    }

    function createSegmentLengthLabel(segmentLength: number, offsetX: number, offsetY: number, angle: number, midPoint: number[]) {
        const textSymbol = new TextSymbol({
            ...labelSymbol,
            text: formatDistance(segmentLength),
            xoffset: offsetX,
            yoffset: offsetY,
            angle: angle > 0 ? -angle : Math.abs(angle),
            rotated: angle > 0,
            horizontalAlignment: "center",
            verticalAlignment: "middle"
        });

        return new Graphic({
            geometry: {
                type: "point",
                x: midPoint[0],
                y: midPoint[1],
                spatialReference: mapView.current.spatialReference
            },
            symbol: textSymbol
        });
    }

    useEffect(() => {
        startMeasurement();
    }, [startMeasurement]);

    return (
        <div ref={elementRef} onClick={() => setIsActive(prev => !prev)}>
            <Ruler className={`btn ${isActive ? "active" : ""}`}/>
            <div className={
                `
                    bg-white p-4 border border-blue-800 rounded-lg 
                    fixed bottom-4 left-4 space-y-2 shadow-lg
                    transition-all duration-500 ease-in-out
                    ${totalDistance > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    hover:scale-105 hover:shadow-xl
                `
            }>
                <p className="text-center text-zinc-700 font-bold">סה"כ מרחק כולל</p>
                <span className="text-zinc-500 text-xs font-semibold">
                    {formatDistance(totalDistance)}
                </span>
            </div>
        </div>
    )
};

export default Measurement;
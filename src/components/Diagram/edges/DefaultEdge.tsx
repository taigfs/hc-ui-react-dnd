import { useEffect } from "react";
import { EdgeProps, getSmoothStepPath, MarkerType } from "reactflow";
import { useDiagramStore } from "../../../state/DiagramStore";
import { useNodeAndEdgeInstance } from "../../../hooks/use-story";
import { getValueAfterUnderscore } from "../../../utils/get-value-after-underscore";

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  selected,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const removeEdge = useDiagramStore((s) => s.removeEdge);
  const { deleteEdge } = useNodeAndEdgeInstance();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      removeEdge(id);
      deleteEdge(getValueAfterUnderscore(id));
    }
  };

  useEffect(() => {
    if (selected) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: selected ? "rgb(53 186 253)" : "#ffffff",
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={selected ? "url(#arrow-blue)" : "url(#arrow-white)"}
      />
      {/* <text>
        <textPath href={`#${id}`} style={{ fontSize: 12 }} startOffset="50%" textAnchor="middle">
          {data.text}
        </textPath>
      </text> */}
      <marker
        id="arrow-white"
        viewBox="0 -2.5 5 5"
        refX="5"
        refY="0"
        markerWidth="5"
        markerHeight="5"
        orient="auto"
      >
        <path d="M0,-2.5L5,0L0,2.5" fill={"#ffffff"} />
      </marker>
      <marker
        id="arrow-blue"
        viewBox="0 -2.5 5 5"
        refX="5"
        refY="0"
        markerWidth="5"
        markerHeight="5"
        orient="auto"
      >
        <path d="M0,-2.5L5,0L0,2.5" fill={"rgb(53 186 253)"} />
      </marker>
    </>
  );
}

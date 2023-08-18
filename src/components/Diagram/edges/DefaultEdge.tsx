import { useEffect } from 'react';
import { EdgeProps, getSmoothStepPath, MarkerType } from 'reactflow';
import { useDiagramStore } from '../../../state/DiagramStore';

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
  selected
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      removeEdge(id);
    }
  };

  useEffect(() => {
    if (selected) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  return (
    <>
      <path
        id={id}
        style={{...style, strokeWidth: 3, stroke: selected ? "rgb(53 186 253)" : "#ffffff"}}
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
        viewBox="0 -5 10 10"
        refX="10"
        refY="0"
        markerWidth="10"
        markerHeight="10"
        orient="auto"
      >
        <path d="M0,-5L10,0L0,5" fill={"#ffffff"} />
      </marker>
      <marker
        id="arrow-blue"
        viewBox="0 -5 10 10"
        refX="10"
        refY="0"
        markerWidth="10"
        markerHeight="10"
        orient="auto"
      >
        <path d="M0,-5L10,0L0,5" fill={"rgb(53 186 253)"} />
      </marker>
    </>
  );
}
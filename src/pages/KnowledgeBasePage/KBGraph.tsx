import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useTheme } from "styled-components";

export const LoadGraph = () => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node" })
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export const KBGraph = () => {
  const theme = useTheme();
  return (
    <SigmaContainer
      settings={{
        defaultNodeColor: theme.color.text,
        labelColor: {
          color: theme.color.text,
        }
      }}
      style={{
        backgroundColor: theme.color.squareBg,
      }}
    >
      <LoadGraph />
    </SigmaContainer>
  );
};

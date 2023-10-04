import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useTheme } from "styled-components";

export const LoadGraph = () => {
  const loadGraph = useLoadGraph();

  const graphData = {
    nodes: [
      // Meta nós
      {
        id: "businessUnit",
        label: "Business Unit",
        size: 14,
        color: "black",
      },
      { id: "industry", label: "Industry", size: 14, color: "#000" },
      {
        id: "businessModelType",
        label: "Business Model",
        size: 14,
        color: "black",
      },
      { id: "kpiType", label: "KPI Indicator", size: 14, color: "#000" },

      // Instâncias de empreendimento
      {
        id: "aiqfomeFoodService",
        label: "aiqfome",
        size: 14,
        color: "orange",
      }, // orange
      { id: "aiqEntrega", label: "aiqEntrega", size: 14, color: "orange" }, // green
      { id: "iFood", label: "iFood", size: 14, color: "orange", }, // blue

      // Instâncias de indústria
      {
        id: "foodServiceIndustry",
        label: "Food Service",
        size: 14,
        color: "yellow",
      }, // gray
      { id: "deliveryIndustry", label: "Delivery", size: 14, color: "yellow" }, // gray
      {
        id: "logisticsIndustry",
        label: "Logistics",
        size: 14,
        color: "yellow",
      }, // gray

      // Instâncias de modelo de negócio
      { id: "ecommerceModel", label: "E-commerce", size: 14, color: "red" },
      {
        id: "marketplaceModel",
        label: "Marketplace",
        size: 14,
        color: "red",
      }, // orange
      { id: "saasModel", label: "SaaS", size: 14, color: "red" }, // green

      // Instâncias de KPI
      {
        id: "mauKPI",
        label: "Monthly Active Users (MAU)",
        size: 14,
        color: "#00ff00",
      }, // blue
      {
        id: "sla30minKPI",
        label: "SLA up to 30 min",
        size: 14,
        color: "#00ff00",
      }, // orange
      {
        id: "sla5daysKPI",
        label: "SLA up to 5 days",
        size: 14,
        color: "#00ff00",
      }, // green
    ],
    edges: [
      { id: "e1", source: "aiqfomeFoodService", target: "foodServiceIndustry" },
      { id: "e2", source: "aiqEntrega", target: "deliveryIndustry" },
      { id: "e3", source: "aiqEntrega", target: "logisticsIndustry" },
      { id: "e4", source: "iFood", target: "foodServiceIndustry" },
      { id: "e5", source: "iFood", target: "deliveryIndustry" },
      { id: "e6", source: "aiqfomeFoodService", target: "marketplaceModel" },
      { id: "e7", source: "aiqfomeFoodService", target: "ecommerceModel" },
      { id: "e8", source: "aiqEntrega", target: "saasModel" },
      { id: "e9", source: "aiqfomeFoodService", target: "mauKPI" },
      { id: "e10", source: "aiqEntrega", target: "sla30minKPI" },
      { id: "e11", source: "iFood", target: "sla5daysKPI" },
      { id: 'e12', source: 'sla5daysKPI', target: 'kpiType' },
      { id: 'e13', source: 'sla30minKPI', target: 'kpiType' },
      { id: 'e14', source: 'mauKPI', target: 'kpiType' },
      { id: 'e15', source: 'marketplaceModel', target: 'businessModelType' },
      { id: 'e16', source: 'ecommerceModel', target: 'businessModelType' },
      { id: 'e17', source: 'saasModel', target: 'businessModelType' },
      { id: 'e18', source: 'deliveryIndustry', target: 'industry' },
      { id: 'e19', source: 'foodServiceIndustry', target: 'industry' },
    ],
  };

  useEffect(() => {
    const graph = new Graph();

    // Adding nodes
    graphData.nodes.forEach((node) => {
      graph.addNode(node.id, {
        label: node.label,
        size: node.size,
        color: node.color,
        x: Math.random(), // For now, placing nodes randomly. Update as needed.
        y: Math.random(), // For now, placing nodes randomly. Update as needed.
      });
    });

    // Adding edges
    graphData.edges.forEach((edge) => {
      graph.addEdge(edge.source, edge.target, {
        id: edge.id,
      });
    });

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
        },
      }}
      style={{
        backgroundColor: theme.color.squareBg,
      }}
    >
      <LoadGraph />
    </SigmaContainer>
  );
};

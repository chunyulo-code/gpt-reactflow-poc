"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";
import fakeData from "@/app/fakeData.json";
import Flow from "./Flow";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Flow />
    </div>
  );
}

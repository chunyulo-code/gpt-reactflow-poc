"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";
import fakeData from "@/app/fakeData.json";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 }
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 }
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 }
  }
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true }
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function processItem(item, parentId) {
    const newData = { newNodes: [], newEdges: [] };
    const siblingCounts = item.length;
    item.forEach((item, index) => {
      const currentId = nanoid();
      newData.newNodes.push({
        id: currentId,
        data: { label: item.title },
        parentNode: parentId,
        position: {
          x: 200 * (index - Math.floor(siblingCounts / 2)),
          y: 200
        }
      });
      newData.newEdges.push({
        id: `e${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        animated: true
      });
      if (item.children.length > 0) {
        const childData = processItem(item.children, currentId);
        newData.newNodes.push(...childData.newNodes);
        newData.newEdges.push(...childData.newEdges);
      }
    });
    return newData;
  }

  function clickHandler() {
    const newData = processItem(fakeData, selectedNodeId);
    setNodes((prev) => prev.concat(newData.newNodes));
    setEdges((prev) => prev.concat(newData.newEdges));
  }

  useEffect(() => {
    const selectedNode = nodes.filter((node) => node.selected === true)[0];
    if (selectedNode) setSelectedNodeId(selectedNode.id);
  }, [nodes]);

  return (
    <>
      <button
        className="border border-black rounded-sm px-2 py-1"
        onClick={clickHandler}
      >
        Add nodes
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </>
  );
}

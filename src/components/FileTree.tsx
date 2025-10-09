import React from "react";

interface Node {
  name: string;
  children?: Node[];
}

const tree: Node[] = [
  {
    name: "src",
    children: [
      { name: "components" },
      { name: "pages" },
      { name: "hooks" },
    ],
  },
  { name: "public" },
  { name: "package.json" },
];

function renderNode(node: Node, depth: number, key?: string) {
  return (
    <div key={key ?? node.name} className="pl-2">
      <div style={{ marginLeft: depth * 8 }} className="font-mono">
        {node.name}
      </div>
      {node.children &&
        node.children.map((child) => renderNode(child, depth + 1, child.name))}
    </div>
  );
}

export default function FileTree() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">File Tree</h2>
      <div>{tree.map((n) => renderNode(n, 0))}</div>
    </div>
  );
}

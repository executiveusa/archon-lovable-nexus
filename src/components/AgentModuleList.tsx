import React from "react";

interface Module {
  id: string;
  description: string;
}

const modules: Module[] = [
  { id: "MetaAgentSystem", description: "Unified agent interface" },
  { id: "ResearchAssistant", description: "Grant research automation" },
  { id: "VideoStudio", description: "Video generation pipeline" },
];

export default function AgentModuleList() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Agent Modules</h2>
      <ul className="list-disc list-inside pl-4">
        {modules.map((m) => (
          <li key={m.id} className="py-1">
            <span className="font-medium">{m.id}</span> — {m.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

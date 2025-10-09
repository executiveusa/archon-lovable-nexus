import React from "react";

export default function Footer() {
  const now = new Date().toLocaleString();
  const mcpId = import.meta.env.VITE_MCP_ID || "SKIPAGENTX_VAPS_001";
  return (
    <footer className="mt-8 border-t pt-4 text-sm text-center text-muted-foreground">
      <p>{now}</p>
      <p className="font-mono">MCP: {mcpId}</p>
    </footer>
  );
}

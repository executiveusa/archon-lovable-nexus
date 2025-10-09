import React from "react";
import AgentModuleList from "../components/AgentModuleList";
import FileTree from "../components/FileTree";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold">SkipAgentX</h1>
        <p className="text-muted-foreground">Grant-seeking automation agent</p>
      </header>
      <AgentModuleList />
      <FileTree />
      <Footer />
    </div>
  );
}

import React from "react";
import type { Screen } from "./types";
import { ProgressReportingScreen } from "./components/ProgressReportingScreen";
import { Scope12ReportingScreen } from "./components/Scope12ReportingScreen";
import { ProgressDashboardScreen } from "./components/ProgressDashboardScreen";
import { ProjectDetailScreen } from "./components/ProjectDetailScreen";

export function App() {
  const [screen, setScreen] = React.useState<Screen>("crp");
  const [selectedProject, setSelectedProject] = React.useState<string>("");

  function handleNavigate(s: Screen) {
    setScreen(s);
  }

  function handleOpenProject(name: string) {
    setSelectedProject(name);
    setScreen("project-detail");
  }

  if (screen === "scope12") {
    return <Scope12ReportingScreen activeScreen={screen} onNavigate={handleNavigate} />;
  }
  if (screen === "overview") {
    return <ProgressDashboardScreen activeScreen={screen} onNavigate={handleNavigate} onOpenProject={handleOpenProject} />;
  }
  if (screen === "project-detail") {
    return <ProjectDetailScreen activeScreen={screen} onNavigate={handleNavigate} projectName={selectedProject} />;
  }
  return <ProgressReportingScreen activeScreen={screen} onNavigate={handleNavigate} />;
}

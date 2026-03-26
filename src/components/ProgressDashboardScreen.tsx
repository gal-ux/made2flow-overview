import React from "react";
import { NavBar } from "./NavBar";
import type { Screen } from "../types";
import { AlertCircle, Layers, Activity, CheckCircle, Building2, Zap, CheckSquare } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type ProjectStatus = "Active" | "Completed" | "Pre-DG";

interface Project {
  program: string;
  cohortName: string;
  cohortPeriod: string;
  brand: string;
  expert: string;
  startDate: string;
  status: ProjectStatus;
  issues: string | null;
  actionPlan: boolean;
}

const PROJECTS: Project[] = [
  { program: "CRP 2025 — Batch 1",        cohortName: "Corporate Responsibility Program", cohortPeriod: "2025 Q1", brand: "MSG Textile", expert: "Sarah Johnson", startDate: "Feb 15, 2025", status: "Active",    issues: "1 blocked", actionPlan: false },
  { program: "CRP 2024 — Final Quarter",   cohortName: "Corporate Responsibility Program", cohortPeriod: "2025 Q1", brand: "MSG Textile", expert: "Sarah Johnson", startDate: "Feb 15, 2025", status: "Active",    issues: null,        actionPlan: true  },
  { program: "CRP 2025 — Batch 2",         cohortName: "Corporate Responsibility Program", cohortPeriod: "2025 Q1", brand: "MSG Textile", expert: "Sarah Johnson", startDate: "Feb 15, 2025", status: "Completed", issues: null,        actionPlan: true  },
  { program: "CRP 2024 — Mid-Year Review", cohortName: "Corporate Responsibility Program", cohortPeriod: "2025 Q1", brand: "MSG Textile", expert: "Sarah Johnson", startDate: "Feb 15, 2025", status: "Active",    issues: "1 blocked", actionPlan: false },
  { program: "FE Assessment 2025",         cohortName: "Corporate Responsibility Program", cohortPeriod: "2025 Q1", brand: "MSG Textile", expert: "Sarah Johnson", startDate: "Feb 15, 2025", status: "Active",    issues: null,        actionPlan: true  },
  { program: "CRP 2025 — Q3 Extension",   cohortName: "Corporate Responsibility Program", cohortPeriod: "2025 Q1", brand: "MSG Textile", expert: "Sarah Johnson", startDate: "Feb 15, 2025", status: "Pre-DG",   issues: null,        actionPlan: true  },
];

// ─── Shared helpers ────────────────────────────────────────────────────────────

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#718d98" strokeWidth="1.5">
      <line x1="1" y1="4" x2="13" y2="4" />
      <line x1="3" y1="8" x2="11" y2="8" />
      <line x1="5" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon,
  iconBg,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div
      className="bg-white rounded-[8px] px-[15px] py-[14px] flex flex-col gap-[8px]"
      style={{
        border: "1px solid #718d98",
        boxShadow: "0px 4px 8px -2px rgba(16,24,40,0.10)",
      }}
    >
      <div className="flex items-center gap-[10px]">
        <div
          className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <span className="text-[12px] font-semibold leading-[18px] text-[#718d98]">{label}</span>
      </div>
      <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">{value}</span>
      <span className="text-[12px] leading-[18px] text-[#718d98]">{sub}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    "Active":    "bg-[#c8f9dc] text-[#027a48]",
    "Completed": "bg-[#c8f9dc] text-[#027a48]",
    "Pre-DG":    "bg-[#c2eaff] text-[#004266]",
  };
  const labels: Record<ProjectStatus, string> = {
    "Active":    "Active",
    "Completed": "Completed",
    "Pre-DG":    "Pre-Data Gathering",
  };
  return (
    <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[16px] text-[12px] font-medium whitespace-nowrap ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function PillBadge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[16px] text-[12px] font-medium whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProgressDashboardScreen({
  activeScreen,
  onNavigate,
  onOpenProject,
}: {
  activeScreen: Screen;
  onNavigate: (s: Screen) => void;
  onOpenProject?: (name: string) => void;
}) {
  return (
    <div className="min-h-screen bg-[#e8ecee] font-sans">
      <NavBar activeScreen={activeScreen} onNavigate={onNavigate} />

      <main className="mx-auto px-[70px] py-[40px]" style={{ maxWidth: 1440 }}>

        {/* Page title */}
        <h1 className="text-[26px] font-semibold leading-[32px] text-[#3c4c53] mb-[20px]">
          Data Gathering Progress Dashboard
        </h1>

        {/* Filters row */}
        <div className="flex items-center gap-[20px] flex-wrap mb-[20px]">
          {["Brands", "Programs", "Cohorts", "Facility Type", "Countries", "Reporting period"].map((f) => (
            <div
              key={f}
              className="flex items-center gap-[8px] border border-[#a0b3ba] bg-white rounded-[8px] px-[12px] py-[10px] text-[14px] leading-[20px] cursor-pointer hover:border-[#308882] transition-colors"
              style={{ minWidth: 180 }}
            >
              <span className="flex-1 text-[#718d98]">{f}</span>
              <ChevronDownIcon className="w-[16px] h-[16px] text-[#718d98]" />
            </div>
          ))}
          <button className="ml-auto flex items-center gap-[6px] px-[16px] py-[9px] rounded-[8px] border border-[#d0d9dd] bg-white text-[14px] font-medium text-[#3c4c53] hover:bg-[#f3f5f6] transition-colors whitespace-nowrap">
            Clear all
          </button>
        </div>

        {/* ── Contract Summary ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <h2 className="text-[16px] font-semibold leading-[24px] text-[#3c4c53] mb-[20px]">Projects Summary</h2>

          <div className="grid grid-cols-3 gap-[20px] mb-[20px]">
            <StatCard label="Total Projects"       value="6" sub="of 15 available"  iconBg="#c2eaff" icon={<Layers size={16} color="#004266" />} />
            <StatCard label="Active Projects"      value="4" sub="67% in progress"  iconBg="#c3eae7" icon={<Activity size={16} color="#007a6e" />} />
            <StatCard label="Completed Projects"   value="1" sub="17% complete"     iconBg="#c8f9dc" icon={<CheckCircle size={16} color="#027a48" />} />
            <StatCard label="Total Facilities"     value="7" sub="2 brands"         iconBg="#fde8c8" icon={<Building2 size={16} color="#92400e" />} />
            <StatCard label="Active Facilities"    value="2" sub="29% in progress"  iconBg="#c3eae7" icon={<Zap size={16} color="#007a6e" />} />
            <StatCard label="Completed Facilities" value="2" sub="29% complete"     iconBg="#c8f9dc" icon={<CheckSquare size={16} color="#027a48" />} />
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-[10px]">
            <div className="h-[32px] w-full rounded-[6px] overflow-hidden flex">
              <div className="bg-[#3b82f6] flex items-center justify-center overflow-hidden" style={{ width: "7%" }}>
                <span className="text-[9px] font-semibold text-white whitespace-nowrap px-[2px]">Pre DG – 7%</span>
              </div>
              <div className="bg-[#34d399] flex items-center justify-center overflow-hidden" style={{ width: "27%" }}>
                <span className="text-[11px] font-semibold text-white whitespace-nowrap">Active – 27%</span>
              </div>
              <div className="bg-[#5b9aae] flex items-center justify-center overflow-hidden" style={{ width: "7%" }}>
                <span className="text-[9px] font-semibold text-white whitespace-nowrap px-[2px]">Completed – 7%</span>
              </div>
              <div className="bg-[#d1d5db] flex-1 flex items-center justify-center overflow-hidden">
                <span className="text-[11px] font-semibold text-[#718d98] whitespace-nowrap">Available Seats – 59%</span>
              </div>
            </div>
            <div className="flex items-center gap-[16px]">
              {[
                { color: "#3b82f6", label: "Pre Data Gathering" },
                { color: "#34d399", label: "Active" },
                { color: "#5b9aae", label: "Completed" },
                { color: "#d1d5db", label: "Available Seats" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-[6px]">
                  <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[12px] text-[#718d98]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Projects in this Contract ── */}
        <div className="bg-white rounded-[8px] p-[20px]">
          <div className="flex items-center justify-between mb-[20px]">
            <div className="flex items-baseline gap-[10px]">
              <h2 className="text-[16px] font-semibold leading-[24px] text-[#3c4c53]">Projects Overview Table</h2>
              <span className="text-[13px] text-[#718d98]">6 of 6</span>
            </div>
            <button className="flex items-center gap-[6px] px-[16px] py-[9px] rounded-[8px] bg-[#718d98] text-white text-[14px] font-semibold hover:bg-[#5e7882] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
                <path d="M8 2v8M5 7l3 3 3-3M3 13h10" />
              </svg>
              Export
            </button>
          </div>

          <div className="rounded-[10px] border border-[#d0d9dd] overflow-x-auto shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
            <table className="w-full text-left border-collapse" style={{ tableLayout: "auto", minWidth: 900 }}>
              <thead>
                <tr className="bg-[#fffcf5] border-b border-[#d0d9dd]">
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap" style={{ minWidth: 220 }}>
                    <span className="flex items-center gap-[6px]">Cohort <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap" style={{ minWidth: 200 }}>
                    <span className="flex items-center gap-[6px]">Program <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Brand(s) <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Expert <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">Start date</th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Status <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Issues <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">Action Plan</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((p, i) => (
                  <tr
                    key={i}
                    onClick={() => onOpenProject?.(p.program)}
                    className={`cursor-pointer hover:brightness-95 transition-all ${i % 2 === 0 ? "bg-white" : "bg-[#f3f5f6]"}`}
                  >
                    <td className="px-[12px] py-[10px]">
                      <div className="flex flex-col gap-[2px]">
                        <span className="text-[12px] leading-[18px] text-[#3c4c53]">{p.cohortName}</span>
                        <span className="text-[11px] text-[#718d98]">{p.cohortPeriod}</span>
                      </div>
                    </td>
                    <td className="px-[12px] py-[10px]">
                      <span className="text-[12px] leading-[18px] text-[#3c4c53]">{p.program}</span>
                    </td>
                    <td className="px-[12px] py-[10px]">
                      <PillBadge className="bg-[#c8f9dc] text-[#027a48]">{p.brand}</PillBadge>
                    </td>
                    <td className="px-[12px] py-[10px]">
                      <PillBadge className="bg-[#e0f5f4] text-[#308882]">{p.expert}</PillBadge>
                    </td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53] whitespace-nowrap">{p.startDate}</td>
                    <td className="px-[12px] py-[10px]">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-[12px] py-[10px]">
                      {p.issues ? (
                        <div className="flex items-center gap-[5px] text-[#dc2626]">
                          <AlertCircle size={13} />
                          <span className="text-[12px] font-medium">{p.issues}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#718d98]">—</span>
                      )}
                    </td>
                    <td className="px-[12px] py-[10px]">
                      <PillBadge className={p.actionPlan ? "bg-[#e0f5f4] text-[#308882]" : "bg-[#f3f5f6] text-[#5e7882]"}>
                        {p.actionPlan ? "Yes" : "No"}
                      </PillBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

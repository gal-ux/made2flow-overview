import type {} from "react";
import { NavBar } from "./NavBar";
import type { Screen } from "../types";
import { ArrowLeft, AlertCircle, Clock, TriangleAlert, ShieldAlert, Building, CheckCircle, Activity, AlertTriangle } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type FacilityStatus = "Active" | "Blocked" | "Completed";
type IssueType = "Blocked" | "Overdue" | null;

interface Facility {
  name: string;
  country: string;
  tier: string;
  facilityType: string;
  email: string;
  phone: string;
  status: FacilityStatus;
  progress: string;
  lastUpdate: string;
  issue: IssueType;
}

const FACILITIES: Facility[] = [
  { name: "Nilat nihuan dyeing (laundry division)", country: "India",     tier: "Tier 1", facilityType: "Manufacturing",     email: "nike.hanoi@example.com",         phone: "+84 123 456 789", status: "Blocked",   progress: "2 / 4", lastUpdate: "2h ago",  issue: "Blocked"  },
  { name: "Advance Tex",                            country: "Turkey",    tier: "Tier 1", facilityType: "Manufacturing",     email: "adidas.hcm@example.com",          phone: "+84 987 654 321", status: "Active",    progress: "3 / 4", lastUpdate: "4h ago",  issue: null       },
  { name: "C&P Alia",                               country: "Vietnam",   tier: "Tier 2", facilityType: "Assembly",          email: "nike.danang@example.com",         phone: "+84 234\n567 890", status: "Active",   progress: "1 / 5", lastUpdate: "1d ago",  issue: null       },
  { name: "Zhejiang Dayu Printing & Dyeing",        country: "China",     tier: "Tier 1", facilityType: "Quality\nControl",  email: "adidas.vungtau@example.com",      phone: "+84 567 890 123", status: "Active",    progress: "2 / 5", lastUpdate: "1d ago",  issue: null       },
  { name: "Best Practice Textiles",                 country: "Sri Lanka", tier: "Tier 1", facilityType: "Manufacturing",     email: "nike.cantho@example.com",         phone: "+84 678 901 234", status: "Blocked",   progress: "3 / 5", lastUpdate: "3d ago",  issue: "Blocked"  },
  { name: "Yu Fang Textiles",                       country: "China",     tier: "Tier 2", facilityType: "Distribution",      email: "adidas.dist.hanoi@example.com",   phone: "+84 345 678 901", status: "Blocked",   progress: "2 / 6", lastUpdate: "6d ago",  issue: "Blocked"  },
  { name: "PQ Colours",                             country: "Vietnam",   tier: "Tier 3", facilityType: "Processing",        email: "nike.haiphong@example.com",       phone: "+84 456 789 012", status: "Completed", progress: "4 / 9", lastUpdate: "2w ago",  issue: "Overdue"  },
];

const ALL_PROJECTS = [
  "CRP 2025 — Batch 1",
  "CRP 2024 — Final Quarter",
  "CRP 2025 — Batch 2",
  "CRP 2024 — Mid-Year Review",
  "FE Assessment 2025",
  "CRP 2025 — Q3 Extension",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FacilityStatusBadge({ status }: { status: FacilityStatus }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-medium bg-[#c8f9dc] text-[#027a48]">
        Active
      </span>
    );
  }
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-medium bg-[#e0f5f4] text-[#308882]">
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-medium bg-[#fef2f2] text-[#dc2626]">
      Blocked
    </span>
  );
}

function IssueBadge({ issue }: { issue: IssueType }) {
  if (issue === "Blocked") {
    return (
      <div className="flex items-center gap-[5px] text-[#dc2626]">
        <AlertCircle size={12} />
        <span className="text-[11px] font-medium">Blocked</span>
      </div>
    );
  }
  if (issue === "Overdue") {
    return (
      <div className="flex items-center gap-[5px] text-[#f79009]">
        <Clock size={12} />
        <span className="text-[11px] font-medium">Overdue</span>
      </div>
    );
  }
  return <span className="text-[#718d98] text-[13px]">—</span>;
}

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full h-[8px] bg-[#e8ecee] rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProjectDetailScreen({
  activeScreen,
  onNavigate,
  projectName,
}: {
  activeScreen: Screen;
  onNavigate: (s: Screen) => void;
  projectName: string;
}) {
  return (
    <div className="min-h-screen bg-[#e8ecee] font-sans">
      <NavBar activeScreen={activeScreen} onNavigate={onNavigate} />

      <main className="mx-auto px-[70px] py-[40px]" style={{ maxWidth: 1440 }}>

        {/* Sub-header: breadcrumb + project tabs */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-[20px] pb-[20px] pt-[20px] mb-[24px]">
          {/* Back link */}
          <button
            onClick={() => onNavigate("overview")}
            className="flex items-center gap-[8px] text-[#308882] text-[13px] font-medium mb-[12px] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to Contract Overview
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-[8px] mb-[16px]">
            <span className="text-[#718d98] text-[11px]">Contract:</span>
            <span className="bg-[#e8f3f5] text-[#308882] text-[11px] font-mono px-[8px] py-[2px] rounded-[6px]">CRP-2025-001</span>
            <span className="text-[#3c4c53] text-[11px]">APAC Textile Facilities Assessment</span>
            <span className="text-[#a0b3ba] text-[16px] leading-none">·</span>
            <span className="text-[#718d98] text-[11px]">Corporate Responsibility Program</span>
            <span className="text-[#a0b3ba] text-[16px] leading-none">·</span>
            <span className="text-[#718d98] text-[11px]">2025 Q1</span>
          </div>

          {/* Project tabs */}
          <div className="flex items-center gap-[8px] flex-wrap">
            {ALL_PROJECTS.map((p) => (
              <button
                key={p}
                className={`px-[12px] h-[28px] rounded-[6px] text-[11px] font-medium whitespace-nowrap transition-colors ${
                  p === projectName
                    ? "bg-[#308882] text-white font-semibold"
                    : "bg-[#f3f5f6] text-[#718d98] hover:bg-[#e8ecee] hover:text-[#3c4c53]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Project header card */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-[24px] pt-[24px] pb-[20px] mb-[16px]">
          <div className="flex items-start justify-between mb-[16px]">
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[12px]">
                <ShieldAlert size={20} className="text-[#718d98] shrink-0" />
                <h1 className="text-[20px] font-semibold leading-[30px] text-[#3c4c53]">{projectName}</h1>
              </div>
              <p className="text-[13px] text-[#718d98]">CTA - Carbon Target Assessment</p>
              <div className="flex items-center gap-[12px]">
                <span className="inline-flex items-center px-[12px] py-[4px] rounded-full text-[11px] font-medium bg-[#c8f9dc] text-[#027a48]">
                  Active
                </span>
                <div className="flex items-center gap-[6px] px-[9px] py-[4px] rounded-[8px] bg-[#fef2f2] border border-[#fecaca]">
                  <AlertCircle size={14} className="text-[#dc2626]" />
                  <span className="text-[11px] font-semibold text-[#dc2626]">3 blocked</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-[4px]">
              <span className="text-[11px] text-[#718d98]">Project Progress</span>
              <span className="text-[28px] font-semibold text-[#3c4c53]">59%</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-[12px] bg-[#e8ecee] rounded-full overflow-hidden">
            <div className="bg-[#32d583] h-full rounded-full" style={{ width: "59%" }} />
          </div>
        </div>

        {/* Project Summary */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-[20px] pt-[20px] pb-[20px] mb-[16px]">
          <h2 className="text-[16px] font-semibold text-[#3c4c53] mb-[16px]">Project Summary</h2>
          <div className="grid grid-cols-5 gap-[20px]">
            {[
              { label: "Total Facilities", value: "7", sub: "in this project",   iconBg: "#c2eaff", icon: <Building size={16} color="#004266" /> },
              { label: "Completed",        value: "1", sub: "14% complete",       iconBg: "#c8f9dc", icon: <CheckCircle size={16} color="#027a48" /> },
              { label: "Active",           value: "3", sub: "43% in progress",   iconBg: "#c3eae7", icon: <Activity size={16} color="#007a6e" /> },
              { label: "Blocked",          value: "3", sub: "need attention",    iconBg: "#fcebeb", icon: <AlertCircle size={16} color="#dc2626" /> },
              { label: "Missing Items",    value: "1", sub: "incomplete data",   iconBg: "#faeeda", icon: <AlertTriangle size={16} color="#92400e" /> },
            ].map(({ label, value, sub, iconBg, icon }) => (
              <div
                key={label}
                className="bg-white rounded-[8px] px-[15px] py-[14px] flex flex-col gap-[8px]"
                style={{ border: "1px solid #718d98", boxShadow: "0px 4px 8px -2px rgba(16,24,40,0.10)" }}
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
            ))}
          </div>
        </div>

        {/* Facilities table */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-[20px] pt-[20px] pb-[20px] mb-[16px]">
          <h2 className="text-[14px] font-semibold text-[#3c4c53] mb-[16px]">Facilities (7)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-[#e0e5e8] rounded-[8px] overflow-hidden" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e0e5e8]">
                  {["Facility", "Country", "Tier", "Facility Type", "Email", "Phone", "Status", "Progress", "Last\nUpdate", "Issues"].map((h) => (
                    <th key={h} className="text-left px-4 py-[10px] text-[13px] font-medium text-[#718d98] whitespace-pre-wrap leading-tight">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FACILITIES.map((f, i) => (
                  <tr key={i} className="border-b border-[#f0f2f4] last:border-0 hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-[14px] text-[13px] font-medium text-[#3c4c53] min-w-[180px]">{f.name}</td>
                    <td className="px-4 py-[14px]">
                      <span className={`text-[13px] font-medium ${["India","China"].includes(f.country) ? "text-[#308882]" : f.country === "Sri Lanka" ? "text-[#308882]" : "text-[#718d98]"}`}>
                        {f.country}
                      </span>
                    </td>
                    <td className="px-4 py-[14px] text-[13px] text-[#3c4c53] whitespace-nowrap">{f.tier}</td>
                    <td className="px-4 py-[14px] text-[13px] text-[#3c4c53] whitespace-pre-wrap leading-tight">{f.facilityType}</td>
                    <td className="px-4 py-[14px] text-[13px] text-[#718d98]">{f.email}</td>
                    <td className="px-4 py-[14px] text-[13px] text-[#718d98] whitespace-pre-wrap leading-tight">{f.phone}</td>
                    <td className="px-4 py-[14px]"><FacilityStatusBadge status={f.status} /></td>
                    <td className="px-4 py-[14px] text-[13px] text-[#3c4c53] whitespace-nowrap">{f.progress}</td>
                    <td className="px-4 py-[14px] text-[13px] text-[#718d98] whitespace-nowrap">{f.lastUpdate}</td>
                    <td className="px-4 py-[14px]"><IssueBadge issue={f.issue} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Issues & Blockers + Progress Detail */}
        <div className="grid grid-cols-2 gap-[20px]">
          {/* Issues & Blockers */}
          <div className="bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-[20px] pt-[20px] pb-[20px]">
            <h2 className="text-[14px] font-semibold text-[#3c4c53] mb-[20px]">Issues & Blockers</h2>

            <div className="flex flex-col gap-[12px] mb-[20px]">
              {/* Blocked Facilities */}
              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-[8px] px-[12px] py-[12px] flex items-start gap-[12px]">
                <AlertCircle size={16} className="text-[#dc2626] shrink-0 mt-[2px]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-[4px]">
                    <span className="text-[12px] font-medium text-[#3c4c53]">Blocked Facilities</span>
                    <span className="text-[14px] font-semibold text-[#3c4c53]">3</span>
                  </div>
                  <span className="text-[11px] text-[#718d98]">Awaiting critical information</span>
                </div>
              </div>

              {/* Overdue Facilities */}
              <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[8px] px-[12px] py-[12px] flex items-start gap-[12px]">
                <Clock size={16} className="text-[#f79009] shrink-0 mt-[2px]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-[4px]">
                    <span className="text-[12px] font-medium text-[#3c4c53]">Overdue Facilities</span>
                    <span className="text-[14px] font-semibold text-[#3c4c53]">1</span>
                  </div>
                  <span className="text-[11px] text-[#718d98]">Extended time in current stage</span>
                </div>
              </div>

              {/* Missing Data Items */}
              <div className="bg-[#fefce8] border border-[#fde047] rounded-[8px] px-[12px] py-[12px] flex items-start gap-[12px]">
                <TriangleAlert size={16} className="text-[#ca8a04] shrink-0 mt-[2px]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-[4px]">
                    <span className="text-[12px] font-medium text-[#3c4c53]">Missing Data Items</span>
                    <span className="text-[14px] font-semibold text-[#3c4c53]">1</span>
                  </div>
                  <span className="text-[11px] text-[#718d98]">Incomplete information</span>
                </div>
              </div>
            </div>

            {/* Missing Items Detail */}
            <div className="border-t border-[#e8ecee] pt-[16px]">
              <p className="text-[11px] font-medium text-[#718d98] mb-[10px]">Missing Items Detail:</p>
              <div className="bg-[#fefce8] border border-[#fde047] rounded-[6px] px-[9px] pt-[9px] pb-[8px]">
                <p className="text-[11px] font-medium text-[#3c4c53] mb-[4px]">Nike Factory Hanoi</p>
                <p className="text-[10px] text-[#718d98] pl-[14px] before:content-['•'] before:mr-[4px] before:text-[#718d98]">Energy consumption data</p>
              </div>
            </div>
          </div>

          {/* Progress Detail */}
          <div className="bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-[20px] pt-[20px] pb-[20px]">
            <h2 className="text-[14px] font-semibold text-[#3c4c53] mb-[20px]">Progress Detail</h2>

            <div className="flex flex-col gap-[12px] mb-[20px]">
              {[
                { label: "Completed Facilities", count: "1 of 7", pct: (1/7)*100, color: "#32d583" },
                { label: "Active Facilities",    count: "3 of 7", pct: (3/7)*100, color: "#3aa69f" },
                { label: "Blocked Facilities",   count: "3 of 7", pct: (3/7)*100, color: "#dc2626" },
                { label: "Pre-DG / Intake",      count: "0 of 7", pct: 0,         color: "#a0b3ba" },
              ].map(({ label, count, pct, color }) => (
                <div key={label} className="flex flex-col gap-[4px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#718d98]">{label}</span>
                    <span className="text-[12px] font-medium text-[#3c4c53]">{count}</span>
                  </div>
                  <ProgressBar pct={pct} color={color} />
                </div>
              ))}
            </div>

            <div className="border-t border-[#e8ecee] pt-[16px] flex items-center justify-between">
              <span className="text-[11px] text-[#718d98]">Overall project completion</span>
              <span className="text-[14px] font-semibold text-[#3c4c53]">59%</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

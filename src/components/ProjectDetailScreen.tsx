import React from "react";
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
  phones: string[];
  emails: string[];
  status: FacilityStatus;
  progress: string;
  lastUpdate: string;
  issue: IssueType;
}

const FACILITIES: Facility[] = [
  { name: "Nilat nihuan dyeing (laundry division)", country: "India",     tier: "Tier 1", facilityType: "Manufacturing",  phones: ["+91 22 4567 8901", "+91 22 4567 8902", "+91 22 4567 8903"], emails: ["ops@nilatnihuan.com", "compliance@nilatnihuan.com", "manager@nilatnihuan.com"], status: "Blocked",   progress: "2 / 4", lastUpdate: "2h ago",  issue: "Blocked"  },
  { name: "Advance Tex",                            country: "Turkey",    tier: "Tier 1", facilityType: "Manufacturing",  phones: ["+90 212 987 6543"],                                          emails: ["adidas.hcm@example.com"],                                                        status: "Active",    progress: "3 / 4", lastUpdate: "4h ago",  issue: null       },
  { name: "C&P Alia",                               country: "Vietnam",   tier: "Tier 2", facilityType: "Assembly",       phones: ["+84 234 567 890", "+84 234 567 891", "+84 234 567 892"],    emails: ["nike.danang@example.com", "quality@cpalia.vn", "logistics@cpalia.vn"],          status: "Active",    progress: "1 / 5", lastUpdate: "1d ago",  issue: null       },
  { name: "Zhejiang Dayu Printing & Dyeing",        country: "China",     tier: "Tier 1", facilityType: "Quality Control", phones: ["+86 571 8901 2345"],                                       emails: ["adidas.vungtau@example.com"],                                                    status: "Active",    progress: "2 / 5", lastUpdate: "1d ago",  issue: null       },
  { name: "Best Practice Textiles",                 country: "Sri Lanka", tier: "Tier 1", facilityType: "Manufacturing",  phones: ["+94 11 678 9012"],                                          emails: ["nike.cantho@example.com"],                                                       status: "Blocked",   progress: "3 / 5", lastUpdate: "3d ago",  issue: "Blocked"  },
  { name: "Yu Fang Textiles",                       country: "China",     tier: "Tier 2", facilityType: "Distribution",   phones: ["+86 571 3456 7890"],                                        emails: ["adidas.dist.hanoi@example.com"],                                                 status: "Blocked",   progress: "2 / 6", lastUpdate: "6d ago",  issue: "Blocked"  },
  { name: "PQ Colours",                             country: "Vietnam",   tier: "Tier 3", facilityType: "Processing",     phones: ["+84 456 789 012"],                                          emails: ["nike.haiphong@example.com"],                                                     status: "Completed", progress: "4 / 9", lastUpdate: "2w ago",  issue: "Overdue"  },
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

function MoreTooltip({ extra }: { extra: string[] }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className="relative inline-block mt-[4px]">
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="cursor-default text-[10px] font-medium text-[#718d98] bg-[#f3f5f6] px-[6px] py-[2px] rounded-[4px] select-none"
      >
        +{extra.length} more
      </span>
      {visible && (
        <div
          className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-50 rounded-2xl px-5 py-4 whitespace-nowrap"
          style={{ background: "#ffffff", boxShadow: "0px 4px 24px rgba(0,0,0,0.10)" }}
        >
          {extra.map((v, i) => (
            <div key={i} className="text-sm font-normal text-[#2d4a52]">{v}</div>
          ))}
        </div>
      )}
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
            Back to Cohort Overview
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-[8px] mb-[16px]">
            <span className="text-[#718d98] text-[11px]">Cohort:</span>
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
                  {["Facility", "Country", "Tier", "Facility Type", "Phone", "Email", "Status", "Progress", "Last\nUpdate", "Issues"].map((h) => (
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
                    <td className="px-4 py-[14px] text-[12px] text-[#3c4c53] whitespace-nowrap" style={{ minWidth: 160 }}>
                      {f.phones[0]}
                      {f.phones.length > 1 && <MoreTooltip extra={f.phones.slice(1)} />}
                    </td>
                    <td className="px-4 py-[14px] text-[12px] text-[#718d98]" style={{ minWidth: 180 }}>
                      {f.emails[0]}
                      {f.emails.length > 1 && <MoreTooltip extra={f.emails.slice(1)} />}
                    </td>
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

        {/* Issues & Blockers */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-[20px] pt-[20px] pb-[20px]">
          <div className="w-full">
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

              {/* Edit Request */}
              <div className="bg-[#fefce8] border border-[#fde047] rounded-[8px] px-[12px] py-[12px] flex items-start gap-[12px]">
                <TriangleAlert size={16} className="text-[#ca8a04] shrink-0 mt-[2px]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-[4px]">
                    <span className="text-[12px] font-medium text-[#3c4c53]">Edit Request</span>
                    <span className="text-[14px] font-semibold text-[#3c4c53]">1</span>
                  </div>
                  <span className="text-[11px] text-[#718d98]">Pending Verification</span>
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
        </div>
      </main>
    </div>
  );
}

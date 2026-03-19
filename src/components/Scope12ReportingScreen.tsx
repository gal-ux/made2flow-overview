import React from "react";
import { NavBar } from "./NavBar";
import type { Screen } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReportingView = "Location" | "Market";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FACILITY_TYPE_BAR = [
  { label: "Production", count: 34, color: "#308882", pct: 27.3 },
  { label: "Office", count: 7, color: "#a187e8", pct: 11.2 },
  { label: "DC", count: 12, color: "#F79009", pct: 16.2 },
  { label: "Dormitory", count: 1, color: "#FF6333", pct: 8.0 },
  { label: "Stores", count: 347, color: "#68cac3", pct: 37.4 },
];

const ENERGY_SOURCE_ROWS = [
  { source: "Stationary Combustion",                   scope: "S1",     unit: "tCO₂e", consumption: "1,620,000", emissions: "920" },
  { source: "Mobile Combustion",                        scope: "S1",     unit: "tCO₂e", consumption: "448,000",   emissions: "340" },
  { source: "Fugitive Emissions",                       scope: "S1",     unit: "tCO₂e", consumption: "10,500",    emissions: "840" },
  { source: "Purchased Electricity (Location)",         scope: "S2 Loc", unit: "MJ",    consumption: "5,520,000", emissions: "3,720" },
  { source: "Purchased Electricity (Market)",           scope: "S2 Mkt", unit: "MJ",    consumption: "106,500",   emissions: "—" },
  { source: "Self produced Renewables",                 scope: "S2",     unit: "MJ",    consumption: "949,500",   emissions: "—" },
  { source: "Renewable Energy Claims (RECs/GOs/I-RECs)", scope: "S2 Mkt", unit: "MJ",   consumption: "0",         emissions: "0" },
  { source: "PPAs: Power Purchase Agreements (Market)", scope: "S2 Mkt", unit: "MJ",    consumption: "0",         emissions: "0" },
  { source: "Residual Mix Emissions (Market)",          scope: "S2 Mkt", unit: "MJ",    consumption: "0",         emissions: "410" },
];

const ENERGY_SOURCE_TOTALS = [
  { source: "Total Scope 1",                  bg: "#c2eaff", borderColor: "#d0d9dd", consumption: "2,078,500", emissions: "2,100" },
  { source: "Total Scope 2 – Location based", bg: "#fef0c7", borderColor: "#d0d9dd", consumption: "7,236,000", emissions: "3,720" },
  { source: "Total Scope 2 – Market based",   bg: "#fef0c7", borderColor: "#d0d9dd", consumption: "0",         emissions: "4,130" },
];

const FACILITY_ROWS = [
  { name: "Nilat nihuan dyeing (laundry division)", country: "China",      tier: "Tier 1", type: "Dyeing",   scope1: "920",   scope2Loc: "3,200", scope12Loc: "4,120" },
  { name: "Advance Tex",                            country: "Bangladesh", tier: "Tier 1", type: "Weaving",  scope1: "340",   scope2Loc: "520",   scope12Loc: "860" },
  { name: "C&P Alia",                               country: "Vietnam",    tier: "Tier 2", type: "Dyeing",   scope1: "280",   scope2Loc: "140",   scope12Loc: "420" },
  { name: "Zhejiang Dayu Printing & Dyeing",        country: "China",      tier: "Tier 1", type: "Dyeing",   scope1: "410",   scope2Loc: "2,100", scope12Loc: "2,510" },
  { name: "Best Practice Textiles",                 country: "India",      tier: "Tier 1", type: "Weaving",  scope1: "95",    scope2Loc: "610",   scope12Loc: "705" },
  { name: "Yu Fang Textiles",                       country: "China",      tier: "Tier 2", type: "Dyeing",   scope1: "55",    scope2Loc: "680",   scope12Loc: "735" },
  { name: "PT Sumatra Garments",                    country: "Indonesia",  tier: "Tier 1", type: "Cut & Sew", scope1: "—",    scope2Loc: "—",     scope12Loc: "—" },
  { name: "Bali Eco Fibres",                        country: "Indonesia",  tier: "Tier 2", type: "Weaving",  scope1: "—",    scope2Loc: "—",     scope12Loc: "—" },
  { name: "Hangzhou Silk Works",                    country: "China",      tier: "Tier 1", type: "Dyeing",   scope1: "—",    scope2Loc: "—",     scope12Loc: "—" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-[16px] font-semibold leading-[24px] text-[#3c4c53]">{title}</h2>
      <div className="flex items-center gap-[10px]">
        {children}
        <ChevronDownIcon className="w-6 h-6 text-[#3c4c53]" />
      </div>
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function Scope12ReportingScreen({
  activeScreen,
  onNavigate,
}: {
  activeScreen: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const [reportingView, setReportingView] = React.useState<ReportingView>("Market");

  return (
    <div className="min-h-screen bg-[#e8ecee] font-sans">
      <NavBar activeScreen={activeScreen} onNavigate={onNavigate} />

      {/* Secondary sticky bar */}
      <div className="bg-white border-b border-[#b8c6cc] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] sticky top-[60px] z-10">
        <div className="mx-auto px-[70px] py-[15px]" style={{ maxWidth: 1440 }}>
          <div className="relative h-[64px]">
            {/* Boundary Approach */}
            <div className="absolute left-0 top-0 flex flex-col gap-[6px]">
              <span className="text-[14px] font-medium leading-[20px] text-[#3c4c53] whitespace-nowrap">
                Boundary Approach
              </span>
              <button className="flex items-center gap-[8px] bg-white border border-[#a0b3ba] rounded-[8px] px-[16px] py-[10px] text-[14px] font-semibold leading-[20px] text-[#3c4c53] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-[#308882] transition-colors">
                Operational control
                <ChevronDownIcon className="w-[20px] h-[20px]" />
              </button>
            </div>

            {/* Reporting period */}
            <div className="absolute left-[206px] top-0 flex flex-col gap-[6px]">
              <span className="text-[14px] font-medium leading-[20px] text-[#3c4c53] whitespace-nowrap">
                Reporting period
              </span>
              <button className="flex items-center gap-[8px] bg-white border border-[#a0b3ba] rounded-[8px] px-[16px] py-[10px] text-[14px] font-semibold leading-[20px] text-[#3c4c53] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-[#308882] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#718d98" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="11" rx="1" />
                  <line x1="2" y1="6" x2="14" y2="6" />
                  <line x1="5" y1="1.5" x2="5" y2="4.5" />
                  <line x1="11" y1="1.5" x2="11" y2="4.5" />
                </svg>
                Feb 2025 – Feb 2026
              </button>
            </div>

            {/* Reporting view toggle */}
            <div className="absolute right-0 top-[10px] flex items-center gap-[10px]">
              <span className="text-[12px] text-[#718d98] whitespace-nowrap">Reporting view</span>
              <div className="flex items-center bg-[#d0d9dd] rounded-[8px] p-[5px] gap-[2px]">
                {(["Location", "Market"] as ReportingView[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setReportingView(v)}
                    className={`px-[12px] py-[6px] text-[14px] font-semibold leading-[20px] rounded-[8px] transition-colors ${
                      reportingView === v
                        ? "bg-white text-[#3c4c53] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                        : "text-[#3c4c53]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto px-[70px] py-[40px]" style={{ maxWidth: 1440 }}>
        {/* Page title */}
        <h1 className="text-[26px] font-semibold leading-[32px] text-[#3c4c53] mb-[20px]">
          Scope 1 &amp; 2 Reporting
        </h1>

        {/* Facility type stacked bar */}
        <div className="bg-white rounded-[8px] mb-[16px] overflow-hidden">
          <div className="flex h-[48px]">
            {FACILITY_TYPE_BAR.map((seg) => (
              <div
                key={seg.label}
                className="flex items-center justify-center shrink-0"
                style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
              >
                <span className="text-[12px] font-semibold text-white whitespace-nowrap px-2">
                  {seg.label} – {seg.count}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[20px] px-[20px] py-[10px]">
            {FACILITY_TYPE_BAR.map((seg) => (
              <div key={seg.label} className="flex items-center gap-[8px]">
                <div className="w-[12px] h-[12px] rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-[12px] text-[#718d98]">{seg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters row */}
        <div className="mb-[16px]">
          <div className="flex items-center justify-between mb-[16px]">
            <div />
            <button className="flex items-center gap-[6px] px-[16px] py-[9px] rounded-[8px] border border-[#d0d9dd] bg-white text-[14px] font-medium text-[#3c4c53] hover:bg-[#f3f5f6] transition-colors">
              Clear all
            </button>
          </div>
          <div className="flex items-center gap-[20px] flex-wrap">
            {["Brands", "Programs", "Cohorts", "Facilities", "Countries", "Reporting period"].map((f) => (
              <div key={f} className="flex items-center gap-[8px] border border-[#d0d9dd] bg-white rounded-[8px] px-[12px] py-[10px] text-[14px] leading-[20px] cursor-pointer hover:border-[#308882] transition-colors" style={{ minWidth: 200 }}>
                <span className="flex-1 text-[#718d98]">{f}</span>
                <ChevronDownIcon className="w-[16px] h-[16px] text-[#718d98]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 1: Facilities overview ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <SectionHeader title="Facilities overview" />
          <p className="text-[12px] text-[#3c4c53] mt-[4px] mb-[24px]">Based on current filters and reporting period</p>

          {/* Top 3 overview cards */}
          <div className="grid grid-cols-3 gap-[20px] mb-[20px]">
            {/* Facilities measured */}
            <div className="bg-white border border-[#68cac3] rounded-[8px] h-[128px] px-[15px] py-[14px] flex flex-col justify-between shadow-[0px_4.086px_8.172px_0px_rgba(16,24,40,0.10),0px_2.043px_4.086px_0px_rgba(16,24,40,0.06)]">
              <div className="flex items-center gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718d98" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span className="text-[12px] font-semibold text-[#004266]">Facilities measured</span>
              </div>
              <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">140</span>
            </div>

            {/* Total energy consumption */}
            <div className="bg-white border border-[#68cac3] rounded-[8px] h-[128px] px-[15px] py-[14px] flex flex-col justify-between shadow-[0px_4.086px_8.172px_0px_rgba(16,24,40,0.10),0px_2.043px_4.086px_0px_rgba(16,24,40,0.06)]">
              <div className="flex items-center gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718d98" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span className="text-[12px] font-semibold text-[#004266]">Total energy consumption</span>
              </div>
              <div className="flex items-baseline gap-[5px]">
                <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">50,000</span>
                <span className="text-[18px] font-medium leading-[28px] text-[#3c4c53]">(MJ)</span>
              </div>
            </div>

            {/* Emission distribution */}
            <div className="bg-white border border-[#68cac3] rounded-[8px] h-[128px] px-[15px] py-[14px] flex flex-col justify-between shadow-[0px_4.086px_8.172px_0px_rgba(16,24,40,0.10),0px_2.043px_4.086px_0px_rgba(16,24,40,0.06)]">
              <div className="flex items-center gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718d98" strokeWidth="2">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                <span className="text-[12px] font-semibold text-[#004266]">Emission distribution</span>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex rounded-[10px] overflow-hidden h-[32px]">
                  <div className="bg-[#c2eaff] flex items-center justify-center" style={{ width: "34%" }}>
                    <span className="text-[12px] font-semibold text-[#004266]">34%</span>
                  </div>
                  <div className="bg-[#fef0c7] flex items-center justify-center flex-1">
                    <span className="text-[12px] font-semibold text-[#b54708]">66%</span>
                  </div>
                </div>
                <div className="flex items-center gap-[15px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#c2eaff]" />
                    <span className="text-[12px] text-[#718d98]">Scope 1</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#fef0c7]" />
                    <span className="text-[12px] text-[#718d98]">Scope 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scope summary cards */}
          <div className="grid grid-cols-3 gap-[20px]">
            {/* Scope 1 */}
            <div className="bg-white border border-[#0092e0] rounded-[8px] h-[128px] px-[15px] py-[14px] flex flex-col justify-between shadow-[0px_4.086px_8.172px_0px_rgba(16,24,40,0.10),0px_2.043px_4.086px_0px_rgba(16,24,40,0.06)]">
              <span className="inline-flex items-center px-[8px] py-[2px] rounded-[16px] bg-[#c2eaff] text-[12px] font-medium text-[#004266] w-fit">
                Scope 1
              </span>
              <div>
                <div className="flex items-baseline gap-[5px]">
                  <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">2,100</span>
                  <span className="text-[18px] font-medium leading-[28px] text-[#3c4c53]">(tCO₂e)</span>
                </div>
                <span className="text-[12px] font-semibold text-[#3c4c53]">Direct emissions</span>
              </div>
            </div>

            {/* Scope 2 */}
            <div className="bg-white border border-[#fdb022] rounded-[8px] h-[128px] px-[15px] py-[14px] flex flex-col justify-between shadow-[0px_4.086px_8.172px_0px_rgba(16,24,40,0.10),0px_2.043px_4.086px_0px_rgba(16,24,40,0.06)]">
              <span className="inline-flex items-center px-[8px] py-[2px] rounded-[16px] bg-[#fffaeb] text-[12px] font-medium text-[#b54708] w-fit">
                Scope 2
              </span>
              <div>
                <div className="flex items-baseline gap-[5px]">
                  <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">4,130</span>
                  <span className="text-[18px] font-medium leading-[28px] text-[#3c4c53]">(tCO₂e)</span>
                </div>
                <span className="text-[12px] font-semibold text-[#3c4c53]">Indirect emissions</span>
              </div>
            </div>

            {/* Scope 1 & 2 */}
            <div className="bg-white border border-[#32d583] rounded-[8px] h-[128px] px-[15px] py-[14px] flex flex-col justify-between shadow-[0px_4.086px_8.172px_0px_rgba(16,24,40,0.10),0px_2.043px_4.086px_0px_rgba(16,24,40,0.06)]">
              <span className="inline-flex items-center px-[8px] py-[2px] rounded-[16px] bg-[#c8f9dc] text-[12px] font-medium text-[#027a48] w-fit">
                Scope 1 &amp; 2
              </span>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-[5px]">
                    <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">6,230</span>
                    <span className="text-[18px] font-medium leading-[28px] text-[#3c4c53]">(tCO₂e)</span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#3c4c53]">Total emissions</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[12px] font-semibold text-[#5e7882]">YOY</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#718d98" strokeWidth="1.5">
                    <circle cx="10" cy="10" r="8" />
                    <line x1="10" y1="9" x2="10" y2="14" />
                    <circle cx="10" cy="6.5" r="0.5" fill="#718d98" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Energy source breakdown ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <SectionHeader title="Energy source breakdown" />
          <div className="mt-[24px] rounded-[10px] border border-[#d0d9dd] overflow-x-auto shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
            <table className="w-full text-left border-collapse" style={{ tableLayout: "auto", minWidth: 800 }}>
              <thead>
                <tr className="bg-[#fffcf5] border-b border-[#d0d9dd]">
                  {[
                    { label: "Energy source", w: 300 },
                    { label: "Scope", w: 90 },
                    { label: "Unit", w: 80 },
                    { label: "Consumption (MJ)", w: null },
                    { label: "Emissions (tCO₂e)", w: null },
                  ].map((h) => (
                    <th key={h.label} className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap"
                      style={h.w ? { minWidth: h.w } : {}}>
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ENERGY_SOURCE_ROWS.map((row, i) => (
                  <tr key={row.source} className={i % 2 === 0 ? "bg-white" : "bg-[#f3f5f6]"}>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.source}</td>
                    <td className="px-[12px] py-[10px]">
                      <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[16px] text-[12px] font-medium whitespace-nowrap ${
                        row.scope === "S1"     ? "bg-[#c2eaff] text-[#004266]" :
                        row.scope === "S2 Mkt" ? "bg-[#fed7aa] text-[#c2410c]" :
                                                 "bg-[#fef0c7] text-[#b54708]"
                      }`}>
                        {row.scope}
                      </span>
                    </td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#718d98]">{row.unit}</td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.consumption}</td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.emissions}</td>
                  </tr>
                ))}
                {/* Total rows */}
                {ENERGY_SOURCE_TOTALS.map((row) => (
                  <tr key={row.source} style={{ backgroundColor: row.bg }} className="border-t border-[#d0d9dd]">
                    <td className="px-[12px] py-[10px] text-[12px] font-semibold leading-[18px] text-[#3c4c53]" colSpan={3}>{row.source}</td>
                    <td className="px-[12px] py-[10px] text-[12px] font-semibold leading-[18px] text-[#3c4c53]">{row.consumption}</td>
                    <td className="px-[12px] py-[10px] text-[12px] font-semibold leading-[18px] text-[#3c4c53]">{row.emissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Section 3: Total Scope 1 & 2 – Facility view ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <div className="flex items-center justify-between mb-[16px]">
            <SectionHeader title="Total Scope 1 &amp; 2 – Facility view" />
          </div>

          {/* Clear all button */}
          <div className="flex justify-end mb-[16px]">
            <button className="flex items-center gap-[8px] px-[18px] py-[10px] rounded-[8px] bg-[#718d98] text-white text-[14px] font-semibold hover:bg-[#5e7882] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
                <line x1="2" y1="2" x2="14" y2="14" />
                <line x1="14" y1="2" x2="2" y2="14" />
              </svg>
              Clear all
            </button>
          </div>

          <div className="rounded-[10px] border border-[#d0d9dd] overflow-x-auto shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
            <table className="w-full text-left border-collapse" style={{ tableLayout: "auto", minWidth: 900 }}>
              <thead>
                <tr className="bg-[#fffcf5] border-b border-[#d0d9dd]">
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap" style={{ minWidth: 240 }}>
                    <span className="flex items-center gap-[6px]">Facility name <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Country <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Tier <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Facility type <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Total Scope 1 (tCO₂e) <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Total Scope 2 – Location (tCO₂e) <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Total Scopes 1 &amp; 2 – Location (tCO₂e) <FilterIcon /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {FACILITY_ROWS.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-[#f3f5f6]"}>
                    <td className="px-[12px] py-[10px]">
                      <button className="text-[14px] font-semibold leading-[20px] text-[#308882] hover:underline text-left">
                        {row.name}
                      </button>
                    </td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.country}</td>
                    <td className="px-[12px] py-[10px]">
                      <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[16px] text-[12px] font-medium whitespace-nowrap ${
                        row.tier === "Tier 1" ? "bg-[#c2eaff] text-[#004266]" : "bg-[#f3f5f6] text-[#5e7882]"
                      }`}>
                        {row.tier}
                      </span>
                    </td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.type}</td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.scope1}</td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.scope2Loc}</td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.scope12Loc}</td>
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

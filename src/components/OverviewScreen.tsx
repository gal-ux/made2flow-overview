import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectStatus = "Active" | "Completed" | "Pre-Data Gathering";

interface DateRange {
  start: string; // ISO "YYYY-MM-DD"
  end: string;
}

interface Project {
  id: number;
  name: string;
  program: string;
  programDisplayName?: string;
  cohort: string;
  brands: string[];
  expert: string;
  startDate: string;
  status: ProjectStatus;
  blockedCount?: number;
  actionPlan: boolean;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const DEFAULT_DATE_RANGE: DateRange = { start: "2025-01-01", end: "2025-03-31" };

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "CRP 2025 — Batch 1",
    program: "Corporate Responsibility Program",
    cohort: "2025 Q1",
    brands: ["Nike"],
    expert: "Sarah Johnson",
    startDate: "Feb 15, 2025",
    status: "Active",
    blockedCount: 1,
    actionPlan: false,
  },
  {
    id: 2,
    name: "CRP 2024 — Final Quarter",
    program: "Corporate Responsibility Program",
    cohort: "2025 Q1",
    brands: ["Adidas"],
    expert: "Sarah Johnson",
    startDate: "Feb 15, 2025",
    status: "Active",
    actionPlan: true,
  },
  {
    id: 3,
    name: "CRP 2025 — Batch 2",
    program: "Corporate Responsibility Program",
    cohort: "2025 Q1",
    brands: ["Nike"],
    expert: "Sarah Johnson",
    startDate: "Feb 15, 2025",
    status: "Completed",
    actionPlan: true,
  },
  {
    id: 4,
    name: "CRP 2024 — Mid-Year Review",
    program: "Corporate Responsibility Program",
    cohort: "2025 Q1",
    brands: ["Adidas"],
    expert: "Sarah Johnson",
    startDate: "Feb 15, 2025",
    status: "Active",
    blockedCount: 1,
    actionPlan: false,
  },
  {
    id: 5,
    name: "FE Assessment 2025",
    program: "Corporate Responsibility Program",
    programDisplayName: "Factory Environment Assessment",
    cohort: "2025 Q1",
    brands: ["Nike"],
    expert: "Sarah Johnson",
    startDate: "Feb 15, 2025",
    status: "Active",
    actionPlan: true,
  },
  {
    id: 6,
    name: "CRP 2025 — Q3 Extension",
    program: "Corporate Responsibility Program",
    cohort: "2025 Q1",
    brands: ["Adidas"],
    expert: "Sarah Johnson",
    startDate: "Feb 15, 2025",
    status: "Pre-Data Gathering",
    actionPlan: true,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function SortIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M6 2.5 9 5.5H3L6 2.5Z" fill="currentColor" />
      <path d="M6 9.5 3 6.5h6L6 9.5Z" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d={up ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4"}
        stroke="#718d98"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3v7M5.5 8 8 10.5 10.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="6" cy="6" r="4.5" stroke="#dc2626" strokeWidth="1.2" />
      <path d="M6 3.5v3" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="8.25" r="0.6" fill="#dc2626" />
    </svg>
  );
}

// ─── Small components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    Active:                "bg-[#c8f9dc] text-[#027a48]",
    Completed:             "bg-[#d5e5ec] text-[#335e70]",
    "Pre-Data Gathering":  "bg-[#e8ecee] text-[#5e7882]",
  };
  return (
    <span
      className={`inline-block text-[11px] font-medium leading-6 px-[10px] rounded-[14px] whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function IssuesBadge({ blockedCount }: { blockedCount?: number }) {
  if (!blockedCount) {
    return <span className="text-[11px] text-m2f-faint">—</span>;
  }
  return (
    <span className="inline-flex items-center gap-1 bg-[#fef2f2] border border-[#fecaca] rounded-lg px-2 py-[3px] whitespace-nowrap">
      <AlertIcon />
      <span className="text-[11px] font-semibold text-[#dc2626]">{blockedCount}</span>
      <span className="text-[10px] text-[#991b1b]">blocked</span>
    </span>
  );
}

function ActionPlanBadge({ value }: { value: boolean }) {
  return (
    <span
      className={`inline-block text-[11px] font-medium leading-6 px-[10px] rounded-[14px] whitespace-nowrap ${
        value ? "bg-[#c8f9dc] text-[#027a48]" : "bg-[#e8ecee] text-[#5e7882]"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

function BrandPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center bg-[#f3f5f6] text-m2f-dark text-[11px] font-normal leading-5 px-2 rounded-[10px] whitespace-nowrap">
      {name}
    </span>
  );
}

function SortableHeader({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer text-[11px] font-medium text-m2f-muted hover:text-m2f-dark transition-colors duration-150 focus-visible:outline-none focus-visible:text-m2f-dark"
    >
      {label}
      <SortIcon />
    </button>
  );
}

// ─── Date range picker ────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-m2f-muted">
      <rect x="1" y="2.5" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 5.5h12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 1v3M10 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="4.5" cy="8.5" r="0.75" fill="currentColor" />
      <circle cx="7" cy="8.5" r="0.75" fill="currentColor" />
      <circle cx="9.5" cy="8.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}

function formatRangeShort(range: DateRange): string {
  return `${formatDate(range.start)} → ${formatDate(range.end)}`;
}

// Compact form for table cells: "Jan–Mar 2025"
function formatRangeCell(range: DateRange): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [sy, sm] = range.start.split("-").map(Number);
  const [, em]   = range.end.split("-").map(Number);
  if (sm === em) return `${months[sm - 1]} ${sy}`;
  return `${months[sm - 1]}–${months[em - 1]} ${sy}`;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (v: DateRange) => void;
}

function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync draft when value changes externally
  useEffect(() => { setDraft(value); }, [value]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { setDraft(value); setOpen(false); }
    }
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDraft(value);
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [value]);

  function apply() {
    onChange(draft);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 h-9 px-3 bg-white border rounded-lg cursor-pointer text-[13px] font-medium text-m2f-dark transition-colors duration-150
          ${open ? "border-m2f-teal" : "border-m2f-border hover:border-m2f-teal"}
          focus-visible:outline-none focus-visible:border-m2f-teal`}
      >
        <CalendarIcon />
        <span>{formatRangeShort(value)}</span>
        <ChevronIcon up={open} />
      </button>

      {/* Popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Select reporting period"
          className="absolute top-[calc(100%+6px)] right-0 bg-white border border-m2f-border rounded-xl shadow-xl z-50 p-4 w-[320px]"
        >
          <p className="m-0 mb-3 text-[11px] font-semibold text-m2f-muted uppercase tracking-wide">
            Reporting period
          </p>

          <div className="flex flex-col gap-3 mb-4">
            {/* Start date */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="drp-start"
                className="text-[11px] font-medium text-m2f-muted"
              >
                From
              </label>
              <input
                id="drp-start"
                type="date"
                value={draft.start}
                max={draft.end}
                onChange={(e) => setDraft((d) => ({ ...d, start: e.target.value }))}
                className="h-9 px-3 border border-m2f-border rounded-lg text-[13px] text-m2f-dark font-medium bg-white cursor-pointer
                  focus:outline-none focus:border-m2f-teal transition-colors duration-150"
              />
            </div>

            {/* End date */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="drp-end"
                className="text-[11px] font-medium text-m2f-muted"
              >
                To
              </label>
              <input
                id="drp-end"
                type="date"
                value={draft.end}
                min={draft.start}
                onChange={(e) => setDraft((d) => ({ ...d, end: e.target.value }))}
                className="h-9 px-3 border border-m2f-border rounded-lg text-[13px] text-m2f-dark font-medium bg-white cursor-pointer
                  focus:outline-none focus:border-m2f-teal transition-colors duration-150"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => { setDraft(value); setOpen(false); }}
              className="h-8 px-3 text-[12px] font-medium text-m2f-muted bg-transparent border border-m2f-border rounded-lg cursor-pointer hover:border-m2f-teal hover:text-m2f-teal transition-colors duration-150 focus-visible:outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={apply}
              className="h-8 px-4 text-[12px] font-semibold text-white bg-m2f-teal border-0 rounded-lg cursor-pointer hover:bg-m2f-teal-hover transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m2f-teal focus-visible:ring-offset-1"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────

type UserRole = "Vendor" | "Multi-Supplier" | "AI User";

const ROLE_STYLES: Record<UserRole, { bg: string; text: string; dot: string }> = {
  "Vendor":         { bg: "bg-[#e6f7f5]", text: "text-[#1d6b65]", dot: "bg-[#308882]" },
  "Multi-Supplier": { bg: "bg-[#dbeafe]", text: "text-[#1d4ed8]", dot: "bg-[#3b82f6]" },
  "AI User":        { bg: "bg-[#ede9fe]", text: "text-[#6d28d9]", dot: "bg-[#7c3aed]" },
};

function RoleBadge({ role }: { role: UserRole }) {
  const { bg, text, dot } = ROLE_STYLES[role];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${bg} ${text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {role}
    </span>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <span className="text-[18px] font-bold text-m2f-dark tracking-tight select-none">
      made<span className="text-m2f-teal">2</span>flow
    </span>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Contracts",     active: true  },
  { label: "Facilities",    active: false },
  { label: "Facilities map",active: false },
  { label: "Reports",       active: false },
];

export function OverviewScreen({ onNavigate: _onNavigate }: { onNavigate?: (s: import("../types").Screen) => void }) {
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATE_RANGE);

  const activeCount    = PROJECTS.filter((p) => p.status === "Active").length;
  const completedCount = PROJECTS.filter((p) => p.status === "Completed").length;
  const preDGCount     = PROJECTS.filter((p) => p.status === "Pre-Data Gathering").length;
  const total          = PROJECTS.length;

  // Stats: 2 rows × 3 columns
  // Row 1 — Projects, Row 2 — Facilities
  const stats = [
    { label: "Total Projects",        value: total,          sub: "in this contract",    color: "text-m2f-dark"  },
    { label: "Active Projects",       value: activeCount,    sub: "in progress",         color: "text-m2f-teal"  },
    { label: "Completed Projects",    value: completedCount, sub: "finished",            color: "text-[#027a48]" },
    { label: "Total Facilities",      value: 8,              sub: "across all projects", color: "text-m2f-dark"  },
    { label: "Active Facilities",     value: 5,              sub: "currently active",    color: "text-m2f-teal"  },
    { label: "Completed Facilities",  value: 2,              sub: "data gathered",       color: "text-[#027a48]" },
  ];

  const progressSegments = [
    { label: "Active",             pct: (activeCount    / total) * 100, bg: "bg-[#34d399]" },
    { label: "Completed",          pct: (completedCount / total) * 100, bg: "bg-[#5b9aae]" },
    { label: "Pre-Data Gathering", pct: (preDGCount     / total) * 100, bg: "bg-[#3b82f6]" },
  ];

  const TABLE_HEADERS = [
    "Project", "Program · Cohort", "Brand(s)", "Expert",
    "Reporting period", "Status", "Issues", "Action Plan",
  ] as const;

  return (
    <div className="min-h-screen bg-m2f-bg font-sans">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between h-[60px] px-6 bg-white border-b border-m2f-border"
      >
        <div className="flex items-center gap-8">
          <Logo />
          <ul
            role="list"
            className="flex items-stretch h-[60px] gap-1 m-0 p-0 list-none"
          >
            {NAV_ITEMS.map(({ label, active }) => (
              <li key={label} className="flex items-stretch">
                <button
                  type="button"
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center px-3 text-[14px] font-semibold bg-transparent border-0 cursor-pointer transition-colors duration-150 border-b-[3px]
                    focus-visible:outline-none focus-visible:text-m2f-teal
                    ${active
                      ? "text-m2f-dark border-m2f-accent"
                      : "text-m2f-muted border-transparent hover:text-m2f-teal hover:bg-[#f0faf9]"
                    }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-m2f-faint">Hi, MSG Textiles</span>
          <RoleBadge role="Vendor" />
          <button
            type="button"
            className="bg-transparent border-0 p-0 cursor-pointer text-[13px] font-semibold text-m2f-teal transition-colors duration-150 hover:text-m2f-teal-hover focus-visible:outline-none focus-visible:text-m2f-teal-hover"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ── Page content ────────────────────────────────────────────────── */}
      <main className="max-w-[1296px] mx-auto px-[22px] py-8">

        {/* Page header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="m-0 text-[20px] font-bold text-m2f-dark leading-tight">Contracts</h1>
            <p className="m-0 mt-1 text-[13px] text-m2f-muted">
              CRP-2025-001 · APAC Textile Facilities Assessment
            </p>
          </div>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>

        {/* ── Contract Summary Card ──────────────────────────────────────── */}
        <section
          aria-label="Contract summary"
          className="bg-white border border-m2f-border-card rounded-lg p-6 mb-6 shadow-sm"
        >
          <h2 className="m-0 mb-4 text-[16px] font-semibold text-m2f-dark">
            Contract Overview
          </h2>

          {/* Stat cards — 2 rows × 3 columns */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map(({ label, value, sub, color }) => (
              <div
                key={label}
                className="border border-m2f-border-card rounded-lg p-[25px] flex flex-col gap-2"
              >
                <span className="text-[13px] text-m2f-faint font-normal">{label}</span>
                <span className={`text-[48px] font-semibold leading-none ${color}`}>{value}</span>
                <span className="text-[12px] text-m2f-muted">{sub}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div
            role="img"
            aria-label={`Progress: ${activeCount} Active, ${completedCount} Completed, ${preDGCount} Pre-Data Gathering`}
            className="flex h-8 rounded-[6px] overflow-hidden bg-[#d1d5db] mb-3"
          >
            {progressSegments.map(({ label, pct, bg }) => (
              <div
                key={label}
                className={`${bg} shrink-0`}
                style={{ width: `${pct}%` }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Active",             color: "#34d399" },
              { label: "Completed",          color: "#5b9aae" },
              { label: "Pre-Data Gathering", color: "#3b82f6" },
            ].map(({ label, color }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-m2f-muted">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* ── Projects Table ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-3">
              <h2 className="m-0 text-[16px] font-semibold text-m2f-dark">
                Projects in this Contract
              </h2>
              <span className="text-[13px] text-m2f-muted">
                {PROJECTS.length} of {PROJECTS.length}
              </span>
            </div>
            <button
              type="button"
              aria-label="Download projects table"
              className="flex items-center justify-center w-8 h-8 bg-transparent border-0 rounded-md cursor-pointer text-m2f-muted transition-colors duration-150 hover:bg-[#f0f9f8] focus-visible:outline-none focus-visible:bg-[#f0f9f8]"
            >
              <DownloadIcon />
            </button>
          </div>

          {/* Table card — horizontally scrollable if viewport is narrow */}
          <div className="border border-m2f-border-card rounded-lg shadow-sm overflow-x-auto">
            <table
              aria-label="Projects in this contract"
              className="border-collapse font-sans"
              style={{ minWidth: 900, width: "100%" }}
            >
              <thead>
                <tr className="bg-[#f9fafb] border-b border-m2f-border-card h-[41px]">
                  {TABLE_HEADERS.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-4 text-left text-[11px] font-medium text-m2f-muted whitespace-nowrap align-middle"
                    >
                      {col === "Action Plan" || col === "Reporting period" ? (
                        col
                      ) : (
                        <SortableHeader label={col} />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((project, i) => (
                  <tr
                    key={project.id}
                    className={`h-[65.5px] border-b border-m2f-row-border transition-colors duration-150 hover:bg-[#d0f0ec]
                      ${i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}`}
                  >
                    {/* Project */}
                    <td className="px-4 align-middle">
                      <button
                        type="button"
                        className="bg-transparent border-0 p-0 cursor-pointer text-[13px] font-semibold text-m2f-teal text-left whitespace-nowrap transition-colors duration-150 hover:text-m2f-teal-hover hover:underline focus-visible:outline-none focus-visible:text-m2f-teal-hover focus-visible:underline"
                      >
                        {project.name}
                      </button>
                    </td>

                    {/* Program · Cohort */}
                    <td className="px-4 align-middle" style={{ minWidth: 230 }}>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-medium text-m2f-dark whitespace-nowrap">
                          {project.programDisplayName ?? project.program}
                        </span>
                        <span className="text-[11px] text-m2f-faint whitespace-nowrap">{project.cohort}</span>
                      </div>
                    </td>

                    {/* Brand(s) */}
                    <td className="px-4 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {project.brands.map((b) => (
                          <BrandPill key={b} name={b} />
                        ))}
                      </div>
                    </td>

                    {/* Expert */}
                    <td className="px-4 align-middle">
                      <span className="text-[12px] text-m2f-muted whitespace-nowrap">
                        {project.expert}
                      </span>
                    </td>

                    {/* Reporting period */}
                    <td className="px-4 align-middle">
                      <span className="text-[12px] text-m2f-muted whitespace-nowrap">
                        {formatRangeCell(dateRange)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 align-middle">
                      <StatusBadge status={project.status} />
                    </td>

                    {/* Issues */}
                    <td className="px-4 align-middle">
                      <IssuesBadge blockedCount={project.blockedCount} />
                    </td>

                    {/* Action Plan */}
                    <td className="px-4 align-middle">
                      <ActionPlanBadge value={project.actionPlan} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

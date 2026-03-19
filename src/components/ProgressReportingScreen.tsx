import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { NavBar } from "./NavBar";
import type { Screen } from "../types";
import {
  Wind,
  TrendingDown,
  Coins,
  CheckCircle2,
  DollarSign,
  Building2,
  Heart,
  ChevronsRight,
  Droplets,
  type LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeWindow = "Monthly" | "Quarterly" | "Yearly";

// ─── Chart data ───────────────────────────────────────────────────────────────

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const energyIntensityData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 38 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 36 },
  { month: "May", value: 30 },
  { month: "Jun", value: 28 },
  { month: "Jul", value: 32 },
  { month: "Aug", value: 35 },
  { month: "Sep", value: 29 },
  { month: "Oct", value: 27 },
  { month: "Nov", value: 30 },
  { month: "Dec", value: 28 },
];

const carbonIntensityMJData = [
  { month: "Jan", value: 0.085 },
  { month: "Feb", value: 0.078 },
  { month: "Mar", value: 0.09 },
  { month: "Apr", value: 0.072 },
  { month: "May", value: 0.068 },
  { month: "Jun", value: 0.062 },
  { month: "Jul", value: 0.065 },
  { month: "Aug", value: 0.071 },
  { month: "Sep", value: 0.063 },
  { month: "Oct", value: 0.060 },
  { month: "Nov", value: 0.064 },
  { month: "Dec", value: 0.068 },
];

const carbonIntensityKgData = [
  { month: "Jan", value: 0.09 },
  { month: "Feb", value: 0.082 },
  { month: "Mar", value: 0.094 },
  { month: "Apr", value: 0.075 },
  { month: "May", value: 0.070 },
  { month: "Jun", value: 0.065 },
  { month: "Jul", value: 0.068 },
  { month: "Aug", value: 0.073 },
  { month: "Sep", value: 0.066 },
  { month: "Oct", value: 0.063 },
  { month: "Nov", value: 0.067 },
  { month: "Dec", value: 0.068 },
];

// ─── Performance metrics ──────────────────────────────────────────────────────

type PerfMetric = {
  title: string;
  value: string;
  unit: string;
  iconBg: string;
  iconColor: string;
  Icon: LucideIcon;
  sub: string | null;
};

const PERF_METRICS: PerfMetric[] = [
  {
    title: "Total impact",
    value: "7,000",
    unit: "tCO₂e",
    iconBg: "#c2eaff",
    iconColor: "#004266",
    Icon: Wind,
    sub: "For selected Reporting year",
  },
  {
    title: "Brand-normalized impact",
    value: "6,850",
    unit: "tCO₂e",
    iconBg: "#f2eefc",
    iconColor: "#7c3aed",
    Icon: TrendingDown,
    sub: null,
  },
  {
    title: "Potential savings",
    value: "1,400",
    unit: "tCO₂e",
    iconBg: "#dafbe8",
    iconColor: "#027a48",
    Icon: Coins,
    sub: null,
  },
  {
    title: "Implemented savings",
    value: "400",
    unit: "tCO₂e",
    iconBg: "#cbf6f6",
    iconColor: "#308882",
    Icon: CheckCircle2,
    sub: "29% of potential",
  },
  {
    title: "Potential cost savings",
    value: "$49,600",
    unit: "",
    iconBg: "#fbecda",
    iconColor: "#b45309",
    Icon: DollarSign,
    sub: null,
  },
  {
    title: "Facilities with action plans",
    value: "12/40",
    unit: "",
    iconBg: "#f7d9b6",
    iconColor: "#c2410c",
    Icon: Building2,
    sub: "30% coverage",
  },
  {
    title: "Action acceptance rate",
    value: "120/158",
    unit: "",
    iconBg: "#ffe0d6",
    iconColor: "#e11d48",
    Icon: Heart,
    sub: "86%",
  },
  {
    title: "Action implementation rate",
    value: "40/120",
    unit: "",
    iconBg: "#c3eae7",
    iconColor: "#308882",
    Icon: ChevronsRight,
    sub: "30%",
  },
];

// ─── Baseline comparison table data ───────────────────────────────────────────

const BASELINE_ROWS = [
  {
    name: "Baseline (2022)",
    facilities: 40,
    totalGhg: "9,800",
    brandCarbon: "8,500",
    renewables: "12%",
    ghgIntensity: "0.085",
    energyIntensity: "3.42",
    waterIntensity: "4.2",
    actionCount: "—",
    savingsOnAction: "—",
  },
  {
    name: "Current (2024)",
    facilities: 40,
    totalGhg: "7,000",
    brandCarbon: "6,850",
    renewables: "28%",
    ghgIntensity: "0.068",
    energyIntensity: "2.86",
    waterIntensity: "3.1",
    actionCount: "158",
    savingsOnAction: "1,400",
  },
];

// ─── Facilities table data ────────────────────────────────────────────────────

const FACILITY_ROWS = [
  {
    name: "Nilat nihuan dyeing (laundry division)",
    country: "China",
    consumption: "1,620,000",
    actionsP: "18",
    actionsA: "12",
    tco2eP: "420",
    tco2eA: "280",
    savingsP: "4.2%",
    savingsA: "2.8%",
    status: "In progress",
    lastUpdate: "2024-11-15",
  },
  {
    name: "Advance Tex",
    country: "Bangladesh",
    consumption: "448,000",
    actionsP: "12",
    actionsA: "8",
    tco2eP: "180",
    tco2eA: "95",
    savingsP: "3.8%",
    savingsA: "2.1%",
    status: "In progress",
    lastUpdate: "2024-11-12",
  },
  {
    name: "C&P Alia",
    country: "Vietnam",
    consumption: "10,500",
    actionsP: "6",
    actionsA: "6",
    tco2eP: "52",
    tco2eA: "52",
    savingsP: "5.0%",
    savingsA: "5.0%",
    status: "Completed",
    lastUpdate: "2024-10-30",
  },
  {
    name: "Zhejiang Dayu Printing & Dyeing",
    country: "China",
    consumption: "5,520,000",
    actionsP: "24",
    actionsA: "4",
    tco2eP: "760",
    tco2eA: "80",
    savingsP: "6.1%",
    savingsA: "0.9%",
    status: "Not started",
    lastUpdate: "2024-09-18",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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

function GreenBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#c8f9dc] text-[#027a48] text-[12px] font-medium leading-[18px] rounded-[16px] pl-[6px] pr-[8px] py-[2px] whitespace-nowrap">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="#027a48">
        <path d="M4 0l1 3h3l-2.4 1.8.9 3L4 6.2 1.5 7.8l.9-3L0 3h3z" />
      </svg>
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "In progress": "bg-[#c2eaff] text-[#004266]",
    "Completed": "bg-[#c8f9dc] text-[#027a48]",
    "Not started": "bg-[#f3f5f6] text-[#5e7882]",
  };
  return (
    <span
      className={`inline-flex items-center px-[8px] py-[2px] rounded-[16px] text-[12px] font-medium leading-[18px] whitespace-nowrap ${styles[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

function TimeToggle({
  value,
  onChange,
}: {
  value: TimeWindow;
  onChange: (v: TimeWindow) => void;
}) {
  const options: TimeWindow[] = ["Monthly", "Quarterly", "Yearly"];
  return (
    <div className="flex items-center bg-[#d0d9dd] rounded-[6px] p-[2px] gap-[2px]">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-[8px] py-[4px] text-[11px] font-medium leading-[16px] rounded-[4px] transition-colors ${
            value === o
              ? "bg-white text-[#3c4c53] shadow-sm"
              : "text-[#718d98] hover:text-[#3c4c53]"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
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

function IntensityChart({
  title,
  value,
  unit,
  badge,
  data,
  dataKey,
  yTicks,
  yFormatter,
}: {
  title: string;
  value: string;
  unit: string;
  badge: string;
  data: { month: string; value: number }[];
  dataKey: string;
  yTicks: number[];
  yFormatter: (v: number) => string;
}) {
  return (
    <div
      className="flex flex-col rounded-[8px] border border-[#a0b3ba] overflow-hidden"
      style={{ boxShadow: "0px 4.086px 8.172px 0px rgba(16,24,40,0.10)" }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between px-[15px] pt-[15px] pb-[8px]">
        <div>
          <p className="text-[12px] font-semibold leading-[15px] text-[#3c4c53] mb-[5px]">{title}</p>
          <div className="flex items-baseline gap-[5px]">
            <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">{value}</span>
            <span className="text-[18px] font-medium leading-[28px] text-[#3c4c53]">{unit}</span>
          </div>
        </div>
        <GreenBadge>{badge}</GreenBadge>
      </div>
      {/* Chart */}
      <div className="px-[15px] pb-[15px]" style={{ height: 130 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#308882" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#308882" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8ecee" vertical={false} />
            <XAxis
              dataKey="month"
              ticks={MONTHS}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis
              ticks={yTicks}
              tickFormatter={yFormatter}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#308882"
              strokeWidth={2}
              fill={`url(#grad-${dataKey})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricCard({ metric }: { metric: PerfMetric }) {
  const { Icon } = metric;
  return (
    <div
      className="bg-white border border-[#718d98] rounded-[8px] px-[15px] py-[14px] flex flex-col gap-[8px]"
      style={{ boxShadow: "0px 4.086px 8.172px 0px rgba(16,24,40,0.10), 0px 2.043px 4.086px 0px rgba(16,24,40,0.06)" }}
    >
      <div
        className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: metric.iconBg }}
      >
        <Icon size={16} color={metric.iconColor} />
      </div>
      <div>
        <p className="text-[12px] font-semibold leading-[18px] text-[#004266] mb-[4px]">{metric.title}</p>
        <div className="flex items-baseline gap-[4px]">
          <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">{metric.value}</span>
          {metric.unit && (
            <span className="text-[14px] font-medium leading-[20px] text-[#3c4c53]">{metric.unit}</span>
          )}
        </div>
        {metric.sub && (
          <p className="text-[12px] font-semibold leading-[18px] text-[#718d98] mt-[2px]">{metric.sub}</p>
        )}
      </div>
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function ProgressReportingScreen({
  activeScreen,
  onNavigate,
}: {
  activeScreen: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const [timeWindow, setTimeWindow] = React.useState<TimeWindow>("Monthly");
  const [ghgView, setGhgView] = React.useState<"GHG" | "Water">("GHG");

  return (
    <div className="min-h-screen bg-[#e8ecee] font-sans">
      <NavBar activeScreen={activeScreen} onNavigate={onNavigate} />

      {/* Main content */}
      <main className="mx-auto px-[70px] py-[40px]" style={{ maxWidth: 1440 }}>
        {/* Page title + filters */}
        <div className="mb-[36px]">
          <h1 className="text-[26px] font-semibold leading-[32px] text-[#3c4c53] mb-[20px]">
            CRP – Progress Reporting
          </h1>
          {/* Filter row */}
          <div className="flex items-center justify-between mb-[16px]">
            <div /> {/* spacer */}
            <button className="flex items-center gap-[6px] px-[16px] py-[9px] rounded-[8px] border border-[#d0d9dd] bg-white text-[14px] font-medium text-[#3c4c53] hover:bg-[#f3f5f6] transition-colors">
              Clear all
            </button>
          </div>
          <div className="flex items-center gap-[20px] flex-wrap">
            {["Brands", "Programs", "Cohorts", "Facilities", "Countries", "Reporting period"].map((f) => (
              <div
                key={f}
                className="flex items-center gap-[8px] border border-[#d0d9dd] bg-white rounded-[8px] px-[12px] py-[10px] text-[14px] leading-[20px] text-[#3c4c53] cursor-pointer hover:border-[#308882] transition-colors"
                style={{ minWidth: 200 }}
              >
                <span className="flex-1 text-[#718d98]">{f}</span>
                <ChevronDownIcon className="w-[16px] h-[16px] text-[#718d98]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 1: Energy & carbon intensities ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <SectionHeader title="Energy &amp; carbon intensities">
            <span className="text-[14px] font-medium text-[#718d98]">Time window</span>
            <TimeToggle value={timeWindow} onChange={setTimeWindow} />
          </SectionHeader>
          <div className="grid grid-cols-3 gap-[20px] mt-[24px]">
            <IntensityChart
              title="Energy intensity"
              value="2.86"
              unit="MJ/kg"
              badge="+18.2%"
              data={energyIntensityData}
              dataKey="energy"
              yTicks={[0, 15, 30, 60]}
              yFormatter={(v) => String(v)}
            />
            <IntensityChart
              title="Carbon intensity"
              value="0.068"
              unit="tCO₂e/MJ"
              badge="+10.8%"
              data={carbonIntensityMJData}
              dataKey="carbonMJ"
              yTicks={[0, 0.03, 0.06, 0.09]}
              yFormatter={(v) => v.toFixed(2)}
            />
            <IntensityChart
              title="Carbon intensity p.kg"
              value="0.068"
              unit="tCO₂e/kg"
              badge="+4.4%"
              data={carbonIntensityKgData}
              dataKey="carbonKg"
              yTicks={[0, 0.03, 0.06, 0.09]}
              yFormatter={(v) => v.toFixed(2)}
            />
          </div>
        </div>

        {/* ── Section 2: Performance overview ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <SectionHeader title="Energy source breakdown">
            <div className="flex items-center bg-[#d0d9dd] rounded-[6px] p-[2px] gap-[2px]">
              {(["GHG", "Water"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setGhgView(v)}
                  className={`px-[12px] py-[4px] text-[12px] font-medium leading-[18px] rounded-[4px] transition-colors ${
                    ghgView === v
                      ? "bg-white text-[#3c4c53] shadow-sm"
                      : "text-[#718d98] hover:text-[#3c4c53]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </SectionHeader>

          {/* 2×4 metric cards */}
          <div className="grid grid-cols-4 gap-[16px] mt-[24px]">
            {PERF_METRICS.map((m, i) => {
              if (i === 0 && ghgView === "Water") {
                return (
                  <MetricCard
                    key="total-impact-water"
                    metric={{
                      title: "Total impact (m³ water)",
                      value: "7,000",
                      unit: "(m³ water)",
                      iconBg: "#e0f2fe",
                      iconColor: "#0284c7",
                      Icon: Droplets,
                      sub: "For selected Reporting year",
                    }}
                  />
                );
              }
              return <MetricCard key={m.title} metric={m} />;
            })}
          </div>

          {/* Baseline comparison table */}
          <div className="mt-[24px] rounded-[10px] border border-[#d0d9dd] overflow-x-auto shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
            <table className="w-full text-left border-collapse" style={{ tableLayout: "auto" }}>
              <thead>
                <tr className="bg-[#fffcf5] border-b border-[#d0d9dd]">
                  {[
                    { label: "Name", w: 160 },
                    { label: "Facilities", w: 110 },
                    { label: "Total GHG", w: null },
                    { label: "Brand carbon intensity", w: null },
                    { label: "Renewables", w: null },
                    { label: "GHG intensity", w: null },
                    { label: "Energy intensity", w: null },
                    { label: "Water intensity", w: null },
                    { label: "Action count", w: null },
                    { label: "Savings on action", w: null },
                  ].map((h) => (
                    <th
                      key={h.label}
                      className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap"
                      style={h.w ? { minWidth: h.w } : {}}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BASELINE_ROWS.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-[#f3f5f6]"}>
                    <td className="px-[12px] py-[12px] text-[12px] font-medium leading-[18px] text-[#3c4c53] whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.facilities}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.totalGhg}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.brandCarbon}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.renewables}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.ghgIntensity}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.energyIntensity}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.waterIntensity}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.actionCount}</td>
                    <td className="px-[12px] py-[12px] text-[12px] leading-[18px] text-[#3c4c53]">{row.savingsOnAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Section 3: ROCR & Social Impact ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <SectionHeader title="Return on Carbon Reduction &amp; Social Impact" />
          <div className="flex gap-[20px] mt-[24px]">
            {/* ROCR cards */}
            <div className="flex">
              {/* ROCR Brand */}
              <div
                className="bg-white border border-[#718d98] rounded-l-[8px] px-[15px] py-[14px] flex flex-col gap-[10px] w-[310px]"
                style={{ boxShadow: "0px 4.086px 8.172px 0px rgba(16,24,40,0.10), 0px 2.043px 4.086px 0px rgba(16,24,40,0.06)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold leading-[18px] text-[#004266]">ROCR (Brand)</span>
                  <GreenBadge>63% below EUA</GreenBadge>
                </div>
                <div className="flex items-baseline gap-[5px]">
                  <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">$31.5</span>
                  <span className="text-[18px] font-medium leading-[28px] text-[#3c4c53]">(tCO₂e/MJ)</span>
                </div>
                <p className="text-[12px] font-semibold leading-[18px] text-[#718d98]">EUA benchmark: $85.3 (per tCO₂e)</p>
                <p className="text-[12px] font-semibold leading-[18px] text-[#009856]">Saving $53.8</p>
              </div>
              {/* ROCR Suppliers */}
              <div
                className="bg-white border border-[#718d98] rounded-r-[8px] px-[15px] py-[14px] flex flex-col gap-[10px] w-[310px] border-l-0"
                style={{ boxShadow: "0px 4.086px 8.172px 0px rgba(16,24,40,0.10), 0px 2.043px 4.086px 0px rgba(16,24,40,0.06)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold leading-[18px] text-[#004266]">ROCR (Suppliers)</span>
                  <GreenBadge>92% below EUA</GreenBadge>
                </div>
                <div className="flex items-baseline gap-[5px]">
                  <span className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">$6.5</span>
                  <span className="text-[18px] font-medium leading-[28px] text-[#3c4c53]">(tper tCO₂e)</span>
                </div>
                <p className="text-[12px] font-semibold leading-[18px] text-[#718d98]">EUA benchmark: $85.3 (per tCO₂e)</p>
                <p className="text-[12px] font-semibold leading-[18px] text-[#009856]">Saving $78.8</p>
              </div>
            </div>

            {/* Social card */}
            <div
              className="bg-white border border-[#68cac3] rounded-[8px] px-[15px] py-[14px] flex gap-[20px] flex-1"
              style={{ boxShadow: "0px 4.086px 8.172px 0px rgba(16,24,40,0.10), 0px 2.043px 4.086px 0px rgba(16,24,40,0.06)" }}
            >
              {/* Left: headline + big number */}
              <div className="flex flex-col gap-[10px] flex-1">
                <div className="flex items-center gap-[10px]">
                  <div className="bg-[#e1f4f3] rounded-[16px] p-[5px] flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#308882" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-semibold leading-[18px] text-[#004266]">
                    Employees impacted by reduction
                  </span>
                </div>
                <div>
                  <p className="text-[30px] font-normal leading-[38px] text-[#3c4c53]">847</p>
                  <p className="text-[12px] font-semibold leading-[18px] text-[#718d98] max-w-[200px]">
                    Employees are breathing cleaner air in this facility
                  </p>
                </div>
              </div>

              {/* Right: gender breakdown bar chart */}
              <div className="flex flex-col justify-center gap-[10px] min-w-[220px]">
                {[
                  { label: "Female", value: 318, pct: "37.5%", color: "#308882", width: "37.5%" },
                  { label: "Diverse", value: 17, pct: "2%", color: "#a187e8", width: "2%" },
                  { label: "Male", value: 512, pct: "60.4%", color: "#3c4c53", width: "60.4%" },
                ].map((g) => (
                  <div key={g.label} className="flex items-center gap-[8px]">
                    <span className="text-[13px] text-[#5e7882] w-[48px] text-right shrink-0">{g.label}</span>
                    <div className="flex-1 h-[20px] bg-[#e8ecee] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: g.width, backgroundColor: g.color }}
                      />
                    </div>
                    <span className="text-[12px] text-[#5e7882] whitespace-nowrap">
                      {g.value} ({g.pct})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 4: Action status summary ── */}
        <div className="bg-white rounded-[8px] p-[20px] mb-[16px]">
          <SectionHeader title="Action status summary" />
          <div className="mt-[24px]">
            {/* Stacked bar */}
            <div className="flex rounded-[10px] overflow-hidden h-[48px]">
              <div className="bg-[#d0d9dd] flex items-center justify-center" style={{ width: "40%" }}>
                <span className="text-[12px] font-semibold text-[#5e7882] whitespace-nowrap">
                  Not started – 40%
                </span>
              </div>
              <div className="bg-[#a187e8] flex items-center justify-center" style={{ width: "36%" }}>
                <span className="text-[12px] font-semibold text-white whitespace-nowrap">
                  In progress – 36%
                </span>
              </div>
              <div className="bg-[#32d583] flex items-center justify-center" style={{ width: "20%" }}>
                <span className="text-[12px] font-semibold text-white whitespace-nowrap">
                  Completed – 20%
                </span>
              </div>
              <div className="bg-[#f97066] flex items-center justify-center" style={{ width: "4%" }}>
                <span className="text-[12px] font-semibold text-white whitespace-nowrap">4%</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-[20px] mt-[12px]">
              {[
                { color: "#d0d9dd", label: "Not started" },
                { color: "#a187e8", label: "In progress" },
                { color: "#32d583", label: "Completed" },
                { color: "#f97066", label: "Rejected" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-[8px]">
                  <div className="w-[12px] h-[12px] rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                  <span className="text-[12px] text-[#718d98]">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities table */}
          <div className="mt-[24px] rounded-[10px] border border-[#d0d9dd] overflow-x-auto shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10),0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
            <table className="w-full text-left border-collapse" style={{ tableLayout: "auto", minWidth: 1100 }}>
              <thead>
                <tr className="bg-[#fffcf5] border-b border-[#d0d9dd]">
                  <th className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap" style={{ minWidth: 240 }}>
                    <span className="flex items-center gap-[6px]">Facility name <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Country <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Consumption <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Potential / Actual<br /># Actions <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Potential / Actual<br /># tCO₂e <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Potential / Actual<br />% Savings <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-bold leading-[14px] text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Status <FilterIcon /></span>
                  </th>
                  <th className="px-[12px] py-[12px] text-[10px] font-medium leading-[14px] text-[#5e7882] whitespace-nowrap">
                    <span className="flex items-center gap-[6px]">Last update <FilterIcon /></span>
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
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.consumption}</td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">
                      {row.actionsP} / {row.actionsA}
                    </td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">
                      {row.tco2eP} / {row.tco2eA}
                    </td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">
                      {row.savingsP} / {row.savingsA}
                    </td>
                    <td className="px-[12px] py-[10px]">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-[12px] py-[10px] text-[12px] leading-[18px] text-[#3c4c53]">{row.lastUpdate}</td>
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

// React import (needed for useState)
import React from "react";

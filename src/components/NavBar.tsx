import React from "react";
import type { Screen } from "../types";

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function NavBar({
  activeScreen,
  onNavigate,
}: {
  activeScreen: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const [reportsOpen, setReportsOpen] = React.useState(false);
  const reportsRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setReportsOpen(true);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setReportsOpen(false), 150);
  }

  return (
    <nav className="bg-white border-b border-[#d0d9dd] h-[60px] flex items-center px-6 justify-between sticky top-0 z-20">
      <div className="flex items-center gap-0">
        <div className="flex items-center justify-center w-[120px] h-[24px] mr-[46px]">
          <span className="text-[14px] font-bold text-[#308882] tracking-wide">MADE2FLOW</span>
        </div>
        <div className="flex items-center">
          <span className="text-[14px] leading-[20px] text-[#718d98] px-[15px] h-[60px] flex items-center select-none">
            Dashboard
          </span>
          <div className="relative h-[60px] flex items-center px-[15px]">
            <button
              onClick={() => onNavigate("overview")}
              className={`text-[14px] leading-[20px] px-0 h-[60px] flex items-center transition-colors ${(activeScreen === "overview" || activeScreen === "project-detail") ? "font-semibold text-[#3c4c53]" : "text-[#718d98] hover:text-[#3c4c53]"}`}
            >
              Progress Dashboard
            </button>
            {(activeScreen === "overview" || activeScreen === "project-detail") && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff9270] rounded-t-[2px]" />
            )}
          </div>
          {["Supplier Network", "Raw Data", "Action plan builder", "Emission Factors", "Benchmark"].map((item) => (
            <span key={item} className="text-[14px] leading-[20px] text-[#718d98] px-[15px] h-[60px] flex items-center select-none">
              {item}
            </span>
          ))}

          {/* Reports dropdown trigger */}
          <div
            ref={reportsRef}
            className="relative h-[60px] flex items-center px-[15px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`text-[14px] leading-[20px] flex items-center gap-[4px] focus:outline-none transition-colors ${(activeScreen === "crp" || activeScreen === "scope12") ? "font-semibold text-[#3c4c53]" : "font-normal text-[#718d98] hover:text-[#3c4c53]"}`}
            >
              New: Reports
              <ChevronDownIcon className={`w-[18px] h-[18px] transition-transform ${reportsOpen ? "rotate-180" : ""}`} />
            </button>
            {/* Active underline — only shown when a reports screen is active */}
            {(activeScreen === "crp" || activeScreen === "scope12") && (
              <div className="absolute bottom-0 left-[15px] right-[15px] h-[3px] bg-[#ff9270] rounded-t-[2px]" />
            )}

            {/* Dropdown */}
            {reportsOpen && (
              <div className="absolute top-[60px] left-0 w-[220px] bg-white rounded-[8px] border border-[#d0d9dd] shadow-[0px_8px_24px_0px_rgba(16,24,40,0.12)] z-20 overflow-hidden">
                <button
                  onClick={() => { onNavigate("crp"); setReportsOpen(false); }}
                  className="w-full flex items-center justify-between px-[14px] py-[10px] text-[14px] leading-[20px] text-[#3c4c53] hover:bg-[#f3f5f6] transition-colors"
                >
                  <span>CRP Progress Reporting</span>
                  {activeScreen === "crp" && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="#308882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <div className="border-t border-[#f0f2f4]" />
                <button
                  onClick={() => { onNavigate("scope12"); setReportsOpen(false); }}
                  className="w-full flex items-center justify-between px-[14px] py-[10px] text-[14px] leading-[20px] text-[#718d98] hover:bg-[#f3f5f6] hover:text-[#3c4c53] transition-colors"
                >
                  <span>Scope 1 &amp; 2 Reporting</span>
                  {activeScreen === "scope12" && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="#308882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[14px] leading-[20px]">
        <span className="text-[#3c4c53] font-medium">Hi, MSG Textiles</span>
        <a href="#" className="text-[#718d98] hover:text-[#3c4c53] transition-colors">Logout</a>
      </div>
    </nav>
  );
}

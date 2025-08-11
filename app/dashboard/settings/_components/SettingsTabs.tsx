"use client";
import React, { useRef, useEffect, useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { SettingsSection } from "@/types";

interface SettingsTabsProps {
  sections: SettingsSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({
  sections,
  activeSection,
  onSectionChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
      setIsBigScreen(window.innerWidth < 1740);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Auto-scroll to active tab when it changes
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = activeTabRef.current;

      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      const scrollLeft =
        activeTab.offsetLeft - containerRect.width / 2 + tabRect.width / 2;

      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
          <SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-600 flex-shrink-0" />
          <span className="flex-shrink-0">Settings</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div
        className="relative px-2 sm:px-4 w-full"
        style={{
          maxWidth: isMobile
            ? "90vw"
            : isTablet
            ? "60vw"
            : isBigScreen
            ? "75vw"
            : "100vw",
        }}>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center px-2 sm:px-3 md:px-4 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-medium border-b-2 whitespace-nowrap transition-all duration-200 flex-shrink-0 min-w-0 ${
                  isActive
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}>
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="flex-shrink-0 truncate">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsTabs;

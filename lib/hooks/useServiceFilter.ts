import { useMemo } from "react";
import { Service } from "@/types";

export function useServiceFilter(services: Service[], activeCategory: string) {
  return useMemo(() => {
    if (activeCategory === "All") return services;
    return services.filter((service) => service.category === activeCategory);
  }, [services, activeCategory]);
}

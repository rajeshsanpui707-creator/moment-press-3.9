import React, { createContext, useContext, useEffect } from "react";
import { BrandConfig, brandConfig } from "../config/brand";

interface BrandContextType {
  config: BrandConfig;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Clear legacy localStorage cache keys if present
    try {
      localStorage.removeItem("momentpress_brand_config_v2");
      localStorage.removeItem("momentpress_brand_config");
    } catch {
      // ignore
    }
  }, []);

  return (
    <BrandContext.Provider value={{ config: brandConfig }}>
      {children}
    </BrandContext.Provider>
  );
};

export function useBrand(): BrandContextType {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return ctx;
}

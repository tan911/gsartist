'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Coordinates } from '@/types';

interface LocationMapContextType {
  coordinates: [number, number] | null;
  isFullMapOpen: boolean;
  isGeocoding: boolean;
  travelRadius?: number;
  setCoordinates: (coords: [number, number] | null) => void;
  setIsFullMapOpen: (isOpen: boolean) => void;
  setIsGeocoding: (isGeocoding: boolean) => void;
  setTravelRadius: (radius?: number) => void;
}

const LocationMapContext = createContext<LocationMapContextType | undefined>(undefined);

export const useLocationMap = () => {
  const context = useContext(LocationMapContext);
  if (context === undefined) {
    throw new Error('useLocationMap must be used within a LocationMapProvider');
  }
  return context;
};

interface LocationMapProviderProps {
  children: ReactNode;
  initialCoordinates?: [number, number] | null;
  initialTravelRadius?: number;
}

export const LocationMapProvider: React.FC<LocationMapProviderProps> = ({
  children,
  initialCoordinates = null,
  initialTravelRadius,
}) => {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(initialCoordinates);
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [travelRadius, setTravelRadius] = useState<number | undefined>(initialTravelRadius);

  const value = {
    coordinates,
    isFullMapOpen,
    isGeocoding,
    travelRadius,
    setCoordinates,
    setIsFullMapOpen,
    setIsGeocoding,
    setTravelRadius,
  };

  return (
    <LocationMapContext.Provider value={value}>
      {children}
    </LocationMapContext.Provider>
  );
};
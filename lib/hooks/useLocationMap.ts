'use client';

import { useState, useCallback } from 'react';
import { Coordinates } from '@/types';

interface UseLocationMapProps {
  initialCoordinates?: Coordinates | null;
  initialZoom?: number;
  initialTravelRadius?: number;
}

export function useLocationMap({
  initialCoordinates = null,
  initialZoom = 13,
  initialTravelRadius,
}: UseLocationMapProps = {}) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(initialCoordinates);
  const [zoom, setZoom] = useState(initialZoom);
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const [travelRadius, setTravelRadius] = useState<number | undefined>(initialTravelRadius);

  const handleMapClick = useCallback((event: { latlng: Coordinates }) => {
    setCoordinates(event.latlng);
  }, []);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const toggleFullMap = useCallback(() => {
    setIsFullMapOpen((prev) => !prev);
  }, []);

  return {
    coordinates,
    zoom,
    isFullMapOpen,
    travelRadius,
    setCoordinates,
    setZoom,
    handleMapClick,
    handleZoomChange,
    toggleFullMap,
    setIsFullMapOpen,
    setTravelRadius,
  };
}
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { apiService, UserData } from "@/services/api-service";

interface UseUserDataOptions {
  userId: string;
  autoFetch?: boolean;
  refreshInterval?: number; // in milliseconds
  enableCache?: boolean;
}

export interface UseUserDataReturn {
  // Data
  userData: UserData | null;

  // State
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isRefreshing: boolean;

  // Actions
  fetchData: (forceRefresh?: boolean) => Promise<void>;
  refreshData: () => Promise<void>;
  clearError: () => void;

  // Individual data accessors
  profile: UserData["profile"];
  bookings: UserData["bookings"];
  services: UserData["services"];
  reviews: UserData["reviews"];
  clients: UserData["clients"];
  conversations: UserData["conversations"];
  portfolio: UserData["portfolio"];
  notifications: UserData["notifications"];
  bookingSettings: UserData["bookingSettings"];
  locationSettings: UserData["locationSettings"];
  verification: UserData["verification"];
  stats: UserData["stats"];
}

export const useUserData = ({
  userId,
  autoFetch = true,
  refreshInterval,
  enableCache = true,
}: UseUserDataOptions): UseUserDataReturn => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      if (!userId) return;

      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      try {
        setIsLoading(true);
        setIsError(false);
        setError(null);

        // If userId is demo-user, use mock data
        if (userId === "demo-user") {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          const mockData: UserData = {
            profile: {
              firstName: "Demo",
              lastName: "User",
              email: "demo@example.com",
              phone: "+1 234 567 8900",
              bio: "This is a demo account. Sign up to see your real data!",
              location: "Demo City, DC",
              website: "https://example.com",
              instagram: "@demoartist",
              facebook: "demoartist",
            },
            bookings: [],
            services: [],
            reviews: [],
            clients: [],
            conversations: [],
            portfolio: [],
            notifications: {
              newBookings: true,
              bookingChanges: true,
              cancellations: true,
              reviews: true,
              emailNotifications: true,
              smsNotifications: false,
              marketingEmails: false,
            },
            bookingSettings: {
              confirmationMode: "manual",
              bufferTime: 15,
              leadTime: 2,
              maxAdvanceBooking: 30,
              customInstructions: "",
              requireDeposit: false,
              depositAmount: 20,
              cancellationPolicy: "",
            },
            locationSettings: {
              baseLocation: null,
              travelRadius: 25,
              manualAcceptanceOutsideRadius: true,
              preferredServiceAreas: [],
            },
            verification: {
              email: { verified: false, pending: false },
              phone: { verified: false, pending: false },
              identity: { verified: false, pending: false },
            },
            stats: {
              totalBookings: 0,
              totalRevenue: 0,
              averageRating: 0,
              activeClients: 0,
            },
          };

          setUserData(mockData);
        } else {
          const data = await apiService.fetchAllUserData(userId, forceRefresh);
          setUserData(data);
        }
      } catch (err: any) {
        // Don't set error if request was aborted
        if (err.name === "AbortError") return;

        setIsError(true);
        setError(err.message || "Failed to fetch user data");
        console.error("Error in useUserData:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchData(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchData]);

  const clearError = useCallback(() => {
    setIsError(false);
    setError(null);
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && userId) {
      fetchData();
    }
  }, [userId, autoFetch, fetchData]);

  // Set up refresh interval
  useEffect(() => {
    if (refreshInterval && userId) {
      refreshIntervalRef.current = setInterval(() => {
        refreshData();
      }, refreshInterval);
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [refreshInterval, userId, refreshData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return {
    // Data
    userData,

    // State
    isLoading,
    isError,
    error,
    isRefreshing,

    // Actions
    fetchData,
    refreshData,
    clearError,

    // Individual data accessors
    profile: userData?.profile || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      location: "",
      website: "",
      instagram: "",
      facebook: "",
    },
    bookings: userData?.bookings || [],
    services: userData?.services || [],
    reviews: userData?.reviews || [],
    clients: userData?.clients || [],
    conversations: userData?.conversations || [],
    portfolio: userData?.portfolio || [],
    notifications: userData?.notifications || {
      newBookings: true,
      bookingChanges: true,
      cancellations: true,
      reviews: true,
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
    },
    bookingSettings: userData?.bookingSettings || {
      confirmationMode: "manual",
      bufferTime: 15,
      leadTime: 2,
      maxAdvanceBooking: 30,
      customInstructions: "",
      requireDeposit: false,
      depositAmount: 20,
      cancellationPolicy: "",
    },
    locationSettings: userData?.locationSettings || {
      baseLocation: null,
      travelRadius: 25,
      manualAcceptanceOutsideRadius: true,
      preferredServiceAreas: [],
    },
    verification: userData?.verification || {
      email: { verified: false, pending: false },
      phone: { verified: false, pending: false },
      identity: { verified: false, pending: false },
    },
    stats: userData?.stats || {
      totalBookings: 0,
      totalRevenue: 0,
      averageRating: 0,
      activeClients: 0,
    },
  };
};

// Specialized hooks for specific data types
export const useUserProfile = (userId: string) => {
  const { profile, isLoading, isError, error, refreshData } = useUserData({
    userId,
  });
  return { profile, isLoading, isError, error, refreshData };
};

export const useUserBookings = (userId: string) => {
  const { bookings, isLoading, isError, error, refreshData } = useUserData({
    userId,
  });
  return { bookings, isLoading, isError, error, refreshData };
};

export const useUserServices = (userId: string) => {
  const { services, isLoading, isError, error, refreshData } = useUserData({
    userId,
  });
  return { services, isLoading, isError, error, refreshData };
};

export const useUserStats = (userId: string) => {
  const { stats, isLoading, isError, error, refreshData } = useUserData({
    userId,
  });
  return { stats, isLoading, isError, error, refreshData };
};

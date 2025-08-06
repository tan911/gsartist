"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useUserData, UseUserDataReturn } from "../hooks/useUserData";
import { useAuth } from "./AuthContext";

interface UserDataContextType extends UseUserDataReturn {
  userId: string;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

interface UserDataProviderProps {
  children: ReactNode;
  userId: string;
  refreshInterval?: number;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  children,
  userId,
  refreshInterval = 5 * 60 * 1000, // 5 minutes default
}) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, use demo mode with mock data
  const userDataHook = useUserData({
    userId,
    autoFetch: isAuthenticated, // Only fetch real data if authenticated
    refreshInterval,
    enableCache: true,
  });

  const contextValue: UserDataContextType = {
    ...userDataHook,
    userId,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error(
      "useUserDataContext must be used within a UserDataProvider"
    );
  }
  return context;
};

// Convenience hooks for specific data
export const useUserProfile = () => {
  const { profile, isLoading, isError, error, refreshData } =
    useUserDataContext();
  return { profile, isLoading, isError, error, refreshData };
};

export const useUserBookings = () => {
  const { bookings, isLoading, isError, error, refreshData } =
    useUserDataContext();
  return { bookings, isLoading, isError, error, refreshData };
};

export const useUserServices = () => {
  const { services, isLoading, isError, error, refreshData } =
    useUserDataContext();
  return { services, isLoading, isError, error, refreshData };
};

export const useUserStats = () => {
  const { stats, isLoading, isError, error, refreshData } =
    useUserDataContext();
  return { stats, isLoading, isError, error, refreshData };
};

export const useUserConversations = () => {
  const { conversations, isLoading, isError, error, refreshData } =
    useUserDataContext();
  return { conversations, isLoading, isError, error, refreshData };
};

export const useUserPortfolio = () => {
  const { portfolio, isLoading, isError, error, refreshData } =
    useUserDataContext();
  return { portfolio, isLoading, isError, error, refreshData };
};

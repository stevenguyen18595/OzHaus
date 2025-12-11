import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HousingReport } from "../types/models";

// Configure axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchHousingData = async (): Promise<HousingReport> => {
  try {
    const response = await api.get<HousingReport>("/housing/report");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch housing data",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// React Query hook for housing data
export const useHousingData = () => {
  return useQuery<HousingReport>({
    queryKey: ["housingReport"],
    queryFn: fetchHousingData,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Export the fetch function if needed elsewhere
export { fetchHousingData };

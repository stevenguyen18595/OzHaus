import axios from "axios";
import { axiosClient } from "../../lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { HousingReport } from "../../types/models";
import { routes } from "../../modules/routing/routes";

const fetchHousingData = async (): Promise<HousingReport> => {
  try {
    const url = `${routes.api.report}`;
    console.log("requesting:", (window.env?.baseUrl ?? "") + url);
    const response = await axiosClient.get<HousingReport>(url);
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
  const { data, error, isLoading } = useQuery<HousingReport>({
    queryKey: ["housingReport"],
    queryFn: fetchHousingData,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  return { data, error, isLoading };
};

// Export the fetch function if needed elsewhere
export { fetchHousingData };

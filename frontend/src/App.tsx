import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HousingReport from "./modules/HousingReport";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });
  return (
    <div className="min-h-screen bg-gray-100">
      <QueryClientProvider client={queryClient}>
        <HousingReport />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

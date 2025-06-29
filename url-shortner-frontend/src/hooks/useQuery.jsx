import { useQuery } from "@tanstack/react-query";
import api from "../api/api";



export const useFetchMyShortUrls = (onError) => {
  return useQuery({
    queryKey: ["my-shortenurls"],
    queryFn: async () => {
      const response = await api.get("/api/urls/myurls");
      return response.data;
    },
    select: (data) =>
      [...data].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      ),
    onError,
  });
};

export const useFetchTotalClicks = (onError) => {
  return useQuery({
    queryKey: ["url-totalClicks"],
    queryFn: async () => {
      const response = await api.get("/api/urls/totalClicks");
      return Object.entries(response.data).map(([date, count]) => ({
        clickDate: date,
        count,
      }));
    },
    onError,
  });
};

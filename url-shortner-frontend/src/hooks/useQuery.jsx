import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shortenurls"],
    queryFn: async () => {
      const response = await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    select: (data) =>
      [...data].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      ),
    onError,
  
  });
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalClicks"],
    queryFn: async () => {
      const response = await api.get("/api/urls/totalClicks", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data)
      return response.data;
    },
    select: (data) =>
      Object.entries(data).map(([date, count]) => ({
        clickDate: date,
        count,
      })),
    onError,
  });
};

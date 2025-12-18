import { getUser } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { user, userLoading };
};

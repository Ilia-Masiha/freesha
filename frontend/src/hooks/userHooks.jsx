import { getBasicUserData, getUser, updateUser } from "@/services/userServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetBasicUserData = () => {
  const { data: basicUser, isLoading: basicUserLoading } = useQuery({
    queryKey: ["basic-user"],
    queryFn: getBasicUserData,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { basicUser, basicUserLoading };
};

export const useGetUserData = () => {
  const { basicUser, basicUserLoading } = useGetBasicUserData();

  const userId = basicUser?.data?.id;

  const { data: completeUser, isLoading: completeUserLoading } = useQuery({
    queryKey: ["complete-user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId && !basicUserLoading,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { completeUser, completeUserLoading };
};

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
  });

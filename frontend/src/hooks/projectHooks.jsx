import { createProject } from "@/services/projectServices";
import { useMutation } from "@tanstack/react-query";

export const useCreateProject = () =>
  useMutation({
    mutationFn: createProject,
  });

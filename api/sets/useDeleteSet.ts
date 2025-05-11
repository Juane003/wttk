import { deleteSet } from "@/storage/set.storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      workoutId,
      exerciseId,
      setId,
    }: {
      workoutId: string;
      exerciseId: string;
      setId: string;
    }) => deleteSet(workoutId, exerciseId, setId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workouts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workout", variables.workoutId],
      });
      queryClient.invalidateQueries({
        queryKey: ["exercises", variables.workoutId],
      });
    },
  });
};

export default useDeleteSet;

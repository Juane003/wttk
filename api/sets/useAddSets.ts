import { SetData } from "@/schemas/workoutSchema";
import { addSet } from "@/storage/set.storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddSets = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      workoutId,
      exerciseId,
      set,
    }: {
      workoutId: string;
      exerciseId: string;
      set: SetData;
    }) => addSet(workoutId, exerciseId, set),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", variables.workoutId],
      });
    },
  });
};

export default useAddSets;

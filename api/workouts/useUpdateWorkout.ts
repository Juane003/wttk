import { WorkoutData } from "@/schemas/workoutSchema";
import { updateWorkout } from "@/storage/workout.storage";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

const useUpdateWorkout = (
  opts?: UseMutationOptions<void, Error, Partial<WorkoutData>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkout,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: ["workout", variables.id] });
      }
    },
    ...opts,
  });
};

export default useUpdateWorkout;

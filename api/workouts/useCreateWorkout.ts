import { WorkoutData } from "@/schemas/workoutSchema";
import { createWorkout } from "@/storage/workout.storage";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

const useCreateWorkout = (
  opts?: Omit<UseMutationOptions<WorkoutData>, "mutationFn">
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    ...opts,
  });
};

export default useCreateWorkout;

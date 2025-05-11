import { WorkoutData } from "@/schemas/workoutSchema";
import { getWorkoutById } from "@/storage/workout.storage";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useGetWorkoutById = (
  workoutId: string,
  options?: Omit<
    UseQueryOptions<WorkoutData | undefined>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["workout", workoutId],
    queryFn: () => getWorkoutById(workoutId),
    enabled: !!workoutId,
    ...options,
  });
};

export default useGetWorkoutById;

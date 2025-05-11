import { WorkoutData } from "@/schemas/workoutSchema";
import { getWorkouts } from "@/storage/workout.storage";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useGetWorkouts = (
  opts?: Omit<UseQueryOptions<WorkoutData[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
    ...opts,
  });
};

export default useGetWorkouts;

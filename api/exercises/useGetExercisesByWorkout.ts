import { ExerciseData } from "@/schemas/workoutSchema";
import { getExercisesByWorkout } from "@/storage/exercise.storage";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useGetExercisesByWorkout = (
  workoutId: string,
  opts?: Omit<UseQueryOptions<ExerciseData[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["exercises", workoutId],
    queryFn: () => getExercisesByWorkout(workoutId),
    ...opts,
  });
};

export default useGetExercisesByWorkout;

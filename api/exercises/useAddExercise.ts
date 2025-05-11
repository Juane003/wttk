import { ExerciseData } from "@/schemas/workoutSchema";
import { addExercise } from "@/storage/exercise.storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddExercise = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { workoutId: string; exercise: ExerciseData }
  >({
    mutationFn: ({ workoutId, exercise }) => addExercise(workoutId, exercise),
    onSuccess: (_, { workoutId }) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["exercises", workoutId] });
    },
  });
};

export default useAddExercise;

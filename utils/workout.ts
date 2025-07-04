import { WorkoutData } from "@/schemas/workoutSchema";
import { getFormattedDay } from "./date";

const getWorkoutName = (workout: WorkoutData | undefined) => {
  if (workout) {
    return `Workout - ${getFormattedDay(new Date(workout.createdAt), {
      weekday: undefined,
    })}`;
  }
  return "Workout";
};

const getTotalWorkoutSets = (workout: WorkoutData) => {
  return workout.exercises.reduce(
    (acc, exercise) => acc + exercise.sets.length,
    0
  );
};

const getWorkoutTime = (workout: WorkoutData) => {
  const startTime = new Date(workout.createdAt);
  const endTime = new Date(workout?.finishedAt ?? new Date());
  const time = new Date(endTime.getTime() - startTime.getTime());

  return `${time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })} `;
};

export { getTotalWorkoutSets, getWorkoutName, getWorkoutTime };

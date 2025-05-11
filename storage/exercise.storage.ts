import { ExerciseData, ExerciseDataSchema } from "@/schemas/workoutSchema";
import { z } from "zod";
import { getWorkouts, updateWorkout } from "./workout.storage";

export const getExercisesByWorkout = async (workoutId: string) => {
  const workouts = await getWorkouts();
  const workout = workouts.find((w) => w.id === workoutId);
  if (!workout) {
    throw new Error("Workout not found");
  }
  return workout.exercises;
};

// Exercise Storage Functions
export const saveExercises = async (
  exercises: ExerciseData[],
  workoutId: string
): Promise<void> => {
  try {
    // Validate the data before saving
    z.array(ExerciseDataSchema).parse(exercises);
    const workouts = await getWorkouts();
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) {
      throw new Error("Workout not found");
    }
    workout.exercises = [...workout.exercises, ...exercises];
    await updateWorkout(workout);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error saving exercises:", error);
    }
    throw error;
  }
};

export const addExercise = async (
  workoutId: string,
  exercise: ExerciseData
): Promise<void> => {
  try {
    // Validate the exercise before adding
    ExerciseDataSchema.parse(exercise);
    const workouts = await getWorkouts();
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) {
      throw new Error("Workout not found");
    }
    workout.exercises = [...workout.exercises, exercise];

    await updateWorkout(workout);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error adding exercise:", error);
    }
    throw error;
  }
};

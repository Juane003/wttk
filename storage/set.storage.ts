import { SetData, SetDataSchema } from "@/schemas/workoutSchema";
import { z } from "zod";
import { getWorkouts, updateWorkout } from "./workout.storage";

export const saveSets = async (
  workoutId: string,
  exerciseId: string,
  set: SetData
): Promise<void> => {
  try {
    // Validate the data before saving
    SetDataSchema.parse(set);
    const workouts = await getWorkouts();
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) {
      throw new Error("Workout not found");
    }
    const exercise = workout.exercises.find((e) => e.id === exerciseId);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    exercise.sets = [...exercise.sets, set];
    await updateWorkout(workout);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error saving sets:", error);
    }
    throw error;
  }
};

export const addSet = async (
  workoutId: string,
  exerciseId: string,
  set: SetData
): Promise<void> => {
  try {
    // Validate the set before adding
    SetDataSchema.parse(set);
    await saveSets(workoutId, exerciseId, set);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error adding set:", error);
    }
    throw error;
  }
};

export const deleteSet = async (
  workoutId: string,
  exerciseId: string,
  setId: string
): Promise<void> => {
  try {
    const workouts = await getWorkouts();
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) {
      throw new Error("Workout not found");
    }
    const exercise = workout.exercises.find((e) => e.id === exerciseId);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    exercise.sets = exercise.sets.filter((s) => s.id !== setId);
    await updateWorkout(workout);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error deleting set:", error);
    }
    throw error;
  }
};

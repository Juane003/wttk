import { WorkoutData, WorkoutDataSchema } from "@/schemas/workoutSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { z } from "zod";

const WORKOUTS_KEY = "@workout_tracker_workouts";

export const createWorkout = async (): Promise<WorkoutData> => {
  try {
    const workout: WorkoutData = {
      id: uuid.v4(),
      name: `Workout ${new Date().toLocaleDateString()}`,
      exercises: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addWorkout(workout);
    return workout;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw error;
  }
};

export const saveWorkouts = async (workouts: WorkoutData[]): Promise<void> => {
  try {
    // Validate the data before saving
    z.array(WorkoutDataSchema).parse(workouts);
    const jsonValue = JSON.stringify(workouts);
    await AsyncStorage.setItem(WORKOUTS_KEY, jsonValue);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error saving workouts:", error);
    }
    throw error;
  }
};

export const getWorkouts = async (): Promise<WorkoutData[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WORKOUTS_KEY);
    if (jsonValue == null) return [];

    // Parse and validate the data
    const parsedData = JSON.parse(jsonValue);
    const workouts = z.array(WorkoutDataSchema).parse(parsedData);

    return workouts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      // If validation fails, return empty array
      return [];
    }
    console.error("Error getting workouts:", error);
    throw error;
  }
};

export const getWorkoutById = async (
  workoutId: string
): Promise<WorkoutData | undefined> => {
  const workouts = await getWorkouts();
  return workouts.find((workout) => workout.id === workoutId);
};

export const getLastUnfinishedWorkout =
  async (): Promise<WorkoutData | null> => {
    const workouts = await getWorkouts();

    const unfinishedWorkouts = workouts.filter(
      (workout) => !workout.finishedAt
    );
    return (
      unfinishedWorkouts
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        })
        .at(0) || null
    );
  };

export const addWorkout = async (workout: WorkoutData): Promise<void> => {
  try {
    // Validate the workout before adding
    WorkoutDataSchema.parse(workout);
    const workouts = await getWorkouts();
    workouts.push(workout);
    await saveWorkouts(workouts);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error adding workout:", error);
    }
    throw error;
  }
};

export const updateWorkout = async (
  updatedWorkout: Partial<WorkoutData>
): Promise<void> => {
  try {
    // Validate the workout before updating
    WorkoutDataSchema.partial().parse(updatedWorkout);
    const workouts = await getWorkouts();
    const index = workouts.findIndex((w) => w.id === updatedWorkout.id);
    if (index !== -1) {
      workouts[index] = {
        ...workouts[index],
        ...updatedWorkout,
      };
      await saveWorkouts(workouts);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error updating workout:", error);
    }
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  try {
    const workouts = await getWorkouts();
    const filteredWorkouts = workouts.filter((w) => w.id !== workoutId);
    await saveWorkouts(filteredWorkouts);
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw error;
  }
};

import { z } from "zod";

const SetDataSchema = z.object({
  exerciseId: z.string(),
  id: z.string(),
  reps: z.number().min(0),
  weight: z.number().min(0),
  rir: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const ExerciseDataSchema = z.object({
  id: z.string(),
  workoutId: z.string(),
  exercise: z.string().min(1),
  sets: z.array(SetDataSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  order: z.number().min(0),
});

const WorkoutDataSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  exercises: z.array(ExerciseDataSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  finishedAt: z.string().datetime().optional(),
});

const ExercisesSchema = z.array(ExerciseDataSchema);

export type SetData = z.infer<typeof SetDataSchema>;
export type ExerciseData = z.infer<typeof ExerciseDataSchema>;
export type WorkoutData = z.infer<typeof WorkoutDataSchema>;

export {
  ExerciseDataSchema,
  ExercisesSchema,
  SetDataSchema,
  WorkoutDataSchema,
};

import useAddExercise from "@/api/exercises/useAddExercise";
import useGetExercisesByWorkout from "@/api/exercises/useGetExercisesByWorkout";
import useAddSets from "@/api/sets/useAddSets";
import useGetWorkoutById from "@/api/workouts/useGetWorkoutById";
import useUpdateWorkout from "@/api/workouts/useUpdateWorkout";
import ExerciseCardList from "@/components/Card/ExerciseCardList";
import Divider from "@/components/Divider/Divider";
import Drawer from "@/components/Drawer/Drawer";
import AddExerciseForm from "@/components/Form/AddExerciseForm";
import AddSetForm from "@/components/Form/AddSetForm";
import { EditWorkoutName } from "@/components/Form/EditWorkoutForm";
import PageContainer from "@/components/PageContainter/PageContainer";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import COLORS from "@/constants/style";
import useDrawer from "@/hooks/useDrawer";
import { ExerciseData, SetData } from "@/schemas/workoutSchema";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import uuid from "react-native-uuid";

export default function NewWorkoutPage() {
  const { id: workoutId } = useLocalSearchParams() as { id: string };
  const router = useRouter();
  const { data: workout } = useGetWorkoutById(workoutId);
  const { mutate: addExercise, isPending: isAddingExercise } = useAddExercise();
  const { mutate: addSets, isPending: isAddingSets } = useAddSets();
  const { mutate: updateWorkout, isPending: isUpdatingWorkout } =
    useUpdateWorkout();

  const queryClient = useQueryClient();
  const { data: exercises } = useGetExercisesByWorkout(workoutId);

  const {
    isOpen: isAddSetOpen,
    toggleDrawer: toggleAddSet,
    snapPoints: addSetSnapPoints,
  } = useDrawer();

  const {
    isOpen: isAddExerciseOpen,
    toggleDrawer: toggleAddExercise,
    snapPoints: addExerciseSnapPoints,
  } = useDrawer();

  const readOnly = Boolean(workout?.finishedAt);

  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(
    null
  );
  const currentExerciseName = exercises?.find(
    (exercise) => exercise.id === currentExerciseId
  )?.exercise;

  const handleAddExercise = (data: { exercise: string }) => {
    const order = exercises?.length ?? 0;
    const exercise: ExerciseData = {
      id: uuid.v4(),
      workoutId,
      exercise: data.exercise,
      sets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order,
    };

    addExercise(
      { workoutId, exercise },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["exercises", workoutId] });
          setCurrentExerciseId(exercise.id);
          toggleAddExercise(false);
        },
      }
    );
  };

  const handleAddSet = (data: {
    reps: number;
    weight: number;
    rir: number;
  }) => {
    if (!currentExerciseId) return;

    const set: SetData = {
      id: uuid.v4(),
      exerciseId: currentExerciseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };

    addSets(
      { workoutId, exerciseId: currentExerciseId, set },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["exercises", workoutId] });
          toggleAddSet(false);
        },
      }
    );
  };

  const handleFinishWorkout = () => {
    updateWorkout(
      {
        id: workoutId,
        finishedAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          router.push({
            pathname: "/history",
          });
        },
      }
    );
  };

  return (
    <PageContainer>
      <Drawer
        isOpen={isAddSetOpen}
        onClose={() => toggleAddSet(false)}
        snapPoints={addSetSnapPoints}
      >
        <AddSetForm
          title={currentExerciseName}
          onSubmit={handleAddSet}
          isPending={isAddingSets}
        />
      </Drawer>
      <Drawer
        isOpen={isAddExerciseOpen}
        onClose={() => toggleAddExercise(false)}
        snapPoints={addExerciseSnapPoints}
      >
        <AddExerciseForm
          onSubmit={handleAddExercise}
          isPending={isAddingExercise}
        />
      </Drawer>
      <View className="w-full items-center justify-center">
        <View className="p-4 gap-4">
          <View className="gap-1">
            <EditWorkoutName workoutId={workoutId} />
            <Divider />
          </View>

          {!readOnly && (
            <View className="flex-row justify-between items-center">
              <Text className="text-3xl text-start text-white">
                Add Exercise
              </Text>
              <Button
                action="positive"
                onPress={() => toggleAddExercise(true)}
                size="xs"
                variant="outline"
              >
                <ButtonText>
                  <AntDesign name="plus" size={16} color={COLORS.mint} />
                </ButtonText>
              </Button>
            </View>
          )}

          {exercises && exercises.length > 0 && (
            <ExerciseCardList
              readOnly={readOnly}
              data={exercises}
              id={currentExerciseId}
              onSelect={setCurrentExerciseId}
              onAddSet={() => toggleAddSet(true)}
            />
          )}
          {!readOnly && (
            <Button
              className="w-[80vw] h-12 mx-auto"
              size="lg"
              onPress={handleFinishWorkout}
              disabled={isUpdatingWorkout}
              action="positive"
            >
              {isUpdatingWorkout ? (
                <ButtonSpinner />
              ) : (
                <ButtonText>Finish Workout</ButtonText>
              )}
            </Button>
          )}
          {readOnly && (
            <View className="flex-row gap-2 mx-auto">
              <Button size="lg" onPress={() => router.push("/")}>
                <ButtonText>Go To Home</ButtonText>
              </Button>
              <Button size="lg" onPress={() => router.push("/history")}>
                <ButtonText>Return to History</ButtonText>
              </Button>
            </View>
          )}
        </View>
      </View>
    </PageContainer>
  );
}

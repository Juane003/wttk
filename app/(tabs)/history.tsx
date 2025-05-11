import useCreateWorkout from "@/api/workouts/useCreateWorkout";
import useGetWorkouts from "@/api/workouts/useGetWorkouts";
import WorkoutCardList from "@/components/history/WorkoutCardList";
import PageContainer from "@/components/PageContainter/PageContainer";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Text, View } from "react-native";
const History = () => {
  const { data: workouts } = useGetWorkouts();
  const { mutate: createWorkout } = useCreateWorkout();

  const handleCreateWorkout = () => {
    createWorkout(undefined, {
      onSuccess: (data) => {
        router.push({
          pathname: "/(tabs)/(workout)/[id]",
          params: { id: data.id },
        });
      },
    });
  };

  return (
    <PageContainer scrollable={false} className="p-4">
      {workouts && workouts.length > 0 ? (
        <WorkoutCardList workouts={workouts} />
      ) : (
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-white text-2xl font-semibold">
            No workouts found
          </Text>
          <Button size="sm" onPress={handleCreateWorkout} action={"positive"}>
            <Text className="text-white text-lg font-semibold">
              Track your first workout
            </Text>
          </Button>
        </View>
      )}
    </PageContainer>
  );
};

export default History;

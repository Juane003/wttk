import useUpdateWorkout from "@/api/workouts/useUpdateWorkout";
import { WorkoutData } from "@/schemas/workoutSchema";
import { getTime } from "@/utils/date";
import { getTotalWorkoutSets } from "@/utils/workout";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import Card from "../Card/Card";
import { Button, ButtonText } from "../ui/button";
const OnGoingWorkoutCard = ({ workout }: { workout: WorkoutData }) => {
  const { mutate: endWorkout } = useUpdateWorkout();

  const handleEndWorkout = () => {
    endWorkout({
      id: workout.id,
      finishedAt: new Date().toISOString(),
    });
  };

  return (
    <Card className="p-4 bg-surface-dark gap-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-semibold text-mint">
          Ongoing Workout
        </Text>
      </View>
      <View className="flex-row gap-1">
        <Text className="text-white">Today at</Text>
        <Text className="text-white">
          {getTime(new Date(workout.createdAt))}
        </Text>
      </View>

      <View className="flex-row">
        <Text className="text-white opacity-50">
          {workout.exercises.length} Exercises
        </Text>
        <Text className="px-2 text-white opacity-50">•</Text>
        <Text className="text-white opacity-50">
          {getTotalWorkoutSets(workout)} Sets
        </Text>
      </View>
      <View className="flex-row gap-2 items-center justify-center">
        <Link
          asChild
          href={{
            pathname: "/(tabs)/(workout)/[id]",
            params: { id: workout.id },
          }}
        >
          <Button className="bg-backround-dark  border-mint border">
            <ButtonText className="text-mint">Resume Workout</ButtonText>
          </Button>
        </Link>
        <Button
          onPress={handleEndWorkout}
          className="bg-backround-dark border-error-500 border"
        >
          <ButtonText className="text-error-500">End Workout</ButtonText>
        </Button>
      </View>
    </Card>
  );
};

export default OnGoingWorkoutCard;

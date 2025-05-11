import { getTotalWorkoutSets, getWorkoutTime } from "@/utils/workout";

import { WorkoutData } from "@/schemas/workoutSchema";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import Card from "../Card/Card";

const FinishedWorkoutCard = ({ workout }: { workout: WorkoutData }) => {
  return (
    <Card className="p-4 bg-surface-dark">
      <View className="flex-row justify-between items-center">
        <View className="gap-1">
          <Text className="text-xl font-semibold text-white">
            {workout.name}
          </Text>
          <View className="flex-row">
            <Text className="text-white opacity-50">
              {workout.exercises.length} Exercises
            </Text>
            <Text className="px-2 text-white opacity-50">•</Text>
            <Text className="text-white opacity-50">
              {getTotalWorkoutSets(workout)} Sets
            </Text>
            <Text className="px-2 text-white opacity-50">•</Text>
            <Text className="text-white opacity-50">
              {getWorkoutTime(workout)}
            </Text>
          </View>
        </View>
        <Link
          href={{
            pathname: "/(tabs)/(workout)/[id]",
            params: { id: workout.id },
          }}
        >
          <AntDesign name="right" size={24} color="gray" />
        </Link>
      </View>
    </Card>
  );
};

export default FinishedWorkoutCard;

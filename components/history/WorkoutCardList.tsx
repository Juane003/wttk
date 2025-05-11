import { WorkoutData } from "@/schemas/workoutSchema";
import { getFormattedDay } from "@/utils/date";
import { Fragment } from "react";
import { FlatList, Text, View } from "react-native";
import Divider from "../Divider/Divider";
import FinishedWorkoutCard from "./FinishedWorkoutCard";
import OnGoingWorkoutCard from "./OngoingWorkoutCard";

const WorkoutCardList = ({ workouts }: { workouts: WorkoutData[] }) => {
  const renderWorkoutCard = (workout: WorkoutData) => {
    if (workout.finishedAt) {
      return (
        <Fragment key={workout.id}>
          <Text className="text-white text-2xl font-semibold">
            {getFormattedDay(new Date(workout.finishedAt))}
          </Text>
          <FinishedWorkoutCard workout={workout} />
        </Fragment>
      );
    }

    return (
      <View key={workout.id} className="gap-4 pb-2">
        <OnGoingWorkoutCard workout={workout} />
        <Divider />
      </View>
    );
  };

  return (
    <FlatList
      data={workouts}
      renderItem={({ item }) => renderWorkoutCard(item)}
      keyExtractor={(item) => item.id}
      ListFooterComponent={<View className="h-28" />}
    />
  );
};

export default WorkoutCardList;

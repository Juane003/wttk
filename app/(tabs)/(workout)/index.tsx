import useCreateWorkout from "@/api/workouts/useCreateWorkout";
import useGetUnfinishedWorkout from "@/api/workouts/useGetLastUnfinishedWorkout";
import PageContainer from "@/components/PageContainter/PageContainer";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { H1 } from "@expo/html-elements";
import { Redirect, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function WorkoutIndex() {
  const router = useRouter();
  const { mutate, isPending } = useCreateWorkout();
  const { data: unfinishedWorkout } = useGetUnfinishedWorkout();

  const handleStartWorkout = async () => {
    mutate(undefined, {
      onSuccess: (data) => {
        router.push({
          pathname: "/(tabs)/(workout)/[id]",
          params: {
            id: data.id,
          },
        });
      },
      onError: (error) => {
        console.log("error");
        console.error(error);
      },
    });
  };

  if (unfinishedWorkout) {
    return (
      <Redirect
        href={{
          pathname: "/(tabs)/(workout)/[id]",
          params: { id: unfinishedWorkout.id },
        }}
      />
    );
  }

  return (
    <PageContainer>
      <View className="p-8 pt-32">
        <H1 className="text-white">Workout Tracker</H1>
        <Text className="text-white">
          Track your workouts and progress with ease. Start your workout now!
        </Text>

        <Button action="positive" className="mt-4" onPress={handleStartWorkout}>
          {isPending ? (
            <ButtonSpinner />
          ) : (
            <ButtonText className="text-white">Start Workout</ButtonText>
          )}
        </Button>
      </View>
    </PageContainer>
  );
}

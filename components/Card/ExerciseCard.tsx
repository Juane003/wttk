import useDeleteSet from "@/api/sets/useDeleteSet";
import COLORS from "@/constants/style";
import { ExerciseData, SetData } from "@/schemas/workoutSchema";
import { cn } from "@/utils/cn";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Fragment } from "react";
import { Text, View } from "react-native";
import Divider from "../Divider/Divider";
import { Button, ButtonText } from "../ui/button";
import SetCard from "./SetCard";
type ExerciseCardProps = {
  data: ExerciseData;
  onAddSet: () => void;
  isSelected: boolean;
  onSelect: () => void;
  readOnly?: boolean;
};

const ExerciseCard = ({
  data,
  onAddSet,
  isSelected,
  onSelect,
  readOnly,
}: ExerciseCardProps) => {
  const { mutate: deleteSet } = useDeleteSet();

  const handleDeleteSet = (id: string) => () => {
    deleteSet({
      workoutId: data.workoutId,
      exerciseId: data.id,
      setId: id,
    });
  };

  const renderSet = (set: SetData) => (
    <View key={set.id} className="mt-2">
      <SetCard
        onDelete={readOnly ? undefined : handleDeleteSet(set.id)}
        reps={set.reps}
        weight={set.weight}
        rir={set.rir}
      />
    </View>
  );

  const handleAddSet = () => {
    onSelect();
    onAddSet();
  };

  return (
    <View className="gap-2">
      <View
        className={cn(
          "text-3xl border border-primary-300 p-4 rounded-lg",
          isSelected && "border-emerald-500"
        )}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-semibold text-primary-main">
            {data.exercise}
          </Text>
          <Button
            action="positive"
            variant="outline"
            onPress={handleAddSet}
            className="mt-2"
            size="xs"
            disabled={readOnly}
          >
            <ButtonText className="justify-center">
              <AntDesign name="plus" size={16} color={COLORS.mint} />
            </ButtonText>
          </Button>
        </View>
        {data.sets.length > 0 && (
          <Fragment>
            <View className="my-2">
              <Divider />
            </View>

            <View className="gap-2 rounded-lg">
              <View className="flex-row justify-between items-center ">
                <Text className="text-base w-1/5 text-primary-main">Reps</Text>
                <Text className="text-base w-1/5 text-primary-main">Weight</Text>
                <Text className="text-base w-1/5 text-primary-main">RIR</Text>
                <Text className="text-base w-1/5 text-primary-main"></Text>
              </View>
              <View className="p-2 gap-2">{data.sets.map(renderSet)}</View>
            </View>
          </Fragment>
        )}
      </View>
    </View>
  );
};

export default ExerciseCard;

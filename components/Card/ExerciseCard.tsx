import useDeleteSet from "@/api/sets/useDeleteSet";
import COLORS from "@/constants/style";
import { ExerciseData, SetData } from "@/schemas/workoutSchema";
import { cn } from "@/utils/cn";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import Card from "./Card";
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
    <View key={set.id}>
      <SetCard
        onDelete={handleDeleteSet(set.id)}
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
          <Text className="text-2xl text-white">{data.exercise}</Text>
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
      </View>
      {data.sets.length > 0 && (
        <Card className="border border-primary-300 p-4">
          <View className="gap-2 rounded-lg">
            <View className="flex-row justify-between items-center ">
              <Text className="text-base w-1/5 text-white">Reps</Text>
              <Text className="text-base w-1/5 text-white">Weight</Text>
              <Text className="text-base w-1/5 text-white">RIR</Text>
              <Text className="text-base w-1/5 text-white"></Text>
            </View>
            <View className="p-2 gap-2">{data.sets.map(renderSet)}</View>
          </View>
        </Card>
      )}
    </View>
  );
};

export default ExerciseCard;

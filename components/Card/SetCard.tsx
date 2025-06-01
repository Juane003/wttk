import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
type SetCardProps = {
  reps: number;
  weight: number;
  rir: number;
  onDelete?: () => void;
};

const SetCard = ({ reps, weight, rir, onDelete }: SetCardProps) => {
  return (
    <View className="flex-row justify-between">
      <Text className="text-base text-white w-1/5">{reps}</Text>
      <Text className="text-base text-white w-1/5">{weight}KG</Text>
      <Text className="text-base text-white w-1/5">{rir}</Text>
      {onDelete && (
        <Button size="xs" action="negative" onPress={onDelete}>
          <ButtonText>
            <AntDesign name="delete" size={16} color="white" />
          </ButtonText>
        </Button>
      )}
    </View>
  );
};

export default SetCard;

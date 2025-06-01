import { ExerciseData } from "@/schemas/workoutSchema";
import { View } from "react-native";
import ExerciseCard from "./ExerciseCard";

type ExerciseCardListProps = {
  data: ExerciseData[];
  onSelect: (exerciseId: string) => void;
  onAddSet: (exerciseId: string) => void;
  id: string | null;
  readOnly?: boolean;
};

const ExerciseCardList = ({
  data,
  onSelect,
  onAddSet,
  id,
  readOnly,
}: ExerciseCardListProps) => {
  const renderExercise = (exercise: ExerciseData) => {
    return (
      <View key={exercise.id} className="mb-4">
        <ExerciseCard
          data={exercise}
          isSelected={id === exercise.id}
          onSelect={() => onSelect(exercise.id)}
          onAddSet={() => onAddSet(exercise.id)}
          readOnly={readOnly}
        />
      </View>
    );
  };
  return <View>{data.map((exercise) => renderExercise(exercise))}</View>;
};

export default ExerciseCardList;

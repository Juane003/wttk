import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import ControlledInput from "./ControlledInput";

const AddExerciseSetSchema = z.object({
  exercise: z.string().min(1),
});

type AddExerciseSetData = z.infer<typeof AddExerciseSetSchema>;

type AddExerciseFormProps = {
  onSubmit: (data: AddExerciseSetData) => void;
  isPending: boolean;
};

const AddExerciseForm = ({ onSubmit, isPending }: AddExerciseFormProps) => {
  const { control, handleSubmit } = useForm<AddExerciseSetData>({
    resolver: zodResolver(AddExerciseSetSchema),
  });

  return (
    <View className="gap-4 w-full p-4">
      <ControlledInput
        control={control}
        name="exercise"
        placeholder="Exercise Name"
      />
      <Button onPress={handleSubmit(onSubmit)}>
        {isPending ? <ButtonSpinner /> : <ButtonText>Submit</ButtonText>}
      </Button>
    </View>
  );
};

export default AddExerciseForm;

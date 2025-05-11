import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import ControlledInput from "./ControlledInput";

const AddSetFormSchema = z.object({
  reps: z.string().min(0),
  weight: z.string().min(0),
  rir: z.string().min(0),
});

type AddSetFormData = z.infer<typeof AddSetFormSchema>;

type ParsedAddSetFormData = {
  reps: number;
  weight: number;
  rir: number;
};

type AddSetFormProps = {
  onSubmit: (data: ParsedAddSetFormData) => void;
  isPending: boolean;
  title?: string;
};

const AddSetForm = ({ onSubmit, isPending, title }: AddSetFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSetFormData>({
    resolver: zodResolver(AddSetFormSchema),
  });

  console.log(errors);

  const parseNumbers = (data: AddSetFormData) => {
    return {
      reps: parseInt(data.reps),
      weight: parseInt(data.weight),
      rir: parseInt(data.rir),
    };
  };

  return (
    <View className="gap-4 w-full p-4">
      {title && <Text className="text-2xl text-white font-bold">{title}</Text>}
      <ControlledInput
        control={control}
        name="reps"
        placeholder="Reps"
        type="number"
      />
      <ControlledInput
        control={control}
        name="weight"
        placeholder="Weight"
        type="number"
      />
      <ControlledInput
        control={control}
        name="rir"
        placeholder="RIR"
        type="number"
      />
      <Button
        onPress={handleSubmit((data) => {
          const parsedData = parseNumbers(data);
          onSubmit(parsedData);
        })}
      >
        {isPending ? <ButtonSpinner /> : <ButtonText>Submit</ButtonText>}
      </Button>
    </View>
  );
};

export default AddSetForm;

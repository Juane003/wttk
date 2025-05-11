import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input, InputField } from "../ui/input";

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
  placeholder: string;
  type?: "number" | "text";
};

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = "text",
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            {...field}
            onChangeText={field.onChange}
            placeholder={placeholder}
            keyboardType={type === "number" ? "numeric" : "default"}
          />
        </Input>
      )}
    />
  );
};

export default ControlledInput;

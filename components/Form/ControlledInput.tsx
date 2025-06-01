import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input, InputField } from "../ui/input";

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
  placeholder: string;
  keyboardType?: "number" | "text" ;
  type?: "text" | "password";
};

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = "text",
  keyboardType = "text",
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
            type={type}
            onChangeText={field.onChange}
            placeholder={placeholder}
            keyboardType={keyboardType === "number" ? "numeric" : "default"}
          />
        </Input>
      )}
    />
  );
};

export default ControlledInput;

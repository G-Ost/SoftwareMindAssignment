import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
}

const TextInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: TextInputProps<T>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();
  const fieldError = errors[name];
  const errorId = `${name}-error`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="h-24">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type="text" />
          </FormControl>
          {fieldError && (
            <span id={errorId} className="text-red-500">
              {fieldError.message?.toString()}
            </span>
          )}
        </FormItem>
      )}
    />
  );
};

export default TextInput;

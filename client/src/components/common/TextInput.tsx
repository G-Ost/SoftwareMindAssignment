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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {fieldError && (
            <span className="text-red-500">
              {fieldError.message?.toString()}
            </span>
          )}
        </FormItem>
      )}
    />
  );
};

export default TextInput;

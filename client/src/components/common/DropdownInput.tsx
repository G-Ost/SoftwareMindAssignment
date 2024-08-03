import { FormField, FormItem, FormLabel } from "@/shadcn/components/ui/form";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import Combobox from "./Combobox";

interface DropdownInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
  options: { value: string; label: string }[];
  onSetValue: (newValue: string) => void;
}

const DropdownInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  options,
  onSetValue,
}: DropdownInputProps<T>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();
  const fieldError = errors[name];
  const errorId = `${name}-error`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Combobox
            options={options}
            placeholder={placeholder}
            value={value}
            setValue={onSetValue}
          />
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

export default DropdownInput;

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/shadcn/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import { Calendar } from "@/shadcn/components/ui/calendar";
import { pl } from "date-fns/locale";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { Control, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

interface DatePickerInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
}

const DatePickerInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: DatePickerInputProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="pointer-events-none">{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onClick={() => {
                setOpen(true);
              }}
              asChild
            >
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal border-2",
                    !value && "text-muted-foreground"
                  )}
                >
                  {value ? (
                    format(value, "PPP", { locale: pl })
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none" align="start">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(props) => {
                  setOpen(false);
                  onChange(props);
                }}
                disabled={(date) =>
                  date > new Date("2030-01-01") || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default DatePickerInput;

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shadcn/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";

interface ComboboxProps {
  placeholder: string;
  setValue: (newValue: string) => void;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Combobox = ({ options, placeholder, value, setValue }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, [open]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={triggerRef} asChild className="w-full mt-2">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full font-normal"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-oceanic text-white rounded border-2 border-white"
        style={{ width: triggerWidth }}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className="cursor-pointer hover:bg-white hover:text-oceanic"
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;

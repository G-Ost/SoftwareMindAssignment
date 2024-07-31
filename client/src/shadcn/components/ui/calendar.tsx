import { pl } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

import CalendarCaptionLabel from "@/components/common/CalendarCaptionLabel";
import { buttonVariants } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { useState } from "react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  const selected = props.selected as Date | undefined;
  const [displayedMonth, setDisplayedMonth] = useState<Date>(
    new Date(selected ?? "01-01-1970")
  );

  const onNavigation = (date: Date) => {
    setDisplayedMonth(date);
  };

  return (
    <DayPicker
      locale={pl}
      weekStartsOn={1}
      month={displayedMonth}
      fixedWeeks
      disableNavigation
      showOutsideDays
      className={cn(
        "p-3 bg-oceanic text-white border-black border-2 w-[21rem] flex justify-center",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1 w-14 border-none",
        nav_button_next: "absolute right-1 w-14 border-none",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-softBlue"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground pointer-events-none bg-white !text-oceanic",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 pointer-events-none aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        CaptionLabel: ({ displayMonth }) => (
          <CalendarCaptionLabel
            displayedDate={displayMonth}
            onNavigation={onNavigation}
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

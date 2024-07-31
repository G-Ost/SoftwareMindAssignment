import clsx from "clsx";
import { addMonths, formatDate } from "date-fns";
import { pl } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NavigationDirection = "past" | "future";
type NavigationPeriod = "month" | "year";

interface CalendarCaptionLabelProps {
  onNavigation: (date: Date) => void;
  displayedDate: Date;
}

const iconStyle = "cursor-pointer hover:brightness-75";

const CalendarCaptionLabel = ({
  onNavigation,
  displayedDate,
}: CalendarCaptionLabelProps) => {
  const handleNavigation = (
    navigationDirection: NavigationDirection,
    navigationPeriod: NavigationPeriod
  ) => {
    const numberOfMonths = navigationPeriod === "month" ? 1 : 12;
    const navigationMultiplier = navigationDirection === "past" ? -1 : 1;
    const updatedDate = addMonths(
      displayedDate,
      numberOfMonths * navigationMultiplier
    );
    onNavigation(updatedDate);
  };

  const getNavigationHandler =
    (
      navigationDirection: NavigationDirection,
      navigationPeriod: NavigationPeriod
    ) =>
    () =>
      handleNavigation(navigationDirection, navigationPeriod);

  const formattedDate = formatDate(displayedDate, "LLLL yyyy", { locale: pl });
  return (
    <div className="flex flex-row items-center justify-center select-none">
      <ChevronLeft
        onClick={getNavigationHandler("past", "year")}
        className={clsx("h-8 w-8", iconStyle)}
      />
      <ChevronLeft
        onClick={getNavigationHandler("past", "month")}
        className={clsx("h-5 w-5", iconStyle)}
      />
      <span className="text-md  text-center w-[11rem]">{formattedDate}</span>
      <ChevronRight
        onClick={getNavigationHandler("future", "month")}
        className={clsx("h-5 w-5", iconStyle)}
      />
      <ChevronRight
        onClick={getNavigationHandler("future", "year")}
        className={clsx("h-8 w-8", iconStyle)}
      />
    </div>
  );
};

export default CalendarCaptionLabel;

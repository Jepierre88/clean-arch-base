import type { ComponentProps } from "react";

import { Calendar, CalendarDayButton } from "../ui/calendar";

export { CalendarDayButton as ChronoCalendarDayButton };

export function ChronoCalendar(props: ComponentProps<typeof Calendar>) {
  return <Calendar {...props} />;
}

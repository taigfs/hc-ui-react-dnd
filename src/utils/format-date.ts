import { format } from "date-fns";

export const formatDateString = (
  dateString?: string,
  formatString: string = "dd/MM/yyyy"
) => {
  if (!dateString) {
    return "";
  }
  return format(new Date(dateString), formatString);
};

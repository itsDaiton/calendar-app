import dayjs from "dayjs";

interface daysOfWeekDay {
  id: number;
  value: string;
}

export const daysOfWeek : daysOfWeekDay[] = [
  {
    id: 1,
    value: "Mon",
  },
  {
    id: 2,
    value: "Tue",
  },
  {
    id: 3,
    value: "Wed",
  },
  {
    id: 4,
    value: "Thu",
  },
  {
    id: 5,
    value: "Fri",
  },
  {
    id: 6,
    value: "Sat",
  },
  {
    id: 7,
    value: "Sun",
  },
]

const currentDate: dayjs.Dayjs = dayjs()

export const getCurrentMonth = (): number => {
  return currentDate.month()
}

export const getCurrentYear = (): number => {
  return currentDate.year()
}

interface viewTypesType {
  id: number;
  value: string;
  text: string;
}

export const viewTypes: viewTypesType[] = [
  {
    id: 1,
    value: "week",
    text: "Week"
  },
  {
    id: 2,
    value: "month",
    text: "Month"
  },
]

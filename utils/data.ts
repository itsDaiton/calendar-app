import dayjs from "dayjs";

interface daysOfWeekDay {
  id: number;
  value: string;
}

export const daysOfWeek : daysOfWeekDay[] = [
  {
    id: 1,
    value: "MON",
  },
  {
    id: 2,
    value: "TUE",
  },
  {
    id: 3,
    value: "WED",
  },
  {
    id: 4,
    value: "THU",
  },
  {
    id: 5,
    value: "FRI",
  },
  {
    id: 6,
    value: "SAT",
  },
  {
    id: 7,
    value: "SUN",
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

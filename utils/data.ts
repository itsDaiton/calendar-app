import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

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

export const getCurrentWeek = (): number => {
  return currentDate.week()
}

export const getFirstDayOfWeek = (year: number, month: number, week: number): dayjs.Dayjs => {
  return dayjs().year(year).month(month).week(week).startOf('week').add(1, 'day')
}

export const getFirstDayOfMonth = (year: number, month: number): dayjs.Dayjs => {
  return dayjs().year(year).month(month).startOf('month')
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

export type EventType = {
  id: number;
  title: string;
  from: dayjs.Dayjs;
  to: dayjs.Dayjs;
  color: string;
}

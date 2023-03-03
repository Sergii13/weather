import { isBefore, endOfToday, fromUnixTime, lightFormat, addDays } from 'date-fns'

export const normalizeDataToday = (arr) => {
  return arr
    .filter((date) => isBefore(fromUnixTime(date.dt), endOfToday()) === true)
    .map((item) => {
      return { ...item, dt: lightFormat(fromUnixTime(item.dt), 'HH:mm') }
    })
}

export const normalizeDataDays = (arr) => {
  return arr
    .filter((date) => isBefore(fromUnixTime(date.dt), addDays(new Date(), 4)) === true)
    .map((item) => {
      return { ...item, dt: lightFormat(fromUnixTime(item.dt), 'dd.MM.yy'), temp: item.temp.eve }
    })
}

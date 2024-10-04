/**
 * Format date to e.g. dd-mm-yyyy
 * @param date
 */
export const getDateFormatted = (date: Date) => {
    const todayDay = date.getUTCDate()
    const formattedDay = todayDay < 10 ? `0${todayDay}` : todayDay
    return `${formattedDay}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`
}
/**
 * Format date to e.g. dd-mm-yyyy
 * @param date
 */
export const getDateFormatted = (date: Date) => {
    const todayDay = date.getUTCDate()
    const formattedDay = todayDay < 10 ? `0${todayDay}` : todayDay
    return `${formattedDay}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`
}


/**
 * Convert epoch to hh:mm
 * @param epoch
 */
export const epochToTime = (epoch: number): string => {
    const date = new Date(epoch) // Multiply by 1000 if the epoch is in seconds, omit if it's in milliseconds
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}
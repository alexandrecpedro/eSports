export let convertMinutesToHourString = (minutesAmount: number) => {
    // Get minutes and transform to hours
    const hours = Math.floor(minutesAmount/60);
    // Pick up the remaining minutes
    const minutes = minutesAmount % 60;

    // Return the hourString
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
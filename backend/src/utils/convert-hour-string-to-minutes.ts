export let convertHourStringToMinutes = (hourString: string) => {
    // Get hourString and transform to number
    const [hours, minutes] = hourString.split(':').map(Number);
    // Conversion to minutes
    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount;
}
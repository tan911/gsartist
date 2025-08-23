export function getNumberToDays(dayOfWeek: number): string {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    return days[dayOfWeek - 1] || '' // Returns the day or an empty string if invalid
}

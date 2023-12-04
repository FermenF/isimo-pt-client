export function formattDateTime(date: Date): string {
    const parseDate = new Date(date);
    const year = parseDate.getFullYear();
    const month = (parseDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parseDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
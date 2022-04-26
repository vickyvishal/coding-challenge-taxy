export const getReleaseDate = (release_date: string) => {
    const date = new Date(release_date)
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear()
    return month + ' ' + year
}
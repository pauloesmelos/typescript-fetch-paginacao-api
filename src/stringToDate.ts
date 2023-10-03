/**
 * 20/08/2000 00:30
 *  1º separar por espaço (time x date), 2º separar por / (date), 3º separar por : (time)
 */
export default function stringToDate(value: string) {
    const [date, time] = value.split(' '); // prestar atenção na hora de desestruturar
    let [day, month, year] = date.split('/').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    month = (month - 1 < 0 ? 0 : month - 1);
    return new Date(year, month, day, hour, minute);
}
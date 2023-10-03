/** (200,50 -> 200.50)
 * (200,00 -> 200)
* (2.500,50 -> 2500.50)
* (\- -> 0) */
export default function stringToNumber(value: string) {
    return value !== '-' ? Number(value.replaceAll('.', '').replaceAll(',', '.')) : 0;
}
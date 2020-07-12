export const trasnlateFlightClass = (en) => {
    let fa = ''
    switch (en) {
    case 'economy' :
        fa = 'اکونومی'
        break
    case 'business':
        fa = 'بیزینس'
        break
    case 'first':
        fa = 'فرست'
        break
    default :
        return ''
    }
    return fa
}
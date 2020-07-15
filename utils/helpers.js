export const translateFlightClass = (en) => {
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

const policy = {
    international: {
        child: 2
    },
    domestic: {
        child: 4
    }
}


export const minAdult = (adult, child, type) => adult >= 1 && childrenCheck(type, adult, child)

export const childrenCheck = (type, adult, child) => child <= policy[type].child * adult

export const infantCheck = (infant) => infant <= 1

export const maxPassenger = (adult, child, infant) => {
    const maxCount = 9
    return adult + child + infant <= maxCount
}

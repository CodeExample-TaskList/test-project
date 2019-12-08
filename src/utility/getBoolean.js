/**
 * true, 'true', 1, '1', 'on' and 'yes' return true
 * else return false
 *
 * @param {*} value
 *
 * returns boolean
 */
const getBoolean = value => {
    switch (value) {
        case true:
        case 'true':
        case 1:
        case '1':
        case 'on':
        case 'yes':
            return true
        default:
            return false
    }
}

export default getBoolean

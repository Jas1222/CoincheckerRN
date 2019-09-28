import moment from 'moment'

export function getCurrentTime() {
    return moment().format('h:mm:ss a');
}
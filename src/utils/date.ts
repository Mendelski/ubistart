import moment from 'moment';

export const format = (date: string|Date, pattern: string = 'YYYY-MM-DD HH:mm:ss') => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    return moment(date).format(pattern);
}

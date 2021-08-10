/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import moment from 'moment';

export const splitDateTimeString = (dateItem) => {
    const dateArray = dateItem.split(' ');
    const dateTimeStr = dateArray[0];
    const newDateTimeStr = dateTimeStr.substring(0, dateTimeStr.length - 2);
    const dateStr = dateArray[1];
    const date = dateStr.split('-');
    const dateString = `${date[2]}-${date[1]}-${date[0]} ${newDateTimeStr}`;
    return new moment(dateString, 'YYYY-MM-DD h:mm').utc(false).toDate();
};

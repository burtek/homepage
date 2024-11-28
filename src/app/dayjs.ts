import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';


dayjs.locale('pl');
dayjs.extend(dayjsLocalizedFormat);
dayjs.extend(dayjsRelativeTime);

const showRelativeTimeIfLessThanDays = 7;

export function formatTime(datetime: string) {
    if (!datetime && process.env.NEXT_PUBLIC_ENV !== 'development') {
        return datetime;
    }
    const date = dayjs(datetime || new Date());

    if (dayjs().diff(date, 'days') < showRelativeTimeIfLessThanDays) {
        return date.fromNow();
    }
    return date.format('ll');
}

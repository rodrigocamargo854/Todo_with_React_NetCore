import moment from 'moment'

/**
 * Returns a Formated Date Time.
 * @param {*} date
 * @param {*} dateOnly "optional parameter to only retrieve the date without time."
 */
export default function (date, dateOnly = false) {
 if (!date) return "";

 if (dateOnly) {
 return moment(date).format('DD/MM/YYYY');
    }
 return moment(date).format('DD/MM/YYYY hh:mm:ss');
}
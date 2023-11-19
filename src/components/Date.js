import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <>
      {date != 'Invalid Date' && <time dateTime={dateString}>{format(date, 'MMM d, \'\'yy')}</time>}
    </>
  )
}
import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface FormattedDateProps {
    dateTime: Date
}

const FormattedDate: React.FC<FormattedDateProps> = ({ dateTime }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const calculateTimeDifference = () => {
            const now = moment();
            const postDate = moment(dateTime);
            const duration = moment.duration(now.diff(postDate));

            if (duration.asDays() >= 1) {
                setFormattedDate(`${Math.floor(duration.asDays())} d`);
            } else if (duration.asHours() >= 1) {
                setFormattedDate(`${Math.floor(duration.asHours())} h`);
            } else if (duration.asMinutes() >= 1) {
                setFormattedDate(`${Math.floor(duration.asMinutes())} m`);
            } else {
                setFormattedDate(`${Math.floor(duration.asSeconds())} s`);
            }
        };

        calculateTimeDifference();

        const interval = setInterval(calculateTimeDifference, 60000);

        return () => clearInterval(interval);
    }, [dateTime]);

    return <div>{formattedDate}</div>;
};

export default FormattedDate;

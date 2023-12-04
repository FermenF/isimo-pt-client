import React from 'react';

interface CardProps {
    children: React.ReactNode
    padding?: string;
}

const Card: React.FC <CardProps> = ({ children, padding = 'p-5' }) => {
    return (
        <div className={`h-auto bg-white w-full rounded-md shadow-md ${padding} mb-5`}>
            { children }
        </div>
    );
};

export default Card;

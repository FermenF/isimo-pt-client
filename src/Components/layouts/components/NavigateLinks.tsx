import React from 'react';
import { Link } from 'react-router-dom';

interface Link {
    title: string,
    url:   string
}

const NavigateLinks:React.FC = () => {

    const links:Link[] = [
        {
            title: "Publicaciones",
            url: "/"
        },
        {
            title: "Usuarios",
            url: "/users"
        }
    ];

    return (
        <>
            {
                links.map((link, i) => (
                    <li key={ i }>
                        <Link to={ link.url } className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">
                            { link.title }
                        </Link>
                    </li>
                ))
            }
        </>
    );
};

export default NavigateLinks;
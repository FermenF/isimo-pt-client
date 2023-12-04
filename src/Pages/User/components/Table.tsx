import React from "react";
import { User } from "@interfaces/user.interface";
import ImageProfileAndContent from "@components/ImageProfileAndContent";
import FormattedDate from "@components/FormattedDate";
import { capitalizeText } from "@utils/string.utils";
import { formattDateTime } from "@utils/formatDateTime";
import { Link } from "react-router-dom";

interface TableProps {
    users: User[];
}

const Table: React.FC<TableProps> = ({ users }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <ThComponent>
                            Nombre
                        </ThComponent>
                        <ThComponent>
                            Email
                        </ThComponent>
                        <ThComponent>
                            Fecha de registro
                        </ThComponent>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (

                        <tr className="bg-white border-b" key={user.id}>
                            <td scope="row" className="px-6 py-4 flex items-center justify-start">
                                <div>
                                    <ImageProfileAndContent img={user.photo} />
                                </div>
                                <div>
                                    <Link to={`/users/${user.id}`}>
                                        <b className="ml-3 text-blue-700">{capitalizeText(user.name)}</b>
                                    </Link>
                                </div>
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <div>{formattDateTime(user.created_at)}</div>
                                <div className="flex justify-start items-center">
                                    <small className="mr-2">Hace:</small>{" "}
                                    {<FormattedDate dateTime={user.created_at} />}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface ThComponentProps {
    children: React.ReactNode
}

const ThComponent: React.FC<ThComponentProps> = ({ children }) => {
    return (
        <th scope="col" className="px-6 py-3">
            {children}
        </th>
    )
}

export default Table;

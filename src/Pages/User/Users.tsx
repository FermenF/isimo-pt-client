import Card from "@components/Card";
import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import { userGetAll, userGetAllChangePage } from "@services/user.service";
import { useAlert } from "@hooks/useAlerts";
import { useAuth } from "@hooks/useAuth";
import { getMessageError } from "@utils/axiosApiErrors";
import { UserListResponse } from "@interfaces/user.interface";

const Users: React.FC = () => {
    const { authToken } = useAuth();
    const { addAlert } = useAlert();
    const [email, setEmail] = useState("");
    const [result, setResult] = useState<UserListResponse>();

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const result = await userGetAll(email, authToken!);
            setResult(result);
        } catch (error) {
            addAlert('error', getMessageError(error));
        }
    };

    const handleChangePage = async (url: string | null) => {
        try {
            if (url) {
                const result = await userGetAllChangePage(url, authToken!);
                setResult(result);
            }
        } catch (error) {
            addAlert('error', getMessageError(error));
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        handleSearch();
    }, [authToken]);

    return (
        <div>
            <Card>
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        className="bg-gray-200 h-10 w-full ml-1 text-gray-600 text-left px-3 rounded-2xl focus:0"
                        placeholder="Búsqueda por correo electrónico..."
                        onChange={handleChangeEmail}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </Card>
            <Card>
                <div className="md:flex items-center justify-between text-gray-600 my-3">
                    <div className="text-sm flex items-center justify-between md:justify-start">
                        <span className="mr-2">Mostrando {result?.data.to} de {result?.data.total}</span>
                        |
                        <span className="ml-2">Total de paginas: {result?.data.last_page}</span>
                    </div>
                    <div className="flex items-center justify-between md:justify-end mt-2 md:mt-0">
                        <button
                            type="button"
                            onClick={() => handleChangePage(result?.data.prev_page_url ? result.data.prev_page_url : null)}
                            className={`${!result?.data.prev_page_url ? 'cursor-not-allowed' : ''} mr-2 text-sm py-1.5 px-2 bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-md`}
                            disabled={!result?.data.prev_page_url}
                        >
                            {'< Anterior'}
                        </button>
                        |
                        <button
                            type="button"
                            onClick={() => handleChangePage(result?.data.next_page_url ? result.data.next_page_url : null)}
                            className={`${!result?.data.next_page_url ? 'cursor-not-allowed' : ''} ml-2 text-sm py-1.5 px-2 bg-gray-100 hover:bg-gray-300 hover:text-gray-900 rounded-md `}
                            disabled={!result?.data.next_page_url}>
                            {'Siguiente >'}</button>
                    </div>
                </div>
                {
                    result?.data && (
                        <Table users={result!.data.data} />
                    )
                }
            </Card>
        </div>
    );
};

export default Users;

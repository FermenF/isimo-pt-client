import Card from "@components/Card";
import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import { userGetAll } from "@services/user.service";
import { useAlert } from "@hooks/useAlerts";
import { useAuth } from "@hooks/useAuth";
import { getMessageError } from "@utils/axiosApiErrors";
import { User } from "@interfaces/user.interface";

const Users: React.FC = () => {
    const { authToken } = useAuth();
    const { addAlert } = useAlert();
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const result = await userGetAll(email, authToken!);
            setUsers(result.data);
        } catch (error) {
            addAlert('error', getMessageError(error));
        }
    };

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
                <Table users={users} />
            </Card>
        </div>
    );
};

export default Users;

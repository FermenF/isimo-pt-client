import Card from "@components/Card";
import { useAlert } from "@hooks/useAlerts";
import { useAuth } from "@hooks/useAuth";
import { User } from "@interfaces/user.interface";
import Posts from "@pages/Home/components/Posts";
import { userShow } from "@services/user.service";
import { getMessageError } from "@utils/axiosApiErrors";
import { formattDateTime } from "@utils/formatDateTime";
import { capitalizeText } from "@utils/string.utils";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const UserShow: React.FC = () => {

    const { id } = useParams();
    const { addAlert } = useAlert();
    const { authToken } = useAuth();

    const [user, setUser] = useState<User>();
    const [showInfo, setShowInfo] = useState(true);

    const handleGetUserData = async () => {
        try {
            const result = await userShow(id!, authToken!);
            setUser(result.data as unknown as User);
        } catch (error) {
            addAlert('error', getMessageError(error));
            setShowInfo(false);
        }
    };

    useEffect(() => {
        handleGetUserData();
    }, [authToken]);

    return (
        <>
            {
                showInfo === true ? (
                    user && (
                        <div>
                            <Card>
                                <UserInformation text="nombre" value={user.name}/>
                                <UserInformation text="email" value={user.email}/>
                                <UserInformation text="fecha de registro" value={formattDateTime(user.created_at)}/>
                                <UserInformation text="publicaciones totales" value={user.posts.length}/>
                            </Card>
                            <Posts posts={user.posts} userData={ user }/>
                        </div>
                    )
                ) : (
                    <Navigate to={'/users'}></Navigate>
                )
            }
        </>
    );
};

interface UserInformationProps {
    text: string;
    value: string | number;
}

const UserInformation: React.FC<UserInformationProps> = ({ text, value }) => {
    return (
        <div className="my-1">
            {capitalizeText(text)}: <strong>{value}</strong>
        </div>
    );
};

export default UserShow;
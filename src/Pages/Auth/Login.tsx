import React, { useState } from "react";
import Auth from "./components/Auth";
import Input from "./components/Input";
import ButtonSubmit from "./components/ButtonSubmit";
import { authLogin } from "@services/auth.service";
import { getMessageError } from "@utils/axiosApiErrors";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { Token } from "@interfaces/auth.interface";

const Login: React.FC = () => {

    const { performLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [remember, setRemember] = useState();

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };
    
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    
    const handleHideMessage = () =>{
        setMessage("");
    };

    const handleSumbitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = (await authLogin({ email, password })).data as Token;
            performLogin(result.token);
            navigate("/");
        } catch (error) {
            setMessage(getMessageError(error));
        }
    };

    return (
        <Auth title="Bienvenido de nuevo">
            <form className="space-y-4" onSubmit={ handleSumbitForm }>
                {
                    message && (
                        <div className="p-2 bg-red-50 rounded-md text-red-700 flex items-center justify-between">
                            <p>{ message }</p>
                            <button className="text-xl" onClick={ handleHideMessage }>
                                <IoIosCloseCircle />
                            </button>
                        </div>
                    )
                }
                <Input 
                    inputData={{ id: 'email', type: 'email', placeholder: 'johndoe@email.com', required: true }} 
                    labelData={{ text: 'Ingresa tu correo electronico' }}
                    handleChange={ handleChangeEmail }
                />
                <Input 
                    inputData={{ id: 'password', type: 'password', placeholder: '••••••••', required: true }} 
                    labelData={{ text: 'Ingresa tu contraseña' }}
                    handleChange={ handleChangePassword }
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input type="checkbox" id="remember" aria-describedby="remember" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme?</label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Contraseña olvidada?</a>
                </div>
                <ButtonSubmit text="Iniciar Sesíon"/>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    ¿No tienes cuenta? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">¡Registrate!</Link>
                </p>
            </form>
        </Auth>
    );
};

export default Login;
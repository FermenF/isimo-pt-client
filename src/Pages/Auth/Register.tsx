import React, { useState } from "react";
import Auth from "./components/Auth";
import Input from "./components/Input";
import { IoIosCloseCircle } from "react-icons/io";
import ButtonSubmit from "./components/ButtonSubmit";
import { Link } from "react-router-dom";
import { authRegister } from "@services/auth.service";
import { getMessageError } from "@utils/axiosApiErrors";
import { validatePasswordConfirmation, validatePasswordRegex } from "@utils/passwordValidation";

const Register: React.FC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resultMessage, setResultMessage] = useState({ type: '', message: '' });

    const [validatePassword, setValidatePassword] = useState<string[]>([]);
    const [validateConfirmPassword, setValidateConfirmPassword] = useState(false);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setValidatePassword(validatePasswordRegex(e.target.value));
    };

    const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setValidateConfirmPassword(validatePasswordConfirmation(password, e.target.value));
    };

    const handleHideResultMessage = () => {
        setResultMessage({ type: '', message: '' });
    };

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await authRegister({ name, email, password, password_confirmation: confirmPassword });
            setResultMessage({ type: 'success', message: result.message });
            setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
        } catch (error) {
            setResultMessage({ type: 'danger', message: getMessageError(error) });
        }
    };

    return (
        <Auth title="Registrate y disfruta">
            <form className="space-y-4" onSubmit={ handleSubmitForm }>
                {
                    resultMessage.message && (
                        <div className={`p-2 rounded-md ${resultMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50  text-red-700'} flex items-center justify-between`}>
                            <p>{ resultMessage.message }</p>
                            <button className="text-xl" onClick={ handleHideResultMessage }>
                                <IoIosCloseCircle />
                            </button>
                        </div>
                    )
                }
                <Input
                    inputData={{ id: 'name', type: 'text', placeholder: 'John Doe', required: true }}
                    labelData={{ text: 'Ingresa tu nombre' }}
                    handleChange={handleChangeName}
                />
                <Input
                    inputData={{ id: 'email', type: 'email', placeholder: 'johndoe@email.com', required: true }}
                    labelData={{ text: 'Ingresa tu correo electronico' }}
                    handleChange={handleChangeEmail}
                />
                <Input
                    inputData={{ id: 'password', type: 'password', placeholder: '••••••••', required: true }}
                    labelData={{ text: 'Ingresa tu contraseña' }}
                    handleChange={handleChangePassword}
                />
                {
                    validatePassword.length > 0 && (
                        <div className="p-1 bg-red-50 text-red-700 rounded-md">
                            <ul className="px-2">
                                {validatePassword.map((validation, i) => (
                                    <li key={i}>- {validation}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                <Input
                    inputData={{ id: 'password_confirmation', type: 'password', placeholder: '••••••••', required: true }}
                    labelData={{ text: 'Confirmar contraseña' }}
                    handleChange={handleChangeConfirmPassword}
                />
                {
                    confirmPassword && validateConfirmPassword === false && (
                        <div className="p-1 bg-red-50 text-red-700">
                            <ul>
                                <li>- Contraseña y confirmar contraseña no coinciden</li>
                            </ul>
                        </div>
                    )
                }
                <ButtonSubmit text="Registrarse" disabled={confirmPassword && validateConfirmPassword === true ? false : true} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    ¿Ya tienes cuenta? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">¡Inicia Sesión!</Link>
                </p>
            </form>
        </Auth>
    );
};

export default Register;
import React from "react";

interface InputProps {
    labelData: {
        text: string
    };
    inputData: {
        id: 'email' | 'password' | 'name' | 'password_confirmation'
        type: 'email' | 'password' | 'text';
        placeholder: string;
        required: boolean;
    },
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ labelData, inputData, handleChange}) => {
    return (
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">{ labelData.text }</label>
            <input 
                type={ inputData.type } 
                name={ inputData.id } 
                id={ inputData.id } 
                placeholder={ inputData.placeholder } 
                required={ inputData.required }
                onChange={ handleChange }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
        </div>
    );
};

export default Input;
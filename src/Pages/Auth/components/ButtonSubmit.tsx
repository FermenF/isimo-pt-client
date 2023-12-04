import React from "react";

interface ButtonSubmitProps {
    text:     string;
    disabled?: boolean
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ text, disabled }) => {
    return(
        <button type="submit" disabled={ disabled }
        className={`w-full text-white  hover:bg-primary-700 ${disabled ? 'cursor-not-allowed bg-slate-500' : 'bg-slate-950'}
        focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
        { text }
        </button>
    );
};

export default ButtonSubmit;
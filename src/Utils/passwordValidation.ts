export function validatePasswordRegex(password: string): string[] {
    const messages = [];

    if (!/(?=.*[a-z])/.test(password)) {
      messages.push('Debe contener al menos una letra minúscula.');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      messages.push('Debe contener al menos una letra mayúscula.');
    }
    if (!/(?=.*\d)/.test(password)) {
      messages.push('Debe contener al menos un dígito.');
    }
    if (!/(?=.*[@$!%*?&#])/.test(password)) {
      messages.push('Debe contener al menos un símbolo entre @$!%*?&#.');
    }
    if (password.length < 6) {
      messages.push('La longitud mínima es 6 caracteres.');
    }
    return messages;
};

// Compare password and confirm password
export function validatePasswordConfirmation(password: string, confirmPassword: string): boolean {
    if(password === confirmPassword){
        return true;
    };
    return false;
};
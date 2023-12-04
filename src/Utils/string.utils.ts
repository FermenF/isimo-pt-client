export const capitalizeText = (text: string | undefined): string | undefined => {
    if (text){
        return text.replace(/\b\w/g, char => char.toUpperCase());
    }
};
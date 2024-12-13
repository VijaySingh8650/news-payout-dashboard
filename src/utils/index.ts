import { format, parseISO } from "date-fns";


export const convertDate = (date: string) =>{

    const parsedDate = parseISO(date);
    return format(parsedDate, "do MMMM yyyy");

}


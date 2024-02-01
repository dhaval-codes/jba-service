export const extractMonthAndYear = (dateString) =>  {
    const dateObject = new Date(dateString);
    
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return { month, year };
}


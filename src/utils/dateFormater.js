export const convertToDateFormat = (dateTimeLocal) => {
    if (!dateTimeLocal) {
        return '';
    }
 
    const [date, time] = dateTimeLocal.split("T"); 
    const [year, month, day] = date.split("-"); 
    const [hour, minute] = time.split(":"); 
    
    const formattedTime = `${hour}:${minute}:00`;

    return `${day}/${month}/${year}, ${formattedTime}`;
}; // memo regist


export const convertToDateCalculate = (dateTimeLocal) => {
    if (!dateTimeLocal) {
      return ""; 
    }
    
    const [date, time] = dateTimeLocal.split(", ");
    const [day, month, year] = date.split("/");
  
    return `${year}-${month}-${day}`;
  };

  export const convertToDate = (dateTimeLocal) => {
    if (!dateTimeLocal) {
        return '';
    }
    const [date] = dateTimeLocal.split("T");

    return date; 
};
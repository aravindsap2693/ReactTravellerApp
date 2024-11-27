export const formatDateStringToYYYYMMDD = (dateString: Date): string => {
  const date = new Date(dateString); // Parse the date string into a Date object
    const year = date.getFullYear(); // Get the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1) and pad
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad
  
    return `${year}-${month}-${day}`; // Return the formatted string
  };
  
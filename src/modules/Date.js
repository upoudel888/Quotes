function getCurrentDate() {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = months[date.getMonth()];
    const day = date.getDate();
  
    const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${month} ${day}`;
    return formattedDate;
  }
  
export default getCurrentDate;
  
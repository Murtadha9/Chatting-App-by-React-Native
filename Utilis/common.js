export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export const getRoomId=(userId1,userId2)=>{
  const sortedIds=[userId1,userId2].sort();
  const roomId=sortedIds.join('-');
  return roomId;

}


export const formatDate=date=>{
  var day=date.getDate();
  var monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var month=monthNames[date.getMonth()]

  var formattedDate =day +' '+ month
  return formattedDate;


}


export const formatTime = (date) => {
  let hours = date.getHours(); // Get the hours
  const minutes = date.getMinutes(); // Get the minutes

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format hours and minutes to ensure they are two digits
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedTime;
}




  
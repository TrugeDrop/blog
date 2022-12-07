// date
const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${ minutes }`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${ prefomattedDate } saat ${ hours }:${ minutes }`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${ day } ${ month } saat ${ hours }:${ minutes }`;
  }

  // 10. January 2017. at 10:20
  return `${ day } ${ month } ${ year }. saat ${ hours }:${ minutes }`;
}


// --- Main function
function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return 'Şimdi';
  } else if (seconds < 60) {
    return `${ seconds } saniye önce`;
  } else if (seconds < 90) {
    return 'yaklaşık bir dakika önce';
  } else if (minutes < 60) {
    return `${ minutes } dakika önce`;
  } else if (isToday) {
    return getFormattedDate(date, 'Bugün'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Dün'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
}

// Create User ID
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
if(!localStorage.getItem("id")){
    localStorage.setItem("id", makeid(18));
}

/*theme
function setTheme(run){
  if(localStorage.getItem("theme") === "dark"){
    localStorage.setItem("theme", "light");
  }else{
    localStorage.setItem("theme", "dark");
  }

  if(run === 'true') theme();
}

function theme(){
  if(localStorage.getItem("theme") === "dark"){
    darkTheme();
  }else{
    lightTheme();
  }
}

function darkTheme(){
  $('body').addClass("background-dark");
  $('.card').addClass("background-default");
  $('#footer').addClass("footer-dark");
  $('.form-control').removeClass("form-control").addClass("pkcss-input");
  $('#theme-toogle i').removeClass("bi-sun").addClass("bi-moon-stars");
};

function lightTheme(){
  $('body').removeClass("background-dark");
  $('.card').removeClass("background-default");
  $('#footer').removeClass("footer-dark");
  $('.pkcss-input').removeClass("pkcss-input").addClass("form-control");
  $('#theme-toogle i').removeClass("bi-moon-stars").addClass("bi-sun");
};*/
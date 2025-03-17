let day;
let now;
let newD;
let user;
let hour;
let data;
let data2;
let layout;
let monday;
let friday;
let layout2;
let tuesday;
let weekdays;
let thursday;
let checkbox;
let username;
let wednesday;
let nextMonday;
let totalDone = 0;
let d = new Date();
let totalHours = 45;
let totalScheduled = 0;
const h24 = 60 * 60 * 24 * 1000;
const main = document.getElementById('main');
const nextWk = document.getElementById('nextWeek');
const prevWk = document.getElementById('prevWeek');
const init = (d) => {
  localStorage.getItem("username")
    ? (
      username = localStorage.getItem('username'),
      document.getElementById('username').innerHTML = `Hi ${username}, welcome to your time analysis.`,
      document.getElementById('username').style.fontWeight = 'normal'
    )
    : (window.location.href = "/");
};
init(d);


if (!localStorage.getItem("username")) {
  window.location.href = "/";
};

const h24 = 60 * 60 * 24 * 1000;
let now = Date.now();
let d = new Date(now);
let newD = new Date(now);
let nextMonday = Date.now();
const main = document.getElementById('main');

let user;
let dateTimes;
let totalDone = 0;
let totalHours = 45;
let totalScheduled = 0;
const username = localStorage.getItem("username");

const handleChange = dayTime => {

  let [d, h] = dayTime.split("_");
  let day = document.getElementById(d);
  let hour = day.querySelector(`._${h}`);
  let checkbox = day.querySelector(`._${h}[type=checkbox]`);

  checkbox.checked == false
    ? (
      hour.style.textDecoration = "none"
    ) : (
      hour.style.textDecoration = "line-through"
    );

  user.tasks = user.tasks.filter(obj => obj.date !== dayTime);
  user.tasks.push({ date: dayTime, task: hour.value, status: checkbox.checked ? "done" : "pending" });

  fetch('/api/data', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
};

const handleStorage = async () => {

  await fetch('/api/data', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  }).then(res => res.json()).then(data => {
    user = data;
  });

  dateTimes = user.tasks.map(obj => obj.date);
};

const gaugeFx = dateTimes => {

  console.log('test: ', dateTimes);
  
  weekdays.forEach((day, i) => {
      dateTimes.forEach(dayTime => {
        if (dayTime.includes(day)) {
          totalScheduled += 1;

          if (user.tasks.find(obj => obj.date == dayTime).status == "done") {
            totalDone += 1
          };
        };
      });
  });

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalScheduled / totalHours * 100,
      title: { text: "Quality" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: {
        axis: { range: [0, 100] },
        bar: { color: "red" },
        steps: [
          { range: [0, 50], color: "black" },
          { range: [51, 74], color: "yellow" },
          { range: [75, 100], color: "green" }
        ]
      }
    }
  ];

  var layout = { width: 300, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart1', data, layout);

  var data2 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalDone / (totalScheduled == 0 ? 45 : totalScheduled) * 100,
      title: { text: "Efficiency" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: {
        axis: { range: [0, 100] },
        bar: { color: "red" },
        steps: [
          { range: [0, 50], color: "black" },
          { range: [51, 74], color: "yellow" },
          { range: [75, 100], color: "green" }
        ]
      }
    }
  ];

  var layout2 = { width: 300, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart2', data2, layout2);

  var data = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      gauge: { shape: "bullet" },
      delta: { reference: 100 },
      value: 50,
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Quality" }
    }
  ];

  var layout = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 } };
  Plotly.newPlot('chart1b', data, layout);

  var data = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      gauge: { shape: "bullet" },
      delta: { reference: 100 },
      value: 50,
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Efficiancy" }
    }
  ];

  var layout = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 } };
  Plotly.newPlot('chart2b', data, layout);
};

const findNextMon = () => {
  if (new Date(nextMonday).getDay() == 1) nextMonday = nextMonday + h24;

  while (new Date(nextMonday).getDay() != 1) {
    nextMonday = nextMonday + h24
  };

  main.classList.toggle("slideLeftOut", true);
  setTimeout(() => {
    main.innerHTML = "";
    newD = new Date(nextMonday);
    init(newD);
  }, 500);
  setTimeout(() => {
    main.classList.toggle("slideLeftOut", false);
  }, 1000);
};

const findPrevMon = () => {

  nextMonday = nextMonday - 7 * h24;
  while (new Date(nextMonday).getDay() != 1) {
    nextMonday = nextMonday - h24
  };

  main.classList.toggle("slideRightOut", true);
  setTimeout(() => {
    main.innerHTML = "";
    newD = new Date(nextMonday);
    init(newD);
  }, 500);
  setTimeout(() => {
    main.classList.toggle("slideRightOut", false);
  }, 1000);
};

const init = (dateTimes) => {

  
  // localStorage.clear();

  document.getElementById("username").innerText = `Welcome ${username}`;

  handleStorage();

    if (dateTimes) {
      dateTimes.forEach(dayTime => {
        let [d, h] = dayTime.split("_");
        let day = document.getElementById(d);

        if (day?.querySelector(`._${h}`)) {

          let hour = day.querySelector(`._${h}`);
          let checkbox = day.querySelector(`._${h}[type=checkbox]`);

          hour.value = user.tasks.find(obj => obj.date === dayTime).task;

          if (user.tasks.find(obj => obj.date === dayTime).status === "done") {
            checkbox.checked = true;
            hour.style.textDecoration = "line-through";
          }
        }
      });
    }

    console.log('dateTimes: ', dateTimes);
    

    // gaugeFx(dateTimes);

  };

  handleStorage();

  currentDay.innerText = `${d.toDateString()}, ${d.toLocaleTimeString()}`;
  currentDay2.innerText = `${d.toDateString()}, ${d.toLocaleTimeString()}`;

  let monday = new Date(d.getDay != 1 ? d - (d.getDay() - 1) * 86400000 : d).toDateString().split(' ').join('');
  let tuesday = new Date(d.getDay != 1 ? d - (d.getDay() - 2) * 86400000 : d).toDateString().split(' ').join('');
  let wednesday = new Date(d.getDay != 1 ? d - (d.getDay() - 3) * 86400000 : d).toDateString().split(' ').join('');
  let thursday = new Date(d.getDay != 1 ? d - (d.getDay() - 4) * 86400000 : d).toDateString().split(' ').join('');
  let friday = new Date(d.getDay != 1 ? d - (d.getDay() - 5) * 86400000 : d).toDateString().split(' ').join('');

  const weekdays = [monday, tuesday, wednesday, thursday, friday];
  const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

  main.innerHTML = "";

  weekdays.forEach((date, i) => {

    main.innerHTML += `
    <section id=${date} class=${new Date() - d > 86400000 ? "past" :
        new Date() - d < -86400000 ? "future" :
          i + 1 < d.getDay() ? "past" :
            i + 1 == d.getDay() ? "present" : "future"
      }>
      
      <h5>${i == 0 ? 'Monday' :
        i == 1 ? 'Tuesday' :
          i == 2 ? 'Wednesday' :
            i == 3 ? 'Thursday' : 'Friday'
      }</h5>
    </section>`;

    let div = document.getElementById(date);
    hours.forEach(hour => {
      div.innerHTML +=
        div.classList.contains("past") ?
          `
      <div>
      <h5>${hour}</h5>
      <input class="_${hour}" disabled />
      <input class="_${hour}" disabled type="checkbox" />
      </div>
      ` :
          div.classList.contains("future") ?
            `
          <div>
            <h5>${hour}</h5>
            <input class="_${hour}" onChange="handleChange('${date}_${hour}')" />
            <input class="_${hour}" disabled type="checkbox" />
          </div>
        `:
            `
          <div>
            <h5>${hour}</h5>
            <input class="_${hour}" onChange="handleChange('${date}_${hour}')" />
            <input class="_${hour}" onChange="handleChange('${date}_${hour}')" type="checkbox" />
          </div>
        `
    });
  });

const nextWk = document.getElementById('nextWeek');
const prevWk = document.getElementById('prevWeek');

nextWk.addEventListener('click', findNextMon);
prevWk.addEventListener('click', findPrevMon);

const showToday = () =>
  main.scrollTo({
    left: document.querySelector('.present').getBoundingClientRect().x - main.getBoundingClientRect().x,
    behavior: 'smooth'
  });

today.onclick = () => {
  init(new Date());
  showToday();
}

init(dateTimes);
// showToday();

let d = new Date();
let store = [];
let main = document.getElementById('main');

const handleStorage = async () => {

  store = await localStorage.dayTime ? JSON.parse(localStorage.dayTime) : {};

  let keys = Object.keys(store)

  if (keys) {
    keys.forEach(dayTime => {
      let [d, h] = dayTime.split("_");
      let day = document.getElementById(d);
      let hour = day.querySelector(`._${h}`);
      let checkbox = day.querySelector(`._${h}[type=checkbox]`);
      let value = store[dayTime].split("_");
      hour.value = value[0];

      if (value[1]) {
        checkbox.checked = true;
        hour.style.textDecoration = "line-through";
      }
    });
  }

  let totalDone = 0;
  let totalHours = 0;
  let totalScheduled = 0;

  weekdays.forEach((day, i) => {
    if (i + 1 < d.getDay()) {
      totalHours += 9;

      keys.forEach(dayTime => {
        if (dayTime.includes(day)) {
          totalScheduled += 1;

          if (store[dayTime].includes("done")) {
             totalDone += 1
          };
        };
      });
    }
  });

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalScheduled / totalHours * 100,
      title: { text: "Quality" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: { axis: { range: [null, 100] } }
    }
  ];

  var layout = { width: 250, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart1', data, layout);

  console.log(totalDone, totalScheduled);
  

  var data2 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalDone / totalScheduled * 100,
      title: { text: "Efficiency" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: { axis: { range: [null, 100] } }
    }
  ];

  var layout2 = { width: 250, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart2', data2, layout2);
};

handleStorage();

currentDay.innerText = `${d.toDateString()}, ${d.toLocaleTimeString()}`;

const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

weekdays.forEach((day, i) => {
  main.innerHTML += `
    <section id=${day} class=${i + 1 < d.getDay() ? "past" : i + 1 == d.getDay() ? "present" : "future"} >
      <h5>${day}</h5>
    </section>`;

  let div = document.getElementById(day);
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
            <input class="_${hour}" onChange="handleChange(this, '${day}_${hour}')" />
            <input class="_${hour}" disabled type="checkbox" />
          </div>
        `:
          `
          <div>
            <h5>${hour}</h5>
            <input class="_${hour}" onChange="handleChange(this, '${day}_${hour}')" />
            <input class="_${hour}" onChange="handleCheck('${day}_${hour}')" type="checkbox" />
          </div>
        `
  });
});

const handleChange = (e, dayTime) => {
  store[dayTime] = e.value;
  localStorage.dayTime = JSON.stringify(store);
}

const handleCheck = dayTime => {
  let value = store[dayTime];
  let [d, h] = dayTime.split("_");
  let day = document.getElementById(d);
  let hour = day.querySelector(`._${h}`);
  let checkbox = day.querySelector(`._${h}[type=checkbox]`);

  value.includes("done") 
    ? (
      value = value.replace("_done", ""),
      hour.style.textDecoration = "none"
    ) : (
      value = `${value}_done`,
      hour.style.textDecoration = "line-through"
    );

  store[dayTime] = value;
  localStorage.dayTime = JSON.stringify(store);
};


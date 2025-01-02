let d = new Date();
let store = [];
let main = document.getElementById('main');

console.log(d.getDay())
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
  let value = store[dayTime]
  value = `${value}_done`;
  store[dayTime] = value;
  localStorage.dayTime = JSON.stringify(store);

}

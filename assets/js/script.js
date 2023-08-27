let d = new Date();
let store = localStorage.hours ? JSON.parse(localStorage.hours) : [];
currentDay.innerText = `${d.toDateString()}, ${d.toLocaleTimeString()}`;

const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

main.innerHTML=""

hours.forEach((hour,i) => {
  let rH = i+9;
  let cH = d.getHours();

  main.innerHTML += `
      <div class="row time-block ${rH<cH ? 'past' : rH>cH ? 'future' : 'present'}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
  `
});
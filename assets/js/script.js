let d = new Date();
let store = [];
let main = document.getElementById('main');


const handleStorage = async () => {

  store = await localStorage.hours ? JSON.parse(localStorage.hours) : [];
  
  if(store.length) {
    store.forEach((el,i) => {
      $('textarea').eq(i).val(el);
    });
  }
};

handleStorage();

currentDay.innerText = `${d.toDateString()}, ${d.toLocaleTimeString()}`;

const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

weekdays.forEach(day => {
  main.innerHTML += `
    <section id=${day}>
      <h5>${day}</h5>
    </section>`;

    let div=document.getElementById(day);
    hours.forEach(hour => {
        div.innerHTML += `
          <div>
            <h5>${hour}</h5>
            <input onChange="handleChange(this, '${day} ${hour}')" />
            <input type="checkbox" />
          </div>
        `
    });
});

const handleChange = (e, dayTime) => {
  console.log(dayTime, e.value)
  localStorage[dayTime]=e.value;
  console.log(localStorage);
}

// hours.forEach((hour,i) => {
//   let rH = i+9;
//   let cH = d.getHours();

//   main.innerHTML += `
//       <div class="row time-block ${rH<cH ? 'past' : rH>cH ? 'future' : 'present'}">
//         <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
//         <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
//         <button class="btn saveBtn col-2 col-md-1" aria-label="save">
//           <i class="fas fa-save" aria-hidden="true"></i>
//         </button>
//       </div>
//   `
// });

document.onclick = e => {
  if (e.target.classList.contains("saveBtn")) {
    store = [];
    $('textarea').each((i,el) => {
      store.push(el.value);
    });

    localStorage.hours = JSON.stringify(store);
  }
}
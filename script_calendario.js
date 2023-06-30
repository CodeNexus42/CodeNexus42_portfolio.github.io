//Declaración de constantes
const calendar = document.querySelector(".calendar");
  date = document.querySelector(".date");
  daysContainer = document.querySelector(".days");
  prev = document.querySelector(".prev");
  next = document.querySelector(".next");
  todayBtn = document.querySelector(".today-btn");
  gotoBtn = document.querySelector(".goto-btn");
  dateInput = document.querySelector(".date-input");
  eventDay = document.querySelector(".event-day");
  eventDate = document.querySelector(".event-date");
  eventsContainer = document.querySelector(".events");
  //addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".cita-space");
  addEventCloseBtn = document.querySelector(".close");
  submitBtn = document.querySelector(".submit-button");
  citas = document.getElementById("citas");

// Declaración de variables let 
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

//Declaración de la constante meses
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "April",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const eventsArr = [];
const citasArr = [];

const hoursCreator = function(){
  const hoursArr = new Array(6); 
  var a = 0;  
  // 9 - 3 am / 12 horas
  for(var h = 9; h < 16; h++){
    var hora = h;
    hoursArr[a] = hora.toString() + ":00" + " h";
    a ++;
  }
  return hoursArr;
}

const hoursCitas = hoursCreator();

const weekSplit = function (){
  const weekArr = new Array(51);

  var m = 1;
  var d = 1;

  for(var s = 0; s < 51; s++){
    weekArr[s] = new Array(7);
    for(var dw = 0; dw < 7; dw++){
      if(m == 2){
        if(d == 29){
          m ++;
          d = 1;
        }
      }
      else if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
        if(d == 32){
          m ++;
          d = 1;
        }
      }
      else if(m == 4 || m == 6 || m == 9 || m == 11){
        if(d == 31){
          m ++;
          d = 1;
        }
      } 
  
      weekArr[s][dw] = new Array(2);

      weekArr[s][dw][0] = m;
      weekArr[s][dw][1] = d;
      d ++;
    }
  }
  return weekArr;
}

const weekensArr = weekSplit();
//console.log(weekensArr[8][2][1]);

function arrayCreate(a, h){

  const nomCita = "Cita disponible";
  const y = 2023;

  for (var w = 6; w < 23; w ++){ 
    if (w == 11 || w == 17 || w == 23 || w ==29){
      w ++;
    }

    for (var d = 1; d < 6; d++){
      for(var o = 0; o < 6; o++){
        if(
          a[w][d][1] <= new Date().getDate() &&
          a[w][d][0] === new Date().getMonth() + 1
        ){
          if (d === 5){
            o = -2;
            w ++;
            d = 1;
          }
          else{
            //o = o - 2;
            d ++;
          }
        }
        else{
          eventsArr.push( 
            {
                day: a[w][d][1],
                month: a[w][d][0],
                year: y,
                events: [
                  {
                    title: nomCita,
                    time: h[o],
                  },
                ],
            },
          );
        }
      }
    }
  }  
}

arrayCreate(weekensArr, hoursCitas);

getEvents();
//getCitas();

//Función para incializar calendario
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) { 
    //Revisar si el evento si esta en ese día
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//Función para añadir el mes y año en medio de los botones prev y next
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//Función para iluminar el día
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //Remover la iluminación
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //Si se pica en prev-date o next-date cambiar el mes
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //Agregar iluminación incluso si se cambio de mes
        setTimeout(() => {
          //Agregar iluminación aunque no haya prev-date o next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //Agregar iluminación al día en que se hace clic después de que se cambie el mes
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  //console.log("aquí");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Fecha invalida");
}

//Función para obtener el nombre del día y la fecha completa del día seleccionado y actualiza el día del evento fecha del evento
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const options = { weekday: 'long'}
  const dayName = day.toLocaleDateString('es-MX',options).toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//Función que despliega las citas disponibles en el día seleccionado
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3 style="margin-top: 100px">No hay citas<br>para este día.</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    //submitBtn.addEventListener("click", (e) => {
    //if (confirm("Ingresa los datos que se te piden a continuación para agendar tu cita.")) {
      addEventWrapper.classList.toggle("active");
      const eventTime = e.target.children[1].children[0].innerHTML;
      //alert(eventTime);
      eventsArr.forEach((event) => {
        //alert(event.day);
        //alert(event.month);
        if(citas.onsubmit){
          if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
          ) {
            event.events.forEach((item, index) => {
              //alert(eventTime);
              //alert(item.time);
              if (item.time === eventTime) {    
                //alert(eventTime);   
                //alert(event.day);                        
                citasArr.push(event.day);
                //alert(citasArr[0]);      
                citasArr.push(event.month);
                citasArr.push(event.year);
                citasArr.push(item.time);
                event.events.splice(index, 1);
              }
            });
            //si no quedan citas en el día, se elimina el día de eventsArr
            if (event.events.length === 0) {
              eventsArr.splice(eventsArr.indexOf(event), 1);
              // remueve la clase evento del día
              const activeDayEl = document.querySelector(".day.active");
              if (activeDayEl.classList.notcontains("event")) {
                activeDayEl.classList.remove("event");
              }
            }
          }
        }
      });
      updateEvents(activeDay);
    //}
  }
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});


//Función para guardar citas en el almacenamiento local
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
  localStorage.setItem("events", JSON.stringify(citasArr));
}

//Función para obtener citas del almacenamiento local
function getEvents() {
  //Revisa si los eventos ya están guardados en el almacenamiento local y luego devuelve el evento o nada
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

//Función para obtener citas del almacenamiento local
/*function getCitas() {
  //Revisa si los eventos ya están guardados en el almacenamiento local y luego devuelve el evento o nada
  if (localStorage.getItem("citas") === null) {
    return;
  }
  citasArr.push(...JSON.parse(localStorage.getItem("citas")));
}*/

function getData(){
  const name = document.getElementById("name").value;
    numberOne = document.getElementById("numberOne").value;
    numberTwo = document.getElementById("numberTwo").value;
    emailOne = document.getElementById("emailOne").value;
    emailTwo = document.getElementById("emailTwo").value;
    asunto = document.getElementById("asunto").value;
    explain = document.getElementById("explain").value;
    day = citasArr[citasArr.length - 4];
    month = citasArr[citasArr.length - 3];
    year = citasArr[citasArr.length - 2];
    tiempo = citasArr[citasArr.length - 1];

  const spTime = tiempo.split(':');
  //agrega un cero a la izqueirda a los meses con un solo dígito
  function mes(m){
    if(m < 10) {
      m =  "0" + month.toString();
    } else { 
      m = month.toString();
    }
    return m;
  }

  // agrega un cero a la izqueirda a los días con un solo dígito 
  function dia(d){
    if(d < 10) {
      d =  "0" + day.toString();
    } else { 
      d = day.toString();
    }
    return d;
  }

  const date =  year.toString() + mes(month.toString()) + dia(day.toString()) + "T" + spTime[0] + "0000" + "Z"; 

  alert("Tu cita ha sido agendada con éxito el " + date + " a las " + tiempo);

  process.env.dataArr = {name, date, numberOne, numberTwo, emailOne, emailTwo, asunto, explain};

  // guarda la información de las citas en el almacenamiento interno 
  //localStorage.setItem("info_cliente", dataArr);

  alert(dataArr);
}
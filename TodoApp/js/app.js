const addBtn = document.getElementById("addTodo");
const todoText = document.getElementById("todo");
const todoList = document.getElementById("todoList");

// we create an id for each todo cause selecting and deleting from storage.
//
var id,
  LIST = [];

//we get the current date and time for each todo's add and complate..
function getDate() {
  let date = new Date();
  let DateObject = {
    currentDate: date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    currentTime: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  return DateObject;
}

// Set date on the header
document.getElementById("date").innerHTML = getDate().currentDate;

// Localstorage control and print screen local data
if (localStorage.getItem("TODO")) {
  LIST = JSON.parse(localStorage.getItem("TODO"));
  id = LIST.length;
  LIST.map((todo) => addTodo(todo));
} else {
  id = 0;
}

// set initial statuation of current todo and send addtodo method
addBtn.addEventListener("click", () => {
  //$(".header").css("background-image", 'url("https://www.w3resource.com/includes/jquery-images/jquery.gif")');

  if (!todoText.value) return;
  const { currentTime, currentDate } = getDate();
  id++;
  let todoObject = {
    todo: todoText.value,
    addTime: `${currentTime} / ${currentDate}`,
    complateTime: "-- : --  /  -- -- -- --",
    complated: false,
    trash: false,
    id: id,
  };
  addTodo(todoObject);
  setStorage(todoObject);
});

// add todo to screen a html element
function addTodo(todoObject) {
  const { todo, addTime, complateTime, complated, id } = todoObject;
  const done = complated ? "far fa-check-circle" : "far fa-circle";
  const line = complated ? "lineThrough" : "";

  todoList.insertAdjacentHTML(
    "beforeend",
    `<div class="todo card mb-1" id="${id}">
      <div class="TodoHeader card-header d-flex justify-content-between">
        <i class="complate ${done}"></i>
        <span class="todoTitle ${line}">${todo}</span>
        <i class="delete fas fa-trash-alt"></i>
      </div>
      <div class="status header-body">
        <p id="addTime">Added : ${addTime}</p>
        <p id="complateTime">Complated :${complateTime}</p>
      </div>
    </div>
            `
  );
  todoText.value = "";
}

// load each todo to local storage
function setStorage(todoObject) {
  LIST.push(todoObject);
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

//when click any element on the todo element
$("#todoList").click((event) => {
  let element = event.target; // this is any element on the todo element.

  // selection and control which element is this.
  if (element.attributes.class.value.includes("todoTitle")) {
    const status = element.parentNode.parentNode.querySelector(".status");
    $(status).slideToggle();
  }

  // click delete icon and remove this element on the screeen and storage
  else if (element.attributes.class.value.includes("delete")) {
    let currentID = element.parentNode.parentNode.id;
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
    LIST = LIST.filter((todo) => currentID != todo.id);
    localStorage.setItem("TODO", JSON.stringify(LIST));
  }

  // click complate icon and change status of element on the screen.
  if (element.attributes.class.value.includes("complate")) {
    let todoElement = element.parentNode.parentNode;
    complateTodo(todoElement); // this is todo element.
    element.classList.toggle("fa-check-circle");
    element.classList.toggle("fa-circle");
    element.parentNode.querySelector(".todoTitle").classList.toggle("lineThrough");
  }
});

// when a todo complated change Local storage.
const complateTodo = (todoElement) => {
  LIST.map((todo) => {
    if (todo.id == todoElement.id) {
      todo.complated = !todo.complated;
      let complateTime = todo.complated ? `${getDate().currentTime} / ${getDate().currentDate}` : "-- : --  /  -- -- -- --";
      todo.complateTime = complateTime;
      todoElement.querySelector("#complateTime").innerHTML = "Complated : " + complateTime;
      localStorage.setItem("TODO", JSON.stringify(LIST));
    }
  });
};

// clear all todo on the screen and storage.
$("#clear").click(() => {
  todoList.innerHTML = "";
  LIST = [];
  localStorage.clear();
});

//change header background
var currentHour = parseInt(getDate().currentTime.split(":")[0]);
var headerBack = currentHour <= 20 && currentHour >= 8 ? $(".header").css("background-image", 'url("asset/images/night.jpg")') : null;

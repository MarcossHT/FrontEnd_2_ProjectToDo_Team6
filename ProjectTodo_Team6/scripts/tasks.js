const token = JSON.parse(localStorage.getItem("user")).response.jwt;
const user = document.getElementById("user");
const newTask = document.getElementById("newTask");
const skeleton = document.getElementById("skeleton");
const settings = {
  method: "GET",
  headers: {
    "content-type": "application/json",
    authorization: token,
  },
};

function getMe() {
  fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", settings)
    .then((response) => response.json())
    .then((info) => {
      console.log(info);
      user.innerHTML = `${info.firstName} ${info.lastName}`;
    })
    .catch((err) => {
      return console.log(err);
    });
}

function getTasks() {
  fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", settings)
    .then((response) => response.json())
    .then((info) => {
      console.log(info);
      for(index of info) {
          console.log(index.description, index.completed);
          skeleton.innerHTML += `<li class="tarefa">
          <div class="not-done"></div>
          <div class="descricao">
            <p class="nome">${index.description}</p>
            <p class="timestamp">${index.createdAt}</p>
          </div>
        </li>
          `
      }
    });
}

function postTasks() {
  const data = {
    description: newTask.value,
    completed: false,
  };

  const settings = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  };

  fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", settings)
    .then((response) => response.json())
    .then((info) => {
      console.log(info);
    });
}

window.onload = getMe(), getTasks();

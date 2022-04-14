const token = JSON.parse(localStorage.getItem("user")).response.jwt;
const user = document.getElementById("user");
const newTask = document.getElementById("newTask");
const tasksToDo = document.getElementById("tasksToDo");
const skeleton = document.getElementById("skeleton");
const finishedTasks = document.getElementById("finishedTasks");
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
      skeleton.style.display = "none";

      tasksToDo.innerHTML = "";
      finishedTasks.innerHTML = "";
      for (index of info) {
        console.log(index.description, index.completed, index.createdAt);
        const dateFormat = new Date(index.createdAt).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
        if (index.completed === false) {
          tasksToDo.innerHTML += `<li class="tarefa">
            <div class="not-done" onclick="putTasks(${index.id}, true)"></div>
            <div class="descricao">
              <p class="nome">${index.description}</p>
              <p class="timestamp">${dateFormat}</p>
            </div>
          </li>
          `;
        } else {
          finishedTasks.innerHTML += `<li class="tarefa">
            <div class="not-done" onclick="putTasks(${index.id}, false)"></div>
            <div class="descricao">
              <p class="nome" id="${index.id}">${index.description}</p>
              <p class="timestamp">${dateFormat}
              <i class="ri-delete-bin-line" onclick="deleteTasks(${index.id})"></i>
              </p>
            </div>
          </li>
          `;
        }
      }
    })
    .catch((err) => {
      return console.log(err);
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
      const dateFormat = new Date(info.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      tasksToDo.innerHTML += `<li class="tarefa">
          <div class="not-done"  onclick="putTasks(${info.id}, true)"></div>
          <div class="descricao">
            <p class="nome">${info.description}</p>
            <p class="timestamp">${dateFormat}</p>
          </div>
        </li>
          `;
    })
    .catch((err) => {
      return console.log(err);
    });
}

function putTasks(id, status) {
  const data = {
    completed: status,
  };

  const settings = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  };

  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings)
    .then((response) => response.json())
    .then((info) => {
      console.log(info);
      getTasks();
    })
    .catch((err) => {
      return console.log(err);
    });
}

function deleteTasks(id) {
  const settings = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  };

  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settings)
    .then((response) => response.json())
    .then((info) => {
      console.log(info);
      getTasks();
    })
    .catch((err) => {
      return console.log(err);
    });
}

function closeApp() {
  localStorage.removeItem(`user`);
  window.location = "././index.html";
  console.log(`clicked`);
}

(window.onload = getMe()), getTasks();

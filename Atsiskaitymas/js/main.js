const form = document.querySelector("#new-task-form");
const inputTask = document.querySelector("#new-task-input");
const taskType = document.querySelector("#task-type");
const taskDate = document.querySelector("#task-date");

const userNamePost = document.querySelector("#user-name");
const userIdPost = document.querySelector("#user-id");
const userEmailPost = document.querySelector("#user-email");
const userLogOff = document.querySelector("#log-off");

const listElement = document.querySelector("#tasks");

userNamePost.innerHTML = localStorage.getItem("userName");
userIdPost.innerHTML = localStorage.getItem("userId");
userEmailPost.innerHTML = localStorage.getItem("userEmail");
const userId = localStorage.getItem("userId");

var alltasksRawData = tasksRawDataApi();


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = inputTask.value;
  
    if (!task) {
      alert("Please fill the task");
      return;
    } else {
      console.log(localStorage.getItem("userName"));
      console.log(task);
  
      fetch(`https://localhost:7171/api/ToDo`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          type: taskType.value,
          content: inputTask.value,
          endDate: taskDate.value,
        }),
      });
      alert("Successful");
      window.location.href = "main.html";
      return;
    }
  });

  userLogOff.addEventListener("click", () => {
    window.location.href = "../html/login.html";
    alert("Have a nice Day!!");
  });

function tasksRawDataApi() {
    fetch(`https://localhost:7171/api/ToDo`)
    .then((response) => response.json())
    .then((result) => {
        if (result.error) {
        console.log("Error");
        } else {
        for (let i = 0; i < result.length; i++) {
            if(result[i].userId == userIdPost.innerHTML) {
            console.log(result);
            console.log(result[i].id);

            //Tasko sukurimas
            const taskEl = document.createElement("div");
            taskEl.classList.add("tasks");

            const taskContentEl = document.createElement("div");
            taskContentEl.classList.add("content");
            taskEl.appendChild(taskContentEl);
            //Tasko inputas
            const taskInputTypeEl = document.createElement("input");
            taskInputTypeEl.classList.add("text");
            taskInputTypeEl.type = "text";
            taskInputTypeEl.value = result[i].type;
            taskInputTypeEl.setAttribute("readonly", "readonly");
            taskContentEl.appendChild(taskInputTypeEl);

            const taskInputTextEl = document.createElement("input");
            taskInputTextEl.classList.add("text");
            taskInputTextEl.type = "text";
            taskInputTextEl.value = result[i].content;
            taskInputTextEl.setAttribute("readonly", "readonly");
            taskContentEl.appendChild(taskInputTextEl);

            const taskInputDateEl = document.createElement("input");
            taskInputDateEl.classList.add("text");
            taskInputDateEl.type = "text";
            taskInputDateEl.value = result[i].endDate;
            taskInputDateEl.setAttribute("readonly", "readonly");
            taskContentEl.appendChild(taskInputDateEl);
            //Edit ir Delete idejimas
            const taskActionEl = document.createElement("div");
            taskActionEl.classList.add("action");

            const taskEditEl = document.createElement("button");
            taskEditEl.classList.add("edit");
            taskEditEl.innerHTML = "Edit";

            const taskDeleteEl = document.createElement("button");
            taskDeleteEl.classList.add("delete");
            taskDeleteEl.innerHTML = "Delete";

            taskActionEl.appendChild(taskEditEl);
            taskActionEl.appendChild(taskDeleteEl);
            taskEl.appendChild(taskActionEl);

            listElement.appendChild(taskEl);
            //Edit funkcija
            taskEditEl.addEventListener("click", () => {
              if (taskEditEl.innerText.toLowerCase() == "edit") {
                taskInputTextEl.removeAttribute("readonly");
                taskInputTypeEl.removeAttribute("readonly");
                taskInputDateEl.removeAttribute("readonly");
                taskInputTextEl.focus();
                taskInputTypeEl.focus();
                taskInputDateEl.focus();
                taskEditEl.innerHTML = "Save";

                taskEditEl.addEventListener("click", () => {
                  fetch(`https://localhost:7171/api/ToDo/${result[i].id}`, {
                    method: "PUT",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                      userId: userIdPost.innerHTML,
                      type: taskInputTypeEl.value,
                      content: taskInputTextEl.value,
                      endDate: taskInputDateEl.value,
                      id: result[i].id,
                    }),
                  });
                });
              } else {
                taskInputTypeEl.setAttribute("readonly", "readonly");
                taskInputTextEl.setAttribute("readonly", "readonly");
                taskInputDateEl.setAttribute("readonly", "readonly");
                taskEditEl.innerHTML = "Edit";
              }
            });
            taskDeleteEl.addEventListener("click", () => {
              fetch(`https://localhost:7171/api/ToDo/${result[i].id}`, {
                method: "DELETE",
              });
              window.location.href = "../html/main.html";
            });
            }
        }
        }
    });
}


import { lucky } from "./lucky.js";
import * as logic from "./logic.js";

const tasks_form = document.querySelector("#form");
const tasks_list = document.querySelector("#tasks-list");
const tasks_input = document.querySelector("#task");

const lucky_btn = document.querySelector("#lucky");
lucky_btn.addEventListener("click", () => {
  tasks_input.value = lucky();
});

//! Form handling:

tasks_form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask({ title: tasks_input.value, completed: false, urgent: false }, true);
  tasks_input.value = "";
});

//^ Task handling:

const addTask = (task, create = true) => {
  const task_el = document.createElement("li");
  const check_box = document.createElement("input");
  check_box.type = "checkbox";
  check_box.checked = task.completed;
  check_box.addEventListener("change", (e) => {
    checkTask(e.target.parentElement);
  });
  task_el.appendChild(check_box);
  const task_lbl = document.createElement("label");
  task_lbl.innerText = task.title;
  task_el.appendChild(task_lbl);
  const urgent_btn = document.createElement("button");
  urgent_btn.innerHTML = `<svg style = "pointer-events: none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="exclamation-mark">
  <path fill="#212121" d="M5.96072,4.45718 C5.72131,3.18031 6.70088,2 8,2 C9.29912,2 10.2787,3.18031 10.0393,4.45718 L9.18429,9.01713 C9.07743,9.58702 8.57983,10 8,10 C7.42017,10 6.92257,9.58703 6.81571,9.01713 L5.96072,4.45718 Z M9.5,12.5 C9.5,13.3284 8.82843,14 8,14 C7.17157,14 6.5,13.3284 6.5,12.5 C6.5,11.6716 7.17157,11 8,11 C8.82843,11 9.5,11.6716 9.5,12.5 Z"></path>
</svg>
`;

  urgent_btn.id = "urgent-btn";

  urgent_btn.addEventListener("click", (e) => {
    makeUrgent(e.target.parentElement);
    e.stopPropagation();
  });

  task_el.appendChild(urgent_btn);

  const edit_btn = document.createElement("button");
  edit_btn.innerHTML = `<svg style = "pointer-events: none" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  edit_btn.id = "edit-btn";
  edit_btn.addEventListener("click", (e) => {
    editTask(e.target.parentElement);
    e.stopPropagation();
  });
  task_el.appendChild(edit_btn);
  const remove_btn = document.createElement("button");
  remove_btn.innerHTML = `<svg style = "pointer-events: none" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 460.775 460.775" xml:space="preserve">
<path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
  </svg>`;
  remove_btn.id = "remove-btn";

  // const added_date = document.createElement("span");
  // added_date.classList.add("added-date");
  // added_date.textContent = task.addedDate;
  // task_el.appendChild(added_date);

  // const completed_date = document.createElement("span");
  // completed_date.classList.add("completed-date");
  // completed_date.textContent = task.completedDate;
  // task_el.appendChild(completed_date);

  task_el.appendChild(remove_btn);
  tasks_list.appendChild(task_el);

  if (task.urgent) task_el.classList.add("urgent");
  if (task.completed) task_el.classList.add("completed");
  if (create) {
    const new_task = {
      id: createUniqueID(),
      title: task.title,
      completed: false,
      urgent: false,
      addedDate: new Date(Date.now()).toLocaleString(),
      completedDate: null,
    };
    // added_date.textContent = new_task.addedDate;
    tasks.push(new_task);
    task_el.setAttribute("data-id", new_task.id);
    task_el.classList.add("show-anim");
    setTimeout(() => task_el.classList.remove("show-anim"), 200);
    checkSorting();
    if (tasks.length == 0) no_tasks.style.display = "block";
    else {
      no_tasks.style.display = "none";
    }
  } else {
    task_el.setAttribute("data-id", task.id);
  }

  logic.updateLocalStorage(tasks);

  remove_btn.addEventListener("click", (e) => {
    removeTask(e.target.parentElement);
  });
};

const rerenderList = () => {
  if (tasks.length == 0) no_tasks.style.display = "block";
  else no_tasks.style.display = "none";
  tasks_list.innerHTML = "";
  tasks.forEach((task) => {
    addTask(task, false);
  });
};

const checkSorting = () => {
  if (current_sort == "none") return;
  else if (current_sort == "completed") {
    tasks = logic.resortCompletedTasks(tasks);
  } else if (current_sort == "urgent") {
    tasks = logic.resortUrgentTasks(tasks);
  } else if (current_sort == "alphabetically") {
    tasks = logic.resortTasksAlphabetically(tasks);
  } else if (current_sort == "in progress") {
    tasks = logic.resortTasks(tasks);
  } else return;
  logic.updateLocalStorage(tasks);
  rerenderList();
};

//! ================================================================================================================
//! Array handling:

let current_sort = "none";

let tasks = logic.loadTasks();
tasks.forEach((task) => {
  addTask(task, false);
});
const no_tasks = document.querySelector("#no-tasks");
if (tasks.length == 0) no_tasks.style.display = "block";

console.log(tasks);

const createUniqueID = () => {
  let id =
    Math.random().toString(36).substring(2, 9) +
    Math.random().toString(36).substring(2, 9);
  tasks.forEach((task) => {
    if (task.id == id) createUniqueID();
    else return;
  });
  return id;
};

const checkTask = (e) => {
  e.classList.toggle("completed");
  tasks = tasks.map((task) => {
    if (task.id == e.getAttribute("data-id")) {
      task.completed = !task.completed;
      task.completedDate = new Date(Date.now()).toLocaleString();
      return task;
    }
  });

  checkSorting();
  logic.updateLocalStorage(tasks);
};

const removeTask = (e) => {
  confirmModal("delete this task", () => {
    e.classList.add("remove-anim");
    tasks = tasks.filter((task) => task.id != e.getAttribute("data-id"));
    showTopMsg("Task has been deleted!", "success");
    setTimeout(() => {
      e.remove();
      logic.updateLocalStorage(tasks);
      checkSorting();
      rerenderList();
    }, 200);
  });
};

const makeUrgent = (li) => {
  li.classList.toggle("urgent");
  tasks = tasks.map((task) => {
    if (task.id == li.getAttribute("data-id")) task.urgent = !task.urgent;
    return task;
  });
  checkSorting();
  logic.updateLocalStorage(tasks);
};

const editTask = (li) => {
  const task = tasks.find((task) => task.id == li.getAttribute("data-id"));
  const modal = document.createElement("div");
  const black_overlay = document.createElement("div");
  const form = document.createElement("form");
  const text = document.createElement("span");
  const input = document.createElement("input");
  const buttons = document.createElement("div");
  const save = document.createElement("button");
  const cancel = document.createElement("button");

  buttons.classList.add("buttons");
  save.id = "save";
  save.innerHTML = "Save";
  save.type = "submit";
  cancel.id = "cancel";
  cancel.type = "button";
  cancel.innerHTML = "Cancel";

  const closeModal = () => {
    modal.classList.add("hide");
    setTimeout(() => {
      modal.remove();
      black_overlay.remove();
    }, 200);
  };

  cancel.addEventListener("click", () => {
    closeModal();
  });

  input.value = task.title;
  input.required = true;

  text.innerHTML = "Edit task";
  buttons.appendChild(save);
  buttons.appendChild(cancel);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    task.title = input.value;
    checkSorting();
    logic.updateLocalStorage(tasks);
    closeModal();
    checkSorting();
    showTopMsg("Task edited successfully!", "success");
  });

  form.appendChild(text);
  form.appendChild(input);
  form.appendChild(buttons);
  modal.appendChild(form);

  modal.classList.add("modal");
  document.body.appendChild(modal);
  black_overlay.classList.add("black-overlay");
  black_overlay.addEventListener("click", () => {
    closeModal();
  });
  document.body.appendChild(black_overlay);
};

//? Action buttons:
const check_all_btn = document.querySelector("#check-all");
const uncheck_all_btn = document.querySelector("#uncheck-all");
const delete_checked_btn = document.querySelector("#delete-checked");
const sort_check = document.querySelector("#sort-checkbox");
const sort_btn = document.querySelector("#sort");

check_all_btn.addEventListener("click", (e) => {
  if (tasks.length == 0) {
    showTopMsg("There are no tasks!");
    return;
  }
  if (tasks.every((task) => task.completed)) {
    showTopMsg("All tasks are already completed!");
    return;
  }
  confirmModal(e.target.getAttribute("data-msg"), () => {
    tasks.forEach((task) => {
      task.completed = true;
    });
    logic.updateLocalStorage(tasks);
    rerenderList();
    showTopMsg("All tasks are now completed!", "success");
  });
});
uncheck_all_btn.addEventListener("click", (e) => {
  if (tasks.length == 0) {
    showTopMsg("There are no tasks!");
    return;
  }
  if (tasks.every((task) => !task.completed)) {
    showTopMsg("All tasks are already in progress!");
    return;
  }
  confirmModal(e.target.getAttribute("data-msg"), () => {
    tasks.forEach((task) => {
      task.completed = false;
    });
    logic.updateLocalStorage(tasks);
    rerenderList();
    showTopMsg("All tasks are now in progress!", "success");
  });
});
delete_checked_btn.addEventListener("click", (e) => {
  if (tasks.length == 0) {
    showTopMsg("There are no tasks!");
    return;
  }
  if (tasks.every((task) => !task.completed)) {
    showTopMsg("There are no completed tasks!");
    return;
  }
  confirmModal(e.target.getAttribute("data-msg"), () => {
    tasks = tasks.filter((task) => !task.completed);
    logic.updateLocalStorage(tasks);
    rerenderList();
    showTopMsg("All completed tasks have been deleted!", "success");
  });
});

sort_check.addEventListener("change", (e) => {
  e.target.parentElement.classList.toggle("control-choices");
});

const options = sort_btn.querySelectorAll("li");
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    const title = e.target.textContent.toLowerCase();
    if (title == "alphabetically") {
      tasks = logic.resortTasksAlphabetically(tasks);
      current_sort == title ? (current_sort = "none") : (current_sort = title);
    } else if (title == "completed") {
      tasks = logic.resortCompletedTasks(tasks);
      current_sort == title ? (current_sort = "none") : (current_sort = title);
    } else if (title == "urgent") {
      tasks = logic.resortUrgentTasks(tasks);
      current_sort == title ? (current_sort = "none") : (current_sort = title);
    } else if (title == "in progress") {
      tasks = logic.resortTasks(tasks);
      current_sort == title ? (current_sort = "none") : (current_sort = title);
    }
    logic.updateLocalStorage(tasks);
    rerenderList();
  });
});

const confirmModal = (msg, callBack) => {
  const modal = document.createElement("div");
  const black_overlay = document.createElement("div");
  const txt = document.createElement("span");
  const buttons = document.createElement("div");
  const confirm = document.createElement("button");
  const cancel = document.createElement("button");

  txt.innerHTML = `Are you sure you want to ${msg}?`;

  buttons.classList.add("modal-btns");
  confirm.id = "mod-confirm";
  confirm.innerHTML = "Confirm";
  confirm.type = "button";
  cancel.id = "mod-cancel";
  cancel.type = "button";
  cancel.innerHTML = "Cancel";

  const closeModalAnim = () => {
    modal.classList.add("hide");
    setTimeout(() => {
      modal.remove();
      black_overlay.remove();
    }, 200);
  };

  confirm.addEventListener("click", () => {
    callBack();
    closeModalAnim();
  });
  cancel.addEventListener("click", () => {
    closeModalAnim();
  });

  buttons.appendChild(confirm);
  buttons.appendChild(cancel);
  modal.appendChild(txt);
  modal.appendChild(buttons);
  modal.classList.add("modal");
  modal.classList.add("cfm-modal");
  document.body.appendChild(modal);
  black_overlay.classList.add("black-overlay");
  black_overlay.addEventListener("click", () => {
    closeModalAnim();
  });
  document.body.appendChild(black_overlay);
};

const showTopMsg = (msg, type = "info") => {
  const old_msg = document.querySelector(".top-msg");
  if (old_msg) {
    setTimeout(() => {
      old_msg.classList.add("hide-msg");
      setTimeout(() => {
        old_msg.remove();
      }, 200);
    }, 2000);
  }
  const top_msg = document.createElement("p");
  top_msg.classList.add("top-msg");
  top_msg.classList.add(type);
  top_msg.innerHTML = msg;
  document.body.appendChild(top_msg);
  setTimeout(() => {
    top_msg.classList.add("hide-msg");
    setTimeout(() => {
      top_msg.remove();
    }, 200);
  }, 2000);
};

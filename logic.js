//* Local Storage:

export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function clearTasks() {
  localStorage.removeItem("tasks");
}

export function updateLocalStorage(tasks) {
  clearTasks();
  saveTasks(tasks);
}

//! The main logic of this program is to rerender the whole page whenever the tasks change.

//& ===============================================================================================
//& Sorting:

export function resortTasks(tasks) {
  return tasks.sort((a, b) => a.completed - b.completed);
}

export function resortCompletedTasks(tasks) {
  return tasks.sort((a, b) => b.completed - a.completed);
}

export function resortUrgentTasks(tasks) {
  return tasks.sort((a, b) => b.urgent - a.urgent);
}

export function resortTasksAlphabetically(tasks) {
  return tasks.sort((a, b) => a.title.localeCompare(b.title));
}

//? ===============================================================================================
//? Action buttons:

export function checkAllTasks(tasks) {
  return tasks.reduce((acc, task) => {
    task.completed = true;
    return acc;
  });
}

export function uncheckAllTasks(tasks) {
  return tasks.reduce((acc, task) => {
    task.completed = false;
    return acc;
  });
}

export function deleteCheckedTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}

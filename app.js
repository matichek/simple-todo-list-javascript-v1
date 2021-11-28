loadEventListeners();

function loadEventListeners() {

  // get LS events
  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear
  clearBtn.addEventListener('click', clearTasks);

  // filter
  filter.addEventListener('keyup', filterTasks);

}

function getTasks() {
  let tasks;

  if(localStorage.getItem('tasks') === null) {

    tasks = [];

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {

          // create li element
      const li = document.createElement('li');
      li.className = "collection-item";

      // text
      li.appendChild(document.createTextNode(task));

      // link
      const link = document.createElement('a');

      link.className = "delete-item secondary-content";

      // add icon
      link.innerHTML = "<i class='fa fa-remove'></i>";

      // append
      li.appendChild(link);

      taskList.appendChild(li);

  });

}

function addTask(e) {

  if (taskInput === '') {
    alert('Add a task please');
  }

  // create li element
  const li = document.createElement('li');
  li.className = "collection-item";

  // text
  li.appendChild(document.createTextNode(taskInput.value));

  // link
  const link = document.createElement('a');

  link.className = "delete-item secondary-content";

  // add icon
  link.innerHTML = "<i class='fa fa-remove'></i>";

  // append
  li.appendChild(link);

  taskList.appendChild(li);

  // add to local storage
  storeTaskInLocalStorage(taskInput.value);



  taskInput.value = "";
  e.preventDefault();

}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {

    e.target.parentElement.parentElement.remove();

    // remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  }
}

// remove from ls

function removeTaskFromLocalStorage(taskItem) {

  let tasks;

  if(localStorage.getItem('tasks') === null) {

    tasks = [];

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// storetask 

function storeTaskInLocalStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {

    tasks = [];

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));


}

// clear tasks

function clearTasks() {

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from ls

  clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task) {
      const item = task.firstChild.textContent;

      if(item.toLowerCase().indexOf(text) != -1) {

        task.style.display = 'block';
        

      } else {
        task.style.display = 'none';
      }
    }
  )
} 


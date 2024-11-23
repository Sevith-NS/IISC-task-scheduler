const API_URL = 'http://localhost:5000/api/tasks'; // Backend API URL

// Show Notification
function showNotification(message, isError = false) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = isError ? 'error' : '';
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 5000);
}

// Fetch and Display Tasks
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks
      .map(
        (task) => `
        <div class="task">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Scheduled for: ${new Date(task.scheduleTime).toLocaleString()}</p>
          <p>Status: ${task.isCompleted ? 'Completed' : 'Pending'}</p>
          <button onclick="updateTask('${task._id}')">Update Task</button>
          <button onclick="deleteTask('${task._id}')">Delete Task</button>
        </div>`
      )
      .join('');
  } catch (error) {
    showNotification('Failed to fetch tasks', true);
  }
}

// Create Task
async function createTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const scheduleTime = document.getElementById('scheduleTime').value;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, scheduleTime }),
    });

    if (res.ok) {
      showNotification('Task created successfully!');
      fetchTasks();
    } else {
      const error = await res.json();
      showNotification(`Error: ${error.message}`, true);
    }
  } catch (error) {
    showNotification('Failed to create task', true);
  }
}

// Update Task
async function updateTask(id) {
  const newTitle = prompt('Enter new title:');
  const newDescription = prompt('Enter new description:');
  const newScheduleTime = prompt('Enter new schedule time (YYYY-MM-DDTHH:MM):');

  if (newTitle && newDescription && newScheduleTime) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription, scheduleTime: newScheduleTime }),
      });

      if (res.ok) {
        showNotification('Task updated successfully!');
        fetchTasks();
      } else {
        const error = await res.json();
        showNotification(`Error: ${error.message}`, true);
      }
    } catch (error) {
      showNotification('Failed to update task', true);
    }
  }
}

// Delete Task
async function deleteTask(id) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');

  if (confirmDelete) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showNotification('Task deleted successfully!');
        fetchTasks();
      } else {
        const error = await res.json();
        showNotification(`Error: ${error.message}`, true);
      }
    } catch (error) {
      showNotification('Failed to delete task', true);
    }
  }
}

// Initialize
fetchTasks();

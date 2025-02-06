// script.js

// Seleciona elementos do DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Carrega tarefas salvas no localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
});

// Adiciona uma nova tarefa
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
    saveTasks();
  }
});

// Função para adicionar uma tarefa à lista
function addTask(text, completed = false) {
  const li = document.createElement('li');

  // Cria o texto da tarefa
  const taskText = document.createElement('span');
  taskText.textContent = text;
  if (completed) {
    taskText.classList.add('completed');
  }

  // Cria o botão de exclusão
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Excluir';
  deleteBtn.classList.add('delete-btn');

  // Marca a tarefa como concluída ao clicar no texto
  taskText.addEventListener('click', () => {
    taskText.classList.toggle('completed');
    saveTasks();
  });

  // Remove a tarefa ao clicar no botão de exclusão
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  // Adiciona os elementos à lista
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Salva as tarefas no localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.querySelector('span').classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-md"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-md"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="mb-4">
        <button
          className={`p-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-l-md`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`p-2 ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`p-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-r-md`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span className={`flex-grow ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
            <button
              className="p-2 bg-red-500 text-white rounded-md"
              onClick={() => removeTask(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

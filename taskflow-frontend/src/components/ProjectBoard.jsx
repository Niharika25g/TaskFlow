import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import AddTask from './AddTask';

function ProjectBoard(props) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamically generate the authorization header using the logged-in user's credentials
  const authHeader = 'Basic ' + btoa(`${props.credentials.email}:${props.credentials.password}`);

  useEffect(() => {
    fetch('http://localhost:8081/api/tasks', {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      }
    })
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => console.error("Error fetching tasks:", error));
  }, [props.credentials]);

  const handleAddTask = (title, description, priority) => {
    fetch('http://localhost:8081/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        title: title,
        description: description,
        status: 'TODO',
        priority: priority
      })
    })
      .then(response => response.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
      })
      .catch(error => console.error("Error creating task:", error));
  };

  const handleDeleteTask = (id) => {
    fetch(`http://localhost:8081/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader
      }
    })
      .then(response => {
        if (response.ok) {
          setTasks(tasks.filter(task => task.id !== id));
        } else {
          console.error("Failed to delete task");
        }
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  const handleMoveTask = (id, newStatus) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedTask = { ...taskToUpdate, status: newStatus };

    fetch(`http://localhost:8081/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(savedTask => {
        setTasks(tasks.map(task => (task.id === id ? savedTask : task)));
      })
      .catch(error => console.error("Error updating task status:", error));
  };

  const boardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '20px'
  };

  const columnStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e1e4e8',
    width: '33%',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '65vh',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
      
      <AddTask onTaskAdded={handleAddTask} />

      <div style={{ marginBottom: '25px' }}>
        <input 
          type="text"
          placeholder="🔍 Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '14px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
        />
      </div>

      <div style={boardStyle}>
        
        {/* Column 1: To Do */}
        <div style={columnStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>To Do</h3>
          {tasks
            .filter(task => task.status === 'TODO' && task.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(task => (
              <TaskCard 
                key={task.id} 
                id={task.id}
                title={task.title} 
                description={task.description} 
                status={task.status}
                priority={task.priority}
                onDelete={handleDeleteTask}
                onMove={handleMoveTask}
              />
          ))}
        </div>

        {/* Column 2: In Progress */}
        <div style={columnStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>In Progress</h3>
          {tasks
            .filter(task => task.status === 'IN_PROGRESS' && task.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(task => (
              <TaskCard 
                key={task.id} 
                id={task.id}
                title={task.title} 
                description={task.description} 
                status={task.status}
                priority={task.priority}
                onDelete={handleDeleteTask}
                onMove={handleMoveTask}
              />
          ))}
        </div>

        {/* Column 3: Done */}
        <div style={columnStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>Done</h3>
          {tasks
            .filter(task => task.status === 'DONE' && task.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(task => (
              <TaskCard 
                key={task.id} 
                id={task.id}
                title={task.title} 
                description={task.description} 
                status={task.status}
                priority={task.priority}
                onDelete={handleDeleteTask}
                onMove={handleMoveTask}
              />
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default ProjectBoard;
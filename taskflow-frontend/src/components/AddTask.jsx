import React, { useState } from 'react';

function AddTask(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM'); // Default priority

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass title, description, AND priority up to ProjectBoard
    props.onTaskAdded(title, description, priority);
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
        required
      />
      <input 
        type="text" 
        placeholder="Task Description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '10px', flex: 2, borderRadius: '4px', border: '1px solid #ccc' }}
        required
      />
      {/* Priority Dropdown */}
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <button 
        type="submit" 
        style={{ backgroundColor: '#2ecc71', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        + Add Task
      </button>
    </form>
  );
}

export default AddTask;
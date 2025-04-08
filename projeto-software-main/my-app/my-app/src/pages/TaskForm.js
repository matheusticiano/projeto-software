import { useState } from 'react';
import { createTask } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Importando o CSS

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description, date, time });
    navigate('/');
  };

  return (
    <div className="task-form-container">
      <h2>Criar Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Título" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Descrição" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          required 
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default TaskForm;

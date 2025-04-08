import { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask } from '../services/api';
import '../styles.css'; // Importando o CSS

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask({
      title: task.title,
      description: task.description,
      date: task.date,
      time: task.time,
    });
  };

  const handleUpdate = async (taskId) => {
    if (!updatedTask.title.trim() || !updatedTask.description.trim()) return;
    
    try {
      await updateTask(taskId, updatedTask);
      setEditingTaskId(null);
      setUpdatedTask({ title: '', description: '', date: '', time: '' });
      fetchTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <div className="container">
      <h2>Minhas Tarefas</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={updatedTask.title}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                  placeholder="Título"
                />
                <input
                  type="text"
                  value={updatedTask.description}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                  placeholder="Descrição"
                />
                <input
                  type="date"
                  value={updatedTask.date}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, date: e.target.value })}
                />
                <input
                  type="time"
                  value={updatedTask.time}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, time: e.target.value })}
                />
                <button onClick={() => handleUpdate(task.id)}>Salvar</button>
                <button onClick={() => setEditingTaskId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span><strong>{task.title}</strong></span>
                <span>{task.description}</span>
                <span>{task.date} {task.time}</span>
                <div>
                  <button onClick={() => handleEditClick(task)}>Editar</button>
                  <button onClick={() => handleDelete(task.id)}>Deletar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

import axios from 'axios';

// Defina a URL base da API
const API_URL = 'http://localhost:8000/api';  // Altere conforme sua configuração

// Criando a instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona o token de autenticação às requisições
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];
  }
};

// Função para registrar um novo usuário
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

// Função para fazer login e obter o token JWT
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login/', credentials);
    const { access } = response.data;  // Pegando o token JWT
    localStorage.setItem('token', access);  // Salvando o token no localStorage
    setAuthToken(access); // Configurando o token no Axios
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Função para logout
export const logoutUser = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

// Função para listar tarefas
export const getTasks = async () => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await api.get('/tasks/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

// Função para criar uma nova tarefa
export const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await api.post('/tasks/', taskData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
};

// Função para atualizar uma tarefa
export const updateTask = async (taskId, taskData) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await api.put(`/tasks/${taskId}/`, taskData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

// Função para deletar uma tarefa
export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    await api.delete(`/tasks/${taskId}/`);
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};

export default api;
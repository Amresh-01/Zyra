import axios from "axios";

const LOCAL_API_BASE = "http://localhost:8080/api";
const REMOTE_API_BASE = "https://zyra-umwl.onrender.com/api";

let activeBaseUrl = LOCAL_API_BASE;

const api = axios.create({
  baseURL: LOCAL_API_BASE,
  timeout: 5000,
});

export const initApiBase = async () => {
  try {
    await axios.get(`${LOCAL_API_BASE}/students/action-center/stu_001`, { timeout: 1500 });
    activeBaseUrl = LOCAL_API_BASE;
  } catch (error) {
    activeBaseUrl = REMOTE_API_BASE;
  }
  api.defaults.baseURL = activeBaseUrl;
};

// Initialize base URL detection
initApiBase();

export const getActionCenter = async (studentId: string) => {
  try {
    const { data } = await api.get(`/students/action-center/${studentId}`);
    return data.data;
  } catch (err) {
    if (activeBaseUrl !== REMOTE_API_BASE) {
      const { data } = await axios.get(`${REMOTE_API_BASE}/students/action-center/${studentId}`);
      return data.data;
    }
    throw err;
  }
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  try {
    const { data } = await api.patch(`/tasks/status/${taskId}`, { status });
    return data.data;
  } catch (err) {
    if (activeBaseUrl !== REMOTE_API_BASE) {
      const { data } = await axios.patch(`${REMOTE_API_BASE}/tasks/status/${taskId}`, { status });
      return data.data;
    }
    throw err;
  }
};
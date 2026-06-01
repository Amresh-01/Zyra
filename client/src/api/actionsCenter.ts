import axios from "axios";

export const getActionCenter = async (studentId: string) => {
  const { data } = await axios.get(
    `https://zyra-umwl.onrender.com/api/students/action-center/stu_003`
  );

  return data.data;
};
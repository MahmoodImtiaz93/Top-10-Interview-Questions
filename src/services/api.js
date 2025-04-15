import axios from "axios";

const BASE_URL = "https://www.nuqilan.com/api";

export const getSubjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subjects`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to load subjects.");
  }
};

export const getQuestions = async (subjectId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subjects/${subjectId}/questions`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to load questions.");
  }
};

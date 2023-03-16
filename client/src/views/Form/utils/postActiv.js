import axios from "axios";



export const postActivity = async (activity) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/activities/activity",
      activity
    );
    return data;
  } catch (error) {
    throw new Error(error)
  }
};
 
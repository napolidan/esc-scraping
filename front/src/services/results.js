import axios from "axios";
const resultURL = "http://localhost:3001/api/escResults";


// 5 seconds for the axios to wait for a response from the server
const axiosInstance = axios.create({
  timeout: 5000, // Set the timeout value (in milliseconds)
});

export async function getAll() {
  try {
    const response = await axiosInstance.get(resultURL);
    // Process the response data
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle response error
      console.log("Response error:", error.response.data);
      console.log("Response status:", error.response.status);
    } else if (error.request) {
      // Handle request error (timeout, server not reachable)
      console.log("Request error:", error.request);
    } else {
      // Handle other errors
      console.log("Error:", error.message);
    }
    console.log("Error config:", error.config);
    throw error; // Rethrow the error to be caught by the caller
  }
}

// export default { fetchData };

import axios, { type AxiosRequestConfig } from 'axios';

export async function getUsers() {
const token = localStorage.getItem("accessToken");
if(token){
    console.log("Token i alla fall");
    
    const headers: AxiosRequestConfig["headers"] = {
        "Authorization": `Bearer ${token}`
    };

    const requestOptions: AxiosRequestConfig = {
        method: "GET",
        url: "http://localhost:3000/admin/users",
        headers: headers
      };
    console.log("Request URL:", requestOptions.url);
    try {
        console.log('Sending request to retrieve users...');
        const response = await axios(requestOptions);
        console.log("Users retrieved successfully");
        return response.data;
      } catch (error) {
        console.error("An error occurred while retrieving users", error);
        throw error;
      }
    } else {
      console.log("Token not found in localStorage");
      return null;
    }
  }
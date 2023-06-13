
import axios, { AxiosRequestConfig } from "axios";
import type { Book } from "../components/BooksItem.vue"

export async function searchBooks(inputValue: string): Promise<Book[]> { 
    const query = inputValue.trim().toLocaleLowerCase();
    const URL = `http://localhost:3000/library/books/search?q=${query}`;
    try{ 
        const response = await axios.get(URL);
        return response.data.books as Book[];
         }  catch(error) {
            console.log(error)
            throw error;
         }
}

export async function getBooks(): Promise<Book[]> {
    const URL = "http://localhost:3000/library/books";
    try {
      const response = await axios.get(URL);
      return response.data.books as Book[];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  

  export function editBook(previousTitle: string, updatedBook: Book): Promise<void> {
    const token = localStorage.getItem("accessToken");
  
    if (token) {
      const headers: AxiosRequestConfig["headers"] = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };
  
      const requestOptions: AxiosRequestConfig = {
        method: "PUT",
        url: "/admin/books",
        headers: headers,
        data: {
          previous: {
            title: previousTitle
          },
          current: updatedBook
        }
      };
  
      return axios(requestOptions)
        .then(() => {
          console.log("Book updated successfully");
        })
        .catch((error) => {
          console.error("An error occurred while updating the book", error);
          throw error;
        });
    } else {
      console.log("Token not found in localStorage");
      return Promise.reject(new Error("Token not found in localStorage"));
    }
  }

export async function addBook(newBook: any): Promise<void> {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const requestOptions: AxiosRequestConfig = {
      method: "POST",
      url: "/admin/books",
      headers: headers,
      data: newBook
    };

    try {
      await axios(requestOptions);
      console.log("Book added successfully");
    } catch (error) {
      console.error("An error occurred while adding the book", error);
      throw error;
    }
  } else {
    console.log("Token not found in localStorage");
  }
} 

export function deleteBook(bookTitle: string): Promise<void> {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const headers: AxiosRequestConfig["headers"] = {
      "Authorization": `Bearer ${token}`
    };

    const requestOptions: AxiosRequestConfig = {
      method: "DELETE",
      url: `http://localhost:3000/admin/books`, // Add the base URL
      headers: headers,
      data:{
        title:bookTitle
      }
    };

    return axios(requestOptions)
      .then(() => {
        console.log('Book has been deleted');
      })
      .catch((error) => {
        console.error('An error occurred while deleting the book', error);
        throw error;
      });
  } else {
    console.log("Token not found in localStorage");
    return Promise.reject(new Error("Token not found in localStorage"));
  }
}
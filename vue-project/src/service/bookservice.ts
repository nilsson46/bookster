
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

  

export function editBook(bookTitle: string, updatedData: any): void {
    const token = localStorage.getItem("accessToken");

    if (token) {
        const headers: AxiosRequestConfig["headers"] = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        const requestOptions: AxiosRequestConfig = {
            method: "PUT",
            url: `/api/books/${bookId}`,
            headers: headers,
            data: updatedData
        };

        // Make the API call to edit the book
        axios(requestOptions)
            .then(response => {
                // Handle the response from the server
                if (response.status === 200) {
                    // Book successfully edited
                    console.log("Book edited successfully");
                } else {
                    // Error occurred while editing the book
                    console.log("Error editing the book");
                }
            })
            .catch(error => {
                // Handle any network or other errors
                console.error("An error occurred while editing the book", error);
            });
    } else {
        console.log("Token not found in localStorage");
    }
}

export async function addBook(newBook: any, token: string): Promise<void> {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post('/admin/books', newBook, { headers });

    if (response.status === 201) {
      console.log('Book added successfully');
    } else {
      console.log('Error adding the book');
    }
  } catch (error) {
    console.error('An error occurred while adding the book', error);
    throw error;
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
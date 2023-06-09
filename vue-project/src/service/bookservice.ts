import axios from "axios";
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
/**
 * A interface to present a user 
 */

export interface User {
    username: string;
    role: string;
    purchases?: {
      title: string;
      author: string;
      quantity: string;
    }[];
  }
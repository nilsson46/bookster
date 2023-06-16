/**
 * A interface to present a book. 
 */

export interface Book{
    title: string;
    author: string; 
    quantity: number;
    orderQuantity?: number;
}
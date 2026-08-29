import { Injectable } from '@nestjs/common';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  category: string;
}

@Injectable()
export class BookshopService {
  private books: Book[] = [];
  private nextId = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  create(data: Omit<Book, 'id'>): Book {
    const book = { id: this.nextId++, ...data };
    this.books.push(book);
    return book;
  }

  update(id: number, data: Partial<Book>): Book | undefined {
    const book = this.findOne(id);

    if (book) {
      Object.assign(book, data);
    }

    return book;
  }

  remove(id: number): void {
    this.books = this.books.filter((b) => b.id !== id);
  }

  reduceStock(id: number, quantity: number): void {
    const book = this.findOne(id);

    if (book) {
      book.stock -= quantity;
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { DatePipe } from '@angular/common'; 
import { CommonModule } from '@angular/common'; 

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

@Component({
  selector: 'app-book',
  standalone: true,
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  imports: [FormsModule, CommonModule], 
  providers: [DatePipe]  
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { id: '', title: '', author: '', isbn: '', publicationDate: '' };
  isEditing: boolean = false;
  currentBookId: string = '';
  showDeleteDialog: boolean = false;
  deleteBookId: string = '';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.http.get<Book[]>('https://localhost:7039/api/Books').subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  addBook(): void {
    const { id, ...bookWithoutId } = this.newBook;
    this.http.post('https://localhost:7039/api/Books', bookWithoutId).subscribe(
      (response) => {
        console.log('Book added successfully:', response);
        this.getBooks(); 
        this.newBook = { id: '', title: '', author: '', isbn: '', publicationDate: '' }; 
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }

  editBook(book: Book): void {
    this.isEditing = true;
    this.currentBookId = book.id;
    this.newBook = { ...book }; 
  }

  updateBook(): void {
    this.http.put(`https://localhost:7039/api/Books/${this.currentBookId}`, this.newBook).subscribe(
      (response) => {
        console.log('Book updated successfully:', response);
        this.getBooks(); 
        this.newBook = { id: '', title: '', author: '', isbn: '', publicationDate: '' }; 
        this.isEditing = false; 
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  }

  openDeleteDialog(id: string): void {
    this.showDeleteDialog = true;
    this.deleteBookId = id;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.deleteBookId = '';
  }

  deleteBook(id: string): void {
    this.http.delete(`https://localhost:7039/api/Books/${id}`).subscribe(
      (response) => {
        console.log('Book deleted successfully:', response);
        this.getBooks(); 
        this.closeDeleteDialog();
      },
      (error) => {
        console.error('Error deleting book:', error);
        this.closeDeleteDialog(); 
      }
    );
  }
}

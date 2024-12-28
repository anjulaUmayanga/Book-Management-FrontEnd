import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  
import { BookComponent } from './book/book.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookComponent, HttpClientModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'book-management';
}

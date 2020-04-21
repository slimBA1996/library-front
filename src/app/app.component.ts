import { Component, OnInit, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import {DataService} from './services/book.service';
import {HttpClient} from '@angular/common/http';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Book} from './models/book';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit{

  dataSource = new MatTableDataSource<Book>();
  exampleDatabase: DataService | null;
  displayedColumns = ['id', 'title', 'description', 'actions'];
  index: number;
  id: number;
  bookToEdit: Book;

  @Input() book: Book;
  @Input() bookToUpdate: Book;
  @Input() bookToAdd: Book;
  constructor(
    private dataService: DataService, 
    public dialog: MatDialog) {
        this.book =  new Book();
        this.bookToUpdate =  new Book();
        this.bookToAdd =  new Book();
    }

  ngOnInit() {
    this.getAllBooksController();
  }
  
 
  // Afficher tous les livres : remplissage de la table
  getAllBooksController(): void {
    this.dataService.getAllBooksService()
    .subscribe(res => {
    this.dataSource.data = res;
  });
  }

  addLivreController() {
    
    console.log(this.bookToAdd);
    this.dataService.addBookService(this.bookToAdd)
    .subscribe
      (
      res => {
        this.getAllBooksController();
      });
  }


  editBookController(book:Book) {
    this.dataService.editBookService(this.book)
    .subscribe
      (
      res => {
        if (res != null) {
          this.getAllBooksController();
        } else {
        }
      });
  }

  // Supprimer une livre
deleteLivreController(id) {
  this.dataService.deleteBookService(id)
  .subscribe
    (
    res => {
      this.getAllBooksController();
    });
}




// Recherche filtrée sur la table
filtrerTable(filterValue: string) {
}

addNew() {
  const dialogRef = this.dialog.open(AddDialogComponent, {
    data: {book: {} }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.bookToAdd = this.dataService.getDialogData();
      console.log(this.bookToAdd);
      this.addLivreController();
    }
  });
}

startEdit(id: string, nameBook: string, descriptionBook: string) {
  const dialogRef = this.dialog.open(EditDialogComponent, {
    data: {id: id, nameBook: nameBook, descriptionBook: descriptionBook}
  });
    
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      console.log(this.editBookController(this.dataService.getDialogData()));
      this.editBookController(this.dataService.getDialogData());

    }
  });
 
}

deleteItem(id: String, nameBook: string, descriptionBook: string) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {id: id, nameBook: nameBook, descriptionBook: descriptionBook}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.deleteLivreController(nameBook);
    }
  });
}


}




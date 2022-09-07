let myLibrary = [];

class Book {
  constructor(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = numPages;
    this.read = isRead;
  }

  info() {
    let read = this.read ? "read" : "not yet read";
    let bookInfo = this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
    return bookInfo;
  }
}

function addBookToLibrary() {
  const newTitle = document.getElementById('new-title')
  const newAuthor = document.getElementById('new-author');
  const newPages = document.getElementById('new-pages');
  const newRead = document.getElementById('new-read');
  newBook = new Book(newTitle, newAuthor, newPages, newRead);
  myLibrary.push(newBook);
}

const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
console.log(firstBook.info());
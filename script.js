let myLibrary = [];

class Book {
  constructor(isDisplayed, title, author, numPages, isRead) {
    this.displayed = isDisplayed;
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
  const newTitle = document.getElementById('new-title').value;
  const newAuthor = document.getElementById('new-author').value;
  const newPages = document.getElementById('new-pages').value;
  const newRead = document.getElementById('new-read').value;
  newBook = new Book(false, newTitle, newAuthor, newPages, newRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  const tableBody = document.querySelector("tbody");

  for (const book of myLibrary) {
    if (book["displayed"] === false) {
      const newRow = document.createElement("tr");
      for (const key of Object.keys(book)) {
        if (!(key === "displayed")) {
          const newData = document.createElement("td");
          newData.textContent = book[key];
          newRow.appendChild(newData);
        } 
      }
      tableBody.appendChild(newRow);
      book["displayed"] = true;
    }
  }
}

const addBookButton = document.getElementById('submit');
addBookButton.onclick = (event) => {
  event.preventDefault();
  addBookToLibrary();
  displayBooks();
  closeModal();
}

function clearForm() {
  document.getElementById('new-title').value = "";
  document.getElementById('new-author').value = "";
  document.getElementById('new-pages').value = "";
  document.getElementById('new-read').checked = false;
}

// open and close modal
const modal = document.querySelector(".modal");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close");

function openModal () {
  modal.style.display = "block";
}

function closeModal () {
  modal.style.display = "none";
  clearForm();
}

openModalButton.onclick = openModal;
closeModalButton.onclick = closeModal;
window.onclick = (event) => {
  if (event.target == modal) {
    closeModal();
  }
}; 

const firstBook = new Book(false, "The Hobbit", "J.R.R. Tolkien", 295, true);
const secondBook = new Book(false, "Ulysses", "James Joyce", 730, false);
const thirdBook = new Book(false, "The Brothers Karamazov", "Fyodor Dostoevsky", 840, false);
myLibrary.push(firstBook, secondBook, thirdBook);
displayBooks();
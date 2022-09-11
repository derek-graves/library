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
  const newTitle = document.getElementById('new-title').value;
  const newAuthor = document.getElementById('new-author').value;
  const newPages = document.getElementById('new-pages').value;
  const newRead = document.getElementById('new-read').value;
  newBook = new Book(newTitle, newAuthor, newPages, newRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  const tableBody = document.querySelector("tbody");

  for (const book of myLibrary) {
    const newRow = document.createElement("tr");
    for (const key of Object.keys(book)) {
      const newData = document.createElement("td");
      newData.textContent = book[key];
      newRow.appendChild(newData);
    }
    tableBody.appendChild(newRow);
  }
}

function clearForm() {
  document.getElementById('new-title').value = "";
  document.getElementById('new-author').value = "";
  document.getElementById('new-pages').value = "";
  document.getElementById('new-read').checked = false;
}

// open and close modal
const modal = document.querySelector(".modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close");

openModal.onclick = () => {
  modal.style.display = "block";
};

closeModal.onclick = () => {
  modal.style.display = "none";
  clearForm();
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
    clearForm();
  }
}; 

const firstBook = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const secondBook = new Book("Ulysses", "James Joyce", 730, false);
const thirdBook = new Book("The Brothers Karamazov", "Fyodor Dostoevsky", 840, false);
myLibrary.push(firstBook, secondBook, thirdBook);
displayBooks();
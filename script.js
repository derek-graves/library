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

  changeStatus() {
    this.read = !(this.read);
  }
}

function addBookToLibrary() {
  const newTitle = document.getElementById('new-title').value;
  const newAuthor = document.getElementById('new-author').value;
  const newPages = document.getElementById('new-pages').value;
  const newRead = document.getElementById('new-read').checked;
  newBook = new Book(false, newTitle, newAuthor, newPages, newRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  const tableBody = document.querySelector("tbody");
  let lastIndex = getLastBookIndex();

  const notDisplayed = myLibrary.filter(book => book["displayed"] === false);
  for (const book of notDisplayed) {
    const newRow = document.createElement("tr");
    newRow.dataset.bookIndex = lastIndex++;

    for (const key of Object.keys(book).slice(1,4)) {
      const newData = document.createElement("td");
      newData.textContent = book[key];
      newRow.appendChild(newData);
    }
    
    addStatusToggle(newRow);

    tableBody.appendChild(newRow);
    book["displayed"] = true;
  }
}

function getLastBookIndex() {
  const tableBody = document.querySelector("tbody");
  if (tableBody.childNodes.length === 0) {
    return 0;
  } else {
    return tableBody.lastChild.dataset.bookIndex;
  }
}

function addStatusToggle (row) {
  const container = document.createElement("td");
  const newReadToggle = document.createElement("input");
  newReadToggle.setAttribute("type", "checkbox");
  newReadToggle.classList.add("toggle");
  const newToggleLabel = document.createElement("label");
  container.appendChild(newReadToggle);
  container.appendChild(newToggleLabel);
  
  row.appendChild(container);
}

//submit and clear form
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
const modal = document.querySelector(".modal")

function openModal () {
  modal.style.display = "block";
}

function closeModal () {
  modal.style.display = "none";
  clearForm();
}

const openModalButton = document.getElementById("open-modal");
openModalButton.onclick = openModal;
const closeModalButton = document.getElementById("close");
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
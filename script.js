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
    let bookInfo =
      this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
    return bookInfo;
  }

  changeStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.catalogue = [];
  }

  addBook() {
    const newTitle = document.getElementById("new-title").value;
    const newAuthor = document.getElementById("new-author").value;
    const newPages = document.getElementById("new-pages").value;
    const newRead = document.getElementById("new-read").checked;
    const newBook = new Book(false, newTitle, newAuthor, newPages, newRead);
    this.catalogue.push(newBook);
  }

  displayBooks() {
    const tableBody = document.querySelector("tbody");

    const notDisplayed = this.catalogue.filter(
      (book) => book["displayed"] === false
    );
    for (const book of notDisplayed) {
      const newRow = document.createElement("tr");
      newRow.dataset.bookIndex = getLastBookIndex() + 1;

      for (const key of Object.keys(book).slice(1, 4)) {
        const newData = document.createElement("td");
        newData.textContent = book[key];
        newRow.appendChild(newData);
      }

      this.addStatusToggle(newRow);
      addRemoveButton(newRow);

      tableBody.appendChild(newRow);
      book["displayed"] = true;
      this.hideEmptyTable();
    }
  }

  //only display table when library isn't empty
  hideEmptyTable() {
    const tbody = document.querySelector("tbody");
    const table = document.querySelector("table");
    if (tbody.hasChildNodes()) {
      table.classList.remove("hidden");
    } else {
      table.classList.add("hidden");
    }
  }

  addStatusToggle(row) {
    const bookID = `book-${row.dataset.bookIndex}`;

    const newReadToggle = document.createElement("input");
    newReadToggle.setAttribute("type", "checkbox");
    newReadToggle.classList.add("read-toggle-table");
    newReadToggle.setAttribute("id", bookID);
    newReadToggle.checked = this.catalogue[row.dataset.bookIndex]["read"];

    const newToggleLabel = document.createElement("label");
    newToggleLabel.setAttribute("for", bookID);
    newToggleLabel.onclick = this.catalogue[
      row.dataset.bookIndex
    ].changeStatus.bind(this.catalogue[row.dataset.bookIndex]);

    const container = document.createElement("td");
    container.appendChild(newReadToggle);
    container.appendChild(newToggleLabel);

    row.appendChild(container);
  }
}

let myLibrary = new Library();
myLibrary.hideEmptyTable(); //need call, otherwise table header shows on page load

function getLastBookIndex() {
  const tableBody = document.querySelector("tbody");
  if (tableBody.childNodes.length === 0) {
    return -1;
  } else {
    return parseInt(tableBody.lastChild.dataset.bookIndex);
  }
}

function addRemoveButton(row) {
  const newRemoveButton = document.createElement("button");
  newRemoveButton.textContent = "×";
  newRemoveButton.classList.add("remove");
  newRemoveButton.onclick = removeBook.bind(row);

  const container = document.createElement("td");
  container.appendChild(newRemoveButton);

  row.appendChild(container);
}

function removeBook() {
  //remove book visually
  const bookRow = document.querySelector(
    `[data-book-index = '${this.dataset.bookIndex}']`
  );
  bookRow.remove();

  //remove book from library
  myLibrary.catalogue.splice(this.dataset.bookIndex, 1);

  updateIndices();
  myLibrary.hideEmptyTable();
}

function updateIndices() {
  const rows = [...document.querySelector("tbody").children];
  let index = 0;
  for (const row of rows) {
    row.dataset.bookIndex = index++;
  }
}

//tools
function clearLibrary() {
  myLibrary.catalogue = [];
  const tbody = document.querySelector("tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  myLibrary.hideEmptyTable();
}

function markAllRead() {
  for (let bookNum = 0; bookNum < myLibrary.catalogue.length; bookNum++) {
    myLibrary.catalogue[bookNum["read"]] = true;
    document.getElementById(`book-${bookNum}`).checked = true;
  }
}

function markAllUnread() {
  for (let bookNum = 0; bookNum < myLibrary.catalogue.length; bookNum++) {
    console.log("running");
    console.log(myLibrary.catalogue);
    myLibrary.catalogue[bookNum["read"]] = false;
    document.getElementById(`book-${bookNum}`).checked = false;
  }
}

document.getElementById("all-read").onclick = markAllRead;
document.getElementById("all-unread").onclick = markAllUnread;
document.getElementById("clear-library").onclick = clearLibrary;

//submit and clear form
const addBookButton = document.getElementById("submit");
addBookButton.onclick = (event) => {
  event.preventDefault();
  myLibrary.addBook();
  myLibrary.displayBooks();
  closeModal();
};

function clearForm() {
  document.getElementById("new-title").value = "";
  document.getElementById("new-author").value = "";
  document.getElementById("new-pages").value = "";
  document.getElementById("new-read").checked = false;
}

// open and close modal
const modal = document.querySelector(".modal");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
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

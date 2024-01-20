const main = document.querySelector("#main");
const formAdd = document.querySelector("#addBook");
const inputName = document.querySelector("#name");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");
const bttnToggle = document.querySelector("#toggleForm");
const backButton = document.querySelector("#back");
const myLibrary = [];

// constructor
function Book(title, author, pages, read, validation) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.validation = validation;
  this.information = () => {
    return ` ${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

// no use
/*Book.prototype.readToggle = function () {
};*/

function addBookToLibrary(e) {
  e.preventDefault();
  const add = new Book(
    inputName.value,
    inputAuthor.value,
    inputPages.value,
    inputRead.value
  );
  myLibrary.push(add);

  reBook();
  formAdd.classList.toggle("active");
  console.log(myLibrary);
}

// first book
const theHobbit = new Book("The Hobbit", "J.R.R. Tokein", 295, "true", false);
myLibrary.push(theHobbit);
console.log(theHobbit.information());
console.log(myLibrary);

formAdd.addEventListener("submit", addBookToLibrary);

//carts books
const reBook = () => {
  myLibrary.map((e, i) => {
    if (e.validation) {
      console.log("exist");
      console.log(document.querySelector(`box${i}`));
    } else {
      e.validation = true;
      const div = document.createElement("div");
      div.innerHTML = `<div id="box${i}" class="boxBooks"> 
    <h1>${e.title}</h1>
    <h2>By ${e.author}</h2>
    <h2>Pages ${e.pages}</h2>
    <h3 class= "status">Mark as read:</h3>   
    <label class="switch" >
    <input type="checkbox" name="status" id="testDom${i}" ${
        e.read === "true" ? "checked" : ""
      }  >
    <span class="slider round"></span>
    </label>
    </div>`;
      div.addEventListener("change", () => {
        e.read ? (e.read = false) : (e.read = true);
        console.log(e.read);
      });
      main.appendChild(div);
    }
  });
};

// firt reBook
reBook();

// toggle form
bttnToggle.addEventListener("click", (e) => {
  e.preventDefault();
  formAdd.classList.toggle("active");
});

backButton.addEventListener("click", (e) => {
  e.preventDefault();
  formAdd.classList.toggle("active");
});

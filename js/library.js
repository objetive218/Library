const main = document.querySelector("#main");
const formAdd = document.querySelector("#addBook");
const inputName = document.querySelector("#name");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");
const bttnToggle = document.querySelector("#toggleForm");
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.information = () => {
      return ` ${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "read" : "not read yet"
      }`;
    };
}

/*Book.prototype.readToggle = function(){
  this.read ? this.read = false: this.read = true;
}*/



function addBookToLibrary(e) {
    e.preventDefault();
    const add = new Book(inputName.value,inputAuthor.value, inputPages.value, inputRead.value);
    myLibrary.push(add);
    main.innerHTML ="";
    reBook();
    console.log(myLibrary);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tokein", 295, true);
myLibrary.push(theHobbit);
console.log(theHobbit.information());
console.log(myLibrary);

formAdd.addEventListener("submit", addBookToLibrary);


//carts books
const reBook = () => {myLibrary.map((e, i) => {
    main.innerHTML += (`<div id="box${i}" class="boxBooks"> 
    <h1>${e.title}</h1>
    <h2>By:${e.author}</h2>
    <h2>${e.pages}</h2>
    <h3>${e.read ? true : false}</h3>
    
    </div>`);
})}

// firt reBook
reBook()
//<button onclick=${e.readToggle()}>toggle read</button>

// toggle form
bttnToggle.addEventListener("click", (e) => {
  e.preventDefault();
  formAdd.classList.toggle("active");
})
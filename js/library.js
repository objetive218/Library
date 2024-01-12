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

Book.prototype.readToggle = function(){
  
  this.read === 'true' ? this.read = 'false' : this.read = 'true';
  console.log(this.read)
}



function addBookToLibrary(e) {
    e.preventDefault();
    const add = new Book(inputName.value,inputAuthor.value, inputPages.value, inputRead.value);
    myLibrary.push(add);
    main.innerHTML ="";
    reBook();
    formAdd.classList.toggle("active");
    console.log(myLibrary);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tokein", 295, true);
myLibrary.push(theHobbit);
console.log(theHobbit.information());
console.log(myLibrary);

formAdd.addEventListener("submit", addBookToLibrary);


//carts books
const reBook = () => {myLibrary.map((e, i) => {
    let a = e.readToggle();
    main.innerHTML += (`<div id="box${i}" class="boxBooks"> 
    <h1>${e.title}</h1>
    <h2>By:${e.author}</h2>
    <h2>${e.pages}</h2>
    <h3 class= "status">Mark as read</h3>   
    <label class="switch" >
    <input type="checkbox" ${e.read === 'true' ? "checked" : ""}  onclick="${a}">
    <span class="slider round"></span>
    </label>
    </div>`);
})}

// firt reBook
reBook()
//

// toggle form
bttnToggle.addEventListener("click", (e) => {
  e.preventDefault();
  formAdd.classList.toggle("active");
})

//<button onclick=${e.readToggle(a)} id="test${i}">toggle read</button>
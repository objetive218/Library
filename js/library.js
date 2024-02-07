const main = document.querySelector("#main");
const formAdd = document.querySelector("#addBook");
const inputName = document.querySelector("#name");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");
const bttnToggle = document.querySelector("#toggleForm");
const backButton = document.querySelector("#back");
const mailError = document.querySelector("span.error");
const myLibrary = [];

// constructor
class Book {
  constructor(title, author, pages, read, validation) {
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
}

const validationInputs = (elementDom, span, message) => {
  let id = document.querySelector(`#${span}`);
  if (elementDom.validity.valid) {
    id.innerHTML = "";
    id.className = "error";
  } else {
    errorText(elementDom, id, message);
    console.log("error");
  }
};

const validationForm = (e) => {
  e.preventDefault();
  let spanName = document.querySelector("#errorName");
  let spanAuthor = document.querySelector("#errorAuthor");
  let spanPages = document.querySelector("#errorPages");
  switch (true) {
    case !inputName.validity.valid &&
      !inputAuthor.validity.valid &&
      !inputPages.validity.valid:
      errorText(inputName, spanName, "Name");
      errorText(inputAuthor, spanAuthor, "Name of Author");
      errorText(inputPages, spanPages, "Numeber of pages");
      console.log("a1");
      break;
    case !inputName.validity.valid && !inputAuthor.validity.valid:
      errorText(inputName, spanName, "Name");
      errorText(inputAuthor, spanAuthor, "Name of Author");
      break;
    case !inputName.validity.valid && !inputPages.validity.valid:
      errorText(inputName, spanName, "Name");
      errorText(inputPages, spanPages, "Numeber of pages");
      break;
    case !inputAuthor.validity.valid && !inputPages.validity.valid:
      errorText(inputAuthor, spanAuthor, "Name of Author");
      errorText(inputPages, spanPages, "Numeber of pages");
      break;
    case !inputName.validity.valid:
      errorText(inputName, spanName, "Name");
      break;
    case !inputAuthor.validity.valid:
      errorText(inputAuthor, spanAuthor, "Name of Author");
      break;
    case !inputPages.validity.valid:
      errorText(inputPages, spanPages, "Number of pages");
      break;
    default:
      const add = new Book(
        inputName.value,
        inputAuthor.value,
        inputPages.value,
        inputRead.value
      );
      myLibrary.push(add);
      console.log("?");
      reBook();
      formAdd.classList.toggle("active");
      console.log(myLibrary);
      break;
  }
};

const errorText = (nodo, spanError, text) => {
  if (nodo.validity.valueMissing) {
    spanError.textContent = `You need to enter an ${text}`;
    
  } else if (nodo.validity.typeMismatch) {
    spanError.textContent = `Entered value needs to be an ${text}`;
    
  } else if (nodo.validity.tooShort) {
    spanError.textContent = `${text} should be at least ${nodo.minLength} characters; you entered ${nodo.value}.`;
    
  } else if (nodo.validity.rangeUnderflow) {
    spanError.textContent = `${text} should be at least ${nodo.min} numbers; you entered ${nodo.value}.`;
    
  }
  spanError.className = "error view";
};

inputName.addEventListener("input", (e) => {
  validationInputs(inputName, "errorName", "Name");
});
inputAuthor.addEventListener("input", (e) => {
  validationInputs(inputAuthor, "errorAuthor", "Name of Author");
});
inputPages.addEventListener("input", (e) => {
  validationInputs(inputPages, "errorPages", "Numeber of pages");
});

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

//formAdd.addEventListener("submit", addBookToLibrary);
formAdd.addEventListener("submit", (event) => {
  //event.preventDefault();
  validationForm(event);
});
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

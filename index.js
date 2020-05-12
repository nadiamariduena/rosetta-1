const dataToDisplay = "ABCDEFGHIJKLMNOP".split("");

const list_element = document.querySelector(".elements");
const pagination_element = document.querySelector(".pagenumbers");

let current_page = 1; // starting page
let rows = 6;

function displayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;
  let start = rows_per_page * page; // get the specific amount of item we need in each page
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end); // to get an array out of the displayed items in each page

  // _________creating a div for each item _________________

  paginatedItems.forEach((item) => {
    let item_element = document.createElement("div");
    item_element.classList.add("item"); // built in css
    item_element.innerText = item; //   value to display in each div
    wrapper.appendChild(item_element);
  });
}

// __________________ setteing page numbers _________________________

function setupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page); // number of pages depending on the ammount of data from API

  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

//___________________ Generat buttons to represent the number of the pages ______________________________

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  button.addEventListener("click", () => {
    current_page = page;
    displayList(items, list_element, rows, current_page);
  });

  return button;
}

displayList(dataToDisplay, list_element, rows, current_page);
setupPagination(dataToDisplay, pagination_element, rows);

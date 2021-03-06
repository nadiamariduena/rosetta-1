import { DOMstrings as elements } from "./elements.js";
import Search from "./models/Search.js";

//query input value
export const getSearchQuery = () => elements.searchQuery.value;

export const getSearchType = () => elements.searchType.value;

export const clearInput = () => (elements.searchQuery.value = "");

export const addSpinner = () => {
  elements.fetchBtn.innerHTML = "Searching...";
  elements.container.classList.add("spinning");
};

export const removerSpinner = () => {
  elements.container.classList.remove("spinning");
  elements.fetchBtn.innerHTML = "Search";
};

export const clearResults = () => {
  elements.resultDiv.innerHTML = "";
};

// const displayDesc = desc => {
//   let splited = desc.split(" ");
//   let counter = [];

//   for (let i = 0; i < splited.length; i++) {
//     counter.push(splited[i]);
//     if (counter.length == 40) {
//       break;
//     }
//   }
//   return counter.join(" ") + "...";
// };

const renderBook = book => {
  let { title, description, authors, pageCount, imageLinks } = book.volumeInfo;

  let markUp = `
    <div class="description">
    <div class="title">Title: ${title}</div>
    <div class="sub-desc">Authors: <a>${renderBooksbyAuthor(
      authors
    )}</a> . Pages: ${pageCount}</div>
    <figure class="thumb-image">
      <img src="${imageLinks.thumbnail}" alt="${title}" srcset="">
    </figure>
    <div class="book-desc">
    <p class="txt">${description}<span class="readMore">Read more</span></p>
    
    <span class="readLess" >Read less</span></div>
  </div>`;

  elements.resultDiv.insertAdjacentHTML("beforeend", markUp);

  const readMoreSpan = document.querySelector(".readMore");
  const paragraph = document.querySelector(".txt");
  const readLessSpan = document.querySelector(".readLess");

  readMoreSpan.addEventListener("click", () => {
    paragraph.innerHTML = description;
    readMoreSpan.style.opacity = "0";
    readLessSpan.style.opacity = "1";
  });
};

function renderBooksbyAuthor(authors) {
  // const search = new Search("harry potter", authors);
  // await search.filterbyAuthor();
  // console.log(search);
  return `${authors}`;
}

export const renderResults = data => {
  const { query, result } = data;
  // console.log(decodeURI(query));

  //we make the filters appears again on the page
  elements.filters.style.display = "flex";

  result.forEach(renderBook);
};

// // filterLanguages
// export async function filterLanguages() {
//   const query = getSearchQuery();

//   const language = event.target.value;

//   const search = new Search(query, language);
//   //change the status of the search button..
//   addSpinner();
//   //fetch the data from the API.
//   await search.fetchResults();

//   //Prepare the UI for the RESULTS.
//   clearResults();

//   if (search.result) {
//     removerSpinner();
//   }
//   search.result.forEach(renderBook);
// }

// export async function filterStatus() {}

export async function filters() {
  const filters = {
    query: getSearchQuery(),
    language: document.querySelector(".search-languages").value,
    type: document.querySelector(".select-type").value,
    max: 10,
    order: document.querySelector(".order-by").value,
  };
  const search = new Search(filters);

  //change the status of the search button..
  addSpinner();

  //fetch the data from the API.
  await search.fetchResults();

  //Prepare the UI for the RESULTS.
  clearResults();

  if (search.result) {
    removerSpinner();
  }
  search.result.forEach(renderBook);
  // console.log(search);
}

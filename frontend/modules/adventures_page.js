import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  return urlParams.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const cityAdv = await fetch(
      `${config.backendEndpoint}/adventures/?city=${city}`
    );
    const res = await cityAdv.json();
    return res;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const advGridRow = document.querySelector(".content #data");
  adventures.forEach((adv) => {
    const advLink = document.createElement("a");
    advLink.setAttribute("id", adv.id);
    advLink.setAttribute("href", `detail/?adventure=${adv.id}`);
    advLink.innerText = adv.name;
    advGridRow.appendChild(advLink);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((item) => {
    return item.duration >= low && item.duration <= high;
  });
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((item) => {
    return categoryList.includes(item.category);
  });
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  var low = 0,
    high = 0;
  if (filters.duration !== "") {
    [low, high] = filters.duration.split("-");
    return filterByDuration(list, low, high);
  } else if (filters.category.length > 0) {
    return filterByCategory(list, filters.category);
  } else if (filters.duration.length > 0 && filters.category.length > 0) {
    [low, high] = filters.duration.split("-");
    return filterByCategory(
      filterByDuration(list, low, high),
      filters.category
    );
  } else {
    return list;
  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let activeFilterDisplay = document.getElementById("category-list");
  /* if (filters.duration.length > 0) {
    let durationEl = document.createElement("div");
    durationEl.classList.add("category-filter");
    durationEl.textContent = filters.duration;
    activeFilterDisplay.appendChild(durationEl);
  } */
  if (filters.category.length > 0) {
    filters.category.forEach((catg) => {
      let categoryEl = document.createElement("div");
      categoryEl.classList.add("category-filter");
      categoryEl.textContent = catg;
      activeFilterDisplay.appendChild(categoryEl);
    });
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

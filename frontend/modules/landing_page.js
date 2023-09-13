import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  /* console.log("hello from init");
  console.log(config.backendEndpoint); */
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const cities = await fetch(`${config.backendEndpoint}/cities`);
    const result = await cities.json();
    return result;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataRow = document.querySelector(".content #data");
  const cityEl = document.createElement("a");
  cityEl.setAttribute("id", id);
  cityEl.setAttribute("href", `pages/adventures/?city=${id}`);

  // create bootstrap elements
  let gridElem = document.createElement("div");
  gridElem.className = "col-6 col-lg-3 mb-2";
  let divTile = document.createElement("div");
  divTile.className = "tile";
  let tileText = document.createElement("div");
  tileText.className = "tile-text";

  let cityHead = document.createElement("h5");
  cityHead.textContent = city;
  let cityDesc = document.createElement("p");
  cityDesc.textContent = description;

  tileText.append(cityHead, cityDesc);
  divTile.append(tileText);

  let tileImg = document.createElement("img");
  tileImg.src = image;
  tileImg.alt = city;
  divTile.append(tileImg);
  cityEl.innerHTML = divTile.outerHTML;
  gridElem.append(cityEl);
  dataRow.append(gridElem);
}

export { init, fetchCities, addCityToDOM };

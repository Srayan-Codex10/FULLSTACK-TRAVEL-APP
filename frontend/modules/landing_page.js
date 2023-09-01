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
    return cities.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataRow = document.querySelector(".content #data");
  const cityEl = document.createElement("a");
  cityEl.setAttribute("id",id);
  cityEl.setAttribute("href",`pages/adventures/?city=${id}`);
  cityEl.innerText = description;
  dataRow.append(cityEl);

}

export { init, fetchCities, addCityToDOM };

import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  return urlParams.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const advDetail = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );
    const res = await advDetail.json();
    return res;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let advName = document.getElementById("adventure-name");
  let advSub = document.getElementById("adventure-subtitle");
  let advContent = document.getElementById("adventure-content");
  let gallery = document.getElementById("photo-gallery");

  advName.textContent = adventure.name;
  advSub.textContent = adventure.subtitle;
  advContent.textContent = adventure.content;
  adventure.images.forEach((img) => {
    let div = document.createElement("div");
    let imgTag = document.createElement("img");
    imgTag.src = img;
    imgTag.classList.add("activity-card-image");
    div.appendChild(imgTag);
    gallery.appendChild(div);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let galleryEl = document.getElementById("photo-gallery");
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  galleryEl.innerHTML = "";
  let gridDiv = document.createElement("div");
  gridDiv.className = "col-12";
  gridDiv.id = "photo-grid-col";
  galleryEl.appendChild(gridDiv);
  gridDiv.innerHTML += `<div class="carousel-indicators" id="slide-indicator"></div><div id="carousel-container" class="carousel-inner"></div>`;

  let carouselButtons = `<button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#photo-gallery" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>`;
  let carouselContainer = document.getElementById("carousel-container");
  let slideIndicator = document.getElementById("slide-indicator");
  let slideCount = 0;
  images.forEach((img) => {
    // set carousel slider icon
    let slider = document.createElement("button");
    slider.setAttribute("type", "button");
    slider.setAttribute("data-bs-target", "#photo-gallery");
    slider.className = "active";
    slider.setAttribute("data-bs-slide-to", slideCount.toString());
    slideCount++;
    slideIndicator.appendChild(slider);

    // set carousel image
    let div = document.createElement("div");
    let imgTag = document.createElement("img");
    div.classList.add("carousel-item");
    imgTag.src = img;
    imgTag.classList.add("activity-card-image");
    div.appendChild(imgTag);
    carouselContainer.appendChild(div);
  });
  gridDiv.innerHTML += carouselButtons;
  document
    .getElementById("carousel-container")
    .firstChild.classList.add("active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").textContent =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = adventure.costPerHead * parseInt(persons);
  if (Number.isNaN(cost))
    document.getElementById("reservation-cost").textContent = 0;
  else document.getElementById("reservation-cost").textContent = cost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formDiv = document.getElementById("myForm");
  formDiv.onsubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(formDiv);
    let body = {
      name: `${formData.get("name")}`,
      date: `${formData.get("date")}`,
      person: `${formData.get("person")}`,
      adventure: adventure.id,
    };
    console.log(body);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    let response = "";
    try {
      let res = await fetch(
        `${config.backendEndpoint}/reservations/new`,
        options
      );
      response = await res.json();
      if (response.success) {
        alert("Success");
      } else {
        alert(JSON.stringify(response));
      }
    } catch (err) {
      alert("Failure");
    }
    window.location.reload();
  };
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let response = null;
  try {
    let res = await fetch(`${config.backendEndpoint}/reservations`);
    response = await res.json();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
  // Place holder for functionality to work in the Stubs
  return response;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  if (reservations.length === 0) {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  } else {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";

    reservations.forEach((reserv) => {
      const table = document.getElementById("reservation-table");
      let td_id = document.createElement("td");
      let td_name = document.createElement("td");
      let td_adv = document.createElement("td");
      let td_person = document.createElement("td");
      let td_date = document.createElement("td");
      let td_price = document.createElement("td");
      let td_time = document.createElement("td");
      let td_button = document.createElement("td");

      td_id.textContent = reserv.id;
      td_name.textContent = reserv.name;
      td_adv.textContent = reserv.adventureName;
      td_person.textContent = reserv.person;
      var d = new Date(reserv.date);
      td_date.textContent = d.toLocaleDateString("en-IN");
      td_price.textContent = reserv.price;

      d = new Date(reserv.time);

      td_time.textContent = new Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(d) + ', ' + d.toLocaleTimeString("en-IN");
      let btn = document.createElement("button");
      let btnLink = document.createElement("a");
      btnLink.href = `../detail/?adventure=${reserv.adventure}`;
      btnLink.textContent = "Visit Adventure";
      btn.className = "reservation-visit-button";
      btn.setAttribute("id", reserv.id);
      btn.setAttribute("type", "button");
      btn.append(btnLink);
      td_button.append(btn);
      let tr = document.createElement("tr");
      tr.append(
        td_id,
        td_name,
        td_adv,
        td_person,
        td_date,
        td_price,
        td_time,
        td_button
      );
      table.append(tr);
    });
  }
}

export { fetchReservations, addReservationToTable };


(function () {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    const VALID_EMAIL = "admin@123.com";
    const VALID_PASSWORD = "admin123";

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      const email = (emailInput.value || "").trim();
      const password = passwordInput.value || "";

      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        alert("Login success");
        window.location.href = "admin.html";
      } else {
        alert("Wrong email or password");
      }
    });
  }
})();


(function () {
  const fleetForm = document.getElementById("fleet-form");
  const fleetCardsContainer = document.getElementById("fleetCardsContainer");
  const categoryFilterSelect = document.getElementById("categoryFilter");
  const availabilityFilterSelect = document.getElementById(
    "availabilityFilter"
  );
  const clearFilterBtn = document.getElementById("clearFilterBtn");

  if (!fleetForm || !fleetCardsContainer) {
    return;
  }


  let vehicles = [];
  let nextId = 1;

  function createVehicle(regNo, category, driverName, availabilityString) {
    return {
      id: nextId++,
      regNo,
      category,
      driverName,
      isAvailable: availabilityString === "Available",
    };
  }

  function getAvailabilityLabel(isAvailable) {
    return isAvailable ? "Available" : "Unavailable";
  }

  function applyFilters() {
    let filtered = [...vehicles];

    const selectedCategory = categoryFilterSelect.value;
    const selectedAvailability = availabilityFilterSelect.value;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((v) => v.category === selectedCategory);
    }

    if (selectedAvailability !== "all") {
      const desiredAvailability = selectedAvailability === "Available";
      filtered = filtered.filter((v) => v.isAvailable === desiredAvailability);
    }

    renderVehicles(filtered);
  }

 function renderVehicles(list) {
  fleetCardsContainer.innerHTML = "";

  if (list.length === 0) {
    fleetCardsContainer.innerHTML = `<p class="empty-message">No vehicles added yet.</p>`;
    return;
  }

  list.forEach((vehicle) => {
    const card = document.createElement("div");
    card.className = "vehicle-card";

    card.innerHTML = `
      <img src="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png" class="vehicle-img" />

      <div class="vehicle-details">
        <p><strong>Reg No:</strong> ${vehicle.regNo}</p>
        <p><strong>Category:</strong> ${vehicle.category}</p>
        <p><strong>Driver:</strong> ${vehicle.driverName}</p>
        <p><strong>Status:</strong> ${vehicle.isAvailable ? "Available" : "Unavailable"}</p>
      </div>

      <button class="action-btn" onclick="updateDriver(${vehicle.id})">Update Driver</button>
      <button class="action-btn" onclick="toggleAvailability(${vehicle.id})">Change Availability</button>
      <button class="action-btn delete-btn" onclick="deleteVehicle(${vehicle.id})">Delete Vehicle</button>
    `;

    fleetCardsContainer.appendChild(card);
  });
}




window.updateDriver = function (id) {
  const vehicle = vehicles.find(v => v.id === id);
  if (!vehicle) return;

  const newName = prompt("Enter new driver name:", vehicle.driverName);
  if (newName === null) return;
  if (newName.trim() === "") {
    alert("Driver name cannot be empty");
    return;
  }
  vehicle.driverName = newName.trim();
  applyFilters();
};

window.toggleAvailability = function (id) {
  const vehicle = vehicles.find(v => v.id === id);
  if (!vehicle) return;
  vehicle.isAvailable = !vehicle.isAvailable;
  applyFilters();
};

window.deleteVehicle = function (id) {
  if (!confirm("Are you sure you want to delete this vehicle?")) return;
  vehicles = vehicles.filter(v => v.id !== id);
  applyFilters();
};


  
  fleetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const regNoInput = document.getElementById("regNo");
    const categorySelect = document.getElementById("category");
    const driverNameInput = document.getElementById("driverName");
    const availabilitySelect = document.getElementById("availability");

    const regNo = (regNoInput.value || "").trim();
    const category = categorySelect.value;
    const driverName = (driverNameInput.value || "").trim();
    const availabilityString = availabilitySelect.value;

   
    if (!regNo || !category || !driverName || !availabilityString) {
      alert("Please fill all required fields.");
      return;
    }


    const newVehicle = createVehicle(
      regNo,
      category,
      driverName,
      availabilityString
    );
    vehicles.push(newVehicle);


    fleetForm.reset();
    availabilitySelect.value = "Available"; 


    applyFilters();
  });

  
  if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener("change", applyFilters);
  }

  if (availabilityFilterSelect) {
    availabilityFilterSelect.addEventListener("change", applyFilters);
  }

  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", function () {
      categoryFilterSelect.value = "all";
      availabilityFilterSelect.value = "all";
      renderVehicles(vehicles); 
    });
  }
  renderVehicles(vehicles);
})();

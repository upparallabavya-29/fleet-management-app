
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
      const msg = document.createElement("p");
      msg.textContent = "No vehicles added yet.";
      msg.className = "empty-message";
      fleetCardsContainer.appendChild(msg);
      return;
    }

    list.forEach((vehicle) => {
      const card = document.createElement("div");
      card.className = "card fleet-card";
      card.dataset.id = vehicle.id;

      const infoDiv = document.createElement("div");
      infoDiv.className = "card-info";

      infoDiv.innerHTML = `
        <p><strong>Reg No:</strong> ${vehicle.regNo}</p>
        <p><strong>Category:</strong> ${vehicle.category}</p>
        <p><strong>Driver:</strong> ${vehicle.driverName}</p>
        <p><strong>Availability:</strong> ${getAvailabilityLabel(
          vehicle.isAvailable
        )}</p>
      `;

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "card-actions";

      const updateDriverBtn = document.createElement("button");
      updateDriverBtn.textContent = "Update Driver";
      updateDriverBtn.className = "btn small-btn";

      const toggleAvailabilityBtn = document.createElement("button");
      toggleAvailabilityBtn.textContent = "Change Availability";
      toggleAvailabilityBtn.className = "btn small-btn";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete Vehicle";
      deleteBtn.className = "btn small-btn danger-btn";

      actionsDiv.appendChild(updateDriverBtn);
      actionsDiv.appendChild(toggleAvailabilityBtn);
      actionsDiv.appendChild(deleteBtn);

      card.appendChild(infoDiv);
      card.appendChild(actionsDiv);


      updateDriverBtn.addEventListener("click", function () {
        const newName = prompt("Enter new driver name:", vehicle.driverName);

      
        if (newName === null) return;

        const trimmed = newName.trim();
        if (trimmed.length === 0) {
          alert("Driver name cannot be empty");
          return;
        }

        vehicle.driverName = trimmed;
        applyFilters();
      });

  
      toggleAvailabilityBtn.addEventListener("click", function () {
        vehicle.isAvailable = !vehicle.isAvailable;
        applyFilters();
      });


      deleteBtn.addEventListener("click", function () {
        const ok = confirm(
          "Are you sure you want to delete this vehicle?"
        );
        if (!ok) return;

        vehicles = vehicles.filter((v) => v.id !== vehicle.id);
        applyFilters();
      });

      fleetCardsContainer.appendChild(card);
    });
  }

  
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

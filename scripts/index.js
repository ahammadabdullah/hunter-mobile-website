const loadData = async (id, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${id}`
  );
  const data = await res.json();
  const phones = data.data;
  showDevice(phones, isShowAll);
};

const showDevice = (phones, isShowAll) => {
  /* phone container */
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  /* handle show all */
  const showAllBtn = document.getElementById("showAll-btn");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-100 shadow-xl pt-4 mt-8 text-center";
    phoneCard.innerHTML = `          
    <figure>
      <img
        src="${phone.image}"
        alt="phone"
      />
    </figure>
    <div class="card-body">
      <h2 class=" text-2xl font-medium text-center">${phone.phone_name}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus similique quis nihil neque eos ipsum provident dolores veritatis repellendus sunt?</p>
      <p class="font-bold text-black">$999</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')"  class="btn btn-primary">Show Details</button>
      </div>
    </div>`;
    phoneContainer.appendChild(phoneCard);
  });
};

const handleSearch = (isShowAll) => {
  const inputField = document.getElementById("search-field");
  const inputValue = inputField.value;
  loadData(inputValue, isShowAll);
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  showPhoneDetails(phoneDetails);
};

const showPhoneDetails = (phoneDetails) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <div class="flex justify-center"><img src="${phoneDetails?.image}" alt="" /></div>
  <h4 class="font-semibold py-4 text-2xl text-black">${phoneDetails?.name}</h4>
  <p>Phone Description</p>
  <p class="py-2">
    <span class="font-semibold py-4 text-xl text-black"
      >Storage:
    </span>${phoneDetails?.mainFeatures.storage}
  </p>
  <p class="py-2">
    <span class="font-semibold py-4 text-xl text-black"
      >Display Size:
    </span>
    ${phoneDetails?.mainFeatures.displaySize}
  </p>
  <p class="py-2">
    <span class="font-semibold py-4 text-xl text-black"
      >ChipSet:
    </span>
    ${phoneDetails?.mainFeatures.chipSet}
  </p>
  <p class="py-2">
    <span class="font-semibold py-4 text-xl text-black"
      >Memory:
    </span>${phoneDetails?.mainFeatures?.memory}

  </p>
  <p class="py-2">
    <span class="font-semibold py-4 text-xl text-black">Slug:
    </span>
    ${phoneDetails?.slug}
  </p>
  <p class="py-2">
    <span class="font-semibold py-4 text-xl text-black"
      >Release Date:
      ${phoneDetails?.releaseDate}
    </span>
  </p>
  <p class="py-2">
    <span class="font-semibold py-4 text-xl text-black">GPS:
    </span>${phoneDetails?.others?.GPS}
  </p>
</div>
  
  `;
  showDetailsModal.showModal();
};

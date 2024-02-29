// tailwind custom colors
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "dark-1": "#100F0F",
        "dark-2": "#403F3F",
        "dark-3": "#706F6F",
        "primary-blue": "#0D6EFD",
      },
    },
  },
};

// getting data by api

async function loadPhone(searchText, isShowBtnVisible) {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowBtnVisible, searchText);
}

// displaying phones

function displayPhone(phones, isShowBtnVisible, searchText) {
  const phoneContainer = document.getElementById("product-container");
  phoneContainer.innerText = ``;
  const showAllBtnContainer = document.getElementById("showAllBtnContainer");
  if (phones.length > 6 && !isShowBtnVisible) {
    showAllBtnContainer.classList.remove("hidden");
  } else {
    showAllBtnContainer.classList.add("hidden");
  }
  // show massage when no data found
  const notFoundContainer = document.getElementById("notFoundContainer");
  const notFoundText = document.querySelector("#notFoundContainer h1");
  if (searchText.length === 0) {
    notFoundContainer.classList.remove("hidden");
    notFoundText.innerText = "Search Field is empty";
  } else if (phones.length === 0) {
    notFoundContainer.classList.remove("hidden");
    notFoundText.innerText = "No Device Found";
  } else {
    notFoundContainer.classList.add("hidden");
  }
  // showing only 6 phones on search result
  if (!isShowBtnVisible) {
    phones = phones.slice(0, 6);
  }
  ////----------------\\\\
  console.log(isShowBtnVisible);
  ////----------------\\\\
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = "card border border-[#CFCFCF]";
    div.innerHTML = `
    <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="${phone.phone_name}" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title font-bold text-2xl text-dark-2">
            ${phone.phone_name}
        </h2>
        <p class="text-dark-3 text-lg">
            There are many variations of passages of available, but the majority have suffered
        </p>
        <span class="text-dark-2 text-2xl font-bold">
            $999
        </span>
        <div class="card-actions">
            <button onclick="showDetails('${phone.slug}')" class="btn bg-primary-blue text-white hover:bg-[#4a92ff] py-2 px-6 h-auto font-semibold text-xl">Show Details</button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(div);
  });
  showLoader(false);
}

// show details

const showDetails = async (id) => {
  showLoader(true);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  document.getElementById("modal-content-container").innerHTML = `
  <div class="p-10">
    <img class="mx-auto" src="${phone?.image}" alt="Phone" />
  </div>
  <h2 class="font-bold text-3xl text-dark-2">
    ${phone?.name}
  </h2>
  <p class="text-dark-3 pt-6 pb-5">
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
  </p>

  <ul class="space-y-4">
    <li><strong>Storage :</strong> ${phone?.mainFeatures?.storage}</li>
    <li><strong>Display Size :</strong> ${phone?.mainFeatures?.displaySize}</li>
    <li><strong>Chipset :</strong> ${phone?.mainFeatures?.chipSet}</li>
    <li><strong>Memory :</strong> ${phone?.mainFeatures?.memory}</li>
    <li><strong>Slug :</strong> ${phone?.slug}</li>
    <li><strong>Release data :</strong> ${phone?.releaseDate}</li>
    <li><strong>Brand :</strong> ${phone?.brand}</li>
    <li><strong>GPS :</strong> ${phone?.others?.GPS || "No GPS"}</li>
  </ul>
  `;

  showLoader(false);
  detailsModal.showModal();
};

// show phones on search

const searchField = document.getElementById("searchField");
const searchText = () => searchField.value;

let arr = [];

function searchPhone() {
  arr = arr.slice(1, 1);
  arr.push(searchText());

  loadPhone(searchText());
  showLoader(true);
}

searchField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchPhone();
  }
});

// loader

const showLoader = (isLoad) => {
  const loaderContainer = document.getElementById("loader-container");
  if (isLoad) {
    loaderContainer.classList.remove("hidden");
  } else {
    loaderContainer.classList.add("hidden");
  }
};

// showAll

const showAll = () => {
  // searchPhone();
  loadPhone(arr[0], true);
  showLoader(true);
};

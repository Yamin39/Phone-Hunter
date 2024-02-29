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

async function loadPhone(searchText) {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // checking data in console
  console.log(data, phones);
  displayPhone(phones);
}

// displaying phones

function displayPhone(phones) {
  const phoneContainer = document.getElementById("product-container");
  phoneContainer.innerText = ``;
  const showAllBtnContainer = document.getElementById("showAllBtnContainer");
  if (phones.length > 6) {
    showAllBtnContainer.classList.remove("hidden");
  } else {
    showAllBtnContainer.classList.add("hidden");
  }
  // showing only 6 phones on search result
  phones = phones.slice(0, 6);
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = "card border border-[#CFCFCF]";
    div.innerHTML = `
    <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Phone" class="rounded-xl" />
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
            <button class="btn bg-primary-blue text-white hover:bg-[#4a92ff] py-2 px-6 h-auto font-semibold text-xl">Show Details</button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(div);
  });
  showLoader(false);
}

// show phones on search

const searchField = document.getElementById("searchField");

function searchPhone() {
  const searchText = searchField.value;
  loadPhone(searchText);
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

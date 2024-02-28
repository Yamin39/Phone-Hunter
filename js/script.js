// tailwind custom colors
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "Dark-1": "#100F0F",
        "Dark-2": "#403F3F",
        "Dark-3": "#706F6F",
        "primary-blue": "#0D6EFD",
      },
    },
  },
};

// getting data by api

async function loadPhone() {
  const res = await fetch("https://openapi.programming-hero.com/api/phones?search=iphone");
  const data = await res.json();
  const phones = data.data;
  console.log(data, phones);
  displayPhone(phones);
}

loadPhone();

// displaying phones

function displayPhone(phones) {
  const phoneContainer = document.getElementById("product-container");
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
}

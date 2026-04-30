let rowData = document.getElementById("row-data");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

document.addEventListener("DOMContentLoaded", () => {
    searchByName("").then(() => {
        document.querySelector(".loading-screen").classList.add("d-none");
        document.body.style.overflow = "visible";
    });
});

function openSideNav() {
    const sideNav = document.querySelector(".side-nav");
    sideNav.classList.add("open");

    const icon = document.querySelector(".open-close-icon");
    icon.classList.remove("fa-align-justify");
    icon.classList.add("fa-xmark");
}

function closeSideNav() {
    const sideNav = document.querySelector(".side-nav");
    sideNav.classList.remove("open");

    const icon = document.querySelector(".open-close-icon");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-align-justify");
}

document.querySelector(".side-nav .open-close-icon").addEventListener("click", () => {
    const sideNav = document.querySelector(".side-nav");
    if (sideNav.classList.contains("open")) {
        closeSideNav();
    } else {
        openSideNav();
    }
});


function showLoading() {
    document.querySelector(".loading-screen").classList.remove("d-none");
}

function hideLoading() {
    document.querySelector(".loading-screen").classList.add("d-none");
}

// Fetch functions
async function searchByName(term) {
    closeSideNav();
    rowData.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    hideLoading();
}

function displayMeals(arr) {
    let cartoona = "";
    for (let i = 0; i < Math.min(arr.length, 20); i++) {
        cartoona += `
        <div class="col-md-3">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="${arr[i].strMeal}">
                <div class="layer position-absolute d-flex align-items-center p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartoona;
}

// Categories
async function getCategories() {
    closeSideNav();
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayCategories(response.categories);
    hideLoading();
}

function displayCategories(arr) {
    let cartoona = "";
    for (let i = 0; i < Math.min(arr.length, 20); i++) {
        let desc = arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ") + "...";
        cartoona += `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strCategoryThumb}" alt="${arr[i].strCategory}">
                <div class="layer position-absolute d-flex flex-column justify-content-center text-center p-2">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${desc}</p>
                </div>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartoona;
}

async function getCategoryMeals(category) {
    rowData.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals);
    hideLoading();
}

// Area
async function getArea() {
    closeSideNav();
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals);
    hideLoading();
}

function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < Math.min(arr.length, 20); i++) {
        cartoona += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer text-white">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartoona;
}

async function getAreaMeals(area) {
    rowData.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    displayMeals(response.meals);
    hideLoading();
}

// Ingredients
async function getIngredients() {
    closeSideNav();
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    displayIngredients(response.meals);
    hideLoading();
}

function displayIngredients(arr) {
    let cartoona = "";
    for (let i = 0; i < Math.min(arr.length, 20); i++) {
        let desc = arr[i].strDescription ? arr[i].strDescription.split(" ").slice(0, 20).join(" ") + "..." : "";
        cartoona += `
        <div class="col-md-3">
            <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${desc}</p>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartoona;
}

async function getIngredientsMeals(ingredient) {
    rowData.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    response = await response.json();
    displayMeals(response.meals);
    hideLoading();
}

// Meal Details
async function getMealDetails(mealID) {
    closeSideNav();
    searchContainer.innerHTML = "";
    rowData.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();
    displayMealDetails(response.meals[0]);
    hideLoading();
}

function displayMealDetails(meal) {
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",") || [];
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] !== "") {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
        }
    }

    let cartoona = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2 class="text-white mt-2">${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
    `;
    rowData.innerHTML = cartoona;
}

// Search Inputs
function showSearchInputs() {
    closeSideNav();
    searchContainer.innerHTML = `
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `;
    rowData.innerHTML = "";
}

async function searchByFLetter(term) {
    closeSideNav();
    term == "" ? term = "a" : "";
    rowData.innerHTML = "";
    showLoading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    hideLoading();
}


function showContacts() {
    closeSideNav();
    searchContainer.innerHTML = "";

    // Load saved data from localStorage
    const saved = JSON.parse(localStorage.getItem("yummy_contact") || "{}");

    rowData.innerHTML = `
    <div class="contact-section col-12">
        <div class="contact-wrapper">

            <!-- Left Info Panel -->
            <div class="contact-left">
                <div>
                    <h2 class="contact-left-title">Let's Talk<br>Food &#127829;</h2>
                    <p class="contact-left-sub">Have a question or suggestion? We'd love to hear from you!</p>
                    <div class="contact-info-item">
                        <i class="fa-solid fa-envelope"></i>
                        <span>hello@yummy.com</span>
                    </div>
                    <div class="contact-info-item">
                        <i class="fa-solid fa-phone"></i>
                        <span>+1 (800) YUMMY-01</span>
                    </div>
                    <div class="contact-info-item">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>123 Food Street, Flavor City</span>
                    </div>
                </div>
                <div class="contact-social">
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>

            <!-- Right Form Panel -->
            <div class="contact-right">
                <h3 class="contact-right-title">Send a Message</h3>
                <p class="contact-right-sub">All fields are required &mdash; we'll respond within 24 hours.</p>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label-custom"><i class="fa-solid fa-user"></i> Full Name</label>
                        <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Your name" value="${saved.name || ''}">
                        <div id="nameAlert" class="field-alert d-none mt-1"><i class="fa-solid fa-triangle-exclamation"></i> Letters only, no numbers or symbols</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-custom"><i class="fa-solid fa-envelope"></i> Email</label>
                        <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control" placeholder="you@example.com" value="${saved.email || ''}">
                        <div id="emailAlert" class="field-alert d-none mt-1"><i class="fa-solid fa-triangle-exclamation"></i> Invalid email format</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-custom"><i class="fa-solid fa-phone"></i> Phone</label>
                        <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="+1 234 567 8900" value="${saved.phone || ''}">
                        <div id="phoneAlert" class="field-alert d-none mt-1"><i class="fa-solid fa-triangle-exclamation"></i> Enter a valid phone number</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-custom"><i class="fa-solid fa-cake-candles"></i> Age</label>
                        <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Your age" value="${saved.age || ''}">
                        <div id="ageAlert" class="field-alert d-none mt-1"><i class="fa-solid fa-triangle-exclamation"></i> Enter a valid age (1-120)</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-custom"><i class="fa-solid fa-lock"></i> Password</label>
                        <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Min 8 chars, 1 letter &amp; 1 number">
                        <div id="passwordAlert" class="field-alert d-none mt-1"><i class="fa-solid fa-triangle-exclamation"></i> Min 8 characters, with a letter &amp; number</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-custom"><i class="fa-solid fa-lock"></i> Confirm Password</label>
                        <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Repeat your password">
                        <div id="repasswordAlert" class="field-alert d-none mt-1"><i class="fa-solid fa-triangle-exclamation"></i> Passwords do not match</div>
                    </div>
                </div>
                <div class="mt-4">
                    <button id="submitBtn" disabled class="submit-btn">
                        <i class="fa-solid fa-paper-plane me-2"></i>Send Message
                    </button>
                </div>
            </div>

        </div>
    </div>
    `;
    submitBtn = document.getElementById("submitBtn");

    // If there's saved data, run validation to mark fields as valid
    if (saved.name || saved.email || saved.phone || saved.age) {
        nameInputTouched = !!saved.name;
        emailInputTouched = !!saved.email;
        phoneInputTouched = !!saved.phone;
        ageInputTouched = !!saved.age;
        inputsValidation();
    }

    document.getElementById("nameInput").addEventListener("focus", () => nameInputTouched = true);
    document.getElementById("emailInput").addEventListener("focus", () => emailInputTouched = true);
    document.getElementById("phoneInput").addEventListener("focus", () => phoneInputTouched = true);
    document.getElementById("ageInput").addEventListener("focus", () => ageInputTouched = true);
    document.getElementById("passwordInput").addEventListener("focus", () => passwordInputTouched = true);
    document.getElementById("repasswordInput").addEventListener("focus", () => repasswordInputTouched = true);

    // Save to localStorage on each keyup
    ["nameInput","emailInput","phoneInput","ageInput"].forEach(id => {
        document.getElementById(id).addEventListener("keyup", saveContactToStorage);
    });

    // Save & feedback on submit
    submitBtn.addEventListener("click", () => {
        saveContactToStorage();
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i>Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        submitBtn.disabled = true;
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Send Message';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

function saveContactToStorage() {
    const data = {
        name:  document.getElementById("nameInput")?.value  || "",
        email: document.getElementById("emailInput")?.value || "",
        phone: document.getElementById("phoneInput")?.value || "",
        age:   document.getElementById("ageInput")?.value   || "",
    };
    localStorage.setItem("yummy_contact", JSON.stringify(data));
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
        }
    }
    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
        }
    }

    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value));
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value));
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(document.getElementById("phoneInput").value));
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value));
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value));
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}

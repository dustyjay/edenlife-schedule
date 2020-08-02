const mealSchedule = document.querySelector(".cta__box.orange");
const container = document.querySelector(".cta__box--container");

const user = document.querySelector(".user");

const overlay = document.querySelector(".overlay");
let canCloseMeal = false;
let canCloseImage = false;
let mealClone;
let title;
let button;
let mealBody;

const getCoordinates = (el) => {
  const { top, left, width, height } = el.getBoundingClientRect();
  return {
    top,
    left,
    width,
    height
  };
};

const showLargeImage = (e) => {
  const coordinates = getCoordinates(e);
  e.classList.toggle("open");
  if (e.classList.contains("open"))
    e.setAttribute("style", `top:${coordinates.top - coordinates.top * 2}px`);
  else e.setAttribute("style", `top:0`);
  if (e.getAttribute("data-close")) e.classList.toggle("close");
  e.setAttribute("data-close", true);
};

const createMeal = (meal) => {
  const imgDiv = document.createElement("div");
  const img = document.createElement("img");

  img.src = meal.largeImage;
  img.alt = meal.title;

  if (meal.color) img.style.backgroundColor = meal.color;
  else img.style.backgroundImage = `url(${meal.backgroundImage})`;
  imgDiv.classList.add("meal__img");

  imgDiv.appendChild(img);
  const imgDivDouble = document.createElement("div");
  const imgDouble = document.createElement("img");

  imgDouble.src = meal.largeImage;
  imgDouble.alt = meal.title;

  if (meal.color) imgDouble.style.backgroundColor = meal.color;
  else imgDouble.style.backgroundImage = `url(${meal.backgroundImage})`;
  imgDivDouble.classList.add("meal__img", "double");

  imgDivDouble.appendChild(imgDouble);

  const mealTextDiv = document.createElement("div");
  const firstText = document.createElement("p");
  const secondText = document.createElement("p");

  firstText.innerHTML = meal.title;
  secondText.innerHTML = meal.category;
  mealTextDiv.classList.add("meal__text");

  mealTextDiv.appendChild(firstText);
  mealTextDiv.appendChild(secondText);

  const mealBox = document.createElement("div");
  mealBox.classList.add("meal__box");
  mealBox.appendChild(imgDiv);
  mealBox.appendChild(imgDivDouble);
  mealBox.appendChild(mealTextDiv);

  mealBody.appendChild(mealBox);

  imgDivDouble.onclick = function () {
    showLargeImage(this);
  };
};

const clearMealBody = () => {
  mealBody.querySelectorAll("*").forEach((el) => el.remove());
};

const meals = {
  title: "Today's meals",
  buttonContent: `<span><img src="./img/close.png" alt="Close Schedule" /></span>`,
  isOpen: false,
  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen)
      setTimeout(() => {
        clearMealBody();
      }, 1000);
  },
  items: [
    {
      img: "./img/meal1.png",
      largeImage: "./img/meals/meal1.png",
      title: "Akara & Pap",
      color: "#C6D6E4",
      category: "Carbohydrate"
    },
    {
      img: "./img/meal2.png",
      title: "Jollof Rice",
      color: "#D9B4B4",
      largeImage: "./img/meals/meal2.png",
      category: "Protein"
    },
    {
      img: "./img/meal3.png",
      title: "Gastonton",
      color: "#C6D6E4",
      largeImage: "./img/meals/meal3-large.png",
      category: "Carbohydrate"
    },
    {
      img: "./img/meal4.png",
      title: "Port Domenic",
      color: false,
      backgroundImage: "./img/meals/green.png",
      largeImage: "./img/meals/meal4.png",
      category: "Carbohydrate"
    },
    {
      img: "./img/meal5.png",
      title: "Carleeville",
      color: false,
      backgroundImage: "./img/meals/yellow.png",
      largeImage: "./img/meals/meal5.png",
      category: "Fats & Oils"
    },
    {
      img: "./img/meal6.png",
      title: "South Chesleyton",
      color: false,
      backgroundImage: "./img/meals/pink.png",
      largeImage: "./img/meals/meal6.png",
      category: "Vegetable"
    }
  ]
};

const changeContent = () => {
  if (meals.isOpen) meals.items.forEach((el) => createMeal(el));
  mealBody.classList.toggle("show");
  mealClone.classList.toggle("open");
  title.innerHTML = meals.title;
  if (canCloseMeal) mealClone.classList.toggle("close");
  mealSchedule.classList.toggle("translate");
  canCloseMeal = true;

  button.classList.add("fade");
  setTimeout(() => {
    button.classList.remove("fade");
    button.innerHTML = meals.buttonContent;
  }, 100);

  overlay.classList.toggle("show");
  document.body.classList.toggle("no-overflow");
  document.querySelector("main").classList.toggle("no-overflow");
};

const expandSchedule = () => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    meals.toggleOpen();
    changeContent();
  }, 100);
};

const setMeal = () => {
  changeContent();
};

window.onload = () => {
  // setMeal()
  mealClone = mealSchedule.cloneNode(true);
  mealClone.classList.add("clone");
  container.appendChild(mealClone);

  title = mealClone.querySelector("p.cta__title");
  button = mealClone.querySelector("button.cta__button");
  mealBody = mealClone.querySelector(".cta__box--body");
  console.log(mealBody);
};

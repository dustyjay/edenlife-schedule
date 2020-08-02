const mealSchedule = document.querySelector('.cta__box.orange')
const title = mealSchedule.querySelector('p.cta__title')
const button = mealSchedule.querySelector('button.cta__button')

const overlay = document.querySelector('.overlay')

const mealBody = document.querySelector('.cta__box--body')
let canCloseMeal = false

const showLargeImage = (e) => {
  console.log('Large Image click', e)
}

const createMeal = (meal) => {
  const imgDiv = document.createElement('div')
  const img = document.createElement('img')

  img.src = meal.largeImage
  img.alt = meal.title

  imgDiv.style.backgroundColor = meal.color
  imgDiv.classList.add('meal__img')

  imgDiv.appendChild(img)

  const mealTextDiv = document.createElement('div')
  const firstText = document.createElement('p')
  const secondText = document.createElement('p')

  firstText.innerHTML = meal.title
  secondText.innerHTML = meal.category
  mealTextDiv.classList.add('meal__text')

  mealTextDiv.appendChild(firstText)
  mealTextDiv.appendChild(secondText)

  const mealBox = document.createElement('div')
  mealBox.classList.add('meal__box')
  mealBox.appendChild(imgDiv)
  mealBox.appendChild(mealTextDiv)

  mealBody.appendChild(mealBox)

  imgDiv.onclick = function () {
    showLargeImage(this)
  }
}

const clearMealBody = () => {
  mealBody.querySelectorAll('*').forEach(el => el.remove())
}

const meals = {
  title: "View your meals for the week",
  closedTitle: 'View your meals for the week',
  openedTitle: "Today's meals",
  buttonContent: "Check 'em",
  isOpen: false,
  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.toggleTitle()
    this.toggleButton()
  },
  toggleTitle() {
    if (this.isOpen) this.title = this.openedTitle
    else this.title = this.closedTitle
  },
  toggleButton() {
    if (this.isOpen) {
      this.buttonContent = `<img src="./img/close.png" alt="Close Schedule" />`
      title.innerHTML = this.title
      button.innerHTML = this.buttonContent;
      mealSchedule.classList.toggle('open')
      if (canCloseMeal) mealSchedule.classList.toggle('close')
      canCloseMeal = true

      mealBody.classList.toggle('show')
      return true
    }

    this.buttonContent = "Check 'em"
    // setTimeout(() => {
    mealBody.classList.toggle('show')
    // }, 10);
    setTimeout(() => {
      clearMealBody()
    }, 300);
    setTimeout(() => {
      mealSchedule.classList.toggle('open')
      title.innerHTML = meals.title
      button.innerHTML = meals.buttonContent;
      if (canCloseMeal) mealSchedule.classList.toggle('close')
      canCloseMeal = true

    }, 200);
  },
  items: [
    {
      img: "./img/meal1.png",
      largeImage: "./img/meals/meal1.png",
      title: "Akara & Pap",
      color: '#C6D6E4',
      category: "Carbohydrate"
    },
    {
      img: "./img/meal2.png",
      title: "Jollof Rice",
      color: '#D9B4B4',
      largeImage: "./img/meals/meal2.png",
      category: "Protein"
    },
    {
      img: "./img/meal3.png",
      title: "Gastonton",
      color: '#C6D6E4',
      largeImage: "./img/meals/meal3.png",
      category: "Carbohydrate"
    }
  ]
};

const changeContent = () => {
  if (meals.isOpen) meals.items.forEach(el => {
    createMeal(el)
  }

  )
  overlay.classList.toggle('show')
  document.body.classList.toggle('no-overflow')
  document.querySelector('main').classList.toggle('no-overflow')

}

const expandSchedule = () => {
  meals.toggleOpen()
  changeContent()

}

const setMeal = () => {
  changeContent()
}

window.onload = () => {
  // setMeal()
}

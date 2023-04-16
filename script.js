const intensityButtons = document.querySelectorAll(".intensity__list__item__btn");
const informationButton = document.querySelector(".rank__information");
const informationWindow = document.querySelector(".information");
const informationClose = document.querySelector(".information__window__btn");
let isChoosen = false;
let choosenElement;
const fadeIn = (el, timeout, display) =>{
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) =>{
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = 'none';
    },timeout);
};

intensityButtons.forEach(e => {
    e.addEventListener("click", function() {
        if (isChoosen){
            choosenElement.classList.remove('active');
            e.classList.add('active');
            choosenElement = e;
        } else {
            e.classList.add('active');
            isChoosen = true;
            choosenElement = e;
        }
    })
})

informationButton.addEventListener("click", function() {
    fadeIn(informationWindow, 1000);
})

informationClose.addEventListener("click", function() {
    fadeOut(informationWindow, 1000);
})
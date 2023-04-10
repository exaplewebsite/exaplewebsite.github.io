const intensityButtons = document.querySelectorAll(".intensity__list__item__btn");
let isChoosen = false;
let choosenElement;
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
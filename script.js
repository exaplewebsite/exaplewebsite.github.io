const intensityButtons = document.querySelectorAll(".intensity__list__item__btn");
const informationButton = document.querySelector(".rank__information");
const informationWindow = document.querySelector(".information");
const informationClose = document.querySelector(".information__window__btn");
const firstIntensity = document.getElementById("firstIntensity");
const secondIntensity = document.getElementById("secondIntensity");
const thirdIntensity = document.getElementById("thirdIntensity");
const fourthIntensity = document.getElementById("fourthIntensity");
const officeHoursNumber = document.querySelector(".office-hours__number");
const rankImage = document.querySelector(".rank__name__img");
const rankLower = document.querySelector(".rank__progress__numbers__zero");
const rankUpper = document.querySelector(".rank__progress__numbers__one-hundred");
const rankValue = document.querySelector(".rank__progress__bar__complete__value");
const rankCompleteBar = document.querySelector(".rank__progress__bar__complete");
const rankCurrentName = document.querySelector(".rank__name__text__rank-name");
const saleValue = document.querySelector(".sale__value");
const subscriptionPeriod = document.querySelector(".subscription__period__number");
const subscriptionDay = document.getElementById("day");
const subscriptionHour = document.getElementById("hour");
const daysName = document.getElementById("days");
const notificationButton = document.querySelector(".intensity__notifications__btn__click");
const text = document.querySelectorAll(".text");
const nightBar = document.querySelector(".rank__progress__bar");
const nightInformation = document.querySelector("information__window");
let isChoosen = false;
let choosenElement;
let clientID = window.Telegram.WebApp.initDataUnsafe.user.id;
let night = false;
function findDate(data){
    let year =data[0].toString() + data[1].toString() + data[2].toString() + data[3].toString();
    let month = parseInt(data[5].toString() + data[6].toString()) - 1;
    let day = data[8].toString() + data[9].toString();
    let hour = data[11].toString() + data[12].toString();
    const date = new Date();
    const endDate = new Date(parseInt(year), month, parseInt(day), parseInt(hour));
    return Math.round((endDate - date)/3600000);
}

async function get(){
    const sub = await fetch('https://api.innoprog.ru:3000/subscription/' + clientID);
    const r = await fetch('https://api.innoprog.ru:3000/rank/' + clientID);
    const disc = await fetch('https://api.innoprog.ru:3000/discount/' + clientID);
    const ach = await fetch('https://api.innoprog.ru:3000/achievement/' + clientID);
    const ae = await fetch('https://api.innoprog.ru:3000/subscription/' + clientID)
    const achievements = await ach.json();
    const subscription = await sub.json();
    const rank = await r.json();
    const discount = await disc.json();
    let intensity = subscription.subscriptions[0].intensity;
    let notifications = subscription.subscriptions[0].notifications;
    if(notifications == 'off'){
        notificationButton.checked = false;
    }else{
        notificationButton.checked = true;
    }
    let officeHours = subscription.subscriptions[0].remaining_office_hours;
    let finishDate = subscription.subscriptions[0].finish_date;
    let startDate = subscription.subscriptions[0].start_date;
    let rankIcon = rank.icon;
    let rankLowerBound = rank.lower_bound;
    let rankUpperBound = rank.upper_bound;
    let rankPoints = rank.points;
    let rankName = rank.rank;
    let discountValue = discount.discount;
    switch (intensity){
        case 'Базовая':
            isChoosen = true;
            choosenElement = firstIntensity;
            firstIntensity.classList.add("active");
            break;
        case "Лёгкая":
            isChoosen = true;
            choosenElement = secondIntensity;
            secondIntensity.classList.add("active");
            break;
        case "Обычная":
            isChoosen = true;
            choosenElement = thirdIntensity;
            thirdIntensity.classList.add("active");
            break;
        case "Интенсивная":
            isChoosen = true;
            choosenElement = fourthIntensity;
            fourthIntensity.classList.add("active");
            break;
    }
    officeHoursNumber.textContent = officeHours;
    rankImage.src = rankIcon;
    rankLower.textContent = rankLowerBound;
    rankUpper.textContent = rankUpperBound;
    rankValue.textContent = rankPoints;
    let rankPercentage = ((rankPoints - rankLowerBound)/((rankUpperBound - rankLowerBound)/100)).toString();
    rankCompleteBar.style.width = rankPercentage + '%';
    rankCurrentName.textContent = rankName;
    saleValue.textContent = discountValue + "%";
    let period = startDate[8].toString() + startDate[9].toString() + "." + startDate[5].toString() + startDate[6].toString() + "." + startDate[2].toString() + startDate[3].toString() + " - " + finishDate[8].toString() + finishDate[9].toString() + "." + finishDate[5].toString() + finishDate[6].toString() + "." + finishDate[2].toString() + finishDate[3].toString();
    subscriptionPeriod.textContent = period;
    let hours = findDate(finishDate);
    let days = Math.floor(hours / 24);
    subscriptionDay.textContent = days;
    subscriptionHour.textContent = hours - (days * 24);
    if(days % 10 == 1){
        daysName.textContent = "день";
    } else if (days % 10 < 5){
        daysName.textContent = "дня";
    } else{
        daysName.textContent = "дней";
    }
    achievements.achievements.forEach(el => {
        const item = document.getElementById(el.id);
        item.src = "img/" + el.id + ".svg"; 
    })    
}
async function postIntensity(intensity) {
    const response = await fetch("https://api.innoprog.ru:3000/intensity/" + clientID, {
    method: "POST", 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({    
        intensity: intensity
    })
    });
    return response.json();
}
async function postNotification(state) {
    const response = await fetch("https://api.innoprog.ru:3000/notifications/" + clientID, {
    method: "POST", 
    headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({    
        intensity: state
    })
    });
    return response.json();
}

window.addEventListener("DOMContentLoaded", get);

const fadeIn = (el, timeout, display) =>{
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

notificationButton.addEventListener("click", function() {
    if(notificationButton.checked){
        postNotification('on');
        console.log("on");
    }else{
        postNotification('off');
    }
})

const fadeOut = (el, timeout) =>{
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = 'none';
    },timeout);
};

if(night){
    text.forEach(el => {
        el.classList.add("night");
    })
    nightBar.classList.add("night");
}

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
        let word = e.textContent;
        let firstLetter = word.charAt(0);
        let firstLetterCap = firstLetter.toUpperCase();
        let remainingLetters = word.slice(1);
        let capitalizedWord = firstLetterCap + remainingLetters;
        postIntensity(capitalizedWord);
    })
})

informationButton.addEventListener("click", function() {
    fadeIn(informationWindow, 1000);
})

informationClose.addEventListener("click", function() {
    fadeOut(informationWindow, 1000);
})
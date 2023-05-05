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
const nightInformation = document.querySelector(".information__window");
const hoursName = document.getElementById("hours");
const achievementIcons = document.querySelectorAll(".achievements__list__item__text");
const achOne = document.getElementById("ach_1");
const achTwo = document.getElementById("ach_2");
const achThree = document.getElementById("ach_3");
const achFour = document.getElementById("ach_4");
const achFive = document.getElementById("ach_5");
const achSix = document.getElementById("ach_6");
const informationText = document.getElementById("inf");
const sale = document.querySelector(".sale");
const intensityBlock = document.querySelector(".intensity");
const officeHoursBlock = document.querySelector(".office-hours");
const subscriptionBlock = document.querySelector(".subscription");
let isChoosen = false;
let choosenElement;
let clientID = window.Telegram.WebApp.initDataUnsafe.user.id;
let night = false;
let choosenAch = informationText;

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
    const r = await fetch('https://api.innoprog.ru:3000/rank/' + clientID);
    const rank = await r.json();
    let rankLowerBound = rank.lower_bound;
    let rankUpperBound = rank.upper_bound;
    let rankPoints = rank.points;
    let rankName = rank.rank;
    switch(rank.rank){
        case 'Незнайка':
            rankImage.src = "img/firstRank.png";
            break;
        case 'Винни-пух':
            rankImage.src = "img/secondRank.png";
            break;
        case 'Иван-новичок':
            rankImage.src = "img/thirdRank.png";
            break;    
        case 'Карлсон':
            rankImage.src = "img/fourthRank.png";
            break;
        case 'Кот Матроскин':
            rankImage.src = "img/fifthRank.png";
            break;
        case 'Попугай Кеша':
            rankImage.src = "img/sixthRank.png";
            break;
        case 'Пятачок':
            rankImage.src = "img/seventhRank.png";
            break;
        case 'Чебурашка':
            rankImage.src = "img/eighthRank.png";
            break;
    }
    rankLower.textContent = rankLowerBound;
    rankUpper.textContent = rankUpperBound;
    let rankPercentage = ((rankPoints - rankLowerBound)/((rankUpperBound - rankLowerBound)/100)).toString();
    rankCompleteBar.style.width = rankPercentage + '%';
    if(rankPoints == rankUpperBound || rankPoints == rankLowerBound){
        rankValue.textContent = '';
    }else{
        rankValue.textContent = rankPoints;
        if(rankCompleteBar.clientWidth < rankLower.clientWidth + rankValue.clientWidth){
        rankLower.textContent = '';
        }
        if(nightBar.clientWidth - rankCompleteBar.clientWidth < rankUpper.clientWidth + rankValue.clientWidth){
            rankUpper.textContent = '';
        }
    }
    rankCurrentName.textContent = rankName;
    let disc;
    let ach;
    let sub;
    try{
        disc = await fetch('https://api.innoprog.ru:3000/discount/' + clientID);
        ach = await fetch('https://api.innoprog.ru:3000/achievement/' + clientID);
        sub = await fetch('https://api.innoprog.ru:3000/subscription/' + clientID);
    }catch{
        intensityBlock.style.display = 'none';
        officeHoursBlock.style.display = 'none';
        subscriptionBlock.style.display = 'none';
        sale.style.display = 'none';
    
    }
    if(sub.ok && disc.ok && ach.ok){
        const achievements = await ach.json();
        const subscription = await sub.json();
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
        if((hours - (days * 24)) == 1 || (hours - (days * 24)) == 21){
            hoursName.textContent = "час";
        }else if ((hours - (days * 24)) < 5){
            hoursName.textContent = "часа";
        }else if((hours - (days * 24)) == 22 || (hours - (days * 24)) == 23 || (hours - (days * 24)) == 24){
            hoursName.textContent = "часа";
        }
        else{
            hoursName.textContent = "часов";
        }
        achievements.achievements.forEach(el => {
            const item = document.getElementById(el.id);
            item.src = "img/" + el.id + ".png"; 
        })
        if(hours <= 0){
            intensityBlock.style.display = 'none';
            officeHoursBlock.style.display = 'none';
            subscriptionBlock.style.display = 'none';
            if(discount.discount == 0){
                sale.style.display = 'none';
            }   
        }
    }
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
async function postNotifications(state) {
    const r = await fetch("https://api.innoprog.ru:3000/notifications/" + clientID, {
    method: "POST", 
    headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({    
        notifications: state
    })
    });
    return r.json();
}

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

window.addEventListener("DOMContentLoaded", get);

if(window.Telegram.WebApp.colorScheme == "dark"){
    night = true;
}

notificationButton.addEventListener("click", function() {
    let state;
    if(notificationButton.checked){
        state = 'on';
    }else{
        state = 'off';
    }
    postNotifications(state);
})

if(night){
    text.forEach(el => {
        el.classList.add("night");
    })
    nightBar.classList.add("night");
}

achievementIcons.forEach(el => {
    el.addEventListener("click", function(){
        switch (el.id){
            case 'one':
                achOne.style.display = 'block';
                if(choosenAch != achOne){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                choosenAch = achOne;
                fadeIn(informationWindow, 1000);
                break;
            case 'two':
                achTwo.style.display = 'block';
                if(choosenAch != achTwo){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                fadeIn(informationWindow, 1000);
                choosenAch = achTwo;
                break;
            case 'three':
                achThree.style.display = 'block';
                if(choosenAch != achThree){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                fadeIn(informationWindow, 1000);
                choosenAch = achThree;
                break;
            case 'four':
                achFour.style.display = 'block';
                if(choosenAch != achFour){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                fadeIn(informationWindow, 1000);
                choosenAch = achFour;
                break;
            case 'five':
                achFive.style.display = 'block';
                if(choosenAch != achFive){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                fadeIn(informationWindow, 1000);
                choosenAch = achFive;
                break;
            case 'six':
                achSix.style.display = 'block';
                if(choosenAch != achSix){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                fadeIn(informationWindow, 1000);
                choosenAch = achSix;
                break;    
        }
    })
})

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
    nightInformation.classList.remove("active");
    fadeIn(informationWindow, 1000);
    informationText.style.display = 'block';
    if(choosenAch != informationText){
        choosenAch.style.display = 'none';
    }
    choosenAch = informationText;
})

informationClose.addEventListener("click", function() {
    fadeOut(informationWindow, 1000);
})
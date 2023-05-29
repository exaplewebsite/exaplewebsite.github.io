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
const nightBar = document.querySelector(".rank__progress__bar");
const intensityBar = document.querySelector(".intensity__progress__bar");
const nightInformation = document.querySelector(".information__window");
const hoursName = document.getElementById("hours");
const achievementIcons = document.querySelectorAll(".achievements__list__item");
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
const achievementParagraph = document.querySelector(".achievements__p");
const achievementBtn = document.querySelector(".achievements__btn");
const message = document.querySelector(".message");
const intensityLower = document.querySelector(".intensity__progress__numbers__zero");
const intensityUpper = document.querySelector(".intensity__progress__numbers__one-hundred");
const intensityValue = document.querySelector(".intensity__progress__bar__complete__value");
const intensityCompleteBar = document.querySelector(".intensity__progress__bar__complete");
const achievementsList = document.querySelector(".achievements__list");
const achievementsListItem = document.querySelectorAll(".achievements__list__item");
const firstAchievementsContent = '<div id="one" class="achievements__list__item__text"><img id="1" src="img/seven-days-g.png" alt="7 in row"> <span class="text">7 дней вряд</span></div>';
const secondAchievementsContent = '<div id="two" class="achievements__list__item__text"><img id="2" src="img/fourteen-days-g.png" alt="14 in row"> <span class="text">14 дней вряд</span></div>';
const thirdAchievementsContent = '<div id="three" class="achievements__list__item__text"><img id="3" src="img/twenty-one-days-g.png" alt="21 in row"> <span class="text">21 день вряд</span></div>';
const fourthAchievementsContent = '<div id="four" class="achievements__list__item__text"><img id="4" src="img/invite-friend-g.png" alt="invite friend"> <span class="text">Друзья навеки</span></div>';
const fifthAchievementsContent = '<div id="five" class="achievements__list__item__text"><img id="5" src="img/own-g.png" alt="without office hours"> <span class="text">Без office hours</span></div>';
const sixthAchievementsContent = '<div id="six" class="achievements__list__item__text"><img id="6" src="img/complete-module-g.png" alt="complete module"> <span class="text">Завершил модуль</span></div>';
const achievementsContent = [firstAchievementsContent, secondAchievementsContent, thirdAchievementsContent, fourthAchievementsContent, fifthAchievementsContent, sixthAchievementsContent];
let isChoosen = false;
let choosenElement;
let clientID = window.Telegram.WebApp.initDataUnsafe.user.id;
let night = false;
let choosenAch = informationText;
let dayP;
let intensityPoints = new Array();

function findDate(data){
    let year =data[0].toString() + data[1].toString() + data[2].toString() + data[3].toString();
    let month = parseInt(data[5].toString() + data[6].toString()) - 1;
    let day = data[8].toString() + data[9].toString();
    let hour = data[11].toString() + data[12].toString();
    const date = new Date();
    const endDate = new Date(parseInt(year), month, parseInt(day), parseInt(hour));
    return Math.round((endDate - date)/3600000);
}

const fadeM = (el, timeout) =>{
    el.style.opacity = 0;
    el.style.display = 'block';
    el.style.transition = `opacity ${timeout}ms`
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.opacity = 0;
    },timeout);
    
};

async function get(){
    const r = await fetch('https://api.innoprog.ru:3000/rank/' + clientID);
    const disc = await fetch('https://api.innoprog.ru:3000/discount/' + clientID);
    const ach = await fetch('https://api.innoprog.ru:3000/achievement/' + clientID);
    const rank = await r.json();
    const achievements = await ach.json();
    const discount = await disc.json();
    let achievementsArray = [false, false, false, false, false, false];
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
    if(rankPercentage < 3 && rankPercentage != 0){
        rankPercentage = 3;
    }
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
    rankValue.style.transform = "translate(" + (rankValue.clientWidth/2 + 5).toString() + "px, 30px)";
    rankCurrentName.textContent = rankName;
    let discountValue = discount.discount;
    if(discountValue != 0){
        saleValue.textContent = discountValue + "%";
    }else{
        sale.style.display = 'none';
    }
    let achCount = 1;
    achievements.achievements.forEach(el => {
        const item = document.getElementById('achItem_' + achCount.toString());
        item.insertAdjacentHTML("afterbegin", achievementsContent[el.id - 1]);
        const itemImg = document.getElementById(el.id);
        itemImg.src = "img/" + el.id + ".png"; 
        achievementsArray[el.id - 1] = true;
        achCount++;
    })
    for(let i = 0; i < 6; i++){
        if(achievementsArray[i] == false){
            const item = document.getElementById('achItem_' + (achCount.toString()));
            item.insertAdjacentHTML("afterbegin", achievementsContent[i]);
            achCount++;
        }
    }
    const sub = await fetch('https://api.innoprog.ru:3000/subscription/' + clientID);
    const int = await fetch('https://api.innoprog.ru:3000/intensities');
    const intens = await int.json();
    intens.intensities.forEach(el => {
        intensityPoints.push(el.points);
    })
    if(!sub.ok){
        intensityBlock.style.display = 'none';
        officeHoursBlock.style.display = 'none';
        subscriptionBlock.style.display = 'none';
        achievementBtn.style.display = 'none';
        achievementParagraph.textContent = 'получение достижений доступно после оформления подписки';
    }else{
        const ref = await fetch('https://api.innoprog.ru:3000/referral/' + clientID);
        const refLink = await ref.json();
        achievementBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(refLink.link);
            fadeM(message, 1000);
        })
        const subscription = await sub.json();
        let intensity = subscription.subscriptions[subscription.subscriptions.length - 1].intensity;
        let notifications = subscription.subscriptions[subscription.subscriptions.length - 1].notifications;
        if(notifications == 'off'){
            notificationButton.checked = false;
        }else{
            notificationButton.checked = true;
        }
        let officeHours = subscription.subscriptions[subscription.subscriptions.length - 1].remaining_office_hours;
        let finishDate = subscription.subscriptions[subscription.subscriptions.length - 1].finish_date;
        let startDate = subscription.subscriptions[subscription.subscriptions.length - 1].start_date;
        let intensityUp;
        switch (intensity){
            case 'Базовая':
                isChoosen = true;
                choosenElement = firstIntensity;
                firstIntensity.classList.add("active");
                intensityUpper.textContent = intens.intensities[0].points;
                intensityUp = parseInt(intens.intensities[0].points);
                break;
            case "Средняя":
                isChoosen = true;
                choosenElement = secondIntensity;
                secondIntensity.classList.add("active");
                intensityUpper.textContent = intens.intensities[1].points;
                intensityUp = parseInt(intens.intensities[1].points);
                break;
            case "Продвинутая":
                isChoosen = true;
                choosenElement = thirdIntensity;
                thirdIntensity.classList.add("active");
                intensityUpper.textContent = intens.intensities[2].points;
                intensityUp = parseInt(intens.intensities[2].points);
                break;
            case "Экспертная":
                isChoosen = true;
                choosenElement = fourthIntensity;
                fourthIntensity.classList.add("active");
                intensityUpper.textContent = intens.intensities[3].points;
                intensityUp = parseInt(intens.intensities[3].points);
                break;
        }
        let dayPoints = subscription.subscriptions[subscription.subscriptions.length - 1].day_points;
        dayP = dayPoints;
        let intensityPercentage = Math.floor((dayPoints)/((intensityUp)/100));
        if(dayPoints > intensityUp){
            intensityCompleteBar.style.width = '100%';
        }else{
            intensityCompleteBar.style.width = intensityPercentage.toString() + '%';
        }
        if(dayPoints == 0 || dayPoints >= intensityUp){
            intensityValue.textContent = '';
        }else{
            intensityValue.textContent = dayPoints;
            if(intensityCompleteBar.clientWidth < intensityLower.clientWidth + intensityValue.clientWidth){
                intensityLower.textContent = '';
            }
            if(intensityBar.clientWidth - intensityCompleteBar.clientWidth < intensityUpper.clientWidth + intensityValue.clientWidth){
                intensityUpper.textContent = '';
            }
        }
        officeHoursNumber.textContent = officeHours;
        const ofH = document.getElementById("of_h");
        if(officeHours == 1){
            ofH.textContent = 'индивидуальное занятие';
        }else if(officeHours > 1 && officeHours < 5){
            ofH.textContent = 'индивидуальных занятия';
        }else{
            ofH.textContent = 'индивидуальных занятий';
        }
        let period = startDate[8].toString() + startDate[9].toString() + "." + startDate[5].toString() + startDate[6].toString() + "." + startDate[2].toString() + startDate[3].toString() + " - " + finishDate[8].toString() + finishDate[9].toString() + "." + finishDate[5].toString() + finishDate[6].toString() + "." + finishDate[2].toString() + finishDate[3].toString();
        subscriptionPeriod.textContent = period;
        let hours = findDate(finishDate);
        let days = Math.floor(hours / 24);
        subscriptionDay.textContent = days;
        subscriptionHour.textContent = hours - (days * 24);
        if(days % 10 == 1 && days != 11){
            daysName.textContent = "день";
        }else if(days < 21 && days > 4){
            daysName.textContent = "дней";
        } else if (days % 10 < 5 && days % 10 > 0){
            daysName.textContent = "дня";
        } else{
            daysName.textContent = "дней";
        }
        if((hours - (days * 24)) == 1 || (hours - (days * 24)) == 21){
            hoursName.textContent = "час";
        }else if((hours - (days * 24)) == 0){
            hoursName.textContent = "часов";
        } else if ((hours - (days * 24)) < 5){
            hoursName.textContent = "часа";
        }else if((hours - (days * 24)) == 22 || (hours - (days * 24)) == 23 || (hours - (days * 24)) == 24){
            hoursName.textContent = "часа";
        }
        else{
            hoursName.textContent = "часов";
        }
        if(hours <= 0){
            intensityBlock.style.display = 'none';
            officeHoursBlock.style.display = 'none';
            subscriptionBlock.style.display = 'none';
        }
    }
    if(window.Telegram.WebApp.colorScheme == "dark"){
        const text = document.querySelectorAll(".text");
        const buyHours = document.getElementById("buy_h");
        buyHours.style.color = 'white';
        text.forEach(el => {
            el.classList.add("night");
        })
        nightBar.classList.add("night");
        intensityBar.classList.add("night");
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

notificationButton.addEventListener("click", function() {
    let state;
    if(notificationButton.checked){
        state = 'on';
    }else{
        state = 'off';
    }
    postNotifications(state);
})

achievementIcons.forEach(el => {
    el.addEventListener("click", function(){
        switch (el.childNodes[0].id){
            case 'one':
                achOne.style.display = 'block';
                if(choosenAch != achOne){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                nightInformation.style.height =  "130px";
                choosenAch = achOne;
                fadeIn(informationWindow, 1000);
                break;
            case 'two':
                achTwo.style.display = 'block';
                if(choosenAch != achTwo){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                nightInformation.style.height =  "130px";
                fadeIn(informationWindow, 1000);
                choosenAch = achTwo;
                break;
            case 'three':
                achThree.style.display = 'block';
                if(choosenAch != achThree){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                nightInformation.style.height =  "130px";
                fadeIn(informationWindow, 1000);
                choosenAch = achThree;
                break;
            case 'four':
                achFour.style.display = 'block';
                if(choosenAch != achFour){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                nightInformation.style.height =  "130px";
                fadeIn(informationWindow, 1000);
                choosenAch = achFour;
                break;
            case 'five':
                achFive.style.display = 'block';
                if(choosenAch != achFive){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                nightInformation.style.height =  "130px";
                fadeIn(informationWindow, 1000);
                choosenAch = achFive;
                break;
            case 'six':
                achSix.style.display = 'block';
                if(choosenAch != achSix){
                    choosenAch.style.display = 'none';
                }
                nightInformation.classList.add("active");
                nightInformation.style.height =  "130px";
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
        let intensityU;
        switch(capitalizedWord){
            case 'Базовая':
                intensityU = intensityPoints[0];
                break;
            case 'Средняя':
                intensityU = intensityPoints[1];
                break;
            case 'Продвинутая':
                intensityU = intensityPoints[2]
                break;
            case 'Экспертная':
                intensityU = intensityPoints[3];
                break;
        }
        intensityUpper.textContent = intensityU;
        let intensityPercentage = Math.floor((dayP)/((intensityU)/100));
        if(dayP > intensityU){
            intensityCompleteBar.style.width = '100%';
        }else{
            intensityCompleteBar.style.width = intensityPercentage.toString() + '%';
        }
        if(dayP == 0 || dayP >= intensityU){
            intensityValue.textContent = '';
        }else{
            intensityValue.textContent = dayP;
            if(intensityCompleteBar.clientWidth < intensityLower.clientWidth + intensityValue.clientWidth){
                intensityLower.textContent = '';
            }
            if(intensityBar.clientWidth - intensityCompleteBar.clientWidth < intensityUpper.clientWidth + intensityValue.clientWidth){
                intensityUpper.textContent = '';
            }
        }
        postIntensity(capitalizedWord);
    })
})
informationButton.addEventListener("click", function() {
    nightInformation.classList.remove("active");
    nightInformation.style.height =  "500px";
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
const cardsColor = ['red', 'red', 'green', 'green', 'blue', 'blue', 'brown', 'brown', 'yellow', 'yellow', 'gray', 'gray', 'cadetblue', 'cadetblue', 'violet', 'violet', 'lightgreen', 'lightgreen'];

let cards = [...document.querySelectorAll("div")];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;



const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) return;
    activeCard.classList.remove("hiden");

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return
    } else {
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("off"));
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"))
                if (gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    const gametime = (endTime - startTime) / 1000;
                    alert(`Wygrana w czasie ${gametime}`);
                    location.reload();
                }
            } else {
                activeCards.forEach(card => card.classList.add("hiden"))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard));
        }, 1000)

    }

}

const init = function () {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    })

    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hiden");
            card.addEventListener("click", clickCard)
        })
    }, 2000)
}

init()
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    shuffle() {
        const cards = [];
        let current = this.head;
        while (current) {
            cards.push(current);
            current = current.next;
        }
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        this.head = cards[0];
        cards.forEach((node, index) => {
            node.next = cards[index + 1] || null;
        });
    }
}

const cardContainer = document.getElementById('cardContainer');
const scoreDisplay = document.getElementById('score');
let score = 0;
let firstCard = null;
let secondCard = null;
let linkedList = new LinkedList();

const cardValues = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍒', '🥭', '🍉'];
const doubledValues = [...cardValues, ...cardValues];

function createLinkedList() {
    doubledValues.forEach(value => linkedList.add(value));
    linkedList.shuffle();
}

function renderCards() {
    cardContainer.innerHTML = '';
    let current = linkedList.head;
    while (current) {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.value = current.value;
        card.innerText = current.value;
        card.addEventListener('click', handleCardClick);
        cardContainer.appendChild(card);
        current = current.next;
    }
}

function handleCardClick(event) {
    const card = event.target;

    if (card.classList.contains('matched') || card === firstCard || card === secondCard) return;

    card.classList.remove('hidden');

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            score += 10;
            resetTurn();
        } else {
            score -= 2;
            setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                resetTurn();
            }, 800);
        }
        scoreDisplay.innerText = score;
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
}

function resetGame() {
    score = 0;
    scoreDisplay.innerText = score;
    firstCard = null;
    secondCard = null;
    linkedList = new LinkedList();
    createLinkedList();
    renderCards();
}

createLinkedList();
renderCards();

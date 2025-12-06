const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const alphabetWords = {
    A: '🍎 Apple', B: '🎈 Balloon', C: '🐱 Cat', D: '🐕 Dog', E: '🐘 Elephant',
    F: '🦊 Fox', G: '🦒 Giraffe', H: '🏠 House', I: '🍦 Ice Cream', J: '🤹 Juggle',
    K: '🔑 Key', L: '🦁 Lion', M: '🌙 Moon', N: '🎵 Note', O: '🐙 Octopus',
    P: '🐧 Penguin', Q: '👑 Queen', R: '🌈 Rainbow', S: '⭐ Star', T: '🐯 Tiger',
    U: '☂️ Umbrella', V: '🎻 Violin', W: '🐋 Whale', X: '❌ X-ray', Y: '🧶 Yarn', Z: '🦓 Zebra'
};
const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '1️⃣1️⃣', '1️⃣2️⃣', '1️⃣3️⃣', '1️⃣4️⃣', '1️⃣5️⃣', '1️⃣6️⃣', '1️⃣7️⃣', '1️⃣8️⃣', '1️⃣9️⃣', '2️⃣0️⃣'];

const colors = [
    { name: 'Red', hex: '#ef4444', emoji: '🔴' },
    { name: 'Blue', hex: '#3b82f6', emoji: '🔵' },
    { name: 'Green', hex: '#10b981', emoji: '🟢' },
    { name: 'Yellow', hex: '#fbbf24', emoji: '🟡' },
    { name: 'Orange', hex: '#f97316', emoji: '🟠' },
    { name: 'Purple', hex: '#a855f7', emoji: '🟣' },
    { name: 'Pink', hex: '#ec4899', emoji: '🌸' },
    { name: 'Brown', hex: '#92400e', emoji: '🟤' },
    { name: 'Black', hex: '#1f2937', emoji: '⚫' },
    { name: 'White', hex: '#f9fafb', emoji: '⚪' }
];

const shapes = [
    { name: 'Circle', class: 'shape-circle' },
    { name: 'Square', class: 'shape-square' },
    { name: 'Triangle', class: 'shape-triangle' },
    { name: 'Star', class: 'shape-star', emoji: '⭐' },
    { name: 'Heart', class: 'shape-heart', emoji: '❤️' }
];

const animals = [
    { name: 'Dog', emoji: '🐶', sound: 'Woof woof!' },
    { name: 'Cat', emoji: '🐱', sound: 'Meow meow!' },
    { name: 'Cow', emoji: '🐮', sound: 'Moo moo!' },
    { name: 'Sheep', emoji: '🐑', sound: 'Baa baa!' },
    { name: 'Duck', emoji: '🦆', sound: 'Quack quack!' },
    { name: 'Lion', emoji: '🦁', sound: 'Roar!' },
    { name: 'Elephant', emoji: '🐘', sound: 'Trumpet!' },
    { name: 'Monkey', emoji: '🐵', sound: 'Ooh ooh ah ah!' },
    { name: 'Bird', emoji: '🐦', sound: 'Tweet tweet!' },
    { name: 'Frog', emoji: '🐸', sound: 'Ribbit ribbit!' }
];

let currentMode = 'menu';
let currentIndex = 0;
let scores = {
    abc: 0,
    number: 0,
    colors: 0,
    shapes: 0,
    animals: 0
};

function showScreen(mode) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    currentMode = mode;
    currentIndex = 0;

    if (mode === 'menu') {
        document.getElementById('menuScreen').classList.add('active');
    } else if (mode === 'abc') {
        document.getElementById('abcScreen').classList.add('active');
        updateABC();
    } else if (mode === '123') {
        document.getElementById('numberScreen').classList.add('active');
        updateNumber();
    } else if (mode === 'colors') {
        document.getElementById('colorsScreen').classList.add('active');
        updateColor();
    } else if (mode === 'shapes') {
        document.getElementById('shapesScreen').classList.add('active');
        updateShape();
    } else if (mode === 'animals') {
        document.getElementById('animalsScreen').classList.add('active');
        updateAnimal();
    } else if (mode === 'quiz') {
        document.getElementById('quizScreen').classList.add('active');
        updateQuiz();
    }
}

function updateABC() {
    const letter = alphabet[currentIndex];
    document.getElementById('letterDisplay').textContent = letter;
    document.getElementById('wordDisplay').textContent = alphabetWords[letter];
    document.getElementById('abcPrev').disabled = currentIndex === 0;
    document.getElementById('abcNext').disabled = currentIndex === alphabet.length - 1;
}

function updateNumber() {
    const number = currentIndex + 1;
    document.getElementById('numberDisplay').textContent = number;
    document.getElementById('emojiDisplay').textContent = numberEmojis[currentIndex];

    const container = document.getElementById('dotsContainer');
    container.innerHTML = '';

    const dotClass = number > 10 ? 'dot dot-small' : 'dot';

    for (let i = 0; i < number; i++) {
        const dot = document.createElement('div');
        dot.className = dotClass;
        dot.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(dot);
    }

    document.getElementById('numPrev').disabled = currentIndex === 0;
    document.getElementById('numNext').disabled = currentIndex === 19;
}

function updateColor() {
    const color = colors[currentIndex];
    document.getElementById('colorName').textContent = color.emoji + ' ' + color.name;
    document.getElementById('colorBox').style.background = color.hex;
    document.getElementById('colorPrev').disabled = currentIndex === 0;
    document.getElementById('colorNext').disabled = currentIndex === colors.length - 1;
}

function updateShape() {
    const shape = shapes[currentIndex];
    document.getElementById('shapeName').textContent = shape.name;
    const container = document.getElementById('shapeContainer');
    container.innerHTML = '';

    if (shape.emoji) {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = `shape ${shape.class}`;
        shapeDiv.textContent = shape.emoji;
        container.appendChild(shapeDiv);
    } else {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = `shape ${shape.class}`;
        container.appendChild(shapeDiv);
    }

    document.getElementById('shapePrev').disabled = currentIndex === 0;
    document.getElementById('shapeNext').disabled = currentIndex === shapes.length - 1;
}

function updateAnimal() {
    const animal = animals[currentIndex];
    document.getElementById('animalEmoji').textContent = animal.emoji;
    document.getElementById('animalName').textContent = animal.name;
    document.getElementById('animalPrev').disabled = currentIndex === 0;
    document.getElementById('animalNext').disabled = currentIndex === animals.length - 1;
}

function previousItem(mode) {
    if (currentIndex > 0) {
        currentIndex--;
        updateCurrentScreen(mode);
    }
}

function nextItem(mode) {
    const maxIndex = getMaxIndex(mode);
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCurrentScreen(mode);
    }
}

function getMaxIndex(mode) {
    if (mode === 'abc') return alphabet.length - 1;
    if (mode === '123') return 19;
    if (mode === 'colors') return colors.length - 1;
    if (mode === 'shapes') return shapes.length - 1;
    if (mode === 'animals') return animals.length - 1;
    return 0;
}

function updateCurrentScreen(mode) {
    if (mode === 'abc') updateABC();
    else if (mode === '123') updateNumber();
    else if (mode === 'colors') updateColor();
    else if (mode === 'shapes') updateShape();
    else if (mode === 'animals') updateAnimal();
}

function sayLetter() {
    const letter = alphabet[currentIndex];
    const word = alphabetWords[letter].split(' ')[1];
    speak(`${letter}. ${word}`);
    celebrate('abc');
}

function sayNumber() {
    const number = currentIndex + 1;
    speak(`${number}`);
    celebrate('number');
}

function sayColor() {
    const color = colors[currentIndex];
    speak(color.name);
    celebrate('colors');
}

function sayShape() {
    const shape = shapes[currentIndex];
    speak(shape.name);
    celebrate('shapes');
}

function sayAnimal() {
    const animal = animals[currentIndex];
    speak(`${animal.name} says ${animal.sound}`);
    celebrate('animals');
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
}

function celebrate(mode) {
    scores[mode]++;
    const scoreId = mode === 'abc' ? 'abcScore' :
        mode === 'number' ? 'numberScore' :
            mode === 'colors' ? 'colorsScore' :
                mode === 'shapes' ? 'shapesScore' : 'animalsScore';
    document.getElementById(scoreId).textContent = scores[mode];

    const celebration = document.getElementById('celebration');
    celebration.classList.add('active');

    for (let i = 0; i < 12; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '⭐';
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 0.5}s`;
        celebration.appendChild(star);

        setTimeout(() => star.remove(), 1500);
    }

    setTimeout(() => {
        celebration.classList.remove('active');
    }, 2000);
}

// --- Quiz (Q/A) logic ---
let qaList = [];
let qaIndex = 0;

async function loadQA() {
    try {
        const res = await fetch('./qa.json');
        if (!res.ok) throw new Error('Failed to load qa.json');
        qaList = await res.json();
        qaIndex = 0;
    } catch (err) {
        console.error('Error loading QA:', err);
        qaList = [
  {
    "question": "What color is the sky on a clear day?",
    "answer": "Blue"
  },
  {
    "question": "What is your name?",
    "answer": "Sirjan Singh"
  },
  {
    "question": "How old are you?",
    "answer": "4"
  },
  {
    "question": "When is your birthday?",
    "answer": "5th March"
  },
  {
    "question": "What is your father's name?",
    "answer": "Satnam Singh"
  },
  {
    "question": "What is your mother's name?",
    "answer": "Sarabjit Kaur"
  },
  {
    "question": "What is your favorite color?",
    "answer": "Blue"
  },
  {
    "question": "What is your favorite animal?",
    "answer": "Dog"
  },
  {
    "question": "How many fingers do you have on one hand?",
    "answer": "5"
  },
  {
    "question": "What sound does a dog make?",
    "answer": "Woof or Bark"
  },
  {
    "question": "What do you like to do for fun?",
    "answer": "Play games"
  }
];
          qaIndex = 0;
    }
}

function updateQuiz() {
    const qEl = document.getElementById('quizQuestion');
    const aEl = document.getElementById('quizAnswer');
    const prevBtn = document.getElementById('quizPrev');
    const nextBtn = document.getElementById('quizNext');

    if (!qaList || qaList.length === 0) {
        qEl.textContent = 'No questions available.';
        aEl.style.display = 'none';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    const item = qaList[qaIndex];
    qEl.textContent = item.question || 'Untitled question';
    aEl.textContent = item.answere || item.answer || '';
    aEl.style.display = 'none';

    prevBtn.disabled = qaIndex === 0;
    nextBtn.disabled = qaIndex === qaList.length - 1;
}

function previousQA() {
    if (qaIndex > 0) {
        qaIndex--;
        updateQuiz();
    }
}

function nextQA() {
    if (qaIndex < qaList.length - 1) {
        qaIndex++;
        updateQuiz();
    }
}

function toggleAnswer() {
    const aEl = document.getElementById('quizAnswer');
        speak(`${aEl.textContent}`);

    if (!aEl) return;
    if (aEl.style.display === 'none' || aEl.style.display === '') {
        aEl.style.display = 'block';
    } else {
        aEl.style.display = 'none';
    }
}

// load QA on script start
loadQA();
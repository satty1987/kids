    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const alphabetWords = {
            A: '🍎 Apple', B: '🎈 Balloon', C: '🐱 Cat', D: '🐕 Dog', E: '🐘 Elephant',
            F: '🦊 Fox', G: '🦒 Giraffe', H: '🏠 House', I: '🍦 Ice Cream', J: '🤹 Juggle',
            K: '🔑 Key', L: '🦁 Lion', M: '🌙 Moon', N: '🎵 Note', O: '🐙 Octopus',
            P: '🐧 Penguin', Q: '👑 Queen', R: '🌈 Rainbow', S: '⭐ Star', T: '🐯 Tiger',
            U: '☂️ Umbrella', V: '🎻 Violin', W: '🐋 Whale', X: '❌ X-ray', Y: '🧶 Yarn', Z: '🦓 Zebra'
        };
        const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '1️⃣1️⃣', '1️⃣2️⃣', '1️⃣3️⃣', '1️⃣4️⃣', '1️⃣5️⃣', '1️⃣6️⃣', '1️⃣7️⃣', '1️⃣8️⃣', '1️⃣9️⃣', '2️⃣0️⃣'];

        let currentMode = 'menu';
        let currentIndex = 0;
        let abcScore = 0;
        let numberScore = 0;

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
            for (let i = 0; i < number; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.style.animationDelay = `${i * 0.1}s`;
                container.appendChild(dot);
            }
            
            document.getElementById('numPrev').disabled = currentIndex === 0;
            document.getElementById('numNext').disabled = currentIndex === 19;
        }

        function previousItem(mode) {
            if (currentIndex > 0) {
                currentIndex--;
                if (mode === 'abc') updateABC();
                else updateNumber();
            }
        }

        function nextItem(mode) {
            const maxIndex = mode === 'abc' ? alphabet.length - 1 : 19;
            if (currentIndex < maxIndex) {
                currentIndex++;
                if (mode === 'abc') updateABC();
                else updateNumber();
            }
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
            celebrate('123');
        }

        function speak(text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
        }

        function celebrate(mode) {
            if (mode === 'abc') {
                abcScore++;
                document.getElementById('abcScore').textContent = abcScore;
            } else {
                numberScore++;
                document.getElementById('numberScore').textContent = numberScore;
            }

            const celebration = document.getElementById('celebration');
            celebration.classList.add('active');

            // Create floating stars
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
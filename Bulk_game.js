// המילים החדשות והמורחבות
const categories = {
    programming: ['מחשב', 'אינטרנט', 'תכנות', 'פיתוח', 'שרת', 'קוד', 'תוכנה', 'רשת', 'מקלדת', 'עכבר', 'אפליקציה', 'משחק', 'ריאקט', 'נוד', 'סישארפ', 'אבטחה', 'אלגוריתם', 'דאטה'],
    anime: ['איצגו', 'רוקיה', 'בנקאי', 'הולו', 'שיניגאמי', 'נארוטו', 'סאסקה', 'לופי', 'זורו', 'אנימציה', 'מנגה', 'טוקיו', 'גוקו', 'סליים', 'פנטזיה', 'קוספליי'],
    cars: ['מנוע', 'הילוכים', 'בלמים', 'הגה', 'כביש', 'יונדאי', 'ולוסטר', 'אגזוז', 'מפתח', 'גלגל', 'צמיג', 'מהירות', 'דלק', 'שמן', 'טורבו', 'מצבר', 'מוסך'],
    gaming: ['קונסולה', 'שלט', 'מקלדת', 'עכבר', 'פינג', 'לאג', 'סנייפר', 'בוס', 'לוט', 'סקין', 'קווסט', 'שחקן', 'מולטיפלייר', 'ראנק'],
    food: ['פיצה', 'המבורגר', 'פסטה', 'סלט', 'שוקולד', 'גלידה', 'סושי', 'סטייק', 'צופס', 'עוגה', 'לחם', 'גבינה', 'בשר', 'פירות'],
    animals: ['כלב', 'חתול', 'אריה', 'נמר', 'פיל', 'קוף', 'גירפה', 'זאב', 'דוב', 'נשר', 'דולפין', 'לוויתן', 'כריש', 'תוכי', 'נחש']
};

// הקישורים לתמונות הרקע
const backgrounds = {
    programming: 'url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop")',
    anime: 'url("anime.jpg")', // תמונת הרוחב של האנימה
    cars: 'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000&auto=format&fit=crop")',
    gaming: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop")',
    food: 'url("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop")',
    animals: 'url("https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2000&auto=format&fit=crop")'
};

let wordsToFind = [];
const gridSize = 12;
const gridElement = document.getElementById('grid');
const wordListElement = document.getElementById('word-list');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const categorySelect = document.getElementById('category-select');
const gameArea = document.getElementById('game-area');
const newGameBtn = document.getElementById('new-game-btn');

// אלמנטים חדשים למודל הניצחון והשיאים
const highScoreElement = document.getElementById('high-score');
const victoryModal = document.getElementById('victory-modal');
const finalScoreElement = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const newRecordMsg = document.getElementById('new-record-msg');

// טעינת השיא הלוקאלי (localStorage) מהדפדפן
let currentHighScore = localStorage.getItem('bulkGameHighScore') || 0;
if (highScoreElement) highScoreElement.textContent = currentHighScore;

let gridMatrix = [];
let isDragging = false;
let selectedCells = [];
let wordFoundCount = 0;
let startCell = null;

let timeLeft = 180;
let score = 0;
let timerInterval = null;
let isGameActive = false;
let hasGameStarted = false;

// --- מערכת סאונד ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = {};
const soundSettings = {
    tick: { volume: 0.3, offset: 1.0 },
    found: { volume: 0.7, offset: 0 },
    error: { volume: 0.5, offset: 0 },
    win: { volume: 1.0, offset: 0 }
};

async function loadSound(name, url) {
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        audioBuffers[name] = audioBuffer;
    } catch (e) {
        console.error(`שגיאה בטעינת סאונד ${name}:`, e);
    }
}

loadSound('tick', 'sounds/tick.mp3');
loadSound('found', 'sounds/found.mp3');
loadSound('error', 'sounds/error.mp3');
loadSound('win', 'sounds/win.mp3');

function playSound(name) {
    if (audioBuffers[name]) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffers[name];
        const gainNode = audioCtx.createGain();
        const settings = soundSettings[name];
        gainNode.gain.value = settings.volume;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start(0, settings.offset);
    }
}

function updateBackground() {
    const selectedCategory = categorySelect.value;
    document.body.style.backgroundImage = backgrounds[selectedCategory];
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 180;
    timerElement.textContent = formatTime(timeLeft);
    isGameActive = true;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isGameActive = false;
            setTimeout(() => alert(`נגמר הזמן! ⏳ הניקוד הסופי שלך הוא: ${score}`), 100);
        }
    }, 1000);
}

function pickRandomWords(numWords) {
    const selectedCategory = categorySelect.value;
    const currentCategoryWords = categories[selectedCategory];
    const shuffled = [...currentCategoryWords].sort(() => 0.5 - Math.random());
    wordsToFind = shuffled.slice(0, numWords);
}

function initializeMatrix() {
    gridMatrix = [];
    for (let i = 0; i < gridSize; i++) {
        gridMatrix[i] = new Array(gridSize).fill('');
    }
}

function canPlaceWord(word, row, col, dir) {
    if (dir === 'horizontal' && col + word.length > gridSize) return false;
    if (dir === 'vertical' && row + word.length > gridSize) return false;
    if (dir === 'diagonal' && (row + word.length > gridSize || col + word.length > gridSize)) return false;
    if (dir === 'diagonal-up' && (row - (word.length - 1) < 0 || col + word.length > gridSize)) return false;

    for (let i = 0; i < word.length; i++) {
        let currentRow = row;
        let currentCol = col;
        if (dir === 'vertical') currentRow = row + i;
        else if (dir === 'horizontal') currentCol = col + i;
        else if (dir === 'diagonal') { currentRow = row + i; currentCol = col + i; }
        else if (dir === 'diagonal-up') { currentRow = row - i; currentCol = col + i; }

        if (gridMatrix[currentRow][currentCol] !== '' && gridMatrix[currentRow][currentCol] !== word[i]) {
            return false;
        }
    }
    return true;
}

function placeWord(word) {
    const directions = ['horizontal', 'vertical', 'diagonal', 'diagonal-up'];
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 200) {
        const dir = directions[Math.floor(Math.random() * directions.length)];
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(word, row, col, dir)) {
            for (let i = 0; i < word.length; i++) {
                if (dir === 'horizontal') gridMatrix[row][col + i] = word[i];
                else if (dir === 'vertical') gridMatrix[row + i][col] = word[i];
                else if (dir === 'diagonal') gridMatrix[row + i][col + i] = word[i];
                else if (dir === 'diagonal-up') gridMatrix[row - i][col + i] = word[i];
            }
            placed = true;
        }
        attempts++;
    }
}

function fillEmptySpacesAndRender() {
    const hebrewAlphabet = "אבגדהוזחטיכלמנסעפצקרשתםןףץך";
    gridElement.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (gridMatrix[row][col] === '') {
                gridMatrix[row][col] = hebrewAlphabet.charAt(Math.floor(Math.random() * hebrewAlphabet.length));
            }
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gridMatrix[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;

            // תמיכה בעכבר ומגע לטלפונים
            cell.addEventListener('mousedown', handleMouseDown);
            cell.addEventListener('mouseover', handleMouseOver);
            cell.addEventListener('touchstart', handleTouchStart, { passive: false });

            gridElement.appendChild(cell);
        }
    }
}

// פונקציה לבדיקת החלקה ובחירה (למגע ולעכבר)
function processCellSelection(currentCell) {
    if (!startCell) return;
    const startRow = parseInt(startCell.dataset.row);
    const startCol = parseInt(startCell.dataset.col);
    const currRow = parseInt(currentCell.dataset.row);
    const currCol = parseInt(currentCell.dataset.col);

    const rowDiff = currRow - startRow;
    const colDiff = currCol - startCol;

    const isHorizontal = rowDiff === 0;
    const isVertical = colDiff === 0;
    const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

    if (isHorizontal || isVertical || isDiagonal) {
        document.querySelectorAll('.cell.selected').forEach(cell => {
            if (!cell.classList.contains('found')) cell.classList.remove('selected');
        });

        const oldLength = selectedCells.length;
        selectedCells = [];

        const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
        const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);
        const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));

        for (let i = 0; i <= steps; i++) {
            const r = startRow + (i * rowStep);
            const c = startCol + (i * colStep);
            const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.add('selected');
                selectedCells.push(cell);
            }
        }
        if (selectedCells.length !== oldLength) playSound('tick');
    }
}

// ניהול אירועי עכבר
function handleMouseDown(e) {
    if (!isGameActive) return;
    if (e.target.classList.contains('cell')) {
        isDragging = true;
        startCell = e.target;
        selectedCells = [startCell];
        startCell.classList.add('selected');
        playSound('tick');
    }
}

function handleMouseOver(e) {
    if (!isGameActive || !isDragging) return;
    if (e.target.classList.contains('cell')) processCellSelection(e.target);
}

// ניהול אירועי מגע (לטלפון)
function handleTouchStart(e) {
    if (!isGameActive) return;
    if (e.target.classList.contains('cell')) {
        e.preventDefault();
        isDragging = true;
        startCell = e.target;
        selectedCells = [startCell];
        startCell.classList.add('selected');
        playSound('tick');
    }
}

function handleTouchMove(e) {
    if (!isGameActive || !isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const targetCell = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetCell && targetCell.classList.contains('cell')) {
        processCellSelection(targetCell);
    }
}

function handleMouseUp() {
    if (isDragging) {
        isDragging = false;
        checkSelectedWord();
        startCell = null;
    }
}

function checkSelectedWord() {
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    const reversedWord = selectedWord.split('').reverse().join('');
    let foundMatch = false;

    if (wordsToFind.includes(selectedWord) || wordsToFind.includes(reversedWord)) {
        const actualWord = wordsToFind.includes(selectedWord) ? selectedWord : reversedWord;
        const wordElement = document.getElementById(`word-${actualWord}`);

        if (wordElement && !wordElement.classList.contains('found')) {
            wordElement.classList.add('found');

            selectedCells.forEach(cell => {
                cell.classList.remove('selected');
                cell.classList.add('found');
            });

            foundMatch = true;
            wordFoundCount++;
            score += 100;
            scoreElement.textContent = score;

            if (wordFoundCount === wordsToFind.length) {
                clearInterval(timerInterval);
                isGameActive = false;
                const timeBonus = timeLeft * 2;
                score += timeBonus;
                scoreElement.textContent = score;

                playSound('win');

                // אפקט קונפטי לניצחון
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

                // שמירת שיאים הלוקאלית
                finalScoreElement.textContent = score;
                if (score > currentHighScore) {
                    currentHighScore = score;
                    localStorage.setItem('bulkGameHighScore', currentHighScore);
                    highScoreElement.textContent = currentHighScore;
                    newRecordMsg.classList.remove('hidden');
                } else {
                    newRecordMsg.classList.add('hidden');
                }

                // הצגת המודל במקום האזהרה הישנה (alert)
                setTimeout(() => {
                    victoryModal.classList.remove('hidden');
                }, 400);
            } else {
                playSound('found');
            }
        }
    }

    if (!foundMatch) {
        if (selectedCells.length > 1) {
            playSound('error');
        }
        document.querySelectorAll('.cell.selected').forEach(cell => {
            if (!cell.classList.contains('found')) {
                cell.classList.remove('selected');
            }
        });
    }
    selectedCells = [];
}

function renderWordList() {
    wordListElement.innerHTML = '';
    wordsToFind.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word-item');
        wordDiv.textContent = word;
        wordDiv.id = `word-${word}`;
        wordListElement.appendChild(wordDiv);
    });
}

function initGame() {
    wordFoundCount = 0;
    score = 0;
    scoreElement.textContent = score;

    pickRandomWords(10);
    initializeMatrix();
    wordsToFind.forEach(word => placeWord(word));
    fillEmptySpacesAndRender();
    renderWordList();

    startTimer();
}

function startGameFlow() {
    if (!hasGameStarted) {
        hasGameStarted = true;
        gameArea.classList.remove('hidden');
        newGameBtn.textContent = 'משחק חדש';
    }
    initGame();
}

// קריאה ראשונית לעדכון רקע
updateBackground();

newGameBtn.addEventListener('click', startGameFlow);

categorySelect.addEventListener('change', () => {
    updateBackground();
    if (hasGameStarted) {
        initGame();
    }
});

// מאזין לכפתור "שחק שוב" בתוך המודל
playAgainBtn.addEventListener('click', () => {
    victoryModal.classList.add('hidden');
    startGameFlow();
});

// מאזינים לשחרור האצבע או העכבר בסיום הגרירה
document.addEventListener('mouseup', handleMouseUp);
gridElement.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleMouseUp);
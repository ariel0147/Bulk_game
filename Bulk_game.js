const categories = {
    programming: ['מחשב', 'אינטרנט', 'תכנות', 'פיתוח', 'שרת', 'קוד', 'תוכנה', 'ריאקט', 'נוד', 'סישארפ', 'פיאייצפי', 'אקספרס', 'אבטחה', 'דאטה'],
    anime: ['איצגו', 'רוקיה', 'בנקאי', 'הולו', 'שיניגאמי', 'נארוטו', 'סאסקה', 'לופי', 'זורו', 'אנימציה', 'מנגה', 'טוקיו', 'גוקו', 'קוספליי'],
    cars: ['מנוע', 'הילוכים', 'בלמים', 'הגה', 'כביש', 'יונדאי', 'ולוסטר', 'אגזוז', 'מפתח', 'כיסוי', 'גלגל', 'צמיג', 'מהירות', 'דלק', 'מצבר', 'מוסך'],
    mobile_games: ['סליים', 'טירה', 'שדרוג', 'מובייל', 'קונסולה', 'שלט', 'סנייפר', 'בוס', 'לוט', 'סקין', 'קווסט', 'שחקן', 'ראנק'],
    food: ['פיצה', 'המבורגר', 'פסטה', 'סלט', 'שוקולד', 'גלידה', 'סושי', 'סטייק', 'ציפס', 'עוגה', 'לחם', 'גבינה', 'בשר', 'פירות'],
    animals: ['כלב', 'חתול', 'אריה', 'נמר', 'פיל', 'קוף', 'גירפה', 'זאב', 'דוב', 'נשר', 'דולפין', 'לוויתן', 'כריש', 'תוכי', 'נחש'],
    tools: ['פטיש', 'מברג', 'מסור', 'פלייר', 'מקדחה', 'מפתח', 'בורג', 'מסמר', 'פלס', 'מלחציים', 'איזמל', 'דיסק'],
    countries: ['ישראל', 'ארהב', 'קנדה', 'ברזיל', 'אנגליה', 'צרפת', 'ספרד', 'איטליה', 'יפן', 'סין', 'הודו', 'אוסטרליה', 'פולין', 'יוון'],
    medicine: ['רופא', 'אחות', 'מזרק', 'תרופה', 'חום', 'דם', 'וירוס', 'חיסון', 'פצע', 'תחבושת', 'מרפאה', 'ניתוח', 'כדור', 'משחה'],
    names: ['דוד', 'משה', 'אברהם', 'יצחק', 'יעקב', 'רחל', 'שרה', 'רבקה', 'לאה', 'אריאל', 'נועה', 'מאיה', 'יוסף', 'תמר'],
    languages: ['עברית', 'אנגלית', 'ערבית', 'ספרדית', 'צרפתית', 'רוסית', 'סינית', 'יפנית', 'איטלקית', 'גרמנית', 'יוונית'],
    fashion: ['חולצה', 'מכנס', 'שמלה', 'חצאית', 'נעליים', 'כובע', 'צעיף', 'מעיל', 'גרביים', 'חגורה', 'שרשרת', 'טבעת', 'תיק']
};

const backgrounds = {
    programming: 'url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop")',
    anime: 'url("anime.jpg")',
    cars: 'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000&auto=format&fit=crop")',
    mobile_games: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop")',
    food: 'url("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop")',
    animals: 'url("https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2000&auto=format&fit=crop")',
    tools: 'url("https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2000&auto=format&fit=crop")',
    countries: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop")',
    medicine: 'url("https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2000&auto=format&fit=crop")',
    names: 'url("https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format&fit=crop")',
    languages: 'url("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop")',
    fashion: 'url("https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop")'
};

let currentLevel = parseInt(localStorage.getItem('bulkGameLevel')) || 1;
let gridSize = 10;
let levelWordsCount = 4;
let levelTimeLeft = 180;
let allowedDirections = [];
let strikesToPenalty = 3;
let currentPenaltySeconds = 5;

let wordsToFind = [];
let placedWordsInfo = {};

const gridElement = document.getElementById('grid');
const wordListElement = document.getElementById('word-list');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const strikesElement = document.getElementById('strikes');
const levelDisplayElement = document.getElementById('level-display');
const categorySelect = document.getElementById('category-select');
const gameArea = document.getElementById('game-area');
const newGameBtn = document.getElementById('new-game-btn');
const hintBtn = document.getElementById('hint-btn');
const resetLevelBtn = document.getElementById('reset-level-btn');

const highScoreElement = document.getElementById('high-score');
const victoryModal = document.getElementById('victory-modal');
const finalScoreElement = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const newRecordMsg = document.getElementById('new-record-msg');
const victoryLevelElement = document.getElementById('victory-level');

const gameOverModal = document.getElementById('game-over-modal');
const gameOverScoreElement = document.getElementById('game-over-score');
const gameOverPlayAgainBtn = document.getElementById('game-over-play-again-btn');
const gameOverLevelElement = document.getElementById('game-over-level');

const resetModal = document.getElementById('reset-modal');
const confirmResetBtn = document.getElementById('confirm-reset-btn');
const cancelResetBtn = document.getElementById('cancel-reset-btn');

const shareWaVictory = document.getElementById('share-wa-victory');
const shareWaGameOver = document.getElementById('share-wa-gameover');

let currentHighScore = localStorage.getItem('bulkGameHighScore') || 0;
if (highScoreElement) highScoreElement.textContent = currentHighScore;

let gridMatrix = [];
let isDragging = false;
let selectedCells = [];
let wordFoundCount = 0;
let startCell = null;

let timeLeft = 180;
let score = 0;
let strikes = 0;
let timerInterval = null;
let isGameActive = false;
let hasGameStarted = false;

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
        if (audioCtx.state === 'suspended') audioCtx.resume();
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

function setupLevelParameters() {
    if (currentLevel <= 3) {
        gridSize = 10;
        levelWordsCount = 4 + (currentLevel - 1);
        levelTimeLeft = 180;
        allowedDirections = ['horizontal', 'vertical'];
        strikesToPenalty = 3;
        currentPenaltySeconds = 5;
    } else if (currentLevel <= 7) {
        gridSize = 12;
        levelWordsCount = 7 + (currentLevel - 4);
        levelTimeLeft = Math.max(105, 150 - ((currentLevel - 4) * 15));
        allowedDirections = ['horizontal', 'vertical', 'diagonal', 'diagonal-up'];
        strikesToPenalty = 3;
        currentPenaltySeconds = 10;
    } else {
        gridSize = 14;
        levelWordsCount = 12 + (currentLevel - 8);
        levelTimeLeft = 90;
        allowedDirections = ['horizontal', 'vertical', 'diagonal', 'diagonal-up', 'horizontal-rev', 'vertical-rev', 'diagonal-rev', 'diagonal-up-rev'];
        strikesToPenalty = 1;
        currentPenaltySeconds = 5;
    }

    const maxCategoryWords = categories[categorySelect.value].length;
    if (levelWordsCount > maxCategoryWords) levelWordsCount = maxCategoryWords;

    levelDisplayElement.textContent = currentLevel;
    hintBtn.textContent = `💡 רמז (-15 ש')`;
    updateGridCSS();
}

function updateGridCSS() {
    if (window.innerWidth <= 600) {
        gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    } else {
        const cellSize = gridSize >= 14 ? '26px' : (gridSize === 12 ? '32px' : '38px');
        gridElement.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize})`;
    }
}

window.addEventListener('resize', () => { if(hasGameStarted) updateGridCSS(); });

function applyTimePenalty(amount) {
    timeLeft -= amount;
    if (timeLeft <= 0) timeLeft = 0;
    timerElement.textContent = formatTime(timeLeft);
    timerElement.parentElement.classList.add('time-penalty');
    setTimeout(() => timerElement.parentElement.classList.remove('time-penalty'), 500);
}

function addTimeBonus(amount) {
    timeLeft += amount;
    timerElement.textContent = formatTime(timeLeft);
    timerElement.classList.add('time-bonus');
    setTimeout(() => timerElement.classList.remove('time-bonus'), 500);
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = levelTimeLeft;
    timerElement.textContent = formatTime(timeLeft);
    timerElement.classList.remove('timer-warning');
    isGameActive = true;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) timeLeft--;
        timerElement.textContent = formatTime(timeLeft);

        if (timeLeft <= 10 && timeLeft > 0) {
            timerElement.classList.add('timer-warning');
            playSound('tick');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isGameActive = false;
            timerElement.classList.remove('timer-warning');

            gameOverLevelElement.textContent = currentLevel;
            gameOverScoreElement.textContent = score;

            playSound('error');
            gameOverModal.classList.remove('hidden');
        }
    }, 1000);
}

function pickRandomWords(numWords) {
    const currentCategoryWords = categories[categorySelect.value];
    const shuffled = [...currentCategoryWords].sort(() => 0.5 - Math.random());
    wordsToFind = shuffled.slice(0, numWords);
}

function initializeMatrix() {
    gridMatrix = [];
    placedWordsInfo = {};
    for (let i = 0; i < gridSize; i++) {
        gridMatrix[i] = new Array(gridSize).fill('');
    }
}

function canPlaceWord(word, row, col, dir) {
    if (dir === 'horizontal' && col + word.length > gridSize) return false;
    if (dir === 'horizontal-rev' && col - word.length < -1) return false;
    if (dir === 'vertical' && row + word.length > gridSize) return false;
    if (dir === 'vertical-rev' && row - word.length < -1) return false;
    if (dir === 'diagonal' && (row + word.length > gridSize || col + word.length > gridSize)) return false;
    if (dir === 'diagonal-rev' && (row - word.length < -1 || col - word.length < -1)) return false;
    if (dir === 'diagonal-up' && (row - (word.length - 1) < 0 || col + word.length > gridSize)) return false;
    if (dir === 'diagonal-up-rev' && (row + word.length > gridSize || col - word.length < -1)) return false;

    for (let i = 0; i < word.length; i++) {
        let currentRow = row, currentCol = col;
        if (dir === 'horizontal') currentCol = col + i;
        if (dir === 'horizontal-rev') currentCol = col - i;
        if (dir === 'vertical') currentRow = row + i;
        if (dir === 'vertical-rev') currentRow = row - i;
        if (dir === 'diagonal') { currentRow = row + i; currentCol = col + i; }
        if (dir === 'diagonal-rev') { currentRow = row - i; currentCol = col - i; }
        if (dir === 'diagonal-up') { currentRow = row - i; currentCol = col + i; }
        if (dir === 'diagonal-up-rev') { currentRow = row + i; currentCol = col - i; }

        if (gridMatrix[currentRow][currentCol] !== '' && gridMatrix[currentRow][currentCol] !== word[i]) {
            return false;
        }
    }
    return true;
}

function placeWord(word) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 300) {
        const dir = allowedDirections[Math.floor(Math.random() * allowedDirections.length)];
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(word, row, col, dir)) {
            // הוספנו את שמירת הכיוון (direction) עבור מנגנון הרמזים החדש
            placedWordsInfo[word] = { startRow: row, startCol: col, direction: dir };

            for (let i = 0; i < word.length; i++) {
                if (dir === 'horizontal') gridMatrix[row][col + i] = word[i];
                if (dir === 'horizontal-rev') gridMatrix[row][col - i] = word[i];
                if (dir === 'vertical') gridMatrix[row + i][col] = word[i];
                if (dir === 'vertical-rev') gridMatrix[row - i][col] = word[i];
                if (dir === 'diagonal') gridMatrix[row + i][col + i] = word[i];
                if (dir === 'diagonal-rev') gridMatrix[row - i][col - i] = word[i];
                if (dir === 'diagonal-up') gridMatrix[row - i][col + i] = word[i];
                if (dir === 'diagonal-up-rev') gridMatrix[row + i][col - i] = word[i];
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

            cell.addEventListener('mousedown', handleMouseDown);
            cell.addEventListener('mouseover', handleMouseOver);
            cell.addEventListener('touchstart', handleTouchStart, { passive: false });

            gridElement.appendChild(cell);
        }
    }
}

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
                cell.classList.remove('hinted');
                cell.classList.add('found');
            });

            foundMatch = true;
            wordFoundCount++;
            score += (100 * currentLevel);
            scoreElement.textContent = score;

            if (currentLevel >= 8) {
                addTimeBonus(5);
            }

            if (wordFoundCount === wordsToFind.length) {
                clearInterval(timerInterval);
                isGameActive = false;
                const timeBonus = timeLeft * currentLevel;
                score += timeBonus;
                scoreElement.textContent = score;

                playSound('win');
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

                victoryLevelElement.textContent = currentLevel;

                finalScoreElement.textContent = score;
                if (score > currentHighScore) {
                    currentHighScore = score;
                    localStorage.setItem('bulkGameHighScore', currentHighScore);
                    highScoreElement.textContent = currentHighScore;
                    newRecordMsg.classList.remove('hidden');
                } else {
                    newRecordMsg.classList.add('hidden');
                }

                currentLevel++;
                localStorage.setItem('bulkGameLevel', currentLevel);

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
            strikes++;
            strikesElement.textContent = `${strikes}/${strikesToPenalty}`;

            if (strikes >= strikesToPenalty) {
                applyTimePenalty(currentPenaltySeconds);
                strikes = 0;
                strikesElement.textContent = `${strikes}/${strikesToPenalty}`;
            }
        }
        document.querySelectorAll('.cell.selected').forEach(cell => {
            if (!cell.classList.contains('found')) cell.classList.remove('selected');
        });
    }
    selectedCells = [];
}

// מערכת הרמזים המשודרגת שחושפת את כל הנתיב של המילה
hintBtn.addEventListener('click', () => {
    if (!isGameActive) return;

    const unfoundWords = wordsToFind.filter(word => {
        const wordEl = document.getElementById(`word-${word}`);
        return wordEl && !wordEl.classList.contains('found');
    });

    if (unfoundWords.length > 0) {
        // קנס זמן על רמז שמגלה את כל המילה
        applyTimePenalty(15);

        const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
        const info = placedWordsInfo[randomWord];

        if (info) {
            const cellsToHint = [];
            // איסוף כל התאים שמרכיבים את המילה לפי הכיוון שלה
            for (let i = 0; i < randomWord.length; i++) {
                let r = info.startRow;
                let c = info.startCol;

                if (info.direction === 'horizontal') c += i;
                if (info.direction === 'horizontal-rev') c -= i;
                if (info.direction === 'vertical') r += i;
                if (info.direction === 'vertical-rev') r -= i;
                if (info.direction === 'diagonal') { r += i; c += i; }
                if (info.direction === 'diagonal-rev') { r -= i; c -= i; }
                if (info.direction === 'diagonal-up') { r -= i; c += i; }
                if (info.direction === 'diagonal-up-rev') { r += i; c -= i; }

                const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                if (cell && !cell.classList.contains('found')) {
                    cellsToHint.push(cell);
                }
            }

            // הפעלת ההבהוב על כל תאי המילה ביחד
            cellsToHint.forEach(cell => cell.classList.add('hinted'));
            playSound('tick');

            // הסרת ההבהוב אחרי שניה וחצי
            setTimeout(() => {
                cellsToHint.forEach(cell => cell.classList.remove('hinted'));
            }, 1500);
        }
    }
});

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
    setupLevelParameters();

    wordFoundCount = 0;
    strikes = 0;
    scoreElement.textContent = score;
    strikesElement.textContent = `0/${strikesToPenalty}`;

    document.querySelectorAll('.cell.hinted').forEach(c => c.classList.remove('hinted'));
    timerElement.classList.remove('timer-warning');

    pickRandomWords(levelWordsCount);
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
        hintBtn.classList.remove('hidden');
        newGameBtn.textContent = 'משחק חדש (מתאפס)';
    } else {
        score = 0;
    }
    initGame();
}

resetLevelBtn.addEventListener('click', () => {
    resetModal.classList.remove('hidden');
});

cancelResetBtn.addEventListener('click', () => {
    resetModal.classList.add('hidden');
});

confirmResetBtn.addEventListener('click', () => {
    resetModal.classList.add('hidden');
    currentLevel = 1;
    score = 0;
    localStorage.setItem('bulkGameLevel', 1);
    if (hasGameStarted) {
        initGame();
    } else {
        levelDisplayElement.textContent = currentLevel;
    }
});

function shareScoreToWhatsApp() {
    const text = encodeURIComponent(`הגעתי לשלב ${currentLevel - 1} בתפזורת והשגתי ${score} נקודות! 🏆 מי יכול לעקוף אותי?`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

updateBackground();

newGameBtn.addEventListener('click', () => {
    score = 0;
    startGameFlow();
});

categorySelect.addEventListener('change', () => {
    updateBackground();
    if (hasGameStarted) {
        score = 0;
        initGame();
    }
});

playAgainBtn.addEventListener('click', () => {
    victoryModal.classList.add('hidden');
    initGame();
});

gameOverPlayAgainBtn.addEventListener('click', () => {
    gameOverModal.classList.add('hidden');
    score = 0;
    initGame();
});

if (shareWaVictory) shareWaVictory.addEventListener('click', shareScoreToWhatsApp);
if (shareWaGameOver) shareWaGameOver.addEventListener('click', shareScoreToWhatsApp);

document.addEventListener('mouseup', handleMouseUp);
gridElement.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleMouseUp);
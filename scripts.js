var counter = 0;

// При начале новой игры в произвольном порядке расставляем номера блоков и удаляем один блок:
function startGame (counter) {
	console.log('----- START: Скрипт начала новой игры -----');
	
	// Очищаем поле для игры:
	function clearBoard () {
		for (var i = 1; i < 17; i++) {
			var ghost = document.getElementById('gh_' + i);
			if (ghost.hasChildNodes()) {
				ghost.removeChild(ghost.firstChild);
			}
		}
	}
	
	clearBoard();
	
	// Вставляем блоки на поле для игры:
	for (var i = 1; i < 17; i++) {
		var ghost = document.getElementById('gh_' + i);
		var son = document.createElement('div');
		son.className = "cell";
		son.id = "block_" + i;
		ghost.appendChild(son);
		
	}
	
	// Удаляем один произвольный блок:	
	function getRandomNumber (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	var deletedBlock = getRandomNumber (1, 17);
	console.log(deletedBlock);
	
	var blk = document.getElementById('block_' + deletedBlock);

	if (blk) {
		blk.parentNode.removeChild(blk);
	} else {
		console.log('Такого элемента не существует: ' + deletedBlock);
	}

	// Добавляем числовые подписи на оставшиеся блоки в произвольном порядке:
	var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
	
	function shuffle(numbers) {
		for (var j, x, i = numbers.length; i; j = parseInt(Math.random() * i), x = numbers[--i], numbers[i] = numbers[j], numbers[j] = x);
		return numbers;
	}

	var randomNumber = shuffle(numbers);
	console.log(randomNumber);

	for (var i = 1; i < 17; i++) {
		if (i != deletedBlock) {
			var label = document.getElementById('block_' + i);
			var txt = document.createElement('p');
			txt.innerHTML = randomNumber.pop();
			txt.className = "lbl";
			label.appendChild(txt);
		} else {
			console.log('Ничего не вставлено в блок: ' + deletedBlock);
		}
	}

	console.log('----- FINISH: Скрипт начала новой игры -----');
}

function clearCounter() {
	var cnt = document.getElementById('movements');
	cnt.value = 0;
	return (counter = 0);
}

// Функция по передвижению элемента:
function moveOrNot (row, column, up, right, down, left) {
	console.log('===== START: Скрипт проверки свободных ячеек =====');

	var isEmptyUp = false;
	var isEmptyRight = false;
	var isEmptyDown = false;
	var isEmptyLeft = false;

	var oldRow = row;
	var oldColumn = column;
	var newRow = '';
	var newColumn;

	var direction = '';
	var blockTxt = '';

	// Функция подсчёта шагов игры:
	function countSteps(argument) {
		if (argument == true) { counter += 1; }
		
		var movements = document.getElementById('movements');
		movements.value = counter;
		
		var p = document.createElement('p');
		p.innerHTML = counter;
		
		// Удаляем старое значение счётчика:
		if (!movements.firstChild) {
			movements.appendChild(p);
		} else {
			movements.removeChild;
			movements.appendChild(p);
		}

		return counter;
	}
	
	function moveObject(oldRow, oldColumn, newRow, newColumn, blockTxt, direction) {
		console.log('***** START: Перемещение блока *****');
		
		var movable = document.getElementById(oldRow + oldColumn).firstChild.firstChild;
		console.log(movable);
		
		newId = movable.id;
		
		let start = Date.now(); // запомнили время начала анимации

		let timer = setInterval(function() {			
			let timePassed = Date.now() - start;

			if (timePassed >= 620) {
				clearInterval(timer); // закончили анимацию через 0.64 секунды
				return;
			}

			draw(timePassed); // отрисовали анимацию			
			
		}, 20);

		function draw(timePassed) {
			
			// Движение вверх:
			if (direction == 'up') { movable.style.top = timePassed / 5 * (-1) + 'px'; }
			// Движение вправо:
			if (direction == 'right') { movable.style.left = timePassed / 5 + 'px'; }
			// Движение вниз:
			if (direction == 'down') { movable.style.top = timePassed / 5 + 'px'; }
			// Движение влево:
			if (direction == 'left') { movable.style.right = timePassed / 5 + 'px'; }
			
		}
		
		// Записываем данные передвигаемого элемента в новый блок:				
		var newBlock = document.getElementById(newRow + newColumn).firstChild;
		
		var ghost = document.createElement('div');
		ghost.className = "ghostNew";
		ghost.id = newId;
		newBlock.appendChild(ghost);
		
		var cell = document.createElement('div');
		cell.className = "cell";
		ghost.appendChild(cell);
		
		var p = document.createElement('p');
		p.innerHTML = blockTxt;
		p.className = "lbl";
		cell.appendChild(p);
		
		// Удаляем старый элемент:
		if (movable) { movable.parentNode.removeChild(movable); }
		
		console.log('***** FINISH: Перемещение блока *****');
		
		countSteps (true);
	}
	
	// Проверка верхнего элемента:
	if (up == 1) {
		if (row == 'D') {
			var checkUpper = document.getElementById('C' + column).firstChild;
			if (checkUpper.firstChild) {
				console.log('Нельзя переместить наверх: ' + isEmptyUp);
			} else {
				isEmptyUp = true;
				newRow = 'C';
				newColumn = column;
				direction = 'up';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить наверх: ' + isEmptyUp);
			}						
		} else if (row == 'C') {
			var checkUpper = document.getElementById('B' + column).firstChild;
			if (checkUpper.firstChild) {
				console.log('Нельзя переместить наверх: ' + isEmptyUp);
			} else {
				isEmptyUp = true;
				newRow = 'B';
				newColumn = column;
				direction = 'up';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить наверх: ' + isEmptyUp);
			}
		} else {
			var checkUpper = document.getElementById('A' + column).firstChild;
			if (checkUpper.firstChild) {
				console.log('Нельзя переместить наверх: ' + isEmptyUp);
			} else {
				isEmptyUp = true;
				newRow = 'A';
				newColumn = column;
				direction = 'up';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить наверх: ' + isEmptyUp);
			}
		}
	} else {
		console.log('Нельзя переместить наверх, самый верхний ряд!');
	}
	
	// Проверка элемента справа:
	if (right == 1) {
		if (column == 1) {
			var checkRight = document.getElementById(row + (column + 1)).firstChild;
			if (checkRight.firstChild) {
				console.log('Нельзя переместить вправо: ' + isEmptyRight);
			} else {
				isEmptyRight = true;
				newRow = row;
				newColumn = column + 1;
				direction = 'right';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить вправо: ' + isEmptyRight);
			}						
		} else if (column == 2) {
			var checkRight = document.getElementById(row + (column + 1)).firstChild;
			if (checkRight.firstChild) {
				console.log('Нельзя переместить вправо: ' + isEmptyRight);
			} else {
				isEmptyRight = true;
				newRow = row;
				newColumn = column + 1;
				direction = 'right';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить вправо: ' + isEmptyRight);
			}
		} else {
			var checkRight = document.getElementById(row + (column + 1)).firstChild;
			if (checkRight.firstChild) {
				console.log('Нельзя переместить вправо: ' + isEmptyRight);
			} else {
				isEmptyRight = true;
				newRow = row;
				newColumn = column + 1;
				direction = 'right';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить вправо: ' + isEmptyRight);
			}
		}
	} else {
		console.log('Нельзя переместить вправо, самый правый ряд!');
	}

	// Проверка нижнего элемента:
	if (down == 1) {
		if (row == 'A') {
			var checkLower = document.getElementById('B' + column).firstChild;
			if (checkLower.firstChild) {
				console.log('Нельзя переместить вниз: ' + isEmptyDown);
			} else {
				isEmptyDown = true;
				newRow = 'B';
				newColumn = column;
				direction = 'down';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить вниз: ' + isEmptyDown);
			}
		} else if (row == 'B') {
			var checkLower = document.getElementById('C' + column).firstChild;
			if (checkLower.firstChild) {
				console.log('Нельзя переместить вниз: ' + isEmptyDown);
			} else {
				isEmptyDown = true;
				newRow = 'C';
				newColumn = column;
				direction = 'down';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить вниз: ' + isEmptyDown);
			}
		} else {
			var checkLower = document.getElementById('D' + column).firstChild;
			if (checkLower.firstChild) {
				console.log('Нельзя переместить вниз: ' + isEmptyDown);
			} else {
				isEmptyDown = true;
				newRow = 'D';
				newColumn = column;
				direction = 'down';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить вниз: ' + isEmptyDown);
			}
		}
	} else {
		console.log('Нельзя переместить вниз, самый нижний ряд!');
	}
	
	// Проверка элемента слева:
	if (left == 1) {
		if (column == 4) {
			var checkLeft = document.getElementById(row + (column - 1)).firstChild;
			if (checkLeft.firstChild) {
				console.log('Нельзя переместить влево: ' + isEmptyLeft);
			} else {
				isEmptyLeft = true;
				newRow = row;
				newColumn = column - 1;
				direction = 'left';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить влево: ' + isEmptyLeft);
			}						
		} else if (column == 3) {
			var checkLeft = document.getElementById(row + (column - 1)).firstChild;
			if (checkLeft.firstChild) {
				console.log('Нельзя переместить влево: ' + isEmptyLeft);
			} else {
				isEmptyLeft = true;
				newRow = row;
				newColumn = column - 1;
				direction = 'left';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить влево: ' + isEmptyLeft);
			}
		} else {
			var checkLeft = document.getElementById(row + (column - 1)).firstChild;
			if (checkLeft.firstChild) {
				console.log('Нельзя переместить влево: ' + isEmptyLeft);
			} else {
				isEmptyLeft = true;
				newRow = row;
				newColumn = column - 1;
				direction = 'left';
				blockTxt = document.getElementById(row + column).firstChild.firstChild.firstChild.innerHTML;
				console.log('!!! Можно переместить влево: ' + isEmptyLeft);
			}
		}
	} else {
		console.log('Нельзя переместить влево, самый левый ряд!');
	}
	
	if ((isEmptyUp == true) || (isEmptyRight == true) || (isEmptyDown == true) || (isEmptyLeft == true))  {
		moveObject(oldRow, oldColumn, newRow, newColumn, blockTxt, direction);
	}
		
	console.log('===== FINISH: Скрипт проверки свободных ячеек =====');
}

// Проверим, выиглали мы, или нет:
function checkWin() {
	// В идеале нужно получить, чтобы все числа шли по возрастанию с верхнего ряда до нижнего, с ячеек 'gh_1' по 'gh_15':
	var winResults = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
	var checkWinArr = [];
	
	for (var j = 1; j < 17; j++) {
		if (document.getElementById('gh_' + j).firstChild) {
			getText = document.getElementById('gh_' + j).firstChild.firstChild.innerHTML;
			checkWinArr.push(getText);
		}
	}
	
	// Сравнить элементы в потомках 'p' с массивом winResults, если совпало - игра окончена.
	// ...
	// alert('Вы выиграли!');

}

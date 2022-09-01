'use strict';

const marbles = (inLine = 1, balls = [5, 5]) => {
  let isGameOver = false;
  const players = ['Компьютер', 'Вы'];
  const ballsWords = ['шар', 'шара', 'шаров'];

  const totalHalls = balls.reduce((total, playerHalls) => total + playerHalls);
  const thinkNum = max => Math.floor(1 + Math.random() * max);

  const askNum = max => {
    const answer = prompt(`Сколько шаров загадаете? (от 1 до ${max}):`);

    return ((answer === null && confirm('Хотите завершить игру?')) || (+answer > 0 && answer <= max)) ? answer : askNum(max);
  };

  const declinationWork = (num, words) => {
    let index;
    const num10 = num % 10;
    const num100 = num % 100;

    switch (true) {
      case num100 >= 10 && num100 <= 20: index = 2; break;
      case num10 === 1: index = 0; break;
      case num10 && num10 < 5: index = 1; break;
      default:
        index = 2;
    }

    return `${num} ${words[index]}`;
  };


  const bet = inLine ? askNum(balls[inLine]) : thinkNum(balls[inLine]);

  if (bet === null) return alert('Игра окончена!');

  const guess = inLine ? thinkNum(balls[inLine]) % 2 : +confirm('Компьютер задумал нечетное или четное количество шаров?\n(Нечетное "ОК" или Четное "Отмена")');

  const winner = +bet % 2 === guess ? +!inLine : inLine;

  const result = balls.map((playerBalls, index) => {
    const result = playerBalls + (index === winner ? 1 : -1) * bet;
    isGameOver = true;
    switch (true) {
      case result <= 0: return 0;
      case result >= totalHalls: return totalHalls;
      default:
        isGameOver = false;
    }
    return result;
  });

  alert(`${players[inLine]} поставил${inLine ? `и` : ``} ${declinationWork(bet, ballsWords)}. ${players[+!inLine]} ${+!inLine === winner ? `` : `не `}угадал${+!inLine ? `и` : ``}.
      СЧЕТ:
      ${result.map((playerBalls, index) => `${['У компьютера', '\n      У Вас'][index]}: ${declinationWork(playerBalls, ballsWords)}`).join('')}`);

  if (isGameOver && !confirm(`${winner ? `${players[winner]} победили!\n` : `${players[winner]} победил`} \nХотите сыграть еще?`)) return;

  return marbles(...(isGameOver ? [] : [+!inLine, result]));
};

marbles();

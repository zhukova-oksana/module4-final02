'use strict';

(() => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


  const game = () => {
    const balls = {
      player: 5,
      bot: 5,
    };

    const scoring = (user1, user2, balls, evenOdd) => {
      if ((((balls % 2) === 0) && evenOdd) || (((balls % 2) !== 0) && !evenOdd)) {
        if (user1 < balls) {
          user1 = 0;
          user2 += user1;
        } else {
          user1 -= balls;
          user2 += balls;
        }
      } else {
        if (user2 < balls) {
          user2 = 0;
          user1 += user2;
        } else {
          user1 += balls;
          user2 -= balls;
        }
      }
      return [user1, user2];
    }

    const check = (bot, player) => {
      switch (true) {
        case bot <= 0:
          return alert(`Бот проиграл. \nКоличество шаров бота = ${bot}`);
        case player <= 0:
          return alert(`Вы проиграли. \nКоличество ваших шаров = ${player}`);
      }
    }

    return function start() {
      let ballsPlayer = +prompt(`Загадай число от 1 до ${balls.player}`);

      const thinkNumber = (num) => {
        if ((num > balls.player) || (num < 0) || (num === 0) || (!Number(num)))  {
          ballsPlayer = +prompt(`Загадай число от 1 до ${balls.player}`);
          thinkNumber(ballsPlayer);
        } else {
          return ballsPlayer;
        }
      }

      thinkNumber(ballsPlayer);

      const evenOdd = Boolean(getRandomIntInclusive(1, balls.player) % 2);

      [balls.player, balls.bot] = [...scoring(balls.player, balls.bot, ballsPlayer, evenOdd)]
      // console.log('player', balls.player, 'bot', balls.bot);


      check(balls.bot, balls.player);

      if ((balls.player === 0) || (balls.bot === 0)) {
        return;
      }

      const thinkNumberBot = getRandomIntInclusive(1, balls.bot);
      const answerPlayer = confirm(`Компьютер загадал число от 1 до ${balls.bot}. Четное?`);

      [balls.bot, balls.player] = [...scoring(balls.bot, balls.player, thinkNumberBot, answerPlayer)];
      // console.log('bot', balls.bot, 'player', balls.player);

      check(balls.bot, balls.player);

      if ((balls.player === 0) || (balls.bot === 0)) {
        return;
      }

      return start();
    };
  };

  window.RPS = game;
})();

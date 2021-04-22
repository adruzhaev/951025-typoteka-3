const {getRandomInt, getRandomDate, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../const`);

const fs = require(`fs/promises`);
const chalk = require(`chalk`);

const MIN_ELEMENTS = 1;
const MAX_ELEMENTS = 1000;
const FILE_NAME = `mocks.json`;
const THREE_MONTHS_MILISECONDS = 7889229;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const generateMocks = (count) => (
  Array(count).fill({}).map(() => ({
    title: getRandomInt(0, TITLES.length - 1),
    createdDate: getRandomDate(getRandomInt(0, THREE_MONTHS_MILISECONDS)),
    announce: shuffle(SENTENCES).slice(0, getRandomInt(1, 6)),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countMocks = Number.parseInt(count, 10) || MIN_ELEMENTS;
    const content = JSON.stringify(generateMocks(countMocks));

    if (count > MAX_ELEMENTS) {
      console.error(chalk.red(`Нельзя записать в файл больше ${MAX_ELEMENTS} моков`));
      process.exit(ExitCode.FAIL);
    }

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(`${chalk.greenBright(`Запись в файл успешно завершена`)}`);
    } catch (err) {
      console.error(chalk.red(`Произошла ошибка записи файла ${FILE_NAME}, ошибка: ${err}`));
      process.exit(ExitCode.FAIL);
    }
  }
};

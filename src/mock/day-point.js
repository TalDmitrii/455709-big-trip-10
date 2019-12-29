import Utils from '../utils';
export {typePointImage, transportType};

const typePointImage = {
  'Taxi': `taxi.png`,
  'Bus': `bus.png`,
  'Train': `train.png`,
  'Ship': `ship.png`,
  'Transport': `transport.png`,
  'Drive': `drive.png`,
  'Flight': `flight.png`,
  'Check': `check-in.png`,
  'Sightseeing': `sightseeing.png`,
  'Restaurant': `restaurant.png`,
};

const pointDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

// Разбивает строку на предложения.
const phrasesArray = pointDescription.split(`. `);

const typesPoint = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];

const transportType = new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`]);

const cities = [`Moscow`, `S.Peterburg`, `New York`, `London`, `Berlin`, `Madrid`, `Warsaw`];

// const offers = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`];

const myOffers = [
  {
    type: `Add luggage`,
    price: 10,
  },
  {
    type: `Switch to comfort class`,
    price: 150,
  },
  {
    type: `Add meal`,
    price: 15,
  },
  {
    type: `Choose seats`,
    price: 5,
  },
  {
    type: `Travel by train`,
    price: 40,
  }
];

const generateOffers = (offers) => {
  return offers
    .filter(() => Math.random() > 0.5)
    .slice(0, 2);
};

export const generateDayPoint = () => {
  const typePoint = Utils.getRandomArrayItem(typesPoint);
  const isTransportType = transportType.has(typePoint);
  // console.dir(isTransportType);

  // Получает случайное число в диапазоне от 15 до 200, округлённое до десятков.
  const randomPrice = Math.round(Utils.getRandomIntegerNumber(15, 200) / 10) * 10;

  // Берёт 20 случайных значений в диапазоне от 1 до 50.
  const randomNumbers = Utils.getRandomValueArray(20, 1, 50);
  // Получает уникальные значения из массива.
  const uniqueNumbers = Utils.getUniqueValuesFromArray(randomNumbers);
  // Укорачивает массив до 5-ти элементов.
  uniqueNumbers.length = 5;

  const placeDescription = Utils.getRandomArrayItems(phrasesArray, 1, 3);

  const pointID = Utils.getRandomIntegerNumber(1, 10000);

  return {
    type: typePoint,
    typeTransport: isTransportType,
    id: pointID,
    image: Utils.getItemFromObject(typePoint, typePointImage),
    city: Utils.getRandomArrayItem(cities),
    price: randomPrice,
    offers: generateOffers(myOffers),
    picturesNumber: uniqueNumbers,
    description: placeDescription,
    dateFrom: `2019-07-10T22:55:56.845Z`,
    dateTo: `2019-07-11T11:22:13.375Z`,
    isFavorite: false,
  };
};

export const generateDayPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateDayPoint);
};

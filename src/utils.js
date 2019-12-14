const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

// Возвращает случайное число из диапазона.
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

// Возвращает случайный элемент из массива.
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// Возвращает случайное количество элементов из массива.
export const getRandomArrayItems = (array, minCount, maxCount) => {
  const randomCount = getRandomIntegerNumber(minCount, maxCount);
  const randomItemsArray = [];

  for (let i = 0; i < randomCount; i++) {
    randomItemsArray.push(getRandomArrayItem(array));
  }

  return randomItemsArray;
};

// Возвращает из объекта элемент с переданным ключом.
export const getItemFromObject = (keyItem, object) => {
  return object[keyItem];
};

// Возвращает массив случайных значений.
export const getRandomValueArray = (countElem, minValue, maxValue) => {
  const randomValueArray = [];

  for (let i = 0; i < countElem; i++) {
    randomValueArray.push(getRandomIntegerNumber(minValue, maxValue));
  }

  return randomValueArray;
};

// Возвращает уникальные значения из массива.
export const getUniqueValueFromArray = (myArray) => {
  const uniqueValues = new Set(myArray);
  const uniqueValuesArray = [];

  for (let item of uniqueValues) {
    uniqueValuesArray.push(item);
  }

  return uniqueValuesArray;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export default class Utils {
  // Возвращает случайное число из диапазона.
  static getRandomIntegerNumber(min, max) {
    return min + Math.floor(max * Math.random());
  }
  // Возвращает случайный элемент из массива.
  static getRandomArrayItem(array) {
    const randomIndex = this.getRandomIntegerNumber(0, array.length);

    return array[randomIndex];
  }

  // Возвращает случайное количество элементов из массива.
  static getRandomArrayItems(array, minCount, maxCount) {
    const randomCount = this.getRandomIntegerNumber(minCount, maxCount);
    const randomItemsArray = [];

    for (let i = 0; i < randomCount; i++) {
      randomItemsArray.push(this.getRandomArrayItem(array));
    }

    return randomItemsArray;
  }

  // Возвращает из объекта элемент с переданным ключом.
  static getItemFromObject(keyItem, object) {
    return object[keyItem];
  }

  // Возвращает массив случайных значений.
  static getRandomValueArray(countElem, minValue, maxValue) {
    const randomValueArray = [];

    for (let i = 0; i < countElem; i++) {
      randomValueArray.push(this.getRandomIntegerNumber(minValue, maxValue));
    }

    return randomValueArray;
  }

  // Возвращает уникальные значения из массива.
  static getUniqueValueFromArray(myArray) {
    const uniqueValues = new Set(myArray);
    const uniqueValuesArray = [];

    for (let item of uniqueValues) {
      uniqueValuesArray.push(item);
    }

    return uniqueValuesArray;
  }
}

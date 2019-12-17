import {createElement} from '../utils';

const createDayOfferTemplate = (offers) => {
  return offers
    .map((offer) => {
      return (
        `<li class="event__offer">
            <span class="event__offer-title">${offer.type}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>
        `
      );
    })
  .join(`\n`);
};

const createDayPointTemplate = (dayPointData) => {
  const {type, image, city, price, offers} = dayPointData;

  const pointOffers = createDayOfferTemplate(Array.from(offers));

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${image}" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} to ${city}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
            </p>
            <p class="event__duration">1H 30M</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${pointOffers}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `
  );
};

export default class Point {
  constructor(pointData) {
    this._element = null;
    this._pointData = pointData;
  }

  getTemplate() {
    return createDayPointTemplate(this._pointData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

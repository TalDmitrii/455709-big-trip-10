import AbstractComponent from '../components/abstract-component';
import moment from 'moment';

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
  const {type, typeTransport, image, city, price, offers, dateFrom, dateTo} = dayPointData;

  const pointOffers = createDayOfferTemplate(Array.from(offers));
  const isTransportType = typeTransport;

  const pointStartDateFullFormat = moment(dateFrom).format(`DD/MM/YYYY HH:mm:ss`);
  const pointFinishDateFullFormat = moment(dateTo).format(`DD/MM/YYYY HH:mm:ss`);

  const pointStartDateHoursFormat = moment(dateFrom).format(`HH:mm`);
  const pointFinishDateHoursFormat = moment(dateTo).format(`HH:mm`);

  // const durationInPoint = moment.utc(moment(pointFinishDateFullFormat,"DD/MM/YYYY HH:mm").diff(moment(pointStartDateFullFormat,"DD/MM/YYYY HH:mm"))).format("DD HH:mm");

  // При вычислении разницы между двумя временными значениями, даже если она составляет менее 24 часов, moment.js выдаёт минимальное значение 1 день.
  // Поэтому сразу вычитаем еденицу из результата вычисления moment.js.
  const durationInPointInDays = moment.utc(moment(pointFinishDateFullFormat, `DD/MM/YYYY HH:mm`).diff(moment(pointStartDateFullFormat, `DD/MM/YYYY HH:mm`))).format(`DD`) - 1;

  const durationInPointInHours = moment.utc(moment(pointFinishDateFullFormat, `DD/MM/YYYY HH:mm`).diff(moment(pointStartDateFullFormat, `DD/MM/YYYY HH:mm`))).format(`HH`);

  const durationInPointInMinutes = moment.utc(moment(pointFinishDateFullFormat, `DD/MM/YYYY HH:mm`).diff(moment(pointStartDateFullFormat, `DD/MM/YYYY HH:mm`))).format(`mm`);

  // console.dir(durationInPoint);

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${image}" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${isTransportType ? `to` : `in`} ${city}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${pointStartDateHoursFormat}</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">${pointFinishDateHoursFormat}</time>
            </p>
            <p class="event__duration">
              ${durationInPointInDays ? `${durationInPointInDays}D` : ``}
              ${durationInPointInHours ? `${durationInPointInHours}H` : ``}
              ${durationInPointInMinutes ? `${durationInPointInMinutes}M` : ``}
            </p>
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

export default class Point extends AbstractComponent {
  constructor(pointData) {
    super();

    this._pointData = pointData;
  }

  getTemplate() {
    return createDayPointTemplate(this._pointData);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

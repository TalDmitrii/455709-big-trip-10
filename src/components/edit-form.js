import AbstractSmartComponent from './abstract-smart-component';
import flatpickr from 'flatpickr';
import {typePointImage, transportType} from '../mock/day-point';

const createPicturePlaceTemplate = (pictures) => {
  return pictures
    .map((picture) => {
      return (
        `<img class="event__photo" src="http://picsum.photos/300/150?r=${picture}" alt="Event photo">
        `
      );
    })
  .join(`\n`);
};

const createDayOfferTemplate = (offers, pointID) => {
  return offers
    .map((offer, index) => {
      return (
        `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index + pointID}" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-${index + pointID}">
              <span class="event__offer-title">${offer.type}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `
      );
    })
  .join(`\n`);
};

const createEditFormTemplate = (dayPointData) => {
  const {type, typeTransport, id, is_favorite, image, city, price, offers, picturesNumber, description} = dayPointData;

  const pointID = id;
  const isTransportType = typeTransport;
  const isFavorite = is_favorite;
  const pointOffers = createDayOfferTemplate(Array.from(offers), pointID);
  const pictures = createPicturePlaceTemplate(picturesNumber);
  

  const placeDescription = description.join(`. `);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${image}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-${id}">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type} ${isTransportType ? `to` : `in`}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" placeholder="18/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" placeholder="18/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro; ${price}
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="">
        </div>

        <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-${id}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${pointOffers}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${placeDescription}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures}
            </div>
          </div>
        </section>
      </section>
    </form>
  `
  );
};

export default class EditForm extends AbstractSmartComponent {
  constructor(point) {
    super();

    this._point = point;
    // this._pointType = point.type;
    // this._pointImage = point.image;

    // this._isDateShowing = !!task.dueDate;
    // this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    // this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this._flatpickr = null;
    this._submitHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditFormTemplate(this._point);
  }

  // getTemplate() {
  //   return createTaskEditTemplate(this._task, {
  //     isDateShowing: this._isDateShowing,
  //     isRepeatingTask: this._isRepeatingTask,
  //     activeRepeatingDays: this._activeRepeatingDays,
  //   });
  // }

  setSubmitHandler(handler) {
    this.getElement()
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-icon`)
      .addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler)
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const point = this._point;

    // this._isDateShowing = !!task.dueDate;
    // this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    // this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  _applyFlatpickr() {
    // console.dir(this._flatpickr);
    if (this._flatpickr) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const dateElement = this.getElement().querySelector(`.event__input--time`);
    this._flatpickr = flatpickr(dateElement, {
      altInput: true,
      allowInput: true,
      // defaultDate: this._task.dueDate,
    });

    // console.dir(this._flatpickr);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`click`, (evt) => {
        const target = evt.target;
        // console.dir(this._point);

        if (target.tagName === `INPUT`) {
          const type = target.value.toLowerCase();
          const capitalizeType = type.charAt(0).toUpperCase() + type.slice(1);

          this._point.type = capitalizeType;

          for (let key in typePointImage) {
            if (key.toLowerCase() === target.value.toLowerCase()) {
              this._point.image = typePointImage[key];
              break;
            }
          }

          // const isTransportType
          this._point.typeTransport = transportType.has(this._point.type);

          // console.dir(element);
          // console.dir(this._point);



          this.rerender();
        }        
      });
  }
}

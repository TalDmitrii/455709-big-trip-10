import AbstractComponent from '../components/abstract-component';

const createNoPointTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoPoint extends AbstractComponent {
  constructor() {
    super();

    this._element = null;
  }

  getTemplate() {
    return createNoPointTemplate();
  }
}

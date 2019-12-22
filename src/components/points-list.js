import AbstractComponent from '../components/abstract-component';

const createDayPointListTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class PointsList extends AbstractComponent {
  getTemplate() {
    return createDayPointListTemplate();
  }
}

import AbstractComponent from '../components/abstract-component';

const createDaysListTemplate = () => `<ul class="trip-days"></ul>`;

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return createDaysListTemplate();
  }
}

import AbstractComponent from '../components/abstract-component';

const createContainer = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

      <!-- Сортировка -->

      <!-- Контент -->
    </section>`
  );
};

export default class Container extends AbstractComponent {
  getTemplate() {
    return createContainer();
  }
}

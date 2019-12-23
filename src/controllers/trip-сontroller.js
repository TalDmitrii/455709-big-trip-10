import {render, replace, RenderPosition} from '../utils/render';

import SortingForm, {SortType} from '../components/sorting-form';
import EditForm from '../components/edit-form';
import DaysList from '../components/days-list';
import Day from '../components/day';
import PointsList from '../components/points-list';
import Point from '../components/point';
import NoPoint from '../components/no-point';

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPoint = new NoPoint();
    this._sortingForm = new SortingForm();
    this._dayList = new DaysList();
    this._day = new Day();
    this._pointsList = new PointsList();
  }

  renderPoint(pointsContainer, pointData) {
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const replacePointToEdit = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceEditToPoint = () => {
      replace(pointComponent, pointEditComponent);

      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const pointComponent = new Point(pointData);

    pointComponent.setEditButtonClickHandler(() => {
      replacePointToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const pointEditComponent = new EditForm(pointData);
    pointEditComponent.setSubmitHandler(replaceEditToPoint);

    render(pointsContainer, pointComponent, RenderPosition.BEFOREEND);
  }

  render(points) {
    const container = this._container.getElement();
    const pointsContainer = this._pointsList.getElement();

    render(container, this._sortingForm, RenderPosition.BEFOREEND);
    render(container, this._dayList, RenderPosition.BEFOREEND);

    // Отрисовывает день.
    render(this._dayList.getElement(), this._day, RenderPosition.BEFOREEND);

    // Отрисовывает список точек маршрута.
    render(this._day.getElement(), this._pointsList, RenderPosition.BEFOREEND);

    // Отрисовывает точки маршрута.
    points.forEach((point) => this.renderPoint(pointsContainer, point));

    // Добавляет сортировку.
    this._sortingForm.setSortTypeChangeHandler((sortType) => {
      let sortedPoints = [];

      switch (sortType) {
        case SortType.PRICE:
          sortedPoints = points.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.DEFAULT:
          sortedPoints = points;
          break;
      }

      pointsContainer.innerHTML = ``;

      sortedPoints.forEach((point) => this.renderPoint(pointsContainer, point));
    });
  }
}

import {render, replace, RenderPosition} from '../utils/render';

import SortingForm from '../components/sorting-form';
import EditForm from '../components/edit-form';
import DaysList from '../components/days-list';
import Day from '../components/day';
import PointsList from '../components/points-list';
import Point from '../components/point';
import NoPoint from '../components/no-point';

const renderPoint = (pointsContainer, pointData) => {
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
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPoint = new NoPoint();
    this._sortingForm = new SortingForm();
    this._dayList = new DaysList();
    this._day = new Day();
    this._pointsList = new PointsList();
  }

  render(points) {
    const container = this._container.getElement();
    const pointsContainer = this._pointsList.getElement();

    render(container, this._sortingForm, RenderPosition.BEFOREEND);
    render(container, this._dayList, RenderPosition.BEFOREEND);

    // Отрисовывает день.
    const daysList = document.querySelector(`.trip-days`);
    render(daysList, this._day, RenderPosition.BEFOREEND);

    // Отрисовывает список точек маршрута.
    const pointsListContainer = document.querySelector(`.trip-days__item`);
    render(pointsListContainer, this._pointsList, RenderPosition.BEFOREEND);

    points.forEach((point) => renderPoint(pointsContainer, point));
  }
}

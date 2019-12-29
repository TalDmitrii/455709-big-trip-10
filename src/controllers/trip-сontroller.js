import {render, RenderPosition} from '../utils/render';

import SortingForm, {SortType} from '../components/sorting-form';
import DaysList from '../components/days-list';
import Day from '../components/day';
import PointsList from '../components/points-list';
import NoPoint from '../components/no-point';
import PointController from '../controllers/point-controller';

export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._showedPointsControllers = [];
    this._noPoint = new NoPoint();
    this._sortingForm = new SortingForm();
    this._dayList = new DaysList();
    this._day = new Day();
    this._pointsList = new PointsList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortingForm.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  renderPoints(pointListElement, points, onDataChange, onViewChange) {
    return points.map((point) => {
      const pointController = new PointController(pointListElement, onDataChange, onViewChange);
      pointController.render(point);
      return pointController;
    });
  }

  render(points) {
    this._points = points;

    const container = this._container.getElement();
    const pointsContainer = this._pointsList.getElement();

    render(container, this._sortingForm, RenderPosition.BEFOREEND);
    render(container, this._dayList, RenderPosition.BEFOREEND);

    // Отрисовывает день.
    render(this._dayList.getElement(), this._day, RenderPosition.BEFOREEND);

    // Отрисовывает список точек маршрута.
    render(this._day.getElement(), this._pointsList, RenderPosition.BEFOREEND);

    const newPoints = this.renderPoints(pointsContainer, this._points, this._onDataChange, this._onViewChange);
    this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
    // this._showedPointsControllers = newPoints;
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._showedPointsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];

    switch (sortType) {
      case SortType.PRICE:
        sortedPoints = this._points.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        sortedPoints = this._points;
        break;
    }

    const pointsContainer = this._pointsList.getElement();

    pointsContainer.innerHTML = ``;

    const newPoints = this.renderPoints(pointsContainer, sortedPoints, this._onDataChange, this._onViewChange);
    this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
    // this._showedPointsControllers = newPoints;

    // const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);
    // this._showedTaskControllers = newTasks;
  }
}

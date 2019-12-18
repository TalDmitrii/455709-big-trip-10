import {render, RenderPosition} from './utils';
import {PROJECT__CONST} from './const';

import {generateDayPoints} from './mock/day-point';
import {generateFilter} from './mock/filter';
import {generateMenu} from './mock/menu';

import TripInfo from './components/trip-info';
import SiteMenu from './components/menu';
import SiteFilters from './components/filter';
import SortingForm from './components/sorting-form';
import EditForm from './components/edit-form';
import DaysList from './components/days-list';
import Day from './components/day';
import PointsList from './components/points-list';
import Point from './components/point';

// Генерирует данные.
const dayPoints = generateDayPoints(PROJECT__CONST.taskCount);
const filters = generateFilter();
const menuItems = generateMenu();

// Отрисовывает информацию о путешествии.
const tripInfoBlock = document.querySelector(`.trip-info`);
render(tripInfoBlock, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);

const tripControlBlock = document.querySelector(`.trip-controls`);
// Отрисовывает меню.
render(tripControlBlock, new SiteMenu(menuItems).getElement(), RenderPosition.AFTERBEGIN);
// Отрисовывает фильтры.
render(tripControlBlock, new SiteFilters(filters).getElement(), RenderPosition.BEFOREEND);

// Отрисовывает форму сортировки.
const tripEventsBlock = document.querySelector(`.trip-events`);
render(tripEventsBlock, new SortingForm().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает список дней.
render(tripEventsBlock, new DaysList().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает день.
const daysList = document.querySelector(`.trip-days`);
render(daysList, new Day().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает список точек маршрута.
const pointsListContainer = document.querySelector(`.trip-days__item`);
const pointsList = new PointsList();
render(pointsListContainer, pointsList.getElement(), RenderPosition.BEFOREEND);

// Отрисовывает точки маршрута.
const pointsContainer = pointsList.getElement();

const renderPoint = (pointData) => {
  const pointComponent = new Point(pointData);
  const pointEditComponent = new EditForm(pointData);
  const editButton = pointComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    pointsContainer.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  });

  const editForm = pointEditComponent.getElement();
  editForm.addEventListener(`submit`, () => {
    pointsContainer.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  });

  render(pointsContainer, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

dayPoints.forEach((dayPoint) => renderPoint(dayPoint));

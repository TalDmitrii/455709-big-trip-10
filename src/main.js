import {render} from './components/utils';
import {PROJECT__CONST} from './components/const';

import {createFiltersTemplate} from './components/filter';
import {createSortingFormTemplate} from './components/sorting-form';
import {createMenuTemplate} from './components/menu';
import {createEditFormTemplate} from './components/edit-form';
import {createTripInfoTemplate} from './components/trip-info';

import {createDaysListTemplate} from './components/trip-days-list';
import {createDaysItemTemplate} from './components/trip-day';

import {createDayPointListTemplate} from './components/day-point-list';
import {createDayPointTemplate} from './components/day-point';


const tripInfoBlock = document.querySelector(`.trip-info`);
// Ориентир для вставки блока.
const tripCost = tripInfoBlock.querySelector(`.trip-info__cost`);


const tripControlBlock = document.querySelector(`.trip-controls`);
// Ориентир для вставки блока.
const menuPoint = tripControlBlock.querySelector(`h2`);

const tripEventsBlock = document.querySelector(`.trip-events`);

render(tripCost, createTripInfoTemplate(), `beforebegin`);
render(menuPoint, createMenuTemplate(), `afterend`);
render(tripControlBlock, createFiltersTemplate(), `beforeend`);
render(tripEventsBlock, createSortingFormTemplate(), `beforeend`);
render(tripEventsBlock, createEditFormTemplate(), `beforeend`);

render(tripEventsBlock, createDaysListTemplate(), `beforeend`);
const daysList = document.querySelector(`.trip-days`);

render(daysList, createDaysItemTemplate(), `beforeend`);
const daysItem = document.querySelector(`.trip-days__item`);

render(daysItem, createDayPointListTemplate(), `beforeend`);
const cardsBlock = document.querySelector(`.trip-events__list`);

for (let i = 0; i < PROJECT__CONST.taskCount; i++) {
  render(cardsBlock, createDayPointTemplate(), `beforeend`);
}

import {render} from './components/utils';
import {PROJECT__CONST} from './const';

import {createFiltersTemplate} from './components/filter';
import {createSortingFormTemplate} from './components/sorting-form';
import {createMenuTemplate} from './components/menu';
import {createEditFormTemplate} from './components/edit-form';
import {createTripInfoTemplate} from './components/trip-info';

import {createDaysListTemplate} from './components/trip-days-list';
import {createDaysItemTemplate} from './components/trip-day';

import {createDayPointListTemplate} from './components/day-point-list';
import {createDayPointTemplate} from './components/day-point';

import {generateDayPoints} from './mock/day-point';
import {generateFilter} from './mock/filter';
import {generateMenu} from './mock/menu';

const dayPoints = generateDayPoints(PROJECT__CONST.taskCount);
const filters = generateFilter();
const menuItems = generateMenu();
console.dir(filters);
console.dir(menuItems);

const tripInfoBlock = document.querySelector(`.trip-info`);
// Ориентир для вставки блока.
const tripCost = tripInfoBlock.querySelector(`.trip-info__cost`);


const tripControlBlock = document.querySelector(`.trip-controls`);
// Ориентир для вставки блока.
const menuPoint = tripControlBlock.querySelector(`h2`);

const tripEventsBlock = document.querySelector(`.trip-events`);

render(tripCost, createTripInfoTemplate(), `beforebegin`);
render(menuPoint, createMenuTemplate(menuItems), `afterend`);
render(tripControlBlock, createFiltersTemplate(filters), `beforeend`);
render(tripEventsBlock, createSortingFormTemplate(), `beforeend`);
render(tripEventsBlock, createEditFormTemplate(dayPoints[0]), `beforeend`);

render(tripEventsBlock, createDaysListTemplate(), `beforeend`);
const daysList = document.querySelector(`.trip-days`);

render(daysList, createDaysItemTemplate(), `beforeend`);
const daysItem = document.querySelector(`.trip-days__item`);

render(daysItem, createDayPointListTemplate(), `beforeend`);
const cardsBlock = document.querySelector(`.trip-events__list`);

dayPoints.slice(1).forEach((dayPoint) => render(cardsBlock, createDayPointTemplate(dayPoint), `beforeend`));

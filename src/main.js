import {render, RenderPosition} from './utils/render';

import {PROJECT__CONST} from './const';

import {generateDayPoints} from './mock/day-point';
import {generateFilter} from './mock/filter';
import {generateMenu} from './mock/menu';

import TripInfo from './components/trip-info';
import SiteMenu from './components/menu';
import SiteFilters from './components/filter';
import Container from './components/main-container';
import EventController from './controllers/pointControlBoard';

// Генерирует данные.
const dayPoints = generateDayPoints(PROJECT__CONST.taskCount);
const filters = generateFilter();
const menuItems = generateMenu();

// Отрисовывает информацию о путешествии.
const tripInfoBlock = document.querySelector(`.trip-info`);
render(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripControlBlock = document.querySelector(`.trip-controls`);
// Отрисовывает меню.
render(tripControlBlock, new SiteMenu(menuItems), RenderPosition.AFTERBEGIN);
// Отрисовывает фильтры.
render(tripControlBlock, new SiteFilters(filters), RenderPosition.BEFOREEND);

// Отрисовывает основной контейнер.
const mainContainer = document.querySelector(`.page-main .page-body__container`);
const container = new Container();
render(mainContainer, container, RenderPosition.BEFOREEND);

const eventController = new EventController(container);
eventController.render(dayPoints);

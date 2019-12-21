import AbstractComponent from '../components/abstract-component';

const createFilterMarkup = (filter, isChecked) => {
  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
        <input id="filter-${name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" 
          type="radio" 
          name="trip-filter" 
          value="${name.toLowerCase()}" 
          ${isChecked ? `checked` : ``}
        />
        <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
      </div>
    `
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `
  );
};

export default class SiteFilters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}

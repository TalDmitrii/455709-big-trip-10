export {createMenuTemplate};

const createMenuMarkup = (item, isActive) => {
  const {name} = item;

  return (
    `
      <a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>
    `
  )
}

const createMenuTemplate = (menuItems) => {
  const menuMarkup = menuItems.map((it, i) => createMenuMarkup(it, i === 0)).join(`\n`);

  return (
    `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuMarkup}
      </nav>
  `
  );
};

export {render};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

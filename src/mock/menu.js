const menuItem = [`Table`, `Stats`];

const generateMenu = () => {
  return menuItem.map((it) => {
    return {
      name: it,
    }
  });
};

export {generateMenu};

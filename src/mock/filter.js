const filterNames = [`Everything`, `Future`, `Past`];

const generateFilter = () => {
  return filterNames.map((it) => {
    return {
      name: it,
    };
  });
};

export {generateFilter};

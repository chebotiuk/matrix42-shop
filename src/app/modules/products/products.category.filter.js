export function categoryFilter() {
  return (array, categories) => {
    const newArray = [];

    if (array && array.length > 0 && categories && categories.length > 0) {
      _.filter(array, (item) => {
        for (let i = categories.length; i--;) {
          if (categories[i] && item.categories && item.categories.length > 0) {
            if (_.includes(item.categories, categories[i])) {
              newArray.push(item);
            }
          }
        }
      });
    } else {
      return array;
    }

    return _.uniq(newArray);
  };
}

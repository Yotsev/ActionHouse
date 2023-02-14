const { categoriesMap } = require('../constants');

exports.getCategoriesViewData= (selectedCategory) => {
    const categories = Object.keys(categoriesMap).map(key => ({ 
        value: key, 
        label: categoriesMap[key],
        isSelected: selectedCategory == key,
    }));

    return categories;
}
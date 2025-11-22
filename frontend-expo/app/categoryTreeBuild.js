export function buildCategoryTree(categories) {
    const map = {};
    categories.forEach(cat => {
        map[cat._id] = { ...cat, children: [] };
    });

    const tree = [];
    categories.forEach(cat => {
        if (cat.parentCategoryId) {
            map[cat.parentCategoryId]?.children.push(map[cat._id]);
        } else {
            tree.push(map[cat._id]);
        }
    });
    return tree;
}

export function getAllSubCategoryIds(categoryId, categories) {
    const ids = [categoryId];
    function find(parentId) {
        categories.forEach(cat => {
            if (cat.parentCategoryId === parentId) {
                ids.push(cat._id);
                find(cat._id);
            }
        });
    }
    find(categoryId);
    return ids;
}
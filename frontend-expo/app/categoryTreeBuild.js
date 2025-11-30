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

export function CategoryListUi({ categories, level = 1}) {
    if (!categories || categories.length === 0) return null;

    return (
        <ol className='list-group listgroup-numbered'>
            {categories.map(cat => (
                < li key={cat._id}>
                    {cat.name}
                    {cat.children.length > 1 && (
                        <div>
                            <CategoryListUi categories={cat.children} level={level + 1} />
                        </div>
                    )}
                </li>
            ))}
        </ol>
    );
}
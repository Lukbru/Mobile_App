import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { buildCategoryTree } from "./categoryTreeBuild";

export default function CategoryTree({ categories, onSelectCategory }) {
    const tree = buildCategoryTree(categories);

    return (
        <View style={{ marginVertical: 10 }}>
            <TouchableOpacity onPress={()=>onSelectCategory('all', [])} style={{ paddingVertical: 5 }}>
                <Text style={{fontSize: 10, fontWeight: 'bold'}}>Category filter - All</Text>
            </TouchableOpacity>
            {tree.map(category => (
                <CategoryNode key={category._id} category={category} level={0} categories={categories} onSelectCategory={onSelectCategory} />
            ))}
        </View>
    );
}

function CategoryNode({ category, level, categories, onSelectCategory }) {
    const [open, setOpen] = useState(false);

    const opPressed = () => {
        setOpen(!open);
        onSelectCategory(category._id);
    }

    return (
        <View style={{ marginLeft: level * 10, borderColor: 'black', borderWidth: level > 0? 0 : 1, borderRadius: 6, padding: level > 0? 0 : 5 }}>
            <TouchableOpacity onPress={opPressed} style={{ paddingVertical: 5 }}>
                <Text>
                 {category.children.length>0?(open?"▼ " : "► ") : "• "}
                 {category.name}
                </Text>
            </TouchableOpacity>
            {open && category.children.map(child => (
                <CategoryNode key={child._id} category={child} level={level + 1} categories={categories} onSelectCategory={onSelectCategory} />
            ))}
        </View>
    );
}
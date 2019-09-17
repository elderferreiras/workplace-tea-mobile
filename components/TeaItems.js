import React from 'react';
import TeaItem from "./TeaItem";

const teaItems = (props) => {
    return props.items.map(item => <TeaItem
        id={item.id}
        key={item.id}
        content={item.content}
        createdAt={item.createdAt}
        up={item.up}
        down={item.down}
        comments={item.comments.items}
    />);
};

export default teaItems;
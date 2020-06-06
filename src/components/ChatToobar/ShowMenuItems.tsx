import React from 'react';

import { MenuItem } from '@material-ui/core';
import { MenuItemsList } from './MenuItems-utils';

interface MenuItemsProps {
    items: MenuItemsList[];
}

const ShowMenuItems = (props: MenuItemsProps): JSX.Element => {
    const showItems = (item: MenuItemsList, index: number): JSX.Element => {
        return (
            <MenuItem key={index} onClick={item.callbackAction}>
                {item.text}
            </MenuItem>
        );
    };

    return (
        <>
            {props.items.map((item: MenuItemsList, index: number): JSX.Element => {
                return showItems(item, index);
            })}
        </>
    );
};

export default ShowMenuItems;

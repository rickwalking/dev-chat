import React from 'react';

import {
    ListItem,
    ListItemText,
    ListItemAvatar,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

interface SkeletonListProp {
    count: number;
}

const SkeletonList = (props: SkeletonListProp): JSX.Element => {
    const getSkeletonItem = (): JSX.Element => {
        return (
            <>
                <ListItem>
                    <ListItemAvatar>
                        <Skeleton variant='circle' width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText>
                        <Skeleton variant='text' />
                        <Skeleton variant='text' />
                    </ListItemText>
                </ListItem>
            </>
        );
    };

    const getElementGroup = (): JSX.Element[] => {
        const elements: JSX.Element[] = [];

        for (let i = 0; i < props.count; i++) {
            elements.push(getSkeletonItem());
        }

        return elements;
    };

    return (
        <>
            {
                getElementGroup().map((element: JSX.Element, index: number): JSX.Element => (
                    <span key={index}>
                        {element}
                    </span>
                ))
            }
        </>
    );
};

export default SkeletonList;

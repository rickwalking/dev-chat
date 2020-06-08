export interface MenuItemsList {
    text: string;
    callbackAction: () => void;
}

export enum menuItemName {
    EDIT_PROFILE,
    LOGOFF,
    ADD_CHANNEL,
}

export interface MyMenuItems {
    [item: number]: MenuItemsList;
}

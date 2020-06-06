export interface MenuItemsList {
    text: string;
    callbackAction: () => void;
}

export enum menuItemName {
    EDIT_PROFILE,
    LOGOFF,
}

export interface MyMenuItems {
    [item: number]: MenuItemsList;
}

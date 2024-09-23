export interface SubItem {
    label: string;
    href?: string;
}

export interface Item {
    label: string;
    href?: string;
    subItems?: SubItem[];
}

export interface Menu {
    label: string;
    href?: string;
    items?: Item[];
}
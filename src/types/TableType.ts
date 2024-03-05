import {ReactNode} from "react";
import RENDER_TYPES from "../constance/table/renderTypes";

export type ColumnsType = {
    label: string;
    accessor: string;
    renderType?: ColumnsRenderTypes;
    tdWidth?: string;
};

export type DataTableType = {
    id: string | number;
    extraAction?: ReactNode;
} & any;

export type ColumnsRenderTypes = typeof RENDER_TYPES[keyof typeof RENDER_TYPES]
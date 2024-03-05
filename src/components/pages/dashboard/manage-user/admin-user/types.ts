import {SelectOptionType} from "../../../../Form/Select/Select";

export type SimpleFilter = {
  nationalCode: string;
  status: SelectOptionType | undefined;
}
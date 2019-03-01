import {IActionsRefsModel} from "./ActionRefsModel";
import {IContactInfoModel} from "..";

export interface IContactModel {
    id: number;
    info: IContactInfoModel;
    refs: IActionsRefsModel;
}
import {IActionsRefsModel} from "./ActionRefsModel";
import {IContactInfoModel} from "./ContactInfoModel";

export interface IContactModel {
    id: number;
    info: IContactInfoModel;
    refs: IActionsRefsModel;
}
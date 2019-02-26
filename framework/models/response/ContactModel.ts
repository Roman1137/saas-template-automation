import {IActionsRefsModel} from "./ActionRefsModel";
import {IContactInfoModel} from "../request+response/ContactInfoModel";

export interface IContactModel {
    id: number;
    info: IContactInfoModel;
    refs: IActionsRefsModel;
}
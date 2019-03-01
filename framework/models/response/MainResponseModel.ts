import {IContactModel} from "./ContactModel";

export interface IMainResponseModel {
    data: IContactModel[];
    message: any;
    status: number;
}
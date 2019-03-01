import {IDataModel} from "./DataModel";

export interface IMainResponseModel {
    data: IDataModel;
    message: any;
    status: number;
}
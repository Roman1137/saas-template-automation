import {IDataModel} from "./DataModel";

export interface IMainResponseModel {
    dataModel: IDataModel;
    message: any;
    status: number;
}
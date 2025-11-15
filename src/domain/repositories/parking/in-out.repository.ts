import { IListInOutParamsEntity, IListInOutResponseEntity } from "@/domain/index"

export abstract class InOutRepository {
    abstract listInOuts(params: IListInOutParamsEntity): Promise<IListInOutResponseEntity>;    ;
}
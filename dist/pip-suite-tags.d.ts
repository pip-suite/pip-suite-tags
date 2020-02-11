declare module pip.tags {


export interface ITagDataService {
    getUserId(): string;
    readTags(params: any, successCallback?: (data: PartyTags) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    createTags(params: any, successCallback?: (item: any) => void, errorCallback?: (error: any) => void): void;
    updateTags(params: any, successCallback?: (item: any) => void, errorCallback?: (error: any) => void): void;
}
export interface ITagDataProvider extends ng.IServiceProvider {
}

export class PartyTags {
    id: string;
    tags: Tag[];
    change_time: string;
}

export class Tag {
    tag: string;
    count: number;
    last_time: Date;
}


function configTagResources(pipRestProvider: pip.rest.IRestProvider): void;


}

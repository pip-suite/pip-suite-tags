import { PartyTags } from './PartyTags';

export interface ITagDataService {
    getUserId(): string;
    readTags(params: any, successCallback?: (data: PartyTags) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    createTags(params: any, successCallback?: (item: any) => void, errorCallback?: (error: any) => void): void;
    updateTags(params: any, successCallback?: (item: any) => void, errorCallback?: (error: any) => void): void;
}

export interface ITagDataProvider extends ng.IServiceProvider {

}

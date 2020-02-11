import { ITagDataService, ITagDataProvider } from './ITagDataService';
import { PartyTags } from './PartyTags';
import { Tag } from './Tag';

class TagData implements ITagDataService {
    private RESOURCE: string = 'tags';

    constructor(
        private pipRest: pip.rest.IRestService,
        private pipSession: pip.services.ISessionService
    ) {
        "ngInject";
    }

    public getUserId(): string {
        let userId: string;
        userId = this.pipSession.session ? this.pipSession.session.userId : null;

        return userId;
    }

    public readTags(params: any, successCallback?: (data: PartyTags) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        params = params || {};
        params.party_id = params.party_id ? params.party_id : this.getUserId();
        return this.pipRest.getResource(this.RESOURCE).get(params, successCallback, errorCallback);
    }

    public createTags(params: any, data: any, successCallback?: (item: any) => void, errorCallback?: (error: any) => void): void {
        params.party_id = params.party_id ? params.party_id : this.getUserId();
        this.pipRest.getResource(this.RESOURCE).save(params, data, successCallback, errorCallback);
    }

    public updateTags(params: any, data: any, successCallback?: (item: any) => void, errorCallback?: (error: any) => void): void {
        params.party_id = params.party_id ? params.party_id : this.getUserId();
        this.pipRest.getResource(this.RESOURCE).update(params, data, successCallback, errorCallback);
    }

}

class TagDataProvider implements ITagDataProvider {
    private _service: ITagDataService;

    constructor() { }

    public $get(
        pipRest: pip.rest.IRestService,
        pipSession: pip.services.ISessionService
    ) {
        "ngInject";

        if (this._service == null) {
            this._service = new TagData(pipRest, pipSession);
        }

        return this._service;
    }

}

angular
    .module('pipTagData', ['pipCommonRest'])
    .provider('pipTagData', TagDataProvider);


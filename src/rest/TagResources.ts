function configTagResources(pipRestProvider: pip.rest.IRestProvider) {
    "ngIjnect";
    
    pipRestProvider.registerResource('tags', '/api/1.0/tags/:party_id',
        { party_id: '@party_id' },
        {
            update: { method: 'PUT' }
        }
    );
}

angular
    .module('pipTag.Rest', ['pipRest'])
    .config(configTagResources);


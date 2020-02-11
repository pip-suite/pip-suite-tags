import './tag_list/TagList'
import './rest/TagResources';
import './data';


angular.module('pipTags', [
        'pipTag.Rest',
        'pipTagData',
        'pipTagList'
]);


export * from './data';



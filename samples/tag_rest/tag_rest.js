(function (angular) {
    'use strict';

    var thisModule = angular.module('appTags.Rest', ['pipTagData', 'pipTags.Templates', 'pipCommonRest', 'pipServices']);

    thisModule.controller('TagsRestController',
        function ($scope, $timeout, pipSession, pipRest, pipTagData) {
            $scope.serverUrl = 'http://alpha.pipservices.net';
            $scope.name = 'Sampler User';
            $scope.login = 'stas15';
            $scope.password = '123456';

            $scope.status = '';

            $scope.onSignin = onSignin;
            $scope.isSession = isSession;
            $scope.onRead = onRead;
            $scope.onAdd = onAdd;
            $scope.onUpdate = onUpdate;

            return;

            function isSession() {
                return pipSession.isOpened();
            }

            function onRead() {
                pipTagData.readTags(
                    {},
                    (data) => {
                        $scope.status = 'Read tag data';
                        console.log('Read tag data', data);
                    },
                    (error) => {
                        $scope.status = 'Read tag error';
                        console.log('Read tag error', error);
                    });
            }

            function onAdd() {
                let tags = [
                    { tag: 'tag1' },
                    { tag: 'tag2' }
                ];
                let params = {
                    tags: tags
                }
                pipTagData.createTags(
                    {},
                    params,
                    (data) => {
                        $scope.status = 'Add tag data';
                        console.log('Add tag data', data);
                    },
                    (error) => {
                        $scope.status = 'Add tag error';
                        console.log('Add tag error', error);
                    });
            }

            function onUpdate() {
                let tags = ['tag1', 'tag2'];
                let params = {
                    tags: tags
                }
                pipTagData.updateTags(
                    {},
                    params,
                    (data) => {
                        $scope.status = 'Update tag data';
                        console.log('Update tag data', data);
                    },
                    (error) => {
                        $scope.status = 'Update tag error';
                        console.log('Update tag error', error);
                    });
            }

            function onSignin() {
                pipRest.getResource('signin').call({
                    login: $scope.login,
                    password: $scope.password
                },
                    (data) => {
                        console.log('Session Opened');
                        pipRest.setHeaders({
                            'x-session-id': data.id
                        });
                        let session = {
                            sessionId: data.id,
                            userId: data.user_id
                        }
                        pipSession.open(session);

                    },
                    (error) => {

                    });

            }

        }
    );

})(window.angular);
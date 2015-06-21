(function() {
    'use strict';

    angular.module('core').controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state', '$stateParams', '$timeout', 'toaster', 'TestCases'];

    function MainController($scope, $state, $stateParams, $timeout, toaster, TestCases) {
        var gameId = $stateParams.gameId;
        var currentState = 1;
        var data;
        $scope.dialogData = [];
        $scope.notepadData = [];
        $scope.model = {
            inquired: '',
            reasoning: '',
            note: '',
            answer: ''
        };

        if (!gameId) {
            $state.go('choosegroup');
        }

        $scope.btnChangeScreenClick = btnChangeScreenClick;
        $scope.btnNextClick = btnNextClick;
        $scope.inquiredEnter = inquiredEnter;
        $scope.noteEnter = noteEnter;
        $scope.answerEnter = answerEnter;
        $scope.dropData = dropData;

        TestCases.get({
            group: gameId,
            page_size: -1
        }, function(res) {
            data = res.data;
            console.log(data);
            loadState();
        });

        function btnChangeScreenClick(button) {
            $(".left-bar .button").removeClass('active');
            $(".left-bar ." + button + "-btn").addClass('active');
        }

        function btnNextClick() {
            currentState++;
            loadState();
        }

        function dropData($data) {
            $timeout(function() {
                var idx = _.findIndex($scope.notepadData, {
                    $$hashKey: $data.$$hashKey
                });
                console.log($data);
                if (idx === -1) {
                    // new, add to notepadData
                    $scope.notepadData.push(_.cloneDeep($data));
                    $scope.$apply();
                    scrollNotepadToBottom();
                }
            });
        }

        function loadState() {
            var testcase = _.find(data, {
                state: currentState,
                type: 'begin_text'
            })
            if (testcase) {
                $scope.dialogData = [];
                $scope.dialogData.push(testcase);
            } else {
                toaster.pop('error', 'END!', 'No more TestCase');
            }
        }

        function inquiredEnter() {
            if ($scope.model.inquired) {
                var inquired = $scope.model.inquired.split(' ');
                // find InfoP
                var parentKeywords = {};
                var childKeywords = {};
                var infoP = _.filter(data, function(item) {
                    return item.state === currentState &&
                        item.type === 'infop' &&
                        item.keywords &&
                        _.findIndex(item.keywords, function(keyword) {
                            var r = inquired.indexOf(keyword);
                            if (r > -1) {
                                parentKeywords[item._id] = inquired[r].toUpperCase();
                            }
                            return r > -1;
                        }) > -1;
                });
                if (infoP && infoP.length > 0) {
                    _.forEach(infoP, function(infop) {
                        // continue find all child info
                        var info = _.filter(data, function(item) {
                            return item.state === currentState &&
                                item.type === 'info' &&
                                item.parent_code === infop.code &&
                                item.keywords &&
                                _.findIndex(item.keywords, function(keyword) {
                                    var r = inquired.indexOf(keyword);
                                    if (r > -1) {
                                        childKeywords[item._id] = inquired[r].toUpperCase();
                                    }
                                    return r > -1;
                                }) > -1;
                        });
                        if (info && info.length > 0) {
                            _.forEach(info, function(item) {
                                // find out info
                                var r = _.cloneDeep(item);
                                r.keywords_found = parentKeywords[infop._id] + '-' + childKeywords[item._id];
                                r.parent_keyword = parentKeywords[infop._id];
                                r.child_keyword = childKeywords[item._id];
                                r.reasoning = $scope.model.reasoning.toString();
                                $scope.dialogData.push(r);
                                scrollDialogToBottom();
                            });
                        } else {
                            printMessageNotFound();
                        }
                    });
                } else {
                    // find all info have no parent
                    var info = _.filter(data, function(item) {
                        return item.state === currentState &&
                            item.type === 'info' &&
                            !item.parent_code &&
                            item.keywords &&
                            _.findIndex(item.keywords, function(keyword) {
                                var r = inquired.indexOf(keyword);
                                if (r > -1) {
                                    childKeywords[item._id] = inquired[r].toUpperCase();
                                }
                                return r > -1;
                            }) > -1;
                    });
                    if (info && info.length > 0) {
                        _.forEach(info, function(item) {
                            // find out info
                            var r = _.cloneDeep(item);
                            r.keywords_found = childKeywords[item._id];
                            r.child_keyword = childKeywords[item._id];
                            r.reasoning = $scope.model.reasoning.toString();
                            $scope.dialogData.push(r);
                            scrollDialogToBottom();
                        });
                    } else {
                        printMessageNotFound();
                    }
                }

                $scope.model.inquired = '';
                $scope.model.reasoning = '';
            }
        }

        function printMessageNotFound() {
            var inquired = $scope.model.inquired.split(' ');
            var keywordsFound = [];
            var message = _.find(data, function(item) {
                return item.state === currentState &&
                    item.type === 'message' &&
                    item.keywords &&
                    _.findIndex(item.keywords, function(keyword) {
                        var r = inquired.indexOf(keyword);
                        if (r > -1) {
                            keywordsFound.push(inquired[r].toUpperCase());
                        }
                        return r > -1;
                    }) > -1;
            });
            var r = {};
            if (message) {
                r = _.cloneDeep(message);
            } else {
                var r = {};
                r.type = 'notfound';
                // Find inquired keywords for match
                var f = _.filter(data, function(item) {
                    return item.state === currentState &&
                        item.keywords &&
                        _.findIndex(item.keywords, function(keyword) {
                            var r = inquired.indexOf(keyword);
                            if (r > -1) {
                                keywordsFound.push(inquired[r].toUpperCase());
                            }
                            return r > -1;
                        }) > -1;
                });
            }
            if (!keywordsFound || keywordsFound.length === 0) {
                r.keywords_found = $scope.model.inquired.toUpperCase();
            } else {
                r.keywords_found = keywordsFound.join(', ');
            }
            r.child_keyword = r.keywords_found;
            r.reasoning = $scope.model.reasoning.toString();
            r.content = r.content ? r.content : 'The information you need is currently not available.';
            $scope.dialogData.push(r);
            scrollDialogToBottom();
        }

        function scrollDialogToBottom() {
            $timeout(function() {
                var itemContainer = $(".main-contain .dialog-content .scroll-content");
                var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
                itemContainer.slimScroll({
                    scrollTo: scrollTo_int,
                    start: 'bottom'
                });
            });
        }

        function scrollNotepadToBottom() {
            $timeout(function() {
                var itemContainer = $(".main-contain .notepad-content .scroll-content");
                var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
                itemContainer.slimScroll({
                    scrollTo: scrollTo_int,
                    start: 'bottom'
                });
            });
        }

        function noteEnter() {
            var r = {
                type: 'note',
                state: currentState,
                content: $scope.model.note.toString()
            }
            $scope.notepadData.push(r);
            scrollNotepadToBottom();
            $scope.model.note = '';
        }

        function answerEnter() {
            var r = {
                type: 'answer',
                state: currentState,
                content: $scope.model.answer.toString()
            }
            $scope.notepadData.push(r);
            scrollNotepadToBottom();
            $scope.model.answer = '';
        }
    }
})();

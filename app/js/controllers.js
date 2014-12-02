'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute'])

    // survey page controller
    .controller('surveyCtrl', ['$scope', '$rootScope', 'FBURL', 'Firebase', 'angularFireCollection', function($scope, $rootScope, FBURL, Firebase, angularFireCollection) {

        // default placeholders
        // $scope.age = '16-25';
        // $scope.name = '';
        // $scope.dinner = 'Yes';
        // $scope.rating = 5;
        // $scope.comment = '';

        // hide success information/alert
        $scope.successInfo = false;

        // star rating question - update rating score
        // $scope.updateRating = function(rating) {
        //     $scope.rating = rating;
        // };

        // open modal
        $scope.takeSurvey = function () {
            $('#survey').modal('show');
        };

        // constrain number of messages by passing a ref to angularFire
        var age = new Firebase(FBURL+'/survey').limit(10),
            hoursPracticed = new Firebase(FBURL+'/survey').limit(4),
            practiceLocation = new Firebase(FBURL+'/survey').limit(8),
            practiceType = new Firebase(FBURL+'/survey').limit(17),
            ethnicity = new Firebase(FBURL+'/survey').limit(8),
            language = new Firebase(FBURL+'/survey').limit(10),
            gender = new Firebase(FBURL+'/survey').limit(6),
            graduatingInstitute = new Firebase(FBURL+'/survey').limit(100),
            qualification = new Firebase(FBURL+'/survey').limit(17),
            yearsPracticing = new Firebase(FBURL+'/survey').limit(5);


        // add the array into $scope
        $rootScope.results = angularFireCollection(age, hoursPracticed, practiceLocation, practiceType, ethnicity, language, gender, graduatingInstitute, qualification, yearsPracticing);

        // add new results to the list
        $scope.addSurvey = function() {
            if( $scope.age && $scope.hoursPracticed && $scope.practiceLocation && $scope.practiceType && $scope.ethnicity && $scope.language && $scope.gender && $scope.graduatingInstitute && $scope.qualification && $scope.yearsPracticing) {
                $rootScope.results.add(
                    {
                        age: $scope.age, 
                        hoursPracticed : $scope.hoursPracticed,
                        practiceLocation: $scope.practiceLocation,
                        practiceType: $scope.practiceType,
                        ethnicity : $scope.ethnicity,
                        language : $scope.language,
                        gender : $scope.gender,
                        graduatingInstitute : $scope.graduatingInstitute,
                        qualification : $scope.qualification,
                        yearsPracticing : $scope.yearsPracticing
                    });
                $('#survey').modal('hide');
                $scope.successInfo = true;
            } else {
                alert('You missed something.');
            }
        };

    }])

    // login page controller
    .controller('loginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
        $scope.email = '';
        $scope.pass = '';

        $scope.login = function(callback) {
        $scope.err = null;
        loginService.login($scope.email, $scope.pass, '/login', function(err, user) {
            $scope.err = err||null;
            typeof(callback) === 'function' && callback(err, user);
            if (!$scope.err) {
                $location.path('/survey')
            }
            });
        };

    }])

    // result page controller
    .controller('resultCtrl', ['$scope', '$rootScope', 'loginService', 'angularFire', 'FBURL', '$timeout', function($scope, $rootScope, loginService, angularFire, FBURL, $timeout) {

      angularFire(FBURL+'/users/'+$scope.auth.id, $scope, 'user', {});

      $rootScope.logout = function() {
        console.log('init');
         loginService.logout('/survey');
      };

    }]);
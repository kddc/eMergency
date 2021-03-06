'use strict';

/**
 * @ngdoc function
 * @name eMergencyApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the eMergencyApp
 */
angular.module('eMergencyApp')
  .controller('EventCtrl', function ($scope, $routeParams, $db, geolocationService, eventService, commentService, userService, Notification) {
    var createMarker, createMap;
    $scope.map = {markers:[]};
    $scope.event = {};
    $scope.comments = [];
    $scope.comment = {};
    $scope.userService = userService;

    $scope.update = function(event) {
      eventService.update(event)
        .then(function() {
          Notification.success('Dein Event wurde aktualisiert');
        });
    }

    $scope.addComment = function(comment) {
      comment.event = $scope.event;
      commentService.add(comment)
        .then(function() {
          Notification.success('Kommentar abgeschickt');
          $scope.comment = {};
        }, function() {
          Notification.error('Kommentar konnte nicht abgeschickt werden. Versuch es noch einmal.');
          $scope.comment = {};
        });
    }

    eventService.getById($routeParams.id)
      .then(function(event) {
        createMap(geolocationService.location);
        $scope.map.markers.push(createMarker(event));
        $scope.event = event;
        commentService.load(event)
          .then(function(comments) {
            angular.forEach(comments, function(comment) {
              commentService.loadUser(comment)
                .then(function(comment) {
                  $scope.comments.push(comment);
                });
            });
            commentService.subscribe(event, function(e, comment) {
              commentService.loadUser(comment)
                .then(function(comment) {
                  $scope.comments.unshift(comment);
                });
            });
          });
      });

    createMap = function(location) {
      $scope.map.center = {latitude: location.lat, longitude: location.long};
      $scope.map.zoom = 10;
      $scope.map.options = {scrollwheel: false};
    }

    createMarker = function (entry) {
      var marker = {
        id: entry.id,
        latitude: entry.location.latitude,
        longitude: entry.location.longitude,
        icon: 'images/map/' + entry.type.bezeichnung + '.png',
      };
      return marker;
    }
  });

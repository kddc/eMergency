'use strict';

describe('Service: geolocationService', function () {

  // load the service's module
  beforeEach(module('eMergencyApp'));

  // instantiate service
  var geolocationService;
  beforeEach(inject(function (_geolocationService_) {
    geolocationService = _geolocationService_;
  }));

  // it('should get the Possition by Browser API', function (done) {
  //   geoLocService.get()
  //     .then(function(location) {
  //       expect(location).not.toBe(null);
  //       expect(location.lat).toEqual(jasmine.any(Number));
  //       expect(location.long).toEqual(jasmine.any(Number));
  //       expect(location.error).toBe(0);
  //       done();
  //     }, function() {
  //         done.fail("Position couldn't be aquired");
  //     });
  // });
  //
  // it('should get the Possition by IP', function (done) {
  //   geoLocService.getIp()
  //     .then(function(location) {
  //       expect(location).not.toBe(null);
  //       expect(location.lat).toEqual(jasmine.any(Number));
  //       expect(location.long).toEqual(jasmine.any(Number));
  //       expect(location.error).toBe(3);
  //       done();
  //     }, function() {
  //         done.fail("Position couldn't be aquired");
  //     });
  // });
  //
  // it('should get the Possition from Storage', function (done) {
  //   geoLocService.getStorage()
  //     .then(function(location) {
  //       expect(location).not.toBe(null);
  //       expect(location.lat).toEqual(jasmine.any(0));
  //       expect(location.long).toEqual(jasmine.any(0));
  //       expect(location.error).toBe(1);
  //       done();
  //     }, function() {
  //         done.fail("Position couldn't be aquired");
  //     });
  // });
  it('should do something', function () {
    expect(!!geolocationService).toBe(true);
  });

});

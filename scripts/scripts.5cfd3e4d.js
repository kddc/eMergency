"use strict";angular.module("eMergencyApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","geolocation","LocalStorageModule"]).config(["$routeProvider","localStorageServiceProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"}),b.setPrefix("eMergencyApp").setStorageType("localStorage").setNotify(!0,!0)}]).run(["$rootScope",function(a){a.DB=new DB.EntityManagerFactory("https://julian.baqend.com"),a.DB=a.DB.createEntityManager()}]),angular.module("eMergencyApp").controller("MainCtrl",["$scope","eventService","geoLocService",function(a,b,c){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.events=[],a.addEvent=function(){b.add({})},b.all(a.events).then(function(c){a.events=c,b.subscribe(function(b,c){a.events.push(c)})},function(a){console.log(a)}),a.coords={},c.get().then(function(b){a.coords=b},function(a){console.log(a)})}]),angular.module("eMergencyApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("eMergencyApp").service("eventService",["$q","$rootScope",function(a,b){return{all:function(){return a(function(a,c){b.DB.ready().then(function(){b.DB.Event.find().resultList().then(function(b){a(b)},function(a){c(a)})})})},add:function(c){return c.date=new Date,a(function(a,d){b.DB.ready().then(function(){b.DB.Event(c).insert(function(b){a(b)},function(a){d(a)})})})},update:function(c){return a(function(a,d){b.DB.ready().then(function(){c.save(function(b){a(b)},function(a){d(a)})})})},subscribe:function(a){b.$on("notifying-service-event",a);b.DB.ready().then(function(){var a=b.DB.Event.find().stream(!1);a.on("all",function(a){b.$emit("notifying-service-event",a.data),b.$apply()})})}}}]),angular.module("eMergencyApp").service("geoLocService",["geolocation","localStorageService","$http","$q",function(a,b,c,d){return{get:function(){return this.getBrowser()},getBrowser:function(){var c=this,d=new Date,e=c.getStorage(),f=new Date(e.time);return d-f>9e5&&(e.error=2),a.getLocation().then(function(a){return e={lat:a.coords.latitude,"long":a.coords.longitude,time:d,error:0},b.set("geoLoc",e),e},function(a){return b.get("geoLoc")?(e=b.get("geoLoc"),f=new Date(e.time),d-f>9e5&&(e.error=2)):e=c.getIp(),e})},getStorage:function(){var a=new Date("01/12/1984"),c={};return d(function(d,e){b.get("geoLoc")?(c=b.get("geoLoc"),d(c)):(c={lat:0,"long":0,time:a,error:1},e(c))})},getIp:function(){var a=new Date,b={};return c.get("http://ipinfo.io/json").then(function(c){var d=c.data.loc.split(",");return b={lat:d[0],"long":d[1],time:a,error:3}},function(c){return b={lat:0,"long":0,time:a,error:1}})}}}]),angular.module("eMergencyApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="baqend"> <p ng-repeat="event in events track by event.id"> Event: {{ event }} </p> <a href="" class="btn btn-default" ng-click="addEvent()">Neues Event hinzufügen</a> </div> <p></p> <div class="location"> <p><strong>Position</strong> Latitude: {{coords.lat}} Longitude: {{coords.long}} Error: {{coords.error}}</p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);
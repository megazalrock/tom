(function(window, $, angular, undefined){
	"use strict";
	var towerOfMetabApp = angular.module('towerOfMetabApp', ['ngStorage']);
	towerOfMetabApp.controller('MainCtrl', ['$scope', '$localStorage', '$sessionStorage', function($scope, $localStorage, $sessionStorage){

		//$scope.targetUrl = 'about:blank';
		$scope.$strage = $localStorage;
		$scope.targetUrl = $scope.$strage .targetUrl || 'http://headlines.yahoo.co.jp/hl?a=20140812-00000026-at_s-l22';
		$scope.bookmarksPages = [];
		if(!angular.isUndefined($scope.$strage.bookmarksPages)){
			$scope.bookmarksPages = JSON.parse($scope.$strage.bookmarksPages);
		}
		$scope.bookmarksSum = $scope.$strage.bookmarksSum;

		$scope.climb = function(){
			$scope.bookmarksPages = [];
			$scope.bookmarksSum = 0;
			(function loop(url){
				$scope.$strage.targetUrl = $scope.targetUrl;
				getHateb(url)
					.then(function(res){
						if(res !== null && $scope.bookmarksPages.length < 12){
							$scope.$apply(function(){
								$scope.bookmarksPages.unshift(res);
								$scope.bookmarksSum += parseFloat(res.count);
							});
							loop(res.entry_url);
						}else{
							$scope.$apply(function(){
								$scope.$strage.bookmarksPages = JSON.stringify($scope.bookmarksPages);
								$scope.$strage.bookmarksSum = $scope.bookmarksSum;
							});
						}
					});
			})($scope.targetUrl);
			function getHateb(url){
				var deferred = $.Deferred();
				if(typeof url !== 'string'){
					url = url.entry_url;
				}
				$.ajax('http://api.b.st-hatena.com/entry/jsonlite/',{
					type: 'GET',
					dataType: 'jsonp',
					data: {
						url: url,
						callback: 'callback'
					},
					jsonp: true,
					jsonpCallback: 'callback'
				})
				.then(function(res){
					deferred.resolve(res);
				});
				return deferred.promise();
			}
		};
		$scope.getDate = function(datetime){
			return datetime.match(/\d+\/\d+\/\d+/)[0].replace(/\//g, '');
		};
		$scope.hasIdCallClass = function(comment){
			var classes = [];
			if((/id:[A-Za-z0-9]+?\s/.test(comment))){
				classes = ['hasIdCall'];
			}
			return classes;
		};
	}]);


})(this, jQuery, angular);
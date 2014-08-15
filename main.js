(function(window, $, angular, undefined){
	"use strict";
	var towerOfMetabApp = angular.module('towerOfMetabApp', ['ngStorage']);
	towerOfMetabApp.controller('MainCtrl', ['$scope', '$http', '$q', '$localStorage', '$sessionStorage', function($scope, $http, $q, $localStorage, $sessionStorage){

		$scope.isLoading = false;
		$scope.$strage = $localStorage;
		$scope.targetUrl = $scope.$strage.targetUrl || 'http://tom.mgzl.jp/';
		$scope.bookmarksPages = [];
		if(!angular.isUndefined($scope.$strage.bookmarksPages)){
			$scope.bookmarksPages = JSON.parse($scope.$strage.bookmarksPages);
		}
		$scope.bookmarksSum = $scope.$strage.bookmarksSum || 0;
		$scope.isLoadingClass = 'hidden';
		$scope.isNotLoadingClass = '';

		$scope.climb = function(){
			if($scope.isLoading){
				return false;
			}

			$scope.bookmarksPages = [];
			$scope.bookmarksSum = 0;
			$scope.$strage.targetUrl = $scope.targetUrl;
			$scope.isLoading = true;
			$scope.isLoadingClass = '';
			$scope.isNotLoadingClass = 'hidden';
			(function loop(url){
				$http
					.jsonp('http://api.b.st-hatena.com/entry/jsonlite/', {
						params: {
							url: url,
							callback: 'JSON_CALLBACK'
						}
					})
					.then(function(res){
						var data = res.data;
						if(data !== null && $scope.bookmarksPages.length < 12){
							$scope.bookmarksPages.unshift(data);
							$scope.bookmarksSum += parseFloat(data.count);
							loop(data.entry_url);
						}else{
							$scope.$strage.bookmarksPages = JSON.stringify($scope.bookmarksPages);
							$scope.$strage.bookmarksSum = $scope.bookmarksSum;
							$scope.isLoading = false;
							$scope.isLoadingClass = 'hidden';
							$scope.isNotLoadingClass = '';
						}
					});
			})($scope.targetUrl);
		};
		$scope.getDate = function(datetime){
			return datetime.match(/\d+\/\d+\/\d+/)[0].replace(/\//g, '');
		};
		$scope.hasIdCallClass = function(comment){
			var classes = [];
			if((/id:[\w-]+/.test(comment))){
				classes = ['hasIdCall'];
			}
			return classes;
		};
		$scope.keyup = function(e){
			if(e.keyCode === 13){
				$scope.climb();
			}
		};
	}]);
})(this, jQuery, angular);
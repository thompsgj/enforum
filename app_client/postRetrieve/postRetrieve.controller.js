(function () {
	angular
		.module('enforumApp')
		.controller('retrieveCtrl', retrieveCtrl);

	retrieveCtrl.$inject = ['$scope'];
	function retrieveCtrl ($scope) {
		var vm = this;
		vm.pageHeader = {
			title: 'Enforum',
			strapline: 'This is the post data.'
		};
	}
}) ();
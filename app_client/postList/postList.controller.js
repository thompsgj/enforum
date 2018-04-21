(function () {
	angular
		.module('enforumApp')
		.controller('listCtrl', listCtrl);

	listCtrl.$inject = ['$routeParams','$uibModal','enForumData','$scope'];
	function listCtrl ($routeParams, $uibModal, enForumData, $scope) {
		var vm = this;
		console.log("LIST CONTROL FUNCTION START")
		vm.forumid = $routeParams.forumid;
		console.log("VM FORUM ID", vm.forumid)

		enForumData.postListById(vm.forumid)
			.success(function(data) {
				console.log("LIST CONTROL FUNCTION SUCCESS", data[0].settings)
				vm.data = {
					settings: data[0].settings,
					posts: data[0].posts
				};
				console.log("FINAL DATA OUTPUT", vm.data.settings)
			})
			.error(function(e) {
				console.log("LIST CONTROL FUNCTION ERROR")
				console.log(e);
			})

		console.log("AFTER DB CALL LOG")

		vm.pageHeader = {
			title: 'Enforum',
			strapline: 'The best forum on Earth!'
		};

		vm.popupSettings = function() {
			console.log("POPUP SETTINGS CALLED")
			var modalInstance = $uibModal.open({
				templateUrl: '/postModal/postModal.view.html',
				controller: 'postModalCtrl as vm',
				windowClass: 'settings-modal',
				resolve: {
					editId: function() {return vm.forumid}
				}
			});
			modalInstance.result.then(function(data) {
				console.log("POSTLIST POPUP SETTING RESULT", data.posts)
				vm.data.posts.push(data.posts)
			})
		};
	}
}) ();
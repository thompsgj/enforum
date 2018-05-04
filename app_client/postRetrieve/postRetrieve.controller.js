(function () {
	angular
		.module('enforumApp')
		.controller('retrieveCtrl', retrieveCtrl);

	retrieveCtrl.$inject = ['$uibModal','$routeParams', 'enForumData', '$scope','$route'];
	function retrieveCtrl ($uibModal, $routeParams, enForumData, $scope,$route) {
		console.log("RETRIEVE THREAD POSTS/REPLIES FUNCTION START")
		var vm = this;

		vm.threadid = $routeParams.postid;
		console.log("VM THREAD ID", vm.threadid)
		vm.pageHeader = {
			title: 'Enforum',
			strapline: 'This is the post data.'
		};

		/*
			- give each thread a unique IDDONE
			- put thread id in preceding pageDONE
			- send thread id to this pageDONE
			- Call service to get dataDONE
			  * enforumService > index > forums.js > use the dataDONE
			  * use uniqueID to call specific dataDONE
			  * use returned data on pageDONE
			- Edit the service
			- Add a reply
			  * on button click, send id and open modal
			  * modal allows for entering reply
			  * on submit click, modal sends data to db
			  * Submit > postRetrieve.controller > replyModal.controller >
			    submit sends data (replyModal.controller) > enforumData > index.js > forums.js

		*/

		enForumData.retrievePostsById(vm.threadid)
			.success(function(data) {
				console.log("RETRIEVE THREAD FUNCTION SUCCESS", data);
				console.log("SLICE", data[0].posts[0].title)
				vm.data = {
					id : data[0].posts[0]._id,
					title: data[0].posts[0].title,
					replies: data[0].posts[0].replies
				}
			})
			.error(function(e){
				console.log("ERROR RETRIEVE POSTS FUNCTION")
			})

			vm.addReplyModal = function() {
				console.log("CREATE REPLY SETTINGS START", vm.threadid)
				var modalInstance = $uibModal.open({
					templateUrl: '/replyModal/replyModal.view.html',
					controller: 'replyModalCtrl as vm',
					windowClass: 'settings-modal',
					resolve: {
						threadId: function() {return vm.threadid}
					}
				})
				modalInstance.result.then(function(data) {
					console.log("POPUP SETTING RESULT", data)
					$route.reload();
				})
			}

			vm.deleteReply = function(replyid) {
				console.log("DELETE REPLY", replyid)
				vm.doDeleteReply(replyid)
			}

			vm.doDeleteReply = function(replyid) {
				console.log("DO DELETE REPLY", replyid)
				enForumData.deleteReply({
					id: replyid
				})
				.success(function(data){
					console.log("REPLY DELETE SUCCESS")
					$route.reload();
				})
				.error(function(e){
					console.log(e);
				})
			}

			vm.editReplyModal = function(data) {
				console.log("EDIT REPLY SETTINGS START", data)
				var modalInstance = $uibModal.open({
					templateUrl: '/editReplyModal/editReplyModal.view.html',
					controller: 'editReplyModalCtrl as vm',
					windowClass: 'settings-modal',
					resolve: {
						replyId: function() {return data}
					}
				})
				console.log("EDIT REPLY SETTINGS MIDDLE")
				modalInstance.result.then(function(data) {
					console.log("POPUP SETTING RESULT", data)
					$route.reload();
				})
			}

	}
}) (); 
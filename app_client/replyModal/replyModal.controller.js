(function() {
	angular
		.module('enforumApp')
		.controller('replyModalCtrl', replyModalCtrl);

	replyModalCtrl.$inject = ['$uibModalInstance', 'enForumData', 'threadId'];
	function replyModalCtrl ( $uibModalInstance, enForumData, threadId) {
		var vm = this;

		//Validation Check on Variables
		vm.onSubmit = function () {
			console.log("POST FORM DATA SUBMISSION")

			vm.doCreateReply(vm.formData);
		}

		//Call Create Form Function
		vm.doCreateReply = function(formData) {
			console.log("DO CREATE REPLY")
			var today = new Date();
			var postDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes();

			enForumData.replyCreate({
				id : threadId,
				title : formData.title,
				content : formData.contents,
				beginReply : "2018-04-07",
				sendReply: postDate
			})
			.success(function(data) {
				console.log("SUCCESS DO CREATE POST", data)
				vm.modal.close(data);
			})
			.error(function(data) {
				vm.formError = "Your post has not been saved.  Please try again."
				console.log("ERROR DO CREATE REPLY", data)
			})
		}

		vm.modal = {
			close: function(result) {
				$uibModalInstance.close(result);
			},
			cancel: function() {
				$uibModalInstance.dismiss('cancel');
			}
		};
	};


})();
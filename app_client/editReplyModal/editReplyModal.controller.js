(function() {
	console.log("Instance Create")
	angular
		.module('enforumApp')
		.controller('editReplyModalCtrl', editReplyModalCtrl);


	console.log("Injection")
	editReplyModalCtrl.$inject = ['$route','$uibModalInstance', 'enForumData', 'replyId'];
	function editReplyModalCtrl ($route, $uibModalInstance, enForumData, replyId) {
		console.log("EDIT REPLY MODAL START", replyId)
		var vm = this;


		enForumData.retrieveReply(replyId)
			.success(function(data) {
				console.log("EDIT REPLY CONTENTS MODAL VIEW SUCCESS", data[0])
				vm.formData = {
					_id: data[0]._id,
					title: data[0].title,
					contents: data[0].content,
					beginReply: data[0].beginReply,
					sendReply: data[0].sendReply
				}
			})
			.error(function(data) {
				console.log("EDIT REPLY CONTENTS MODAL VIEW ERROR")
				console.log(e);
			})


		//Validation Check on Variables
		vm.onSubmit = function (formData) {
			console.log("EDIT REPLY FORM DATA SUBMISSION", vm.formData)

			vm.doUpdateReply(vm.formData);
		}

		//Call Create Form Function
		vm.doUpdateReply = function(formData) {
			console.log("DO UPDATE REPLY", formData)
			enForumData.updateReply({
				id : replyId,
				title : formData.title,
				content : formData.contents
			})
			.success(function(data) {
				console.log("SUCCESS DO UPDATE REPLY", data)
				vm.modal.close(data);
				$route.reload();
			})
			.error(function(data) {
				vm.formError = "Your post has not been saved.  Please try again."
				console.log("ERROR DO UPDATE REPLY", data)
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
(function() {
	angular
		.module('enforumApp')
		.controller('postModalCtrl', postModalCtrl);

	postModalCtrl.$inject = ['$uibModalInstance', 'enForumData', 'editId'];
	function postModalCtrl ( $uibModalInstance, enForumData, editId) {
		var vm = this;

		//Validation Check on Variables
		vm.onSubmit = function () {
			console.log("POST FORM DATA SUBMISSION")

			vm.doCreatePost(vm.formData);
		}

		//Call Create Form Function
		vm.doCreatePost = function(formData) {
			console.log("DO CREATE POST")
			var today = new Date();
			// GOOD RESOURCE FOR TIME: https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
			// GOOD RESOURCE FOR ADDING TIME: https://stackoverflow.com/questions/10586576/how-to-add-4-hours-to-a-formated-date-time?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
			var postDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes();

			enForumData.postCreate({
				id : editId,
				title : formData.title,
				content : formData.contents,
				beginPost : "2018-04-07",
				sendPost: postDate
			})
			.success(function(data) {
				console.log("SUCCESS DO CREATE POST", data)
				vm.modal.close(data);
			})
			.error(function(data) {
				vm.formError = "Your post has not been saved.  Please try again."
				console.log("ERROR DO CREATE POST", data)
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
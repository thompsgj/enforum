(function() {
	angular
		.module('enforumApp')
		.controller('editThreadModalCtrl', editThreadModalCtrl);

	editThreadModalCtrl.$inject = ['$route','$uibModalInstance', 'enForumData', 'editId'];
	function editThreadModalCtrl ($route, $uibModalInstance, enForumData, editId) {
		console.log("EDIT THREAD MODAL START", editId)
		var vm = this;

/*
	- send Id to postListDONE
	- send Id from postList to ModalDONE
	- use Id to search database and return data
	- apply data to view
	- on click, update database
	- reload data to show changes
*/

		enForumData.threadContentsById(editId)
			.success(function(data) {
				console.log("EDIT THREAD CONTENTS MODAL VIEW SUCCESS", data[0].posts[0])
				vm.data = {
					post: data[0].posts[0]
				}
			})
			.error(function(data) {
				console.log("EDIT THREAD CONTENTS MODAL VIEW ERROR")
				console.log(e);
			})

		//Validation Check on Variables
		vm.onSubmit = function () {
			console.log("EDIT THREAD FORM DATA SUBMISSION", vm.data.post)

			vm.doUpdateThread(vm.data.post);
		}

		//Call Create Form Function
		vm.doUpdateThread = function(formData) {
			console.log("DO UPDATE THREAD", formData)
			//var today = new Date();
			// GOOD RESOURCE FOR TIME: https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
			// GOOD RESOURCE FOR ADDING TIME: https://stackoverflow.com/questions/10586576/how-to-add-4-hours-to-a-formated-date-time?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
			//var postDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes();

			enForumData.updateThread({
				id : editId,
				title : formData.title,
				content : formData.content
			})
			.success(function(data) {
				console.log("SUCCESS DO UPDATE THREAD", data)
				vm.modal.close(data);
				$route.reload();
			})
			.error(function(data) {
				vm.formError = "Your post has not been saved.  Please try again."
				console.log("ERROR DO UPDATE THREAD", data)
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
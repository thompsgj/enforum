(function () {

	angular
		.module('enforumApp')
		.controller('editForumSettingsModalCtrl', editForumSettingsModalCtrl);

	editForumSettingsModalCtrl.$inject = ['$route', '$uibModalInstance', 'enForumData','editId'];
	function editForumSettingsModalCtrl ( $route, $uibModalInstance, enForumData, editId) {
		var vm = this;
/*
- get forumidDONE
- add "edit" buttonDONE
- Get Data- on opening, retrieve data and send it into viewDONE
- Change variables in form submission to match because I need to use the same model for receiving and sending data
- Change checkbox values to true/falseDONE
	//https://stackoverflow.com/questions/17374146/angularjs-checkbox-checked-by-default-on-load-and-disables-select-list-when-chec?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
	//https://stackoverflow.com/questions/4228658/what-values-for-checked-and-selected-are-false?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
- Enable checkbox default valuesDONE
- Send DataDONE
   * change credit forum to edit forum
*/

		vm.checklist = []


		vm.addNewChoice = function() {
			console.log("ADD NEW CHOICE")
			console.log("CHECKLIST", vm.checklist)
			console.log("CHECKLIST NUMBER", vm.checklist.length)
			var newChecklistItem = vm.checklist.length+1;
			vm.checklist.push({ 'criteria' : ''});

		}

		vm.removeChoice = function() {
			var newChecklistItem = vm.checklist.length-1;
			if ( newChecklistItem !== -1 ) {
				vm.checklist.pop('');
			}
		}


		console.log("EDIT SETTINGS CTRL", editId)

		enForumData.postListById(editId)
		.success(function(data) {
			console.log("EDIT SETTINGS MODAL VIEW SUCCESS", data[0])
			viewData = data[0].settings;
			vm.formData = viewData;
			console.log("DATA", vm.formData)
		})
		.error(function(e) {
			console.log("EDIT SETTINGS MODAL VIEW ERROR", e)
			console.log(e);
		})

		//Validation Check on Variables
		vm.onSubmit = function () {
			console.log("SETTINGS MODAL CONTROL", vm.formData)
			vm.formError = "";
			if(!vm.formData.name) {
				vm.formError = "Please make sure all fields are filled out.";
				return false;
			} else {
				vm.doUpdateForum(vm.formData);
			}
		};

		//Call Create Forum Function
		vm.doUpdateForum = function (formData) {
			console.log("DO UPDATE SETTINGS", formData)
			enForumData.updateForum({
				forumid: editId,
				name : formData.name,
				description : formData.description,
				gradingMethod : formData.gradingMethod,
				points : formData.points,
				peereval : formData.peereval,
				reflection : formData.reflection,
				reflectionChecklist : formData.reflectionChecklist
			})
			.success(function(data){
				console.log("DO UPDATE SETTINGS FORUM", data)
				vm.modal.close(data);
				$route.reload();
			})
			.error(function(data){
				vm.formError = "Your forum has not been saved.  Please try again.";
			});
		}


		vm.modal = {
			close: function(result) {
				$uibModalInstance.close(result);
			},
			cancel: function() {
				$uibModalInstance.dismiss('cancel');
			}
		};

/*
		vm.popupSettings = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/reflectionSettingsModal/reflectionSettingsModal.view.html',
				controller: 'reflectionSettingsModalCtrl as vm',
				windowClass: 'reflection-settings-modal'
			});
		};
*/
	}
})();
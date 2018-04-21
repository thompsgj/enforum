(function () {
	angular
		.module('enforumApp')
		.controller('settingsModalCtrl', settingsModalCtrl);

	settingsModalCtrl.$inject = ['$uibModalInstance', 'enForumData'];
	function settingsModalCtrl ( $uibModalInstance, enForumData) {
		var vm = this;

		//Validation Check on Variables
		vm.onSubmit = function () {
			console.log("SETTINGS MODAL CONTROL", vm.formData)
			vm.formError = "";
			if(!vm.formData.name) {
				vm.formError = "Please make sure all fields are filled out.";
				return false;
			} else {
				vm.doCreateForum(vm.formData);
			}
		};

		//Call Create Forum Function
		vm.doCreateForum = function (formData) {
			enForumData.createForum({
				name : formData.name ,
				description : formData.description ,
				gradingMethod : formData.gradingMethod ,
				points : formData.gradeTotal ,
				peereval : formData.peerEvalToggle ,
				reflection : formData.reflectionToggle
			})
			.success(function(data){
				console.log("DO CREATE FORUM", data)
				vm.modal.close(data);
				//$route.reload();
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
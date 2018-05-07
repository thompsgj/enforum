(function () {
	angular
		.module('enforumApp')
		.controller('settingsModalCtrl', settingsModalCtrl);

	settingsModalCtrl.$inject = ['$uibModalInstance', 'enForumData', '$scope'];
	function settingsModalCtrl ( $uibModalInstance, enForumData, $scope) {
		var vm = this;


		//{id: 'choice1', name:'choice1'},{id:'choice2', name:'choice2'}
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


/*
		vm.showAddChoice = function(choice) {
			return choice.id === vm.checklist[vm.checklist.length -1].id;
		}

		vm.updateChecklist = function(id, criteria) {
			console.log("ID", id)
			console.log("Criteria", criteria)
			 vm.checklist[v.id] = v.criteria;
			 console.log("CHECKLIST UPDATE", vm.checklist)
		}
*/

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
			console.log("FORMDATA", vm.formData)
			enForumData.createForum({
				name : formData.name ,
				description : formData.description ,
				gradingMethod : formData.gradingMethod ,
				points : formData.gradeTotal ,
				peereval : formData.peerEvalToggle ,
				reflection : formData.reflectionToggle,
				reflectionChecklist : vm.checklist
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
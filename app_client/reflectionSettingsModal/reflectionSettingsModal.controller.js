(function () {
	angular
		.module('enforumApp')
		.controller('reflectionSettingsModalCtrl', reflectionSettingsModalCtrl);

	reflectionSettingsModalCtrl.$inject = ['$uibModalInstance']
	function reflectionSettingsModalCtrl ($uibModalInstance) {
		var vm = this;
		vm.data = {
			title: "lol"
		}
		vm.modal = {
			close: function(result) {
				$uibModalInstance.close(result);
			},
			cancel: function() {
				$uibModalInstance.dismiss('cancel');
			}
		};
	}
}) ();
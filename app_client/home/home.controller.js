(function () {
	angular
		.module('enforumApp')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$uibModal', 'enForumData', '$route'];
	function homeCtrl ($uibModal, enForumData, $route) {
		var vm = this;
		vm.pageHeader = {
			title: 'Enforum',
			strapline: 'The best forum on Earth!'
		};

		enForumData.retrieveForumList()
			.success(function(data) {
				vm.data = { forums: data };
			})
			.error(function(e) {
				console.log(e);
			});

		/* TEST SETTINGS */
		vm.popupSettings = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/settingsModal/settingsModal.view.html',
				controller: 'settingsModalCtrl as vm',
				windowClass: 'settings-modal'
			});
			modalInstance.result.then(function(data) {
				console.log("POPUP SETTING RESULT", data.settings)
				vm.data.forums.push(data)
			})
		};

		vm.editPopupSettings = function(editId) {
			console.log("EDIT POPUP SETTINGS START", editId)
			var modalInstance = $uibModal.open({
				templateUrl: '/editForumModal/editForumSettingsModal.view.html',
				controller: 'editForumSettingsModalCtrl as vm',
				windowClass: 'settings-modal',
				resolve: {
					editId: function() {return editId}
				}
			});
			//console.log("EDIT POPUP SETTINGS VARIABLE SET")
			modalInstance.result.then(function(data) {
				console.log("POPUP SETTING RESULT", data.settings)
				vm.data.forums.push(data)
			})
		};


		vm.deleteForum = function(formData) {
			//alert("Delete Forum Called")
			//alert(typeof(vm.formData))
			console.log("DELETE FORUM", formData)

			//BUILD VALIDATION HERE
			/*
			vm.formError = "";
			if(!vm.formData.id) {
				alert("No ID")
				vm.formError = "No ID.";
				return false;
			} else {
				alert("DeleteForum Function Success")
				vm.doDeleteForum(vm.formData);
			}
			*/
			vm.doDeleteForum(formData);
		}

		vm.doDeleteForum = function(formData) {
			//alert("Do Delete Forum Called")
			console.log("DO DELETE FORUM", formData)
			enForumData.deleteForum({
				id: formData
			})
			.success(function(data){
				//alert("Success- home.cont");
				//alert(JSON.stringify(data))
				$route.reload();
			})
			.error(function(e) {
				//alert("Fail- home.cont");
				console.log(e);
			})
		}

		/* ORIGINAL- REAL SETTINGS
		vm.popupSettings = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/settingsModal/settingsModal.view.html',
				controller: 'settingsModalCtrl as vm',
				windowClass: 'settings-modal'
			});
		};


		*/
	}
}) ();
(function () {
	angular
		.module('enforumApp')
		.controller('retrieveCtrl', retrieveCtrl);

	retrieveCtrl.$inject = ['$routeParams', 'enForumData', '$scope'];
	function retrieveCtrl ($routeParams, enForumData, $scope) {
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
			  * use returned data on page
			- Edit the service
			- Add a reply

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

	}
}) (); 
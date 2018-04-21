(function () {
	angular
		.module('enforumApp')
		.service('enForumData', enForumData);

	enForumData.$inject = ['$http'];
	function enForumData ($http) {
		var createForum = function(data) {
			return $http.post('/api/forum', data);
		};

		var retrieveForumList = function() {
			return $http.get('/api/forum/list')
		};

		var deleteForum = function(data) {
			return $http.post('/api/forum/delete', data);
		};

		var postCreate = function(data) {
			console.log("CREATE POST ENFORUMDATA SERVICE", data)
			return $http.post('/api/post/create', data);
		};

		var postListById = function(forumid) {
			console.log("POST LIST BY ID", forumid)
			return $http.get('/api/forums/' + forumid);
		};

		var updateForum = function(data) {
			console.log("ENFORUM DATA SERVICE UPDATE DATA", data)
			return $http.put('/api/forum/update/' + data.forumid, data)
		}

/*
		var forumSettingsById = function(forumid) {
			console.log("FORUM SETTINGS BY ID", forumid)
			return $http.get('/api/')
		}
*/

		return {
			createForum : createForum,
			retrieveForumList : retrieveForumList,
			deleteForum : deleteForum,
			postCreate : postCreate,
			postListById : postListById,
			updateForum : updateForum
		};
	}
})();
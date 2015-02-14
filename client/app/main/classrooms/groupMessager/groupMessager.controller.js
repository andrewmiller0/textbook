'use strict';

angular.module('textbookApp')
	.controller('GroupMessagerCtrl', function($scope, $state, $rootScope, Contact, Conversation) {
		$scope.body;
		$scope.to = [];
		$scope.term;
		$scope.results;

		// i don't know if this is a good thing to do but
		$scope.students = [];
		$scope.user.classrooms.forEach(function(classroom) {
			$scope.students.push(classroom.students);
		});
		$scope.students = _.flatten($scope.students);

		$scope.studentFilter = function(kid) {
			var condition = new RegExp($scope.term, 'i');
			return (condition.test(kid.firstName) || condition.test(kid.lastName));
		}
		$scope.setClass = function(classroom) {
			if (!classroom) {
				$scope.to = [];
				$scope.selectedClass = 'Select a Class'
			}
			else {
				$scope.selectedClass = classroom.name;
				$scope.to = _.flatten(_.pluck(classroom.students, 'contacts'));
			}
		}

		$scope.addToTo = function(addition) {
			if (!_.find($scope.to, {_id: addition._id})) {
				$scope.to.push(addition);
			}
		}
		$scope.removeFromTo = function(id) {
			_.remove($scope.to, {_id: id});
		}
		$scope.sendGroupMsg = function() {
			Conversation.sendMultiple({
				to: $scope.to,
				from: $scope.user.phone,
				message: $scope.body,
				userId: $scope.user._id
			});
			if ($state.params.contactId && _.find($scope.to, {_id: $state.params.contactId})) {
				// steve told me to do this, blame him
				$rootScope.$broadcast('group message', {body: $scope.body});
			}
			$scope.close();
			$scope.applySentAlert();
		};
	})
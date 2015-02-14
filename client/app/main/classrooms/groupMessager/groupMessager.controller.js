'use strict';

angular.module('textbookApp')
	.controller('GroupMessagerCtrl', function($scope, $state, $rootScope, Contact, Conversation) {
		$scope.body;
		$scope.to = [];
		$scope.term;
		$scope.results;
		$scope.message = {
			to: [],
			from: $scope.user.phone,
			userId: $scope.user._id
		}

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
			console.log(classroom.students);
			if (!classroom) {
				$scope.message.to = [];
				$scope.selectedClass = 'Select a Class'
			}
			else {
				$scope.selectedClass = classroom.name;
				$scope.message.to = _.filter(_.flatten(_.pluck(classroom.students, 'contacts')), {primary: true});
			}
		}

		$scope.addToTo = function(addition) {
			if (!_.find($scope.message.to, {_id: addition._id})) {
				$scope.message.to.push(addition);
			}
		}
		$scope.removeFromTo = function(num) {
			_.pull($scope.message.to, num);
		}

		$scope.sendGroupMsg = function() {
			Conversation.sendMultiple($scope.message);
			if ($state.params.contactId && _.find($scope.to, {_id: $state.params.contactId})) {
				// steve told me to do this, blame him
				$rootScope.$broadcast('group message', {body: $scope.body});
			}
			$scope.close();
			$scope.applySentAlert();
		};

		$scope.setAmPm = function() {
			$scope.amPm === "AM" ? $scope.amPm = "PM" : $scope.amPm = "AM";
		}

		$scope.scheduleMsg = function() {
			SchedMsg.create({
				to: $scope.to,
				from: $scope.user.phone,
				message: $scope.body,
				userId: $scope.user._id,

			});
		}
	})
'use strict';

angular.module('textbookApp')
	.controller('GroupMessagerCtrl', function($scope, $state, $rootScope, Contact, Conversation, SchedMsg) {
		$scope.term;
		// some defaults
		$scope.results;
		$scope.message = {
			to: [],
			from: $scope.user.phone,
			userId: $scope.user._id
		};
		$scope.dt = $scope.minDate = new Date();
		$scope.amPm = "PM";
		$scope.hours = "5";
		$scope.minutes = "00";

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
			if ($state.params.contactId && _.find($scope.message.to, {_id: $state.params.contactId})) {
				// steve told me to do this, blame him
				$rootScope.$broadcast('group message', {body: $scope.message.body});
			}
			$scope.close();
			$scope.applySentAlert();
		};

		$scope.setAmPm = function() {
			$scope.amPm == "AM" ? $scope.amPm = "PM" : $scope.amPm = "AM";
		}

		$scope.scheduleMsg = function() {
			var hours = parseInt($scope.hours);
			var minutes = parseInt($scope.minutes);
			if ($scope.amPm == "PM") {
				hours += 12;
			}
			else if ($scope.hours == 12) {
				hours = 0;
			}
			if (isNaN(hours) || isNaN(minutes) || hours > 23 || hours < 1 || minutes > 59 || minutes < 0) {
				return $scope.timeError = true;
			}
			$scope.dt.setHours(hours);
			$scope.dt.setMinutes(minutes);
			if (new Date() > $scope.dt) {
				console.log("is this the thing we're hitting");
				return $scope.timeError = true;
			}
			SchedMsg.save({
				to: $scope.message.to,
				from: $scope.user.phone,
				body: $scope.message.body,
				userId: $scope.user._id,
				date: $scope.dt
			});
			$scope.close();
			$scope.applyScheduledAlert();
		}
	})
'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $state, Auth, Classroom, User, $http, newClass) {
    $scope.user = Auth.getCurrentUser();
    $scope.file = {};
    $scope.error = {};
    $scope.addClassroom = function() {
      $scope.addFormSubmit = true;
      if($scope.addClassForm.$valid) {
        Classroom.save($scope.classroom, function(classroom) {
          var newClassroom = classroom.toJSON();
          $scope.user.classrooms.push(classroom);
          Auth.updateUser($scope.user);
          User.getUnpopulated({id: $scope.user._id}, function(user) {
            user.classrooms.push(classroom._id);
            User.update(user);
          });
          $scope.addFormSubmit = false;
          newClass.set(true);
          $state.go('classrooms.edit', {classId: classroom._id});
        });
      }
    };
    $scope.uploadFile = function() {
          var reader = new FileReader();
          var name = $scope.file.name;
          var json = [];
          var csv;
          reader.onload = function(e) {
            var data = e.target.result;
            if(name.indexOf('.xlsx') > -1) {
              console.log('this is a xlsx');
              var workbook = XLSX.read(data, {type:'binary'});
              console.log(typeof workbook);
              json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
              console.log(json);
            } else if(name.indexOf('.xls') > -1) {
              console.log('this is xls');
              var workbook = XLS.read(data, {type:'binary'});
              json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
              console.log(json);
            } else if (name.indexOf('.csv') > -1) {
              console.log('this is a csv');
              csv = data;
              var result = Papa.parse(csv);
              var columns = result.data.shift()
              result.data.forEach(function(student) {
                var studentObj = {};
                student.forEach(function(val, i) {
                  studentObj[columns[i]] = val;
                });
                json.push(studentObj);
              });
            } else {
              $scope.error.message = true;
              $scope.$apply();
              return;
            }
            $scope.studentRoster = json;
            $state.go('.studentRoster');
      };
      reader.readAsBinaryString($scope.file);
    };
  });

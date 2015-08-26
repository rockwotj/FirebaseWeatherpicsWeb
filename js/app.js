(function() {
  var app = angular.module("weatherpicsApp", ["ui.bootstrap", "modalControllers", "firebase"]);
  
  app.controller("WeatherpicsController", ['$modal', '$firebaseArray', function($modal, $firebaseArray) {
    var weatherpicsRef = new Firebase("https://<YOUR-USERNAME-HERE>-weatherpics.firebaseio.com/weatherpics");
    this.pics = $firebaseArray(weatherpicsRef);

    var weatherpicsController = this;

    var compare = function(a, b) {
      return a.$id < b.$id;
    };
    this.pics.$watch(function() { weatherpicsController.pics.sort(compare); });

    this.navbarCollapsed = true;
    
    this.showInsertPicDialog = function(selectedPic) {
      this.navbarCollapsed = true;
      
      var modalInstance = $modal.open({
        templateUrl: "/partials/insert_pic_modal.html",
        controller: "InsertModalController",
        controllerAs: "insertModalCtrl",
        resolve: {
          picInModal: function () {
            return selectedPic;
          },
          updatePic: function () {
            return weatherpicsController.pics.$save;
          }
        }
      });

      modalInstance.result.then(function (weatherpicFromModal) {
        if (!selectedPic) {
          weatherpicsController.pics.$add(weatherpicFromModal);
        } else {
          weatherpicsController.pics.$save(weatherpicFromModal);
        }
        weatherpicsController.isEditing = false;
      });
    };

    this.showDeletePicDialog = function(selectedPic) {
      var modalInstance = $modal.open({
        templateUrl: "/partials/delete_pic_modal.html",
        controller: "DeleteModalController",
        controllerAs: "deleteModalCtrl",
        resolve: {
          picInModal: function () {
            return selectedPic;
          }
        }
      });

      modalInstance.result.then(function () {
        weatherpicsController.pics.$remove(selectedPic);
        weatherpicsController.isEditing = false;
      });
    };
  }]);
 
})();

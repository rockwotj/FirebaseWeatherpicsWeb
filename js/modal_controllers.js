(function() {
  var app = angular.module("modalControllers", [ "ui.bootstrap" ]);

  app.controller("InsertModalController", ['$modalInstance', '$timeout', 'picInModal', 'updatePic', function($modalInstance, $timeout, picInModal, updatePic) {
    this.isNewPic = (picInModal === undefined);
    this.picInModal = picInModal || {imageUrl:"", caption:""};

    this.insertPic = function() {
      $modalInstance.close(this.picInModal);
    };

    this.updatePic = function() {
      if (!this.isNewPic) {
        updatePic(this.picInModal);
      }
    };

    // Add comment
    $modalInstance.opened.then(function() {
      $timeout(function() {
        document.querySelector("#image-url-input").focus();
      }, 100);
    });

    this.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }]);
  
  app.controller("DeleteModalController", ['$modalInstance', 'picInModal', function($modalInstance, picInModal) {
    this.deletePic = function() {
      $modalInstance.close();
    };

    this.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }]);
  
  
})();

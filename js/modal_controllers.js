(function() {
  var app = angular.module("modalControllers", [ "ui.bootstrap" ]);

  app.controller("InsertModalController", function($modalInstance, $timeout, picInModal) {
    this.isNewPic = (picInModal == undefined); // Used in html, not here.
    picInModal = picInModal || {};
    this.imageUrl = picInModal.image_url || "";
    this.caption = picInModal.caption || "";

    this.insertPic = function() {
      picInModal.image_url = this.imageUrl;
      picInModal.caption = this.caption;
      $modalInstance.close(picInModal);
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
  });
  
  app.controller("DeleteModalController", function($modalInstance, picInModal) {
    this.deletePic = function() {
      $modalInstance.close();
    };

    this.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
  
  
})();
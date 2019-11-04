'use strict';
(function () {
  var EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

  var fileChooser = document.querySelector('.img-upload__input');
  var uploadedImageContainer = document.querySelector('.img-upload__preview');
  var uploadedImage = uploadedImageContainer.querySelector('img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = EXTENSIONS.some(function (element) {
        return fileName.endsWith(element);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          uploadedImage.src = reader.result;
        });

        reader.readAsDataURL(file);
      } else {
        window.message.error();
      }
    }
  });
})();

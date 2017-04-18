/*
 * Jquery wrapper plugin that calls and uses the Image Pro prototype
 */
(function($) {
    $.fn.modifyImage = function() {
        $(document).ready(function () {
            // get an instance of imagePro prototype
            var image = new ImagePro();

            // Set the canvas
            image.setCanvas($('#canvas'));

            // Identify when a user adds / changes an image
            $('#image').change(function (e) {
                // set the image file
                image.setFile(e.target.files[0]);
                // set the image to canvas
                image.setImage();
            });

            // Identifiy when user has clicked to generate an image
            $('#generate').on('click', function (e) {
                // Check to see if width and height are set, if not set defaults
                var width = (parseInt($('#width').val()) > 0) ?  parseInt($('#width').val()) : 100;
                var height = (parseInt($('#height').val()) > 0) ?  parseInt($('#height').val()) : 100;

                // Set the height and width
                image.setHeight(height);
                image.setWidth(width);

                // Call resize
                image.resize();

                // set the type
                image.setType($('#type').val());

                // get the image src
                var imageSrc = image.getImageSrc();

                // set the image src
                $('#image_container').attr('src', imageSrc);
            });


        });
    }
})(jQuery);

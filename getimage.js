/**
 * Image Prototype
 * @constructor
 */
function ImagePro(){}
// Default Values for class variables
ImagePro.height = 100;
ImagePro.width  = 100;
ImagePro.type   = 'image/jpeg';
ImagePro.image = null;

/**
 * Set the file
 *
 * @param file imgFile
 */
ImagePro.prototype.setFile = function(file) {
	ImagePro.file = file;
}

/**
 * Set the height
 *
 * @param height int
 */
ImagePro.prototype.setHeight = function(height) {
	ImagePro.height = height;
}

/**
 * Set the width
 *
 * @param width int
 */
ImagePro.prototype.setWidth = function(width) {
	ImagePro.width = width;
}

/**
 * Set the type
 *
 * @param type string
 */
ImagePro.prototype.setType = function(type) {
	ImagePro.type = type;
}

/**
 * Set the canvas
 *
 * @param canvas Element
 */
ImagePro.prototype.setCanvas = function(canvas) {
	ImagePro.canvas = canvas;
}

ImagePro.prototype.setDestinationId = function(destinationId) {
	ImagePro.destinationId = destinationId;
}


/**
 * Gets the image src
 *
 * @returns string
 */
ImagePro.prototype.getImageSrc = function() {
	// checks to see if a canvas is set and converts canvas to image type.
	if(ImagePro.canvas) {
		// returns base64 encoded image src
		return ImagePro.canvas.toDataURL(ImagePro.type);
	} else {
		// returns an alert to say image is not set
		alert('No Image has been set');
	}
}

/**
 * Resize the image
 */
ImagePro.prototype.resize = function() {
	// Checks to see if a canvas is set
	if(ImagePro.canvas) {
		//Sets the canvas height
		ImagePro.canvas.height = ImagePro.height;
		ImagePro.canvas.width = ImagePro.width;

		// gets the context of the canvas
		ctx = ImagePro.canvas.getContext('2d');
		// Resizes the context
		ctx.width = ImagePro.width;
		ctx.height = ImagePro.height;
		// Draws the context back to canvas
		ctx.drawImage(ImagePro.image, 0, 0, ImagePro.image.width, ImagePro.image.height, 0, 0, ImagePro.width, ImagePro.height);
	} else {
		// Alerts to say no image is set
		alert('No Image has been set');
	}
}

/**
 * Set the image
 */
ImagePro.prototype.setImage = function() {
	// gets an instance of file reader (html5 inpult class?)
	var reader = new FileReader();
	// Calls the onload function
	reader.onload = function(e) {
		// gets an instance of new image class
		ImagePro.image = new Image();
		// Calls the onload function
		ImagePro.image.onload = function () {
			// copy the canvas for use in function
			var canvas = ImagePro.canvas;
			// sets the height and width of the canvas
			canvas[0].width = ImagePro.width;
			canvas[0].height = ImagePro.height;
			// gets the context for drawing
			var context = canvas[0].getContext('2d');
			// Draws the image to canvas
			context.drawImage(ImagePro.image, 0, 0, ImagePro.image.width, ImagePro.image.height, 0, 0, ImagePro.width, ImagePro.height);
			// set the canvas as the canvas drawn
			ImagePro.canvas = canvas[0];
		}
		// sets the src of the new created image object
		ImagePro.image.src = e.target.result;
	}
	//gets a base 64 encode of the uploaded file.
	reader.readAsDataURL(ImagePro.file);
}


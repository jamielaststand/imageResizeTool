<?php

/**
 * Abstract factory class for creating classes
 *
 * @author Jamie Greenway
 * @copyright Copyright (c) 2015,
 */
class AbstractFactory
{
	/**
	 * make
	 * @param $className sting
	 * @param $params array
	 * @return object
	 */
	public static function make($className, array $params = array()) {
		return new $className(...$params);
	}
}

/**
 * image class
 *
 * @author Jamie Greenway
 * @copyright Copyright (c) 2015,
 */
class Image {

	protected $image = null;

	/**
	 * __construct
	 * @param $filename sting
	 */
	function __construct($filename){
		// get the image and store in property
		$this->image = imagecreatefromjpeg($filename);
	}
	/**
	 * doResize
	 * change size and reset image
	 * @param $width integer
	 * @param $height integer
	 */
	public function doResize($width, $height) {
		//get a new image with passed width and height
		$newImage = imagecreatetruecolor($width, $height);
		// copy and resize the image
		imagecopyresized($newImage, $this->image, 0, 0, 0, 0, $width, $height, imagesx($this->image), imagesy($this->image));
		// destroy the old image
		imagedestroy($this->image);
		// set the new image
		$this->image = $newImage;
	}


	/**
	 * generateImageByType
	 * @param $type string
	 * @return string
	 */
	public function generateImageByType($type) {
		ob_start();
		switch($type) {
			case "image/jpeg":
				 imagejpeg($this->image);
			break;
			case "image/png":
				 imagepng($this->image);
			break;
			case "image/gif":
				 imagegif($this->image);
			break;
			default:
				ob_get_clean();
				return 'Unsupported format provided';
		}
		return ob_get_clean();
	}

}

/**
 * ImageFacade class
 *
 * @author Jamie Greenway
 * @copyright Copyright (c) 2015,
 */
class ImageFacade
{
	/**
	 * @param $filename string
	 * @param $width integer
	 * @param $height
	 * @param string $format
	 * @return string Binary
	 */
	public function resizeImage($filename, $width, $height, $format)
	{
		// call the factory to set the class
		$imageClass = AbstractFactory::make(Image::class,array($filename));
		// resize the image.
		$imageClass->doResize($width, $height);

		// return the image string
		return $imageClass->generateImageByType($format);
	}

}

// Testing // ###################################################################################

$formats = ['image/jpeg', 'image/gif', 'image/png']; // Image Formats
$sizes = [[100, 100], [300, 100], [100, 300], [250, 250], [300, 25]]; // Image Dimensions
$filename = 'image.jpg'; // Source Image Filename

// Create the Image Facade Instance
/** @var $img_facade ImageFacade */
$facade = AbstractFactory::make(ImageFacade::class);

// Loop through each Format and Size and output the image as a Base64 Image
foreach ($formats as $format) {
	echo '<h1>' . $format . '</h1>';
	foreach ($sizes as $size) {
		$src = $facade->resizeImage($filename, $size[0], $size[1], $format);
		echo '<img src="data:' . $format . ';base64,' . base64_encode($src) . '" style="background-image:#FF0000;"/>';
	}
}

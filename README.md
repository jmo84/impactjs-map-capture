MapCapture plugin for ImpactJS by Jesse Oliveira

This is a plugin for games that use ImpactJS. It converts an entire level map to a single image.

It works by moving the camera across the entire map and drawing each screen to a separate canvas.

Even though it's designed to be a simple plugin, it has a few options that let you control how it works.

The options can be passed as an object to MapCapture's constructor. They are:

	* inputCanvas: Optional string ID for a canvas, or a canvas element instance. Default is 'canvas' 
	* outputCanvas: Optional canvas to draw to. Will be created for you if not supplied
	* map: Optional map that defines the output's dimensions. Will use collision map size if not supplied
	* sourceWidth: Optional width of copying. Defaults to input canvas width
	* sourceHeight: Optional height of copying. Defaults to input canvas height

It has 2 methods

	* capture: Draws the map onto the output canvas
	* getData: Returns the data URI string from the output canvas. Log this to the console or use it as
					a link's destination. It contains the entire map as a png image.
	
Tip: If your game controls are on the bottom of the canvas, use a smaller sourceHeight to not copy them.
	  For example, if the game controls are 80 pixels high, and your canvas is 480, use 400 for sourceHeight.

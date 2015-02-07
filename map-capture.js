ig.module( 
	'plugins.map-capture' 
)
.requires(
	'impact.game'
)
.defines(function(){

	MapCapture = ig.Class.extend({
		
		/**
		 * captureOptions:
		 * inputCanvas: A string ID for a canvas, or a canvas element instance
		 * outputCanvas: Optional canvas to draw on. Will be created for you if not supplied
		 * map: Optional map that defines image dimensions. Will be collision map if not supplied
		 * sourceWidth: Optional width of copying. Defaults to input canvas width
		 * sourceHeight: Optional height of copying. Defaults to input canvas height
		 */
		init: function(captureOptions) {

			var options = captureOptions || {};
			
			this.inputCanvas = options.inputCanvas;
			if (!this.inputCanvas || (typeof this.inputCanvas == 'string')) {
				this.inputCanvas = (document.getElementById(this.inputCanvas || 'canvas'));
			}
			
			if (!(this.inputCanvas instanceof HTMLCanvasElement)) {
				throw new Error("Input canvas invalid");
			}
			
			this.map = options.map || ig.game.collisionMap;
			if (!this.map || !(this.map instanceof ig.Map)) {
				throw new Error("Map invalid");
			}
			
			this.outputWidth = this.map.width * this.map.tilesize;
			this.outputHeight = this.map.height * this.map.tilesize;            			
			
			if (options.outputCanvas && typeof options.outputCanvas.getContext === 'function') {
				this.outputCanvas = options.outputCanvas;
			} else {
				this.outputCanvas = document.createElement('canvas');
				this.outputCanvas.setAttribute('width', this.outputWidth);
				this.outputCanvas.setAttribute('height', this.outputHeight);				
			}
			
			if (!isNaN(options.sourceWidth)) {
				this.sourceWidth = options.sourceWidth;
			} else {
				this.sourceWidth = this.inputCanvas.clientWidth;
			}
			
			if (!isNaN(options.sourceHeight)) {
				this.sourceHeight = options.sourceHeight;
			} else {
				this.sourceHeight = this.inputCanvas.clientHeight;
			}
		
			this.outputContext = this.outputCanvas.getContext('2d');
		},
		
		capture: function() {
			var sx = 0, // source X
			 sy = 0, // source Y
			 sh = this.sourceHeight, // source height
			 sw = this.sourceWidth, // source width
			 dw = sw, // destination width
			 dh = sh, // destination height
			 dx = 0, // destination X
			 dy = 0, // destination Y
			 oldScreenX = ig.game.screen.x, // used to restore screen position (x)
			 oldScreenY = ig.game.screen.y; // used to restore screen position (y)
			
			ig.game.screen.y = 0;
			
			do {
				
				ig.game.screen.x = 0;
				dx = 0;
				
				do {
					ig.game.draw();
					this.outputContext.drawImage(this.inputCanvas, sx, sy, sw, sh, dx, dy, dw, dh);
					dx += sw;
					ig.game.screen.x += sw;					
				} while (dx < this.outputWidth);
			
				dy += sh;
				ig.game.screen.y += sh;
				
			} while (dy < this.outputHeight)
			
			ig.game.screen.x = oldScreenX;
			ig.game.screen.y = oldScreenY;
			
		},
		
		getData: function() {
			return this.outputCanvas.toDataURL();
		}
			
	});

});
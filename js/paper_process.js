        var garbo=[];
        var multi = 64 * 64;
        var raster = new Raster('garbo');
        var colorThief = new ColorThief();
        var pal = [];
        var im = new Image;
        var brown = [];
        var app = $('#garbo').attr('src');
        im.src = app;
        pal = colorThief.getPalette(im, 5);
        raster.visible = false;

// The size of our grid cells:
        var gridSize = 12;

// Space the cells by 120%:
        var spacing = 1.2;

        var distance = '';
        var min = 0.0;
        var max = 0.0;
        var count = 0;
        var w = 0;
// As the web is asynchronous, we need to wait for the raster to load
// before we can perform any operation on its pixels.
         raster.on('load', function () {
             // Since the example image we're using is much too large,
             // and therefore has way too many pixels, lets downsize it to
             // 40 pixels wide and 30 pixels high:
             raster.size = new Size(64, 64);
             var i = 0;
             for (var y = 0; y < raster.height; y++) {
                 for (var x = 0; x < raster.width; x++) {
                     // Get the color of the pixel:
                     var color = raster.getPixel(x, y);


                     // Create a circle shaped path:
                     var path = new Path.Circle({
                         center: new Point(x, y) * gridSize,
                         radius: gridSize / 2 / spacing
                     });

                     // Set the fill color of the path to the color
                     // of the pixel:
                     var red = color['red'];
                     var green = color['green'];
                     var blue = color['blue'];

                     path.fillColor = color;

                     var momo = $.colorspaces.make_color('sRGB', [red, green, blue]).as('hex');
                     var colorz = hexToRgb(momo);
                     var ko = 0;
                     distance = 0;
                     for (var mx = 0; mx < pal.length; mx++) {
                         brown = pal[mx];
                         ko = Math.sqrt(Math.pow((colorz.r - brown[0]), 2) + Math.pow((colorz.g - brown[1]), 2) + Math.pow((colorz.b - brown[2]), 2));
                         ko = ko / Math.pow(10, mx);
                         distance += ko;

                     }
                     w = 1;
                     if (i == 0) {
                         min = distance;
                         max = distance;
                     }
                     if (distance < min) {
                         min = distance;
                     }
                     if (distance > max) {
                         max = distance;
                     }
                     if (distance <= 100) {
                         count++;
                     }
                     i++;
                 }
             }
             var perc = (count / multi) * 100;
             var kood = 0;
             if (perc < 90) {
                 kood = 1;
             }


             // Move the active layer to the center of the view, so all
             // the created paths in it appear centered.
             project.activeLayer.position = view.center;

             console.log(min);
             console.log(max);
             console.log(perc);
             console.log(kood);
             var raju = '';
             if (kood == 1) {
                 raju = 'Garbage Found!';
             }
             else {
                 raju = 'Nothing Found!';
             }
             var text = new PointText({
                 point: [250, 250],
                 content: raju,
                 fillColor: 'red',
                 fontFamily: 'Courier New',
                 fontWeight: 'bold',
                 fontSize: 50
             })
         });
       /*
             var text = new PointText({
                 point: [250, 100],
                 content: min,
                 fillColor: 'red',
                 fontFamily: 'Courier New',
                 fontWeight: 'bold',
                 fontSize: 50
             });

             var text = new PointText({
                 point: [250, 150],
                 content: max,
                 fillColor: 'red',
                 fontFamily: 'Courier New',
                 fontWeight: 'bold',
                 fontSize: 50
             });


            perc=Math.round(perc);var garb=Math.round((100-perc));

             var text = new PointText({
                 point: [0, 200],
                 content: 'Soil Percentage:'+perc+'%',
                 fillColor: 'red',
                 fontFamily: 'Courier New',
                 fontWeight: 'bold',
                 fontSize: 50
             });

             if(kood==1) {
                 var text = new PointText({
                     point: [30, 300],
                     content: 'Garbage Percentage: ' + (100 - perc) + '%',
                     fillColor: 'red',
                     fontFamily: 'Courier New',
                     fontWeight: 'bold',
                     fontSize: 50
                 });
             }
        });
        */




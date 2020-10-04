var wwd = new WorldWind.WorldWindow("canvasOne");

           wwd.addLayer(new WorldWind.BMNGOneImageLayer());
           wwd.addLayer(new WorldWind.BMNGLandsatLayer());

           //wwd.addLayer(new WorldWind.CompassLayer());
           wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
           //wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
            
           var polygonLayer = new WorldWind.RenderableLayer();
            var polygonLayer = new WorldWind.RenderableLayer();
            wwd.addLayer(polygonLayer);

            var polygonAttributes = new WorldWind.ShapeAttributes(null);
            polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);
            polygonAttributes.outlineColor = WorldWind.Color.BLUE;
            polygonAttributes.drawOutline = true;
            polygonAttributes.applyLighting = true;

            var boundaries = [];
            boundaries.push(new WorldWind.Position(20.0, -75.0, 700000.0));
            boundaries.push(new WorldWind.Position(25.0, -85.0, 700000.0));
            boundaries.push(new WorldWind.Position(20.0, -95.0, 700000.0));

            var polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
            polygon.extrude = true;
            //polygonLayer.addRenderable(polygon);
            
            
            class Mark {constructor(){
            this.placemarkLayer = new WorldWind.RenderableLayer();
            wwd.addLayer(this.placemarkLayer);
            

            this.placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

            this.placemarkAttributes.imageOffset = new WorldWind.Offset(
                WorldWind.OFFSET_FRACTION, 0.3,
                WorldWind.OFFSET_FRACTION, 0.0);

            this.placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                WorldWind.OFFSET_FRACTION, 0.5,
                WorldWind.OFFSET_FRACTION, 1.0);

            this.placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";
            }
                        
            placeMark(pLat,pLon,pAlt,pName){
            var position = new WorldWind.Position(pLat,pLon,pAlt);
            var placemark = new WorldWind.Placemark(position, false, this.placemarkAttributes);

            placemark.label = pName +"\n" +
                "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
                "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.alwaysOnTop = true;

            this.placemarkLayer.addRenderable(placemark);
            }}
            
            
            
            mark = new Mark();
            //mark.placeMark(40,-106,100,"Test");
            //mark.placeMark(30,-106,100,"Test2");

            

            
        
            // Add WMS imagery            
            class Layer{
            constructor(){
            this.serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
            }
            addCustomLayer(pLayerName)

            {var createLayer = function (xmlDom) {
                var wms = new WorldWind.WmsCapabilities(xmlDom);
                var wmsLayerCapabilities = wms.getNamedLayer(pLayerName);
                var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
                var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
                wwd.addLayer(wmsLayer);
                };

            var logError = function (jqXhr, text, exception) {
                console.log("There was a failure retrieving the capabilities document: " +text +" exception: " + exception);
                };
                 

            $.get(this.serviceAddress).done(createLayer).fail(logError);   
            }
            }
            

            

            
            layers= new Layer();
            //layers.addCustomLayer("MOD_LSTD_CLIM_M");
            //layers.addCustomLayer("GEBCO_BATHY");
            
            
            
            
            
            
            
           let xhr = new XMLHttpRequest();
                xhr.open('GET', "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0", true);
                xhr.send();
                xhr.onreadystatechange = processRequest;

                function processRequest(e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
 
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(response, "text/xml");
                    
                    var rootElement = xmlDoc.documentElement;
                    rootElement = rootElement.getElementsByTagName("Capability")[0];

                    rootElement = rootElement.getElementsByTagName("Layer")[0];

                    var txt="";
                    var array = [[]]; 
                    
                    for (var i=9; i<rootElement.childNodes.length; i++){
                    element = rootElement.childNodes;
                    
                        if (element[i].nodeName=="Layer"){
                        //txt += element[i].nodeName;
                       // txt+=element[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
                       // array.push(1)
    
                            for (var j=0; j<element[i].childNodes.length; j++){
                            elem=element[i].childNodes; 
                           // alert(elem[5].nodeName);
                                if (elem[j].nodeName=="Layer"){
                                    //alert(1);
                                    txt+=elem[j].getElementsByTagName("Title")[0].childNodes[0].nodeValue+"\n";
                                    //txt+=elem[j].getElementsByTagName("Dimension")[0].childNodes[0].nodeValue+"\n";
                                    txt+=elem[j].getElementsByTagName("Name")[0].childNodes[0].nodeValue+"\n";
                                    
                         //           array.push(2);
                                    array.push(elem[j].getElementsByTagName("Title")[0].childNodes[0].nodeValue+"\n",elem[j].getElementsByTagName("Name")[0].childNodes[0].nodeValue+"\n");
                                }
                                
                            }
                    
                    }

                    
                    }
                    alert(txt);
                    
                    
                    
                }
                }
            

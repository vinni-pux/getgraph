(function (global) {
  "use strict";
  
  function el(id) {
    return document.getElementById(id);
  }
  
  function Chart() {
    this.stage = new Kinetic.Stage({
      width: 400,
      height: 400,
      container: 'container-graph',
    });
    this.layer = new Kinetic.Layer({
      width: 400,
      height: 400,
      y: this.stage.height()/2,
      x: this.stage.width()*0.1,
      scaleY: -1
      
    });
    this.stage.add(this.layer);
    
  }
  
  Chart.prototype = (function () {
    // private member
    var browser = "Mobile Webkit";
    // public prototype members
    return {
      getBrowser: function () {
        return browser;
      },
      
      drawBar: function (data) {
        var self = this;
        var len = data.length, 
            max = 0, 
            min = 0,
            rangeY,
            rangeX;
            
            
        var customShape = new Kinetic.Shape({
          x: 5,
          y: 20,
          fill: 'white',
          stroke: '#7cb5ec',
          strokeWidth: 2,
          strokeScaleEnabled: false,
  // a Kinetic.Canvas renderer is passed into the drawFunc function
          drawFunc: function(context) {
            context.beginPath();
            context.moveTo(10,10);
            context.lineTo(70,10);
            context.lineTo(70,35);
            context.lineTo(43,35);
            context.lineTo(40,40);
            context.lineTo(37,35);
            context.lineTo(10,35);
            context.lineTo(10,10);
            context.stroke();
            context.fillStrokeShape(this);
          }
        });
        
        var textVal = new Kinetic.Text({
          x: 10,
          y: 12,
          text: "text",
          fill: "black",
          fontSize: 6
        });
        
        var hintGr = new Kinetic.Group({
          scaleX: 1/this.layer.scaleX(),
          scaleY: 1/this.layer.scaleY()
        });
          
        
        
        hintGr.add(customShape);
        hintGr.add(textVal);
        self.layer.add(hintGr);
        
        
        for (var i = 0; i < len; i++) {
          var bar = data[i];
          if (max < bar["val"]) {
            max = bar["val"];
          }
          if (min > bar["val"]) {
            min = bar["val"];
          }
          
          var rect = new Kinetic.Rect({
            x: i*20,
            y: 0,
            width: 20,
            fill: "#7cb5ec",
            stroke: "#fff",
            strokeScaleEnabled: false,
            height: bar["val"]
          });
          
          rect.on("mouseover", function() {
            this.fill("#95ceff");
            var dy = 35;
            if (this.height() < 0) {
              hintGr.scaleY(-Math.abs(hintGr.scaleY()));
              hintGr.offsetY(22);
              dy = 55;
            } else {
              hintGr.scaleY(Math.abs(hintGr.scaleY()));
              hintGr.offsetY(0);
            }
            textVal.text(this.height());
            
            
            var tween = new Kinetic.Tween({
              node: hintGr, 
              duration: 0.3,
              
              x: this.x() + this.width()/2 - 60/self.layer.scaleX(),
              y: this.y() + this.height() + dy/self.layer.scaleY(),
            });
            
            tween.play();
          });
          
          rect.on("mouseout", function() {
            this.fill("#7cb5ec");
            self.layer.batchDraw();
          });
          
          self.layer.add(rect);
          
        }
        rangeY = Math.abs(min - max);
        rangeX = i*20;
        

        //console.log(self.layer.height());
        self.layer.scaleY(-0.7*self.layer.height()/rangeY);
        self.layer.scaleX(0.8*self.layer.width()/rangeX);
        customShape.scaleX(1/self.layer.scaleX());
        customShape.scaleY(1/self.layer.scaleY());

        
        //self.layer.add(customShape);
        self.layer.batchDraw();
      },
      
      clear: function() {
        this.layer.destroyChildren();
        this.layer.batchDraw();
      }
      
    };
  }());
  
  
  global.Chart = function() {
    return new Chart();
  }
}(this));

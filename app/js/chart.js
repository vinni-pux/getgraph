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
        //this.layer;
        /*var data = [
          {"cat": "One", "val": 20},
          {"cat": "Two", "val": 10},
          {"cat": "Three", "val": -30},
          {"cat": "Four", "val": 40},
          
        ];*/
        var self = this;
        var len = data.length, 
            max = 0, 
            min = 0,
            rangeY,
            rangeX;
        
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
            self.layer.batchDraw();
          });
          
          rect.on("mouseout", function() {
            this.fill("#7cb5ec");
            self.layer.batchDraw();
          });
          
          self.layer.add(rect);
          
        }
        rangeY = Math.abs(min - max);
        rangeX = i*20;
        
        var customShape = new Kinetic.Shape({
          x: 5,
          y: 10,
          fill: 'red',
  // a Kinetic.Canvas renderer is passed into the drawFunc function
          drawFunc: function(context) {
            context.beginPath();
            context.moveTo(10,10);
            context.lineTo(40,10);
            context.lineTo(40,20);
            context.lineTo(28,20);
            context.lineTo(25,23);
            context.lineTo(22,20);
            context.lineTo(10,20);
            context.lineTo(10,10);
            context.stroke();
            context.fillStrokeShape(this);
          }
        });
        self.layer.add(customShape);
        //console.log(self.layer.height());
        self.layer.scaleY(-0.8*self.layer.height()/rangeY);
        self.layer.scaleX(0.8*self.layer.width()/rangeX);
        console.log(self.layer.scaleX());
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
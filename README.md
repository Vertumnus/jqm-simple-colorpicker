# Simple Colorpicker Widget

[![npm](https://img.shields.io/npm/dt/jqm-simple-colorpicker.svg)](https://www.npmjs.com/package/jqm-simple-colorpicker)
[![npm](https://img.shields.io/npm/v/jqm-simple-colorpicker.svg)](https://www.npmjs.com/package/jqm-simple-colorpicker)
[![npm](https://img.shields.io/npm/l/jqm-simple-colorpicker.svg)](https://www.npmjs.com/package/jqm-simple-colorpicker)

This is a widget for jQuery mobile. It is an extension of the [popup widget](http://api.jquerymobile.com/popup/) 
and supplies three range sliders to specify a red, green and blue value. 
The resulting color is shown in front of the popup.

## Preconditions
The widget is implemented in ECMAScript 2015, so your project should support
at least this version.
To use the widget of course you need also [jQuery](http://jquery.com) and [jQuery Mobile](http://jquerymobile.com).

## Installation
Installation via npm:
```shell
npm install jqm-simple-colorpicker
```

Download built files:
* [jqm-simple-colorpicker.min.css](./bin/jqm-simple-colorpicker.min.css)
* [jqm-simple-colorpicker.min.js](./bin/jqm-simple-colorpicker.min.js)

## Integration
Link the CSS file nearby to your other CSS files in the header section of your HTML file:
```html
<link rel="stylesheet" href="stylesheets/jqm-simple-colorpicker.min.css">
```

Include the JS file right after jQuery JS file and jQuery mobile JS file:
```html
<script src="javascripts/jquery.min.js"></script>
<script src="javascripts/jquery.mobile.min.js"></script>
<script src="javascripts/jqm-simple-colorpicker.min.js"></script>
```

## Usage
### Definition in your HTML file
Create the colorpicker popup by adding the `data-role="colorpicker"` attribute to a div:
```html
<div id="picker" data-role="colorpicker"></div>
```

You can use also all the attributes of the [popup widget](http://api.jquerymobile.com/popup/).

### Options
Beside the options of the popup widget, you have following options.

#### defaultColor
__Type:__ String

__Default:__ `'#000000'`

You can specify a default color before opening the color picker.
```js
// set default color to red
$('#picker').colorpicker('option', 'defaultColor', '#ff0000')
```

#### redText, greenText, blueText
__Type:__ String

__Default:__ `'Red'`, `'Green'`, `'Blue'`

With these three options you can specify the labels for the three colors. 
Maybe in the language you want to provide to your user. Per default the picker uses english labels.
```js
// change the labels to german
$('#picker').colorpicker('option', {
   redText: 'Rot',
   greenText: 'Grün',
   blueText: 'Blau'
})
```

### Methods
Beside the methods of the popup widget, you can use following method.

#### color
You can get or set the current picked color.
```js
// get picked color
var color = $('#picker').colorpicker('color')

// set picked color (to blue)
$('#picker').colorpicker('color', 'rgb(0, 0, 255)')
```

### Events
Beside the events of the popup widget, you can register on following event.

#### picked
The color picker widget triggers this event even if the user applies the popup. 
The event handler function gets besides the event object additionally an object 
with the single attribute color, which contains the picked color as string in the format `#rrggbb`.

```js
// register on the event
$('#picker').colorpicker('option', 'picked', function(event, data){
   // do something with data.color
}
```

### Hints
The widget accepts two types of formats for the color (affecting option defaultColor and method color). These are:
* `'#rrggbb'`
> where rr is the hexadecimal value for red, gg for green and bb for blue
* `'rgb(r, g, b)'`
> where r is the decimal value for red, g for green and b for blue

## Example
See the [manual test HTML page](./test/colorpicker.man.html) to get an idea how it works.

## License
MIT
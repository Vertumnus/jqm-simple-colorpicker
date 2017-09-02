/* 
 * Copyright Armin Junge
 */


$.widget( 'vertumnus.colorpicker', $.mobile.popup, {
   options: {
      redText: 'Red',
      greenText: 'Green',
      blueText: 'Blue',
      defaultColor: '#000000'
   },
   _defaultColorChanged: true,
   _create: function(){
      this.element.addClass('ui-colorpicker').addClass('ui-content').addClass('ui-corner-all').html(`
         <a id='${this.element.attr('id')}-ok' href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-icon-check ui-btn-icon-notext ui-btn-left'>V</a>
         <a href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-icon-delete ui-btn-icon-notext ui-btn-right'>X</a>
         <form>
             <div id='${this.element.attr('id')}-color' class='colorpicker-color'></div>
             <label for='${this.element.attr('id')}-red'>${this.options.redText}</label>
             <input id='${this.element.attr('id')}-red' type='range' min='0' max='255' value='0' data-highlight="true" class="ui-colorpicker-red">
             <label for='${this.element.attr('id')}-green'>${this.options.greenText}</label>
             <input id='${this.element.attr('id')}-green' type='range' min='0' max='255' value='0' data-highlight="true" class="ui-colorpicker-green">
             <label for='${this.element.attr('id')}-blue'>${this.options.blueText}</label>
             <input id='${this.element.attr('id')}-blue' type='range' min='0' max='255' value='0' data-highlight="true" class="ui-colorpicker-blue">
         </form>
      `)
      this.element.find('input').each(function(){
         $( this ).slider()
         $( this ).attr('type', 'number').attr('data-type', 'range')
                 .addClass('ui-shadow-inset').addClass('ui-body-inherit').addClass('ui-corner-all')
      })
      this._super()
      // register click event on ok button
      this.element.children(`#${this.element.attr('id')}-ok`).click({ widget: this }, this._pressOk)
      // register change event on sliders
      this.element.find('input').change({ widget: this }, this._changeColor)
   },
   _setOption: function(key, value){
      this._super(key, value)
      switch(key)
      {
         case 'defaultColor':
            this._defaultColorChanged = true
            break
         case 'redText':
            this.element.find(`label[for=${this.element.attr('id')}-red]`).text(value)
            break
         case 'greenText':
            this.element.find(`label[for=${this.element.attr('id')}-green]`).text(value)
            break
         case 'blueText':
            this.element.find(`label[for=${this.element.attr('id')}-blue]`).text(value)
            break
      }
   },
   _pressOk: function(event){
      event.data.widget._firePicked()
   },
   _firePicked: function(){
      this._trigger('picked', null, { color:this.color() })
   },
   _changeColor: function(event){
      event.data.widget._setMyColor()
   },
   _setMyColor: function(){
      this.element.find(`#${this.element.attr('id')}-color`).css('background-color', this.color())
   },
   _extractColorsFrom: function(value){
      let found
      // check for hex value
      found = /#?([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})/.exec(value)
      if(found)
         return [parseInt(found[1], 16), parseInt(found[2], 16), parseInt(found[3], 16)]
      
      found = /rgb\((\d+), (\d+), (\d+)\)/.exec(value)
      if(found)
         return [found[1], found[2], found[3]]
      
      return [0, 0, 0]
   },
   open: function(options){
      if(options){
         // set default color if supplied
         if(options.defaultColor)
            this._setOption('defaultColor', options.defaultColor)
         // set picked event handler if supplied
         if(options.picked)
            this._setOption('picked', options.picked)
      }
      // use newly set default color
      if(this._defaultColorChanged){
         this.color(this.options.defaultColor)
         this._defaultColorChanged = false
      }
      
      this._super(options)
   },
   color: function(color){
      let red, green, blue
      if(color === undefined){
         red = '0' + Number(this.element.find(`#${this.element.attr('id')}-red`).val()).toString(16)
         green = '0' + Number(this.element.find(`#${this.element.attr('id')}-green`).val()).toString(16)
         blue = '0' + Number(this.element.find(`#${this.element.attr('id')}-blue`).val()).toString(16)
         return '#' + red.slice(-2) + green.slice(-2) + blue.slice(-2)
      }
      [red, green, blue] = this._extractColorsFrom(color)
      this.element.find(`#${this.element.attr('id')}-red`).val(red).slider('refresh')
      this.element.find(`#${this.element.attr('id')}-green`).val(green).slider('refresh')
      this.element.find(`#${this.element.attr('id')}-blue`).val(blue).slider('refresh')
      this._setMyColor()
   }
})
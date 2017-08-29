/* 
 * Copyright Armin Junge
 */

function assert(expression, message){
   if(!expression)
      throw new Error(message || 'failed')
}

if(window.__html__)
   $('body').html(window.__html__['test/fixture.auto.html'])

describe('Widget created', function(){
   let picker
   before(function(){
      picker = $('#picker')
   })
   context('#Classes of colorpicker element', function(){
      it('should have class ui-colorpicker', function(){
         assert(picker.hasClass('ui-colorpicker'))
      })
      it('should have class ui-content', function(){
         assert(picker.hasClass('ui-content'))
      })
      it('should have class ui-corner-all', function(){
         assert(picker.hasClass('ui-corner-all'))
      })
   })
   context('#Contained elements', function(){
      it('has an OK button', function(){
         let elem = picker.children('#picker-ok')
         assert(elem, 'OK button not found')
         assert(elem.hasClass('ui-btn'))
         assert(elem.hasClass('ui-icon-check'))
      })
      it('has a close button', function(){
         let elem = picker.children('a.ui-icon-delete')
         assert(elem, 'Close button not found')
         assert(elem.hasClass('ui-btn'))
      })
      it('has a color field', function(){
         let elem = picker.find('#picker-color')
         assert(elem, 'Color field not found')
         assert(elem.hasClass('colorpicker-color'))
      })
      it('has sliders for red, green and blue with default value 0', function(){
         let pattern = /picker-([a-z]+)/
         let count = 0
         picker.find('input').each(function(){
            let elem = $(this)
            ++count
            assert(elem.hasClass('ui-slider-input'), 'no slider')
            assert(elem.attr('min') === '0', 'min not 0')
            assert(elem.attr('max') === '255', 'max not 255')
            assert(elem.attr('id').match(pattern), 'wrong slider id')
            let res = pattern.exec(elem.attr('id'))
            switch(res[1])
            {
               case 'red':
                  assert(elem.val() === '0', 'red slider has wrong value')
                  break
               case 'green':
                  assert(elem.val() === '0', 'green slider has wrong value')
                  break
               case 'blue':
                  assert(elem.val() === '0', 'blue slider has wrong value')
                  break
               default:
                  assert(false, 'unknown slider id')
            }
         })
         assert(count === 3, 'wrong number of sliders (' + count + ')')
      })
      it('has labels for red, green and blue with default texts', function(){
         let pattern = /picker-([a-z]+)/
         picker.find('label').each(function(){
            let elem = $(this)
            assert(elem.attr('for').match(pattern), 'wrong label')
            let res = pattern.exec(elem.attr('for'))
            switch(res[1])
            {
               case 'red':
                  assert(elem.text() === 'Red', `red label has wrong text: ${elem.text()}`)
                  break
               case 'green':
                  assert(elem.text() === 'Green', `green label has wrong text: ${elem.text()}`)
                  break
               case 'blue':
                  assert(elem.text() === 'Blue', `blue label has wrong text: ${elem.text()}`)
                  break
               default:
                  assert(false, `unknown label: ${res[1]}`)
            }
         })
      })
   })
})

describe('Usage', function(){
   let picker
   before(function(){
      picker = $('#picker')
   })
   context('#Options for labels', function(){
      it('should change the label for red', function(){
         picker.colorpicker('option', 'redText', 'Rot')
         let labelText = picker.find('label[for=picker-red]').text()
         assert(labelText === 'Rot', `red label is incorrect: ${labelText}`)
      })
      it('should change the label for green and blue', function(){
         picker.colorpicker('option', {
            greenText: 'Grün',
            blueText: 'Blau'
         })
         let labelText = picker.find('label[for=picker-green]').text()
         assert(labelText === 'Grün', `green label is incorrect: ${labelText}`)
         labelText = picker.find('label[for=picker-blue]').text()
         assert(labelText === 'Blau', `blue label is incorrect: ${labelText}`)
      })
   })
   context('#Options for default color', function(){
      it('should show the given default color', function(){
         // default color will be set only at opening the popup
         picker.colorpicker('option', 'defaultColor', 'rgb(50, 150, 200)').colorpicker('open')
         let color = picker.colorpicker('color')
         assert(color === '#3296c8', `default color was not set in correct way: ${color}`)
      })
      after(function(){
         picker.colorpicker('close')
      })
   })
   context('#Functionality', function(){
      it('should open the popup', function(){
         picker.colorpicker('open')
         assert($('#picker-popup').hasClass('ui-popup-active'), 'color picker popup were not opened')
      })
      it('should change the color by providing a new one', function(){
         picker.colorpicker('color', '#95D030')
         let color = $('#picker-color').css('background-color')
         assert(color === 'rgb(149, 208, 48)', `set color is wrong: ${color}`)
      })
      it('should change the color by changing via slider', function(){
         // set new value for red and trigger change
         $('#picker-red').val(154).slider('refresh').change()
         let color = $('#picker-color').css('background-color')
         assert(color === 'rgb(154, 208, 48)', `slider change does not work: ${color}`)
      })
      it('should fire picked event on applying the popup', function(){
         let fired = false
         picker.colorpicker('option', {
            picked: function(event, data){
               fired = true
               assert(data.color === '#9ad030', `wrong color from picked event: ${data.color}`)
            }
         })
         // trigger applying the popup
         $('#picker-ok').click()
         assert(fired, 'picked event was not raised')
      })
      after(function(){
         picker.colorpicker('close')
      })
   })
   context('#Fallback', function(){
      it('should take black if a wrong color format is used', function(){
         picker.colorpicker('color', 'R=77 G=88 B=99')
         assert(picker.colorpicker('color') === '#000000', 'fallback with black does not work at wrong color format')
      })
   })
})
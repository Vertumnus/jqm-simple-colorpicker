/* 
 * Copyright Armin Junge
 */

function assert(expression, message){
   if(!expression)
      throw new Error(message || 'failed')
}

describe('Widget created', function(){
   context('#Classes of colorpicker element', function(){
      let elem
      before(function(){
         elem = $('#picker')
      })
      it('should have class ui-colorpicker', function(){
         assert(elem.hasClass('ui-colorpicker'))
      })
      it('should have class ui-content', function(){
         assert(elem.hasClass('ui-content'))
      })
      it('should have class ui-corner-all', function(){
         assert(elem.hasClass('ui-corner-all'))
      })
   })
   context('#Contained elements', function(){
      let picker
      before(function(){
         picker = $('#picker')
      })
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
                  assert(elem.text() === 'Red', 'red label has wrong text')
                  break
               case 'green':
                  assert(elem.text() === 'Green', 'green label has wrong text')
                  break
               case 'blue':
                  assert(elem.text() === 'Blue', 'blue label has wrong text')
                  break
               default:
                  assert(false, 'unknown label')
            }
         })
      })
   })
})
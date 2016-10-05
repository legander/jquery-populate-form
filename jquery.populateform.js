(function($) {
  $.fn.populateForm = function(fieldMap) {
    var form = $(this);
    var populateField = function(fieldElement, value) {
      var fieldType = fieldElement.attr('type');

      switch(fieldType) {
        case "checkbox":
          var _values = Array.isArray(value) ? value : [value];
          var _selector = _values.map(function(val) {
            return '[value=\''+ val +'\']';
          }).join(',');

          var filteredElements = fieldElement.filter(_selector);
          if (filteredElements.length > 0) {
            filteredElements.prop('checked', true);
          } else {
            fieldElement.first().prop('checked', true);
          }
          break;

        case "radio":
          var filteredElement = fieldElement.filter('[value=\''+ value +'\']');
          if (filteredElement.length === 1) {
            filteredElement.prop('checked', true);
          } else {
            fieldElement.first().prop('checked', true);
          }
          break;

        default:
          fieldElement.val(value);
          break;
      }
    }
    
    $.each(fieldMap, function(fieldName, value) {
      var fieldElement = form.find('[name=\''+ fieldName +'\']');
      populateField(fieldElement, value);
    });
  }
})(jQuery);
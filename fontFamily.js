if (!RedactorPlugins) var RedactorPlugins = {};

(function ($) {
  RedactorPlugins.fontFamily = function () {
    var keys = [8, 33, 34, 35, 36, 37, 38, 39, 40];

    return {
      init: function () {
        var dropdown = {};

        var options = this.opts.fontFamily || { defaultFont: 'Arial' };
        var fonts = this.opts.fontFamily.fonts || ['Arial', 'Georgia', 'Times New Roman', 'Monospace'];
        
        $.each(fonts, function (i, s) {
          dropdown['s' + i] = {
            title: s,
            func: function (e) {
              this.fontFamily.onSelect(s);
            }
          };
        });

        var button = this.button.add('fontList', "Font");
        button[0].innerHTML = options.defaultFont;
        $(this.button.get('fontList')[0]).css('font-family', options.defaultFont);
        this.core.getElement()[0].style.fontFamily = options.defaultFont;
        this.button.addDropdown(button, dropdown);

        this.opts.dropdownShowCallback = function (dropdown, key, button) {
          if (dropdown.key === "fontList") {
            $(".redactor-dropdown-box-fontList").children().each(function (index, value) {
              $(value).css("font-family", value.text);
            });
          }
        }

        this.opts.clickCallback = function () {
          this.fontFamily.caretChanged(this);
        };

        this.opts.keyupCallback = function (e) {
          var key = e.keyCode || e.which;
          if (keys.indexOf(key) === -1) return;

          this.fontFamily.caretChanged(this);
        };
      },
      onSelect: function (font) {
        this.button.get('fontList')[0].innerHTML = font;
        $(this.button.get('fontList')[0]).css('font-family', font);
        this.inline.format('span', 'style', 'font-family:' + font + ';');

      },
      caretChanged: function (t) {
        var node = t.sel.focusNode.nodeType == 3 ? t.sel.focusNode.parentNode : t.sel.focusNode;
        var font = window.getComputedStyle(node, null).getPropertyValue('font-family');

        font = font.replace(/['"]+/g, '');

        this.button.get('fontList')[0].innerHTML = font;
        $(this.button.get('fontList')[0]).css('font-family', font);
      }
    }
  };
})(jQuery);


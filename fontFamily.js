if (!RedactorPlugins) var RedactorPlugins = {};

(function ($) {
  RedactorPlugins.fontFamily = function () {
    var keys = [8, 33, 34, 35, 36, 37, 38, 39, 40];
    var fonts;

    return {
      init: function () {
        var dropdown = {};

        var options = this.opts.fontFamily || { defaultFont: 'Arial' };
        fonts = options.fonts || {
          'Arial': 'Arial, Helvetica, sans-serif',
          'Comic Sans MS': "'Comic Sans MS', cursive, sans-serif",
          'Courier New': "'Courier New', Courier, monospace",
          'Georgia': 'Georgia, serif',
          'Impact': 'Impact, Charcoal, sans-serif',
          'Lucida Console': "'Lucida Console', Monaco, monospace",
          'Palatino': "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
          'Tahoma': 'Tahoma, Geneva, sans-serif',
          'Times New Roman': "'Times New Roman', Times, serif",
          'Trebuchet MS': "'Trebuchet MS', Helvetica, sans-serif",
          'Verdana': 'Verdana, Geneva, sans-serif',
          'MS Sans Serif': 'MS Sans Serif, Geneva, sans-serif',
        };

        $.each(fonts, function (prop, val) {
          dropdown['s' + prop] = {
            title: prop,
            func: function (e) {
              this.fontFamily.onSelect(prop, val);
            }
          };
        });

        var button = this.button.addAfter('formatting', 'fontList', "Font");
        button[0].innerHTML = options.defaultFont;
        $(this.button.get('fontList')[0]).css('font-family', fonts[options.defaultFont]);
        this.core.getElement()[0].style.fontFamily = fonts[options.defaultFont];
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
      onSelect: function (font, fontFamily) {
        this.button.get('fontList')[0].innerHTML = font;
        $(this.button.get('fontList')[0]).css('font-family', fontFamily);
        this.inline.format('span', 'style', 'font-family:' + fontFamily + ';');
      },
      caretChanged: function (t) {
        var node = t.sel.focusNode.nodeType == 3 ? t.sel.focusNode.parentNode : t.sel.focusNode;
        var fontCss = window.getComputedStyle(node, null).getPropertyValue('font-family');
        var fontName;

        $.each(fonts, function (property, value) {
          if (fontCss === value) {
            fontName = property;
          };
        });

        fontCss = fontCss.replace(/['"]+/g, '');

        this.button.get('fontList')[0].innerHTML = fontName;
        $(this.button.get('fontList')[0]).css('font-family', fontCss);
      }
    }
  };
})(jQuery);


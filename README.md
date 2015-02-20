# redactor-fontFamily
Adds a button to toolbar to change font family. Button shows current user choice or font family of current caret position (current selected text).

A plugin developed for [Redactor](http://imperavi.com/redactor/), a WYSIWYG rich-text editor made by [imperavi](http://imperavi.com/).

The example uses [Angular Redactor] (https://github.com/TylerGarlick/angular-redactor).

Feel free to contribute to this repository.

##Installation

Include fontFamily.js in your markup:

```html
<script src="fontFamily.js"></script>
```

Add some styles to your css:
```html
.redactor-toolbar li .re-icon.re-fontList{
    width:auto;
    text-transform: capitalize;
}
```

##Usage
Configuration via HTML markup:

```html
<div id="page-editor-toolbar"></div>
 <textarea ng-model="pageModel.content"
                redactor="{
                            focus: true,
                            linebreaks: false,
                            tabKey: true,
                            plugins: ['fontFamily'],
                            toolbarExternal: '#page-editor-toolbar',
                            fontFamily: {
							  defaultFont : "Georgia"
						    }
						  }"></textarea>
 ````
 

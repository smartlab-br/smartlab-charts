# d3plus-form

[![NPM Release](http://img.shields.io/npm/v/d3plus-form.svg?style=flat)](https://www.npmjs.org/package/d3plus-form) [![Build Status](https://travis-ci.org/d3plus/d3plus-form.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-form) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-form.svg?style=flat)](https://david-dm.org/d3plus/d3plus-form) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/) 

Javascript rendered input forms.

## Installing

If you use NPM, run `npm install d3plus-form --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-form/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-form.v0.2.full.min.js"></script>
```


## API Reference

##### 
* [Button](#Button)
* [Radio](#Radio)
* [Select](#Select)

---

<a name="Button"></a>
#### **Button** [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Button.js#L8)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [Button](#Button) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
    * [new Button()](#new_Button_new)
    * [.render()](#Button.render) ↩︎
    * [.buttonStyle([*value*])](#Button.buttonStyle) ↩︎
    * [.container([*selector*])](#Button.container) ↩︎
    * [.text([*value*])](#Button.text) ↩︎
    * [.value([*value*])](#Button.value) ↩︎


<a name="new_Button_new" href="#new_Button_new">#</a> new **Button**()

Creates a set of HTML radio input elements.





<a name="Button.render" href="#Button.render">#</a> Button.**render**() [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Button.js#L40)

Renders the element to the page.


This is a static method of [<code>Button</code>](#Button), and is chainable with other methods of this Class.


<a name="Button.buttonStyle" href="#Button.buttonStyle">#</a> Button.**buttonStyle**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Button.js#L78)

Sets the css styles for the <input type="radio"> elements.


This is a static method of [<code>Button</code>](#Button), and is chainable with other methods of this Class.


<a name="Button.container" href="#Button.container">#</a> Button.**container**([*selector*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Button.js#L88)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.


This is a static method of [<code>Button</code>](#Button), and is chainable with other methods of this Class.


<a name="Button.text" href="#Button.text">#</a> Button.**text**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Button.js#L108)

Sets the inner text for each <button> element.


This is a static method of [<code>Button</code>](#Button), and is chainable with other methods of this Class.


<a name="Button.value" href="#Button.value">#</a> Button.**value**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Button.js#L118)

Sets the value for each <button> element.


This is a static method of [<code>Button</code>](#Button), and is chainable with other methods of this Class.

---

<a name="Radio"></a>
#### **Radio** [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L8)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [Radio](#Radio) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
    * [new Radio()](#new_Radio_new)
    * [.data([*value*])](#Radio.data) ↩︎
    * [.render()](#Radio.render) ↩︎
    * [.checked([*value*])](#Radio.checked) ↩︎
    * [.container([*selector*])](#Radio.container) ↩︎
    * [.labelStyle([*value*])](#Radio.labelStyle) ↩︎
    * [.legend([*value*])](#Radio.legend) ↩︎
    * [.legendStyle([*value*])](#Radio.legendStyle) ↩︎
    * [.options([*value*])](#Radio.options) ↩︎
    * [.radioStyle([*value*])](#Radio.radioStyle) ↩︎
    * [.text([*value*])](#Radio.text) ↩︎
    * [.value([*value*])](#Radio.value) ↩︎


<a name="new_Radio_new" href="#new_Radio_new">#</a> new **Radio**()

Creates a set of HTML radio input elements.





<a name="Radio.data" href="#Radio.data">#</a> Radio.**data**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Button.js#L98)

Defines the array of values to be created as <button> tags. If no value is passed, the current array is returned.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.render" href="#Radio.render">#</a> Radio.**render**() [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L48)

Renders the element to the page.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.checked" href="#Radio.checked">#</a> Radio.**checked**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L128)

Defines the checked input.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.container" href="#Radio.container">#</a> Radio.**container**([*selector*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L138)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.labelStyle" href="#Radio.labelStyle">#</a> Radio.**labelStyle**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L148)

Sets the css styles for the <label> element.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.legend" href="#Radio.legend">#</a> Radio.**legend**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L158)

Creates a <legend> tag for the <select> element.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.legendStyle" href="#Radio.legendStyle">#</a> Radio.**legendStyle**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L168)

Sets the css styles for the <legend> element.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.options" href="#Radio.options">#</a> Radio.**options**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L178)

Defines the array of values to be used as <option> tags inside of the <select> element. If no value is passed, the current array is returned.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.radioStyle" href="#Radio.radioStyle">#</a> Radio.**radioStyle**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L188)

Sets the css styles for the <input type="radio"> elements.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.text" href="#Radio.text">#</a> Radio.**text**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L198)

Sets the inner text for each <option> element.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.


<a name="Radio.value" href="#Radio.value">#</a> Radio.**value**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Radio.js#L208)

Sets the value for each <option> element.


This is a static method of [<code>Radio</code>](#Radio), and is chainable with other methods of this Class.

---

<a name="Select"></a>
#### **Select** [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L8)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [Select](#Select) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
    * [new Select()](#new_Select_new)
    * [.render()](#Select.render) ↩︎
    * [.container([*selector*])](#Select.container) ↩︎
    * [.label([*value*])](#Select.label) ↩︎
    * [.labelStyle([*value*])](#Select.labelStyle) ↩︎
    * [.options([*value*])](#Select.options) ↩︎
    * [.optionStyle([*value*])](#Select.optionStyle) ↩︎
    * [.selected([*value*])](#Select.selected) ↩︎
    * [.selectStyle([*value*])](#Select.selectStyle) ↩︎
    * [.text([*value*])](#Select.text) ↩︎
    * [.value([*value*])](#Select.value) ↩︎


<a name="new_Select_new" href="#new_Select_new">#</a> new **Select**()

Creates an HTML select element.





<a name="Select.render" href="#Select.render">#</a> Select.**render**() [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L53)

Renders the element to the page.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.container" href="#Select.container">#</a> Select.**container**([*selector*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L114)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.label" href="#Select.label">#</a> Select.**label**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L124)

Creates a <label> tag for the <select> element.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.labelStyle" href="#Select.labelStyle">#</a> Select.**labelStyle**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L134)

Sets the css styles for the <label> element.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.options" href="#Select.options">#</a> Select.**options**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L144)

Defines the array of values to be used as <option> tags inside of the <select> element. If no value is passed, the current array is returned.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.optionStyle" href="#Select.optionStyle">#</a> Select.**optionStyle**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L154)

Sets the css styles for the <option> elements.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.selected" href="#Select.selected">#</a> Select.**selected**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L164)

Defines the selected option.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.selectStyle" href="#Select.selectStyle">#</a> Select.**selectStyle**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L174)

Sets the css styles for the <select> element.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.text" href="#Select.text">#</a> Select.**text**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L184)

Sets the inner text for each <option> element.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.


<a name="Select.value" href="#Select.value">#</a> Select.**value**([*value*]) [<>](https://github.com/d3plus/d3plus-form/blob/master/src/Select.js#L194)

Sets the value for each <option> element.


This is a static method of [<code>Select</code>](#Select), and is chainable with other methods of this Class.

---



###### <sub>Documentation generated on Thu, 11 Jul 2019 13:09:04 GMT</sub>

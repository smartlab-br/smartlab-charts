# d3plus-format

[![NPM Release](http://img.shields.io/npm/v/d3plus-format.svg?style=flat)](https://www.npmjs.org/package/d3plus-format) [![Build Status](https://travis-ci.org/d3plus/d3plus-format.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-format) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-format.svg?style=flat)](https://david-dm.org/d3plus/d3plus-format) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/) 

Shorthand formatters for common number types.

## Installing

If you use NPM, run `npm install d3plus-format --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-format/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-format.v0.1.full.min.js"></script>
```


## API Reference

##### 
* [formatAbbreviate](#formatAbbreviate) - Formats a number to an appropriate number of decimal places and rounding, adding suffixes if applicable (ie. `1200000` to `"1.2M"`).

##### 
* [formatLocale](#formatLocale) - A set of default locale formatters used when assigning suffixes and currency in numbers.

| Name | Default | Description |
|---|---|---|
| separator | "" | Separation between the number with the suffix. |
| suffixes | [] | List of suffixes used to format numbers. |
| grouping | [3] | The array of group sizes, |
| delimiters | {thousands: ",", decimal: "."} | Decimal and group separators. |
| currency | ["$", ""] | The currency prefix and suffix. |

---

<a name="formatAbbreviate"></a>
#### d3plus.**formatAbbreviate**(n, locale) [<>](https://github.com/d3plus/d3plus-format/blob/master/src/abbreviate.js#L37)

Formats a number to an appropriate number of decimal places and rounding, adding suffixes if applicable (ie. `1200000` to `"1.2M"`).


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> \| <code>String</code> | The number to be formatted. |
| locale | <code>Object</code> \| <code>String</code> | The locale config to be used. If *value* is an object, the function will format the numbers according the object. The object must include `suffixes`, `delimiter` and `currency` properties. |


---

<a name="formatLocale"></a>
#### **formatLocale** [<>](https://github.com/d3plus/d3plus-format/blob/master/src/locale.js#L1)

A set of default locale formatters used when assigning suffixes and currency in numbers.

| Name | Default | Description |
|---|---|---|
| separator | "" | Separation between the number with the suffix. |
| suffixes | [] | List of suffixes used to format numbers. |
| grouping | [3] | The array of group sizes, |
| delimiters | {thousands: ",", decimal: "."} | Decimal and group separators. |
| currency | ["$", ""] | The currency prefix and suffix. |


This is a global namespace.

---



###### <sub>Documentation generated on Tue, 17 Sep 2019 17:22:35 GMT</sub>


<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Codevendor/inferjs">
    <img src="https://github.com/Codevendor/inferjs/blob/main/assets/images/inferjs-logo.png?raw=true" alt="Logo" width="443" height="183">
  </a>

  <p align="center" style="margin: 20px">
    A runtime library that allows you to infer rules for extended type checking in JavaScript.
    <br />
    <a href="https://github.com/Codevendor/inferjs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Codevendor/inferjs">View Demo</a>
    ·
    <a href="https://github.com/Codevendor/inferjs/issues">Report Bug</a>
    ·
    <a href="https://github.com/Codevendor/inferjs/issues">Request Feature</a>
  </p>
</div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- ABOUT THE PROJECT -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS Overview

[**InferJS-Library**](https://github.com/Codevendor/inferjs/tree/main/projects/inferjs-library/src) allows you to easily add runtime type checking by utilizing **JSDoc** multiline comments in both client and server side **JavaScript**. [**InferJS**](https://github.com/Codevendor/inferjs) is provided with an  [**InferJS-Compiler**](https://github.com/Codevendor/inferjs). The compiler interprets your **JSDoc** comments from your source code and compiles them into an **InferFile** that you can import into any **JavaScript** file. 

With this library, you can also enable **Extended Type Checking** and narrow down your data types with **infer expectation rules**. Check out the examples below, to see how [**InferJS**](https://github.com/Codevendor/inferjs) can save you time and money from costly bugs through development and release.


### Built With
* [InferJS-Library Version 0.0.1](https://inferjs.com/)
* [InferJS-Compiler Version 0.0.1](https://inferjs.com/)
* [JSDoc Version 3+](https://jsdoc.app/)
* [Node.js Version 18+](https://nodejs.org/)
* [Webpack Version 5+](https://webpack.js.org/)


<!-- GETTING STARTED -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Getting Started

New Structure coming soon...

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Prerequisites

New Structure coming soon...


## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Installation

New Structure coming soon...





<!-- USAGE EXAMPLES -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS-Library: Usage

Below are examples for using [**InferJS-Library**](https://github.com/Codevendor/inferjs/tree/main/projects/inferjs-library/src) in your code.

#### ES6+ Import Module Example - Client side
```js
<script type="module">
  import { InferFile } from "./inferjs-infer-file.mjs";
  import { InferJS } from "./inferjs-0.0.1.min.mjs";
  const inferjs = new InferJS(InferFile);
</script>
```

#### JavaScript Script Tag Sync Example - Client Side
```js
<script src="./inferjs-infer-file.mjs"></script>
<script src="./inferjs-0.0.1.min.js"></script>
<script>
const inferjs = new InferJS(InferFile);
</script>
```

There are many ways to utilize the [**InferJS-Library**](https://github.com/Codevendor/inferjs). The example above, imports in the pre-compiled **InferFile** that was created with the [**InferJS-Compiler**](https://github.com/Codevendor/inferjs). Intialize the [**InferJS-Library**](https://github.com/Codevendor/inferjs) class with the **InferFile** you want to use.
```js
const inferjs = new InferJS(Infers);
```

Once the InferJS-Library and InferFile are included at the top of your file you can then utilize the type checking features. Below is an example of how to create a JSDoc multiline comment for type checking.

#### Custom JSDoc Multiline Comment with Custom Infers

```js
/**
 * Test case scenario for JavaScript inferjs function.
 * @category tests
 * @function foo
 * @param {string} msg - The message to send through console.log().
 * @param {(number|string)} id - The id of the message.
 * @param {boolean} [send=true] - Whether to send your message.
 * @infer {(string)} msg {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid foo
 */
function foo(msg, id, send) {

    inferjs.check('foo', arguments);
}

// Example Normal Call
foo('test', 1234, true);
```


## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS-Library: Type Checking with JSDoc @param

The **JSDoc** tag **@param** below specifies a method's parameter type(s), name and description.
#### Fomart for @param: 
- @param {[type]()} paramName - description
- @param {([type]()|[type]())} paramName - description

##### Single type check example:
```js
/**
 * @param {string} msg - The message to send through console.log().
 */
```

##### Multi type check example:
```js
/**
 * @param {(null|string)} msg - The message to send through console.log().
 */
```

[**InferJS-Library**](https://github.com/Codevendor/inferjs) reads the precompiled **InferFile** 
and uses it to process all type checking and **inferred expectations**. 

Below is a list of **standard** and **extended types** that can be checked:

| Standard JS Types&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| :-- | :-- |
| [bool]()      |  A boolean type: [true]() or [false]() |
| [number]() | A number type: [1000]() or [10.25]() |
| [string]() | A string type: ['foo1']() or ["foo2"]() |
| [bigint]() | A big integer type: ['1010101112233343545545545446n']() |
| [symbol]() | A symbol type: [**Symbol**]() |
| [null]()   | A null type: [**null**]() |
| [undefined]() | An undefined type: [**undefined**]() |
| **Extended InferJS Types** | **Description** |
| [array]() | An array type: [[]]() |
| [className]() | A class name: [fooClass]() |
| [functionName]() | A function name: [fooFunction]() |
| [errorName]() | An error type: [Error]() or [TypeError]() or [errorName]()  |
| [infinity]() | An infinity number type: [Infinity]() |
| [nan]() | Not a number type: [NaN]() |

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS-Library: Expectation Checking with Tag @infer

[**InferJS-Library**](https://github.com/Codevendor/inferjs) also allows for extended type checking with the custom **@infer** tag. Add one or multiple **infer** tags to any parameter type. This will allow narrowing your types down throught expectations. 

Below is an simple example of **@infer**:
#### Fomart for @infer: 
- @infer {[type]()} paramName {[expectation]()} - description
- @infer {([type]()|[type]())} paramName {([expectation]()|[expectation]())} - description

```js
/**
 * @infer {string} msg {STRING-NOT-EMPTY} - Checks if string is not empty.
 */
```

The **@infer** tag is so versatile you can attach it to multiple types in a group and specify multiple narrowing and values to check against like so:

```js
/**
 * @infer {(number|string)} msg {INT32|STRING-NOT-EMPTY} - Checks if string is not empty and is an integer32.
 * @infer {array} arrname {IN-LIST=a,b,c,d,e} - Checks if a,b,c,d is in array.
 * @infer {object} objname {PROPS=id,name} - Checks if objname has properties id and name.
 */
```

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS-Library: Tag @infer Expectation Types

There are many extended expectation types for narrowing your types down with your **@infer** tags.

Below is a list of common rule expectation types:

| Expectation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| :-- | :-- |
| [STRING-NOT-EMPTY]() | Checks if a string is not empty. |
| [STRING-EMPTY]() | Checks if a string is empty. |
| [ISBOOL]() | Checks if a string is a boolean, '[true]()', '[false]()', '[yes]()', '[no]()', '[on]()', '[off]()' '[0]()', '[1]()'. |
| [BETWEEN]() | Checks if number is between two numbers. |
| [BETWEEN-INCLUSIVE]() | Checks if number is between two numbers and including equal to self. |
| [BETWEEN-BIGINT]() | Checks if string is between two big integers. |
| [BETWEEN-BIGINT-INCLUSIVE]() | Checks if a string is between two big integers including equal to self. |
| [GREATER-THAN]() | Checks if value is greater than. |
| [GREATER-THAN-EQUAL]() | Checks if value is greater than equal. |
| [LESS-THAN]() | Checks if value is less than. |
| [LESS-THAN-EQUAL]() | Checks if value is less than equal. |
| [REGEX]() | Checks if matches a regular expression. |
| [ALPHA]() | Checks if alpha characters. |
| [ISNUMBER]() | Checks if a string is a number. |
| [ISNUMERIC]() | Checks if a string is numeric. |
| [ALPHA-NUMERIC]() | Checks if a string is alpha numeric. | 
| [IN-ARRAY-CI]() | Checks if in array list case insensitive. |
| [IN-ARRAY]() | Checks if in array list case sensitive. |
| [NOT-IN-ARRAY-CI]() | Checks if not in array list case insensitive. |
| [NOT-IN-ARRAY]() | Checks if not in array list case sensitive. |
| [EXTENDS-ALL]() | Checks if object extends all types. |
| [EXTENDS]() | Checks if object extends type. |
| [PROPS]() | Checks if object contains properties. |
| [ARRAY-NOT-EMPTY]() | Checks if array not empty. |
| [ARRAY-EMPTY]() | Checks if array is empty. |
| [ARRAY-TYPES]() | Checks if array items of are of exepected types. |
| [INT8]() | Checks for INT8: [-128]() to [127]() |
| [CHAR]() | ^ |
| [UINT8]() | Checks for UINT8: [0]() to [255]() |
| [UCHAR]() | ^ |
| [UNSIGNED-CHAR]() | ^ |
| [INT16]() | Checks for INT16: [-32768]() to [32767]() |
| [SHORT]() | ^ |
| [SHORT-INT]() | ^ |
| [SIGNED-SHORT]() | ^ |
| [UINT16]() | Check for UINT16: [0]() to [65535]() |
| [UNSIGNED-SHORT]() | ^ |
| [UNSIGNED-SHORT-INT]() | ^ |
| [USHORT]() | ^ |
| [INT32]() | Check for INT32: [-2147483648]() to [2147483647]() |
| [SIGNED-INT]() | ^ |
| [INT]() | ^ |
| [UINT32]() | Check for UINT32: [0]() to [4294967295]() |
| [UNSIGNED-INT]() | ^ |
| [UINT]() | ^ |
| [INT64]() | Check for INT64: [-9223372036854775808]() to [9223372036854775807]() |
| [SIGNED-LONG]() | ^ |
| [SIGNED-LONG-LONG]() | ^ |
| [LONG]() | ^ |
| [LONG-LONG]() | ^ |
| [UINT64]() | Check for UINT64: [0]() to [18446744073709551615]() |
| [UNSIGNED-LONG]() | ^ |
| [UNSIGNED-LONG-LONG]() | ^ |
| [ULONG]() | ^ |







## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS-Library: Linking with Tag @inferid

The tag **@inferid** is a unique identifier for linking [**InferJS-Library**](https://github.com/Codevendor/inferjs/tree/main/projects/inferjs-library/src) behind the scenes. It is required for each **method**, **property** or **field**, you would like to infer. 

This special tag allows code to still work while **JavaScript** is **compressed/minified** or **obfuscated**. **Infers** are all stored in a precompiled **InferFile**. This makes it easy to write in your static data types and not have to worry about type checking them during **JavaScript Runtime**. 

**@inferid** can be anything you want as a name, but must be **unique** per item you want to check.

Below is an example of **@inferid**:
#### Fomart for @infer: 
- @inferid [uniqueId]()

```js
/**
 * @inferid foo
 */
```

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS-Library: Running InferJS Checks with Method check()

To check all your types and expectations, you need to call the [**InferJS-Library**](https://github.com/Codevendor/inferjs) **check()** method. It needs to be added at the beginning of each method(s) starting closure or below each field you would like to check.

Below is the overload signature for the method **check()**:
| Method Signature for [**InferJS-Library**](https://github.com/Codevendor/inferjs): check() |
| :-- |
| **check** (&nbsp;inferId: [@inferid](),&nbsp;&nbsp;args: [arguments]()&nbsp;) |
| Desc: Checks all method parameters and undeclared method parameters. |
| **check** (&nbsp;inferId: [@inferid](),&nbsp;&nbsp;arg: [field](),&nbsp;&nbsp; isField: [boolean]() &nbsp;) |
| Desc: Checks all single declared variables or fields. 

#### Example Check All Method Params:

```js
function foo(){
  inferjs.check('Your - @inferid', arguments);
}
```

#### Example Check Field or Variable:
```js
var a = 'foo';
inferjs.check('Your - @inferid', a);  
```

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS Library: Type Checking Errors

In [**InferJS-Library**](https://github.com/Codevendor/inferjs/tree/main/projects/inferjs-library/src/) you have the option to throw **exceptions** or return the **exception** from the check method. Thrown errors come with tons of information for debugging your infers and code. 

| Exception Types | Description |
| :-- | :-- |
| [InferUnhandledError](https://github.com/Codevendor/inferjs/blob/main/projects/inferjs-library/src/errors/infer-unhandled-error.mjs) | For all errors unhandled by the inferjs library. |
| [InferTypeError](https://github.com/Codevendor/inferjs/blob/main/projects/inferjs-library/src/errors/infer-type-error.mjs) | For all type errors created from the JSDoc tag **@param** {*} |
| [InferExpectError](https://github.com/Codevendor/inferjs/blob/main/projects/inferjs-library/src/errors/infer-expect-error.mjs) | For all errors related to the custom JSDoc tag **@infer** and custom expectation rules. |

Below are examples of exception type responses from [**InferJS-Library**](https://github.com/Codevendor/inferjs/tree/main/projects/inferjs-library/src/).  

#### > InferTypeError Example:
```console
InferTypeError: Incorrect third parameter type in:
@inferid: foo
@function: ( msg: <string>, id: <number>, objectTester: <object> )
@param: objectTester
Expected Type: object
Actual Type: null
```

#### > InferExpectError Example:
```console
InferExpectError: Incorrect first parameter failed infer expectation type check in:
@inferid: foo
@function: foo( msg: <string|number|null>, id: <number|string>, send: <boolean> )
@param: msg
Expectation Type: STRING-NOT-EMPTY
Expectation Value: "1234"
Argument Value: ""
```

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS-Compiler: Usage

Before [**InferJS-Library**](https://github.com/Codevendor/inferjs) can do type checking, you need to compile your **Infers** into an **InferFile**. Below are terminal commands for processing your **JavaScript** file(s) **Infers**.

#### InferJS-Compiler Actions
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |               
| [parse-file]()        | -f          | Parses a **JavaScript** file, looking for **JSDoc** multiline comments. Processes custom comment infer tags: **@inferid**, **@infer**, **@param**.  |
```ps
foo@console:~$: node "./compiler/inferjs-compiler.mjs" -f --input-file="./tests/test1.mjs" --output-file="./tests/out.infer.mjs" 
```
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |
| [parse-dir]()  | -d           | Parses a directory, looking for **JavaScript** files with **JSDoc** multiline comments. Options for **recursive** and **allowedExtensions**.  Processes custom comment infer tags: **@inferid**, **@infer**, **@param**. |
```ps
foo@console:~$: node "./compiler/inferjs-compiler.mjs" -d --input-dir="./tests" --output-file="./tests/out.infer.mjs" 
```
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |
| [parse-list]()  | -a          | Parses a list of string file paths, looking for **JavaScript** with **JSDoc** multiline comments. Processes custom comment infer tags: **@inferid**, **@infer**, **@param**. |
```ps
foo@console:~$: node "./compiler/inferjs-compiler.mjs" -a --input-list="./tests/test1.mjs, ./tests/test2.mjs" --output-file="./tests/out.infer.mjs" 
```

| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |
| [parse-file-list]()  | -l           | Parses a file, containing a list of string file paths, separated by newline characters. Each file is parsed, looking for **JavaScript** with **JSDoc** multiline comments. Processes custom comment infer tags: **@inferid**, **@infer**, **@param**.   |

```ps 
foo@console:~$: node "./compiler/inferjs-compiler.mjs" -l --input-file-list="./file-list" --output-file="./out.infer.mjs" 
```

_For more examples, please refer to the [Documentation](https://inferjs.com)_





<!-- ROADMAP -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Roadmap
- [[ March 2023 ]()] - First Release Date - Possible 
- [[ Feb 2023 ]()] - Make Distributon Plan and Library Versioning for browser with Webpack and Terser for JS minification.
- [[ Jan 25, 2023 ]()] - Under Development and Testing



<!-- CHANGELOG -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Change Log

- [[ Jan 29, 2023 ]()] - Changing the main **InferJS** repo structure to isolate projects and versioning. Redefined error type InferRuleError to InferExpectError.

- [[ Jan 27, 2023 ]()] - Added in **InferJS-Compiler** actions parse-list, parse-file-list. Removed bugs found in **InferJS-Compiler** and setup testing per action in **.vscode** launch and task files.

- [[ Jan 26, 2023 ]()] - Added in extended type checking to infer types. Updated **InferJS-Compiler** with terminal command argument processing.

See the [open issues](https://github.com/Codevendor/inferjs/issues) for a full list of proposed features (and known issues).





<!-- CONTRIBUTING -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request





<!-- LICENSE -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />License

Distributed under the **MIT** License. See `LICENSE.txt` for more information.





<!-- CONTACT -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Contact

Project Link: [https://github.com/Codevendor/inferjs](https://github.com/Codevendor/inferjs)





<!-- ACKNOWLEDGMENTS -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Acknowledgments

* [Codevendor](https://codevendor.com]) - Thanks to developer: **Adam Smith** for creating InferJS.
* [JSDoc](https://jsdoc.app/) - Thanks to **Michael Mathews** and **Gabriel Reid** for creating JSDoc. 







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Codevendor/inferjs.svg?style=for-the-badge
[contributors-url]: https://github.com/Codevendor/inferjs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Codevendor/inferjs.svg?style=for-the-badge
[forks-url]: https://github.com/Codevendor/inferjs/network/members
[stars-shield]: https://img.shields.io/github/stars/Codevendor/inferjs.svg?style=for-the-badge
[stars-url]: https://github.com/Codevendor/inferjs/stargazers
[issues-shield]: https://img.shields.io/github/issues/Codevendor/inferjs.svg?style=for-the-badge
[issues-url]: https://github.com/Codevendor/inferjs/issues
[license-shield]: https://img.shields.io/github/license/Codevendor/inferjs.svg?style=for-the-badge
[license-url]: https://github.com/Codevendor/inferjs/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Codevendor
[product-screenshot]: images/screenshot.png

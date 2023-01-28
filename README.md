
<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Codevendor/inferjs">
    <img src="https://github.com/Codevendor/inferjs/blob/main/assets/images/inferjs-logo.png?raw=true" alt="Logo" width="443" height="183">
  </a>

  <p align="center">
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


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#inferjs-overview">InferJS Overview</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#change-log">Change Log</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferJS Overview

[**InferJS**](https://github.com/Codevendor/inferjs) allows you to easily add runtime type checking by utilizing **JSDoc** multiline comments in both client and server side **JavaScript**. [**InferJS**](https://github.com/Codevendor/inferjs) is provided with an  [**InferCompiler**](https://github.com/Codevendor/inferjs). The compiler interprets your **JSDoc** comments from your source code and compiles them into an **InferFile** that you can import into any **JavaScript** file. With this library, you can also enable **Extended Type Checking** and narrow down your data types. Check out the examples below, to see how [**InferJS**](https://github.com/Codevendor/inferjs) can save you time and money from costly bugs through development and release.


### Built With
* [InferJS Version 0.0.1](https://inferjs.com/)
* [JSDoc Version 3](https://jsdoc.app/)
* [Node.js Version 18+](https://nodejs.org/)



<!-- GETTING STARTED -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Installation

1. Get a free API Key at [https://inferjs.com](https://inferjs.com)
2. Clone the repo
   ```sh
   git clone https://github.com/Codevendor/inferjs.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```





<!-- USAGE EXAMPLES -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Usage

Below are examples for using [**InferJS**](https://github.com/Codevendor/inferjs) library in your code.

### Starting Code Example
```js
import { Infers } from "./infers/test1.infer.mjs";
import { Infer } from "../src/core/infer.mjs";
const infer = new Infer(Infers);

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

    infer.check('foo', arguments);
}

// Example Normal Call
foo('test', 1234, true);
```

There are many ways to utilize the [**InferJS**](https://github.com/Codevendor/inferjs) library. The example above, imports in the pre-compiled **InferFile** that was created with the [**InferCompiler**](https://github.com/Codevendor/inferjs). Intialize the [**Infer Class**](https://github.com/Codevendor/inferjs) library with the **InferFile** you want to use.
```js
import { Infers } from "./infers/test1.infer.mjs";
import { Infer } from "../src/core/infer.mjs";
const infer = new Infer(Infers);
```

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />JSDoc Comment Infer Addins
```js
/**
 * @param {string} msg - The message to send through console.log().
 */
```

[**InferJS**](https://github.com/Codevendor/inferjs) interprets the comment and uses the **JSDoc** tags to introduce type checking into your code, through simple easy to understand instructions. 
With the standard tag **@param**, you can specify type(s) between curly brackets,

- Example: {[type]()} or {([type1]() | [type2]())}.

The library can check all standard **JavaScript** types and also **InferJS Extended Types**. 

| Standard JS Types | Description |
| :-- | :-- |
| [bool]()      |  A boolean type: [true]() or [false]() |
| [number]() | A number type: [1000]() or [10.25]() |
| [string]() | A string type: ['foo1']() or ["foo2"]() |
| [bigint]() | A big integer type: ['1010101112233343545545545446n']() |
| [symbol]() | A symbol type: [**Symbol**]() |
| [null]()   | A null type: [**null**]() |
| [undefined]() | An undefined type: [**undefined**]() |

| Extended InferJS Types | Description |
| :-- | :-- |
| [array]() | An array type: [[]]() |
| [className]() | A class name: [fooClass]() |
| [functionName]() | A function name: [fooFunction]() |
| [errorName]() | An error type: [Error]() or [TypeError]() or [errorName]()  |
| [infinity]() | An infinity number type: [Infinity]() |
| [nan]() | Not a number type: [NaN]() |

[**InferJS**](https://github.com/Codevendor/inferjs) also allows, extended type checking with the custom **@infer** tag. Add one or multiple **infer** to any tag easily. You can specify the **@infer** tag per each line and infer type checks for narrowing like so:

```js
/**
 * @infer {(string)} msg {STRING-NOT-EMPTY} - Checks if string is not empty.
 */
```

The **@infer** is so versatile you can attach it to multiple types in a group and specify multiple narrowing and values to check against like so:

```js
/**
 * @infer {(number|string)} msg {INT32|STRING-NOT-EMPTY} - Checks if string is not empty and is an integer32.
 * @infer {array} arrname {IN-LIST=a,b,c,d,e} - Checks if a,b,c,d is in array.
 * @infer {object} objname {PROPS=id,name} - Checks if objname has properties id and name.
 */
```

All code is identified with a unique marker tag called **@inferid**. 

```js
/**
 * @inferid foo
 */
```
This tag allows code to still work while **JavaScript** is **compressed/minified** or **obfuscated**. **Infers** are all stored in a precompiled **InferFile**. This makes it easy to write in your static data types and not have to worry about type checking them during runtime. Tag **@inferid** can be anything you want as a name, but must be **unique** per item you want to check. 

To check your types all you have to do is add the line below at the top of your method or below your defined field.

```js
infer.check('Your - @inferid', arguments);
```
The first parameter is your **@inferid** from your **JSDoc** comment. The second parameter is the method **arguments** array. This causes all the infer type checks to occur. 

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Type Checking Errors

In [**InferJS**](https://github.com/Codevendor/inferjs) you have the option to throw **exceptions** or return the **exception** from the check method. Thrown errors come with tons of information for debugging your infers and code. Below is an example of an **InferTypeError** exception. 

```console
InferTypeError: Incorrect third parameter type in:
@inferid: foo
@function: ( msg: <string>, id: <number>, objectTester: <object> )
@param: objectTester
Expected Type: object
Actual Type: null
```
There are many ways to utilize the [**InferJS**](https://github.com/Codevendor/inferjs) library to help type check all your **JavaScript** code. 

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferCompiler Usage

Before [**InferJs**](https://github.com/Codevendor/inferjs) can do type checking, you need to compile your **Infers** into an **InferFile**. Below are terminal commands for processing your **JavaScript** file(s) **Infers**.

#### InferCompiler Actions
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |               
| [parse-file]()        | -f          | Parses a **JavaScript** file, looking for **JSDoc** multiline comments. Processes custom comment infer tags: **@inferid**, **@infer**, **@param**.  |
```ps
foo@console:~$: node "./compiler/infer-compiler.mjs" -f --input-file="./tests/test1.mjs" --output-file="./tests/out.infer.mjs" 
```
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |
| [parse-dir]()  | -d           | Parses a directory, looking for **JavaScript** files with **JSDoc** multiline comments. Options for **recursive** and **allowedExtensions**.  Processes custom comment infer tags: **@inferid**, **@infer**, **@param**. |
```ps
foo@console:~$: node "./compiler/infer-compiler.mjs" -d --input-dir="./tests" --output-file="./tests/out.infer.mjs" 
```
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |
| [parse-list]()  | -a          | Parses a list of string file paths, looking for **JavaScript** with **JSDoc** multiline comments. Processes custom comment infer tags: **@inferid**, **@infer**, **@param**. |
```ps
foo@console:~$: node "./compiler/infer-compiler.mjs" -a --input-list="./tests/test1.mjs, ./tests/test2.mjs" --output-file="./tests/out.infer.mjs" 
```

| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Cmd| Description |
|:-- |:--: |:--  |
| [parse-file-list]()  | -l           | Parses a file, containing a list of string file paths, separated by newline characters. Each file is parsed, looking for **JavaScript** with **JSDoc** multiline comments. Processes custom comment infer tags: **@inferid**, **@infer**, **@param**.   |

```ps 
foo@console:~$: node "./compiler/infer-compiler.mjs" -l --input-file-list="./file-list" --output-file="./out.infer.mjs" 
```

_For more examples, please refer to the [Documentation](https://inferjs.com)_





<!-- ROADMAP -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Roadmap
- [[ March 2023 ]()] - First Release Date - Possible 
- [[ Feb 2023 ]()] - Make Distributon Plan and Library Versioning
- [[ Jan 25, 2023 ]()] - Under Development and Testing



<!-- CHANGELOG -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Change Log

- [[ Jan 27, 2023 ]()] - Added in **InferCompiler** actions parse-list, parse-file-list. Removed bugs found in **InferCompiler** and setup testing per action in **.vscode** launch and task files.

- [[ Jan 26, 2023 ]()] - Added in extended type checking to infer types. Updated **InferCompiler** with terminal command argument processing.

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

* [Codevendor](https://codevendor.com]) - Thanks to developer: Adam Smith for creating InferJS.
* [JSDoc](https://jsdoc.app/) - Thanks to Michael Mathews and Gabriel Reid for creating JSDoc. 







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

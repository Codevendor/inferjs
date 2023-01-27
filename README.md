
<div id="top"></div>

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Codevendor/inferjs">
    <img src="https://github.com/Codevendor/inferjs/blob/main/assets/images/inferjs-logo.png?raw=true" alt="Logo" width="443" height="183">
  </a>

<h3 align="center">InferJS</h3>

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



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
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
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />About The Project

**InferJs** allows you to easily add type checking through **JSDoc** multi line comments in both client and server side **JavaScript**. **InferJs** is provided with an  **InferCompiler**. The compiler interprets your **JSDoc** comments from your source code and compiles them into an **Infer File** that you can import into any **JavaScript** file. With this library, you can also enable **Extended Type Checking** and narrow down your data types. Check out the examples below, to see how **InferJs** can save you time and money from costly bugs through development and release.





### Built With
* [InferJS](https://inferjs.com/)
* [JSDoc](https://jsdoc.app/)
* [Node.js](https://nodejs.org/)






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

Below are examples for using **InferJs** library in your code.

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

There are many ways to utilize the **InferJs** library. The example above, imports in the pre-compiled Infers file that was created with the **InferCompiler**.
Intialize the Infer library class with the infers to use.
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

**InferJs** interprets the comment and uses the **JSDoc** tags to introduce type checking into your code, through simple easy to understand instructions. The standard **@param** tag is used for type checking of method parameters. Specifying a type(s) for your **@param** tag between the {string} will cause the parameter to be checked if type is string. 

```js
/**
 * @infer {(string)} msg {STRING-NOT-EMPTY} - Checks if string is not empty.
 */
```
**InferJs** allows extended type checking with the custom @infer tag. Add one or multiple infers to any parameter easily. All code is identified with a unique marker tag called **@inferid**. 
```js
/**
 * @inferid foo
 */
```
This tag allows code to still work while Javascript is **compressed/minified** or **obfuscated**. Infers are all stored in precompiled infer file. This makes it easy to write in your static data types and not have to worry about type checking them during runtime. Tag **@inferid** can be anything you want as a name, but must be **unique** per item you want to check. 

To check your types all you have to do is add the line below at the top of your method or below your defined field.
```js
infer.check('Your - @inferid', arguments);
```
The first parameter is your **@inferid** from your **JSDoc** comment. The second parameter is the method **arguments** array. This causes all the infer type checks to occur. 

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Type Checking Errors

In **InferJs** you have the option to throw exceptions or return the exception from the check method. Thrown errors come with tons of information for debugging your infers and code. Below is an example of an **InferTypeError** exception. 

```console
InferTypeError: Incorrect third parameter type in:
@inferid: foo
@function: ( msg: <string>, id: <number>, objectTester: <object> )
@param: objectTester
Expected Type: object
Actual Type: null
```
There are many ways to utilize the **InferJs** library to help type check all your **JavaScript** code. 

## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />InferCompiler Usage

Before **InferJs** can do type checking, you need to compile your infers into an infer file. Below are terminal commands for processing your js file(s) infers.

#### InferCompiler Actions
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description         |
| :--                   | :--                 |
| [parse-file]()            | Parses a file for JavaScript multiline comments, looking for JSDoc comment infers.  |
```console
Format: <nodePath> <inferCompilerPath> <action> <input=FilePath> <output=FilePath> 
Example: /usr/bin/node ./src/compiler/infer-compiler.mjs -f --input=./tests/test1.mjs --output=./tests/test1.infer.mjs 
```
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description         |
| :--                   | :--                 |
| [parse-dir]()             | Parses a directory looking for JavaScript files with multiline comments, looking for JSDoc comment infers. |
```console
Format: <nodePath> <inferCompilerPath> <action> <input=FilePath> <input-options=> <output=FilePath> <output-options=> 
Example: /usr/bin/node ./src/compiler/infer-compiler.mjs -d --input=./tests/ --output=./tests/test1.infer.mjs 
```
| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description         |
| :--                   | :--                 |
| [parse-list]()            | Parses a list of file paths, looking through each file listed for multiline comments with JSDoc comment infers. |
```console
Format: <nodePath> <inferCompilerPath> <action> <input=FilePath> <output=FilePath> 
Example: /usr/bin/node ./src/compiler/infer-compiler.mjs -l --input=./tests/test1.mjs --output=./tests/test1.infer.mjs 
```

| Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description         |
| :--                   | :--                 |
| [parse-file-list]()            | Parses a file, containing a list of string file paths, broken up by newline characters, of files to process for Infers.   |

```console 

foo@console:~$: /usr/bin/node ./src/compiler/infer-compiler.mjs -l --input=./tests/test1.mjs --output=./tests/test1.infer.mjs 
```

_For more examples, please refer to the [Documentation](https://inferjs.com)_





<!-- ROADMAP -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Roadmap
- [[ March 2023 ]()] - First Release Date - Possible 
- [[ Jan 25, 2023 ]()] - Under Development and Testing



<!-- CHANGELOG -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left; margin-right: 8px" />Change Log

- [[ Jan 27, 2023 ]()] - Added in InferCompiler actions parse-list, parse-file-list. Removed bugs found in InferCompiler and setup testing per action in .vscode launch and task files.

- [[ Jan 26, 2023 ]()] - Added in extended type checking to infer types. Updated InferCompiler with terminal command argument processing.

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

* [https://codevendor.com](Codevendor)






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

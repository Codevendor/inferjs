[inferjs]: https://github.com/Codevendor/inferjs
[inferjs-library]: https://github.com/Codevendor/inferjs-library
[inferjs-compiler]: https://github.com/Codevendor/inferjs-compiler
[inferjs-doc-builder]: https://github.com/Codevendor/inferjs-doc-builder
[infer-object]: https://github.com/Codevendor/inferjs-library
[logo]: https://github.com/Codevendor/inferjs/blob/main/assets/images/inferjs-logo.png?raw=true
[header]: https://github.com/Codevendor/inferjs/blob/main/assets/images/git_header.png?raw=true
[arrow]: https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true
[library-docs]: https://github.com/Codevendor/inferjs-library/
[library-issues]: https://github.com/Codevendor/inferjs-library/issues
[compiler-docs]: https://github.com/Codevendor/inferjs-compiler/
[compiler-issues]: https://github.com/Codevendor/inferjs-compiler/issues
[doc-builder-docs]: https://github.com/Codevendor/inferjs-doc-builder/
[doc-builder-issues]: https://github.com/Codevendor/inferjs-doc-builder/issues
[unhandled-error]: https://github.com/Codevendor/inferjs-library/blob/main/src/errors/infer-unhandled-error.js
[type-error]: https://github.com/Codevendor/inferjs-library/blob/main/src/errors/infer-type-error.js
[expect-error]: https://github.com/Codevendor/inferjs-library/blob/main/src/errors/infer-expect-error.js 
[demo]:https://inferjs.com/demo.html

<!-- MARKDOWN LINKS & IMAGES -->
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
[product-screenshot]: images/screenshot.png

![InferJS Library][header]

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## ![Heading][arrow]&nbsp;&nbsp;InferJS: Overview

A package of InferJS tools, designed for runtime checking of JavaScript types and narrowing through expectations.

- [Live Example][demo]

## ![Heading][arrow]&nbsp;&nbsp;InferJS: npm Package Contents

- [InferJS-Library][inferjs-library] - The main library for checking types.
- [InferJS-Compiler][inferjs-compiler] - The compiler for building [**InferObjects**][infer-object] for checking types.
- [InferJs-Doc-Builder][inferjs-doc-builder] - A custom **JSDoc** builder that includes [**InferJS**][inferjs] type definitions. (_Coming Soon..._)

## ![Heading][arrow]&nbsp;&nbsp;InferJS: Installation

Here are the different options for installing the latest [**InferJS**][inferjs] package with `npm`. 

### Install [Locally]()
```sh
npm install inferjs
```

### Install [Globally]()
```sh
npm install -g inferjs
```
**_Optional_**: If you would like to download the package source code with `git`:
```sh
git clone https://github.com/Codevendor/inferjs.git
git clone https://github.com/Codevendor/inferjs-library.git
git clone https://github.com/Codevendor/inferjs-compiler.git
git clone https://github.com/Codevendor/inferjs-doc-builder.git
```



<!-- ABOUT THE PROJECT -->
## ![Heading][arrow]&nbsp;&nbsp;InferJS-Library: Package Overview

[**InferJS-Library**][inferjs-library] allows you to easily add runtime type checking by utilizing **JSDoc** multi-line comments in both client and server side **JavaScript**. The library is part of the package named [**InferJS**][inferjs]. 

[**InferJS**][inferjs] is provided with an [**InferJS-Compiler**][inferjs-compiler]. The compiler interprets your **JSDoc** comments from your source code and compiles them into an [**InferObject**][infer-object] file, that you can import into any **JavaScript** file. 

With this library, you can also enable extended type checking and narrow down your data types with `@infer` expectation rules. 

To view the repo and doumentation for the [**InferJS-Library**][inferjs-library].


## ![Heading][arrow]&nbsp;&nbsp;InferJS-Compiler: Package Overview

A compiler that processes **JSDoc** comments into an [**InferObject**][infer-object] file, for utilizing with the [**InferJS-Library**][inferjs-library]. The [**InferJS-Compiler**][inferjs-compiler] is part of a bigger project called [**InferJS**][inferjs]. The compiler can be used for other third party projects, that may need to interpret **JSDoc** comments into **JSON** type files.

To view the repo and doumentation for the [**InferJS-Compiler**][inferjs-compiler].



## ![Heading][arrow]&nbsp;&nbsp;InferJS-Doc-Builder: Package Overview

A custom **JSDoc** builder that includes [**InferJS**][inferjs] type definitions. (_Coming Soon..._)
















<!-- ROADMAP -->
## ![Heading][arrow]&nbsp;&nbsp;InferJS: Roadmap

- [[ Summer 2023 ]()] - Develop a custom JSDoc builder that incorporates **InferJS** definitions.
- [[ April 2023 ]()] - Create a plan for text localization with the **InferJS** repo.
- [[ March 2023 ]()] - First Release Date - Possible 
- [[ Feb 2023 ]()] - Make Distributon Plan and Library Versioning for browser with Webpack and Terser for JS minification.
- [[ Jan 25, 2023 ]()] - Under Development and Testing



<!-- CHANGELOG -->
## ![Heading][arrow]&nbsp;&nbsp;InferJS: Change Log

This will be moved to versioning record per each repo...

- [[ Feb 26, 2023]()] - Combine all InferJS tools into one `npm` package. 

- [[ Feb 12, 2023 ]()] - Built a logger class for managing console logging of CLI **InferJS-Compiler**. Built a starting help menu system.

- [[ Feb 11, 2023 ]()] - Working on assertion test scripts for both **InferJS-Library** and **InferJS-Compiler**. Opted for using Nodejs **test runner**.

- [[ Feb 10, 2023 ]()] - Adding output module type for **InferJS-Compiler**. Param **-output-file-options-module** accepts ( [_esmodule_]() | [_commonjs_]() | [_script_]() ). Defaults to [esmodule]().

- [[ Feb 9, 2023 ]()] - Creating _package.json_ files per project **InferJS-Library** and **InferJS-Compiler**. Also adding a global _package.json_ for whole **InferJS** repo, depending on the needs of the developer. Adding clean, build and test scripts to _packpage.json_.

- [[ Feb 8, 2023 ]()] - Building **v0.0.2** of **InferJS-Library**. Library was not returning exception properly. Modified **check()** method to throw by default and return if param(_returnException_) is set to true.

- [[ Feb 7, 2023 ]()] - Building [live example](https://inferjs.com/demo.html) on **InferJS.com** website.

- [[ Jan 31, 2023 ]()] - Built **package.json** with build commands for **webpack** configs, to automate the building and versioning of the library. Updated _readme.md_ with processes.

- [[ Jan 30, 2023 ]()] - Restructing **InferJSCompiler** for version package releases. Dist folder will conatin two sub folders, **latest** and **versions**.

- [[ Jan 29, 2023 ]()] - Changing the main **InferJS** repo structure to isolate projects and versioning. Redefined error type InferRuleError to InferExpectError.

- [[ Jan 27, 2023 ]()] - Added in **InferJS-Compiler** actions parse-list, parse-file-list. Removed bugs found in **InferJS-Compiler** and setup testing per action in **.vscode** launch and task files.

- [[ Jan 26, 2023 ]()] - Added in extended type checking to infer types. Updated **InferJS-Compiler** with terminal command argument processing.





## ![Heading][arrow]&nbsp;&nbsp;InferJS: Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Inside each `package` has information about contributing.





<!-- LICENSE -->
## <img height="28" width="29" src="https://github.com/Codevendor/inferjs/blob/main/assets/images/arrowright.png?raw=true" style="float:left;" />&nbsp;&nbsp;License

Distributed under the **MIT** License. See `LICENSE.txt` for more information.





## ![Heading][arrow]&nbsp;&nbsp;InferJS: Support Related
 - [**InferJS-Library** Documentation][library-docs] - Information documentation for the **InferJS-Library**.
 - [**InferJS-Library** Issues][library-issues] - Direct all questions about the **InferJS-Library**
 - [**InferJS-Compiler** Documentation][compiler-docs] - Information documentation for the **InferJS-Compiler**.
 - [**InferJS-Compiler** Issues][compiler-issues] - Direct all questions about the **InferJS-Compiler**.
 - [**InferJS-Doc-Builder** Documentation][doc-builder-docs] - Information documentation for the **InferJS-Doc-Builder**.
 - [**InferJS-Doc-Builder** Issues][doc-builder-issues] - Direct all questions about the **InferJS-Doc-Builder**.




<!-- ACKNOWLEDGMENTS -->
## ![Heading][arrow]&nbsp;&nbsp;InferJS: Acknowledgments

* [Codevendor](https://codevendor.com) - Thanks to developer: **Adam Smith** for creating `InferJS`.
* [JSDoc](https://jsdoc.app/) - Thanks to **Michael Mathews** and **Gabriel Reid** for creating `JSDoc`. 
* [Bunting Labs](https://buntinglabs.com) - Thanks to **Brendan Ashworth**, for transferring Ownership of npm Package name `inferjs`.









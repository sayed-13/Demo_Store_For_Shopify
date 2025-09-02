# A/B Testing

## Prequisite

**Install node version 13.14.0**


For help with the submodule git workflow, refer to [this](https://github.com/EchoLogyx/echo-ab-common/wiki) documentation
```
clone with submodule -> git clone <SSH Code> --recurse-submodules  (Example: git clone git@github.com:EchoLogyx/sitenco.git --recurse-submodules)
```

# Using the CLI


```
npm run cli
```
Jump to client
```
npm run cli -- -c
npm run cli -- --client
```
Jump to test
```
npm run cli -- -t
npm run cli -- --test
```
Jump to variation
```
npm run cli -- -v
npm run cli -- --variation
```
Do an audit (Makes sure everything is working correctly)
```
npm run cli -- -a
npm run cli -- --audit
```
Build code for the current variation
```
npm run cli -- -b
npm run cli -- --build
```
Build code for the current variation and copy minified version
```
npm run cli -- -b -m
npm run cli -- --build --minify
```
Copy CSS and JS differently into clipboard (Works on Windows 11 only) <br>
Enable/Access clipboard pressing `Win + V`
```
npm run cli -b --split
npm run cli --build --split
```
Check the current active test
```
npm run cli -- -p
npm run cli -- --pointer
```


<br>

-   Install Disable CSP
    -   Link
        - [Chrome](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/related?hl=en)

# To start hot-reloading
-   Install TamperMonkey or TamperSource
    -   Links
        - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
        - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- Use this snippet

```
// ==UserScript==
// @name         Shortcut tamper
// @noframes
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Hot reloading for scripts
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    const TAMPER_URI = 'http://localhost:4000/tamper';

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', TAMPER_URI);
    document.body.appendChild(scriptTag);
})();
```

### For websites that disables third-party socket connections
Use this snippet in the tamper-monkey extension
```
// ==UserScript==
// @name         Shortcut tamper
// @noframes
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Loading scripts with manual reload
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    const TAMPER_URI = 'http://localhost:4000/tamper-raw';

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', TAMPER_URI);
    document.body.appendChild(scriptTag);
})();
```

**NB: You'll have to manually reload the website after saving your changes.**

<br>
In the terminal:

```
npm start
```

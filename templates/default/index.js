import "./styles/index.scss";
/* DO NOT IMPORT ANYTHING */

function waitForElem(waitFor, callback, minElements = 1, isVariable = false, timer = 10000, frequency = 25) {
    let elements = isVariable ? window[waitFor] : document.querySelectorAll(waitFor);
    if (timer <= 0) return;
    (!isVariable && elements.length >= minElements) || (isVariable && typeof window[waitFor] !== "undefined") ? callback(elements) : setTimeout(() => waitForElem(waitFor, callback, minElements, isVariable, timer - frequency), frequency);
}

function mainCss() {
    var styles = document.createElement("style");
    styles.setAttribute("type", "text/css");
    document.head.appendChild(styles).textContent =
        "" +
        /* CSS will be imported here */
        "";
};
function mainJs(body) {
    mainCss();
    console.log('%cname: v-01', 'background: black;border: 2px solid green;color: white;display: block;text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);text-align: center;font-weight: bold;padding : 10px;margin : 10px');
    console.log('name: v-01');
}

waitForElem('body', mainJs);
// DYO.waitForElement (selector, callback, minElements, interval, maximumRetries)
// ==UserScript==
// @name                Idle Detection Bypasser
// @name:zh             绕过 Idle Detection
// @name:zh-CN          绕过 Idle Detection
// @namespace           https://github.com/flyhaozi
// @version             0.1.0
// @description         Give a fake active response to the caller of the Idle Detection API
// @description:zh      给 Idle Detection API 的调用者一个虚假的 active 响应
// @description:zh-CN   给 Idle Detection API 的调用者一个虚假的 active 响应
// @author              flyhaozi
// @match               https://*/*
// @match               http://*/*
// @grant               none
// ==/UserScript==

(function() {
    'use strict';
    if (!('IdleDetector' in window)) {
        return console.log('Idle Detector is not available.');
    }

    let callback = null;
    window.IdleDetector.prototype.addEventListener = function(type, listener, options) {
        callback = listener;

        console.log('Idle Detection Detected!');
    };
    window.IdleDetector.prototype.start = function() {
        Object.defineProperty(this, 'userState', { value: 'active', writable: false });
        Object.defineProperty(this, 'screenState', { value: 'unlocked', writable: false });
        callback && callback({ currentTarget: this, target: this });

        console.log('Idle Detection Bypassed!');
    };
})();

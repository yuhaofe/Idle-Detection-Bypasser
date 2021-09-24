---
title: Idle Detection Bypasser
description: Give a fake active response to the caller of the Idle Detection API.
---
## Idle Detection Bypasser
This userscript will give a fake active response to the caller of the Idle Detection API.

Normally, you don't have to use this script because you can deny the permission request directly.

You only need this script when the website refuses to provide service without the permission.

## Example - An online learning timer
Use this example to check if the userscript works.

The timer won't pause after enabling this userscript.

<div style="border: 1px solid grey; border-radius: 0.3rem; padding: 1rem;">
    <p>Idle Detection API support <span id="support">&#x274C; <small>Please upgrade to Chrome 94 or above to use our service.</small></span></p>
    <p>Idle Detection permission granted <span id="granted">&#x274C; <small>Please click here to allow the permission and use our service.</small></span></p>
    <p>You have learned for <strong><span id="count">0</span></strong> seconds. <span id="pause">&#x26a0; <small>Idle more than 60s will pause the timer!</small></span></p>
    <script>
        (function(){
            if (!('IdleDetector' in window)) {
                return;
            }
            document.querySelector('#support').innerHTML = '&#x2b55;';

            document.querySelector('#granted').addEventListener('click', async function(){
                const state = await IdleDetector.requestPermission();
                if (state !== 'granted') {
                    return;
                }
                document.querySelector('#granted').innerHTML = '&#x2b55;';

                let count = document.querySelector('#count');
                let interval = null;
                try {
                    const idleDetector = new IdleDetector();
                    idleDetector.addEventListener('change', () => {
                        const userState = idleDetector.userState;
                        const screenState = idleDetector.screenState;
                        if (userState === 'idle' || screenState === 'locked') {
                            interval && clearInterval(interval);
                            const pause = document.querySelector('#pause');
                            pause.innerHTML = '&#x274C; <small>Idle Detected! Click here to continue learning.</small>';
                            pause.addEventListener('click', function(){
                                pause.innerHTML = '&#x26a0; <small>Idle more than 60s will pause the timer!</small>';
                                interval = setInterval(function(){
                                    count.innerText = parseInt(count.innerText) + 1;
                                }, 1000);
                            }, { once: true });
                        }
                    });
                    await idleDetector.start({
                        threshold: 60000
                    });
                    interval = setInterval(function(){
                        count.innerText = parseInt(count.innerText) + 1;
                    }, 1000);
                } catch (err) {
                    console.error(err.name, err.message);
                }
            });
        })();
    </script>
</div>

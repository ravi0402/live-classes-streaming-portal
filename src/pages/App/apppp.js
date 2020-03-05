'use strict';

//require('./scripts/impartusVC');

/**
 * Testing
 * @type {adminApi}
 */
//var adminApi = require('./testApp/adminApi.js');
adminApis.apiKey = 'testKey';
adminApis.apiSecret = 'valhalla';
adminApis.controllerURL = '';

var _clientToken, _newSessionId, _sessionObj, _streamHash = {}, _subscriberHash = {};

var buttonCreateSession = document.getElementById('button-create-session');
var buttonGenToken = document.getElementById('button-generate-token');
var buttonJoinSession = document.getElementById('button-join-session');
var buttonConnect = document.getElementById('button-connect');
var buttonDisconnect = document.getElementById('button-disconnect');

var inputCamId = document.getElementById('camId');
var inputSessionId = document.getElementById('session-id');

var networkScore = document.getElementById('networkScore');

var videosource = document.getElementById('videosource');
var audiosource = document.getElementById('audiosource');
var videoPublished = document.getElementById('video-published');
var audioPublished = document.getElementById('audio-published');

var buttonGetDevices = document.getElementById('button-getdevices');
var buttonPublish = document.getElementById('button-publish');
var buttonPublishStream = document.getElementById('button-publish-stream');
var buttonStopPublish = document.getElementById('button-stop-publish');
var buttonGetStats = document.getElementById('button-get-stats');
var buttonPublishCanvas = document.getElementById('button-publish-canvas');
var buttonReplaceCanvasTrack = document.getElementById('button-change-canvastrack');
var buttonStopCanvas = document.getElementById('button-stop-canvas');
var inputScreenCapture = document.getElementById('extension-id');
var buttonRegisterExtension = document.getElementById('register-extension');
var buttonPublishDesktop = document.getElementById('button-publish-desktop');
var buttonStopPublishDesktop = document.getElementById('button-stop-desktop-publish');

var buttonFetch = document.getElementById('button-fetch');
var buttonFetchAudio = document.getElementById('button-fetch-audio');
var buttonFetchDuplicate = document.getElementById('button-fetch-duplicate');
var buttonStopFetch = document.getElementById('button-stop-fetch');

var webcamStatsTimer = null;

buttonCreateSession.addEventListener('click', function (element, event) {
    buttonCreateSession.classList.add('disabled');
    adminApis.createSession({ mediaMode: 'routed', duration: 500 }).then(function (newSessionId) {
        _newSessionId = newSessionId;
        document.getElementById('button-create-session').innerText = 'Created SessionId: ' + _newSessionId;
        inputSessionId.value = _newSessionId;
        dispLog('createSession', 'Created Session Id: ' + _newSessionId);
        buttonCreateSession.classList.remove('disabled');
    }, function (error) {
        Logger.info('Create session failed with error: ', error);
        buttonCreateSession.classList.remove('disabled');
        dispLog('createSession', 'Created session failed ' + error);
    });
});

buttonGenToken.addEventListener('click', function (element, event) {
    var sessionId = inputSessionId.value || _newSessionId;
    if (!sessionId) {
        alert('SessionId is needed');
        return;
    }
    buttonGenToken.classList.add('disabled');

    adminApis.generateToken(sessionId).then(function (ct) {
        dispLog('generateToken', 'Token generated: ' + ct);
        Logger.info('Token: ', ct);
        _clientToken = ct;
        buttonGenToken.classList.remove('disabled');
    }, function (e) {
        dispLog('generateToken', 'Token generation failed.' + e);
        Logger.info('Token generation failed.', e);
        buttonGenToken.classList.remove('disabled');
    });
});

buttonJoinSession.addEventListener('click', function (element, event) {

    //controllerURL, sessionId, authToken, cb
    var sessionId = inputSessionId.value || _newSessionId;
    if (!sessionId) {
        alert('SessionId is needed');
        return;
    }

    if (!_clientToken) {
        alert('token is needed, please generate a token');
        return;
    }

    _sessionObj = ImpartusVC.initSession(adminApis.controllerURL, adminApis.apiKey, sessionId);
    dispLog('initSession', 'initSession done');

    /**
     sessionConnected - User is connected to the server
  
     sessionConnectFailed - User is connection to the server failed
  
     sessionReconnecting - User is connecting to the server
  
     sessionDisconnected - User disconnected
  
     sessionReconnected - User reconnected
  
     connectionCreated: 'peerJoined' - User has joined room
  
     connectionDestroyed: 'peerLeft' - User has left the room
  
     streamCreated: 'incomingStream' - User is publishing in the room
  
     streamDestroyed: 'streamEnded' - User has stopped his stream to the room
  
     streamPropertyChanged - User has muted/unmuted the Audio/Video in the stream
     */

    _sessionObj.off();
    _sessionObj.on({
        connectionCreated: function (event) {
            dispLog('connectionCreated', event);
            Logger.info('[Event] connectionCreated event got fired: ', event);
        },
        connectionDestroyed: function (event) {
            dispLog('connectionDestroyed', event);
            Logger.info('[Event] connectionDestroyed event got fired: ', event);
        },
        sessionConnected: function (event) {
            dispLog('sessionConnected', event);
            Logger.info('[Event] sessionConnected event got fired: ', event);
            buttonConnect.classList.remove('disabled');
        },
        sessionConnectFailed: function (event) {
            dispLog('sessionConnectFailed', event);
            Logger.info('[Event] sessionConnectFailed event got fired: ', event);
            buttonConnect.classList.remove('disabled');
        },
        sessionReconnecting: function (event) {
            dispLog('sessionReconnecting', event);
            Logger.info('[Event] sessionReconnecting event got fired: ', event);
        },
        sessionDisconnected: function (event) {
            dispLog('sessionDisconnected', event);
            Logger.info('[Event] sessionDisconnected event got fired: ', event);
        },
        sessionReconnected: function (event) {
            dispLog('sessionReconnected', event);
            Logger.info('[Event] sessionReconnected event got fired: ', event);
        },
        streamCreated: function (publisher) {
            _streamHash[publisher.stream.streamId] = publisher.stream;
            dispLog('streamCreated', publisher);
            Logger.info('[Event] streamCreated event got fired with stream: ', publisher);

            if (localStorage.getItem('autofetch')) {
                Logger.info('Autofetch: subscribing to ' + publisher.stream.streamId);
                _subscriberHash[publisher.stream.streamId] = {
                    "subscriber": _sessionObj.subscribe(_streamHash[publisher.stream.streamId], 'remote-video', {
                        insertMode: 'append',
                        showControls: true,
                        videoAttributes: {
                            id: 'remotevid' + publisher.stream.streamId,
                            another: 'another',
                            classList: 'new-class'
                        }
                    }, function (error) {
                        if (error) {
                            Logger.info('Error from subscribe: ', error);
                        } else {
                            if (_subscriberHash[publisher.stream.streamId].statsTimer) {
                                clearInterval(_subscriberHash[publisher.stream.streamId].statsTimer);
                            }
                            _subscriberHash[publisher.stream.streamId].statsTimer = setInterval(function () {
                                if (_subscriberHash[publisher.stream.streamId].subscriber) {
                                    _subscriberHash[publisher.stream.streamId].subscriber.getStats(function (e, stats) {
                                        if (e) {
                                            return dispLog(e);
                                        }
                                        dispLog("Subscribe Stats", stats);
                                    });
                                }
                            }, 10000);
                            Logger.info('subscribe callback for:' + publisher.stream.streamId);
                        }
                    })
                }
            }

            inputCamId.innerHTML = '<option selected value>Select Camera Id</option>';

            var disabled;
            for (var streamId in _streamHash) {
                disabled = false;

                if (ImpartusVC.sessionObj.vcServerManager.ownConnectionId == _streamHash[streamId].connection.connectionId) {
                    disabled = true;
                }


                if (disabled) {
                    inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\' disabled>' + streamId + '</option>';
                } else {
                    inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\'>' + streamId + '</option>';
                }
            }
        },
        streamDestroyed: function (publisher) {
            delete _streamHash[publisher.stream.streamId];
            dispLog('streamDestroyed', publisher);
            Logger.info('[Event] streamDestroyed event got fired with stream: ', publisher);

            inputCamId.innerHTML = '<option selected value>Select Camera Id</option>';

            var disabled;
            for (var streamId in _streamHash) {
                disabled = false;
                if (ImpartusVC.sessionObj.vcServerManager.ownConnectionId == _streamHash[streamId].connection.connectionId) {
                    disabled = true;
                }

                if (disabled) {
                    inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\' disabled>' + streamId + '</option>';
                } else {
                    inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\'>' + streamId + '</option>';
                }
            }

            if (localStorage.getItem('autofetch')) {
                Logger.info('Autofetch: calling unsubscribe for ' + publisher.stream.streamId);
                if (_subscriberHash[publisher.stream.streamId]) {
                    if (_subscriberHash[publisher.stream.streamId].statsTimer) {
                        clearInterval(_subscriberHash[publisher.stream.streamId].statsTimer);
                    }
                    _sessionObj.unsubscribe(_subscriberHash[publisher.stream.streamId].subscriber);
                }
            } else {
                if (_subscriberHash[publisher.stream.streamId] && _subscriberHash[publisher.stream.streamId].statsTimer) {
                    clearInterval(_subscriberHash[publisher.stream.streamId].statsTimer);
                }
            }
        },
        streamPropertyChanged: function (event) {
            dispLog('streamPropertyChanged', event);
            Logger.info('[Event] streamPropertyChanged event got fired: ', event);
            var vidElement = document.getElementById('remotevid' + event.stream.streamId);
            if (event && event.stream && event.changedProperty == 'hasVideo' && event.newValue == false) {
                vidElement.pause();
            }
            if (event && event.stream && event.changedProperty == 'hasVideo' && event.newValue == true) {
                vidElement.play();
            }
        },
        networkQuality: function (event) {
            //dispLog('networkQuality', event);
            networkScore.innerHTML = event.networkQuality;
            //Logger.info('[Event] networkQuality event got fired: ', event);
        }
    });

    ImpartusVC.off();
    ImpartusVC.on('exception', function (error) {
        alert('Exception Occured: ' + error.message);
    });
});

buttonConnect.addEventListener('click', function (element, event) {
    //controllerURL, sessionId, authToken, cb
    var sessionId = inputSessionId.value || _newSessionId;
    if (!sessionId) {
        alert('SessionId is needed');
        return;
    }

    if (!_clientToken) {
        alert('token is needed, please generate a token');
        return;
    }

    buttonConnect.classList.add('disabled');

    _sessionObj.connect(_clientToken, function (error) {
    });
});

buttonDisconnect.addEventListener('click', function (element, event) {
    //controllerURL, sessionId, authToken, cb
    var sessionId = inputSessionId.value || _newSessionId;
    if (!sessionId) {
        alert('SessionId is needed');
        return;
    }

    if (!_clientToken) {
        alert('token is needed, please generate a token');
        return;
    }

    _sessionObj.disconnect();
});

var webcamPublisher;
buttonGetDevices.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    if (!_sessionObj.vcSessionService.joined) {
        alert('Session is not connected');
        return;
    }

    ImpartusVC.getDevices(function (error, devices) {
        if (error) {
            Logger.info('getDevices callback error: ', error);
        } else {
            Logger.info('getDevices messages success: ', devices);
            dispLog('getDevices', devices);


            videosource.innerHTML = devices.map(function (source, index) {
                if (source.kind == 'videoinput') {
                    return `<option ${index == 0 ? 'selected' : ''} value='${source.deviceId}'> ${source.label} </option>`;
                } else
                    return '';
            }).join('\n');

            videosource.innerHTML = '<option disabled value>Select Video Source </option>' + '\n' + videosource.innerHTML + '\n' +
                '<option value=\'null\'> None </option>';

            audiosource.innerHTML = devices.map(function (source, index) {
                if (source.kind == 'audioinput') {
                    return `<option ${index == 0 ? 'selected' : ''} value='${source.deviceId}'> ${source.label} </option>`;
                } else
                    return '';
            }).join('\n');

            audiosource.innerHTML = '<option disabled value>Select Audio Source </option>' + '\n' + audiosource.innerHTML;
        }
    });
});

buttonPublish.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    if (!_sessionObj.vcSessionService.joined) {
        alert('Session is not connected');
        return;
    }

    webcamPublisher = ImpartusVC.initPublisher('webcam', {
        name: 'webcam',
        videoSource: videosource.value == 'null' ? null : videosource.value,
        audioSource: audiosource.value || true,
        showControls: true,
        publishAudio: audioPublished.checked,
        publishVideo: videoPublished.checked,
        ratio: "4:3",
        facingMode: ImpartusVC.isMobile ? 'user' : undefined,
        videoAttributes: {
            id: 'video-tag',
            classList: 'new-class'
        }
    }, function (error, messages) {
        if (error) {
            Logger.info('initPublisher callback error: ', error);
        } else {
            Logger.info('initPublisher messages success: ', messages);

            _sessionObj.publish(webcamPublisher, function (error, messages) {
                if (error) {
                    Logger.info('publish webcam callback error: ', error);
                } else {
                    Logger.info('publish webcam messages success: ', messages);
                }
            });
        }
    });

    webcamPublisher.on({
        'streamCreated': function (d) {
            dispLog('webcamPublisher.streamCreated', d);
            if (webcamStatsTimer) {
                clearInterval(webcamStatsTimer);
            }
            webcamStatsTimer = setInterval(function () {
                if (webcamPublisher) {
                    webcamPublisher.getStats(function (e, stats) {
                        if (e) {
                            return dispLog(e);
                        }
                        dispLog("Webcam Stats", stats);
                    });
                }
            }, 10000);
        },
        'streamDestroyed': function (d) {
            dispLog('webcamPublisher.streamDestroyed', d);
            if (webcamStatsTimer) {
                clearInterval(webcamStatsTimer);
            }
        }
    });

});

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
ctx2.filter = 'invert(1)';
var canvasPublisher, canvasStream1, canvasStream2, currCanvasStream;

buttonPublishCanvas.addEventListener('click', function (element, event) {

    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    if (!_sessionObj.vcSessionService.joined) {
        alert('Session is not connected');
        return;
    }

    var video = document.createElement('video');

    video.src = '/assets/Big_Buck_Bunny_small.ogv';
    video.muted = true;
    video.addEventListener('loadeddata', function () {
        video.play();
    });

    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                ctx.drawImage($this, 0, 0);
                ctx2.drawImage($this, 0, 0);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();

        canvas.width = 230;
        canvas.height = 125;

        canvas2.width = 230;
        canvas2.height = 125;
        ctx2.filter = 'invert(1)';

        canvasStream1 = canvas.captureStream(25);
        canvasStream2 = canvas2.captureStream(25);

        canvasPublisher = ImpartusVC.initPublisher(null, {
            name: 'canvas',
            videoSource: canvasStream1,
            audioSource: null,
            showControls: true,
            publishAudio: false,
            publishVideo: videoPublished.checked,
            facingMode: ImpartusVC.isMobile ? 'user' : undefined
        }, function (error, messages) {
            if (error) {
                Logger.info('initPublisher callback error: ', error);
            } else {
                Logger.info('initPublisher messages success: ', messages);

                _sessionObj.publish(canvasPublisher, function (error, messages) {
                    if (error) {
                        Logger.info('publish webcam callback error: ', error);
                    } else {
                        Logger.info('publish webcam messages success: ', messages);
                    }
                });
            }
        });

        canvasPublisher.on({
            'streamCreated': function (d) {
                dispLog('canvasPublisher.streamCreated', d);
                if (canvasStatsTimer) {
                    clearInterval(canvasStatsTimer);
                }
                canvasStatsTimer = setInterval(function () {
                    if (canvasPublisher) {
                        canvasPublisher.getStats(function (e, stats) {
                            if (e) {
                                return dispLog(e);
                            }
                            dispLog("Canvas Stats", stats);
                        });
                    }
                }, 10000);
            },
            'streamDestroyed': function (d) {
                dispLog('canvasPublisher.streamDestroyed', d);
                if (canvasStatsTimer) {
                    clearInterval(canvasStatsTimer);
                }
            }
        });
    }, 0);
});

var canvasStatsTimer;

buttonReplaceCanvasTrack.addEventListener('click', function (element, event) {

    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    currCanvasStream = (currCanvasStream == canvasStream2) ? canvasStream1 : canvasStream2;
    canvasPublisher.replaceVideoTrack(currCanvasStream.getVideoTracks()[0]);
});

buttonStopCanvas.addEventListener('click', function (element, event) {
    _sessionObj.unpublish(canvasPublisher);
});

var streamObj;

buttonPublishStream.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    if (!_sessionObj.vcSessionService.joined) {
        alert('Session is not connected');
        return;
    }

    var streamCreate_p = Promise.resolve(streamObj);

    if (!streamObj) {
        streamCreate_p = navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
    }

    streamCreate_p.then(function (stream) {
        streamObj = stream;

        webcamPublisher = ImpartusVC.initPublisher('webcam', {
            name: 'stream',
            videoSource: stream,
            audioSource: true,
            showControls: true,
            publishAudio: audioPublished.checked,
            publishVideo: videoPublished.checked,
            facingMode: ImpartusVC.isMobile ? 'user' : undefined
        }, function (error, messages) {
            if (error) {
                Logger.info('initPublisher callback error: ', error);
            } else {
                Logger.info('initPublisher messages success: ', messages);

                _sessionObj.publish(webcamPublisher, function (error, messages) {
                    if (error) {
                        Logger.info('publish webcam callback error: ', error);
                    } else {
                        Logger.info('publish webcam messages success: ', messages);
                    }
                });
            }
        });

        webcamPublisher.on({
            'streamCreated': function (d) {
                dispLog('webcamPublisher.streamCreated', d);
            },
            'streamDestroyed': function (d) {
                dispLog('webcamPublisher.streamDestroyed', d);
            }
        });
    }, function (error) {
    });
});

videoPublished.addEventListener('change', function () {
    if (!!webcamPublisher) {
        webcamPublisher.publishVideo(videoPublished.checked);
    }
});

audioPublished.addEventListener('change', function () {
    if (!!webcamPublisher) {
        webcamPublisher.publishAudio(audioPublished.checked);
    }
});

buttonRegisterExtension.addEventListener('click', function (element, event) {
    if (ImpartusVC.browserDetails.browser == 'chrome' && inputScreenCapture.value) {
        // alert('Extension Id is needed');
        ImpartusVC.registerScreenSharingExtension(ImpartusVC.browserDetails.browser, inputScreenCapture.value);
    }

    ImpartusVC.checkScreenSharingCapability(function (response) {
        Logger.info('checkScreenSharingCapability: ', response);
        if (response && !response.supported) {
            alert('Screen Capture Extension is not Supported in the this Browser');
        } else {
            alert(JSON.stringify(response))
        }
    });
});

var screenPublisher;
buttonPublishDesktop.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    if (!_sessionObj.vcSessionService.joined) {
        alert('Session is not connected');
        return;
    }

    screenPublisher = ImpartusVC.initPublisher('desktop', {
        videoSource: 'application',
        showControls: true
    }, function (error, messages) {
        if (error) {
            Logger.info('initPublisher callback error: ', error);
        } else {
            Logger.info('initPublisher messages success: ', messages);

            _sessionObj.publish(screenPublisher, function (error, messages) {
                if (error) {
                    Logger.info('publish desktop callback error: ', error);
                } else {
                    Logger.info('publish desktop messages success: ', messages);
                }
            });
        }
    });

    screenPublisher.on({
        'streamCreated': function (d) {
            dispLog('screenPublisher.streamCreated', d);
        },
        'streamDestroyed': function (d) {
            dispLog('screenPublisher.streamDestroyed', d);
        }
    });
});

buttonStopPublish.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    _sessionObj.unpublish(webcamPublisher, streamObj);
    if (webcamStatsTimer) {
        clearInterval(webcamStatsTimer);
    }
});

buttonGetStats.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    if (!webcamPublisher) {
        dispLog("Publisher stats", "Webcam stream has not been published yet.");
    }
    webcamPublisher.getStats(function (e, stats) {
        if (e) {
            return dispLog(e);
        }
        dispLog("Publisher Stats", stats);
    });
});

buttonStopPublishDesktop.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    _sessionObj.vcStreamsService.unpublish(screenPublisher);
});

buttonFetch.addEventListener('click', function (element, event) {

    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    var tmpVar = inputCamId.value;

    if (!tmpVar) {
        alert('Please select a stream');
        return;
    }

    if (!tmpVar || !_streamHash[inputCamId.value]) {
        alert('Invalid Stream');
        return;
    }

    _subscriberHash[inputCamId.value] = {
        subscriber: _sessionObj.subscribe(_streamHash[inputCamId.value], 'remote-video', {
            insertMode: 'append',
            showControls: true,
            videoAttributes: {
                id: 'remotevid' + inputCamId.value,
                another: 'another',
                classList: 'new-class'
            }
        }, function (error) {
            if (error) {
                Logger.info('Error from subscribe: ', error);
            } else {
                if (_subscriberHash[inputCamId.value].statsTimer) {
                    clearInterval(_subscriberHash[inputCamId.value].statsTimer);
                }
                _subscriberHash[inputCamId.value].statsTimer = setInterval(function () {
                    if (_subscriberHash[inputCamId.value].subscriber) {
                        _subscriberHash[inputCamId.value].subscriber.getStats(function (e, stats) {
                            if (e) {
                                return dispLog(e);
                            }
                            dispLog("Subscribe Stats", stats);
                        });
                    }
                }, 10000);
                Logger.info('subscribe callback for:' + tmpVar);
            }
        })
    };
});

buttonFetchAudio.addEventListener('click', function (element, event) {

    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }
    var tmpVar = inputCamId.value;

    if (!tmpVar) {
        alert('Please select a stream');
        return;
    }

    if (!tmpVar || !_streamHash[inputCamId.value]) {
        alert('Invalid Stream');
        return;
    }

    _subscriberHash[inputCamId.value] = {
        subscriber: _sessionObj.subscribe(_streamHash[inputCamId.value], 'remote-video', {
            insertMode: 'append',
            showControls: true,
            audioOnly: true,
            videoAttributes: {
                id: 'remote-video-tag',
                another: 'another',
                classList: 'new-class'
            }
        }, function (error) {
            if (error) {
                Logger.info('Error from subscribe: ', error);
            } else {
                if (_subscriberHash[inputCamId.value].statsTimer) {
                    clearInterval(_subscriberHash[inputCamId.value].statsTimer);
                }
                _subscriberHash[inputCamId.value].statsTimer = setInterval(function () {
                    if (_subscriberHash[inputCamId.value].subscriber) {
                        _subscriberHash[inputCamId.value].subscriber.getStats(function (e, stats) {
                            if (e) {
                                return dispLog(e);
                            }
                            dispLog("Subscribe Stats", stats);
                        });
                    }
                }, 10000);
                Logger.info('subscribe callback for:' + tmpVar);
            }
        })
    }
});


buttonStopFetch.addEventListener('click', function (element, event) {
    if (!_sessionObj) {
        alert('Session is not there');
        return;
    }

    if (_subscriberHash[inputCamId.value].statsTimer) {
        clearInterval(_subscriberHash[inputCamId.value].statsTimer);
    }
    _sessionObj.unsubscribe(_subscriberHash[inputCamId.value].subscriber);
});


buttonFetchDuplicate.addEventListener('click', function (element, event) {
    var ddd = document.createElement('div');
    ddd.style.width = '300px';
    ddd.style.height = '300px';
    document.body.appendChild(ddd);
    var vidOptions = {
        insertMode: 'append',
        showControls: true,
        audioOnly: true,
        videoAttributes: {
            id: 'duplicate-video-tag' + Math.round(10000 * Math.random()),
            another: 'another',
            classList: 'new-class'
        }
    };
    _subscriberHash[inputCamId.value].subscriber.addDiv(ddd, vidOptions);
});

var scrollTimeout;

function dispLog(ev, info) {
    if (typeof info === 'object') {
        info = JSON.stringify(info);
    }
    var div = document.getElementById('logs');
    document.getElementById('logs').innerHTML += `<b>${ev}</b>:<i>${info}</i><br>`;


    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
        ImpartusVC.scrollTo(div, div.scrollHeight, 500);
    }, 500);
}

var vcWrap = document.getElementById('vc-wrap');
var footer = document.getElementById('footer');
var buttonShowCtrls = document.getElementById('ctrls-display');

var _footerTimeout;

window.isMobile = false;
if ((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))) {
    window.isMobile = true;
}

function footerDisplay(event) {

    // Logger.info('Footer display event: ', event);

    footer.classList.remove('hide');
    vcWrap.classList.remove('large-div');
    buttonShowCtrls.classList.add('hide');


    clearTimeout(_footerTimeout);
    _footerTimeout = setTimeout(function () {
        footer.classList.add('hide');
        vcWrap.classList.add('large-div');
        buttonShowCtrls.classList.remove('hide');
    }, 5000);
}

if (window.isMobile) {
    // footer.classList.add('hide');
    // vcWrap.classList.add('large-div');
    // buttonShowCtrls.classList.remove('hide');

    document.getElementById('show-ctrls').addEventListener('click', footerDisplay);

    footer.addEventListener('touchstart', footerDisplay);
    footer.addEventListener('mousemove', footerDisplay);
    footer.addEventListener('mousedown', footerDisplay);
    footer.addEventListener('keydown', footerDisplay);

    footerDisplay();
} else {
    // footer.classList.remove('hide');
    // vcWrap.classList.remove('large-div');
    // buttonShowCtrls.classList.add('hide');
}
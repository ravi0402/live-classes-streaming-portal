import { hot } from "react-hot-loader/root";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import _ from 'lodash';
import cx from 'classnames';
import Draggable, { DraggableCore } from 'react-draggable';
import Chat from '../../common/Chat';
import Header from '../../common/Header';
import ErrorCase from '../../common/ErrorCases';
import styles from "./index.scss";
import * as constants from '../../constants';

export function TutorPage() {
    const lhsRef = useRef(null);
    let networkScore;
    // const backendUrl = 'http://10.50.168.177:5555/';
    const backendUrl = 'http://localhost:3000/';
    const [sessionId, setSessionId] = useState("");
    const [token, setToken] = useState("");
    const [_sessionObj, setSessionObj] = useState({});
    const [_publisherObj, setPublisherObj] = useState({});
    const [_remoteSubscriberObject, setRemoteSubscriberVideo] = useState({});
    const [_streamHash, setStreamHash] = useState({});
    const [_subscriberHash, setSubscriberHash] = useState({});
    const [inputCamId, setInputCamId] = useState({});
    const [_streamId, setStreamId] = useState("");
    const [streamsMap, setStreamsMap] = useState([]);
    const [selectedStream, setSelectedStream] = useState("");
    const [studentView, setStudentView] = useState(false);
    const [_screenPublisher, setScreenPublisher] = useState({});
    const [enabledDesktopSharing, setDesktopSharing] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0)
    const [offsetHeight, setOffsetHeight] = useState(0);
    const [showErrorAnimation, setErrorAnimation] = useState(false);
    const [isVideoEnabled, toggleVideo] = useState(true);
    const [isAudioEnabled, toggleAudio] = useState(true);
    const [isDivsSwitched, toggleStreamDivs] = useState(false);
    const [isDragging, setDragging] = useState(false);

    const headerObj = {
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    };

    useEffect(() => {
        addEventListeners();
    }, _sessionObj.id);

    useLayoutEffect(() => {
        const current = _.get(lhsRef, 'current', 0);
        console.log(current);
        const { offsetWidth, offsetHeight } = current;
        setOffsetHeight(offsetHeight);
        console.log('offsetWidth', offsetWidth);
        if (offsetWidth && containerWidth !== offsetWidth) {
            setContainerWidth(offsetWidth);
        }
    })

    const addEventListeners = () => {
        console.log('_sessionObj------------------', _sessionObj);
        !_.isEmpty(_sessionObj) && _sessionObj.on({
            streamCreated: function (publisher) {
                setStreamHash({
                    ..._streamHash,
                    [publisher.stream.streamId]: publisher.stream
                })
                setSelectedStream(publisher.stream.streamId)

                console.log('streamCreated', publisher);
                console.log('[Event] streamCreated event got fired with stream: ', publisher);

                if (localStorage.getItem('autofetch')) {
                    // ('Autofetch: subscribing to ' + publisher.stream.streamId);

                    console.log('Autofetch: subscribing to ', _subscriberHash, publisher);
                    setSubscriberHash({
                        ..._subscriberHash,
                        [publisher.stream.streamId]: {
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
                                    console.log('Error from subscribe: ', error);
                                } else {
                                    if (_subscriberHash[publisher.stream.streamId].statsTimer) {
                                        clearInterval(_subscriberHash[publisher.stream.streamId].statsTimer);
                                    }
                                    _subscriberHash[publisher.stream.streamId].statsTimer = setInterval(function () {
                                        if (_subscriberHash[publisher.stream.streamId].subscriber) {
                                            _subscriberHash[publisher.stream.streamId].subscriber.getStats(function (e, stats) {
                                                if (e) {
                                                    console.error(e);
                                                }
                                                console.error("Subscribe Stats", stats);
                                            });
                                        }
                                    }, 10000);
                                    console.log('subscribe callback for:' + publisher.stream.streamId);
                                }
                            })
                        }
                    })
                }
            },
            connectionDestroyed: function (event) {
                alert('connectionDestroyed', event);
                console.log('[Event] connectionDestroyed event got fired: ', event);
            },
            sessionConnected: function (event) {
                // alert('sessionConnected', event);
                console.log('[Event] sessionConnected event got fired: ', event);
                // buttonConnect.classList.remove('disabled');
            },
            sessionConnectFailed: function (event) {
                alert('sessionConnectFailed', event);
                console.log('[Event] sessionConnectFailed event got fired: ', event);
                // buttonConnect.classList.remove('disabled');
            },
            sessionReconnecting: function (event) {
                alert('sessionReconnecting', event);
                console.log('[Event] sessionReconnecting event got fired: ', event);
            },
            sessionDisconnected: function (event) {
                alert('sessionDisconnected', event);
                console.log('[Event] sessionDisconnected event got fired: ', event);
            },
            sessionReconnected: function (event) {
                alert('sessionReconnected', event);
                console.log('[Event] sessionReconnected event got fired: ', event);
            },
            streamDestroyed: function (publisher) {
                delete _streamHash[publisher.stream.streamId];
                // alert('streamDestroyed', publisher);
                console.log('[Event] streamDestroyed event got fired with stream: ', publisher);

                inputCamId.innerHTML = '<option selected value>Select Camera Id</option>';

                var disabled;
                for (var streamId in _streamHash) {
                    disabled = false;
                    if (window.ImpartusVC.sessionObj.vcServerManager.ownConnectionId == _streamHash[streamId].connection.connectionId) {
                        disabled = true;
                    }

                    if (disabled) {
                        inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\' disabled>' + streamId + '</option>';
                    } else {
                        inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\'>' + streamId + '</option>';
                    }
                }

                if (localStorage.getItem('autofetch')) {
                    console.log('Autofetch: calling unsubscribe for ' + publisher.stream.streamId);
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
                alert('streamPropertyChanged', event);
                console.log('[Event] streamPropertyChanged event got fired: ', event);
                var vidElement = document.getElementById('remotevid' + event.stream.streamId);
                if (event && event.stream && event.changedProperty == 'hasVideo' && event.newValue == false) {
                    vidElement.pause();
                }
                if (event && event.stream && event.changedProperty == 'hasVideo' && event.newValue == true) {
                    vidElement.play();
                }
            },
            networkQuality: function () {
                //alert('networkQuality', event);
                // networkScore.innerHTML = event.networkQuality;
                //console.log('[Event] networkQuality event got fired: ', event);
            }
        });
    }

    const handleDivSwitch = () => {
        if (isDragging) {
            setDragging(false)
            return
        }
        console.log('here last I think', isDragging);
        toggleStreamDivs(!isDivsSwitched);
    }

    const pauseVideo = () => {
        _publisherObj.publishVideo(!isVideoEnabled);
    }

    const muteAudio = () => {
        _publisherObj.publishAudio(!isAudioEnabled);
    }

    const unsubscribeStream = () => {
        _sessionObj.unsubscribe(_remoteSubscriberObject);
    }

    const handleSessionChange = (e) => {
        setSessionId(e.target.value);
    }

    //   const handleStreamFetch = (e) => {
    //     console.log('handleStreamFetch---------------', e.target.value);
    //     const strm = _streamHash[e.target.value];
    //     console.log('strm-----------', strm);
    //     // setSessionId(e.target.value)
    //   }

    const startTeacherSession = () => {
        const myRequest = new Request(`${backendUrl}create-session/`, {
            method: 'GET',
            ...headerObj
        });
        fetch(myRequest).then(
            response => response.json()
        ).then(
            json => {
                console.log(json);
                setSessionId(json.sessionId)
                let sessionObj = window.ImpartusVC.initSession('https://vcapitest.impartus.com', 'testKey', json.sessionId);
                console.log('_sessionObj----------------', sessionObj);
                setSessionObj(sessionObj);

                //FETCH
                fetch(`${backendUrl}generate-session/`, {
                    method: 'post',
                    ...headerObj,
                    body: JSON.stringify({ sessionId: json.sessionId })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    setToken(data.clientToken)

                    //CONNECT
                    sessionObj.connect(data.clientToken, error => {
                        console.log('error-connecting', error);
                    });

                    //FETCH DEVICES
                    window.ImpartusVC.getDevices((error, devices) => {
                        console.log('error-getting-devices', error);
                        console.log('devices=', devices);
                    });

                    //INIT PUBLISHER
                    const publisherObj = window.ImpartusVC.initPublisher('publisher-video', {
                        videoSource: "6e4d28eea34915d58ad2e632c6b857bfc2c5747b1fec109350aad085aa67605f",
                        audioSource: true,
                        showControls: false,
                        publishAudio: true,
                        publishVideo: true,
                        facingMode: window.ImpartusVC.isMobile ? 'user' : undefined
                    }, (error, messages) => {
                        // console.log('error', error);
                    });
                    setPublisherObj(publisherObj);


                    sessionObj.publish(publisherObj, function (error, messages) {
                        console.log('messages--------------', messages);
                    });
                });
            }
        );
    }

    const shareDesktop = () => {

        if (enabledDesktopSharing) {
            if (!_sessionObj) {
                alert('Session is not there');
                return;
            }
            _sessionObj.vcStreamsService.unpublish(_screenPublisher);
            setDesktopSharing(false);
            return;
        }

        if (!_sessionObj) {
            alert('Session is not there');
            return;
        }
        if (!_sessionObj.vcSessionService.joined) {
            alert('Session is not connected');
            return;
        }

        if (window.ImpartusVC.browserDetails.browser == 'chrome') {
            // alert('Extension Id is needed');
            window.ImpartusVC.registerScreenSharingExtension(window.ImpartusVC.browserDetails.browser);
        }

        window.ImpartusVC.checkScreenSharingCapability(function (response) {
            console.log('checkScreenSharingCapability: ', response);
            if (response && !response.supported) {
                alert('Screen Capture Extension is not Supported in the this Browser');
            } else {
                // alert(JSON.stringify(response))
            }
        });

        let screenPublisher = window.ImpartusVC.initPublisher('desktop', {
            videoSource: 'application',
            showControls: true
        }, function (error, messages) {
            if (error) {
                console.log('initPublisher callback error: ', error);
            } else {
                console.log('initPublisher messages success: ', messages);

                _sessionObj.publish(screenPublisher, function (error, messages) {
                    if (error) {
                        console.log('publish desktop callback error: ', error);
                    } else {
                        console.log('publish desktop messages success: ', messages);
                        setDesktopSharing(true)
                    }
                });
            }
        });

        screenPublisher.on({
            'streamCreated': function (d) {
                console.log('screenPublisher.streamCreated', d);
            },
            'streamDestroyed': function (d) {
                console.log('screenPublisher.streamDestroyed', d);
            }
        });

        setScreenPublisher(screenPublisher);
        setDesktopSharing(true);
    }

    const tutorStreamStyle = !enabledDesktopSharing ? { height: '100%', width: containerWidth } : { top: offsetHeight - 86 - 60 }

    const handleDragStop = () => {
        // setDragging(false);
        console.log('hereeeee last');
        // e.preventDefault();
    }

    const handleDragging = () => {
        setDragging(true);
        console.log('hereeeee 1');
        // e.preventDefault();
    }

    return (
        <div className={styles.container}>
            <div className={styles.lhs} ref={lhsRef}>
                <Header />
                <div className={styles.lhsBottom}>
                    <ErrorCase
                        errorInfo={constants.default.CONNECTION_ISSUES.SLOW_NETWORK}
                        showAnimation={showErrorAnimation}
                    />
                    <Draggable
                        axis="both"
                        handle=".handle"
                        defaultPosition={{ x: 0, y: 0 }}
                        position={null}
                        grid={[1, 1]}
                        scale={1}
                        onStop={handleDragStop}
                        onDrag={handleDragging}
                        bounds="parent"
                    >
                        <div
                            id='publisher-video'
                            style={!isDivsSwitched ? tutorStreamStyle : null}
                            className={cx('handle', styles.publish, { [styles.fullLayout]: isDivsSwitched })}
                            onClick={enabledDesktopSharing && !isDivsSwitched ? handleDivSwitch : null}
                        />
                    </Draggable>
                    <div
                        id='desktop'
                        className={isDivsSwitched ? styles.publish : styles.desktop}
                        style={isDivsSwitched ? tutorStreamStyle : null}
                        onClick={isDivsSwitched ? handleDivSwitch : null}
                    />
                </div>
            </div>
            <div className={styles.rhs}><Chat /></div>
            <div className={styles.controlBar}>
                <div className={styles.control} onClick={startTeacherSession}>Live</div>
                <div className={styles.control} onClick={shareDesktop}>Desk</div>
                <div className={styles.control} onClick={() => { setErrorAnimation(!showErrorAnimation) }}></div>
                <div className={styles.control} onClick={muteAudio}>Audio</div>
                <div className={styles.control} onClick={pauseVideo}>Video</div>
            </div>
        </div>
    );
}

export default hot(TutorPage);

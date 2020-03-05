import { hot } from "react-hot-loader/root";
import React, { useState, useEffect } from "react";
import _ from 'lodash';
import styles from "./index.scss";

export function StudentPage() {
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
    console.log(styles);

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
                // alert('connectionDestroyed', event);
                console.log('[Event] connectionDestroyed event got fired: ', event);
            },
            sessionConnected: function (event) {
                // alert('sessionConnected', event);
                console.log('[Event] sessionConnected event got fired: ', event);
                // buttonConnect.classList.remove('disabled');
            },
            sessionConnectFailed: function (event) {
                // alert('sessionConnectFailed', event);
                console.log('[Event] sessionConnectFailed event got fired: ', event);
                // buttonConnect.classList.remove('disabled');
            },
            sessionReconnecting: function (event) {
                // alert('sessionReconnecting', event);
                console.log('[Event] sessionReconnecting event got fired: ', event);
            },
            sessionDisconnected: function (event) {
                alert('sessionDisconnected', event);
                console.log('[Event] sessionDisconnected event got fired: ', event);
            },
            sessionReconnected: function (event) {
                // alert('sessionReconnected', event);
                console.log('[Event] sessionReconnected event got fired: ', event);
            },
            streamDestroyed: function (publisher) {
                delete _streamHash[publisher.stream.streamId];
                alert('streamDestroyed', publisher);
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
            networkQuality: function (event) {
                //alert('networkQuality', event);
                networkScore.innerHTML = event.networkQuality;
                //console.log('[Event] networkQuality event got fired: ', event);
            }
        });
    }

    const handleSessionChange = (e) => {
        console.log(e.target.value);
        setSessionId(e.target.value);
    }

    const className = { backgroundColor: '#60b91f', width: 200, height: 50, margin: 10, cursor: 'pointer', borderRadius: 25, outline: 'none' };
    const inputClassName = { height: 36, width: 200, padding: 3, borderRadius: 5 }
    const streamList = Object.keys(_streamHash);

    console.log('_streamHash-------------', _streamHash);

    const joinStudentSession = () => {
        let sessionObj = window.ImpartusVC.initSession('https://vcapitest.impartus.com', 'testKey', sessionId);
        setSessionObj(sessionObj);
        // setStudentView(true)

        fetch(`${backendUrl}generate-session/`, {
            method: 'post',
            ...headerObj,
            body: JSON.stringify({ sessionId })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setToken(data.clientToken)
            sessionObj.connect(data.clientToken, error => {
                console.log('error-connecting', error);
            });
        });

        if (!sessionObj) {
            alert('Session is not there');
            return;
        }

        if (!selectedStream) {
            alert('Invalid Stream');
            return;
        }

        console.log('--------------------', _subscriberHash, _streamHash, _sessionObj, selectedStream);

        const streamKeys = Object.keys(_streamHash);

        streamKeys.map((streamKey) => {
            _subscriberHash[streamKey] = {
                subscriber: _sessionObj.subscribe(_streamHash[streamKey], 'remote-video', {
                    insertMode: 'append',
                    showControls: true,
                    videoAttributes: {
                        id: 'remotevid' + inputCamId.value,
                        another: 'another',
                        classList: 'new-class'
                    }
                }, function (error) {
                    if (error) {
                        console.log('Error from subscribe: ', error);
                    } else {
                        if (_subscriberHash[streamKey].statsTimer) {
                            clearInterval(_subscriberHash[inputCamId.value].statsTimer);
                        }
                        _subscriberHash[streamKey].statsTimer = setInterval(function () {
                            if (_subscriberHash[streamKey].subscriber) {
                                _subscriberHash[streamKey].subscriber.getStats(function (e, stats) {
                                    if (e) {
                                        return console.log(e);
                                    }
                                    console.log("Subscribe Stats", stats);
                                });
                            }
                        }, 10000);
                        console.log('subscribe callback for:' + streamKey);
                    }
                })
            };
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.lhs}>
                <div id="desktop" className={styles.desktop} />
                <div id='remote-video' className={styles.student} />
                <div className={styles.action}>
                    <div className={styles.studentSide}>
                        Student Side
                        <input value={sessionId} onChange={handleSessionChange} style={inputClassName} />
                        <button onClick={joinStudentSession} style={className} >Start Student Session</button>
                    </div>
                </div>
            </div>
            <div className={styles.rhs}>
                <div className={styles.chat} />
            </div>
        </div>
    );
}

export default hot(StudentPage);
import { hot } from "react-hot-loader/root";
import React, { useState, useEffect } from "react";
import _ from 'lodash';
import cls from "./App.css";

export function App() {
  // const backendUrl = 'http://10.50.168.177:5555/';
  const backendUrl = 'http://localhost:5555/';
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

  const headerObj = {
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
  }

  useEffect(() => {
    const script = document.createElement('script');
    const script2 = document.createElement('script');
    script2.src = 'https://vcapitest.impartus.com/socket.io/socket.io.js;
    script.src = "../js/sdk.vc.impartus.js";

    document.body.appendChild(script);
    addEventListeners();

    return () => {
      document.body.removeChild(script);
    }
  }, _sessionObj.id)

  const createSession = () => {
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
        let _sessionObj = window.ImpartusVC.initSession('https://vcapitest.impartus.com', 'testKey', json.sessionId);
        console.log('_sessionObj----------------', _sessionObj);
        setSessionObj(_sessionObj);
      }
    );
  }

  const joinSession = () => {
    let _sessionObj = window.ImpartusVC.initSession('https://vcapitest.impartus.com', 'testKey', sessionId);
    setSessionObj(_sessionObj);
  }

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
      }
    });
  }

  const handleRemotePublisher = (remotePublisher) => {
    console.log('remotePublisher---------', remotePublisher);
  }

  const generateSession = () => {
    fetch(`${backendUrl}generate-session/`, {
      method: 'post',
      ...headerObj,
      body: JSON.stringify({ sessionId })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setToken(data.clientToken)
    });
  }

  const connectSession = () => {
    console.log('token', token);
    _sessionObj.connect(token, error => {
      console.log('error-connecting', error);
    });
  }

  const getDevices = () => {
    window.ImpartusVC.getDevices((error, devices) => {
      console.log('error-getting-devices', error);
      console.log('devices=', devices);
    });
  }

  const initializePublisher = () => {
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
  }

  const publishStream = () => {
    _sessionObj.publish(_publisherObj, function (error, messages) {
      console.log('messages--------------', messages);
    });
  }

  const unpublishStream = () => {
    _sessionObj.vcStreamService.unpublish(_publisherObj);
  }

  const pauseVideo = () => {
    _publisherObj.publishVideo(false);
  }

  const muteAudio = () => {
    _publisherObj.publishAudio(false);
  }

  const subscribeStream = () => {
    const remoteDivId = 'remote-video';
    let remoteSubscriberObject;
    console.log('subscribeStream created');
    // console.log(Object.keys(_sessionObj), _streamId);
    // remoteSubscriberObject = _sessionObj.subscribe(_streamId, remoteDivId, {
    //   insertMode: 'append',
    //   showControls: true
    // }, function (error) {
    //   console.log('error', error);
    // });
    // setRemoteSubscriberVideo(remoteSubscriberObject);


    if (!_sessionObj) {
      alert('Session is not there');
      return;
    }


    if (!selectedStream) {
      alert('Invalid Stream');
      return;
    }

    _subscriberHash[selectedStream] = {
      subscriber: _sessionObj.subscribe(_streamHash[selectedStream], 'remote-video', {
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
          if (_subscriberHash[selectedStream].statsTimer) {
            clearInterval(_subscriberHash[inputCamId.value].statsTimer);
          }
          _subscriberHash[selectedStream].statsTimer = setInterval(function () {
            if (_subscriberHash[selectedStream].subscriber) {
              _subscriberHash[selectedStream].subscriber.getStats(function (e, stats) {
                if (e) {
                  return console.log(e);
                }
                console.log("Subscribe Stats", stats);
              });
            }
          }, 10000);
          console.log('subscribe callback for:' + selectedStream);
        }
      })
    };
  }

  const unsubscribeStream = () => {
    _sessionObj.unsubscribe(_remoteSubscriberObject);
  }

  const handleSessionChange = (e) => {
    console.log(e.target.value);
    setSessionId(e.target.value);
  }

  const handleStreamFetch = (e) => {
    console.log('handleStreamFetch---------------', e.target.value);
    const strm = _streamHash[e.target.value];
    console.log('strm-----------', strm);
    // setSessionId(e.target.value)
  }

  const className = { backgroundColor: '#60b91f', width: 200, height: 50, margin: 10, cursor: 'pointer' };
  const inputClassName = { height: 36, width: 200, padding: 3, borderRadius: 5 }
  const streamList = Object.keys(_streamHash);

  console.log('_streamHash-------------', _streamHash);

  return (
    <div className="App">
      {sessionId}
      <input value={sessionId} onChange={handleSessionChange} style={inputClassName} />
      <button onClick={createSession} style={className} >Create Session</button>
      <button onClick={generateSession} style={className} >Generate Token</button>
      <button onClick={joinSession} style={className}>Join Session</button>
      <button onClick={connectSession} style={className} >Connect Session</button>
      <button onClick={getDevices} style={className} >Get Devices</button>
      <button onClick={initializePublisher} style={className} >Initialize Publisher</button>
      <button onClick={publishStream} style={className} >Publish Stream</button>
      <button onClick={unpublishStream} style={className} >Unpublish Stream</button>
      <button onClick={subscribeStream} style={className} >Subscribe Stream</button>
      <button onClick={unsubscribeStream} style={className} >Unsubscribe Stream</button>
      <div id='publisher-video' style={{ height: 400, width: 600 }} />
      <div id='remote-video' style={{ height: 400, width: 600 }} />

      <select value={selectedStream} onChange={handleStreamFetch}>
        {
          streamList.length > 0 ? streamList.map((streamId) => {
            return (
              <option value={streamId}>{streamId}</option>
            )
          }) : null
        }
      </select>
    </div>
  );
}

export default hot(App);

import { hot } from "react-hot-loader/root";
import React from "react";
import _ from 'lodash';
import TutorPage from '../TutorPage';
import StudentPage from '../StudentPage';
import { BrowserRouter as Router, Route } from "react-router-dom";

export function App() {
  // const backendUrl = 'http://10.50.168.177:5555/';

  // const headerObj = {
  //   mode: 'cors',
  //   cache: 'default',
  //   credentials: 'same-origin',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   referrerPolicy: 'no-referrer',
  // };

  // useEffect(() => {
  //   // thisMethod();
  //   // const script = document.createElement('script');
  //   // script.src = "../js/sdk.vc.impartus.js";

  //   // const script2 = document.createElement('script');
  //   // script2.src = 'https://vcapitest.impartus.com/socket.io/socket.io.js';

  //   // document.body.appendChild(script);
  //   // document.body.appendChild(script2);
  //   addEventListeners();
  // }, _sessionObj.id);

  // const createSession = () => {
  //   const myRequest = new Request(`${backendUrl}create-session/`, {
  //     method: 'GET',
  //     ...headerObj
  //   });
  //   fetch(myRequest).then(
  //     response => response.json()
  //   ).then(
  //     json => {
  //       console.log(json);
  //       setSessionId(json.sessionId)
  //       let _sessionObj = window.ImpartusVC.initSession('https://vcapitest.impartus.com', 'testKey', json.sessionId);
  //       console.log('_sessionObj----------------', _sessionObj);
  //       setSessionObj(_sessionObj);
  //     }
  //   );
  // }

  // const joinSession = () => {
  //   let _sessionObj = window.ImpartusVC.initSession('https://vcapitest.impartus.com', 'testKey', sessionId);
  //   setSessionObj(_sessionObj);
  //   setStudentView(true)
  // }

  // const addEventListeners = () => {
  //   console.log('_sessionObj------------------', _sessionObj);
  //   !_.isEmpty(_sessionObj) && _sessionObj.on({
  //     streamCreated: function (publisher) {
  //       setStreamHash({
  //         ..._streamHash,
  //         [publisher.stream.streamId]: publisher.stream
  //       })
  //       setSelectedStream(publisher.stream.streamId)

  //       console.log('streamCreated', publisher);
  //       console.log('[Event] streamCreated event got fired with stream: ', publisher);

  //       if (localStorage.getItem('autofetch')) {
  //         // ('Autofetch: subscribing to ' + publisher.stream.streamId);

  //         console.log('Autofetch: subscribing to ', _subscriberHash, publisher);
  //         setSubscriberHash({
  //           ..._subscriberHash,
  //           [publisher.stream.streamId]: {
  //             "subscriber": _sessionObj.subscribe(_streamHash[publisher.stream.streamId], 'remote-video', {
  //               insertMode: 'append',
  //               showControls: true,
  //               videoAttributes: {
  //                 id: 'remotevid' + publisher.stream.streamId,
  //                 another: 'another',
  //                 classList: 'new-class'
  //               }
  //             }, function (error) {
  //               if (error) {
  //                 console.log('Error from subscribe: ', error);
  //               } else {
  //                 if (_subscriberHash[publisher.stream.streamId].statsTimer) {
  //                   clearInterval(_subscriberHash[publisher.stream.streamId].statsTimer);
  //                 }
  //                 _subscriberHash[publisher.stream.streamId].statsTimer = setInterval(function () {
  //                   if (_subscriberHash[publisher.stream.streamId].subscriber) {
  //                     _subscriberHash[publisher.stream.streamId].subscriber.getStats(function (e, stats) {
  //                       if (e) {
  //                         console.error(e);
  //                       }
  //                       console.error("Subscribe Stats", stats);
  //                     });
  //                   }
  //                 }, 10000);
  //                 console.log('subscribe callback for:' + publisher.stream.streamId);
  //               }
  //             })
  //           }
  //         })
  //       }
  //     },
  //     connectionDestroyed: function (event) {
  //       alert('connectionDestroyed', event);
  //       console.log('[Event] connectionDestroyed event got fired: ', event);
  //     },
  //     sessionConnected: function (event) {
  //       // alert('sessionConnected', event);
  //       console.log('[Event] sessionConnected event got fired: ', event);
  //       // buttonConnect.classList.remove('disabled');
  //     },
  //     sessionConnectFailed: function (event) {
  //       alert('sessionConnectFailed', event);
  //       console.log('[Event] sessionConnectFailed event got fired: ', event);
  //       // buttonConnect.classList.remove('disabled');
  //     },
  //     sessionReconnecting: function (event) {
  //       alert('sessionReconnecting', event);
  //       console.log('[Event] sessionReconnecting event got fired: ', event);
  //     },
  //     sessionDisconnected: function (event) {
  //       alert('sessionDisconnected', event);
  //       console.log('[Event] sessionDisconnected event got fired: ', event);
  //     },
  //     sessionReconnected: function (event) {
  //       alert('sessionReconnected', event);
  //       console.log('[Event] sessionReconnected event got fired: ', event);
  //     },
  //     streamDestroyed: function (publisher) {
  //       delete _streamHash[publisher.stream.streamId];
  //       alert('streamDestroyed', publisher);
  //       console.log('[Event] streamDestroyed event got fired with stream: ', publisher);

  //       inputCamId.innerHTML = '<option selected value>Select Camera Id</option>';

  //       var disabled;
  //       for (var streamId in _streamHash) {
  //         disabled = false;
  //         if (window.ImpartusVC.sessionObj.vcServerManager.ownConnectionId == _streamHash[streamId].connection.connectionId) {
  //           disabled = true;
  //         }

  //         if (disabled) {
  //           inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\' disabled>' + streamId + '</option>';
  //         } else {
  //           inputCamId.innerHTML = inputCamId.innerHTML + '\n' + '<option value=\'' + streamId + '\'>' + streamId + '</option>';
  //         }
  //       }

  //       if (localStorage.getItem('autofetch')) {
  //         console.log('Autofetch: calling unsubscribe for ' + publisher.stream.streamId);
  //         if (_subscriberHash[publisher.stream.streamId]) {
  //           if (_subscriberHash[publisher.stream.streamId].statsTimer) {
  //             clearInterval(_subscriberHash[publisher.stream.streamId].statsTimer);
  //           }
  //           _sessionObj.unsubscribe(_subscriberHash[publisher.stream.streamId].subscriber);
  //         }
  //       } else {
  //         if (_subscriberHash[publisher.stream.streamId] && _subscriberHash[publisher.stream.streamId].statsTimer) {
  //           clearInterval(_subscriberHash[publisher.stream.streamId].statsTimer);
  //         }
  //       }
  //     },
  //     streamPropertyChanged: function (event) {
  //       alert('streamPropertyChanged', event);
  //       console.log('[Event] streamPropertyChanged event got fired: ', event);
  //       var vidElement = document.getElementById('remotevid' + event.stream.streamId);
  //       if (event && event.stream && event.changedProperty == 'hasVideo' && event.newValue == false) {
  //         vidElement.pause();
  //       }
  //       if (event && event.stream && event.changedProperty == 'hasVideo' && event.newValue == true) {
  //         vidElement.play();
  //       }
  //     },
  //     networkQuality: function (event) {
  //       //alert('networkQuality', event);
  //       networkScore.innerHTML = event.networkQuality;
  //       //console.log('[Event] networkQuality event got fired: ', event);
  //     }
  //   });
  // }

  // // const handleRemotePublisher = (remotePublisher) => {
  // //   console.log('remotePublisher---------', remotePublisher);
  // // }

  // // const generateSession = () => {
  // //   fetch(`${backendUrl}generate-session/`, {
  // //     method: 'post',
  // //     ...headerObj,
  // //     body: JSON.stringify({ sessionId })
  // //   }).then((response) => {
  // //     return response.json();
  // //   }).then((data) => {
  // //     setToken(data.clientToken)
  // //   });
  // // }

  // // const connectSession = () => {
  // //   console.log('token', token);
  // //   _sessionObj.connect(token, error => {
  // //     console.log('error-connecting', error);
  // //   });
  // // }

  // // const getDevices = () => {
  // //   window.ImpartusVC.getDevices((error, devices) => {
  // //     console.log('error-getting-devices', error);
  // //     console.log('devices=', devices);
  // //   });
  // // }

  // // const initializePublisher = () => {
  // //   const publisherObj = window.ImpartusVC.initPublisher('publisher-video', {
  // //     videoSource: "6e4d28eea34915d58ad2e632c6b857bfc2c5747b1fec109350aad085aa67605f",
  // //     audioSource: true,
  // //     showControls: false,
  // //     publishAudio: true,
  // //     publishVideo: true,
  // //     facingMode: window.ImpartusVC.isMobile ? 'user' : undefined
  // //   }, (error, messages) => {
  // //     // console.log('error', error);
  // //   });
  // //   setPublisherObj(publisherObj);
  // // }

  // // const publishStream = () => {
  // //   _sessionObj.publish(_publisherObj, function (error, messages) {
  // //     console.log('messages--------------', messages);
  // //   });
  // // }

  // // const unpublishStream = () => {
  // //   _sessionObj.vcStreamService.unpublish(_publisherObj);
  // // }

  // const pauseVideo = () => {
  //   _publisherObj.publishVideo(false);
  // }

  // const muteAudio = () => {
  //   _publisherObj.publishAudio(false);
  // }


  // const subscribeStream = () => {
  //   const remoteDivId = 'remote-video';
  //   let remoteSubscriberObject;
  //   console.log('subscribeStream created');
  //   // console.log(Object.keys(_sessionObj), _streamId);
  //   // remoteSubscriberObject = _sessionObj.subscribe(_streamId, remoteDivId, {
  //   //   insertMode: 'append',
  //   //   showControls: true
  //   // }, function (error) {
  //   //   console.log('error', error);
  //   // });
  //   // setRemoteSubscriberVideo(remoteSubscriberObject);


  //   if (!_sessionObj) {
  //     alert('Session is not there');
  //     return;
  //   }


  //   if (!selectedStream) {
  //     alert('Invalid Stream');
  //     return;
  //   }

  //   _subscriberHash[selectedStream] = {
  //     subscriber: _sessionObj.subscribe(_streamHash[selectedStream], 'remote-video', {
  //       insertMode: 'append',
  //       showControls: true,
  //       videoAttributes: {
  //         id: 'remotevid' + inputCamId.value,
  //         another: 'another',
  //         classList: 'new-class'
  //       }
  //     }, function (error) {
  //       if (error) {
  //         console.log('Error from subscribe: ', error);
  //       } else {
  //         if (_subscriberHash[selectedStream].statsTimer) {
  //           clearInterval(_subscriberHash[inputCamId.value].statsTimer);
  //         }
  //         _subscriberHash[selectedStream].statsTimer = setInterval(function () {
  //           if (_subscriberHash[selectedStream].subscriber) {
  //             _subscriberHash[selectedStream].subscriber.getStats(function (e, stats) {
  //               if (e) {
  //                 return console.log(e);
  //               }
  //               console.log("Subscribe Stats", stats);
  //             });
  //           }
  //         }, 10000);
  //         console.log('subscribe callback for:' + selectedStream);
  //       }
  //     })
  //   };
  // }

  // const unsubscribeStream = () => {
  //   _sessionObj.unsubscribe(_remoteSubscriberObject);
  // }

  return (
    <Router>
      <Route exact path="/" component={TutorPage} />
      <Route exact path="/student/" component={StudentPage} />
      <Route exact path="/tutor/" component={TutorPage} />
    </Router>
  );
}

export default hot(App);

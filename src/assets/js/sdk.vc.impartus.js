(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {
    var ErrorsMap = require('./ErrorMap');
    var ImpartusVCErrorClass = require('./ImpartusVCErrorClass');
    var errorReporting = require('./ErrorReporting')();

    module.exports = function EventsFactory() {
      var names = Object.keys(ErrorsMap).map(function (shortName) {
        return ErrorsMap[shortName];
      });

      return function otError(name, plainError, code) {
        if (names.indexOf(name) === -1) {
          return new Error('Attempt to use invalid error name (' + name + '). Original message: ' + plainError.message);
        }

        if (!(plainError instanceof Error || /^\[object .*Error\]$/.test(Object.prototype.toString.call(plainError)))) {
          return new Error('Did not pass Error as second argument: ' + plainError);
        }

        var error = new ImpartusVCErrorClass(undefined, plainError.message);

        error.name = name;

        if (!plainError.stack) {
          try {
            throw plainError;
          } catch (e) {
          }
        }

        error.stack = plainError.stack;

        if (code) {
          error.code = code;
        }

        errorReporting.send(error);

        return error;
      };
    };

  }, { "./ErrorMap": 2, "./ErrorReporting": 3, "./ImpartusVCErrorClass": 4 }], 2: [function (require, module, exports) {
    module.exports = {
      AUTHENTICATION_ERROR: 'OT_AUTHENTICATION_ERROR',

      BADLY_FORMED_RESPONSE: 'OT_BADLY_FORMED_RESPONSE',

      CHROME_MICROPHONE_ACQUISITION_ERROR: 'OT_CHROME_MICROPHONE_ACQUISITION_ERROR',

      CONNECT_FAILED: 'OT_CONNECT_FAILED',

      CONNECTION_LIMIT_EXCEEDED: 'OT_CONNECTION_LIMIT_EXCEEDED',

      CONSTRAINTS_NOT_SATISFIED: 'OT_CONSTRAINTS_NOT_SATISFIED',

      CREATE_PEER_CONNECTION_FAILED: 'OT_CREATE_PEER_CONNECTION_FAILED',

      DISCONNECTED: 'OT_DISCONNECTED',

      EMPTY_RESPONSE_BODY: 'OT_EMPTY_RESPONSE_BODY',

      HARDWARE_UNAVAILABLE: 'OT_HARDWARE_UNAVAILABLE',

      ICE_WORKFLOW_FAILED: 'OT_ICE_WORKFLOW_FAILED',

      INVALID_HTTP_STATUS: 'OT_INVALID_HTTP_STATUS',

      INVALID_PARAMETER: 'OT_INVALID_PARAMETER',

      INVALID_SESSION_ID: 'OT_INVALID_SESSION_ID',

      MEDIA_ERR_ABORTED: 'OT_MEDIA_ERR_ABORTED',

      MEDIA_ERR_DECODE: 'OT_MEDIA_ERR_DECODE',

      MEDIA_ERR_NETWORK: 'OT_MEDIA_ERR_NETWORK',

      MEDIA_ERR_SRC_NOT_SUPPORTED: 'OT_MEDIA_ERR_SRC_NOT_SUPPORTED',

      NO_DEVICES_FOUND: 'OT_NO_DEVICES_FOUND',

      NO_VALID_CONSTRAINTS: 'OT_NO_VALID_CONSTRAINTS',

      NOT_CONNECTED: 'OT_NOT_CONNECTED',

      NOT_FOUND: 'OT_NOT_FOUND',

      NOT_SUPPORTED: 'OT_NOT_SUPPORTED',

      PERMISSION_DENIED: 'OT_PERMISSION_DENIED',

      RATE_LIMIT_EXCEEDED: 'OT_RATE_LIMIT_EXCEEDED',

      REPORT_ISSUE_FAILED: 'OT_REPORT_ISSUE_FAILED',

      SCREEN_SHARING_EXTENSION_NOT_INSTALLED: 'OT_SCREEN_SHARING_EXTENSION_NOT_INSTALLED',

      SCREEN_SHARING_EXTENSION_NOT_REGISTERED: 'OT_SCREEN_SHARING_EXTENSION_NOT_REGISTERED',

      SCREEN_SHARING_NOT_SUPPORTED: 'OT_SCREEN_SHARING_NOT_SUPPORTED',

      SET_REMOTE_DESCRIPTION_FAILED: 'OT_SET_REMOTE_DESCRIPTION_FAILED',

      SOCKET_ALREADY_CONNECTED_CONNECTING: 'OT_SOCKET_ALREADY_CONNECTED_CONNECTING',

      SOCKET_CLOSE_ABNORMAL: 'OT_SOCKET_CLOSE_ABNORMAL',

      SOCKET_CLOSE_CONNECT_EXCEPTION: 'OT_SOCKET_CLOSE_CONNECT_EXCEPTION',

      SOCKET_CLOSE_CONNECTIVITY_LOSS: 'OT_SOCKET_CLOSE_CONNECTIVITY_LOSS',

      SOCKET_CLOSE_FALLBACK_CODE: 'OT_SOCKET_CLOSE_FALLBACK_CODE',

      SOCKET_CLOSE_INCONSISTENT_DATA: 'OT_SOCKET_CLOSE_INCONSISTENT_DATA',

      SOCKET_CLOSE_NO_STATUS: 'OT_SOCKET_CLOSE_NO_STATUS',

      SOCKET_CLOSE_POLICY_VIOLATION: 'OT_SOCKET_CLOSE_POLICY_VIOLATION',

      SOCKET_CLOSE_GOING_AWAY: 'OT_SOCKET_CLOSE_GOING_AWAY',

      SOCKET_CLOSE_PROTOCOL_ERROR: 'OT_SOCKET_CLOSE_PROTOCOL_ERROR',

      SOCKET_CLOSE_TIMEOUT: 'OT_SOCKET_CLOSE_TIMEOUT',

      SOCKET_CLOSE_TOO_LARGE: 'OT_SOCKET_CLOSE_TOO_LARGE',

      SOCKET_CLOSE_UNEXPECTED_CONDITION: 'OT_SOCKET_CLOSE_UNEXPECTED_CONDITION',

      SOCKET_CLOSE_UNSUPPORTED: 'OT_SOCKET_CLOSE_UNSUPPORTED',

      STREAM_CREATE_FAILED: 'OT_STREAM_CREATE_FAILED',

      STREAM_DESTROYED: 'OT_STREAM_DESTROYED',

      STREAM_LIMIT_EXCEEDED: 'OT_STREAM_LIMIT_EXCEEDED',

      STREAM_NOT_FOUND: 'OT_STREAM_NOT_FOUND',

      TERMS_OF_SERVICE_FAILURE: 'OT_TERMS_OF_SERVICE_FAILURE',

      TIMEOUT: 'OT_TIMEOUT',

      UNABLE_TO_CAPTURE_MEDIA: 'OT_UNABLE_TO_CAPTURE_MEDIA',

      UNABLE_TO_CAPTURE_SCREEN: 'OT_UNABLE_TO_CAPTURE_SCREEN',

      UNEXPECTED_ERROR_CODE: 'OT_UNEXPECTED_ERROR_CODE',

      UNEXPECTED_HTTP_STATUS: 'OT_UNEXPECTED_HTTP_STATUS',

      UNEXPECTED_SERVER_RESPONSE: 'OT_UNEXPECTED_SERVER_RESPONSE',

      UNKNOWN_HTTP_ERROR: 'OT_UNKNOWN_HTTP_ERROR',

      UNSUPPORTED_BROWSER: 'OT_UNSUPPORTED_BROWSER',

      USER_MEDIA_ACCESS_DENIED: 'OT_USER_MEDIA_ACCESS_DENIED',

      XDOMAIN_OR_PARSING_ERROR: 'OT_XDOMAIN_OR_PARSING_ERROR',

      API_KEY_DISABLED: 'OT_API_KEY_DISABLED'
    };
  }, {}], 3: [function (require, module, exports) {
    var eventing = require('../events/eventing');

    'use strict';

    module.exports = function () {

      var whitelistUrlPattern = /(opentok|ot|tb|tokbox)(?:\.min)?\.js/;

      var shouldSendCallback = function shouldSendCallback(errorData) {
        if (errorData && errorData.tags && errorData.tags.otError) {
          delete errorData.tags.otError;
          return true;
        }

        return false;
      };

      var normaliseError = function normaliseError(rawError) {
        var error = void 0;

        if (rawError instanceof Error || typeof rawError === 'string') {
          error = rawError;
        } else if (rawError == null) {
          error = new Error('Undefined or null error was reported!');
        } else {
          error = new Error(rawError.message);
          ['name', 'title', 'code', 'stack'].forEach(function (key) {
            if (rawError[key]) {
              error[key] = rawError[key];
            }
          });
        }

        if (error instanceof Error && !error.stack) {
          try {
            throw error;
          } catch (e) {
          }
        }

        return error;
      };

      var generateFingerprint = function generateFingerprint(error) {
        var fingerprint = ['{{ default }}'];

        if (typeof error === 'string') {
          fingerprint.push('message::' + error);
        } else if (error != null) {
          ['message', 'name', 'title', 'code'].forEach(function (key) {
            if (error[key]) {
              fingerprint.push(key + '::' + error[key]);
            }
          });
        }

        return fingerprint;
      };

      var generateTags = function generateTags(error) {
        var tags = {
          otError: true
        };

        if (error instanceof Error) {
          ['name', 'title', 'code'].forEach(function (key) {
            if (error[key]) {
              tags['error.' + key] = error[key];
            }
          });
        }

        return tags;
      };

      var errorReporting = {
        send: function send(rawError) {

          var error = normaliseError(rawError);

          var options = {
            fingerprint: generateFingerprint(error),
            tags: generateTags(error)
          };
        }
      };

      var attachGlobalListener = function attachGlobalListener() {
        window.addEventListener('error', function (e) {
          if (e.error == null) {
            return;
          }
          errorReporting.send(e.error);
        });
      };

      attachGlobalListener();

      return errorReporting;
    };
  }, { "../events/eventing": 8 }], 4: [function (require, module, exports) {
    var EventMap = require('../events/EventMap');
    var ErrorMap = require('../errors/ErrorMap');
    var EventFactory = require('../events/EventFactory')();
    var eventing = require('../events/eventing');

    'use strict';

    var ImpartusVCErrorClass = function ImpartusVCErrorClass(code, message) {
      Error.call(this);

      this.code = code;
      this.message = message;
    };

    ImpartusVCErrorClass.prototype = Object.create(Error.prototype);
    ImpartusVCErrorClass.prototype.constructor = ImpartusVCErrorClass;

    module.exports = ImpartusVCErrorClass;

    eventing(ImpartusVCErrorClass);

    var errorsCodesToTitle = {
      1004: 'Authentication error',
      1005: 'Invalid Session ID',
      1006: 'Connect Failed',
      1007: 'Connect Rejected',
      1008: 'Connect Time-out',
      1009: 'Security Error',
      1010: 'Not Connected',
      1011: 'Invalid Parameter',
      1012: 'Peer-to-peer Stream Play Failed',
      1013: 'Connection Failed',
      1014: 'API Response Failure',
      1015: 'PeerConnection not connected, cannot call this method',
      1021: 'Request Timeout',
      1026: 'Terms of Service Violation: Export Compliance',
      1027: 'Connection Limit Exceeded',
      1500: 'Unable to Publish',
      1501: 'Unable to Subscribe',
      1502: 'Unsupported Video Codec',
      1503: 'No TURN server found',
      1520: 'Unable to Force Disconnect',
      1530: 'Unable to Force Unpublish',
      1553: 'ICEWorkflow failed',
      1600: 'createOffer, createAnswer, setLocalDescription, setRemoteDescription',
      1605: 'Stream Limit Exceeded',
      2000: 'Internal Error',
      2001: 'Unexpected Server Response',
      4000: 'WebSocket Connection Failed',
      4001: 'WebSocket Network Disconnected'
    };

    ImpartusVCErrorClass.getTitleByCode = function (code) {
      return errorsCodesToTitle[+code];
    };

    ImpartusVCErrorClass.handleJsException = function (_ref) {
      var error = _ref.error,
        errorMsg = _ref.errorMsg,
        code = _ref.code,
        target = _ref.target,
        analytics = _ref.analytics;

      if (!target) {
        throw new Error('handleJsException requires target');
      }
      var getCode = function getCode() {
        return code !== undefined ? code : error && error.code;
      };
      var getMessage = function getMessage() {
        return errorMsg !== undefined ? errorMsg : error && error.message;
      };

      var title = ImpartusVCErrorClass.getTitleByCode(getCode());

      Logger.error('ImpartusVC.exception :: title: ' + title + ' (' + getCode() + ') msg: ' + getMessage());

      try {

        var event = new EventFactory.ExceptionEvent(EventMap.EXCEPTION, getMessage(), title, getCode(), target, target, error);

        if (error) {
          event.stack = error.stack;
        } else {
          try {
            throw new Error();
          } catch (caughtError) {
            event.stack = caughtError.stack;
          }
        }

        ImpartusVCErrorClass.dispatchEvent(event);
      } catch (err) {
        Logger.error('ImpartusVC.exception :: Failed to dispatch exception - ' + err.toString());
      }
    };

    module.exports = ImpartusVCErrorClass;

  }, { "../errors/ErrorMap": 2, "../events/EventFactory": 6, "../events/EventMap": 7, "../events/eventing": 8 }], 5: [function (require, module, exports) {
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function intersection(a, b) {
      var t;
      if (b.length > a.length) t = b, b = a, a = t;
      return a.filter(function (e) {
        return b.indexOf(e) > -1;
      }).filter(function (e, i, c) {
        return c.indexOf(e) === i;
      });
    }

    module.exports = function () {
      function Event(type) {
        var cancelable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Event);

        this.type = type;
        this.cancelable = cancelable;
        this._defaultPrevented = false;

        var reservedKeys = intersection(Object.keys(this), Object.keys(props));

        if (reservedKeys.length > 0) {
          throw new Error('Cannot used reserved property names: ' + reservedKeys.join(','));
        }

        Object.assign(this, props);
      }

      Event.prototype.preventDefault = function preventDefault() {
        if (this.cancelable) {
          this._defaultPrevented = true;
        } else {
          Logger.warn('Event.preventDefault :: Trying to preventDefault on an ' + 'event that isn\'t cancelable');
        }
      };

      Event.prototype.isDefaultPrevented = function isDefaultPrevented() {
        return this._defaultPrevented;
      };

      Object.defineProperty(Event.prototype, 'toJSON', {
        value: function () {
          var alt = {};

          Object.getOwnPropertyNames(this).forEach(function (key) {
            if (key != 'target') {
              alt[key] = this[key];
            }
          }, this);

          return alt;
        },
        configurable: true,
        writable: true
      });

      return Event;
    }();
  }, {}], 6: [function (require, module, exports) {
    var EventsMap = require('./EventMap');
    var Event = require('./Event');

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      }
      return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }


    module.exports = function EventsFactory() {

      var Events = {};
      Events.ExceptionEvent = function ExceptionEvent(type, message, title, code, component, target, error) {
        return new Event(type, false, {
          error: error,
          message: message,
          title: title,
          code: code,
          component: component,
          target: target
        });
      };

      Events.NetworkQualityEvent = function NetworkQualityEvent(quality, networkReport) {
        return new Event(EventsMap.NETWORK_QUALITY, false, { networkQuality: quality, report: networkReport });
      };

      Events.IssueReportedEvent = function IssueReportedEvent(type, issueId) {
        return new Event(type, false, { issueId: issueId });
      };

      Events.EnvLoadedEvent = function EnvLoadedEvent(type) {
        return new Event(type, false);
      };

      Events.ConnectionEvent = function (_Event) {
        _inherits(ConnectionEvent, _Event);

        function ConnectionEvent(type, connection, reason) {
          _classCallCheck(this, ConnectionEvent);

          return _possibleConstructorReturn(this, _Event.call(this, type, false, {
            connection: connection,
            reason: reason
          }));
        }

        _createClass(ConnectionEvent, [{
          key: 'connections',
          get: function get() {
            return [this.connection];
          }
        }]);

        return ConnectionEvent;
      }(Event);

      var streamEventPluralDeprecationWarningShown = false;

      Events.StreamEvent = function (_Event2) {
        _inherits(StreamEvent, _Event2);

        function StreamEvent(type, stream, reason, cancelable) {
          _classCallCheck(this, StreamEvent);

          return _possibleConstructorReturn(this, _Event2.call(this, type, cancelable, {
            stream: stream,
            reason: reason
          }));
        }

        _createClass(StreamEvent, [{
          key: 'streams',
          get: function get() {
            if (!streamEventPluralDeprecationWarningShown) {
              Logger.warn('OT.StreamEvent streams property is deprecated, use stream instead.');
              streamEventPluralDeprecationWarningShown = true;
            }
            return [this.stream];
          }
        }]);

        return StreamEvent;
      }(Event);

      var sessionConnectedConnectionsDeprecationWarningShown = false;
      var sessionConnectedStreamsDeprecationWarningShown = false;
      var sessionConnectedArchivesDeprecationWarningShown = false;

      Events.SessionConnectEvent = function (_Event3) {
        _inherits(SessionConnectEvent, _Event3);

        function SessionConnectEvent(type) {
          _classCallCheck(this, SessionConnectEvent);

          return _possibleConstructorReturn(this, _Event3.call(this, type, false));
        }



        _createClass(SessionConnectEvent, [{
          key: 'connections',
          get: function get() {
            if (!sessionConnectedConnectionsDeprecationWarningShown) {
              Logger.warn('OT.SessionConnectedEvent no longer includes connections. Listen ' + 'for connectionCreated events instead.');
              sessionConnectedConnectionsDeprecationWarningShown = true;
            }
            return [];
          }

        }, {
          key: 'streams',
          get: function get() {
            if (!sessionConnectedStreamsDeprecationWarningShown) {
              Logger.warn('OT.SessionConnectedEvent no longer includes streams. Listen for ' + 'streamCreated events instead.');
              sessionConnectedStreamsDeprecationWarningShown = true;
            }
            return [];
          }

        }, {
          key: 'archives',
          get: function get() {
            if (!sessionConnectedArchivesDeprecationWarningShown) {
              Logger.warn('OT.SessionConnectedEvent no longer includes archives. Listen for ' + 'archiveStarted events instead.');
              sessionConnectedArchivesDeprecationWarningShown = true;
            }
            return [];
          }
        }]);

        return SessionConnectEvent;
      }(Event);

      Events.SessionReconnectingEvent = function SessionReconnectedEvent() {
        return new Event(EventsMap.SESSION_RECONNECTING, false);
      };

      Events.SessionReconnectedEvent = function SessionReconnectedEvent() {
        return new Event(EventsMap.SESSION_RECONNECTED);
      };

      Events.SessionDisconnectEvent = function SessionDisconnectEvent(type, reason, cancelable) {
        return new Event(type, cancelable, { reason: reason });
      };

      Events.StreamPropertyChangedEvent = function StreamPropertyChangedEvent(type, stream, changedProperty, oldValue, newValue) {
        return new Event(type, false, {
          stream: stream,
          changedProperty: changedProperty,
          oldValue: oldValue,
          newValue: newValue
        });
      };

      Events.VideoDimensionsChangedEvent = function VideoDimensionsChangedEvent(target, oldValue, newValue) {
        return new Event('videoDimensionsChanged', false, {
          target: target,
          oldValue: oldValue,
          newValue: newValue
        });
      };

      Events.ArchiveEvent = function ArchiveEvent(type, archive) {
        return new Event(type, false, {
          id: archive.id,
          name: archive.name,
          status: archive.status,
          archive: archive
        });
      };

      Events.ArchiveUpdatedEvent = function ArchiveUpdatedEvent(stream, key, oldValue, newValue) {
        return new Event('updated', false, {
          target: stream,
          changedProperty: key,
          oldValue: oldValue,
          newValue: newValue
        });
      };

      Events.SignalEvent = function SignalEvent(type, data, from) {
        return new Event(type ? 'signal:' + type : EventsMap.SIGNAL, false, {
          data: data,
          from: from
        });
      };

      Events.StreamUpdatedEvent = function StreamUpdatedEvent(stream, key, oldValue, newValue) {
        return new Event('updated', false, {
          target: stream,
          changedProperty: key,
          oldValue: oldValue,
          newValue: newValue
        });
      };

      Events.DestroyedEvent = function DestroyedEvent(type, target, reason) {
        return new Event(type, false, {
          target: target,
          reason: reason
        });
      };

      Events.ConnectionStateChangedEvent = function ConnectionStateChangedEvent(type, target) {
        return new Event(type, false, {
          target: target
        });
      };

      Events.VideoEnabledChangedEvent = function VideoEnabledChangedEvent(type, properties) {
        return new Event(type, false, {
          reason: properties.reason
        });
      };

      Events.VideoDisableWarningEvent = function VideoDisableWarningEvent(type) {
        return new Event(type, false);
      };

      Events.AudioLevelUpdatedEvent = function AudioLevelUpdatedEvent(audioLevel) {
        return new Event(EventsMap.AUDIO_LEVEL_UPDATED, false, {
          audioLevel: audioLevel
        });
      };

      Events.MediaStoppedEvent = function MediaStoppedEvent(target, track) {
        return new Event(EventsMap.MEDIA_STOPPED, true, {
          target: target,
          track: track
        });
      };

      Events.VideoElementCreatedEvent = function VideoElementCreatedEvent(element) {
        return new Event(EventsMap.VIDEO_ELEMENT_CREATED, false, {
          element: element
        });
      };

      return Events;
    };

  }, { "./Event": 5, "./EventMap": 7 }], 7: [function (require, module, exports) {
    module.exports = {
      ACTIVE: 'active',
      INACTIVE: 'inactive',
      UNKNOWN: 'unknown',

      PER_SESSION: 'perSession',
      PER_STREAM: 'perStream',

      EXCEPTION: 'exception',
      ISSUE_REPORTED: 'issueReported',

      SESSION_CONNECTED: 'sessionConnected',
      SESSION_RECONNECTING: 'sessionReconnecting',
      SESSION_RECONNECTED: 'sessionReconnected',
      SESSION_DISCONNECTED: 'sessionDisconnected',
      STREAM_CREATED: 'streamCreated',
      STREAM_DESTROYED: 'streamDestroyed',
      CONNECTION_CREATED: 'connectionCreated',
      CONNECTION_DESTROYED: 'connectionDestroyed',
      SIGNAL: 'signal',
      STREAM_PROPERTY_CHANGED: 'streamPropertyChanged',
      MICROPHONE_LEVEL_CHANGED: 'microphoneLevelChanged',
      NETWORK_QUALITY: 'networkQuality',

      RESIZE: 'resize',
      SETTINGS_BUTTON_CLICK: 'settingsButtonClick',
      DEVICE_INACTIVE: 'deviceInactive',
      INVALID_DEVICE_NAME: 'invalidDeviceName',
      ACCESS_ALLOWED: 'accessAllowed',
      ACCESS_DENIED: 'accessDenied',
      ACCESS_DIALOG_OPENED: 'accessDialogOpened',
      ACCESS_DIALOG_CLOSED: 'accessDialogClosed',
      ECHO_CANCELLATION_MODE_CHANGED: 'echoCancellationModeChanged',
      MEDIA_STOPPED: 'mediaStopped',
      PUBLISHER_DESTROYED: 'destroyed',

      SUBSCRIBER_DESTROYED: 'destroyed',
      SUBSCRIBER_CONNECTED: 'connected',
      SUBSCRIBER_DISCONNECTED: 'disconnected',

      DEVICES_DETECTED: 'devicesDetected',

      DEVICES_SELECTED: 'devicesSelected',
      CLOSE_BUTTON_CLICK: 'closeButtonClick',

      MICLEVEL: 'microphoneActivityLevel',
      MICGAINCHANGED: 'microphoneGainChanged',

      ENV_LOADED: 'envLoaded',
      ENV_UNLOADED: 'envUnloaded',

      AUDIO_LEVEL_UPDATED: 'audioLevelUpdated',

      VIDEO_ELEMENT_CREATED: 'videoElementCreated'
    };

  }, {}], 8: [function (require, module, exports) {
    var EventEmitter = require('events');
    var weakMemoizeBind = require('./weakMemoizeBind');

    module.exports = function eventing(self) {
      var ee = new EventEmitter();

      ee.on('newListener', function (eventName) {
        ee.emit(eventName + ':added');
      });

      ee.on('removeListener', function (eventName) {
        ee.emit(eventName + ':removed');
      });

      var eventingMixin = {

        on: function on(eventNames, handlerOrContext, context) {
          if (typeof eventNames === 'string' && handlerOrContext) {
            eventNames.split(' ').forEach(function (eventName) {
              ee.on(eventName, weakMemoizeBind(handlerOrContext, context));
            });
          } else {
            Object.keys(eventNames).forEach(function (eventName) {
              ee.on(eventName, weakMemoizeBind(eventNames[eventName], handlerOrContext));
            });
          }
          return this;
        },


        off: function off(eventNames, handlerOrContext, context) {
          if (typeof eventNames === 'string') {
            this.off(eventNames.split(' '), handlerOrContext, context);
          } else if (Array.isArray(eventNames)) {
            eventNames.forEach(function (eventName) {
              if (handlerOrContext && isFunction(handlerOrContext)) {
                ee.removeListener(eventName, weakMemoizeBind(handlerOrContext, context));
              } else {
                ee.removeAllListeners(eventName);
              }
            });
          } else if (!eventNames) {
            ee.removeAllListeners();
          } else {
            Object.keys(eventNames).forEach(function (eventName) {
              ee.removeListener(eventName, weakMemoizeBind(eventNames[eventName], handlerOrContext));
            });
          }

          return this;
        },


        once: function once(eventNames, handlerOrContext, context) {
          if (typeof eventNames === 'string' && handlerOrContext) {
            eventNames.split(' ').forEach(function (eventName) {
              ee.once(eventName, weakMemoizeBind(handlerOrContext, context));
            });
          } else {
            Object.keys(eventNames).forEach(function (eventName) {
              ee.once(eventName, weakMemoizeBind(eventNames[eventName], handlerOrContext));
            });
          }
          return this;
        },


        dispatchEvent: function dispatchEvent(event) {
          if (!event.type) {
            throw new Error('dispatchEvent: Event has no type');
          }

          if (!event.target) {
            event.target = this;
          }

          this.trigger(event.type, event);

          return this;
        },


        trigger: function trigger(eventName) {
          try {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            ee.emit.apply(ee, [eventName].concat(args));
          } catch (e) {
            console.error('An error occurred in an event handler', e);
          }
          return this;
        },


        emit: function emit() {
          return self.trigger.apply(self, arguments);
        },



        addEventListener: function addEventListener(eventName, handler, context) {
          Logger.warn('The addEventListener() method is deprecated. Use on() or once() instead.');
          return self.on(eventName, handler, context);
        },


        removeEventListener: function removeEventListener(eventName, handler, context) {

          Logger.warn('The removeEventListener() method is deprecated. Use off() instead.');
          return self.off(eventName, handler, context);
        },
        listenerCount: function listenerCount(eventName) {
          return ee.listenerCount(eventName);
        }
      };

      return Object.assign(self, eventingMixin);
    };
  }, { "./weakMemoizeBind": 9, "events": 21 }], 9: [function (require, module, exports) {
    var WeakMap = require('es6-weak-map');
    var contexts = new WeakMap();

    function weakMemoizeBind(fn, context) {
      if (context === undefined) {
        return fn;
      }

      if (!contexts.has(context)) {
        contexts.set(context, new WeakMap());
      }

      var fnMap = contexts.get(context);

      if (!fnMap.has(fn)) {
        fnMap.set(fn, fn.bind(context));
      }

      return fnMap.get(fn);
    }

    module.exports = weakMemoizeBind;
  }, { "es6-weak-map": 76 }], 10: [function (require, module, exports) {
    'use strict';

    var _webrtcAdapter = _interopRequireDefault(require("webrtc-adapter"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    window.adapter = _webrtcAdapter.default;

    (function (window, document) {
      if (!('toJSON' in Error.prototype)) {
        Object.defineProperty(Error.prototype, 'toJSON', {
          value: function () {
            var alt = {};
            Object.getOwnPropertyNames(this).forEach(function (key) {
              alt[key] = this[key];
            }, this);
            return alt;
          },
          configurable: true,
          writable: true
        });
      }


      if (!('toJSON' in Event.prototype)) {
        Object.defineProperty(Event.prototype, 'toJSON', {
          value: function () {
            var alt = {};
            Object.getOwnPropertyNames(this).forEach(function (key) {
              if (key != 'target') {
                alt[key] = this[key];
              }
            }, this);
            return alt;
          },
          configurable: true,
          writable: true
        });
      }

      JSON.safeParse = function (text, expectedReturnOnFailure) {
        var parsedText = text;

        if (typeof text == 'string' && text.indexOf('{') >= 0 && text.indexOf('}') > 0) {
          try {
            parsedText = JSON.parse(text);
          } catch (e) {
            if (Logger && Logger.debug) {
              Logger.debug('safeParsing error for: ', text);
            }

            if (!!expectedReturnOnFailure) {
              parsedText = expectedReturnOnFailure;
            }
          }
        }

        return parsedText;
      };


      window.Logger = require('js-logger');

      if ((!window.Logger || !window.Logger.VERSION) && window.require) {
        window.Logger = window.require('js-logger');
      }

      if (window.Logger && window.Logger.VERSION) {
        var loggerLevel = window.Logger.INFO;
        var logString = '',
          loggerTimer = 0;

        if (localStorage) {
          var value = localStorage.getItem('impartusLog');

          if (value) {
            loggerLevel = window.Logger.DEBUG;
          }

          switch (value) {
            case 'trace':
              loggerLevel = window.Logger.TRACE;
              break;

            case 'debug':
              loggerLevel = window.Logger.DEBUG;
              break;

            case 'true':
              loggerLevel = window.Logger.DEBUG;
              break;

            case 'info':
              loggerLevel = window.Logger.INFO;
              break;

            case 'time':
              loggerLevel = window.Logger.TIME;
              break;

            case 'warn':
              loggerLevel = window.Logger.WARN;
              break;

            case 'error':
              loggerLevel = window.Logger.ERROR;
              break;

            default:
              loggerLevel = window.Logger.INFO;
              break;
          }
        }

        window.Logger.useDefaults({
          defaultLevel: loggerLevel,
          formatter: function (messages, context) {
            function replacer(key, value) {
              if (typeof value === 'string') {
                try {
                  value = JSON.parse(value);
                } catch (e) { }
              }

              return value;
            }

            var currentTime = new Date();
            messages.unshift(currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds()) + ' - ';
            messages.forEach(function (message, index) {
              if (typeof message == 'object') {
                try {
                  if (!message.stream) {
                    var stringifiedVal = JSON.stringify(message, replacer);

                    if (stringifiedVal == '{}') {
                      stringifiedVal = message;
                    }

                    messages[index] = stringifiedVal;
                  }
                } catch (e) {
                  messages[index] = message;
                }
              }
            });

            if (context.level.value >= 3) {
              if (loggerTimer == 0) {
                loggerTimer = Date.now();
              }

              if ((currentTime.getTime() - loggerTimer) / 1000 > 10) {
                logString += '\n' + messages;
                var impLogs = localStorage.getItem('impLogs');

                if (!impLogs) {
                  impLogs = '';
                }

                impLogs += logString;
                localStorage.setItem('impLogs', impLogs);
                logString = '';
              } else {
                logString += '\n' + messages;
              }
            }
          }
        });
        setInterval(function () {
          var impLogs = localStorage.getItem('impLogs');

          if (!impLogs) {
            impLogs = '';
          }

          if (logString) {
            impLogs += logString;
          }

          if (impLogs) {
            try {
              ImpartusVC.sessionObj.vcServerManager.logEverything(impLogs);
              localStorage.setItem('impLogs', '');
              loggerTimer = 0;
              logString = '';
            } catch (e) { }
          }
        }, 30 * 1000);
      }


      require('./janus.js');

      var preferredMedia = 'screen';

      if (window.adapter.browserDetails.browser === 'chrome') {
        preferredMedia = function () {
          return new Promise(function (resolve, reject) {
            if (ImpartusVC.extensionVersion == 2) {
              try {
                chrome.runtime.sendMessage(ImpartusVC.extensionId, {
                  type: ImpartusVC.shareDesktopMsgType,
                  status: true
                }, function (response) {
                  Logger.debug('Response from chrome extension: ', response);

                  if (response && (response.stream || response.sourceId)) {
                    resolve(response.stream || response.sourceId);
                  } else {
                    reject(new Error('Unable to get stream id from extension'));
                  }
                });
              } catch (e) {
                reject(new Error('Unable to get stream id from extension: ' + e.message));
              }
            } else {
              var prefix = 'com.tokbox.screenSharing.' + ImpartusVC.extensionId;

              var request = function request(method, payload) {
                var res = {
                  payload: payload,
                  from: 'jsapi'
                };
                res[prefix] = method;
                return res;
              };

              var post = request(ImpartusVC.shareDesktopMsgType, {
                requestId: 'getSourceId'
              });
              ImpartusVC.callbacksStore['getSourceId'] = resolve;
              window.postMessage(post, '*');
            }
          });
        };
      } else if (window.adapter.browserDetails.browser === 'firefox') {
        preferredMedia = 'screen';
      }

      if (window.adapter.browserShim.shimGetDisplayMedia) {
        window.adapter.browserShim.shimGetDisplayMedia(window, preferredMedia);
      }


      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }


      Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      var EventMap = require('../events/EventMap');

      var EventFactory = require('../events/EventFactory')();

      var eventing = require('../events/eventing');

      var ErrorMap = require('../errors/ErrorMap');

      var ErrorFactory = require('../errors/ErrorFactory')();

      var ImpartusVCErrorClass = require('../errors/ImpartusVCErrorClass');


      function ImpartusVC() {
        self = this;
        self.vcJanusSession = require('./vcJanusSession.js');
        self.vcServerManager = require('./vcServerManager.js');
        self.vcSessionService = require('./vcSessionService');
        self.vcStreamsService = require('./vcStreamsService');
        self.vcRemoteStreamsService = require('./vcRemoteStreamsService');
        self.vcResolutionManager = require('./vcResolutionManager');
        self.connectionStats = {
          rtt: {
            value: 0,
            lastUpdate: 0
          },
          jitter: {
            value: 0,
            lastUpdate: 0
          },
          ulBwEstimate: {
            value: 0,
            lastUpdate: 0
          },
          dlBwEstimate: {
            value: 0,
            lastUpdate: 0
          },
          dlberEstimate: {
            value: 0,
            lastUpdate: 0
          }
        };

        self.updateConnectionStats = function (param, newValue) {
          var p = self.connectionStats[param];

          if (p) {
            var smoothingFactor = Math.exp(0.69 * Math.min(p.lastUpdate - Date.now(), 0) / 5000);

            p.value = smoothingFactor * p.value + (1 - smoothingFactor) * newValue;
            p.lastUpdate = Date.now();
          }
        };

        self.getNetworkScore = function () {
          var networkScore = 0;
          var rttScore = -1;
          var jitterScore = -1;
          var ulbwscore = -1;
          var scores = [];

          if (self.connectionStats.rtt.value > 0 && self.connectionStats.rtt.lastUpdate > Date.now() - 30 * 1000) {
            if (self.connectionStats.rtt.value < 10) {
              rttScore = 1;
            } else if (self.connectionStats.rtt.value < 20) {
              rttScore = 2;
            } else if (self.connectionStats.rtt.value < 40) {
              rttScore = 3;
            } else {
              rttScore = 4;
            }

            scores.push(rttScore);
          }

          if (self.connectionStats.jitter.value > 0 && self.connectionStats.jitter.lastUpdate > Date.now() - 30 * 1000) {
            if (self.connectionStats.jitter.value < 1) {
              jitterScore = 1;
            } else if (self.connectionStats.jitter.value < 2) {
              jitterScore = 2;
            } else if (self.connectionStats.jitter.value < 4) {
              jitterScore = 3;
            } else {
              jitterScore = 4;
            }

            scores.push(jitterScore);
          }

          if (self.connectionStats.ulBwEstimate.value > 0 && self.connectionStats.ulBwEstimate.lastUpdate > Date.now() - 30 * 1000) {
            if (self.connectionStats.ulBwEstimate.value < 300000) {
              ulbwscore = 5;
            } else if (self.connectionStats.ulBwEstimate.value < 500000) {
              ulbwscore = 4;
            } else if (self.connectionStats.ulBwEstimate.value < 800000) {
              ulbwscore = 2;
            } else {
              ulbwscore = 1;
            }

            scores.push(ulbwscore);
          }

          var totalScore = 0;

          if (scores.length > 0) {
            for (var kk = 0; kk < scores.length; kk++) {
              totalScore += scores[kk];
            }

            totalScore = Math.ceil(totalScore / scores.length);
          }

          return totalScore;
        };

        self.connection = {};
        self.sessionInfo = {
          url: '',
          apiKey: '',
          sessionId: '',
          token: ''
        };

        eventing(self);
        self.networkQualityTimer = setInterval(function () {
          self.dispatchEvent(EventFactory.NetworkQualityEvent(self.getNetworkScore(), self.connectionStats));
        }, 2000);
      }

      eventing(ImpartusVC);
      ImpartusVC.Error = ImpartusVCErrorClass;
      ImpartusVC.Error.on(EventMap.EXCEPTION, function (exceptionEvent) {
        ImpartusVC.dispatchEvent(exceptionEvent);
      });

      ImpartusVC.callbacksStore = {};

      ImpartusVC.allowAutoReconnection = true;
      ImpartusVC.extensionId = 'clcbfjpbnfmaaaabpoidaoenhfplkbgc';
      ImpartusVC.shareDesktopMsgType = 1;
      ImpartusVC.deviceKindsMap = {
        audio: 'audioInput',
        video: 'videoInput',
        audioinput: 'audioInput',
        videoinput: 'videoInput',
        audioInput: 'audioInput',
        videoInput: 'videoInput'
      };

      ImpartusVC.guid = function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      };

      ImpartusVC.scrollTo = function (element, to, duration) {
        var start = element.scrollTop,
          change = to - start,
          currentTime = 0,
          increment = 20;

        var animateScroll = function () {
          currentTime += increment;
          var val = Math.easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;

          if (currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        };

        animateScroll();
      };


      ImpartusVC.browserDetails = window.adapter.browserDetails;

      ImpartusVC.isMobile = false;

      if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
        ImpartusVC.isMobile = true;
      }

      if (ImpartusVC.browserDetails.browser == 'safari') {
        navigator.getUserMedia({
          video: false,
          audio: true
        }, function (stream) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
        }, function () { });
      }


      ImpartusVC.getOrCreateContainer = function (elementOrDomId, insertMode) {
        var container = void 0;
        var domId = void 0;

        if (elementOrDomId && elementOrDomId.nodeName) {
          container = elementOrDomId;

          if (!container.getAttribute('id') || container.getAttribute('id').length === 0) {
            container.setAttribute('id', 'ImpartusVC_' + ImpartusVC.guid());
          }

          domId = container.getAttribute('id');
        } else if (elementOrDomId) {
          container = document.getElementById(elementOrDomId);

          if (container) {
            domId = elementOrDomId;
          }
        }

        if (!domId) {
          domId = 'ImpartusVC_' + ImpartusVC.guid().replace(/-/g, '_');
        }

        if (!container) {
          container = document.createElement('div');
          container.id = domId;
          container.style.backgroundColor = '#000000';
          document.body.appendChild(container);
        } else if (!(insertMode == null || insertMode === 'replace')) {
          var placeholder = document.createElement('div');
          placeholder.id = 'ImpartusVC_' + ImpartusVC.guid();

          if (insertMode === 'append') {
            container.appendChild(placeholder);
            container = placeholder;
          } else if (insertMode === 'before') {
            container.parentNode.insertBefore(placeholder, container);
            container = placeholder;
          } else if (insertMode === 'after') {
            container.parentNode.insertBefore(placeholder, container.nextSibling);
            container = placeholder;
          }
        } else {
          var containerChildren = container.childNodes;

          for (var ii = 0; ii < containerChildren.length; ii++) {
            if (containerChildren[ii] && containerChildren[ii].tagName != 'VIDEO') {
              container.removeChild(containerChildren[ii]);
            }
          }
        }


        container.style["width"] = "100%";

        container.style["height"] = "100%";
        container.style["position"] = "relative";
        return container;
      };


      ImpartusVC.createAudioEnableButton = function (audioDiv, container) {
        var playButton = document.createElement("button");

        playButton.style.setProperty("box-sizing", "border-box");
        playButton.style.setProperty("height", "74px");
        playButton.style.setProperty("border-style", "solid", "important");
        playButton.style.setProperty("border-width", "37px 0 37px 60px", "important");
        playButton.style.setProperty("border-color", "transparent transparent transparent #707070", "important");
        playButton.style.setProperty("cursor", "pointer");
        playButton.style.setProperty("position", "absolute");
        playButton.style.setProperty("background-color", "transparent");
        playButton.style.setProperty("top", "calc(50% - 37px)");
        playButton.style.setProperty("left", "calc(50% - 37px)");
        container.appendChild(playButton);

        playButton.onclick = function (ev) {
          audioDiv.play();
          playButton.style.display = 'none';
          ev.preventDefault();
        };

        return playButton;
      };


      ImpartusVC.createDomVideoElement = function (container, fallbackText, muted, videoAttributes) {
        var videoElement;

        if (container && container.getElementsByTagName) {
          var vidElementList = container.getElementsByTagName('video');

          if (vidElementList && vidElementList.length > 0) {
            videoElement = vidElementList[0];
          }
        }

        if (!videoElement) {
          videoElement = document.createElement('video');
          container.appendChild(videoElement);
        }

        try {
          for (var attr in videoAttributes) {
            videoElement[attr] = videoAttributes[attr];
          }
        } catch (e) {
          Logger.warn('adding attribute error: ', e);
        }


        videoElement.setAttribute('autoplay', 'autoplay');
        videoElement.autoplay = true;
        videoElement.setAttribute('playsinline', 'playsinline');
        videoElement.playsInline = true;
        videoElement.innerHTML = fallbackText;
        videoElement.style['object-fit'] = 'fill';

        if (muted === true) {
          videoElement.setAttribute('muted', 'muted');
          videoElement.muted = true;
        }

        return videoElement;
      };


      ImpartusVC.createDomAudioElement = function () {
        var audioElement = document.createElement('audio');

        audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.autoplay = true;
        return audioElement;
      };

      ImpartusVC.createStatDisplayElement = function () {
        var statsElement = document.createElement('div');
        statsElement.classList.add('stats');
        return statsElement;
      };


      ImpartusVC.initSession = function (url, apiKey, sessionId) {
        if (!ImpartusVC.sessionObj) {
          ImpartusVC.sessionObj = new ImpartusVC();

          if (ImpartusVC.sessionObj.sessionInfo) {
            ImpartusVC.sessionObj.sessionInfo.url = url;
            ImpartusVC.sessionObj.sessionInfo.apiKey = apiKey;
            ImpartusVC.sessionObj.sessionInfo.sessionId = sessionId;
          }
        } else if (ImpartusVC.sessionObj.sessionInfo && (ImpartusVC.sessionObj.sessionInfo.apiKey != apiKey || ImpartusVC.sessionObj.sessionInfo.sessionId != sessionId)) {
          ImpartusVC.sessionObj.destroy();
          ImpartusVC.sessionObj = new ImpartusVC();

          if (ImpartusVC.sessionObj.sessionInfo) {
            ImpartusVC.sessionObj.sessionInfo.url = url;
            ImpartusVC.sessionObj.sessionInfo.apiKey = apiKey;
            ImpartusVC.sessionObj.sessionInfo.sessionId = sessionId;
          }
        } else { }

        ImpartusVC.sessionObj.on({
          connectionCreated: function (event) {
            Logger.info('[Local Listener] connectionCreated event got fired: ', event);
          },
          connectionDestroyed: function (event) {
            Logger.info('[Local Listener] connectionDestroyed event got fired: ', event);
          },
          sessionConnected: function (event) {
            Logger.info('[Local Listener] sessionConnected event got fired: ', event);
            ImpartusVC.sessionObj.sessionConnectedFired = true;
            ImpartusVC.sessionObj.sessionConnectFailedFired = false;
          },
          sessionConnectFailed: function (event) {
            Logger.info('[Local Listener] sessionConnectFailed event got fired: ', event);
            ImpartusVC.sessionObj.sessionConnectFailedFired = true;
          },
          sessionReconnecting: function (event) {
            Logger.info('[Local Listener] sessionReconnecting event got fired: ', event);
            ImpartusVC.sessionObj.sessionReconnectingFired = true;
          },
          sessionDisconnected: function (event) {
            Logger.info('[Local Listener] sessionDisconnected event got fired: ', event);
            ImpartusVC.sessionObj.sessionDisconnectedFired = true;
            ImpartusVC.sessionObj.sessionConnectFailedFired = false;
            ImpartusVC.sessionObj.sessionReconnectingFired = false;
            ImpartusVC.sessionObj.reconnectionCount = 0;
          },
          sessionReconnected: function (event) {
            Logger.info('[Local Listener] sessionReconnected event got fired: ', event);
            ImpartusVC.sessionObj.sessionConnectFailedFired = false;
            ImpartusVC.sessionObj.sessionDisconnectedFired = false;
            ImpartusVC.sessionObj.sessionReconnectingFired = false;
            ImpartusVC.sessionObj.reconnectionCount = 0;
          },
          streamCreated: function (publisher) {
            Logger.info('[Local Listener] streamCreated event got fired with stream: ', publisher);
          },
          streamDestroyed: function (publisher) {
            Logger.info('[Local Listener] streamDestroyed event got fired with stream: ', publisher);
          },
          streamPropertyChanged: function (event) {
            Logger.info('[Local Listener] streamPropertyChanged event got fired: ', event);
          }
        });
        return ImpartusVC.sessionObj;
      };


      ImpartusVC.getDevices = function (callback) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          Logger.warn('enumerateDevices() not supported.');
          callback(new Error('This browser does not support enumerateDevices APIs'));
          return;
        }

        navigator.mediaDevices.enumerateDevices().then(function (mediaDevices) {
          mediaDevices.map(function (device) {
            return {
              deviceId: device.deviceId || device.id,
              label: device.label,
              kind: ImpartusVC.deviceKindsMap[device.kind]
            };
          }).filter(function (device) {
            return device.kind === 'audioInput' || device.kind === 'videoInput';
          });
          callback(null, mediaDevices);
        }, callback);
      };


      ImpartusVC.prototype.connect = function (token, CB) {
        var self = this;

        if (!token) {
          Logger.error('Token is needed to connect');
          return;
        }

        if (!self.sessionInfo || !self.sessionInfo.apiKey || !self.sessionInfo.sessionId) {
          Logger.error('Init Session is not done');
          return;
        }

        function callback(error, messages) {
          if (error) {
            if (isNaN(self.reconnectionCount)) {
              self.reconnectionCount = 0;
            }

            Logger.info('session connect callback error: ', error);
            Logger.debug('reconnectionCount: ', self.reconnectionCount);

            if (!self.sessionConnectedFired) {
              if (!self.sessionConnectFailedFired) {
                ImpartusVC.sessionObj.sessionConnectFailedFired = true;
                self.trigger('sessionConnectFailed', error);
              }
            }

            if (error.message != 'Authorization Failure' && !ImpartusVC.sessionObj.sessionDisconnectedFired && ImpartusVC.allowAutoReconnection && self.reconnectionCount < 25) {
              self.reconnectionCount++;

              if (!self.sessionReconnectingFired && !ImpartusVC.sessionObj.sessionConnectFailedFired) {
                self.trigger('sessionReconnecting');
              }
            } else {
              self.destroy();
            }
          } else {
            if ('joined' == messages.type) {
              if (self.sessionReconnectingFired && ImpartusVC.allowAutoReconnection) {
                self.trigger('sessionReconnected');
              } else {
                self.dispatchEvent(new EventFactory.SessionConnectEvent(EventMap.SESSION_CONNECTED));
              }
            }
          }

          CB(error, messages);
        }

        self.sessionInfo.token = token;
        self.vcServerManager.init(self.sessionInfo.url, self.sessionInfo.sessionId, token, function (error, messagesServerManager) {
          if (error) {
            callback(error);
          } else {
            if (messagesServerManager) {
              if (messagesServerManager.type == 'complete') {
                Logger.info('Server Manager init complete');
              } else if (messagesServerManager.type == 'session-disconnected') {
                Logger.info('Websocket got disconnected');
                callback('session-disconnected');
              } else if (messagesServerManager.type == 'server-update') {
                Logger.info('Got server update from Server Manager: ', messagesServerManager.server);
                self.vcJanusSession.init(messagesServerManager.server.janusServer, messagesServerManager.server.stunServers, messagesServerManager.server.turnServers, messagesServerManager.server.iceTransportPolicy, function (error, messagesJanusSession) {
                  if (error) {
                    self.vcSessionService.disconnect();
                    callback(error);
                  } else {
                    if (self.vcJanusSession.sessionHandle) {
                      self.vcSessionService.init(self.sessionInfo.token, self.sessionInfo.sessionId, function (error, messagesSessionService) {
                        if (error) {
                          callback(error);
                        } else {
                          if (messagesSessionService) {
                            if ('joined' == messagesSessionService.type) {
                              callback(null, messagesSessionService);
                            }
                          }
                        }
                      });
                    }
                  }
                });
              } else if (messagesServerManager.type == 'resolution-update') {
                self.vcResolutionManager.availableResolutions = messagesServerManager.resolutions;
                self.vcResolutionManager.bitrates = messagesServerManager.bitrates;
              }

              if (messagesServerManager.type == 'connection-created') {
                Object.assign(self.connection, ImpartusVC.sessionObj.vcServerManager.connectionList[ImpartusVC.sessionObj.vcServerManager.ownConnectionId]);

                Logger.info('Own Connection: ', self.connection);
                self.dispatchEvent(new EventFactory.ConnectionEvent(EventMap.CONNECTION_CREATED, messagesServerManager.connection, null, false));
              }

              if (messagesServerManager.type == 'connection-destroyed') {
                self.dispatchEvent(new EventFactory.ConnectionEvent(EventMap.CONNECTION_DESTROYED, messagesServerManager.connection, 'clientDisconnected'));
              }
            }
          }
        });
      };


      ImpartusVC.initPublisher = function (div, options, CB) {
        if (!ImpartusVC.sessionObj) {
          Logger.error('Please create a session first');
          return;
        }

        return ImpartusVC.sessionObj.vcStreamsService.initPublisher(div, options, CB);
      };


      ImpartusVC.getVideoTypeFromSource = function (videoSource) {
        var videoType = 'camera';

        if (videoSource == 'application' || videoSource == 'window' || videoSource == 'screen') {
          videoType = 'screen';
        }

        return videoType;
      };

      ImpartusVC.hasVideo = function (mediaStream) {
        var hasVideo = false;

        try {
          mediaStream.getVideoTracks().forEach(function (videoTrack) {
            hasVideo = !!videoTrack.enabled;
          });
        } catch (error) {
          Logger.error(error);
        }

        return hasVideo;
      };

      ImpartusVC.hasAudio = function (mediaStream) {
        var hasAudio = false;

        try {
          mediaStream.getVideoTracks().forEach(function (audioTrack) {
            hasAudio = !!audioTrack.enabled;
          });
        } catch (error) {
          Logger.error(error);
        }

        return hasAudio;
      };


      ImpartusVC.registerScreenSharingExtension = function (kind, id, version) {
        if (kind === 'chrome') {
          ImpartusVC.extensionId = id;
          ImpartusVC.extensionRegistered = true;
          ImpartusVC.extensionVersion = version || 1;
          ImpartusVC.shareDesktopMsgType = 'getSourceId';
          ImpartusVC.extensionInstalled = false;
          ImpartusVC.screenShareSupported = false;

          if (version == 2) {
            chrome.runtime.sendMessage(ImpartusVC.extensionId, {
              type: 'isInstalled'
            }, function (response) {
              ImpartusVC.extensionInstalled = !!response;

              if (typeof ImpartusVC.callbacksStore['isExtensionInstalled'] == 'function') {
                ImpartusVC.callbacksStore['isExtensionInstalled']({
                  supported: true,
                  supportedSources: {
                    screen: true,
                    window: true
                  },
                  extensionInstalled: ImpartusVC.extensionInstalled,
                  extensionRequired: 'chrome',
                  extensionRegistered: ImpartusVC.extensionRegistered
                });
              }
            });
            return;
          }

          var prefix = 'com.tokbox.screenSharing.' + ImpartusVC.extensionId;

          var request = function request(method, payload) {
            var res = {
              payload: payload,
              from: 'jsapi'
            };
            res[prefix] = method;
            return res;
          };

          window.addEventListener('message', function (event) {
            if (event.origin !== window.location.origin) {
              return;
            }

            if (!(event.data != null && typeof event.data === 'object')) {
              return;
            }

            if (event.data.from !== 'extension') {
              return;
            }

            var method = event.data[prefix];
            var payload = event.data.payload;

            if (payload && payload.requestId) { }

            if (method === 'permissionDenied') {
              ImpartusVCErrorClass.handleJsException({
                error: ErrorFactory(ErrorMap.USER_MEDIA_ACCESS_DENIED, new Error('User denied access to screensharing')),
                target: ImpartusVC
              });
              return;
            } else if (method === 'extensionLoaded') {
              Logger.info('Extension Loaded');
              ImpartusVC.extensionInstalled = true;

              if (typeof ImpartusVC.callbacksStore['isExtensionInstalled'] == 'function') {
                ImpartusVC.callbacksStore['isExtensionInstalled']({
                  supported: true,
                  supportedSources: {
                    screen: true,
                    window: true
                  },
                  extensionInstalled: ImpartusVC.extensionInstalled,
                  extensionRequired: 'chrome',
                  extensionRegistered: ImpartusVC.extensionRegistered
                });
              }
            } else if (method === 'sourceId') {
              Logger.info('Response from extension: ', payload.sourceId);

              if (typeof ImpartusVC.callbacksStore['getSourceId'] === 'function') {
                ImpartusVC.callbacksStore['getSourceId'](payload.sourceId);
              }
            }
          });
          var post = request('isExtensionInstalled', {
            requestId: 'isExtensionInstalled'
          });
          window.postMessage(post, '*');
        }
      };


      ImpartusVC.checkScreenSharingCapability = function (CB) {
        if (typeof CB !== 'function') {
          throw 'checkScreenSharingCapability needs a callback function';
          return;
        }

        ImpartusVC.callbacksStore['isExtensionInstalled'] = CB;

        if (ImpartusVC.browserDetails.browser === 'chrome') {
          ImpartusVC.screenShareSupported = true;
          CB({
            supported: ImpartusVC.screenShareSupported,
            supportedSources: {
              screen: true,
              window: true
            },
            extensionInstalled: ImpartusVC.extensionInstalled,
            extensionRequired: !navigator.mediaDevices.getDisplayMedia,
            extensionRegistered: ImpartusVC.extensionRegistered
          });
        } else {
          if (typeof navigator.mediaDevices.getDisplayMedia === 'function') {
            ImpartusVC.screenShareSupported = true;
            CB({
              supported: ImpartusVC.screenShareSupported,
              supportedSources: {
                screen: true,
                application: true,
                window: true
              }
            });
          } else {
            ImpartusVC.screenShareSupported = false;
            CB({
              supported: ImpartusVC.screenShareSupported
            });
          }
        }
      };


      ImpartusVC.prototype.publish = function (publisher, CB) {
        var self = this;
        self.vcStreamsService.publish(publisher, CB);
        self.vcServerManager.logPublish(publisher.stream.streamId, publisher.options.publishAudio, publisher.options.publishVideo, publisher.options, publisher.stream.videoType);
      };


      ImpartusVC.prototype.unpublish = function (publisher, saveStream) {
        var self = this;
        self.vcStreamsService.unpublish(publisher, saveStream);
        self.vcServerManager.logUnpublish(publisher.stream.streamId);
      };


      ImpartusVC.prototype.subscribe = function (stream, div, options, CB) {
        var self = this;
        return self.vcRemoteStreamsService.subscribe(stream, div, options, CB);
      };


      ImpartusVC.prototype.unsubscribe = function (subscriber) {
        var self = this;
        self.vcServerManager.logUnsubscribe(self.vcServerManager.selectedVRJanusServer, subscriber.stream.streamId, subscriber.subscriptionId);
        self.vcRemoteStreamsService.unsubscribe(subscriber);
      };


      ImpartusVC.prototype.disconnect = function () {
        var self = this;
        self.vcSessionService.destroy();
        self.vcJanusSession.destroy();
        self.vcServerManager.disconnect();

        if (!self.sessionDisconnectedFired) {
          var publicEvent = new EventFactory.SessionDisconnectEvent(EventMap.SESSION_DISCONNECTED, 'networkDisconnected');
          setTimeout(function () {
            self.dispatchEvent(publicEvent);
          });
        }

        clearInterval(self.networkQualityTimer);
      };


      ImpartusVC.prototype.destroy = ImpartusVC.prototype.disconnect;
      window.ImpartusVC = ImpartusVC;
      console.log('VC SDK v1.0.36');
    })(window, document);













    module.exports = window.ImpartusVC;

  }, { "../errors/ErrorFactory": 1, "../errors/ErrorMap": 2, "../errors/ImpartusVCErrorClass": 4, "../events/EventFactory": 6, "../events/EventMap": 7, "../events/eventing": 8, "./janus.js": 11, "./vcJanusSession.js": 12, "./vcRemoteStreamsService": 13, "./vcResolutionManager": 14, "./vcServerManager.js": 15, "./vcSessionService": 16, "./vcStreamsService": 17, "js-logger": 84, "webrtc-adapter": 98 }], 11: [function (require, module, exports) {


    (function (window, document, undefined) {

      window.Janus = function (gatewayCallbacks) {
        if (Janus.initDone === undefined) {
          gatewayCallbacks.error("Library not initialized");
          return {};
        }
        if (!Janus.isWebrtcSupported()) {
          gatewayCallbacks.error("WebRTC not supported by this browser");
          return {};
        }
        Janus.log("Library initialized: " + Janus.initDone);
        gatewayCallbacks = gatewayCallbacks || {};
        gatewayCallbacks.success = (typeof gatewayCallbacks.success == "function") ? gatewayCallbacks.success : Janus.noop;
        gatewayCallbacks.error = (typeof gatewayCallbacks.error == "function") ? gatewayCallbacks.error : Janus.noop;
        gatewayCallbacks.destroyed = (typeof gatewayCallbacks.destroyed == "function") ? gatewayCallbacks.destroyed : Janus.noop;
        if (gatewayCallbacks.server === null || gatewayCallbacks.server === undefined) {
          gatewayCallbacks.error("Invalid gateway url");
          return {};
        }
        var websockets = false;
        var ws = null;
        var wsHandlers = {};
        var wsKeepaliveTimeoutId = null;

        var servers = null, serversIndex = 0;
        var server = gatewayCallbacks.server;
        if (Janus.isArray(server)) {
          Janus.log("Multiple servers provided (" + server.length + "), will use the first that works");
          server = null;
          servers = gatewayCallbacks.server;
          Janus.debug(servers);
        } else {
          if (server.indexOf("ws") === 0) {
            websockets = true;
            Janus.log("Using WebSockets to contact Janus: " + server);
          } else {
            websockets = false;
            Janus.log("Using REST API to contact Janus: " + server);
          }
        }
        var iceServers = gatewayCallbacks.iceServers;
        if (iceServers === undefined || iceServers === null)
          iceServers = [{ urls: "stun:stun.l.google.com:19302" }];
        var iceTransportPolicy = gatewayCallbacks.iceTransportPolicy;
        var bundlePolicy = gatewayCallbacks.bundlePolicy;
        var ipv6Support = gatewayCallbacks.ipv6;
        if (ipv6Support === undefined || ipv6Support === null)
          ipv6Support = false;
        var withCredentials = false;
        if (gatewayCallbacks.withCredentials !== undefined && gatewayCallbacks.withCredentials !== null)
          withCredentials = gatewayCallbacks.withCredentials === true;
        var maxev = null;
        if (gatewayCallbacks.max_poll_events !== undefined && gatewayCallbacks.max_poll_events !== null)
          maxev = gatewayCallbacks.max_poll_events;
        if (maxev < 1)
          maxev = 1;
        var token = null;
        if (gatewayCallbacks.token !== undefined && gatewayCallbacks.token !== null)
          token = gatewayCallbacks.token;
        var apisecret = null;
        if (gatewayCallbacks.apisecret !== undefined && gatewayCallbacks.apisecret !== null)
          apisecret = gatewayCallbacks.apisecret;
        this.destroyOnUnload = true;
        if (gatewayCallbacks.destroyOnUnload !== undefined && gatewayCallbacks.destroyOnUnload !== null)
          this.destroyOnUnload = (gatewayCallbacks.destroyOnUnload === true);

        var connected = false;
        var sessionId = null;
        var pluginHandles = {};
        var that = this;
        var retries = 0;
        var transactions = {};
        createSession(gatewayCallbacks);

        this.getServer = function () {
          return server;
        };
        this.isConnected = function () {
          return connected;
        };
        this.reconnect = function (callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          callbacks["reconnect"] = true;
          createSession(callbacks);
        };
        this.getSessionId = function () {
          return sessionId;
        };
        this.destroy = function (callbacks) {
          destroySession(callbacks);
        };
        this.attach = function (callbacks) {
          createHandle(callbacks);
        };

        function eventHandler() {
          if (sessionId == null)
            return;
          Janus.debug('Long poll...');
          if (!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            return;
          }
          var longpoll = server + "/" + sessionId + "?rid=" + new Date().getTime();
          if (maxev !== undefined && maxev !== null)
            longpoll = longpoll + "&maxev=" + maxev;
          if (token !== null && token !== undefined)
            longpoll = longpoll + "&token=" + token;
          if (apisecret !== null && apisecret !== undefined)
            longpoll = longpoll + "&apisecret=" + apisecret;
          Janus.httpAPICall(longpoll, {
            verb: 'GET',
            withCredentials: withCredentials,
            success: handleEvent,
            timeout: 60000,
            error: function (textStatus, errorThrown) {
              Janus.error(textStatus + ":", errorThrown);
              retries++;
              if (retries > 3) {
                connected = false;
                gatewayCallbacks.error("Lost connection to the gateway (is it down?)");
                return;
              }
              eventHandler();
            }
          });
        }

        function handleEvent(json, skipTimeout) {
          retries = 0;
          if (!websockets && sessionId !== undefined && sessionId !== null && skipTimeout !== true)
            setTimeout(eventHandler, 200);
          if (!websockets && Janus.isArray(json)) {
            for (var i = 0; i < json.length; i++) {
              handleEvent(json[i], true);
            }
            return;
          }
          if (json["janus"] === "keepalive") {
            Janus.vdebug("Got a keepalive on session " + sessionId);
            return;
          } else if (json["janus"] === "ack") {
            Janus.debug("Got an ack on session " + sessionId);
            Janus.debug(json);
            var transaction = json["transaction"];
            if (transaction !== null && transaction !== undefined) {
              var reportSuccess = transactions[transaction];
              if (reportSuccess !== null && reportSuccess !== undefined) {
                reportSuccess(json);
              }
              delete transactions[transaction];
            }
            return;
          } else if (json["janus"] === "success") {
            Janus.debug("Got a success on session " + sessionId);
            Janus.debug(json);
            var transaction = json["transaction"];
            if (transaction !== null && transaction !== undefined) {
              var reportSuccess = transactions[transaction];
              if (reportSuccess !== null && reportSuccess !== undefined) {
                reportSuccess(json);
              }
              delete transactions[transaction];
            }
            return;
          } else if (json["janus"] === "trickle") {
            var sender = json["sender"];
            if (sender === undefined || sender === null) {
              Janus.warn("Missing sender...");
              return;
            }
            var pluginHandle = pluginHandles[sender];
            if (pluginHandle === undefined || pluginHandle === null) {
              Janus.debug("This handle is not attached to this session");
              return;
            }
            var candidate = json["candidate"];
            Janus.debug("Got a trickled candidate on session " + sessionId);
            Janus.debug(candidate);
            var config = pluginHandle.webrtcStuff;
            if (config.pc && config.remoteSdp) {
              Janus.debug("Adding remote candidate:", candidate);
              if (!candidate || candidate.completed === true) {
                config.pc.addIceCandidate();
              } else {
                config.pc.addIceCandidate(new RTCIceCandidate(candidate));
              }
            } else {
              Janus.debug("We didn't do setRemoteDescription (trickle got here before the offer?), caching candidate");
              if (!config.candidates)
                config.candidates = [];
              config.candidates.push(candidate);
              Janus.debug(config.candidates);
            }
          } else if (json["janus"] === "webrtcup") {
            Janus.debug("Got a webrtcup event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if (sender === undefined || sender === null) {
              Janus.warn("Missing sender...");
              return;
            }
            var pluginHandle = pluginHandles[sender];
            if (pluginHandle === undefined || pluginHandle === null) {
              Janus.debug("This handle is not attached to this session");
              return;
            }
            pluginHandle.webrtcState(true);
            return;
          } else if (json["janus"] === "hangup") {
            Janus.debug("Got a hangup event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if (sender === undefined || sender === null) {
              Janus.warn("Missing sender...");
              return;
            }
            var pluginHandle = pluginHandles[sender];
            if (pluginHandle === undefined || pluginHandle === null) {
              Janus.debug("This handle is not attached to this session");
              return;
            }
            pluginHandle.webrtcState(false, json["reason"]);
            pluginHandle.hangup();
          } else if (json["janus"] === "detached") {
            Janus.debug("Got a detached event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if (sender === undefined || sender === null) {
              Janus.warn("Missing sender...");
              return;
            }
            var pluginHandle = pluginHandles[sender];
            if (pluginHandle === undefined || pluginHandle === null) {
              return;
            }
            pluginHandle.detached = true;
            pluginHandle.ondetached();
            pluginHandle.detach();
          } else if (json["janus"] === "media") {
            Janus.debug("Got a media event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if (sender === undefined || sender === null) {
              Janus.warn("Missing sender...");
              return;
            }
            var pluginHandle = pluginHandles[sender];
            if (pluginHandle === undefined || pluginHandle === null) {
              Janus.debug("This handle is not attached to this session");
              return;
            }
            pluginHandle.mediaState(json["type"], json["receiving"]);
          } else if (json["janus"] === "slowlink") {
            Janus.debug("Got a slowlink event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if (sender === undefined || sender === null) {
              Janus.warn("Missing sender...");
              return;
            }
            var pluginHandle = pluginHandles[sender];
            if (pluginHandle === undefined || pluginHandle === null) {
              Janus.debug("This handle is not attached to this session");
              return;
            }
            pluginHandle.slowLink(json["uplink"], json["nacks"]);
          } else if (json["janus"] === "error") {
            Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
            Janus.debug(json);
            var transaction = json["transaction"];
            if (transaction !== null && transaction !== undefined) {
              var reportSuccess = transactions[transaction];
              if (reportSuccess !== null && reportSuccess !== undefined) {
                reportSuccess(json);
              }
              if (json["error"].code == 458) {
                destroySession();
                gatewayCallbacks.error("Stale session handle");
              }
              delete transactions[transaction];
            }
            return;
          } else if (json["janus"] === "event") {
            Janus.debug("Got a plugin event on session " + sessionId);
            Janus.debug(json);
            var sender = json["sender"];
            if (sender === undefined || sender === null) {
              Janus.warn("Missing sender...");
              return;
            }
            var plugindata = json["plugindata"];
            if (plugindata === undefined || plugindata === null) {
              Janus.warn("Missing plugindata...");
              return;
            }
            Janus.debug("  -- Event is coming from " + sender + " (" + plugindata["plugin"] + ")");
            var data = plugindata["data"];
            Janus.debug(data);
            var pluginHandle = pluginHandles[sender];
            if (pluginHandle === undefined || pluginHandle === null) {
              Janus.warn("This handle is not attached to this session");
              return;
            }
            var jsep = json["jsep"];
            if (jsep !== undefined && jsep !== null) {
              Janus.debug("Handling SDP as well...");
              Janus.debug(jsep);
            }
            var callback = pluginHandle.onmessage;
            if (callback !== null && callback !== undefined) {
              Janus.debug("Notifying application...");
              callback(data, jsep);
            } else {
              Janus.debug("No provided notification callback");
            }
          } else {
            Janus.warn("Unknown message/event  '" + json["janus"] + "' on session " + sessionId);
            Janus.debug(json);
          }
        }

        function keepAlive() {
          if (server === null || !websockets || !connected)
            return;
          wsKeepaliveTimeoutId = setTimeout(keepAlive, 30000);
          var request = { "janus": "keepalive", "session_id": sessionId, "transaction": Janus.randomString(12) };
          if (token !== null && token !== undefined)
            request["token"] = token;
          if (apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
          ws.send(JSON.stringify(request));
        }

        function createSession(callbacks) {
          var transaction = Janus.randomString(12);
          var request = { "janus": "create", "transaction": transaction };
          if (callbacks["reconnect"]) {
            connected = false;
            request["janus"] = "claim";
            request["session_id"] = sessionId;
            if (ws) {
              ws.onopen = null;
              ws.onerror = null;
              ws.onclose = null;
              if (wsKeepaliveTimeoutId) {
                clearTimeout(wsKeepaliveTimeoutId);
                wsKeepaliveTimeoutId = null;
              }
            }
          }
          if (token !== null && token !== undefined)
            request["token"] = token;
          if (apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
          if (server === null && Janus.isArray(servers)) {
            server = servers[serversIndex];
            if (server.indexOf("ws") === 0) {
              websockets = true;
              Janus.log("Server #" + (serversIndex + 1) + ": trying WebSockets to contact Janus (" + server + ")");
            } else {
              websockets = false;
              Janus.log("Server #" + (serversIndex + 1) + ": trying REST API to contact Janus (" + server + ")");
            }
          }
          if (websockets) {
            ws = Janus.newWebSocket(server, 'janus-protocol');
            wsHandlers = {
              'error': function () {
                Janus.error("Error connecting to the Janus WebSockets server... " + server);
                if (Janus.isArray(servers)) {
                  serversIndex++;
                  if (serversIndex == servers.length) {
                    callbacks.error("Error connecting to any of the provided Janus servers: Is the gateway down?");
                    return;
                  }
                  server = null;
                  setTimeout(function () {
                    createSession(callbacks);
                  }, 200);
                  return;
                }
                callbacks.error("Error connecting to the Janus WebSockets server: Is the gateway down?");
              },

              'open': function () {
                transactions[transaction] = function (json) {
                  Janus.debug(json);
                  if (json["janus"] !== "success") {
                    Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                    callbacks.error(json["error"].reason);
                    return;
                  }
                  wsKeepaliveTimeoutId = setTimeout(keepAlive, 30000);
                  connected = true;
                  sessionId = json["session_id"] ? json["session_id"] : json.data["id"];
                  if (callbacks["reconnect"]) {
                    Janus.log("Claimed session: " + sessionId);
                  } else {
                    Janus.log("Created session: " + sessionId);
                  }
                  Janus.sessions[sessionId] = that;
                  callbacks.success();
                };
                ws.send(JSON.stringify(request));
              },

              'message': function (event) {
                handleEvent(JSON.safeParse(event.data));
              },

              'close': function () {
                if (server === null || !connected) {
                  return;
                }
                connected = false;
                gatewayCallbacks.error("Lost connection to the gateway (is it down?)");
              }
            };

            for (var eventName in wsHandlers) {
              ws.addEventListener(eventName, wsHandlers[eventName]);
            }

            return;
          }
          Janus.httpAPICall(server, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function (json) {
              Janus.debug(json);
              if (json["janus"] !== "success") {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                callbacks.error(json["error"].reason);
                return;
              }
              connected = true;
              sessionId = json["session_id"] ? json["session_id"] : json.data["id"];
              if (callbacks["reconnect"]) {
                Janus.log("Claimed session: " + sessionId);
              } else {
                Janus.log("Created session: " + sessionId);
              }
              Janus.sessions[sessionId] = that;
              eventHandler();
              callbacks.success();
            },
            error: function (textStatus, errorThrown) {
              Janus.error(textStatus + ":", errorThrown);
              if (Janus.isArray(servers)) {
                serversIndex++;
                if (serversIndex == servers.length) {
                  callbacks.error("Error connecting to any of the provided Janus servers: Is the gateway down?");
                  return;
                }
                server = null;
                setTimeout(function () {
                  createSession(callbacks);
                }, 200);
                return;
              }
              if (errorThrown === "")
                callbacks.error(textStatus + ": Is the gateway down?");
              else
                callbacks.error(textStatus + ": " + errorThrown);
            }
          });
        }

        function destroySession(callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          var asyncRequest = true;
          if (callbacks.asyncRequest !== undefined && callbacks.asyncRequest !== null)
            asyncRequest = (callbacks.asyncRequest === true);
          var notifyDestroyed = true;
          if (callbacks.notifyDestroyed !== undefined && callbacks.notifyDestroyed !== null)
            notifyDestroyed = (callbacks.notifyDestroyed === true);
          Janus.log("Destroying session " + sessionId + " (async=" + asyncRequest + ")");
          if (!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.success();
            return;
          }
          if (sessionId === undefined || sessionId === null) {
            Janus.warn("No session to destroy");
            callbacks.success();
            if (notifyDestroyed)
              gatewayCallbacks.destroyed();
            return;
          }
          delete Janus.sessions[sessionId];
          var request = { "janus": "destroy", "transaction": Janus.randomString(12) };
          if (token !== null && token !== undefined)
            request["token"] = token;
          if (apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
          if (websockets) {
            request["session_id"] = sessionId;

            var unbindWebSocket = function () {
              for (var eventName in wsHandlers) {
                ws.removeEventListener(eventName, wsHandlers[eventName]);
              }
              ws.removeEventListener('message', onUnbindMessage);
              ws.removeEventListener('error', onUnbindError);
              if (wsKeepaliveTimeoutId) {
                clearTimeout(wsKeepaliveTimeoutId);
              }
              ws.close();
            };

            var onUnbindMessage = function (event) {
              var data = JSON.safeParse(event.data);
              if (data.session_id == request.session_id && data.transaction == request.transaction) {
                unbindWebSocket();
                callbacks.success();
                if (notifyDestroyed)
                  gatewayCallbacks.destroyed();
              }
            };
            var onUnbindError = function (event) {
              unbindWebSocket();
              callbacks.error("Failed to destroy the gateway: Is the gateway down?");
              if (notifyDestroyed)
                gatewayCallbacks.destroyed();
            };

            ws.addEventListener('message', onUnbindMessage);
            ws.addEventListener('error', onUnbindError);

            ws.send(JSON.stringify(request));
            return;
          }
          Janus.httpAPICall(server + "/" + sessionId, {
            verb: 'POST',
            async: asyncRequest,
            withCredentials: withCredentials,
            body: request,
            success: function (json) {
              Janus.log("Destroyed session:");
              Janus.debug(json);
              sessionId = null;
              connected = false;
              if (json["janus"] !== "success") {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
              }
              callbacks.success();
              if (notifyDestroyed)
                gatewayCallbacks.destroyed();
            },
            error: function (textStatus, errorThrown) {
              Janus.error(textStatus + ":", errorThrown);
              sessionId = null;
              connected = false;
              callbacks.success();
              if (notifyDestroyed)
                gatewayCallbacks.destroyed();
            }
          });
        }

        function createHandle(callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          callbacks.consentDialog = (typeof callbacks.consentDialog == "function") ? callbacks.consentDialog : Janus.noop;
          callbacks.iceState = (typeof callbacks.iceState == "function") ? callbacks.iceState : Janus.noop;
          callbacks.mediaState = (typeof callbacks.mediaState == "function") ? callbacks.mediaState : Janus.noop;
          callbacks.webrtcState = (typeof callbacks.webrtcState == "function") ? callbacks.webrtcState : Janus.noop;
          callbacks.slowLink = (typeof callbacks.slowLink == "function") ? callbacks.slowLink : Janus.noop;
          callbacks.onmessage = (typeof callbacks.onmessage == "function") ? callbacks.onmessage : Janus.noop;
          callbacks.onlocalstream = (typeof callbacks.onlocalstream == "function") ? callbacks.onlocalstream : Janus.noop;
          callbacks.onremotestream = (typeof callbacks.onremotestream == "function") ? callbacks.onremotestream : Janus.noop;
          callbacks.ondata = (typeof callbacks.ondata == "function") ? callbacks.ondata : Janus.noop;
          callbacks.ondataopen = (typeof callbacks.ondataopen == "function") ? callbacks.ondataopen : Janus.noop;
          callbacks.oncleanup = (typeof callbacks.oncleanup == "function") ? callbacks.oncleanup : Janus.noop;
          callbacks.ondetached = (typeof callbacks.ondetached == "function") ? callbacks.ondetached : Janus.noop;
          if (!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.error("Is the gateway down? (connected=false)");
            return;
          }
          var plugin = callbacks.plugin;
          if (plugin === undefined || plugin === null) {
            Janus.error("Invalid plugin");
            callbacks.error("Invalid plugin");
            return;
          }
          var opaqueId = callbacks.opaqueId;
          var handleToken = callbacks.token ? callbacks.token : token;
          var transaction = Janus.randomString(12);
          var request = { "janus": "attach", "plugin": plugin, "opaque_id": opaqueId, "transaction": transaction };
          if (handleToken !== null && handleToken !== undefined)
            request["token"] = handleToken;
          if (apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
          if (websockets) {
            transactions[transaction] = function (json) {
              Janus.debug(json);
              if (json["janus"] !== "success") {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                return;
              }
              var handleId = json.data["id"];
              Janus.log("Created handle: " + handleId);
              var pluginHandle =
              {
                session: that,
                plugin: plugin,
                id: handleId,
                token: handleToken,
                detached: false,
                webrtcStuff: {
                  started: false,
                  myStream: null,
                  streamExternal: false,
                  remoteStream: null,
                  mySdp: null,
                  mediaConstraints: null,
                  pc: null,
                  dataChannel: null,
                  dtmfSender: null,
                  trickle: true,
                  iceDone: false,
                  volume: {
                    value: null,
                    timer: null
                  },
                  bitrate: {
                    value: null,
                    bsnow: null,
                    bsbefore: null,
                    tsnow: null,
                    tsbefore: null,
                    timer: null
                  }
                },
                getId: function () {
                  return handleId;
                },
                getPlugin: function () {
                  return plugin;
                },
                getVolume: function () {
                  return getVolume(handleId);
                },
                isAudioMuted: function () {
                  return isMuted(handleId, false);
                },
                muteAudio: function () {
                  return mute(handleId, false, true);
                },
                unmuteAudio: function () {
                  return mute(handleId, false, false);
                },
                isVideoMuted: function () {
                  return isMuted(handleId, true);
                },
                muteVideo: function () {
                  return mute(handleId, true, true);
                },
                unmuteVideo: function () {
                  return mute(handleId, true, false);
                },
                getBitrate: function () {
                  return getBitrate(handleId);
                },
                send: function (callbacks) {
                  sendMessage(handleId, callbacks);
                },
                data: function (callbacks) {
                  sendData(handleId, callbacks);
                },
                dtmf: function (callbacks) {
                  sendDtmf(handleId, callbacks);
                },
                consentDialog: callbacks.consentDialog,
                iceState: callbacks.iceState,
                mediaState: callbacks.mediaState,
                webrtcState: callbacks.webrtcState,
                slowLink: callbacks.slowLink,
                onmessage: callbacks.onmessage,
                createOffer: function (callbacks) {
                  prepareWebrtc(handleId, callbacks);
                },
                createAnswer: function (callbacks) {
                  prepareWebrtc(handleId, callbacks);
                },
                handleRemoteJsep: function (callbacks) {
                  prepareWebrtcPeer(handleId, callbacks);
                },
                onlocalstream: callbacks.onlocalstream,
                onremotestream: callbacks.onremotestream,
                ondata: callbacks.ondata,
                ondataopen: callbacks.ondataopen,
                oncleanup: callbacks.oncleanup,
                ondetached: callbacks.ondetached,
                hangup: function (sendRequest) {
                  cleanupWebrtc(handleId, sendRequest === true);
                },
                detach: function (callbacks) {
                  destroyHandle(handleId, callbacks);
                }
              }
              pluginHandles[handleId] = pluginHandle;
              callbacks.success(pluginHandle);
            };
            request["session_id"] = sessionId;
            ws.send(JSON.stringify(request));
            return;
          }
          Janus.httpAPICall(server + "/" + sessionId, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function (json) {
              Janus.debug(json);
              if (json["janus"] !== "success") {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                return;
              }
              var handleId = json.data["id"];
              Janus.log("Created handle: " + handleId);
              var pluginHandle =
              {
                session: that,
                plugin: plugin,
                id: handleId,
                token: handleToken,
                detached: false,
                webrtcStuff: {
                  started: false,
                  myStream: null,
                  streamExternal: false,
                  remoteStream: null,
                  mySdp: null,
                  mediaConstraints: null,
                  pc: null,
                  dataChannel: null,
                  dtmfSender: null,
                  trickle: true,
                  iceDone: false,
                  volume: {
                    value: null,
                    timer: null
                  },
                  bitrate: {
                    value: null,
                    bsnow: null,
                    bsbefore: null,
                    tsnow: null,
                    tsbefore: null,
                    timer: null
                  }
                },
                getId: function () {
                  return handleId;
                },
                getPlugin: function () {
                  return plugin;
                },
                getVolume: function () {
                  return getVolume(handleId);
                },
                isAudioMuted: function () {
                  return isMuted(handleId, false);
                },
                muteAudio: function () {
                  return mute(handleId, false, true);
                },
                unmuteAudio: function () {
                  return mute(handleId, false, false);
                },
                isVideoMuted: function () {
                  return isMuted(handleId, true);
                },
                muteVideo: function () {
                  return mute(handleId, true, true);
                },
                unmuteVideo: function () {
                  return mute(handleId, true, false);
                },
                getBitrate: function () {
                  return getBitrate(handleId);
                },
                send: function (callbacks) {
                  sendMessage(handleId, callbacks);
                },
                data: function (callbacks) {
                  sendData(handleId, callbacks);
                },
                dtmf: function (callbacks) {
                  sendDtmf(handleId, callbacks);
                },
                consentDialog: callbacks.consentDialog,
                iceState: callbacks.iceState,
                mediaState: callbacks.mediaState,
                webrtcState: callbacks.webrtcState,
                slowLink: callbacks.slowLink,
                onmessage: callbacks.onmessage,
                createOffer: function (callbacks) {
                  prepareWebrtc(handleId, callbacks);
                },
                createAnswer: function (callbacks) {
                  prepareWebrtc(handleId, callbacks);
                },
                handleRemoteJsep: function (callbacks) {
                  prepareWebrtcPeer(handleId, callbacks);
                },
                onlocalstream: callbacks.onlocalstream,
                onremotestream: callbacks.onremotestream,
                ondata: callbacks.ondata,
                ondataopen: callbacks.ondataopen,
                oncleanup: callbacks.oncleanup,
                ondetached: callbacks.ondetached,
                hangup: function (sendRequest) {
                  cleanupWebrtc(handleId, sendRequest === true);
                },
                detach: function (callbacks) {
                  destroyHandle(handleId, callbacks);
                }
              }
              pluginHandles[handleId] = pluginHandle;
              callbacks.success(pluginHandle);
            },
            error: function (textStatus, errorThrown) {
              Janus.error(textStatus + ":", errorThrown);
            }
          });
        }

        function sendMessage(handleId, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          if (!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.error("Is the gateway down? (connected=false)");
            return;
          }
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var message = callbacks.message;
          var jsep = callbacks.jsep;
          var transaction = Janus.randomString(12);
          var request = { "janus": "message", "body": message, "transaction": transaction };
          if (pluginHandle.token !== null && pluginHandle.token !== undefined)
            request["token"] = pluginHandle.token;
          if (apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
          if (jsep !== null && jsep !== undefined)
            request.jsep = jsep;
          Janus.debug("Sending message to plugin (handle=" + handleId + "):");
          Janus.debug(request);
          if (websockets) {
            request["session_id"] = sessionId;
            request["handle_id"] = handleId;
            transactions[transaction] = function (json) {
              Janus.debug("Message sent!");
              Janus.debug(json);
              if (json["janus"] === "success") {
                var plugindata = json["plugindata"];
                if (plugindata === undefined || plugindata === null) {
                  Janus.warn("Request succeeded, but missing plugindata...");
                  callbacks.success();
                  return;
                }
                Janus.log("Synchronous transaction successful (" + plugindata["plugin"] + ")");
                var data = plugindata["data"];
                Janus.debug(data);
                callbacks.success(data);
                return;
              } else if (json["janus"] !== "ack") {
                if (json["error"] !== undefined && json["error"] !== null) {
                  Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                  callbacks.error(json["error"].code + " " + json["error"].reason);
                } else {
                  Janus.error("Unknown error");
                  callbacks.error("Unknown error");
                }
                return;
              }
              callbacks.success();
            };
            ws.send(JSON.stringify(request));
            return;
          }
          Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function (json) {
              Janus.debug("Message sent!");
              Janus.debug(json);
              if (json["janus"] === "success") {
                var plugindata = json["plugindata"];
                if (plugindata === undefined || plugindata === null) {
                  Janus.warn("Request succeeded, but missing plugindata...");
                  callbacks.success();
                  return;
                }
                Janus.log("Synchronous transaction successful (" + plugindata["plugin"] + ")");
                var data = plugindata["data"];
                Janus.debug(data);
                callbacks.success(data);
                return;
              } else if (json["janus"] !== "ack") {
                if (json["error"] !== undefined && json["error"] !== null) {
                  Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                  callbacks.error(json["error"].code + " " + json["error"].reason);
                } else {
                  Janus.error("Unknown error");
                  callbacks.error("Unknown error");
                }
                return;
              }
              callbacks.success();
            },
            error: function (textStatus, errorThrown) {
              Janus.error(textStatus + ":", errorThrown);
              callbacks.error(textStatus + ": " + errorThrown);
            }
          });
        }

        function sendTrickleCandidate(handleId, candidate) {
          if (!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            return;
          }
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var request = { "janus": "trickle", "candidate": candidate, "transaction": Janus.randomString(12) };
          if (pluginHandle.token !== null && pluginHandle.token !== undefined)
            request["token"] = pluginHandle.token;
          if (apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
          Janus.vdebug("Sending trickle candidate (handle=" + handleId + "):");
          Janus.vdebug(request);
          if (websockets) {
            request["session_id"] = sessionId;
            request["handle_id"] = handleId;
            ws.send(JSON.stringify(request));
            return;
          }
          Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
            verb: 'POST',
            withCredentials: withCredentials,
            body: request,
            success: function (json) {
              Janus.vdebug("Candidate sent!");
              Janus.vdebug(json);
              if (json["janus"] !== "ack") {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                return;
              }
            },
            error: function (textStatus, errorThrown) {
              Janus.error(textStatus + ":", errorThrown);
            }
          });
        }

        function sendData(handleId, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          var text = callbacks.text;
          if (text === null || text === undefined) {
            Janus.warn("Invalid text");
            callbacks.error("Invalid text");
            return;
          }
          Janus.log("Sending string on data channel: " + text);
          config.dataChannel.send(text);
          callbacks.success();
        }

        function sendDtmf(handleId, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          if (config.dtmfSender === null || config.dtmfSender === undefined) {
            if (config.pc !== undefined && config.pc !== null) {
              var senders = config.pc.getSenders();
              var audioSender = senders.find(function (sender) {
                return sender.track && sender.track.kind === 'audio';
              });
              if (!audioSender) {
                Janus.warn("Invalid DTMF configuration (no audio track)");
                callbacks.error("Invalid DTMF configuration (no audio track)");
                return;
              }
              config.dtmfSender = audioSender.dtmf;
              if (config.dtmfSender) {
                Janus.log("Created DTMF Sender");
                config.dtmfSender.ontonechange = function (tone) {
                  Janus.debug("Sent DTMF tone: " + tone.tone);
                };
              }
            }
            if (config.dtmfSender === null || config.dtmfSender === undefined) {
              Janus.warn("Invalid DTMF configuration");
              callbacks.error("Invalid DTMF configuration");
              return;
            }
          }
          var dtmf = callbacks.dtmf;
          if (dtmf === null || dtmf === undefined) {
            Janus.warn("Invalid DTMF parameters");
            callbacks.error("Invalid DTMF parameters");
            return;
          }
          var tones = dtmf.tones;
          if (tones === null || tones === undefined) {
            Janus.warn("Invalid DTMF string");
            callbacks.error("Invalid DTMF string");
            return;
          }
          var duration = dtmf.duration;
          if (duration === null || duration === undefined)
            duration = 500;
          var gap = dtmf.gap;
          if (gap === null || gap === undefined)
            gap = 50;
          Janus.debug("Sending DTMF string " + tones + " (duration " + duration + "ms, gap " + gap + "ms)");
          config.dtmfSender.insertDTMF(tones, duration, gap);
        }

        function destroyHandle(handleId, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          var asyncRequest = true;
          if (callbacks.asyncRequest !== undefined && callbacks.asyncRequest !== null)
            asyncRequest = (callbacks.asyncRequest === true);
          Janus.log("Destroying handle " + handleId + " (async=" + asyncRequest + ")");
          var pluginHandle = pluginHandles[handleId];

          if (pluginHandle && pluginHandle.detaching) return;
          pluginHandle.detaching = true;

          cleanupWebrtc(handleId);
          if (pluginHandle === null || pluginHandle === undefined || pluginHandle.detached) {
            delete pluginHandles[handleId];
            callbacks.success();
            return;
          }

          if (!connected) {
            Janus.warn("Is the gateway down? (connected=false)");
            callbacks.error("Is the gateway down? (connected=false)");
            return;
          }
          var request = { "janus": "detach", "transaction": Janus.randomString(12) };
          if (pluginHandle.token !== null && pluginHandle.token !== undefined)
            request["token"] = pluginHandle.token;
          if (apisecret !== null && apisecret !== undefined)
            request["apisecret"] = apisecret;
          if (websockets) {
            request["session_id"] = sessionId;
            request["handle_id"] = handleId;
            ws.send(JSON.stringify(request));
            delete pluginHandles[handleId];
            callbacks.success();
            return;
          }
          Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
            verb: 'POST',
            async: asyncRequest,
            withCredentials: withCredentials,
            body: request,
            success: function (json) {
              Janus.log("Destroyed handle:");
              Janus.debug(json);
              if (json["janus"] !== "success") {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason);
              }
              delete pluginHandles[handleId];
              callbacks.success();
            },
            error: function (textStatus, errorThrown) {
              Janus.error(textStatus + ":", errorThrown);
              delete pluginHandles[handleId];
              callbacks.success();
            }
          });
        }

        function streamsDone(handleId, jsep, media, callbacks, stream) {
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          Janus.debug("streamsDone:", stream);
          if (stream) {
            Janus.debug("  -- Audio tracks:", stream.getAudioTracks());
            Janus.debug("  -- Video tracks:", stream.getVideoTracks());
          }
          var addTracks = false;
          if (!config.myStream || !media.update || config.streamExternal) {
            config.myStream = stream;
            addTracks = true;
          } else {
            if (((!media.update && isAudioSendEnabled(media)) || (media.update && (media.addAudio || media.replaceAudio))) &&
              stream.getAudioTracks() && stream.getAudioTracks().length) {
              config.myStream.addTrack(stream.getAudioTracks()[0]);
              if (media.replaceAudio && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
                Janus.log("Replacing audio track:", stream.getAudioTracks()[0]);
                for (var index in config.pc.getSenders()) {
                  var s = config.pc.getSenders()[index];
                  if (s && s.track && s.track.kind === "audio") {
                    s.replaceTrack(stream.getAudioTracks()[0]);
                  }
                }
              } else {
                if (Janus.webRTCAdapter.browserDetails.browser === "firefox" && Janus.webRTCAdapter.browserDetails.version >= 59) {
                  Janus.log((media.replaceVideo ? "Replacing" : "Adding") + " video track:", stream.getVideoTracks()[0]);
                  var audioTransceiver = null;
                  var transceivers = config.pc.getTransceivers();
                  if (transceivers && transceivers.length > 0) {
                    for (var i in transceivers) {
                      var t = transceivers[i];
                      if ((t.sender && t.sender.track && t.sender.track.kind === "audio") ||
                        (t.receiver && t.receiver.track && t.receiver.track.kind === "audio")) {
                        audioTransceiver = t;
                        break;
                      }
                    }
                  }
                  if (audioTransceiver && audioTransceiver.sender) {
                    audioTransceiver.sender.replaceTrack(stream.getVideoTracks()[0]);
                  } else {
                    config.pc.addTrack(stream.getVideoTracks()[0], stream);
                  }
                } else {
                  Janus.log((media.replaceAudio ? "Replacing" : "Adding") + " audio track:", stream.getAudioTracks()[0]);
                  config.pc.addTrack(stream.getAudioTracks()[0], stream);
                }
              }
            }
            if (((!media.update && isVideoSendEnabled(media)) || (media.update && (media.addVideo || media.replaceVideo))) &&
              stream.getVideoTracks() && stream.getVideoTracks().length) {
              config.myStream.addTrack(stream.getVideoTracks()[0]);
              if (media.replaceVideo && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
                Janus.log("Replacing video track:", stream.getVideoTracks()[0]);
                for (var index in config.pc.getSenders()) {
                  var s = config.pc.getSenders()[index];
                  if (s && s.track && s.track.kind === "video") {
                    s.replaceTrack(stream.getVideoTracks()[0]);
                  }
                }
              } else {
                if (Janus.webRTCAdapter.browserDetails.browser === "firefox" && Janus.webRTCAdapter.browserDetails.version >= 59) {
                  Janus.log((media.replaceVideo ? "Replacing" : "Adding") + " video track:", stream.getVideoTracks()[0]);
                  var videoTransceiver = null;
                  var transceivers = config.pc.getTransceivers();
                  if (transceivers && transceivers.length > 0) {
                    for (var i in transceivers) {
                      var t = transceivers[i];
                      if ((t.sender && t.sender.track && t.sender.track.kind === "video") ||
                        (t.receiver && t.receiver.track && t.receiver.track.kind === "video")) {
                        videoTransceiver = t;
                        break;
                      }
                    }
                  }
                  if (videoTransceiver && videoTransceiver.sender) {
                    videoTransceiver.sender.replaceTrack(stream.getVideoTracks()[0]);
                  } else {
                    config.pc.addTrack(stream.getVideoTracks()[0], stream);
                  }
                } else {
                  Janus.log((media.replaceVideo ? "Replacing" : "Adding") + " video track:", stream.getVideoTracks()[0]);
                  config.pc.addTrack(stream.getVideoTracks()[0], stream);
                }
              }
            }
          }
          if (!config.pc) {
            var pc_config = {
              "iceServers": iceServers,
              "iceTransportPolicy": iceTransportPolicy,
              "bundlePolicy": bundlePolicy
            };
            var pc_constraints = {
              "optional": [{ "DtlsSrtpKeyAgreement": true }]
            };
            if (ipv6Support === true) {
              pc_constraints.optional.push({ "googIPv6": true });
            }
            if (callbacks.rtcConstraints && typeof callbacks.rtcConstraints === 'object') {
              Janus.debug("Adding custom PeerConnection constraints:", callbacks.rtcConstraints);
              for (var i in callbacks.rtcConstraints) {
                pc_constraints.optional.push(callbacks.rtcConstraints[i]);
              }
            }
            if (Janus.webRTCAdapter.browserDetails.browser === "edge") {
              pc_config.bundlePolicy = "max-bundle";
            }
            Janus.log("Creating PeerConnection");
            Janus.debug(pc_constraints);
            config.pc = new RTCPeerConnection(pc_config, pc_constraints);
            Janus.debug(config.pc);
            if (config.pc.getStats) {
              config.volume.value = 0;
              config.bitrate.value = "0 kbits/sec";
            }
            Janus.log("Preparing local SDP and gathering candidates (trickle=" + config.trickle + ")");
            config.pc.oniceconnectionstatechange = function (e) {
              if (config.pc)
                pluginHandle.iceState(config.pc.iceConnectionState);
            };
            config.pc.onicecandidate = function (event) {
              if (event.candidate == null ||
                (Janus.webRTCAdapter.browserDetails.browser === 'edge' && event.candidate.candidate.indexOf('endOfCandidates') > 0)) {
                Janus.log("End of candidates.");
                config.iceDone = true;
                if (config.trickle === true) {
                  sendTrickleCandidate(handleId, { "completed": true });
                } else {
                  sendSDP(handleId, callbacks);
                }
              } else {
                var candidate = {
                  "candidate": event.candidate.candidate,
                  "sdpMid": event.candidate.sdpMid,
                  "sdpMLineIndex": event.candidate.sdpMLineIndex
                };
                if (config.trickle === true) {
                  sendTrickleCandidate(handleId, candidate);
                }
              }
            };
            config.pc.ontrack = function (event) {
              Janus.log("Handling Remote Track");
              Janus.debug(event);
              if (!event.streams)
                return;
              config.remoteStream = event.streams[0];
              pluginHandle.onremotestream(config.remoteStream);
              if (event.track && !event.track.onended) {
                Janus.log("Adding onended callback to track:", event.track);
                event.track.onended = function (ev) {
                  Janus.log("Remote track removed:", ev);
                  if (config.remoteStream) {
                    config.remoteStream.removeTrack(ev.target);
                    pluginHandle.onremotestream(config.remoteStream);
                  }
                }
              }
            };
          }
          if (addTracks && stream !== null && stream !== undefined) {
            Janus.log('Adding local stream');
            stream.getTracks().forEach(function (track) {
              Janus.log('Adding local track:', track);
              config.pc.addTrack(track, stream);
            });
          }
          if (isDataEnabled(media) && !config.dataChannel) {
            Janus.log("Creating data channel");
            var onDataChannelMessage = function (event) {
              Janus.log('Received message on data channel: ' + event.data);
              pluginHandle.ondata(event.data);
            }
            var onDataChannelStateChange = function () {
              var dcState = config.dataChannel !== null ? config.dataChannel.readyState : "null";
              Janus.log('State change on data channel: ' + dcState);
              if (dcState === 'open') {
                pluginHandle.ondataopen();
              }
            }
            var onDataChannelError = function (error) {
              Janus.error('Got error on data channel:', error);
            }
            config.dataChannel = config.pc.createDataChannel("JanusDataChannel", { ordered: false });
            config.dataChannel.onmessage = onDataChannelMessage;
            config.dataChannel.onopen = onDataChannelStateChange;
            config.dataChannel.onclose = onDataChannelStateChange;
            config.dataChannel.onerror = onDataChannelError;
          }
          if (config.myStream)
            pluginHandle.onlocalstream(config.myStream);
          if (jsep === null || jsep === undefined) {
            createOffer(handleId, media, callbacks);
          } else {
            config.pc.setRemoteDescription(
              new RTCSessionDescription(jsep),
              function () {
                Janus.log("Remote description accepted!");
                config.remoteSdp = jsep.sdp;
                if (config.candidates && config.candidates.length > 0) {
                  for (var i in config.candidates) {
                    var candidate = config.candidates[i];
                    Janus.debug("Adding remote candidate:", candidate);
                    if (!candidate || candidate.completed === true) {
                      config.pc.addIceCandidate();
                    } else {
                      config.pc.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                  }
                  config.candidates = [];
                }
                createAnswer(handleId, media, callbacks);
              }, callbacks.error);
          }
        }

        function prepareWebrtc(handleId, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : webrtcError;
          var jsep = callbacks.jsep;
          callbacks.media = callbacks.media || { audio: true, video: true };
          var media = callbacks.media;
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          config.trickle = isTrickleEnabled(callbacks.trickle);
          if (config.pc === undefined || config.pc === null) {
            media.update = false;
          } else if (config.pc !== undefined && config.pc !== null) {
            Janus.log("Updating existing media session");
            media.update = true;
            if (callbacks.stream !== null && callbacks.stream !== undefined) {
              if (callbacks.stream !== config.myStream) {
                Janus.log("Renegotiation involves a new external stream");
              }
            } else {
              if (media.addAudio) {
                media.replaceAudio = false;
                media.removeAudio = false;
                media.audioSend = true;
                if (config.myStream && config.myStream.getAudioTracks() && config.myStream.getAudioTracks().length) {
                  Janus.error("Can't add audio stream, there already is one");
                  callbacks.error("Can't add audio stream, there already is one");
                  return;
                }
              } else if (media.removeAudio) {
                media.replaceAudio = false;
                media.addAudio = false;
                media.audioSend = false;
              } else if (media.replaceAudio) {
                media.addAudio = false;
                media.removeAudio = false;
                media.audioSend = true;
              }
              if (config.myStream === null || config.myStream === undefined) {
                if (media.replaceAudio) {
                  media.replaceAudio = false;
                  media.addAudio = true;
                  media.audioSend = true;
                }
                if (isAudioSendEnabled(media))
                  media.addAudio = true;
              } else {
                if (config.myStream.getAudioTracks() === null
                  || config.myStream.getAudioTracks() === undefined
                  || config.myStream.getAudioTracks().length === 0) {
                  if (media.replaceAudio) {
                    media.replaceAudio = false;
                    media.addAudio = true;
                    media.audioSend = true;
                  }
                  if (isAudioSendEnabled(media))
                    media.addAudio = true;
                }
              }
              if (media.addVideo) {
                media.replaceVideo = false;
                media.removeVideo = false;
                media.videoSend = true;
                if (config.myStream && config.myStream.getVideoTracks() && config.myStream.getVideoTracks().length) {
                  Janus.error("Can't add video stream, there already is one");
                  callbacks.error("Can't add video stream, there already is one");
                  return;
                }
              } else if (media.removeVideo) {
                media.replaceVideo = false;
                media.addVideo = false;
                media.videoSend = false;
              } else if (media.replaceVideo) {
                media.addVideo = false;
                media.removeVideo = false;
                media.videoSend = true;
              }
              if (config.myStream === null || config.myStream === undefined) {
                if (media.replaceVideo) {
                  media.replaceVideo = false;
                  media.addVideo = true;
                  media.videoSend = true;
                }
                if (isVideoSendEnabled(media))
                  media.addVideo = true;
              } else {
                if (config.myStream.getVideoTracks() === null
                  || config.myStream.getVideoTracks() === undefined
                  || config.myStream.getVideoTracks().length === 0) {
                  if (media.replaceVideo) {
                    media.replaceVideo = false;
                    media.addVideo = true;
                    media.videoSend = true;
                  }
                  if (isVideoSendEnabled(media))
                    media.addVideo = true;
                }
              }
              if (media.addData)
                media.data = true;
            }
          }
          if (media.update && !config.streamExternal) {
            if (media.removeAudio || media.replaceAudio) {
              if (config.myStream && config.myStream.getAudioTracks() && config.myStream.getAudioTracks().length) {
                var s = config.myStream.getAudioTracks()[0];
                Janus.log("Removing audio track:", s);
                config.myStream.removeTrack(s);
                try {
                  s.stop();
                } catch (e) {
                }
                ;
              }
              if (config.pc.getSenders() && config.pc.getSenders().length) {
                var ra = true;
                if (media.replaceAudio && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
                  ra = false;
                }
                if (ra) {
                  for (var index in config.pc.getSenders()) {
                    var s = config.pc.getSenders()[index];
                    if (s && s.track && s.track.kind === "audio") {
                      Janus.log("Removing audio sender:", s);
                      config.pc.removeTrack(s);
                    }
                  }
                }
              }
            }
            if (media.removeVideo || media.replaceVideo) {
              if (config.myStream && config.myStream.getVideoTracks() && config.myStream.getVideoTracks().length) {
                var s = config.myStream.getVideoTracks()[0];
                Janus.log("Removing video track:", s);
                config.myStream.removeTrack(s);
                try {
                  s.stop();
                } catch (e) {
                }
                ;
              }
              if (config.pc.getSenders() && config.pc.getSenders().length) {
                var rv = true;
                if (media.replaceVideo && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
                  rv = false;
                }
                if (rv) {
                  for (var index in config.pc.getSenders()) {
                    var s = config.pc.getSenders()[index];
                    if (s && s.track && s.track.kind === "video") {
                      Janus.log("Removing video sender:", s);
                      config.pc.removeTrack(s);
                    }
                  }
                }
              }
            }
          }
          if (callbacks.stream !== null && callbacks.stream !== undefined) {
            var stream = callbacks.stream;
            Janus.log("MediaStream provided by the application");
            Janus.debug(stream);
            if (media.update) {
              if (config.myStream && config.myStream !== callbacks.stream && !config.streamExternal) {
                try {
                  var tracks = config.myStream.getTracks();
                  for (var i in tracks) {
                    var mst = tracks[i];
                    Janus.log(mst);
                    if (mst !== null && mst !== undefined)
                      mst.stop();
                  }
                } catch (e) {
                }
                config.myStream = null;
              }
            }
            config.streamExternal = true;
            streamsDone(handleId, jsep, media, callbacks, stream);
            return;
          }
          if (isAudioSendEnabled(media) || isVideoSendEnabled(media)) {
            var constraints = { mandatory: {}, optional: [] };
            pluginHandle.consentDialog(true);
            var audioSupport = isAudioSendEnabled(media);
            if (audioSupport === true && media != undefined && media != null) {
              if (typeof media.audio === 'object') {
                audioSupport = media.audio;
              }
            }
            var videoSupport = isVideoSendEnabled(media);
            if (videoSupport === true && media != undefined && media != null) {
              var simulcast = callbacks.simulcast === true ? true : false;
              if (simulcast && !jsep && (media.video === undefined || media.video === false))
                media.video = "hires";
              if (media.video && media.video != 'screen' && media.video != 'window') {
                if (typeof media.video === 'object') {
                  videoSupport = media.video;
                } else {
                  var width = 0;
                  var height = 0, maxHeight = 0;
                  if (media.video === 'lowres') {
                    height = 240;
                    maxHeight = 240;
                    width = 320;
                  } else if (media.video === 'lowres-16:9') {
                    height = 180;
                    maxHeight = 180;
                    width = 320;
                  } else if (media.video === 'hires' || media.video === 'hires-16:9' || media.video === 'hdres') {
                    height = 720;
                    maxHeight = 720;
                    width = 1280;
                  } else if (media.video === 'fhdres') {
                    height = 1080;
                    maxHeight = 1080;
                    width = 1920;
                  } else if (media.video === '4kres') {
                    height = 2160;
                    maxHeight = 2160;
                    width = 3840;
                  } else if (media.video === 'stdres') {
                    height = 480;
                    maxHeight = 480;
                    width = 640;
                  } else if (media.video === 'stdres-16:9') {
                    height = 360;
                    maxHeight = 360;
                    width = 640;
                  } else {
                    Janus.log("Default video setting is stdres 4:3");
                    height = 480;
                    maxHeight = 480;
                    width = 640;
                  }
                  Janus.log("Adding media constraint:", media.video);
                  videoSupport = {
                    'height': { 'ideal': height },
                    'width': { 'ideal': width }
                  };
                  Janus.log("Adding video constraint:", videoSupport);
                }
              } else if (media.video === 'screen' || media.video === 'window') {
                if (!media.screenshareFrameRate) {
                  media.screenshareFrameRate = 3;
                }
                if (window.location.protocol !== 'https:') {
                  Janus.warn("Screen sharing only works on HTTPS, try the https:// version of this page");
                  pluginHandle.consentDialog(false);
                  callbacks.error("Screen sharing only works on HTTPS, try the https:// version of this page");
                  return;
                }
                var cache = {};

                function callbackUserMedia(error, stream) {
                  pluginHandle.consentDialog(false);
                  if (error) {
                    callbacks.error({ code: error.code, name: error.name, message: error.message });
                  } else {
                    streamsDone(handleId, jsep, media, callbacks, stream);
                  }
                };

                function getScreenMedia(constraints, gsmCallback, useAudio) {
                  Janus.log("Adding media constraint (screen capture)");
                  Janus.debug(constraints);
                  navigator.mediaDevices.getUserMedia(constraints)
                    .then(function (stream) {
                      if (useAudio) {
                        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                          .then(function (audioStream) {
                            stream.addTrack(audioStream.getAudioTracks()[0]);
                            gsmCallback(null, stream);
                          })
                      } else {
                        gsmCallback(null, stream);
                      }
                    })
                    .catch(function (error) {
                      pluginHandle.consentDialog(false);
                      gsmCallback(error);
                    });
                };
                if (Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
                  var chromever = Janus.webRTCAdapter.browserDetails.version;
                  var maxver = 33;
                  if (window.navigator.userAgent.match('Linux'))
                    maxver = 35;
                  if (chromever >= 26 && chromever <= maxver) {
                    constraints = {
                      video: {
                        mandatory: {
                          googLeakyBucket: true,
                          maxWidth: window.screen.width,
                          maxHeight: window.screen.height,
                          minFrameRate: media.screenshareFrameRate,
                          maxFrameRate: media.screenshareFrameRate,
                          chromeMediaSource: 'screen'
                        }
                      },
                      audio: isAudioSendEnabled(media)
                    };
                    getScreenMedia(constraints, callbackUserMedia);
                  } else {
                    var pending = window.setTimeout(
                      function () {
                        error = new Error('NavigatorUserMediaError');
                        error.name = 'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)';
                        pluginHandle.consentDialog(false);
                        return callbacks.error(error);
                      }, 1000);
                    cache[pending] = [callbackUserMedia, null];
                    window.postMessage({ type: 'janusGetScreen', id: pending }, '*');
                  }
                } else if (window.navigator.userAgent.match('Firefox')) {
                  var ffver = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
                  if (ffver >= 33) {
                    constraints = {
                      video: {
                        mozMediaSource: media.video,
                        mediaSource: media.video
                      },
                      audio: isAudioSendEnabled(media)
                    };
                    getScreenMedia(constraints, function (err, stream) {
                      callbackUserMedia(err, stream);
                      if (!err) {
                        var lastTime = stream.currentTime;
                        var polly = window.setInterval(function () {
                          if (!stream)
                            window.clearInterval(polly);
                          if (stream.currentTime == lastTime) {
                            window.clearInterval(polly);
                            if (stream.onended) {
                              stream.onended();
                            }
                          }
                          lastTime = stream.currentTime;
                        }, 500);
                      }
                    });
                  } else {
                    var error = new Error('NavigatorUserMediaError');
                    error.name = 'Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)';
                    pluginHandle.consentDialog(false);
                    callbacks.error(error);
                    return;
                  }
                }

                window.addEventListener('message', function (event) {
                  if (event.origin != window.location.origin)
                    return;
                  if (event.data.type == 'janusGotScreen' && cache[event.data.id]) {
                    var data = cache[event.data.id];
                    var callback = data[0];
                    delete cache[event.data.id];

                    if (event.data.sourceId === '') {
                      var error = new Error('NavigatorUserMediaError');
                      error.name = 'You cancelled the request for permission, giving up...';
                      pluginHandle.consentDialog(false);
                      callbacks.error(error);
                    } else {
                      constraints = {
                        audio: false,
                        video: {
                          mandatory: {
                            chromeMediaSource: 'desktop',
                            maxWidth: window.screen.width,
                            maxHeight: window.screen.height,
                            minFrameRate: media.screenshareFrameRate,
                            maxFrameRate: media.screenshareFrameRate,
                          },
                          optional: [
                            { googLeakyBucket: true },
                            { googTemporalLayeredScreencast: true }
                          ]
                        }
                      };
                      constraints.video.mandatory.chromeMediaSourceId = event.data.sourceId;
                      getScreenMedia(constraints, callback, isAudioSendEnabled(media));
                    }
                  } else if (event.data.type == 'janusGetScreenPending') {
                    window.clearTimeout(event.data.id);
                  }
                });
                return;
              }
            }
            if (media === null || media === undefined || media.video !== 'screen') {
              navigator.mediaDevices.enumerateDevices().then(function (devices) {
                var audioExist = devices.some(function (device) {
                  return device.kind === 'audioinput';
                }),
                  videoExist = devices.some(function (device) {
                    return device.kind === 'videoinput';
                  });

                var audioSend = isAudioSendEnabled(media);
                var videoSend = isVideoSendEnabled(media);
                var needAudioDevice = isAudioSendRequired(media);
                var needVideoDevice = isVideoSendRequired(media);
                if (audioSend || videoSend || needAudioDevice || needVideoDevice) {
                  var haveAudioDevice = audioSend ? audioExist : false;
                  var haveVideoDevice = videoSend ? videoExist : false;
                  if (!haveAudioDevice && !haveVideoDevice) {
                    pluginHandle.consentDialog(false);
                    callbacks.error('No capture device found');
                    return false;
                  } else if (!haveAudioDevice && needAudioDevice) {
                    pluginHandle.consentDialog(false);
                    callbacks.error('Audio capture is required, but no capture device found');
                    return false;
                  } else if (!haveVideoDevice && needVideoDevice) {
                    pluginHandle.consentDialog(false);
                    callbacks.error('Video capture is required, but no capture device found');
                    return false;
                  }
                }

                var gumConstraints = {
                  audio: audioExist ? audioSupport : false,
                  video: videoExist ? videoSupport : false
                };
                Janus.debug("getUserMedia constraints", gumConstraints);
                navigator.mediaDevices.getUserMedia(gumConstraints)
                  .then(function (stream) {
                    pluginHandle.consentDialog(false);
                    streamsDone(handleId, jsep, media, callbacks, stream);
                  })
                  .catch(function (error) {
                    pluginHandle.consentDialog(false);
                    callbacks.error({ code: error.code, name: error.name, message: error.message });
                  });
              })
                .catch(function (error) {
                  pluginHandle.consentDialog(false);
                  callbacks.error('enumerateDevices error', error);
                });
            }
          } else {
            streamsDone(handleId, jsep, media, callbacks);
          }
        }

        function prepareWebrtcPeer(handleId, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : webrtcError;
          var jsep = callbacks.jsep;
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          if (jsep !== undefined && jsep !== null) {
            if (config.pc === null) {
              Janus.warn("Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep");
              callbacks.error("No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep");
              return;
            }
            config.pc.setRemoteDescription(
              new RTCSessionDescription(jsep),
              function () {
                Janus.log("Remote description accepted!");
                config.remoteSdp = jsep.sdp;
                if (config.candidates && config.candidates.length > 0) {
                  for (var i in config.candidates) {
                    var candidate = config.candidates[i];
                    Janus.debug("Adding remote candidate:", candidate);
                    if (!candidate || candidate.completed === true) {
                      config.pc.addIceCandidate();
                    } else {
                      config.pc.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                  }
                  config.candidates = [];
                }
                callbacks.success();
              }, callbacks.error);
          } else {
            callbacks.error("Invalid JSEP");
          }
        }

        function createOffer(handleId, media, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          var simulcast = callbacks.simulcast === true ? true : false;
          if (!simulcast) {
            Janus.log("Creating offer (iceDone=" + config.iceDone + ")");
          } else {
            Janus.log("Creating offer (iceDone=" + config.iceDone + ", simulcast=" + simulcast + ")");
          }
          var mediaConstraints = {};
          if (Janus.webRTCAdapter.browserDetails.browser === "firefox" && Janus.webRTCAdapter.browserDetails.version >= 59) {
            var audioTransceiver = null, videoTransceiver = null;
            var transceivers = config.pc.getTransceivers();
            if (transceivers && transceivers.length > 0) {
              for (var i in transceivers) {
                var t = transceivers[i];
                if ((t.sender && t.sender.track && t.sender.track.kind === "audio") ||
                  (t.receiver && t.receiver.track && t.receiver.track.kind === "audio")) {
                  if (!audioTransceiver)
                    audioTransceiver = t;
                  continue;
                }
                if ((t.sender && t.sender.track && t.sender.track.kind === "video") ||
                  (t.receiver && t.receiver.track && t.receiver.track.kind === "video")) {
                  if (!videoTransceiver)
                    videoTransceiver = t;
                  continue;
                }
              }
            }
            var audioSend = isAudioSendEnabled(media);
            var audioRecv = isAudioRecvEnabled(media);
            if (!audioSend && !audioRecv) {
              if (media.removeAudio && audioTransceiver) {
                audioTransceiver.direction = "inactive";
                Janus.log("Setting audio transceiver to inactive:", audioTransceiver);
              }
            } else {
              if (audioSend && audioRecv) {
                if (audioTransceiver) {
                  audioTransceiver.direction = "sendrecv";
                  Janus.log("Setting audio transceiver to sendrecv:", audioTransceiver);
                }
              } else if (audioSend && !audioRecv) {
                if (audioTransceiver) {
                  audioTransceiver.direction = "sendonly";
                  Janus.log("Setting audio transceiver to sendonly:", audioTransceiver);
                }
              } else if (!audioSend && audioRecv) {
                if (audioTransceiver) {
                  audioTransceiver.direction = "recvonly";
                  Janus.log("Setting audio transceiver to recvonly:", audioTransceiver);
                } else {
                  audioTransceiver = config.pc.addTransceiver("audio", { direction: "recvonly" });
                  Janus.log("Adding recvonly audio transceiver:", audioTransceiver);
                }
              }
            }
            var videoSend = isVideoSendEnabled(media);
            var videoRecv = isVideoRecvEnabled(media);
            if (!videoSend && !videoRecv) {
              if (media.removeVideo && videoTransceiver) {
                videoTransceiver.direction = "inactive";
                Janus.log("Setting video transceiver to inactive:", videoTransceiver);
              }
            } else {
              if (videoSend && videoRecv) {
                if (videoTransceiver) {
                  videoTransceiver.direction = "sendrecv";
                  Janus.log("Setting video transceiver to sendrecv:", videoTransceiver);
                }
              } else if (videoSend && !videoRecv) {
                if (videoTransceiver) {
                  videoTransceiver.direction = "sendonly";
                  Janus.log("Setting video transceiver to sendonly:", videoTransceiver);
                }
              } else if (!videoSend && videoRecv) {
                if (videoTransceiver) {
                  videoTransceiver.direction = "recvonly";
                  Janus.log("Setting video transceiver to recvonly:", videoTransceiver);
                } else {
                  videoTransceiver = config.pc.addTransceiver("video", { direction: "recvonly" });
                  Janus.log("Adding recvonly video transceiver:", videoTransceiver);
                }
              }
            }
          } else {
            mediaConstraints["offerToReceiveAudio"] = isAudioRecvEnabled(media);
            mediaConstraints["offerToReceiveVideo"] = isVideoRecvEnabled(media);
          }
          var iceRestart = callbacks.iceRestart === true ? true : false;
          if (iceRestart) {
            mediaConstraints["iceRestart"] = true;
          }
          Janus.debug(mediaConstraints);
          var sendVideo = isVideoSendEnabled(media);
          if (sendVideo && simulcast && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
            Janus.log("Enabling Simulcasting for Firefox (RID)");
            var sender = config.pc.getSenders()[1];
            Janus.log(sender);
            var parameters = sender.getParameters();
            Janus.log(parameters);
            sender.setParameters({
              encodings: [
                { rid: "high", active: true, priority: "high", maxBitrate: 1000000 },
                { rid: "medium", active: true, priority: "medium", maxBitrate: 300000 },
                { rid: "low", active: true, priority: "low", maxBitrate: 100000 }
              ]
            });
          }
          config.pc.createOffer(
            function (offer) {
              Janus.debug(offer);
              Janus.log("Setting local description");
              if (sendVideo && simulcast) {
                if (Janus.webRTCAdapter.browserDetails.browser === "chrome") {
                  Janus.log("Enabling Simulcasting for Chrome (SDP munging)");
                  offer.sdp = mungeSdpForSimulcasting(offer.sdp);
                } else if (Janus.webRTCAdapter.browserDetails.browser !== "firefox") {
                  Janus.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring");
                }
              }
              config.mySdp = offer.sdp;
              config.pc.setLocalDescription(offer);
              config.mediaConstraints = mediaConstraints;
              if (!config.iceDone && !config.trickle) {
                Janus.log("Waiting for all candidates...");
                return;
              }
              Janus.log("Offer ready");
              Janus.debug(callbacks);
              var jsep = {
                "type": offer.type,
                "sdp": offer.sdp
              };
              callbacks.success(jsep);
            }, callbacks.error, mediaConstraints);
        }

        function createAnswer(handleId, media, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            callbacks.error("Invalid handle");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          var simulcast = callbacks.simulcast === true ? true : false;
          if (!simulcast) {
            Janus.log("Creating answer (iceDone=" + config.iceDone + ")");
          } else {
            Janus.log("Creating answer (iceDone=" + config.iceDone + ", simulcast=" + simulcast + ")");
          }
          var mediaConstraints = null;
          if (Janus.webRTCAdapter.browserDetails.browser === "firefox" && Janus.webRTCAdapter.browserDetails.version >= 59) {
            mediaConstraints = {};
            var audioTransceiver = null, videoTransceiver = null;
            var transceivers = config.pc.getTransceivers();
            if (transceivers && transceivers.length > 0) {
              for (var i in transceivers) {
                var t = transceivers[i];
                if ((t.sender && t.sender.track && t.sender.track.kind === "audio") ||
                  (t.receiver && t.receiver.track && t.receiver.track.kind === "audio")) {
                  if (!audioTransceiver)
                    audioTransceiver = t;
                  continue;
                }
                if ((t.sender && t.sender.track && t.sender.track.kind === "video") ||
                  (t.receiver && t.receiver.track && t.receiver.track.kind === "video")) {
                  if (!videoTransceiver)
                    videoTransceiver = t;
                  continue;
                }
              }
            }
            var audioSend = isAudioSendEnabled(media);
            var audioRecv = isAudioRecvEnabled(media);
            if (!audioSend && !audioRecv) {
              if (media.removeAudio && audioTransceiver) {
                audioTransceiver.direction = "inactive";
                Janus.log("Setting audio transceiver to inactive:", audioTransceiver);
              }
            } else {
              if (audioSend && audioRecv) {
                if (audioTransceiver) {
                  audioTransceiver.direction = "sendrecv";
                  Janus.log("Setting audio transceiver to sendrecv:", audioTransceiver);
                }
              } else if (audioSend && !audioRecv) {
                if (audioTransceiver) {
                  audioTransceiver.direction = "sendonly";
                  Janus.log("Setting audio transceiver to sendonly:", audioTransceiver);
                }
              } else if (!audioSend && audioRecv) {
                if (audioTransceiver) {
                  audioTransceiver.direction = "recvonly";
                  Janus.log("Setting audio transceiver to recvonly:", audioTransceiver);
                } else {
                  audioTransceiver = config.pc.addTransceiver("audio", { direction: "recvonly" });
                  Janus.log("Adding recvonly audio transceiver:", audioTransceiver);
                }
              }
            }
            var videoSend = isVideoSendEnabled(media);
            var videoRecv = isVideoRecvEnabled(media);
            if (!videoSend && !videoRecv) {
              if (media.removeVideo && videoTransceiver) {
                videoTransceiver.direction = "inactive";
                Janus.log("Setting video transceiver to inactive:", videoTransceiver);
              }
            } else {
              if (videoSend && videoRecv) {
                if (videoTransceiver) {
                  videoTransceiver.direction = "sendrecv";
                  Janus.log("Setting video transceiver to sendrecv:", videoTransceiver);
                }
              } else if (videoSend && !videoRecv) {
                if (videoTransceiver) {
                  videoTransceiver.direction = "sendonly";
                  Janus.log("Setting video transceiver to sendonly:", videoTransceiver);
                }
              } else if (!videoSend && videoRecv) {
                if (videoTransceiver) {
                  videoTransceiver.direction = "recvonly";
                  Janus.log("Setting video transceiver to recvonly:", videoTransceiver);
                } else {
                  videoTransceiver = config.pc.addTransceiver("video", { direction: "recvonly" });
                  Janus.log("Adding recvonly video transceiver:", videoTransceiver);
                }
              }
            }
          } else {
            if (Janus.webRTCAdapter.browserDetails.browser == "firefox" || Janus.webRTCAdapter.browserDetails.browser == "edge") {
              mediaConstraints = {
                offerToReceiveAudio: isAudioRecvEnabled(media),
                offerToReceiveVideo: isVideoRecvEnabled(media)
              };
            } else {
              mediaConstraints = {
                mandatory: {
                  OfferToReceiveAudio: isAudioRecvEnabled(media),
                  OfferToReceiveVideo: isVideoRecvEnabled(media)
                }
              };
            }
          }
          Janus.debug(mediaConstraints);
          var sendVideo = isVideoSendEnabled(media);
          if (sendVideo && simulcast && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
            Janus.log("Enabling Simulcasting for Firefox (RID)");
            var sender = config.pc.getSenders()[1];
            Janus.log(sender);
            var parameters = sender.getParameters();
            Janus.log(parameters);
            sender.setParameters({
              encodings: [
                { rid: "high", active: true, priority: "high", maxBitrate: 1000000 },
                { rid: "medium", active: true, priority: "medium", maxBitrate: 300000 },
                { rid: "low", active: true, priority: "low", maxBitrate: 100000 }
              ]
            });
          }
          config.pc.createAnswer(
            function (answer) {
              Janus.debug(answer);
              Janus.log("Setting local description");
              if (sendVideo && simulcast) {
                if (Janus.webRTCAdapter.browserDetails.browser === "chrome") {
                  Janus.warn("simulcast=true, but this is an answer, and video breaks in Chrome if we enable it");
                } else if (Janus.webRTCAdapter.browserDetails.browser !== "firefox") {
                  Janus.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring");
                }
              }
              config.mySdp = answer.sdp;
              config.pc.setLocalDescription(answer);
              config.mediaConstraints = mediaConstraints;
              if (!config.iceDone && !config.trickle) {
                Janus.log("Waiting for all candidates...");
                return;
              }
              var jsep = {
                "type": answer.type,
                "sdp": answer.sdp
              };
              callbacks.success(jsep);
            }, callbacks.error, mediaConstraints);
        }

        function sendSDP(handleId, callbacks) {
          callbacks = callbacks || {};
          callbacks.success = (typeof callbacks.success == "function") ? callbacks.success : Janus.noop;
          callbacks.error = (typeof callbacks.error == "function") ? callbacks.error : Janus.noop;
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle, not sending anything");
            return;
          }
          var config = pluginHandle.webrtcStuff;
          Janus.log("Sending offer/answer SDP...");
          if (config.mySdp === null || config.mySdp === undefined) {
            Janus.warn("Local SDP instance is invalid, not sending anything...");
            return;
          }
          config.mySdp = {
            "type": config.pc.localDescription.type,
            "sdp": config.pc.localDescription.sdp
          };
          if (config.trickle === false)
            config.mySdp["trickle"] = false;
          Janus.debug(callbacks);
          config.sdpSent = true;
          callbacks.success(config.mySdp);
        }

        function getVolume(handleId) {
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return 0;
          }
          var config = pluginHandle.webrtcStuff;
          if (config.pc.getStats && Janus.webRTCAdapter.browserDetails.browser == "chrome") {
            if (config.remoteStream === null || config.remoteStream === undefined) {
              Janus.warn("Remote stream unavailable");
              return 0;
            }
            if (config.volume.timer === null || config.volume.timer === undefined) {
              Janus.log("Starting volume monitor");
              config.volume.timer = setInterval(function () {
                config.pc.getStats(function (stats) {
                  var results = stats.result();
                  for (var i = 0; i < results.length; i++) {
                    var res = results[i];
                    if (res.type == 'ssrc' && res.stat('audioOutputLevel')) {
                      config.volume.value = res.stat('audioOutputLevel');
                    }
                  }
                });
              }, 200);
              return 0;
            }
            return config.volume.value;
          } else {
            Janus.log("Getting the remote volume unsupported by browser");
            return 0;
          }
        }

        function isMuted(handleId, video) {
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return true;
          }
          var config = pluginHandle.webrtcStuff;
          if (config.pc === null || config.pc === undefined) {
            Janus.warn("Invalid PeerConnection");
            return true;
          }
          if (config.myStream === undefined || config.myStream === null) {
            Janus.warn("Invalid local MediaStream");
            return true;
          }
          if (video) {
            if (config.myStream.getVideoTracks() === null
              || config.myStream.getVideoTracks() === undefined
              || config.myStream.getVideoTracks().length === 0) {
              Janus.warn("No video track");
              return true;
            }
            return !config.myStream.getVideoTracks()[0].enabled;
          } else {
            if (config.myStream.getAudioTracks() === null
              || config.myStream.getAudioTracks() === undefined
              || config.myStream.getAudioTracks().length === 0) {
              Janus.warn("No audio track");
              return true;
            }
            return !config.myStream.getAudioTracks()[0].enabled;
          }
        }

        function mute(handleId, video, mute) {
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return false;
          }
          var config = pluginHandle.webrtcStuff;
          if (config.pc === null || config.pc === undefined) {
            Janus.warn("Invalid PeerConnection");
            return false;
          }
          if (config.myStream === undefined || config.myStream === null) {
            Janus.warn("Invalid local MediaStream");
            return false;
          }
          if (video) {
            if (config.myStream.getVideoTracks() === null
              || config.myStream.getVideoTracks() === undefined
              || config.myStream.getVideoTracks().length === 0) {
              Janus.warn("No video track");
              return false;
            }
            config.myStream.getVideoTracks()[0].enabled = mute ? false : true;
            return true;
          } else {
            if (config.myStream.getAudioTracks() === null
              || config.myStream.getAudioTracks() === undefined
              || config.myStream.getAudioTracks().length === 0) {
              Janus.warn("No audio track");
              return false;
            }
            config.myStream.getAudioTracks()[0].enabled = mute ? false : true;
            return true;
          }
        }

        function getBitrate(handleId) {
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined ||
            pluginHandle.webrtcStuff === null || pluginHandle.webrtcStuff === undefined) {
            Janus.warn("Invalid handle");
            return "Invalid handle";
          }
          var config = pluginHandle.webrtcStuff;
          if (config.pc === null || config.pc === undefined)
            return "Invalid PeerConnection";
          if (config.pc.getStats) {
            if (config.bitrate.timer === null || config.bitrate.timer === undefined) {
              Janus.log("Starting bitrate timer (via getStats)");
              config.bitrate.timer = setInterval(function () {
                config.pc.getStats()
                  .then(function (stats) {
                    stats.forEach(function (res) {
                      if (!res)
                        return;
                      var inStats = false;
                      if ((res.mediaType === "video" || res.id.toLowerCase().indexOf("video") > -1) &&
                        res.type === "inbound-rtp" && res.id.indexOf("rtcp") < 0) {
                        inStats = true;
                      } else if (res.type == 'ssrc' && res.bytesReceived &&
                        (res.googCodecName === "VP8" || res.googCodecName === "")) {
                        inStats = true;
                      }
                      if (inStats) {
                        config.bitrate.bsnow = res.bytesReceived;
                        config.bitrate.tsnow = res.timestamp;
                        if (config.bitrate.bsbefore === null || config.bitrate.tsbefore === null) {
                          config.bitrate.bsbefore = config.bitrate.bsnow;
                          config.bitrate.tsbefore = config.bitrate.tsnow;
                        } else {
                          var timePassed = config.bitrate.tsnow - config.bitrate.tsbefore;
                          if (Janus.webRTCAdapter.browserDetails.browser == "safari")
                            timePassed = timePassed / 1000;
                          var bitRate = Math.round((config.bitrate.bsnow - config.bitrate.bsbefore) * 8 / timePassed);
                          config.bitrate.value = bitRate + ' kbits/sec';
                          config.bitrate.bsbefore = config.bitrate.bsnow;
                          config.bitrate.tsbefore = config.bitrate.tsnow;
                        }
                      }
                    });
                  });
              }, 1000);
              return "0 kbits/sec";
            }
            return config.bitrate.value;
          } else {
            Janus.warn("Getting the video bitrate unsupported by browser");
            return "Feature unsupported by browser";
          }
        }

        function webrtcError(error) {
          Janus.error("WebRTC error:", error);
        }

        function cleanupWebrtc(handleId, hangupRequest) {
          Janus.log("Cleaning WebRTC stuff");
          var pluginHandle = pluginHandles[handleId];
          if (pluginHandle === null || pluginHandle === undefined) {
            return;
          }
          var config = pluginHandle.webrtcStuff;
          if (config !== null && config !== undefined) {
            if (hangupRequest === true) {
              var request = { "janus": "hangup", "transaction": Janus.randomString(12) };
              if (pluginHandle.token !== null && pluginHandle.token !== undefined)
                request["token"] = pluginHandle.token;
              if (apisecret !== null && apisecret !== undefined)
                request["apisecret"] = apisecret;
              Janus.debug("Sending hangup request (handle=" + handleId + "):");
              Janus.debug(request);
              if (websockets) {
                request["session_id"] = sessionId;
                request["handle_id"] = handleId;
                ws.send(JSON.stringify(request));
              } else {
                Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
                  verb: 'POST',
                  withCredentials: withCredentials,
                  body: request
                });
              }
            }
            config.remoteStream = null;
            if (config.volume.timer)
              clearInterval(config.volume.timer);
            config.volume.value = null;
            if (config.bitrate.timer)
              clearInterval(config.bitrate.timer);
            config.bitrate.timer = null;
            config.bitrate.bsnow = null;
            config.bitrate.bsbefore = null;
            config.bitrate.tsnow = null;
            config.bitrate.tsbefore = null;
            config.bitrate.value = null;
            try {
              if (!config.streamExternal && config.myStream !== null && config.myStream !== undefined) {
                Janus.log("Stopping local stream tracks");
                var tracks = config.myStream.getTracks();
                for (var i in tracks) {
                  var mst = tracks[i];
                  Janus.log(mst);
                  if (mst !== null && mst !== undefined)
                    mst.stop();
                }
              }
            } catch (e) {
            }
            config.streamExternal = false;
            config.myStream = null;
            try {
              config.pc.close();
            } catch (e) {
            }
            config.pc = null;
            config.candidates = null;
            config.mySdp = null;
            config.remoteSdp = null;
            config.iceDone = false;
            config.dataChannel = null;
            config.dtmfSender = null;
          }
          pluginHandle.oncleanup();
        }

        function mungeSdpForSimulcasting(sdp) {
          var lines = sdp.split("\r\n");
          var video = false;
          var ssrc = [-1], ssrc_fid = [-1];
          var cname = null, msid = null, mslabel = null, label = null;
          var insertAt = -1;
          for (var i = 0; i < lines.length; i++) {
            var mline = lines[i].match(/m=(\w+) */);
            if (mline) {
              var medium = mline[1];
              if (medium === "video") {
                if (ssrc[0] < 0) {
                  video = true;
                } else {
                  insertAt = i;
                  break;
                }
              } else {
                if (ssrc[0] > -1) {
                  insertAt = i;
                  break;
                }
              }
              continue;
            }
            if (!video)
              continue;
            var fid = lines[i].match(/a=ssrc-group:FID (\d+) (\d+)/);
            if (fid) {
              ssrc[0] = fid[1];
              ssrc_fid[0] = fid[2];
              lines.splice(i, 1);
              i--;
              continue;
            }
            if (ssrc[0]) {
              var match = lines[i].match('a=ssrc:' + ssrc[0] + ' cname:(.+)')
              if (match) {
                cname = match[1];
              }
              match = lines[i].match('a=ssrc:' + ssrc[0] + ' msid:(.+)')
              if (match) {
                msid = match[1];
              }
              match = lines[i].match('a=ssrc:' + ssrc[0] + ' mslabel:(.+)')
              if (match) {
                mslabel = match[1];
              }
              match = lines[i].match('a=ssrc:' + ssrc + ' label:(.+)')
              if (match) {
                label = match[1];
              }
              if (lines[i].indexOf('a=ssrc:' + ssrc_fid) === 0) {
                lines.splice(i, 1);
                i--;
                continue;
              }
              if (lines[i].indexOf('a=ssrc:' + ssrc[0]) === 0) {
                lines.splice(i, 1);
                i--;
                continue;
              }
            }
            if (lines[i].length == 0) {
              lines.splice(i, 1);
              i--;
              continue;
            }
          }
          if (ssrc[0] < 0) {
            insertAt = -1;
            video = false;
            for (var i = 0; i < lines.length; i++) {
              var mline = lines[i].match(/m=(\w+) */);
              if (mline) {
                var medium = mline[1];
                if (medium === "video") {
                  if (ssrc[0] < 0) {
                    video = true;
                  } else {
                    insertAt = i;
                    break;
                  }
                } else {
                  if (ssrc[0] > -1) {
                    insertAt = i;
                    break;
                  }
                }
                continue;
              }
              if (!video)
                continue;
              if (ssrc[0] < 0) {
                var value = lines[i].match(/a=ssrc:(\d+)/);
                if (value) {
                  ssrc[0] = value[1];
                  lines.splice(i, 1);
                  i--;
                  continue;
                }
              } else {
                var match = lines[i].match('a=ssrc:' + ssrc[0] + ' cname:(.+)')
                if (match) {
                  cname = match[1];
                }
                match = lines[i].match('a=ssrc:' + ssrc[0] + ' msid:(.+)')
                if (match) {
                  msid = match[1];
                }
                match = lines[i].match('a=ssrc:' + ssrc[0] + ' mslabel:(.+)')
                if (match) {
                  mslabel = match[1];
                }
                match = lines[i].match('a=ssrc:' + ssrc[0] + ' label:(.+)')
                if (match) {
                  label = match[1];
                }
                if (lines[i].indexOf('a=ssrc:' + ssrc_fid[0]) === 0) {
                  lines.splice(i, 1);
                  i--;
                  continue;
                }
                if (lines[i].indexOf('a=ssrc:' + ssrc[0]) === 0) {
                  lines.splice(i, 1);
                  i--;
                  continue;
                }
              }
              if (lines[i].length == 0) {
                lines.splice(i, 1);
                i--;
                continue;
              }
            }
          }
          if (ssrc[0] < 0) {
            Janus.warn("Couldn't find the video SSRC, simulcasting NOT enabled");
            return sdp;
          }
          if (insertAt < 0) {
            insertAt = lines.length;
          }
          ssrc[1] = Math.floor(Math.random() * 0xFFFFFFFF);
          ssrc[2] = Math.floor(Math.random() * 0xFFFFFFFF);
          ssrc_fid[1] = Math.floor(Math.random() * 0xFFFFFFFF);
          ssrc_fid[2] = Math.floor(Math.random() * 0xFFFFFFFF);
          for (var i = 0; i < ssrc.length; i++) {
            if (cname) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' cname:' + cname);
              insertAt++;
            }
            if (msid) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' msid:' + msid);
              insertAt++;
            }
            if (mslabel) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' mslabel:' + mslabel);
              insertAt++;
            }
            if (label) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' label:' + label);
              insertAt++;
            }
            if (cname) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' cname:' + cname);
              insertAt++;
            }
            if (msid) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' msid:' + msid);
              insertAt++;
            }
            if (mslabel) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' mslabel:' + mslabel);
              insertAt++;
            }
            if (label) {
              lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' label:' + label);
              insertAt++;
            }
          }
          lines.splice(insertAt, 0, 'a=ssrc-group:FID ' + ssrc[2] + ' ' + ssrc_fid[2]);
          lines.splice(insertAt, 0, 'a=ssrc-group:FID ' + ssrc[1] + ' ' + ssrc_fid[1]);
          lines.splice(insertAt, 0, 'a=ssrc-group:FID ' + ssrc[0] + ' ' + ssrc_fid[0]);
          lines.splice(insertAt, 0, 'a=ssrc-group:SIM ' + ssrc[0] + ' ' + ssrc[1] + ' ' + ssrc[2]);
          sdp = lines.join("\r\n");
          if (!sdp.endsWith("\r\n"))
            sdp += "\r\n";
          return sdp;
        }

        function isAudioSendEnabled(media) {
          Janus.debug("isAudioSendEnabled:", media);
          if (media === undefined || media === null)
            return true;
          if (media.audio === false)
            return false;
          if (media.audioSend === undefined || media.audioSend === null)
            return true;
          return (media.audioSend === true);
        }

        function isAudioSendRequired(media) {
          Janus.debug("isAudioSendRequired:", media);
          if (media === undefined || media === null)
            return false;
          if (media.audio === false || media.audioSend === false)
            return false;
          if (media.failIfNoAudio === undefined || media.failIfNoAudio === null)
            return false;
          return (media.failIfNoAudio === true);
        }

        function isAudioRecvEnabled(media) {
          Janus.debug("isAudioRecvEnabled:", media);
          if (media === undefined || media === null)
            return true;
          if (media.audio === false)
            return false;
          if (media.audioRecv === undefined || media.audioRecv === null)
            return true;
          return (media.audioRecv === true);
        }

        function isVideoSendEnabled(media) {
          Janus.debug("isVideoSendEnabled:", media);
          if (media === undefined || media === null)
            return true;
          if (media.video === false)
            return false;
          if (media.videoSend === undefined || media.videoSend === null)
            return true;
          return (media.videoSend === true);
        }

        function isVideoSendRequired(media) {
          Janus.debug("isVideoSendRequired:", media);
          if (media === undefined || media === null)
            return false;
          if (media.video === false || media.videoSend === false)
            return false;
          if (media.failIfNoVideo === undefined || media.failIfNoVideo === null)
            return false;
          return (media.failIfNoVideo === true);
        }

        function isVideoRecvEnabled(media) {
          Janus.debug("isVideoRecvEnabled:", media);
          if (media === undefined || media === null)
            return true;
          if (media.video === false)
            return false;
          if (media.videoRecv === undefined || media.videoRecv === null)
            return true;
          return (media.videoRecv === true);
        }

        function isDataEnabled(media) {
          Janus.debug("isDataEnabled:", media);
          if (Janus.webRTCAdapter.browserDetails.browser == "edge") {
            Janus.warn("Edge doesn't support data channels yet");
            return false;
          }
          if (media === undefined || media === null)
            return false;
          return (media.data === true);
        }

        function isTrickleEnabled(trickle) {
          Janus.debug("isTrickleEnabled:", trickle);
          if (trickle === undefined || trickle === null)
            return true;
          return (trickle === true);
        }
      };
      Janus.sessions = {};

      Janus.extensionId = "hapfgfdkleiggjjpfpenajgdnfckjpaj";
      Janus.isExtensionEnabled = function () {
        if (window.navigator.userAgent.match('Chrome')) {
          var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10);
          var maxver = 33;
          if (window.navigator.userAgent.match('Linux'))
            maxver = 35;
          if (chromever >= 26 && chromever <= maxver) {
            return true;
          }
          return Janus.checkJanusExtension();
        } else {
          return true;
        }
      };

      Janus.useDefaultDependencies = function (deps) {
        var f = (deps && deps.fetch) || fetch;
        var p = (deps && deps.Promise) || Promise;
        var socketCls = (deps && deps.WebSocket) || WebSocket;
        return {
          newWebSocket: function (server, proto) {
            return new socketCls(server, proto);
          },
          isArray: function (arr) {
            return Array.isArray(arr);
          },
          checkJanusExtension: function () {
            return document.querySelector('#janus-extension-installed') !== null;
          },
          webRTCAdapter: (deps && deps.adapter) || adapter,
          httpAPICall: function (url, options) {
            var fetchOptions = {
              method: options.verb,
              headers: {
                'Accept': 'application/json, text/plain, */*'
              },
              cache: 'no-cache'
            };
            if (options.verb === "POST") {
              fetchOptions.headers['Content-Type'] = 'application/json';
            }
            if (options.withCredentials !== undefined) {
              fetchOptions.credentials = options.withCredentials === true ? 'include' : (options.withCredentials ? options.withCredentials : 'omit');
            }
            if (options.body !== undefined) {
              fetchOptions.body = JSON.stringify(options.body);
            }

            var fetching = f(url, fetchOptions).catch(function (error) {
              return p.reject(new Error('Probably a network error, is the gateway down? ' + error.message));
            });


            if (options.timeout !== undefined) {
              var timeout = new p(function (resolve, reject) {
                var timerId = setTimeout(function () {
                  clearTimeout(timerId);
                  return reject(new Error('Request timed out ' + timeout));
                }, options.timeout);
              });
              fetching = p.race([fetching, timeout]);
            }

            fetching.then(function (response) {
              if (response && response.ok) {
                if (typeof (options.success) === typeof (Janus.noop)) {
                  return response.json().then(function (parsed) {
                    options.success(parsed);
                  }).catch(function (error) {
                    return p.reject(new Error('Failed to parse response body ' + error.message));
                  });
                }
              } else {
                return p.reject(new Error('API call failed ' + response.status));
              }
            }).catch(function (error) {
              if (typeof (options.error) === typeof (Janus.noop)) {
                options.error(error.message || '<< internal error >>', error);
              }
            });

            return fetching;
          }
        }
      };

      Janus.useOldDependencies = function (deps) {
        var jq = (deps && deps.jQuery) || jQuery;
        var socketCls = (deps && deps.WebSocket) || WebSocket;
        return {
          newWebSocket: function (server, proto) {
            return new socketCls(server, proto);
          },
          isArray: function (arr) {
            return jq.isArray(arr);
          },
          checkJanusExtension: function () {
            return jq('#janus-extension-installed').length > 0;
          },
          webRTCAdapter: (deps && deps.adapter) || adapter,
          httpAPICall: function (url, options) {
            var payload = options.body !== undefined ? {
              contentType: 'application/json',
              data: JSON.stringify(options.body)
            } : {};
            var credentials = options.withCredentials !== undefined ? { xhrFields: { withCredentials: options.withCredentials } } : {};

            return jq.ajax(jq.extend(payload, credentials, {
              url: url,
              type: options.verb,
              cache: false,
              dataType: 'json',
              async: options.async,
              timeout: options.timeout,
              success: function (result) {
                if (typeof (options.success) === typeof (Janus.noop)) {
                  options.success(result);
                }
              },
              error: function (xhr, status, err) {
                if (typeof (options.error) === typeof (Janus.noop)) {
                  options.error(status, err);
                }
              }
            }));
          },
        };
      };

      Janus.noop = function () {
      };

      Janus.init = function (options) {
        options = options || {};
        options.callback = (typeof options.callback == "function") ? options.callback : Janus.noop;
        if (Janus.initDone === true) {
          options.callback();
        } else {
          if (typeof console == "undefined" || typeof console.log == "undefined")
            console = {
              log: function () {
              }
            };
          Janus.trace = Janus.noop;
          Janus.debug = Janus.noop;
          Janus.vdebug = Janus.noop;
          Janus.log = Janus.noop;
          Janus.warn = Janus.noop;
          Janus.error = Janus.noop;
          if (options.debug === true || options.debug === "all") {
            Janus.trace = Logger.trace.bind(console);
            Janus.debug = Logger.debug.bind(console);
            Janus.vdebug = Logger.debug.bind(console);
            Janus.log = Logger.log.bind(console);
            Janus.warn = Logger.warn.bind(console);
            Janus.error = Logger.error.bind(console);
          } else if (Array.isArray(options.debug)) {
            for (var i in options.debug) {
              var d = options.debug[i];
              switch (d) {
                case "trace":
                  Janus.trace = Logger.trace.bind(console);
                  break;
                case "debug":
                  Janus.debug = Logger.debug.bind(console);
                  break;
                case "vdebug":
                  Janus.vdebug = Logger.debug.bind(console);
                  break;
                case "log":
                  Janus.log = Logger.log.bind(console);
                  break;
                case "warn":
                  Janus.warn = Logger.warn.bind(console);
                  break;
                case "error":
                  Janus.error = Logger.error.bind(console);
                  break;
                default:
                  Logger.error("Unknown debugging option '" + d + "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')");
                  break;
              }
            }
          }
          Janus.log("Initializing library");

          var usedDependencies = options.dependencies || Janus.useDefaultDependencies();
          Janus.isArray = usedDependencies.isArray;
          Janus.webRTCAdapter = usedDependencies.webRTCAdapter;
          Janus.httpAPICall = usedDependencies.httpAPICall;
          Janus.checkJanusExtension = usedDependencies.checkJanusExtension;
          Janus.newWebSocket = usedDependencies.newWebSocket;

          Janus.listDevices = function (callback, config) {
            callback = (typeof callback == "function") ? callback : Janus.noop;
            if (config == null) config = { audio: true, video: true };
            if (navigator.mediaDevices) {
              navigator.mediaDevices.getUserMedia(config)
                .then(function (stream) {
                  navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    Janus.debug(devices);
                    callback(devices);
                    try {
                      var tracks = stream.getTracks();
                      for (var i in tracks) {
                        var mst = tracks[i];
                        if (mst !== null && mst !== undefined)
                          mst.stop();
                      }
                    } catch (e) {
                    }
                  });
                })
                .catch(function (err) {
                  Janus.error(err);
                  callback([]);
                });
            } else {
              Janus.warn("navigator.mediaDevices unavailable");
              callback([]);
            }
          }
          Janus.attachMediaStream = function (element, stream) {
            if (Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
              var chromever = Janus.webRTCAdapter.browserDetails.version;
              if (chromever >= 43) {
                element.srcObject = stream;
              } else if (typeof element.src !== 'undefined') {
                element.src = URL.createObjectURL(stream);
              } else {
                Janus.error("Error attaching stream to element");
              }
            } else {
              element.srcObject = stream;
            }
          };

          Janus.reattachMediaStream = function (to, from) {
            if (Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
              var chromever = Janus.webRTCAdapter.browserDetails.version;
              if (chromever >= 43) {
                to.srcObject = from.srcObject;
              } else if (typeof to.src !== 'undefined') {
                to.src = from.src;
              } else {
                Janus.error("Error reattaching stream to element");
              }
            } else {
              to.srcObject = from.srcObject;
            }
          };
          var oldOBF = window.onunload;
          window.onunload = function () {
            Janus.log("Closing window");
            for (var s in Janus.sessions) {
              if (Janus.sessions[s] !== null && Janus.sessions[s] !== undefined &&
                Janus.sessions[s].destroyOnUnload) {
                Janus.log("Destroying session " + s);
                Janus.sessions[s].destroy({ asyncRequest: false, notifyDestroyed: false });
              }
            }
            if (oldOBF && typeof oldOBF == "function")
              oldOBF();
          }
          Janus.initDone = true;
          options.callback();
        }
      };

      Janus.isWebrtcSupported = function () {
        return window.RTCPeerConnection !== undefined && window.RTCPeerConnection !== null &&
          navigator.getUserMedia !== undefined && navigator.getUserMedia !== null;
      };

      Janus.randomString = function (len) {
        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
      };
    })(window, document, undefined);

  }, {}], 12: [function (require, module, exports) {
    'use strict';

    function vcJanusSession() {

      var self = this;
      self.sessionHandle = null;
      var _reinitTimeout;

      var _janusServer;
      var _iceList = [];
      var _iceTransportPolicy;

      self.init = function (janusServer, stunServers, turnServers, iceTransportPolicy, cbFunc) {

        self.destroy();

        _janusServer = janusServer;
        _iceTransportPolicy = iceTransportPolicy || 'all';

        self.initCB = function (error, messages) {
          if (error) {
            Logger.error('Error Janus init callback called with error: ', error);
          } else {
            Logger.info('Janus init callback called with: ', messages);
          }
          if (typeof cbFunc == 'function') {
            cbFunc(error, messages);
          }
        };

        if (!janusServer) {
          self.initCB('Sever is needed');
          return;
        }

        var stunList = [{
          urls: 'stun:stun.l.google.com:19302'
        }];

        try {
          stunList = stunServers.split(',').reduce(function (o, v, i) {
            o.push({
              urls: 'stun:' + v
            });

            return o;
          }, []);

        } catch (e) {
          stunList = [{
            urls: 'stun:stun.l.google.com:19302'
          }];
        }

        var turnList = [];

        try {
          turnList = turnServers.split(',').reduce(function (o, v, i) {
            o.push({
              urls: 'turns:' + v,
              credential: 'hkakhkpdn884',
              username: 'impartus'
            });

            return o;
          }, []);

        } catch (e) {
          turnList = [];
        }

        _iceList = stunList.concat(turnList);

        Janus.init({
          debug: 'all',
          callback: function () {
            if (!Janus.isWebrtcSupported()) {
              self.initCB('NowebRTC Support');
            } else {

              Logger.info('Janus init with these settings: server, iceServers, iceTransportPolicy: ', _janusServer, _iceList, _iceTransportPolicy);
              if (_reinitTimeout) {
                clearTimeout(_reinitTimeout);
              }
              _reinitTimeout = setTimeout(function () {
                initWrapper();
              });
            }
          }
        });
      };

      function initWrapper() {
        self.sessionHandle = new Janus({
          max_poll_events: 50,
          server: _janusServer,
          iceServers: _iceList,
          iceTransportPolicy: _iceTransportPolicy,
          success: function () {
            self.initCB(null, {
              type: 'success'
            });
          },
          error: function (error) {
            self.initCB(error);

            if (ImpartusVC.allowAutoReconnection && self.sessionHandle) {
              if (_reinitTimeout) {
                clearTimeout(_reinitTimeout);
              }
              _reinitTimeout = setTimeout(function () {
                initWrapper();
              }, 3000);
            }
          },
          destroyed: function () {
            Janus.log('Janus session destroyed');
          }
        });
      }

      self.destroy = function () {
        if (self.sessionHandle) {
          self.sessionHandle.destroy();
          self.sessionHandle = null;
        }

        if (_reinitTimeout) {
          clearTimeout(_reinitTimeout);
          _reinitTimeout = undefined;
        }
      }
    }

    module.exports = new vcJanusSession();

  }, {}], 13: [function (require, module, exports) {
    'use strict';


    var eventing = require('../events/eventing');

    function vcRemoteStreamsService() {

      var self = this;
      self.remoteStreams = {};
      self.subscribers = {};
      self.audioOnlyStream = {};


      function Subscriber(stream, container, options, statsElement, callback) {

        var _selfSubscriber = this;


        _selfSubscriber.stream = stream;
        _selfSubscriber.streamCreated = false;
        _selfSubscriber.containers = [container];
        _selfSubscriber.options = options;
        _selfSubscriber.statsElement = statsElement;
        _selfSubscriber.subscribeCB = callback;
        _selfSubscriber.subscriptionId = ImpartusVC.guid();
        _selfSubscriber.attachingDivs = [];
        eventing(_selfSubscriber);
      }

      self.initializePublisher = function (publisherId, display) {

        display = JSON.safeParse(display);

        var streamId;


        if (display && display.stream && display.stream.streamId) {
          streamId = display.stream.streamId;
        } else {
          Logger.error('streamId is not present in publisher');
          return;
        }

        if (display.resolution == 'audio-only-stream') {
          if (!self.audioOnlyStream[streamId] ||
            !self.audioOnlyStream[streamId].joinTime ||
            (self.audioOnlyStream[streamId].joinTime < display.joinTime)) {
            self.audioOnlyStream[streamId] = display;
            self.audioOnlyStream[streamId].publisherId = publisherId;
            self.audioOnlyStream[streamId].statsObj = {
              packetsLost: 0,
              packetsReceived: 0,
              brnow: 0,
              delay: 0,
              rtt: 0,
              jitterDelay: 0,
              tsnow: 0
            };

            if (!self.audioOnlyStream[streamId].pluginHandle && self.subscribers[streamId]) {
              self.getRemoteAudioStream(streamId);
            }
          }

          return;
        }

        if (!self.remoteStreams[streamId]) {
          self.remoteStreams[streamId] = {
            slowLink: 0,
            lastSlowLink: 0,
            idleInterval: 30,
            maxIdleInterval: 30,
            resolutions: {},
            statsObj: {
              bitrate: 0,
              resolution: '0x0',
              width: 0,
              height: 0,
              decFrameRate: 0,
              framerate: 0,
              framerate_avg_st: 0,
              framerate_avg_lt: 0,
              fpsTime: 0,
              framesReceived: 0,
              framesDecoded: 0,
              deltaNack: 0,
              nackCount: 0,
              packetsReceived: 0,
              brnow: 0,
              delay: 0,
              rtt: 0,
              jitterDelay: 0,
              endToEndDelay: 0,
              tsnow: 0
            },
            videoType: 'camera'
          };
        }

        if (!self.remoteStreams[streamId].resolutions[display.resolution]) {
          self.remoteStreams[streamId].resolutions[display.resolution] = {};
        }

        if (self.remoteStreams[streamId].resolutions[display.resolution].publisherId &&
          (self.remoteStreams[streamId].resolutions[display.resolution].display.joinTime < display.joinTime)) {
          self.updateNewPublisher(streamId, display.resolution, publisherId);
        }

        if (display.stream.videoType) {
          self.remoteStreams[streamId].videoType = display.stream.videoType;
        }
        if (!self.remoteStreams[streamId].resolutions[display.resolution].display ||
          !self.remoteStreams[streamId].resolutions[display.resolution].display.joinTime ||
          self.remoteStreams[streamId].resolutions[display.resolution].display.joinTime < display.joinTime) {
          self.remoteStreams[streamId].resolutions[display.resolution].publisherId = publisherId;
          self.remoteStreams[streamId].resolutions[display.resolution].display = display;
        }

        if (!self.remoteStreams[streamId].pluginHandle && self.subscribers[streamId] && self.subscribers[streamId].options && !self.subscribers[streamId].options.audioOnly) {
          self.getRemoteStream(streamId, false, null);
        }
      };

      self.updatePublisherRemove = function (unpublished) {
        Logger.info('Update remove publisher, unpublished: ', unpublished);
        for (var streamId in self.remoteStreams) {
          for (var resolutionKey in self.remoteStreams[streamId].resolutions) {
            if (ImpartusVC.sessionObj.vcResolutionManager.isValidResolution(resolutionKey)) {
              if (unpublished == self.remoteStreams[streamId].resolutions[resolutionKey].publisherId) {
                delete self.remoteStreams[streamId].resolutions[resolutionKey];
                if (self.remoteStreams[streamId].pluginHandle) {
                  if (Object.keys(self.remoteStreams[streamId].resolutions).length == 0) {
                    self.remoteStreams[streamId].pluginHandle.detach();
                    self.remoteStreams[streamId].pluginHandle = null;

                    self.stopWatchingStreamQuality(streamId);
                    self.stopReportingStats(streamId);

                    if (self.remoteStreams[streamId].updateQualityOnUnpublish) {
                      clearTimeout(self.remoteStreams[streamId].updateQualityOnUnpublish);
                    }
                  } else if (self.remoteStreams[streamId].resolution == resolutionKey) {
                    self.updateQualityOnUnpublish(streamId);
                  }
                }
              }
            }
          }
        }

        for (var streamId in self.audioOnlyStream) {
          if (unpublished == self.audioOnlyStream[streamId].publisherId) {
            if (self.audioOnlyStream[streamId].pluginHandle) {
              self.audioOnlyStream[streamId].pluginHandle.detach();
              self.audioOnlyStream[streamId].pluginHandle = null;
            }
            delete self.audioOnlyStream[streamId];
          }
        }
      };

      self.updateNewPublisher = function (streamId, resolution, newPublisherId) {
        Logger.info('Update to new publisher, streamId, resolution, newPublisherId: ', streamId, resolution, newPublisherId);
        if (resolution == self.remoteStreams[streamId].resolution && self.remoteStreams[streamId].pluginHandle) {
          Logger.info('Switched');
          self.remoteStreams[streamId].pluginHandle.send({
            message: {
              request: 'switch',
              feed: newPublisherId
            }
          });
        }

        self.remoteStreams[streamId].resolutions[resolution].publisherId = newPublisherId;
      };

      self.getRemoteAudioStream = function (streamId) {
        if (!streamId) {
          Logger.warn('streamId is needed the remote audio stream');
          throw 'streamId is needed the remote audio stream';
          return;
        }

        if (!self.audioOnlyStream[streamId]) {
          Logger.warn('audio Publishers are not present for: ', streamId);
          return;
        }

        self.audioOnlyStream[streamId].stopRestarting = false;

        function callback(error, messages) {
          if (error) {
            Logger.error('Error occurred while getting remote audio stream: ', error);

            if (self.audioOnlyStream[streamId].reattachTimer) {
              clearTimeout(self.audioOnlyStream[streamId].reattachTimer);
              self.audioOnlyStream[streamId].reattachTimer = null;
            }
            self.audioOnlyStream[streamId].reattachTimer = setTimeout(function () {
              if (!self.audioOnlyStream[streamId]) return;
              self.audioOnlyStream[streamId].reattachTimer = null;
              self.getRemoteAudioStream(streamId);
            }, 2000);
            return;

          } else {
            Logger.info('Message from getting remote audio stream: ', messages);

            if (messages.type == 'onremotestream') {
              Logger.debug('Stream Attached to audio div: ', messages.stream.id);
              if (self.subscribers[streamId]) {
                Janus.attachMediaStream(self.subscribers[streamId].attachingAudioDiv, messages.stream);
              }
            }
          }

          if (messages) {
            messages.streamId = streamId;
          }

          if (self.subscribers[streamId]) {
            self.subscribers[streamId].callback(error, messages);
          }
        }

        if (!self.audioOnlyStream[streamId].reattachTimer) {
          self.audioOnlyStream[streamId].reattachTimer = setTimeout(function () {
            if (!self.audioOnlyStream[streamId]) return;
            self.audioOnlyStream[streamId].reattachTimer = null;
            attachAudio(streamId, callback);
          }, 30);
        }
      };

      self.getRemoteStream = function (streamId, fixQuality, initialQualityValue) {
        if (!streamId) {
          Logger.warn('streamId is needed the remote stream');
          throw 'streamId is needed the remote stream';
          return;
        }

        if (!self.remoteStreams[streamId]) {
          Logger.warn('Publishers are not present for: ', streamId);
          return;
        }

        if (self.options && self.options.audioOnly)
          return;

        self.remoteStreams[streamId].fixQuality = !!fixQuality;
        self.remoteStreams[streamId].stopRestarting = false;

        var selectedQuality;

        if (initialQualityValue && isNaN(initialQualityValue)) {
          initialQualityValue = ImpartusVC.sessionObj.vcResolutionManager.qualityMap[initialQualityValue];
        }

        if (initialQualityValue !== undefined && initialQualityValue !== null) {
          selectedQuality = initialQualityValue;
        } else {
          for (var resolutionKey in self.remoteStreams[streamId].resolutions) {
            if (ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 1) {
              selectedQuality = 1;
            } else if (ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 2) {
              if (selectedQuality === undefined || selectedQuality == 0) {
                selectedQuality = 2;
              }
            } else if (ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 0) {
              if (selectedQuality === undefined) {
                selectedQuality = 0;
              }
            }
          }
        }

        var selectedResolution = self.remoteStreams[streamId].resolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[selectedQuality];

        function callback(error, messages, resolution) {
          if (error) {
            Logger.error('Error occurred while getting remote stream: ', error);
            if (self.remoteStreams[streamId].reattachTimer) {
              clearTimeout(self.remoteStreams[streamId].reattachTimer);
              self.remoteStreams[streamId].reattachTimer = null;
            }
            self.remoteStreams[streamId].reattachTimer = setTimeout(function () {
              if (!self.remoteStreams[streamId]) return;
              self.remoteStreams[streamId].reattachTimer = null;
              self.getRemoteStream(streamId, fixQuality, initialQualityValue);
            }, 2000);

            return;
          } else {
            Logger.info('Message from getting remote stream: ', messages);

            if (messages.type == 'webrtcState' && messages.on && self.remoteStreams[streamId].stream) {
              Logger.debug('Stream Attached to div: ', self.remoteStreams[streamId].stream);
              if (self.subscribers[streamId]) {
                self.subscribers[streamId].attachingDivs.forEach((adiv) => {
                  try {
                    Janus.attachMediaStream(adiv, self.remoteStreams[streamId].stream);
                    retryPlay(adiv);
                  } catch (e) {
                    Logger.warn('Unable to play video in div:' + adiv);
                  }
                });
              }
            }
          }

          if (messages) {
            messages.streamId = streamId;
            messages.resolution = resolution;
          }

          if (self.subscribers[streamId]) {
            self.subscribers[streamId].callback(error, messages);
          }
        }

        if (!self.remoteStreams[streamId].reattachTimer) {
          self.remoteStreams[streamId].reattachTimer = setTimeout(function () {
            if (!self.remoteStreams[streamId]) return;
            self.remoteStreams[streamId].reattachTimer = null;
            attach(streamId, selectedResolution, callback);
          }, 30);
        }

      };

      function attachAudio(streamId, CB) {

        if (!streamId) {
          Logger.warn('streamId is needed to attach for the remote audio stream');
          return;
        }

        if (!self.audioOnlyStream[streamId]) {
          Logger.warn('stream does not exists for this audio stream, may be it is unpublished by the publisher');
          return;
        }

        if (self.audioOnlyStream[streamId].stopRestarting)
          return;

        function callback(error, messages) {
          if (error) {
            Logger.error('Error occurred while attach for remote stream: ', error);

            if (self.audioOnlyStream[streamId] && !self.audioOnlyStream[streamId].stopRestarting) {

              if (!self.audioOnlyStream[streamId].reattachTimer) {
                self.audioOnlyStream[streamId].reattachTimer = setTimeout(function () {
                  if (!self.audioOnlyStream[streamId]) return;
                  self.audioOnlyStream[streamId].reattachTimer = null;
                  attachAudio(streamId, CB);
                }, 1000);
              }
            }
          } else {
            Logger.info('Message from attach for remote stream: ', messages);

            if (messages.type == 'success') {
              if (!self.audioOnlyStream[streamId].publisherId) {
                error = new Error('publisherId vanished during join');
                CB(error);
                return;
              }

              self.audioOnlyStream[streamId].pluginHandle = messages.pluginHandle;

              ImpartusVC.sessionObj.vcServerManager.logSubsciberHandleInfo(streamId, self.subscribers[streamId].subscriptionId,
                messages.pluginHandle.getId(), ImpartusVC.sessionObj.vcJanusSession.sessionHandle.getSessionId());

              self.audioOnlyStream[streamId].pluginHandle.send({
                message: {
                  request: 'join',
                  room: ImpartusVC.sessionObj.vcSessionService.roomId,
                  pin: ImpartusVC.sessionObj.vcSessionService.roomPin,
                  ptype: 'subscriber',
                  close_pc: true,
                  feed: self.audioOnlyStream[streamId].publisherId
                }
              });
            }

            if (messages.type == 'slowLink') {
              self.audioOnlyStream[streamId].slowLink = self.audioOnlyStream[streamId].slowLink || 0;
              self.audioOnlyStream[streamId].slowLink++;
            }

            if (messages.type == 'jsep') {
              self.audioOnlyStream[streamId].pluginHandle.createAnswer({
                jsep: messages.jsep,
                media: {
                  audioSend: false,
                  videoSend: false
                },
                success: function (jsep) {
                  self.audioOnlyStream[streamId].pluginHandle.send({
                    message: {
                      request: 'start',
                      room: ImpartusVC.sessionObj.vcSessionService.roomId
                    },
                    jsep: jsep
                  });

                  self.watchAudioStreamQuality(streamId);

                },
                error: function (error) {
                  Logger.error('WebRTC error:', error, 'JSEP=', messages.jsep);
                  if (self.audioOnlyStream[streamId] && self.audioOnlyStream[streamId].pluginHandle) {
                    self.pluginHandle.detach();
                  }
                }
              });
            }

            if (messages.type == 'iceState') {

              if (messages.iceState == 'failed') {
                Logger.warn('iceState=failed for audio streamId=' + streamId);
                if (!self.audioOnlyStream[streamId]) return;
                if (self.audioOnlyStream[streamId].pluginHandle) {

                  self.audioOnlyStream[streamId].pluginHandle.detach();
                  self.audioOnlyStream[streamId].pluginHandle = null;
                }

                if (!self.audioOnlyStream[streamId].reattachTimer) {
                  self.audioOnlyStream[streamId].reattachTimer = setTimeout(function () {
                    if (!self.audioOnlyStream[streamId]) return;
                    self.audioOnlyStream[streamId].reattachTimer = null;
                    attachAudio(streamId, CB);
                  }, 1000);
                }
              }
            }
            if (messages.type == 'oncleanup') {
              if (!self.audioOnlyStream[streamId]) return;
              self.audioOnlyStream[streamId].pluginHandle = null;

              if (!self.audioOnlyStream[streamId].reattachTimer) {
                self.audioOnlyStream[streamId].reattachTimer = setTimeout(function () {
                  if (!self.audioOnlyStream[streamId]) return;
                  self.audioOnlyStream[streamId].reattachTimer = null;
                  attachAudio(streamId, CB);
                }, 1000);
              }
            }

            if (messages.type == 'onremotestream') {
              messages.stream.getTracks().forEach(function (track) {
                track.addEventListener('ended', function () {
                  if (self.audioOnlyStream && self.audioOnlyStream[streamId] && self.audioOnlyStream[streamId].pluginHandle) {
                    self.audioOnlyStream[streamId].pluginHandle.detach();
                    self.audioOnlyStream[streamId].pluginHandle = null;
                  }
                });
              });

              self.audioOnlyStream[streamId].stream = messages.stream;
            }
          }

          if (typeof CB == 'function') {
            CB(error, messages);
          }
        }

        if (!ImpartusVC.sessionObj.vcJanusSession.sessionHandle) {
          Logger.warn('Session Handle is not there while attaching as a subscriber video room');
          return;
        }

        ImpartusVC.sessionObj.vcJanusSession.sessionHandle.attach({
          plugin: 'janus.plugin.videoroom',
          success: function (pluginHandle) {
            callback(null, {
              type: 'success',
              pluginHandle: pluginHandle
            });
          },
          error: function (error) {
            callback(error);
          },
          onmessage: function (message, jsep) {

            if (message) {
              if (message.error) {
                callback(message.error);
              }

              if (message.videoroom === 'slow_link') {
                callback(null, {
                  type: 'slowLink'
                });
              }
            }

            if (jsep) {

              callback(null, {
                type: 'jsep',
                jsep: jsep
              });

            }
          },
          webrtcState: function (on) {
            callback(null, {
              type: 'webrtcState',
              on: on
            });
          },
          onlocalstream: function (stream) {
            callback(null, {
              type: 'onlocalstream',
              stream: stream
            });
          },
          iceState: function (iceState) {
            callback(null, {
              type: 'iceState',
              iceState: iceState
            });
          },
          onremotestream: function (stream) {
            callback(null, {
              type: 'onremotestream',
              stream: stream
            });
          },
          oncleanup: function () {
            callback(null, {
              type: 'oncleanup'
            });
          }
        });
      }

      function attach(streamId, resolution, CB) {

        if (!streamId) {
          Logger.warn('streamId is needed to attach for the remote stream');
          return;
        }

        if (!resolution) {
          Logger.warn('resolution is needed to attach for the remote stream');
          return;
        }

        if (!self.remoteStreams[streamId].resolutions || !self.remoteStreams[streamId].resolutions[resolution]) {
          Logger.warn('resolution does not exists for this streams, may be it is unpublished by the publisher');
          let error = new Error('resolution does not exists for this streams, may be it is unpublished by the publisher');
          CB(error);
          return;
        }

        if (self.remoteStreams[streamId].stopRestarting)
          return;

        function callback(error, messages) {
          if (error) {
            Logger.error('Error occurred while attach for remote stream: ', error);

            if (!self.remoteStreams[streamId].stopRestarting) {
              if (!self.remoteStreams[streamId].reattachTimer) {
                self.remoteStreams[streamId].reattachTimer = setTimeout(function () {
                  if (!self.remoteStreams[streamId]) return;
                  self.remoteStreams[streamId].reattachTimer = null;
                  attach(streamId, resolution, CB);
                }, 1000);
              }
            }
          } else {
            Logger.info('Message from attach for remote stream: ', messages);

            if (messages.type == 'success') {
              if (!self.remoteStreams[streamId].resolutions || !self.remoteStreams[streamId].resolutions[resolution] || !self.remoteStreams[streamId].resolutions[resolution].publisherId) {
                error = new Error('Join success; but resolution has vanished' + streamId + ' ' + resolution);
                CB(error);
                return;
              }

              self.remoteStreams[streamId].pluginHandle = messages.pluginHandle;

              ImpartusVC.sessionObj.vcServerManager.logSubsciberHandleInfo(streamId, self.subscribers[streamId].subscriptionId,
                messages.pluginHandle.getId(), ImpartusVC.sessionObj.vcJanusSession.sessionHandle.getSessionId());

              self.remoteStreams[streamId].pluginHandle.send({
                message: {
                  request: 'join',
                  room: ImpartusVC.sessionObj.vcSessionService.roomId,
                  pin: ImpartusVC.sessionObj.vcSessionService.roomPin,
                  ptype: 'subscriber',
                  close_pc: true,
                  feed: self.remoteStreams[streamId].resolutions[resolution].publisherId
                }
              });
            }

            if (messages.type == 'slowLink') {
              self.remoteStreams[streamId].slowLink = self.remoteStreams[streamId].slowLink || 0;
              self.remoteStreams[streamId].slowLink++;
            }

            if (messages.type == 'jsep') {
              self.remoteStreams[streamId].pluginHandle.createAnswer({
                jsep: messages.jsep,
                media: {
                  audioSend: false,
                  videoSend: false
                },
                success: function (jsep) {
                  self.remoteStreams[streamId].pluginHandle.send({
                    message: {
                      request: 'start',
                      room: ImpartusVC.sessionObj.vcSessionService.roomId
                    },
                    jsep: jsep
                  });

                  self.watchVideoStreamQuality(streamId);
                },
                error: function (error) {
                  Logger.error('WebRTC error:', error, 'SDP=', messages.jsep);
                  if (self.remoteStreams[streamId] && self.remoteStreams[streamId].pluginHandle) {
                    self.remoteStreams[streamId].detach();
                  }
                }
              });
            }

            if (messages.type == 'webrtcState') {
              if (!self.remoteStreams[streamId]) return;

              if (!messages.on) {
                self.remoteStreams[streamId].pluginHandle = null;

                if (!self.remoteStreams[streamId].reattachTimer) {
                  self.remoteStreams[streamId].reattachTimer = setTimeout(function () {
                    if (!self.remoteStreams[streamId]) return;
                    self.remoteStreams[streamId].reattachTimer = null;
                    attach(streamId, resolution, CB);
                  }, 1000);
                }
              }
            }

            if (messages.type == 'oncleanup') {
              if (!self.remoteStreams[streamId]) return;
              self.remoteStreams[streamId].pluginHandle = null;

              if (!self.remoteStreams[streamId].reattachTimer) {
                self.remoteStreams[streamId].reattachTimer = setTimeout(function () {
                  if (!self.remoteStreams[streamId]) return;
                  self.remoteStreams[streamId].reattachTimer = null;
                  attach(streamId, resolution, CB);
                }, 1000);
              }
            }

            if (messages.type == 'iceState') {

              if (messages.iceState == 'failed') {

                Logger.warn('iceState=failed for video streamId=' + streamId);
                if (!self.remoteStreams[streamId]) return;
                if (self.remoteStreams[streamId].stopRestarting) return;

                if (self.remoteStreams[streamId].pluginHandle) {

                  self.remoteStreams[streamId].pluginHandle.detach();
                  self.remoteStreams[streamId].pluginHandle = null;
                }

                if (!self.remoteStreams[streamId].reattachTimer) {
                  self.remoteStreams[streamId].reattachTimer = setTimeout(function () {
                    if (!self.remoteStreams[streamId]) return;
                    self.remoteStreams[streamId].reattachTimer = null;
                    attach(streamId, resolution, CB);
                  }, 1000);
                }
              }
            }

            if (messages.type == 'onremotestream') {
              messages.stream.getTracks().forEach(function (track) {
                track.addEventListener('ended', function () {
                  if (self.subscribers[streamId] && self.subscribers[streamId].attachingDivs && self.subscribers[streamId].options.pauseOnUnpublish) {
                    self.subscribers[streamId].attachingDivs.forEach((adiv) => {
                      try {
                        adiv.pause();
                      } catch (e) { }
                    });
                  }
                  if (self.remoteStreams[streamId] && !!self.remoteStreams[streamId].pluginHandle) {
                    self.remoteStreams[streamId].pluginHandle.detach();
                    self.remoteStreams[streamId].pluginHandle = null;
                  }
                });
              });

              self.remoteStreams[streamId].stream = messages.stream;
            }
          }

          if (typeof CB == 'function') {
            CB(error, messages, resolution);
          }
        }

        if (!ImpartusVC.sessionObj.vcJanusSession.sessionHandle) {
          Logger.warn('Session Handle is not there while attaching as a subscriber video room');
          return;
        }

        ImpartusVC.sessionObj.vcJanusSession.sessionHandle.attach({
          plugin: 'janus.plugin.videoroom',
          success: function (pluginHandle) {
            callback(null, {
              type: 'success',
              pluginHandle: pluginHandle
            });
          },
          error: function (error) {
            callback(error);
          },
          onmessage: function (message, jsep) {

            if (message) {
              if (message.error) {
                callback(message.error);
              }

              if (message.videoroom === 'slow_link') {
                callback(null, {
                  type: 'slowLink'
                });
              }
            }

            if (jsep) {

              callback(null, {
                type: 'jsep',
                jsep: jsep
              });

            }
          },
          webrtcState: function (on) {
            callback(null, {
              type: 'webrtcState',
              on: on
            });
          },
          onlocalstream: function (stream) {
            callback(null, {
              type: 'onlocalstream',
              stream: stream
            });
          },
          iceState: function (iceState) {
            callback(null, {
              type: 'iceState',
              iceState: iceState
            });
          },
          onremotestream: function (stream) {
            callback(null, {
              type: 'onremotestream',
              stream: stream
            });
          },
          oncleanup: function () {
            callback(null, {
              type: 'oncleanup'
            });
          }
        });
      }

      function watchQualityRepeater(streamId) {
        if (self.remoteStreams[streamId].fixQuality) {
          return;
        }
        Logger.debug('Slowlink count old, new, idle: ', self.remoteStreams[streamId].lastSlowLink, self.remoteStreams[streamId].slowLink, self.remoteStreams[streamId].idleInterval, JSON.stringify(self.remoteStreams[streamId].statsObj));
        if (false) {
          if (self.remoteStreams[streamId].slowLink > 3) {
            self.changeQualityStream(streamId, false);
          } else if (self.remoteStreams[streamId].slowLink == 0) {
            self.changeQualityStream(streamId, true);
          }
        } else {
          if (self.remoteStreams[streamId].slowLink > 0 && !(self.dipstickTests[streamId] && self.dipstickTests[streamId].running)) {
            self.remoteStreams[streamId].idleInterval = Math.min(self.remoteStreams[streamId].idleInterval + 4, self.remoteStreams[streamId].maxIdleInterval);
            self.remoteStreams[streamId].maxIdleInterval = Math.min(Math.round(self.remoteStreams[streamId].maxIdleInterval * 1.2), 140);
            if (self.remoteStreams[streamId].slowLink > 6) {
              self.changeQualityStream(streamId, false);
            }
          } else if (self.remoteStreams[streamId].slowLink == 0 && !(self.dipstickTests[streamId] && self.dipstickTests[streamId].running)) {
            self.remoteStreams[streamId].idleInterval = Math.max(self.remoteStreams[streamId].idleInterval - 4, 0);
            if (self.remoteStreams[streamId].idleInterval == 0) {
              self.runHighQualityDipstick(streamId);
              self.remoteStreams[streamId].idleInterval = self.remoteStreams[streamId].maxIdleInterval;
            }
          }
        }

        self.remoteStreams[streamId].lastSlowLink = self.remoteStreams[streamId].slowLink;
        self.remoteStreams[streamId].slowLink = 0;
      }

      self.dipstickTests = {};
      self.runHighQualityDipstick = function (streamId) {
        if (self.dipstickTests[streamId]) return;

        self.changeQualityStream(streamId, true);

        self.dipstickTests[streamId] = {
          running: true,
          revertTimer: setTimeout(function () {
            self.changeQualityStream(streamId, false);
          }, 3000),
          fpsResult: [],
          jitterResult: [],
          analyzeTimer: null
        };

        self.dipstickTests[streamId].analyzeTimer = setTimeout(function () {
          self.dipstickTests[streamId].running = false;
          var testPass = true;
          var jitterVar = findVar(self.dipstickTests[streamId].jitterResult);
          var fpsVar = findVar(self.dipstickTests[streamId].fpsResult);
          Logger.log('jitterArr=', self.dipstickTests[streamId].jitterResult, ' fpsArr=', self.dipstickTests[streamId].fpsResult);
          Logger.log('jitterVar=' + jitterVar + ' fpsVar=' + fpsVar);
          if (!isNaN(jitterVar) && jitterVar > 1)
            testPass = false;
          if (!isNaN(jitterVar) && fpsVar > 0.2)
            testPass = false;
          if (testPass)
            self.changeQualityStream(streamId, true);
          delete self.dipstickTests[streamId];
        }, 10000);
      }

      function findVar(data) {
        var std = 0;
        var mean = 0;
        var idx = 0;
        if (data && data.length > 0) {
          for (idx = 0; idx < data.length; idx++) {
            mean = mean + data[idx];
          }
          mean = mean / data.length;
          for (idx = 0; idx < data.length; idx++) {
            std = (data[idx] - mean) * (data[idx] - mean) + std;
          }
          std = Math.sqrt(std / data.length);
        }
        if (std > 0 && mean > 0) return (std / mean);
        return NaN;
      }

      self.watchVideoStreamQuality = function (streamId) {

        if (self.remoteStreams[streamId].slowLinkWatcher) {
          clearInterval(self.remoteStreams[streamId].slowLinkWatcher);
          self.remoteStreams[streamId].slowLinkWatcher = null;
        }

        self.remoteStreams[streamId].slowLinkWatcher = setInterval(function () {
          watchQualityRepeater(streamId);
        }, 4 * 1000);

        if (self.remoteStreams[streamId].statsTimer) {
          clearInterval(self.remoteStreams[streamId].statsTimer);
          self.remoteStreams[streamId].statsTimer = null;
        }

        self.remoteStreams[streamId].statsTimer = setInterval(function () {
          self.reportStats(streamId);
        }, 500);
      };

      self.watchAudioStreamQuality = function (streamId) {
        if (self.audioOnlyStream[streamId].statsTimer) {
          clearInterval(self.audioOnlyStream[streamId].statsTimer);
          self.audioOnlyStream[streamId].statsTimer = null;
        }

        self.audioOnlyStream[streamId].statsTimer = setInterval(function () {
          self.reportAudioStats(streamId);
        }, 500);
      }

      var lastReportTime = 0;

      self.reportAudioStats = function (streamId) {
        if (self.audioOnlyStream[streamId] &&
          self.audioOnlyStream[streamId].pluginHandle &&
          self.audioOnlyStream[streamId].pluginHandle.webrtcStuff &&
          self.audioOnlyStream[streamId].pluginHandle.webrtcStuff.pc &&
          self.audioOnlyStream[streamId].pluginHandle.webrtcStuff.pc.getStats) {

          self.audioOnlyStream[streamId].pluginHandle.webrtcStuff.pc.getStats(null).then(function (stats) {


            stats.forEach(function (report) {
              if ((report.mediaType === 'audio' || report.id.toLowerCase().indexOf('audio') > -1) && report.type === 'inbound-rtp' && report.id.indexOf('rtcp') < 0) {
                self.audioOnlyStream[streamId].statsObj.packetsReceived = report.packetsReceived;
                self.audioOnlyStream[streamId].statsObj.packetsLost = report.packetsLost;
                self.audioOnlyStream[streamId].statsObj.brnow = report.bytesReceived;

              }
              if (report['jitter'] && self.dipstickTests[streamId] && self.dipstickTests[streamId].running) {
                self.dipstickTests[streamId].jitterResult.push(report['jitter']);
              }
              if (report.totalRoundTripTime) {
                self.audioOnlyStream[streamId].statsObj.rtt = report.totalRoundTripTime;
                ImpartusVC.sessionObj.updateConnectionStats('rtt', report.totalRoundTripTime);
              }

              if (report.jitter) {
                ImpartusVC.sessionObj.updateConnectionStats('jitter', report.jitter);
              }
              if (report.jitterBufferDelay && report.jitterBufferEmittedCount) {
                self.audioOnlyStream[streamId].statsObj.jitterDelay = 1000 * report.jitterBufferDelay / report.jitterBufferEmittedCount;
              }
            });
          });
        }
      }

      self.reportStats = function (streamId) {


        if (self.remoteStreams &&
          self.remoteStreams[streamId] &&
          self.remoteStreams[streamId].pluginHandle &&
          self.remoteStreams[streamId].pluginHandle.webrtcStuff &&
          self.remoteStreams[streamId].pluginHandle.webrtcStuff.pc &&
          self.remoteStreams[streamId].pluginHandle.webrtcStuff.pc.getStats) {

          var so = self.remoteStreams[streamId].statsObj;

          self.remoteStreams[streamId].pluginHandle.webrtcStuff.pc.getStats(null).then(function (stats) {


            stats.forEach(function (report) {
              if (report['frameWidth']) {
                var fpsTime = Date.now();
                so.resolution = report['frameWidth'] + 'x' + report['frameHeight'];
                so.width = report['frameWidth'];
                so.height = report['frameHeight'];
                if (report.framesDecoded) {
                  so.decFrameRate = Math.round((report.framesDecoded - so.framesDecoded) * 1000 / (fpsTime - so.fpsTime));
                  so.framesDecoded = report.framesDecoded;
                }
                so.framerate = Math.round((report.framesReceived - so.framesReceived) * 1000 / (fpsTime - so.fpsTime));
                so.framerate_avg_lt = so.framerate * 0.03 + so.framerate_avg_lt * 0.97;
                so.framerate_avg_st = so.framerate * 0.3 + so.framerate_avg_st * 0.7;

                if (so.framerate_avg_st < 0.5 * so.framerate) so.framerate_avg_st = so.framerate;
                if (so.framerate_avg_lt < 0.5 * so.framerate) so.framerate_avg_lt = so.framerate;

                so.framesReceived = report.framesReceived;
                if (self.dipstickTests[streamId] && self.dipstickTests[streamId].running) {
                  self.dipstickTests[streamId].fpsResult.push(so.framerate);
                }
                so.fpsTime = fpsTime;
                if (so.framesReceived > 1 && (self.remoteStreams[streamId].videoType === 'camera')) {
                  if (so.framerate_avg_st < (0.6 * so.framerate_avg_lt)) {
                    self.remoteStreams[streamId].slowLink++;
                  }
                }
              }
              if (report['jitter'] && self.dipstickTests[streamId] && self.dipstickTests[streamId].running) {
                self.dipstickTests[streamId].jitterResult.push(report['jitter']);
              }

              if ((report.mediaType === 'video' || report.id.toLowerCase().indexOf('video') > -1) && report.type === 'inbound-rtp' && report.id.indexOf('rtcp') < 0) {

                var nackPerSecond = Math.round((report.nackCount - so.nackCount) * 1000 / (Date.now() - so.tsnow));
                if (nackPerSecond > 2) {
                  self.remoteStreams[streamId].slowLink++;
                }


                so.deltaNack = nackPerSecond;
                so.nackCount = report.nackCount;
                so.brnow = report.bytesReceived;
                so.packetsReceived = report.packetsReceived;

                so.tsnow = Date.now();

                if (report.jitter) {
                  ImpartusVC.sessionObj.updateConnectionStats('jitter', report.jitter);
                }
              }
              if (report.totalRoundTripTime) {
                so.rtt = report.totalRoundTripTime;
                ImpartusVC.sessionObj.updateConnectionStats('rtt', report.totalRoundTripTime);
              }

              if (report.jitterBufferDelay && report.jitterBufferEmittedCount) {
                so.jitterDelay = 1000 * report.jitterBufferDelay / report.jitterBufferEmittedCount;
              }
            });
          });

          so.bitrate = self.remoteStreams[streamId].pluginHandle.getBitrate();

          if (self.subscribers[streamId].statsElement) {
            self.subscribers[streamId].statsElement.innerHTML = '<p>' + so.bitrate + ', ' + so.framerate + ' fps, ' + so.resolution + '</p>';
          }
        }

      };

      self.stopWatchingStreamQuality = function (streamId) {
        if (self.remoteStreams[streamId] && self.remoteStreams[streamId].slowLinkWatcher) {
          clearInterval(self.remoteStreams[streamId].slowLinkWatcher);
        }
      };

      self.stopReportingStats = function (streamId) {
        if (self.remoteStreams[streamId] && self.remoteStreams[streamId].statsTimer) {
          clearInterval(self.remoteStreams[streamId].statsTimer);
        }
      };

      self.stopReportingAudioStats = function (streamId) {
        if (self.audioOnlyStream[streamId] && self.audioOnlyStream[streamId].statsTimer) {
          clearInterval(self.audioOnlyStream[streamId].statsTimer);
        }
      };

      self.changeQualityStream = function (streamId, up, quality) {
        if (self.remoteStreams[streamId] && self.remoteStreams[streamId].pluginHandle) {

          var currentQuality = ImpartusVC.sessionObj.vcResolutionManager.qualityMap[self.remoteStreams[streamId].resolution];

          if (quality) {
            if (quality && isNaN(quality)) {
              quality = self.qualityMap[quality];
            }
          } else {
            if (up) {
              quality = currentQuality - 1;
            } else {
              quality = currentQuality + 1;
            }
          }

          var selectedResolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[quality];
          if (selectedResolution && self.remoteStreams[streamId] && self.remoteStreams[streamId].resolutions[selectedResolution] && self.remoteStreams[streamId].resolutions[selectedResolution].publisherId) {
            Logger.debug('Switching Stream in Remote video: ', self.remoteStreams[streamId].resolution, selectedResolution);
            self.remoteStreams[streamId].resolution = selectedResolution;

            self.remoteStreams[streamId].pluginHandle.send({
              message: {
                request: 'switch',
                feed: self.remoteStreams[streamId].resolutions[selectedResolution].publisherId
              }
            });
          }
        }
      };

      self.updateQualityOnUnpublish = function (streamId) {
        if (self.remoteStreams[streamId].updateQualityOnUnpublish) {
          clearTimeout(self.remoteStreams[streamId].updateQualityOnUnpublish);
        }

        self.remoteStreams[streamId].updateQualityOnUnpublish = setTimeout(function () {
          if (self.remoteStreams[streamId] && !self.remoteStreams[streamId][self.remoteStreams[streamId].resolution]) {
            var currentQuality = ImpartusVC.sessionObj.vcResolutionManager.qualityMap[self.remoteStreams[streamId].resolution];
            var quality = currentQuality + 1;
            var selectedResolution;

            if (quality >= 0 && quality <= 2 && self.remoteStreams[streamId].resolutions[ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[quality]]) {
              selectedResolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[quality];
            }

            quality = currentQuality - 1;
            if (!selectedResolution && quality >= 0 && quality <= 2 && self.remoteStreams[streamId].resolutions[ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[quality]]) {
              selectedResolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[quality];
            }

            if (selectedResolution && self.remoteStreams[streamId] && self.remoteStreams[streamId].pluginHandle) {
              Logger.debug('Switching Stream in Remote video: ', self.remoteStreams[streamId].resolution, selectedResolution);
              self.remoteStreams[streamId].resolution = selectedResolution;

              self.remoteStreams[streamId].pluginHandle.send({
                message: {
                  request: 'switch',
                  feed: self.remoteStreams[streamId].resolutions[selectedResolution].publisherId
                }
              });
            }
          }
        }, 500);
      };

      self.stopRemoteStream = function (streamId, saveContainer) {
        if (!streamId) {
          Logger.warn('streamId is needed to stop the remote stream');
          throw 'streamId is needed to stop the remote stream';
          return;
        }

        if (!!self.remoteStreams[streamId]) {

          self.remoteStreams[streamId].stopRestarting = true;


          self.remoteStreams[streamId].stream = null;


          if (self.remoteStreams[streamId].pluginHandle) {
            self.remoteStreams[streamId].pluginHandle.detach();
            self.remoteStreams[streamId].pluginHandle = null;
          }

          if (self.remoteStreams[streamId].reattachTimer) {
            clearTimeout(self.remoteStreams[streamId].reattachTimer);
            self.remoteStreams[streamId].reattachTimer = null;
          }
        }

        if (!!self.audioOnlyStream[streamId]) {

          self.audioOnlyStream[streamId].stopRestarting = true;

          self.audioOnlyStream[streamId].stream = null;


          if (self.audioOnlyStream[streamId].pluginHandle) {
            self.audioOnlyStream[streamId].pluginHandle.detach();
            self.audioOnlyStream[streamId].pluginHandle = null;
          }

          if (self.audioOnlyStream[streamId].reattachTimer) {
            clearTimeout(self.audioOnlyStream[streamId].reattachTimer);
            self.audioOnlyStream[streamId].reattachTimer = null;
          }
        }

        if (self.subscribers[streamId] && !saveContainer) {
          if (self.subscribers[streamId].containers && self.subscribers[streamId].containers.length > 0) {
            self.subscribers[streamId].containers.forEach((cont) => {
              cont.parentNode.removeChild(cont);
            });
            delete self.subscribers[streamId];
          }
        }

        self.stopWatchingStreamQuality(streamId);
        self.stopReportingStats(streamId);
        self.stopReportingAudioStats(streamId);
      };

      self.destroy = function () {
        for (var streamId in self.remoteStreams) {
          self.stopRemoteStream(streamId);
        }
      };

      self.disconnect = function () {
        for (var streamId in self.remoteStreams) {
          self.stopRemoteStream(streamId, true);
        }
      };


      self.subscribe = function (stream, div, options, CB) {
        var self = this;

        options = Object.assign({
          audioVolume: 0.5,
          fitMode: 'cover',
          height: '100%',
          insertDefaultUI: true,
          insertMode: 'replace',
          preferredFrameRate: 30,
          preferredResolution: {
            width: 320,
            height: 240
          },
          videoAttributes: {
            id: '',
            classList: ''
          },
          showControls: false,
          audioOnly: false,
          pauseOnUnpublish: false,
          width: '100%'
        }, options || {});

        var container = ImpartusVC.getOrCreateContainer(div, options.insertMode);
        var attachingAudioDiv = null;
        var attachingDiv = null;

        attachingAudioDiv = ImpartusVC.createDomAudioElement();
        container.appendChild(attachingAudioDiv);

        if (!options.audioOnly) {
          attachingDiv = ImpartusVC.createDomVideoElement(container, 'Remote Video', true, options.videoAttributes);
        }

        var audioEnableButton = ImpartusVC.createAudioEnableButton(attachingAudioDiv, container);
        audioEnableButton.style.display = 'none';
        attachingAudioDiv.addEventListener('canplay', function (ev) {
          if (attachingAudioDiv.paused) audioEnableButton.style.display = 'inline-block';
        });

        attachingAudioDiv.addEventListener('pause', function (ev) {
          audioEnableButton.style.display = 'inline-block';
        });


        var statsElement = null;
        if (options.showControls) {
          statsElement = ImpartusVC.createStatDisplayElement();
          container.appendChild(statsElement);
        }

        var subscriber = new Subscriber(stream, container, options, statsElement, CB);
        subscriber.attachingAudioDiv = attachingAudioDiv;
        subscriber.attachingDivs.push(attachingDiv);
        subscriber.statsElement = statsElement;

        subscriber.callback = function (error, messages) {
          var _selfSubscriber = this;
          if (error) {
            if (typeof CB == 'function') {
              CB(error, messages);
            }
          } else {
            if (!self.subscribers[_selfSubscriber.stream.streamId].successCalled) {
              ImpartusVC.sessionObj.vcServerManager.logSubscribe(ImpartusVC.sessionObj.vcServerManager.selectedVRJanusServer,
                _selfSubscriber.stream.streamId, _selfSubscriber.subscriptionId);

              if (typeof CB == 'function') {
                CB();
              }

              self.subscribers[_selfSubscriber.stream.streamId].successCalled = true;
            }
          }
        };

        self.subscribers[stream.streamId] = subscriber;

        self.getRemoteAudioStream(stream.streamId);
        if (!options.audioOnly) {
          self.getRemoteStream(stream.streamId, false, null);
        }

        return subscriber;
      };

      self.unsubscribe = function (subscriber) {
        var self = this;

        self.stopRemoteStream(subscriber.stream.streamId);
      };

      function getRemoteStreamClosure(timeout, streamId, fixQuality, initialQualityValue, CB) {
        setTimeout(function () {
          self.getRemoteAudioStream(streamId);
          if (!self.subscribers[streamId].options.audioOnly) {
            self.getRemoteStream(streamId, fixQuality, initialQualityValue);
          }
        }, timeout * 300);
      }

      self.refetchPreviousStreams = function () {
        Logger.info('refetchPreviousStreams called');

        var ci = 1;
        for (var streamId in self.subscribers) {
          if (self.remoteStreams[streamId]) {
            ci++;
            getRemoteStreamClosure(ci, streamId, self.remoteStreams[streamId].fixQuality, self.remoteStreams[streamId].fixQuality ? self.remoteStreams[streamId].resolution : undefined);
          }
        }
      };

      Subscriber.prototype.getStats = function (completionHandler) {
        let streamId = this.stream.streamId;
        let returnStats = {};
        if (self.audioOnlyStream[streamId] &&
          self.audioOnlyStream[streamId].statsObj) {
          let audStats = self.audioOnlyStream[streamId].statsObj;
          returnStats["audio"] = {
            bytesReceived: audStats.brnow,
            packetsLost: audStats.packetsLost,
            packetsReceived: audStats.packetsReceived,
            delay: audStats.rtt / 2 + audStats.jitterDelay,
            accessDelay: audStats.rtt,
            timestamp: audStats.tsnow
          }
        }

        if (self.remoteStreams[streamId] && self.remoteStreams[streamId].statsObj) {
          var statsObj = self.remoteStreams[streamId].statsObj;
          returnStats["video"] = {
            bytesReceived: statsObj.brnow,
            packetsLost: statsObj.nackCount,
            packetsReceived: statsObj.packetsReceived,
            delay: statsObj.rtt / 2 + statsObj.jitterDelay,
            width: statsObj.width,
            height: statsObj.height,
            receiveFrameRate: statsObj.framerate,
            decodeFrameRate: statsObj.decFrameRate,
            endToEndDelay: statsObj.endToEndDelay,
            accessDelay: statsObj.rtt,
            timestamp: statsObj.tsnow
          }
        }

        if (returnStats["video"] || returnStats["audio"]) {
          setTimeout(function () { completionHandler(null, returnStats) }, 100);
        } else {
          completionHandler(new Error("No Audio or video streams present"));
        }
      }

      Subscriber.prototype.addDiv = function (div, options) {
        var _selfSubscriber = this;

        var _options = Object.assign({
          audioVolume: 0.5,
          fitMode: 'cover',
          height: '100%',
          insertDefaultUI: true,
          insertMode: 'replace',
          preferredFrameRate: 30,
          preferredResolution: {
            width: 320,
            height: 240
          },
          videoAttributes: {
            id: '',
            classList: ''
          },
          showControls: false,
          audioOnly: false,
          pauseOnUnpublish: false,
          width: '100%'
        }, options || {});

        if (div) {
          if (!_selfSubscriber.options.audioOnly) {
            var container = ImpartusVC.getOrCreateContainer(div, _options.insertMode);
            var attachingDiv = null;
            attachingDiv = ImpartusVC.createDomVideoElement(container, 'Remote Video', true, _options.videoAttributes || {});
            if (self.remoteStreams[_selfSubscriber.stream.streamId] && self.remoteStreams[_selfSubscriber.stream.streamId].stream)
              Janus.attachMediaStream(attachingDiv, self.remoteStreams[_selfSubscriber.stream.streamId].stream);
            _selfSubscriber.attachingDivs.push(attachingDiv);
            _selfSubscriber.containers.push(container);
          }
        }
      }
    }

    var retryPlay = function (element, count) {
      if (count > 3) return Promise.reject(new Error('Max retry of 4 reached'));
      if (!count) {
        count = 1;
      }
      return new Promise(function (res, rej) {
        var playPromise = element.play();
        if (playPromise) {
          playPromise.then(function () {
            res();
          }).catch(function (e) {
            setTimeout(function () {
              retryPlay(element, count + 1).then(() => {
                res();
              }, (e) => {
                rej(e);
              });
            }, 2000);
          });
        }
      });
    }

    module.exports = new vcRemoteStreamsService();

  }, { "../events/eventing": 8 }], 14: [function (require, module, exports) {
    'use strict';

    function vcResolutionManager() {

      var self = this;

      self.qualityMap = {
        'hires': 0,
        'stdres': 1,
        'lowres': 2
      };

      self.qualityReverseMap = {
        0: 'hires',
        1: 'stdres',
        2: 'lowres'
      };

      self.abrRatio = 1.2;
      self.abrUpRatio = 1.1;
      self.abrDownRatio = 0.96;
      self.abrMaxIdleIntervalLimit = 30;

      self.availableResolutions = [
        {
          label: '720p(HD)',
          width: 1280,
          height: 720,
          ratio: '16:9',
          bitrates: {
            low: 400 * 1024,
            std: 700 * 1024,
            high: 600 * 1024,
            current: 450 * 1024
          }
        },
        {
          label: '360p(nHD)',
          width: 640,
          height: 360,
          ratio: '16:9',
          bitrates: {
            low: 150 * 1024,
            std: 300 * 1024,
            high: 350 * 1024,
            current: 150 * 1024
          }
        },
        {
          label: '144p(YouTube 144p)',
          width: 640,
          height: 360,
          ratio: '16:9',
          bitrates: {
            low: 100 * 1024,
            std: 150 * 1024,
            high: 200 * 1024,
            current: 100 * 1024
          }
        },
        {
          label: '1024x768',
          width: 1024,
          height: 768,
          ratio: '4:3',
          bitrates: {
            low: 250 * 1024,
            std: 300 * 1024,
            high: 450 * 1024,
            current: 300 * 1024
          }
        },
        {
          label: '640x480(med)',
          width: 640,
          height: 480,
          ratio: '4:3',
          bitrates: {
            low: 150 * 1024,
            std: 300 * 1024,
            high: 350 * 1024,
            current: 150 * 1024
          }
        },
        {
          label: '640x480(low)',
          width: 640,
          height: 480,
          ratio: '4:3',
          bitrates: {
            low: 100 * 1024,
            std: 150 * 1024,
            high: 200 * 1024,
            current: 100 * 1024
          }
        },
        {
          label: '480x360',
          width: 480,
          height: 360,
          ratio: '4:3',
          bitrates: {
            low: 80 * 1024,
            std: 120 * 1024,
            high: 150 * 1024,
            current: 80 * 1024
          }
        },
        {
          label: '320x240',
          width: 320,
          height: 240,
          ratio: '4:3',
          bitrates: {
            low: 50 * 1024,
            std: 75 * 1024,
            high: 100 * 1024,
            current: 75 * 1024
          }
        }
      ];


      self.isValidResolution = function (key) {
        return !isNaN(self.qualityMap[key]);
      };

      self.getResolutions = function (videoSource, options) {
        Logger.debug('getResolutions videoSource: ', videoSource);

        var allowedResolutions = self.availableResolutions.filter(function (a) {
          return (a.ratio == options.ratio && a.width <= options.maxWidth && a.width >= options.minWidth)
        });

        var resolutions = {};

        if (videoSource instanceof MediaStream || !ImpartusVC.isMobile) {
          resolutions[self.qualityReverseMap[0]] = {
            resolution: self.qualityReverseMap[0],
            qualityLevel: 0,
            bitrate: JSON.parse(JSON.stringify(allowedResolutions[0].bitrates)),
            setLowCount: 0,
            setHighCount: 0,
            height: allowedResolutions[0].height,
            maxHeight: allowedResolutions[0].height,
            minHeight: allowedResolutions[0].height,
            width: videoSource == 'screen' ? 1920 : allowedResolutions[0].width,
            maxWidth: videoSource == 'screen' ? 1920 : allowedResolutions[0].width,
            minWidth: videoSource == 'screen' ? 1920 : allowedResolutions[0].width,
            framesPerSecond: videoSource == 'screen' ? 30 : 15
          };

          if (videoSource instanceof MediaStream) {
            return resolutions;
          }
        }

        if (!ImpartusVC.isMobile && ImpartusVC.browserDetails.browser !== 'safari' && ImpartusVC.browserDetails.browser !== 'edge' && allowedResolutions[allowedResolutions.length - 1]) {
          resolutions[self.qualityReverseMap[2]] = {
            resolution: self.qualityReverseMap[2],
            qualityLevel: 2,
            bitrate: JSON.parse(JSON.stringify(allowedResolutions[allowedResolutions.length - 1].bitrates)),
            setLowCount: 0,
            setHighCount: 0,
            height: allowedResolutions[allowedResolutions.length - 1].height,
            maxHeight: allowedResolutions[allowedResolutions.length - 1].height,
            minHeight: allowedResolutions[allowedResolutions.length - 1].height,
            width: allowedResolutions[allowedResolutions.length - 1].width,
            maxWidth: allowedResolutions[allowedResolutions.length - 1].width,
            minWidth: allowedResolutions[allowedResolutions.length - 1].width,
            framesPerSecond: videoSource == 'screen' ? 30 : 15
          };
        }

        if (((ImpartusVC.isMobile && ImpartusVC.browserDetails.browser == 'safari') || (ImpartusVC.browserDetails.browser !== 'safari' && ImpartusVC.browserDetails.browser !== 'edge')) && allowedResolutions[allowedResolutions.length - 2]) {
          resolutions[self.qualityReverseMap[1]] = {
            resolution: self.qualityReverseMap[1],
            qualityLevel: 1,
            bitrate: JSON.parse(JSON.stringify(allowedResolutions[allowedResolutions.length - 2].bitrates)),
            setLowCount: 0,
            setHighCount: 0,
            height: allowedResolutions[allowedResolutions.length - 2].height,
            maxHeight: allowedResolutions[allowedResolutions.length - 2].height,
            minHeight: allowedResolutions[allowedResolutions.length - 2].height,
            width: allowedResolutions[allowedResolutions.length - 2].width,
            maxWidth: allowedResolutions[allowedResolutions.length - 2].width,
            minWidth: allowedResolutions[allowedResolutions.length - 2].width,
            framesPerSecond: videoSource == 'screen' ? 30 : 15
          };
        }

        Logger.debug('Resolution asked hires: ', !!resolutions[self.qualityReverseMap[0]]);
        Logger.debug('Resolution asked stdres: ', !!resolutions[self.qualityReverseMap[1]]);
        Logger.debug('Resolution asked lowres: ', !!resolutions[self.qualityReverseMap[2]]);

        return resolutions;
      }
    }

    module.exports = new vcResolutionManager();

  }, {}], 15: [function (require, module, exports) {
    'use strict';

    var EventMap = require('../events/EventMap');
    var EventFactory = require('../events/EventFactory')();

    function vcServerManager() {
      var self = this;

      self.roomId = 0;
      self.authToken = "";
      self.location = {
        latitude: 0,
        longitude: 0
      };

      self.servers = [];
      self.selectedVRJanusServer = undefined;
      self.controllerURL = '/';
      self.serverListRefreshTimer = null;
      self.socket = null;
      self.connectionList = {};
      self.connected = false;
      self.disconnectForced = false;
      self.simulcastRes = null;
      self.ownConnectionId = "Dummy" + ImpartusVC.guid();

      self.CB = function () {
        Logger.info('Default socketConnected CB, Please provide custom on init of vcServerManager');
      };

      self.getLocation = function () {
        return Promise.resolve({ coords: { latitude: 0, longitude: 0 } });
      };

      self.connectVCController = function (callback) {
        self.connected = true;
        self.socket.emit('vcConnect', self.authToken, self.location.latitude, self.location.longitude, self.ownConnectionId, function (data) {
          if (data.error) {
            self.CB(new Error("Authorization Failure"));
          } else {

            if (data.connections && data.connections.length > 0) {
              data.connections.forEach(function (c) {

                if (c.connectionId) {
                  self.connectionList[c.connectionId] = c;
                  callback(null, {
                    type: 'complete'
                  });
                }

                self.CB(null, {
                  type: 'connection-created',
                  connection: c
                });
              })
            }

            if (data.serverList && data.serverList.length > 0) {
              updateServers(data.serverList);
            }

            if (data.simulcastRes && data.simulcastRes.resolutions && data.simulcastRes.bitrates) {
              self.simulcastRes = data.simulcastRes;

              self.CB(null, {
                type: 'resolution-update',
                resolutions: self.simulcastRes.resolutions,
                bitrates: self.simulcastRes.bitrates
              });
            }

          }
        });
      };

      function updateServers(serverList) {
        if (serverList && serverList.length > 0) {
          Logger.info('Got ServerList', serverList);
          self.servers = serverList;
          let needToChangeServer = true;

          if (self.selectedVRJanusServer) {
            self.servers.every(function (server) {
              if (server.ip == self.selectedVRJanusServer.ip && server.active) {
                needToChangeServer = false;
              }
            });
          }

          if (needToChangeServer) {
            self.servers.every(function (server) {
              if (server.active) {
                self.selectedVRJanusServer = server;
                return false;
              }
            });
          }

          if (needToChangeServer) {
            Logger.info('VRServerChanged CB Called with: ', self.selectedVRJanusServer);
            if (self.selectedVRJanusServer) {
              self.CB(null, {
                type: 'server-update',
                server: self.selectedVRJanusServer
              });
              self.socket.emit('vcServerChange', self.selectedVRJanusServer);
            } else {
              Logger.error('Server not available, please try recreating room');
              self.CB(new Error('Server not available, please try recreating room'));
            }
          }
        }
      }

      self.init = function (controllerURL, roomId, authToken, CB) {
        Logger.info('vcServerManager init Called roomId, authToken: ', roomId, authToken);
        var self = this;
        self.selectedVRJanusServer = null;
        self.ownConnectionId = ImpartusVC.guid();

        if (!CB) {
          throw 'CB is required for , Please read documentation';
        } else if (typeof CB !== 'function') {
          throw 'CB is not a function , Please read documentation';
        } else {
          self.CB = CB;
        }

        if (self.connected) self.disconnect();

        function callback(error, messages) {
          if (error) {
            Logger.error('Error occurred while init server manager: ', error);
          } else {
            Logger.info('Message from init server manager: ', messages);
          }

          self.CB(error, messages);
        }

        self.authToken = authToken;
        self.roomId = parseInt(roomId);
        self.controllerURL = controllerURL;

        self.getLocation().then(function (position) {
          self.location.latitude = position.coords.latitude;
          self.location.longitude = position.coords.longitude;
          return Promise.resolve();
        }, function () {
          Logger.warn('Unable to obtain accurate location, will try to find closest server based on latency.');
          self.location.latitude = 0;
          self.location.longitude = 0;
          return Promise.resolve();
        }).then(function () {

          self.socket = io(controllerURL, {
            reconnection: ImpartusVC.allowAutoReconnection,
            transports: ["websocket"]
          });

          self.connected = false;

          self.socket.on('connect', function () {

            self.socket.emit('user-connected');
            if (!self.connected) {
              self.connectVCController(callback);
            }
          });

          self.socket.on('serverList', function (serverList) {
            if (serverList && serverList.length > 0) {
              updateServers(serverList);
            }
          });

          self.socket.on('aggregatedMessage', function (d) {

            if (!d || !d.data) {
              return;
            }

            var data = JSON.safeParse(d.data, null);

            if (!data || data.length == 0) {
              return;
            }

            if (d.messageType === 'connectionCreated') {
              if (data.length > 0) {
                data.forEach(function (c) {
                  if (c.connectionId != self.ownConnectionId) {
                    setTimeout(function () {
                      callback(null, {
                        type: 'connection-created',
                        connection: c
                      });
                    }, 50);
                  }
                })
              }
            }

            if (d.messageType === 'connectionDestroyed') {
              if (data.length > 0) {
                data.forEach(function (c) {
                  setTimeout(function () {
                    callback(null, {
                      type: 'connection-destroyed',
                      connection: c
                    });
                  }, 50);
                })
              }
            }

            if (d.messageType === 'StreamPropertyChangedEvent') {

              if (data.length > 0) {
                data.forEach(function (o) {
                  setTimeout(function () {
                    ImpartusVC.sessionObj.dispatchEvent(new EventFactory.StreamPropertyChangedEvent(EventMap.STREAM_PROPERTY_CHANGED, o.stream, o.propertyName, o.oldValue, o.newValue))
                  }, 100);
                });
              }
            }
          });

          self.socket.on('connectionCreated', function (c) {
            if (c.connectionId) {
              self.connectionList[c.connectionId] = c;
            }
            callback(null, {
              type: 'connection-created',
              connection: c
            });
          });

          self.socket.on('connectionDestroyed', function (c) {
            if (c.connectionId) {
              delete self.connectionList[c.connectionId];
            }
            callback(null, {
              type: 'connection-destroyed',
              connection: c
            });
          });

          self.socket.on('error', function (e) {
            callback(new Error('session-error'));
          });


          self.socket.on('StreamPropertyChangedEvent', function (stream, propertyName, oldValue, newValue) {
            ImpartusVC.sessionObj.dispatchEvent(new EventFactory.StreamPropertyChangedEvent(EventMap.STREAM_PROPERTY_CHANGED, stream, propertyName, oldValue, newValue));
          });

          self.socket.on('disconnect', function (reason) {
            Logger.warn("vcServerManger: disconnect, reason:", reason);

            if (reason === 'io server disconnect') {
              setTimeout(function () { self.socket.connect() }, 3 * 1000);
            }
            self.connected = false;
            if (!self.disconnectForced) {
              self.disconnectForced = false;
              callback(null, {
                type: 'session-reconnecting'
              });
            } else {
              callback(null, {
                type: 'session-disconnected'
              });
            }
          });

          self.socket.on('reconnect_failed', function () {
            Logger.error("vcServerManager: Reconnection Failed");
            self.connected = false;
            callback(null, {
              type: 'session-disconnected'
            });
            self.socket.off();
          });

          self.socket.on('reconnect', function () {
            Logger.warn("vcServerManger: Reconnection Successful");
            self.socket.emit('user-connected');
          });

        }, function (error) {
          callback(error);
        });

      };

      self.disconnect = function () {
        self.disconnectForced = true;
        self.connected = false;
        try {
          self.socket.disconnect();
        } catch (e) {
        }
      };

      self.logPublish = function (streamId, audio, video, details, videoType) {
        try {
          self.socket.emit("publish", self.selectedVRJanusServer, streamId,
            audio, video, details, videoType);
        } catch (e) {
        }
      };

      self.logUnpublish = function (streamId) {
        try {
          self.socket.emit("unpublish", self.selectedVRJanusServer, streamId);
        } catch (e) {
        }
      };

      self.logSubscribe = function (serverIp, streamId, subscriptionId) {
        try {
          self.socket.emit("subscribe", self.selectedVRJanusServer, streamId,
            subscriptionId, self.ownConnectionId);
        } catch (e) {
        }
      };

      self.logUnsubscribe = function (serverIp, streamId, subscriptionId) {
        try {
          self.socket.emit("unsubscribe", self.selectedVRJanusServer, streamId, subscriptionId);
        } catch (e) {
        }
      };

      self.logPublisherHandleInfo = function (streamId, handlerId, sessionId) {
        try {
          self.socket.emit("addPublisherHandlerInfo", self.ownConnectionId, streamId, sessionId, handlerId);
        } catch (e) {

        }
      }

      self.logSubsciberHandleInfo = function (streamId, subscriptionId, handlerId, sessionId) {
        try {
          self.socket.emit("addSubscriberHandlerInfo", self.ownConnectionId, streamId,
            subscriptionId, sessionId, handlerId);
        } catch (e) {

        }
      }


      self.logSwitchResolution = function (streamId, startRes, endRes) {
        try {
          self.socket.emit('switchResolution', streamId, startRes, endRes);
        } catch (e) {
        }
      };

      self.logConnectServer = function () {
        try {
          self.socket.emit('connectServer', self.selectedVRJanusServer);
        } catch (e) {
        }
      };

      self.logAbrBitrateSet = function (streamId, bitRate) {
        try {
          self.socket.emit('abrBitrateSet', streamId, bitRate);
        } catch (e) {
        }
      };

      self.logEverything = function (impLogs) {
        try {
          self.socket.emit('clientLog', impLogs);
        } catch (e) {
        }
      };
    }

    module.exports = new vcServerManager();

  }, { "../events/EventFactory": 6, "../events/EventMap": 7 }], 16: [function (require, module, exports) {
    (function (Buffer) {
      'use strict';

      var EventMap = require('../events/EventMap');
      var EventFactory = require('../events/EventFactory')();

      function vcSessionService() {

        var self = this;
        self.roomId = undefined;
        self.joined = false;
        self.vcConnectionHandle = null;
        self.liveStreams = {};
        self.audioOnlyStreams = {};
        self.livePublishers = {};
        self.roomPin = undefined;

        var _reinitTimeout;

        self.init = function (token, roomId, CB) {
          self.setRoomPin(token);

          if (!roomId) {
            Logger.warn('rooId is not there while initializing video room');
            throw 'roomId is not there while initializing video room';
            return;
          }
          self.roomId = parseInt(roomId);

          self.disconnect();

          if (_reinitTimeout) {
            clearTimeout(_reinitTimeout);
          }
          _reinitTimeout = setTimeout(function () {
            initWrapper(CB);
          });
        };

        function initWrapper(CB) {

          Logger.info('Init Session is Called');

          if (!ImpartusVC.sessionObj.vcJanusSession.sessionHandle) {
            Logger.warn('Session Handle is not there while initializing video room');
            return;
          }

          function callback(error, messages) {
            if (error) {
              Logger.error('Error occurred while initializing video room: ', error);

              self.joined = false;

              if (_reinitTimeout) {
                clearTimeout(_reinitTimeout);
              }
              _reinitTimeout = setTimeout(function () {
                initWrapper(CB);
              }, 3000);
            } else {
              Logger.info('Message from initializing video room: ', messages);

              if (messages.type == 'joined') {
                self.joined = true;
                ImpartusVC.sessionObj.vcStreamsService.republishPreviousStreams();
                ImpartusVC.sessionObj.vcRemoteStreamsService.refetchPreviousStreams();
              }

              if (messages.type == 'publisher-update') {
                messages.publishers.forEach(function (publisher) {
                  ImpartusVC.sessionObj.vcRemoteStreamsService.initializePublisher(publisher.id, publisher.display);
                });

                savePublishers(messages.publishers);
              }

              if (messages.type == 'unpublished') {

                var _resolution, _removedPublisher = self.livePublishers[messages.unpublished];
                var _removedStreamId = _removedPublisher && _removedPublisher.stream ? _removedPublisher.stream.streamId : undefined;

                if (_removedStreamId) {
                  for (var resolution in self.liveStreams[_removedStreamId]) {
                    if (self.liveStreams[_removedStreamId][resolution].publisherId == messages.unpublished) {
                      _resolution = resolution;
                    }
                  }

                  if (!_resolution && self.audioOnlyStreams[_removedStreamId]) {
                    _resolution = 'audio-only-stream';
                  }

                  if (_resolution) {

                    if (_resolution == 'audio-only-stream') {
                      delete self.audioOnlyStreams[_removedStreamId];
                    } else {
                      delete self.liveStreams[_removedStreamId][_resolution];
                    }

                    setTimeout(function () {
                      if (self.liveStreams[_removedStreamId] && Object.keys(self.liveStreams[_removedStreamId]).length == 0 && !self.audioOnlyStreams[_removedStreamId]) {
                        delete self.liveStreams[_removedStreamId];

                        ImpartusVC.sessionObj.dispatchEvent(new EventFactory.StreamEvent(EventMap.STREAM_DESTROYED, {
                          connection: ImpartusVC.sessionObj.vcServerManager.connectionList[_removedPublisher.stream.connection.connectionId],
                          streamId: _removedStreamId
                        }, 'clientDisconnected', true));
                      }
                    }, 500);
                  }

                  delete self.livePublishers[messages.unpublished];
                }

                setTimeout(function () {
                  ImpartusVC.sessionObj.vcRemoteStreamsService.updatePublisherRemove(messages.unpublished);
                }, 300);
              }
            }

            CB(error, messages);
          }

          ImpartusVC.sessionObj.vcJanusSession.sessionHandle.attach({
            plugin: 'janus.plugin.videoroom',
            success: function (pluginHandle) {
              self.vcConnectionHandle = pluginHandle;
              self.vcConnectionHandle.send({
                message: {
                  request: 'join',
                  room: self.roomId,
                  pin: self.roomPin,
                  ptype: 'publisher',
                  display: JSON.stringify({
                    connectionId: ImpartusVC.sessionObj.vcServerManager.ownConnectionId
                  })
                },
                error: function (e) {
                  callback(e);
                }
              });
            },
            error: function (error) {
              callback(error);
            },
            consentDialog: function (on) {
              callback(null, {
                type: 'consentDialog',
                on: on
              });
            },
            mediaState: function (medium, on) {
              callback(null, {
                type: 'mediaState',
                medium: medium,
                on: on
              });
            },
            webrtcState: function (on) {
              callback(null, {
                type: 'webrtcState',
                on: on
              });
            },
            onmessage: function (message, jsep) {
              if (message && message.videoroom) {
                if ('joined' === message.videoroom) {

                  callback(null, {
                    type: 'joined'
                  });

                  if (message.publishers) {
                    callback(null, {
                      type: 'publisher-update',
                      list: true,
                      publishers: message.publishers
                    });
                  }

                } else if ('destroyed' === message.videoroom) {
                  callback(null, {
                    type: 'destroyed'
                  });
                } else if ('event' === message.videoroom) {
                  if (message.publishers) {
                    callback(null, {
                      type: 'publisher-update',
                      list: false,
                      publishers: message.publishers
                    });
                  } else if (message.leaving) {
                    Logger.warn('Ignoring leaving message');
                    callback(null, {
                      type: 'unpublished',
                      unpublished: message.leaving,
                      message: 'leaving'
                    });
                  } else if (message.unpublished) {
                    if ('ok' === message.unpublished) {
                      callback(null, {
                        type: 'unpublished',
                        unpublished: message.unpublished,
                        message: 'unpublished'
                      });
                    } else {
                      callback(null, {
                        type: 'unpublished',
                        unpublished: message.unpublished,
                        message: 'unpublished'
                      });
                    }
                  } else if (message.error) {
                    callback(message.error);
                  }
                }
              } else {
                callback(null, {
                  type: 'unknown',
                  message: message
                })
              }
            },
            onlocalstream: function (stream) {
              callback(null, {
                type: 'onlocalstream',
                stream: stream
              });
            },
            onremotestream: function (stream) {
              callback(null, {
                type: 'onremotestream',
                stream: stream

              });
            },
            oncleanup: function () {
              callback(null, {
                type: 'oncleanup'
              });
            }
          });
        }

        self.setRoomPin = function (token) {
          let tokInfo = JSON.safeParse((new Buffer(token.split('.')[1], 'base64')).toString('utf8'), {});

          if (tokInfo.pin) {
            self.roomPin = tokInfo.pin;
          } else {
            self.roomPin = null;
          }
        };

        self.destroy = function () {
          self.joined = false;
          self.liveStreams = {};
          self.audioOnlyStreams = {};

          if (self.vcConnectionHandle) {
            self.vcConnectionHandle.hangup();
            self.vcConnectionHandle = null;
          }

          if (ImpartusVC.sessionObj) {
            if (ImpartusVC.sessionObj.vcStreamsService) {
              ImpartusVC.sessionObj.vcStreamsService.destroy();
            }

            if (ImpartusVC.sessionObj.vcRemoteStreamsService) {
              ImpartusVC.sessionObj.vcRemoteStreamsService.destroy();
            }
          }

          if (_reinitTimeout) {
            clearTimeout(_reinitTimeout);
          }
        };

        self.disconnect = function () {
          self.joined = false;

          if (self.vcConnectionHandle) {
            self.vcConnectionHandle.hangup();
            self.vcConnectionHandle = null;
          }

          if (ImpartusVC.sessionObj) {
            if (ImpartusVC.sessionObj.vcStreamsService) {
              ImpartusVC.sessionObj.vcStreamsService.disconnect();
            }

            if (ImpartusVC.sessionObj.vcRemoteStreamsService) {
              ImpartusVC.sessionObj.vcRemoteStreamsService.disconnect();
            }
          }

          if (_reinitTimeout) {
            clearTimeout(_reinitTimeout);
          }
        };

        function savePublishers(publishers) {
          publishers.forEach(function (publisher) {
            var publisherInfo = publisher.display;

            if (publisherInfo) {
              publisherInfo = JSON.safeParse(publisherInfo);

              if ('object' === typeof publisherInfo) {
                publisherInfo.publisherId = publisher.id;
              }


              if (!self.audioOnlyStreams[publisherInfo.stream.streamId] && !self.liveStreams[publisherInfo.stream.streamId]) {
                if (ImpartusVC.sessionObj.vcServerManager.ownConnectionId != publisherInfo.stream.connection.connectionId) {
                  setTimeout(function () {
                    ImpartusVC.sessionObj.dispatchEvent(new EventFactory.StreamEvent(EventMap.STREAM_CREATED, publisherInfo.stream, null, false));
                  }, 500);
                }
              }

              if (publisherInfo.resolution == 'audio-only-stream') {
                if (!self.audioOnlyStreams[publisherInfo.stream.streamId] || self.audioOnlyStreams[publisherInfo.stream.streamId].joinTime < publisherInfo.joinTime) {
                  self.audioOnlyStreams[publisherInfo.stream.streamId] = publisherInfo;
                }
              } else {
                self.liveStreams[publisherInfo.stream.streamId] = self.liveStreams[publisherInfo.stream.streamId] || {};
                if (!self.liveStreams[publisherInfo.stream.streamId][publisherInfo.resolution] || self.liveStreams[publisherInfo.stream.streamId][publisherInfo.resolution].joinTime < publisherInfo.joinTime) {
                  self.liveStreams[publisherInfo.stream.streamId][publisherInfo.resolution] = publisherInfo;
                }
              }

              self.livePublishers[publisherInfo.publisherId] = publisherInfo;
            }
          });
        }
      }

      module.exports = new vcSessionService();

    }).call(this, require("buffer").Buffer)
  }, { "../events/EventFactory": 6, "../events/EventMap": 7, "buffer": 20 }], 17: [function (require, module, exports) {
    'use strict';

    var EventMap = require('../events/EventMap');
    var EventFactory = require('../events/EventFactory')();
    var eventing = require('../events/eventing');

    var ErrorMap = require('../errors/ErrorMap');
    var ErrorFactory = require('../errors/ErrorFactory')();
    var ImpartusVCErrorClass = require('../errors/ImpartusVCErrorClass');

    function vcStreamsService() {

      var self = this;

      self.deviceStreams = {};
      self.canvasCopyTimer = 0;
      self.audioPublisher = {};
      self.usedBW = 0;
      self.availableBW = 800;

      function Publisher(streamId, videoSource, audioSource, options, callback) {
        var _selfPublisher = this;
        _selfPublisher.videoSource = videoSource;
        _selfPublisher.audioSource = audioSource;
        _selfPublisher.streamId = streamId;
        _selfPublisher.resolutions = ImpartusVC.sessionObj.vcResolutionManager.getResolutions(videoSource, options);
        _selfPublisher.streamCreated = false;
        _selfPublisher.container = undefined;
        _selfPublisher.options = options;
        _selfPublisher.initPublisherCB = callback;
        _selfPublisher.statsElement = undefined;
        _selfPublisher.published = false;
        _selfPublisher.publishCB = undefined;
        _selfPublisher.stream = {
          connection: ImpartusVC.sessionObj.connection,
          streamId: streamId,
          hasVideo: options.publishVideo,
          hasAudio: options.publishAudio,
          name: options.name,
          videoType: ImpartusVC.getVideoTypeFromSource(_selfPublisher.options.videoSource)
        };

        if (!self.audioPublisher[streamId]) {
          self.audioPublisher[streamId] = {};
        }
        if (videoSource != 'screen') {
          self.audioPublisher[streamId].streamObj = _selfPublisher.stream;
        }

        if (videoSource == 'screen') {
          self.desktopCanvas1 = self.desktopCanvas1 || document.createElement('CANVAS');
          self.desktopCanvas2 = self.desktopCanvas2 || document.createElement('CANVAS');

          if ((typeof ImageCapture === 'undefined') || !self.desktopCanvas1.captureStream) {
            delete _selfPublisher.resolutions[ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[1]];
            delete _selfPublisher.resolutions[ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[2]];
          }
        }

        eventing(_selfPublisher);

        _selfPublisher.on(EventMap.STREAM_DESTROYED, function (event) {
          _selfPublisher.destroyed = true;
          _selfPublisher.published = false;
          delete self.deviceStreams[_selfPublisher.streamId];
        });
      }

      Publisher.prototype.publishAudio = function (value) {
        var _selfPublisher = this;
        var oldValue = _selfPublisher.stream.hasAudio, newValue = !!value;

        if (self.audioPublisher[_selfPublisher.streamId] && self.audioPublisher[_selfPublisher.streamId].stream) {
          var audioTracks = self.audioPublisher[_selfPublisher.streamId].stream.getAudioTracks();
          if (audioTracks) {
            audioTracks.forEach(function (audioTrack) {
              audioTrack.enabled = newValue;
            });
          }
        }
        _selfPublisher.stream.hasAudio = newValue;

        var propertyName = 'hasAudio';

        if (oldValue != newValue) {
          ImpartusVC.sessionObj.vcServerManager.socket.emit('StreamPropertyChangedEvent', _selfPublisher.stream, propertyName, oldValue, newValue);

          self.configureAudioPublisher(_selfPublisher.streamId);
        }
      };

      Publisher.prototype.getStats = function (completionHandler) {
        let _selfPublisher = this;
        let streamId = _selfPublisher.streamId;
        let returnStats = {};
        if (self.audioPublisher[streamId] &&
          self.audioPublisher[streamId].stats &&
          _selfPublisher.publishAudio) {
          let audStats = self.audioPublisher[streamId].stats;
          returnStats["audio"] = {
            accessDelay: audStats.rtt || 0,
            bytesSent: audStats.bsnow || 0,
            packetsLost: audStats.nackCount || 0,
            packetsSent: audStats.packetsSent || 0,
            timestamp: audStats.tsnow || 0
          }
        }

        if (_selfPublisher.publishVideo && self.deviceStreams[streamId]) {
          returnStats["video"] = {
            accessDelay: 0,
            bytesSent: 0,
            packetsLost: 0,
            packetsSent: 0,
            frameRate: 0,
            height: 0,
            width: 0,
            timestamp: 0
          }
          var highestRes = 0;
          Object.keys(self.deviceStreams[streamId].resolutions).forEach((res) => {
            if (self.deviceStreams[streamId].resolutions[res] &&
              self.deviceStreams[streamId].resolutions[res].stats) {
              var statsObj = self.deviceStreams[streamId].resolutions[res].stats;
              var isHighestRes = false;
              if (self.deviceStreams[streamId].resolutions[res].vcConnectionHandle) {
                highestRes = Math.max(highestRes, (statsObj.vidWidth * statsObj.vidHeight));
                isHighestRes = (highestRes == (statsObj.vidWidth * statsObj.vidHeight));
              }
              returnStats["video"] = {
                bytesSent: returnStats["video"].bytesSent + (statsObj.bsnow || 0),
                packetsLost: returnStats["video"].packetsLost + (statsObj.nackCount || 0),
                packetsSent: returnStats["video"].packetsSent + (statsObj.packetsSent || 0),
                timestamp: Math.max(returnStats["video"].timestamp, statsObj.tsnow),
                accessDelay: Math.max(returnStats["video"].accessDelay, (statsObj.rtt || 0)),
                width: Math.max(returnStats["video"].width, statsObj.vidWidth),
                height: Math.max(returnStats["video"].height, statsObj.vidHeight),
                frameRate: isHighestRes ? (statsObj.fps || 0) : returnStats["video"].frameRate
              }
            }
          });
        }

        if (returnStats["video"] || returnStats["audio"]) {
          setTimeout(function () { completionHandler(null, returnStats) }, 100);
        } else {
          completionHandler(new Error("No Audio or video streams present"));
        }
      }

      Publisher.prototype.replaceVideoTrack = function (newVideoTrack) {
        var _selfPublisher = this;

        for (var resolution in _selfPublisher.resolutions) {
          var videoTracks;

          if (_selfPublisher.resolutions[resolution] &&
            _selfPublisher.resolutions[resolution].vcConnectionHandle &&
            _selfPublisher.resolutions[resolution].vcConnectionHandle.webrtcStuff &&
            _selfPublisher.resolutions[resolution].vcConnectionHandle.webrtcStuff.pc) {

            let pc = _selfPublisher.resolutions[resolution].vcConnectionHandle.webrtcStuff.pc;
            let sender = pc.getSenders().find(function (s) {
              return s.track.kind == newVideoTrack.kind;
            });

            sender.replaceTrack(newVideoTrack);
          }

        }
      }

      Publisher.prototype.publishVideo = function (value) {
        var _selfPublisher = this;
        var oldValue = _selfPublisher.stream.hasVideo, newValue = !!value;
        var vidPublishDelay = 500;
        var eventDelay = 0;

        if (newValue) {
          vidPublishDelay = 0;
          eventDelay = 500;
        }

        setTimeout(function () {
          for (var resolution in _selfPublisher.resolutions) {
            var videoTracks;

            if (_selfPublisher.resolutions[resolution] && _selfPublisher.resolutions[resolution].stream) {
              videoTracks = _selfPublisher.resolutions[resolution].stream.getVideoTracks()
            }

            if (videoTracks) {
              videoTracks.forEach(function (videoTrack) {
                videoTrack.enabled = newValue;
              });
            }
          }
        }, vidPublishDelay);

        _selfPublisher.stream.hasVideo = newValue;

        var propertyName = 'hasVideo';

        if (oldValue != newValue) {
          setTimeout(function () {
            ImpartusVC.sessionObj.vcServerManager.socket.emit('StreamPropertyChangedEvent', _selfPublisher.stream, propertyName, oldValue, newValue);
          }, eventDelay);

          self.configurePublisher(_selfPublisher);
        }
      };

      Publisher.prototype.destroy = function () {
        var _selfPublisher = this;

        self.unpublishAndDetach(_selfPublisher.streamId);
      };

      self.attachAndPublish = function (streamId, CB) {

        function attachCallback(error, messages, streamId, resolution) {

          if (error) {
            Logger.error('Error occurred while publishing to video room: ', error);
          } else {
            Logger.info('Message from publishing to video room: ', messages);
            if (messages) {
              if (messages.type == 'joined' && self.deviceStreams[streamId].resolutions[resolution].stream) {
                connectStream(streamId, resolution);
              }
            }
          }

          if (typeof CB == 'function') {
            CB(error, messages);
          }
        }

        var resolutionsToStart = {
          'stdres': 1,
          'lowres': 2
        };

        var resMatched = false;

        for (var resolutionKey in self.deviceStreams[streamId].resolutions) {
          if (resolutionsToStart[resolutionKey])
            resMatched = true;
        }

        if (!resMatched) {
          resolutionsToStart = {};
          for (var resolutionKey in self.deviceStreams[streamId].resolutions) {
            resolutionsToStart[resolutionKey] = 1;
          }
        }

        if (self.deviceStreams[streamId] && self.deviceStreams[streamId].videoSource == 'screen') {
          resolutionsToStart = {
            'hires': 1
          };
        }

        for (var resolutionKey in self.deviceStreams[streamId].resolutions) {
          if (resolutionsToStart[resolutionKey]) {
            var multiplier = resolutionsToStart[resolutionKey] - 1;
            attachClosure(streamId, resolutionKey, attachCallback, multiplier);
          }
        }

        function attachAudioCallback(error, messages) {

          if (error) {
            Logger.error('Error occurred while publishing audio to video room: ', error);
          } else {
            Logger.info('Message from publishing audio to video room: ', messages);
            if (messages) {
              if (messages.type == 'joined' && self.audioPublisher[streamId].stream) {
                connectAudioStream(streamId);
              }
            }
          }

          if (typeof CB == 'function') {
            CB(error, messages);
          }
        }

        if (self.deviceStreams[streamId].videoSource != 'screen') {
          attachAudio(streamId, attachAudioCallback);
        }
      };

      self.attachAndPublishResolution = function (streamId, resolution) {

        function attachCallback(error, messages, streamId, resolution) {

          if (error) {
            Logger.error('Error occurred while publishing to video room: ', error);
          } else {
            Logger.info('Message from publishing to video room: ', messages);
            if (messages) {
              if (messages.type == 'joined') {
                if (self.deviceStreams[streamId].resolutions[resolution].stream) {
                  connectStream(streamId, resolution);
                }
              }
            }
          }

          if (typeof self.deviceStreams[streamId].publishCB == 'function') {
            self.deviceStreams[streamId].publishCB(error, messages);
          }
        }

        if (!self.deviceStreams[streamId].resolutions[resolution].reattachTimer) {
          self.deviceStreams[streamId].resolutions[resolution].reattachTimer = setTimeout(function () {
            try {
              self.deviceStreams[streamId].resolutions[resolution].reattachTimer = null;
              self.deviceStreams[streamId].resolutions[resolution].setLowCount = 0;
              Logger.info('Reattaching because Good Network in back: streamId, resolution: ', streamId, resolution);
              attach(streamId, resolution, attachCallback);
            } catch (e) { }
          }, 300);
        }
      };

      function attachClosure(streamId, resolution, CB, multiplier) {
        if (!self.deviceStreams[streamId].resolutions[resolution].reattachTimer) {
          self.deviceStreams[streamId].resolutions[resolution].reattachTimer = setTimeout(function () {
            try {
              self.deviceStreams[streamId].resolutions[resolution].reattachTimer = null;
              attach(streamId, resolution, CB);
            } catch (e) { }
          }, (2000 * multiplier) + 300);
        }
      }

      function attach(streamId, resolution, CB) {

        if (isNaN(self.deviceStreams[streamId].resolutions[resolution].slowLinkCount)) {
          self.deviceStreams[streamId].resolutions[resolution].slowLinkCount = 0;
        }

        if (!self.deviceStreams[streamId].resolutions[resolution].stream) {
          Logger.warn('Stream is not there while trying to attach, streamId, resolution: ', streamId, resolution);
          if (self.deviceStreams[streamId].resolutions[resolution].reattachTimer) {
            clearTimeout(self.deviceStreams[streamId].resolutions[resolution].reattachTimer);
            self.deviceStreams[streamId].resolutions[resolution].reattachTimer = null;
          }
          return;
        }

        Logger.info('Attaching streamId, resolution: ', streamId, resolution);

        function callback(error, messages) {
          if (error) {
            Logger.info('Error occurred while attaching to video room: ', error);
          } else {
            Logger.info('Message from attaching to video room, streamId, resolution, publisher: ', streamId, resolution, messages, self.deviceStreams[streamId]);

            if (!self.deviceStreams[streamId]) {
              return;
            }

            if (messages.type == 'joined') {
              self.deviceStreams[streamId].resolutions[resolution].joined = true;
            }

            if (messages.type == 'ondetached' || messages.type == 'oncleanup') {
              if (self.deviceStreams[streamId].resolutions[resolution].restartTimer) {
                clearTimeout(self.deviceStreams[streamId].resolutions[resolution].restartTimer);
                self.deviceStreams[streamId].resolutions[resolution].restartTimer = null;
              }

              if (!self.deviceStreams[streamId].resolutions[resolution].stopRestarting) {
                self.deviceStreams[streamId].resolutions[resolution].restartTimer = setTimeout(function () {
                  try {
                    if (self.deviceStreams[streamId].resolutions[resolution].stream && self.deviceStreams[streamId].resolutions[resolution].stream.getVideoTracks()[0].enabled
                      && self.deviceStreams[streamId].resolutions[resolution].joined && !!self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle) {
                      self.deviceStreams[streamId].resolutions[resolution].joined = false;
                      self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle.detach();
                      self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle = null;
                      if (self.deviceStreams[streamId].resolutions[resolution].reattachTimer) {
                        clearTimeout(self.deviceStreams[streamId].resolutions[resolution].reattachTimer);
                        self.deviceStreams[streamId].resolutions[resolution].reattachTimer = null;
                      }
                      self.deviceStreams[streamId].resolutions[resolution].reattachTimer = setTimeout(function () {
                        Logger.info('Reattaching from ondetached/oncleanup: streamId, resolution: ', streamId, resolution);
                        attach(streamId, resolution, CB);
                      }, 1300 * Math.random() + 500);
                      self.stopReportingStats(self.deviceStreams[streamId].resolutions[resolution]);
                    }
                  } catch (error) {
                  }
                }, 100);
              }
            }

            if (messages.type == 'unpublished') {
              Logger.warn('Ignoring unpublished message');
            }

            if (messages.type == 'slowLink') {
              self.deviceStreams[streamId].resolutions[resolution].slowLinkCount++;
            }

            if (messages.type == 'mediaState') {
              if (messages.medium == 'video') {
                if (!messages.on) {
                  Logger.warn('Ignoring mediaState message');
                } else {
                  if (self.deviceStreams[streamId].resolutions[resolution].restartTimer) {
                    clearTimeout(self.deviceStreams[streamId].resolutions[resolution].restartTimer);
                    self.deviceStreams[streamId].resolutions[resolution].restartTimer = null;
                  }
                  var streamObj = self.deviceStreams[streamId].resolutions[resolution];
                  var statsElement = self.deviceStreams[streamId].statsElement;
                  var mediaType = (self.deviceStreams[streamId].videoSource == 'screen' || self.deviceStreams[streamId].videoSource instanceof MediaStream) ? 'screen' : 'video';
                  self.reportStats(streamObj, statsElement, mediaType, CB);
                }

                self.deviceStreams[streamId].resolutions[resolution].mediaStatus = messages.on;
                var allResolutionsStatus = true;
                self.deviceStreams[streamId].resolutions[resolution].allResolutionsStatusAvailable = true;
                for (var resolutionKey in self.deviceStreams[streamId].resolutions) {
                  if (self.deviceStreams[streamId].resolutions[resolutionKey].mediaStatus === undefined) {
                    self.deviceStreams[streamId].resolutions[resolutionKey].allResolutionsStatusAvailable = false;
                  }

                  if (!self.deviceStreams[streamId].resolutions[resolutionKey].mediaStatus) {
                    allResolutionsStatus = false;
                  }
                }

                if (self.deviceStreams[streamId].resolutions[resolution].stream && self.deviceStreams[streamId].stream.hasVideo == false) {
                  var videoTracks = self.deviceStreams[streamId].resolutions[resolution].stream.getVideoTracks();

                  if (videoTracks) {
                    videoTracks.forEach(function (videoTrack) {
                      videoTrack.enabled = false;
                    });
                  }
                }

                if (self.deviceStreams[streamId].resolutions[resolution].allResolutionsStatusAvailable) {
                  error = null;
                  messages = {
                    type: 'onMediaState',
                    on: allResolutionsStatus
                  }
                }
              } else {
                if (self.deviceStreams[streamId].resolutions[resolution].stream && self.deviceStreams[streamId].stream.hasAudio == false) {
                  var audioTracks = self.deviceStreams[streamId].resolutions[resolution].stream.getAudioTracks();

                  if (audioTracks) {
                    audioTracks.forEach(function (audioTrack) {
                      audioTrack.enabled = false;
                    });
                  }
                }
              }
            }
          }

          if (typeof CB == 'function') {
            CB(error, messages, streamId, resolution);
          }
        }

        if (!ImpartusVC.sessionObj.vcJanusSession.sessionHandle) {
          Logger.info('Session Handle is not there while attaching as a publisher video room');
          return;
        }

        ImpartusVC.sessionObj.vcJanusSession.sessionHandle.attach({
          plugin: 'janus.plugin.videoroom',
          success: function (pluginHandle) {
            self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle = pluginHandle;
            ImpartusVC.sessionObj.vcServerManager.logPublisherHandleInfo(streamId,
              pluginHandle.getId(), ImpartusVC.sessionObj.vcJanusSession.sessionHandle.getSessionId());
            pluginHandle.send({
              message: {
                request: 'join',
                room: ImpartusVC.sessionObj.vcSessionService.roomId,
                ptype: 'publisher',
                pin: ImpartusVC.sessionObj.vcSessionService.roomPin,
                display: JSON.stringify({
                  resolution: resolution,
                  stream: self.deviceStreams[streamId].stream,
                  joinTime: Date.now()
                })
              }
            });
          },
          error: function (error) {
            callback(error);
          },
          consentDialog: function (on) {
            callback(null, {
              type: 'consentDialog',
              on: on
            });
          },
          mediaState: function (medium, on) {
            callback(null, {
              type: 'mediaState',
              medium: medium,
              on: on
            });
          },
          webrtcState: function (on) {
            callback(null, {
              type: 'webrtcState',
              on: on
            });
          },
          onmessage: function (message, jsep) {
            if (message && message.videoroom) {
              if ('joined' === message.videoroom) {
                self.deviceStreams[streamId].resolutions[resolution].publisherId = message.id;
                if (message.publishers) {
                  callback(null, {
                    type: 'publisher-update',
                    list: true,
                    publishers: message.publishers
                  });
                }

                callback(null, {
                  type: 'joined'
                });

              } else if ('destroyed' === message.videoroom) {
                callback(null, {
                  type: 'destroyed'
                });
              } else if (message.videoroom === 'slow_link') {
                callback(null, {
                  type: 'slowLink'
                });
              } else if ('event' === message.videoroom) {
                if (message.publishers) {
                  callback(null, {
                    type: 'publisher-update',
                    list: false,
                    publishers: message.publishers
                  });
                } else if (message.leaving) {
                  callback(null, {
                    type: 'unpublished',
                    unpublished: message.leaving
                  });
                } else if (message.unpublished) {
                  callback(null, {
                    type: 'unpublished',
                    unpublished: message.unpublished
                  });
                } else if (message.error) {
                  callback(message.error);
                }
              }
            } else {
              callback(null, {
                type: 'unknown',
                message: message
              });
            }

            if (jsep && self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle) {
              self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle.handleRemoteJsep({
                jsep: jsep
              });
            }
          },
          onlocalstream: function (stream) {
            callback(null, {
              type: 'onlocalstream',
              stream: stream
            });
            try {
              Logger.info('onlocalstream:', stream.getVideoTracks()[0].getSettings());
            } catch (e) {

            }
          },
          onremotestream: function (stream) {
            callback(null, {
              type: 'onremotestream',
              stream: stream
            });
          },
          ondetached: function () {
            callback(null, {
              type: 'ondetached'
            });
          },
          oncleanup: function () {
            callback(null, {
              type: 'oncleanup'
            });
          }
        });
      }

      function attachAudio(streamId, CB) {


        if (isNaN(self.audioPublisher[streamId].slowLinkCount)) {
          self.audioPublisher[streamId].slowLinkCount = 0;
        }

        if (!self.audioPublisher[streamId].stream) {
          Logger.warn('Audio Stream is not there while trying to attach');
          if (self.audioPublisher[streamId].reattachTimer) {
            clearTimeout(self.audioPublisher[streamId].reattachTimer);
            self.audioPublisher[streamId].reattachTimer = null;
          }
          return;
        }

        Logger.info('Attaching Audio');

        function callback(error, messages) {
          if (error) {
            Logger.info('Error occurred while attaching audio to video room: ', error);
          } else {
            Logger.info('Message from attaching audio to video room');

            if (messages.type == 'joined') {
              self.audioPublisher[streamId].joined = true;
            }

            if (messages.type == 'ondetached' || messages.type == 'oncleanup') {
              if (self.audioPublisher[streamId].restartTimer) {
                clearTimeout(self.audioPublisher[streamId].restartTimer);
                self.audioPublisher[streamId].restartTimer = null;
              }

              if (!self.audioPublisher[streamId].stopRestarting) {
                self.audioPublisher[streamId].restartTimer = setTimeout(function () {
                  try {
                    if (self.audioPublisher[streamId].stream && self.audioPublisher[streamId].stream.getAudioTracks()[0].enabled
                      && self.audioPublisher[streamId].joined && !!self.audioPublisher[streamId].vcConnectionHandle) {

                      self.audioPublisher[streamId].joined = false;
                      self.audioPublisher[streamId].vcConnectionHandle.detach();
                      self.audioPublisher[streamId].vcConnectionHandle = null;

                      if (self.audioPublisher[streamId].reattachTimer) {
                        clearTimeout(self.audioPublisher[streamId].reattachTimer);
                        self.audioPublisher[streamId].reattachTimer = null;
                      }

                      self.audioPublisher[streamId].reattachTimer = setTimeout(function () {
                        Logger.info('Reattaching audio from ondetached/oncleanup');
                        attachAudio(CB);
                      }, 1300 * Math.random() + 500);
                    }
                  } catch (error) {
                  }
                }, 100);
              }
            }

            if (messages.type == 'unpublished') {
              if ('ok' === messages.unpublished) {
                Logger.warn('Ignoring audio unpublished message');
              }
            }

            if (messages.type == 'slowLink') {
              self.audioPublisher[streamId].slowLinkCount++;
            }

            if (messages.type == 'mediaState') {
              if (messages.medium == 'audio') {
                if (!messages.on) {
                  Logger.warn('Ignoring audio mediastate  message');
                  self.stopReportingStats(self.audioPublisher[streamId].streamObj);
                } else {
                  if (self.audioPublisher[streamId].restartTimer) {
                    clearTimeout(self.audioPublisher[streamId].restartTimer);
                    self.audioPublisher[streamId].reattachTimer = null;
                  }
                  self.reportStats(self.audioPublisher[streamId], null, 'audio', CB);
                }

                self.audioPublisher[streamId].mediaStatus = messages.on;

                if (self.audioPublisher[streamId].stream && self.audioPublisher[streamId].hasAudio == false) {
                  var audioTracks = self.audioPublisher[streamId].stream.getAudioTracks();

                  if (audioTracks) {
                    audioTracks.forEach(function (audioTrack) {
                      audioTrack.enabled = false;
                    });
                  }
                }

                error = null;
                messages = {
                  type: 'onMediaState',
                  on: self.audioPublisher[streamId].mediaStatus
                }
              }
            }
          }

          if (typeof CB == 'function') {
            CB(error, messages);
          }
        }

        if (!ImpartusVC.sessionObj.vcJanusSession.sessionHandle) {
          Logger.info('Session Handle is not there while attaching as a audio publisher video room');
          return;
        }

        ImpartusVC.sessionObj.vcJanusSession.sessionHandle.attach({
          plugin: 'janus.plugin.videoroom',
          success: function (pluginHandle) {
            self.audioPublisher[streamId].vcConnectionHandle = pluginHandle;
            ImpartusVC.sessionObj.vcServerManager.logPublisherHandleInfo(streamId,
              pluginHandle.getId(), ImpartusVC.sessionObj.vcJanusSession.sessionHandle.getSessionId());
            pluginHandle.send({
              message: {
                request: 'join',
                room: ImpartusVC.sessionObj.vcSessionService.roomId,
                ptype: 'publisher',
                pin: ImpartusVC.sessionObj.vcSessionService.roomPin,
                display: JSON.stringify({
                  resolution: 'audio-only-stream',
                  stream: self.audioPublisher[streamId].streamObj,
                  joinTime: Date.now()
                })
              }
            });
          },
          error: function (error) {
            callback(error);
          },
          consentDialog: function (on) {
            callback(null, {
              type: 'consentDialog',
              on: on
            });
          },
          mediaState: function (medium, on) {
            callback(null, {
              type: 'mediaState',
              medium: medium,
              on: on
            });
          },
          webrtcState: function (on) {
            callback(null, {
              type: 'webrtcState',
              on: on
            });
          },
          onmessage: function (message, jsep) {
            if (message && message.videoroom) {
              if ('joined' === message.videoroom) {
                self.audioPublisher[streamId].publisherId = message.id;
                if (message.publishers) {
                  callback(null, {
                    type: 'publisher-update',
                    list: true,
                    publishers: message.publishers
                  });
                }

                callback(null, {
                  type: 'joined'
                });

              } else if ('destroyed' === message.videoroom) {
                callback(null, {
                  type: 'destroyed'
                });
              } else if (message.videoroom === 'slow_link') {
                callback(null, {
                  type: 'slowLink'
                });
              } else if ('event' === message.videoroom) {
                if (message.publishers) {
                  callback(null, {
                    type: 'publisher-update',
                    list: false,
                    publishers: message.publishers
                  });
                } else if (message.leaving) {
                  callback(null, {
                    type: 'unpublished',
                    unpublished: message.leaving
                  });
                } else if (message.unpublished) {
                  callback(null, {
                    type: 'unpublished',
                    unpublished: message.unpublished
                  });
                } else if (message.error) {
                  callback(message.error);
                }
              }
            } else {
              callback(null, {
                type: 'unknown',
                message: message
              });
            }

            if (jsep && self.audioPublisher[streamId].vcConnectionHandle) {
              self.audioPublisher[streamId].vcConnectionHandle.handleRemoteJsep({
                jsep: jsep
              });
            }
          },
          onlocalstream: function (stream) {
            callback(null, {
              type: 'onlocalstream',
              stream: stream
            });
          },
          onremotestream: function (stream) {
            callback(null, {
              type: 'onremotestream',
              stream: stream
            });
          },
          ondetached: function () {
            callback(null, {
              type: 'ondetached'
            });
          },
          oncleanup: function () {
            callback(null, {
              type: 'oncleanup'
            });
          }
        });
      }

      function getAudioStream(streamId, audioSource, options, CB) {
        function callback(error, messages) {
          if (error) {
            Logger.info('Error occurred while getting stream from microphone: ', error);
          } else {
            Logger.info('Message while getting stream from microphone: ', messages);

            if (messages && messages.stream) {
              self.audioPublisher[streamId].stream = messages.stream;
              messages.stream.getAudioTracks().forEach(function (t) {
                t.enabled = !!options.publishAudio;
              });
            }
          }

          if (typeof CB == 'function') {
            CB(error, messages, audioSource);
          }
        }

        var constraints = {
          video: false,
          audio: true
        };

        if (!ImpartusVC.isMobile && audioSource) {
          if (audioSource !== true) {
            constraints.audio = {
              deviceId: {
                exact: audioSource
              }
            }
          }
        }

        Logger.info('[Info] Getting audio with these constraints: ', JSON.stringify(constraints));
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          callback(null, {
            type: 'getUserMedia',
            stream: stream
          });
        }, function (error) {
          callback(error);
        });
      }

      function getWebcamStream(streamId, videoSource, audioSource, resolution, options, CB) {

        var multiplier = 1 + ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolution];

        setTimeout(function () {

          if (!videoSource) {
            Logger.warn('webcam stream called without a videoSource');

            if (typeof CB == 'function') {
              CB('webcam stream called without a videoSource');
            }

            return;
          }

          function callback(error, messages) {
            if (error) {
              Logger.info('Error occurred while getting stream from webcam: ', error);
            } else {
              Logger.info('Message while getting stream from webcam: ', messages);

              if (messages && messages.stream) {
                self.deviceStreams[streamId].resolutions[resolution].stream = messages.stream;

                messages.stream.getVideoTracks().forEach(function (t) {
                  t.enabled = !!options.publishVideo;
                });

                try {
                  Logger.info('Resolution, Stream, Info: ', resolution, messages.stream.id, messages.stream.getVideoTracks()[0].getSettings());
                } catch (e) {

                }
              }
            }

            if (typeof CB == 'function') {
              CB(error, messages, streamId, videoSource, resolution);
            }
          }

          var constraints = {
            video: false,
            audio: false
          };

          if (ImpartusVC.browserDetails.browser === 'chrome' || ImpartusVC.browserDetails.browser === 'edge') {
            constraints.video = {
              deviceId: {
                exact: videoSource
              },
              width: {
                ideal: self.deviceStreams[streamId].resolutions[resolution].width
              },
              height: {
                ideal: self.deviceStreams[streamId].resolutions[resolution].height
              }
            };
          } else {
            constraints.video = {
              deviceId: {
                exact: videoSource
              },
              video: {
                width: self.deviceStreams[streamId].resolutions[resolution].width
              }
            };
          }

          if (ImpartusVC.isMobile && (options.facingMode == 'user' || options.facingMode == 'environment')) {
            constraints.video = {
              facingMode: {
                exact: options.facingMode
              }
            };
          }

          if (ImpartusVC.isMobile) {
            delete constraints.video.width;
            delete constraints.video.height;
            delete constraints.video.frameRate;
          }

          Logger.info('[Info] Getting Stream with these constraints: ', JSON.stringify(constraints));
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            callback(null, {
              type: 'getUserMedia',
              stream: stream
            });
          }, function (error) {
            callback(error);
          });
        }, 300 * multiplier);
      }

      function getDesktopStream(streamId, resolution, CB) {

        function callback(error, messages) {
          if (error) {
            Logger.info('Error occurred while getting stream from desktop: ', error);
          } else {
            Logger.info('Message while getting stream from desktop: ', messages);

            if (messages && messages.stream) {
              self.deviceStreams[streamId].resolutions[resolution].stream = messages.stream;
            }
          }

          CB(error, messages, streamId, 'screen', resolution);
        }

        var impartusError;
        if (ImpartusVC.browserDetails.browser === 'chrome' && !navigator.mediaDevices.getDisplayMedia) {
          if (!ImpartusVC.extensionRegistered) {
            impartusError = true;
          } else {
            if (!ImpartusVC.extensionInstalled) {
              impartusError = true;
            }
          }
        } else {
          if (!ImpartusVC.screenShareSupported) {
            impartusError = true;
          }
        }

        if (impartusError) {
          callback('Unknown Error');
          return;
        }

        if (resolution == ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[1]) {
          var captureStream1;
          try {
            captureStream1 = self.desktopCanvas1.captureStream(5);
          } catch (error) {
            callback(error);
          }

          if (captureStream1) {
            self.deviceStreams[streamId].resolutions[resolution].canvasStream = true;
            callback(null, {
              type: 'getUserMedia',
              stream: captureStream1
            });
          }
        } else {
          var captureStream2;
          if (resolution == ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[2]) {
            try {
              captureStream2 = self.desktopCanvas2.captureStream(5);
            } catch (e) {

            }
          }

          if (captureStream2) {
            self.deviceStreams[streamId].resolutions[resolution].canvasStream = true;
            callback(null, {
              type: 'getUserMedia',
              stream: captureStream2
            });
          } else {
            var constraints = {
              video: {
                width: self.deviceStreams[streamId].resolutions[resolution].width,
                frameRate: self.deviceStreams[streamId].resolutions[resolution].framesPerSecond
              },
              audio: false
            };

            Logger.info('[Info] Getting Screen Stream with these constraints: ', JSON.stringify(constraints));

            navigator.mediaDevices.getDisplayMedia(constraints).then(function (stream) {
              callback(null, {
                type: 'getUserMedia',
                stream: stream
              });

            }, function (error) {
              callback(error);
            });
          }
        }
      }

      function connectStream(streamId, resolution, CB) {

        function callback(error, messages) {
          if (error) {
            Logger.info('Error occurred while connecting stream: ', error);
          } else {
            Logger.info('Message while connecting stream: ', messages);

            if (messages.type == 'connected') {
              self.deviceStreams[streamId].resolutions[resolution].connected = true;

              self.initABR(streamId, resolution);

              if (!self.deviceStreams[streamId].streamCreated) {

                self.deviceStreams[streamId].dispatchEvent(new EventFactory.StreamEvent(EventMap.STREAM_CREATED, self.deviceStreams[streamId].stream));

                self.deviceStreams[streamId].streamCreated = true;

                Logger.info('Stream created fired from connect');
              }

              self.deviceStreams[streamId].resolutions[resolution].stream.getTracks().forEach(function (track) {
                track.addEventListener('ended', function () {
                  if (self.deviceStreams[streamId].videoSource == 'screen') {
                    self.stopRestarting(streamId);
                    self.unpublishAndDetach(streamId);
                  } else {
                    self.stopRestarting(streamId, resolution);
                    self.unpublishStream(streamId, resolution);
                  }
                });
              });
            }
          }

          if (CB) {
            messages = messages || {};
            messages.streamId = streamId;
            messages.resolution = resolution;
            CB(error, messages);
          }
        }

        if (self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle) {
          self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle.createOffer({
            stream: self.deviceStreams[streamId].resolutions[resolution].stream,
            media: {
              audioRecv: false,
              videoRecv: false,
              audioSend: false,
              videoSend: self.deviceStreams[streamId].stream.hasVideo,
              video: resolution
            },
            success: function (jsep) {
              let userInfo = cleanUpFileName(ImpartusVC.sessionObj.connection.data);
              let sname = cleanUpFileName(self.deviceStreams[streamId].stream.name);

              if (self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle) {
                self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle.send({
                  message: {
                    request: 'configure',
                    audio: false,
                    video: !!self.deviceStreams[streamId].options.videoSource,
                    record: true,
                    bitrate: self.deviceStreams[streamId].resolutions[resolution].bitrate.low,
                    filename: ImpartusVC.sessionObj.vcSessionService.roomId + '_' + streamId + '_' + userInfo + '_' + sname + '_' + resolution + '_' + Date.now()
                  },
                  jsep: jsep
                });
                self.deviceStreams[streamId].resolutions[resolution].bitrate.current = self.deviceStreams[streamId].resolutions[resolution].bitrate.low;
              }

              callback(null, {
                type: 'connected'
              });
            },
            error: function (error) {
              callback(error);
            }
          });
        }
      }

      function cleanUpFileName(str) {
        var out;
        try {
          out = str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        } catch (e) {
          out = Math.round(Math.random() * 10000);
        }
        return out;
      }

      function connectAudioStream(streamId, CB) {
        function callback(error, messages) {
          if (error) {
            Logger.info('Error occurred while connecting audio stream: ', error);
          } else {
            Logger.info('Message while connecting audio stream: ', messages);

            if (messages.type == 'connected') {
              self.audioPublisher[streamId].connected = true;

              if (!self.deviceStreams[streamId].streamCreated && !self.deviceStreams[streamId].videoSource) {

                self.deviceStreams[streamId].dispatchEvent(new EventFactory.StreamEvent(EventMap.STREAM_CREATED, self.deviceStreams[streamId].stream));

                self.deviceStreams[streamId].streamCreated = true;

                Logger.info('Stream created fired from connect for audio-only');
              }



              self.audioPublisher[streamId].stream.getTracks().forEach(function (track) {
                track.addEventListener('ended', function () {

                  self.stopRestarting(streamId, 'audio-only');
                  self.unpublishAudioStream(streamId, false);


                });
              });
            }
          }

          if (CB) {
            messages = messages || {};
            CB(error, messages);
          }
        }

        if (self.audioPublisher[streamId].vcConnectionHandle) {
          self.audioPublisher[streamId].vcConnectionHandle.createOffer({
            stream: self.audioPublisher[streamId].stream,
            media: {
              audioRecv: false,
              videoRecv: false,
              audioSend: true,
              videoSend: false,
            },
            success: function (jsep) {
              let userInfo = cleanUpFileName(ImpartusVC.sessionObj.connection.data);
              let sname = cleanUpFileName(self.audioPublisher[streamId].stream.name);

              if (self.audioPublisher[streamId].vcConnectionHandle) {
                self.audioPublisher[streamId].vcConnectionHandle.send({
                  message: {
                    request: 'configure',
                    audio: true,
                    video: false,
                    record: true,
                    filename: ImpartusVC.sessionObj.vcSessionService.roomId + '_' + streamId + '_' + userInfo + '_' + sname + '_' + Date.now()
                  },
                  jsep: jsep
                });
              }

              callback(null, {
                type: 'connected'
              });
            },
            error: function (error) {
              callback(error);
            }
          });
        }
      }

      self.copyStreamToCanvas = function (stream) {
        try {
          var track = stream.getVideoTracks()[0];

          var settings = track.getSettings ? track.getSettings() : {
            aspectRatio: 1.6,
            deviceId: '',
            frameRate: 3,
            height: 800,
            width: 1280
          };

          var imageCapture = new ImageCapture(track);
          self.desktopCanvas1.width = 640;
          self.desktopCanvas1.height = 360;
          self.desktopCanvas2.width = 320;
          self.desktopCanvas2.height = 180;

          if (self.canvasCopyTimer) {
            clearInterval(self.canvasCopyTimer);
            self.canvasCopyTimer = null;
          }
          self.canvasCopyTimer = setInterval(function () {
            if (track.enabled) {
              imageCapture.grabFrame().then(function (imageBitmap) {
                drawCanvas(self.desktopCanvas1, imageBitmap);
                drawCanvas(self.desktopCanvas2, imageBitmap);
                imageBitmap.close();
              }, function (error) {
                Logger.warn('grabFrame Error: ', error);
              }).catch(function (error) {
                Logger.warn('grabFrame Error: ', error);
              });
            }
          }, 1000 / settings.frameRate);

          track.addEventListener('ended', function () {
            Logger.info('Canvas interval cleared from onended');
            if (self.canvasCopyTimer) {
              clearInterval(self.canvasCopyTimer);
              self.canvasCopyTimer = null;
            }
            imageCapture = null;
          });

        } catch (e) {
          Logger.error('Unable to setup canvas copy, Maybe its an older chrome version', e);
        }
      };

      self.reportStats = function (streamObj, statsElement, mediaType, CB) {


        streamObj.stats = {
          bitrate: 0,
          avgbitrate: 0,
          bsnow: 0,
          tsnow: 0,
          resolution: '0x0',
          nackCount: 0,
          deltaNack: 0,
          packetsSent: 0,
          vidWidth: 0,
          vidHeight: 0,
          frameCount: 0,
          fps: 0,
          rtt: 0
        };

        if (streamObj.statsTimer) {
          clearInterval(streamObj.statsTimer);
          streamObj.statsTimer = null;
        }

        streamObj.statsTimer = setInterval(function () {
          if (streamObj && streamObj.vcConnectionHandle &&
            streamObj.vcConnectionHandle.webrtcStuff &&
            streamObj.vcConnectionHandle.webrtcStuff.pc) {

            streamObj.vcConnectionHandle.webrtcStuff.pc.getStats(null).then(function (stats) {

              if (streamObj && stats) {
                var statsObj = streamObj.stats;
                stats.forEach(function (report) {

                  if (report['currentRoundTripTime']) {
                    statsObj.rtt = report['currentRoundTripTime'];
                    ImpartusVC.sessionObj.updateConnectionStats('rtt', report.currentRoundTripTime);
                  }


                  if (report.availableOutgoingBitrate) {
                    ImpartusVC.sessionObj.updateConnectionStats('ulBwEstimate', report.availableOutgoingBitrate);
                  }

                  if (report['frameWidth']) {
                    statsObj.vidWidth = report['frameWidth'];
                    statsObj.vidHeight = report['frameHeight'];
                    statsObj.resolution = statsObj.vidWidth + 'x' + statsObj.vidHeight;
                  }
                  if (report['framesEncoded']) {
                    statsObj.fps = 1000 * (report.framesEncoded - statsObj.frameCount) / (Date.now() - statsObj.tsnow);
                    statsObj.frameCount = report.framesEncoded;
                  }

                  if (((mediaType != 'audio' && (report.mediaType === 'video' || report.id.toLowerCase().indexOf('video') > -1)) ||
                    (mediaType == 'audio' && (report.mediaType === 'audio' || report.id.toLowerCase().indexOf('audio') > -1))) &&
                    report.type === 'outbound-rtp' && report.id.indexOf('rtcp') < 0) {

                    statsObj.bitrate = 8 * (report.bytesSent - statsObj.bsnow) / (Date.now() - statsObj.tsnow);

                    var newDeltaNack = Math.round((report.nackCount - statsObj.nackCount) * 1000 / (Date.now() - statsObj.tsnow));
                    if (newDeltaNack > 2) {
                      streamObj.slowLinkCount++;
                    }



                    statsObj.deltaNack = newDeltaNack;
                    statsObj.nackCount = report.nackCount;
                    statsObj.packetsSent = report.packetsSent;

                    statsObj.bsnow = report.bytesSent;
                    statsObj.tsnow = Date.now();
                    statsObj.avgbitrate = statsObj.avgbitrate * 0.9 + statsObj.bitrate * 0.1;
                  }
                });
                if (statsElement && streamObj.resolution && streamObj.bitrate && streamObj.bitrate.current) {
                  var statRe = new RegExp(streamObj.resolution + ':[^;]*;');
                  var statRep = streamObj.resolution + ': ' + statsObj.resolution + '@' + Math.round(statsObj.bitrate) + '(' + Math.round(streamObj.bitrate.current / 1000) + '); ';
                  if (statRe.test(statsElement.innerHTML)) {
                    statsElement.innerHTML = statsElement.innerHTML.replace(statRe, statRep);
                  } else {
                    statsElement.innerHTML += statRep;
                  }
                }
              }
            })
          }
        }, 250);
      };

      self.stopReportingStats = function (streamObj) {
        if (streamObj.statsTimer) {
          clearInterval(streamObj.statsTimer);
          streamObj.statsTimer = null;
        }
      };

      self.initABR = function (streamId, resolution) {
        var streamObj = self.deviceStreams[streamId].resolutions[resolution];

        if (streamObj.abrTimer) {
          clearInterval(streamObj.abrTimer);
          streamObj.abrTimer = null;
        }
        streamObj.abrIntervalCount = 0;
        streamObj.abrIdleIntervalLimit = 4;
        streamObj.abrLastIdleIntervalLimit = 4;
        var delta_bw = 0;

        streamObj.abrTimer = setInterval(function () {
          var abrRequired = false;
          var abrRatio = ImpartusVC.sessionObj.vcResolutionManager.abrRatio;
          streamObj.abrIntervalCount++;

          var totalSlowLink = 0;
          var totalBW = 0;
          if (self.deviceStreams[streamId] && self.deviceStreams[streamId].resolutions) {
            for (var res in self.deviceStreams[streamId].resolutions) {
              if (self.deviceStreams[streamId].resolutions[res] && self.deviceStreams[streamId].resolutions[res].vcConnectionHandle && self.deviceStreams[streamId].resolutions[res].slowLinkCount) {
                totalSlowLink += self.deviceStreams[streamId].resolutions[res].slowLinkCount;
              }
              if (self.deviceStreams[streamId].resolutions[res] && self.deviceStreams[streamId].resolutions[res].vcConnectionHandle) {
                totalBW += self.deviceStreams[streamId].resolutions[res].bitrate.current;
              }
            }
          }

          var ss;
          self.usedBW = 0;
          for (var str in self.deviceStreams) {
            for (var res in self.deviceStreams[str].resolutions) {
              ss = self.deviceStreams[str].resolutions[res];
              if (ss && ss.vcConnectionHandle && ss.stats && ss.stats.avgbitrate) {
                self.usedBW = self.usedBW + ss.stats.avgbitrate;
              }
            }
          }


          if (streamObj.stats && streamObj.stats.resolution) {
            Logger.debug('res, sl, tot_sl, br, ic, idle, nc, dn,ab,ub :',
              streamObj.stats.resolution, streamObj.slowLinkCount, totalSlowLink, streamObj.stats.bitrate, streamObj.abrIntervalCount, streamObj.abrIdleIntervalLimit, streamObj.stats.nackCount, streamObj.stats.deltaNack, self.availableBW, self.usedBW);
          }
          if (totalSlowLink > 2) {
            self.availableBW = self.availableBW * 0.3 + self.usedBW * 0.7;
            abrRequired = true;
            abrRatio = ImpartusVC.sessionObj.vcResolutionManager.abrDownRatio;
            streamObj.abrIntervalCount = 0;

            if (streamObj.isBitrateUpInLastChange) {
              streamObj.abrIdleIntervalLimit = Math.min(Math.round(streamObj.abrLastIdleIntervalLimit * 1.5), ImpartusVC.sessionObj.vcResolutionManager.abrMaxIdleIntervalLimit);
            } else {
              streamObj.abrIdleIntervalLimit = 4;
            }

          } else if (streamObj.abrIntervalCount >= streamObj.abrIdleIntervalLimit) {

            self.availableBW = self.availableBW * 0.98;
            abrRatio = Math.min(1.2, (1 + 0.1 / Math.log10(1.01 + self.usedBW / 30)));
            if (isNaN(abrRatio)) {
              abrRatio = 1.02;
            }
            if (totalSlowLink == 0) {
              abrRequired = true;
            }

            streamObj.abrIntervalCount = 0;
            streamObj.abrLastIdleIntervalLimit = streamObj.abrIdleIntervalLimit;
            streamObj.abrIdleIntervalLimit = Math.min(streamObj.abrLastIdleIntervalLimit * 1.1, ImpartusVC.sessionObj.vcResolutionManager.abrMaxIdleIntervalLimit);
          } else {
            self.availableBW = self.availableBW * 1.01;
          }

          if (abrRequired) {
            var newBitRate = parseInt(streamObj.bitrate.current * abrRatio);
            newBitRate = Math.max(streamObj.bitrate.low, newBitRate);
            newBitRate = Math.min(streamObj.bitrate.high, newBitRate);

            var threshold = ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolution] * 2 + 3;

            if (self.deviceStreams[streamId].videoSource == 'screen') {
              if (abrRatio > 1) {
                streamObj.setHighCount += 1;
                streamObj.setLowCount = Math.max(0, streamObj.setLowCount - 1);
              } else {
                streamObj.setLowCount += 1;
                streamObj.setHighCount = Math.max(0, streamObj.setHighCount - 1);
              }
            } else {
              if (newBitRate <= (1.2 * streamObj.bitrate.low)) {
                streamObj.setLowCount < threshold ? streamObj.setLowCount += 1 : '';
                streamObj.setHighCount = 0;
              } else if (newBitRate >= 0.8 * streamObj.bitrate.high) {
                streamObj.setLowCount = 0;
                streamObj.setHighCount < threshold ? streamObj.setHighCount += 1 : '';
              } else {
                streamObj.setLowCount = 0;
                streamObj.setHighCount = 0;
              }
            }

            if (streamObj.setLowCount >= threshold) {
              if (canTurnOffResolution(streamId, resolution)) {
                self.unpublishStream(streamId, resolution, true);
                Logger.info('Bad Network Bitrate effect Unpublishing resolution: ', streamId, resolution);
              }
              streamObj.setLowCount = 0;
            } else if (streamObj.setHighCount >= threshold) {
              var levelUp = ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolution] - 1;
              var levelUpResolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[levelUp];
              if (self.deviceStreams[streamId].resolutions[levelUpResolution] && !self.deviceStreams[streamId].resolutions[levelUpResolution].vcConnectionHandle) {
                self.deviceStreams[streamId].resolutions[levelUpResolution].setLowCount = 0;
                self.attachAndPublishResolution(streamId, levelUpResolution);
                newBitRate = streamObj.bitrate.low;
                switchAllStreamsToLowBW(streamId);
                Logger.info('Good Network Again Publishing resolution: ', streamId, levelUpResolution);
              }
            }

            if (streamObj.bitrate.current !== newBitRate) {
              Logger.debug('Changing bitrate: streamId, resolution, old, new: ', streamId, resolution, streamObj.bitrate.current, newBitRate);
              streamObj.bitrate.current = newBitRate;

              if (streamObj.vcConnectionHandle) {
                streamObj.vcConnectionHandle.send({
                  message: {
                    request: 'configure',
                    bitrate: newBitRate
                  }
                });
              }
            }
          }

          if (abrRatio > 1) {
            streamObj.isBitrateUpInLastChange = true;
          } else {
            streamObj.isBitrateUpInLastChange = false;
          }

          streamObj.slowLinkCount = 0;
        }, 2 * 1000);
      };

      self.stopABR = function (streamId) {
        for (var resolutionKey in self.deviceStreams[streamId].resolutions) {
          if (ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 0 || ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 1 || ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 2) {
            if (self.deviceStreams[streamId].resolutions[resolutionKey].abrTimer) {
              clearInterval(self.deviceStreams[streamId].resolutions[resolutionKey].abrTimer);
              self.deviceStreams[streamId].resolutions[resolutionKey].abrTimer = null;
            }
          }
        }
      };

      function canTurnOffResolution(streamId, resolution) {
        var levelUp = ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolution] - 1;
        var levelUpResolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[levelUp];
        var levelDownResolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[levelUp + 2];
        var level2DownResolution = ImpartusVC.sessionObj.vcResolutionManager.qualityReverseMap[levelUp + 3];

        var canTurnOff = false;


        if ((levelDownResolution &&
          self.deviceStreams[streamId].resolutions[levelDownResolution] &&
          self.deviceStreams[streamId].resolutions[levelDownResolution].vcConnectionHandle) ||
          (level2DownResolution &&
            self.deviceStreams[streamId].resolutions[level2DownResolution] &&
            self.deviceStreams[streamId].resolutions[level2DownResolution].vcConnectionHandle)
        ) {
          canTurnOff = true;
        }

        if (levelUpResolution && self.deviceStreams[streamId].resolutions[levelUpResolution] && self.deviceStreams[streamId].resolutions[levelUpResolution].vcConnectionHandle) {
          canTurnOff = false;
        }

        return canTurnOff;
      }

      function switchAllStreamsToLowBW(streamId) {

        var streamObj;
        for (var res in self.deviceStreams[streamId].resolutions) {
          streamObj = self.deviceStreams[streamId].resolutions[res];
          if (streamObj && streamObj.vcConnectionHandle) {
            streamObj.vcConnectionHandle.send({
              message: {
                request: 'configure',
                bitrate: streamObj.bitrate.low
              }
            });
            streamObj.bitrate.current = streamObj.bitrate.low;
          }
        }
      }

      self.initPublisher = function (div, options, CB) {
        options = Object.assign({
          width: '100%',
          height: '100%',
          audioFallbackEnabled: true,
          fitMode: 'cover',
          frameRate: 30,
          insertMode: 'append',
          audioBitrate: 48000,
          name: '',
          publishAudio: true,
          publishVideo: true,
          ratio: '16:9',
          maxWidth: 720,
          minWidth: 0,
          resolution: '640x480',
          showControls: false,
          videoAttributes: {
            id: '',
            classList: ''
          },
          style: {
            audioLevelDisplayMode: 'off',
            backgroundImageURI: 'off',
            nameDisplayMode: 'off',
            buttonDisplayMode: 'off'
          }
        }, options || {});

        var streamId = ImpartusVC.guid();
        var videoSource = options.videoSource;
        var audioSource = options.audioSource;

        if (videoSource == 'application' || videoSource == 'window') {
          videoSource = 'screen';
          audioSource = null;
        }

        if (!videoSource) {
          Logger.info('Audio only call');
          options.publishVideo = false;
        }

        self.deviceStreams[streamId] = new Publisher(streamId, videoSource, audioSource, options, CB);

        if (videoSource == 'screen') {
          options.publishAudio = false;
          var impartusError;
          if (ImpartusVC.browserDetails.browser === 'chrome' && !navigator.mediaDevices.getDisplayMedia) {
            if (!ImpartusVC.extensionRegistered) {
              impartusError = ErrorFactory(ErrorMap.SCREEN_SHARING_EXTENSION_NOT_REGISTERED, new Error('Screen Sharing support in this browser requires an extension, but ' + 'one has not been registered.'));
            } else {
              if (!ImpartusVC.extensionInstalled) {
                impartusError = ErrorFactory(ErrorMap.SCREEN_SHARING_EXTENSION_NOT_INSTALLED, new Error('Screen Sharing support in this browser requires an extension, but ' + 'the extension is not installed.'));
              }
            }
          } else {
            if (!ImpartusVC.screenShareSupported) {
              impartusError = ErrorFactory(ErrorMap.SCREEN_SHARING_NOT_SUPPORTED, new Error('Screen Sharing is not supported in this browser'));
            }
          }

          if (impartusError) {
            ImpartusVCErrorClass.handleJsException({
              error: impartusError,
              target: ImpartusVC
            });

            CB(impartusError);
            return self.deviceStreams[streamId];
          }
        }

        var container = null, attachingDiv;
        if (div) {
          container = ImpartusVC.getOrCreateContainer(div, options.insertMode);

          attachingDiv = ImpartusVC.createDomVideoElement(container, options.videoSource, true, options.videoAttributes);
          var statsElement = null;
          if (options.showControls) {
            statsElement = ImpartusVC.createStatDisplayElement();
            container.appendChild(statsElement);
          }

          self.deviceStreams[streamId].container = container;
          self.deviceStreams[streamId].statsElement = statsElement;
        }

        function callback(error, messages, streamId, videoSource, resolution) {
          if (error) {
            Logger.error('Error occurred while getting stream from streamId, videoSource, resolution: ' + streamId + '_' + videoSource + '_' + resolution, error);
          } else {
            Logger.info('Message while getting stream from streamId, videoSource, resolution: ' + streamId + '_' + videoSource + '_' + resolution, messages);

            var resolutionKey, tempQuality, highestResStream;

            if (videoSource instanceof MediaStream) {
              highestResStream = videoSource

              if (attachingDiv) {
                Janus.attachMediaStream(attachingDiv, highestResStream);
              }

              messages = messages || {};
              messages.videoSource = videoSource;
              self.deviceStreams[streamId].initPublisherCB(error, messages);
            } else {
              self.deviceStreams[streamId].allStreamsAvailable = true;
              for (resolutionKey in self.deviceStreams[streamId].resolutions) {
                if (!self.deviceStreams[streamId].resolutions[resolutionKey].stream) {
                  self.deviceStreams[streamId].allStreamsAvailable = false;
                }
              }

              if (self.deviceStreams[streamId].allStreamsAvailable) {
                for (resolutionKey in self.deviceStreams[streamId].resolutions) {
                  if (ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 0) {
                    tempQuality = 0;
                    highestResStream = self.deviceStreams[streamId].resolutions[resolutionKey].stream;
                  } else if (ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 1) {
                    if (tempQuality === undefined || ImpartusVC.sessionObj.vcResolutionManager.qualityMap[tempQuality] == 2) {
                      tempQuality = 1;
                      highestResStream = self.deviceStreams[streamId].resolutions[resolutionKey].stream;
                    }
                  } else if (ImpartusVC.sessionObj.vcResolutionManager.qualityMap[resolutionKey] == 2) {
                    if (tempQuality === undefined) {
                      tempQuality = 2;
                      highestResStream = self.deviceStreams[streamId].resolutions[resolutionKey].stream;
                    }
                  }

                  Logger.debug('Streams Available resolution: ', resolutionKey, self.deviceStreams[streamId].resolutions[resolutionKey].stream.id);
                }

                if (attachingDiv) {
                  Janus.attachMediaStream(attachingDiv, highestResStream);
                }

                messages = messages || {};
                messages.videoSource = videoSource;
                self.deviceStreams[streamId].initPublisherCB(error, messages);
              }
            }
          }
        }

        if (videoSource != 'screen') {
          self.audioPublisher[streamId].streamId = streamId;
          getAudioStream(streamId, options.audioSource, options, function (error, messages, audioSource) {

            if (!options.videoSource) {
              messages = messages || {};
              messages.audioSource = audioSource;
              self.deviceStreams[streamId].initPublisherCB(error, messages);
            }
          });
        }

        if (videoSource instanceof MediaStream) {
          for (resolutionKey in self.deviceStreams[streamId].resolutions) {
            self.deviceStreams[streamId].resolutions[resolutionKey].stream = videoSource;
          }
          setTimeout(function () {
            callback(null, undefined, streamId, videoSource);
          }, 100);
        } else {
          if (videoSource == 'screen') {
            for (var resolutionKey in self.deviceStreams[streamId].resolutions) {
              getDesktopStream(streamId, resolutionKey, callback);
            }
          } else {
            if (!!options.videoSource) {
              for (var resolutionKey in self.deviceStreams[streamId].resolutions) {
                getWebcamStream(streamId, options.videoSource, options.audioSource, resolutionKey, options, callback);
              }
            }
          }
        }

        return self.deviceStreams[streamId];
      };

      self.publish = function (publisher, CB) {

        var streamId = publisher.streamId;
        if (self.deviceStreams[streamId].published) {
          Logger.info('Attached already: ', publisher.streamId);
          return;
        }

        self.deviceStreams[streamId].published = true;
        self.deviceStreams[streamId].publishCB = CB;
        publisher.published = true;

        self.attachAndPublish(streamId, CB);
      };

      self.unpublish = function (publisher, saveStream) {
        self.unpublishAndDetach(publisher.streamId, saveStream);
      };

      self.configurePublisher = function (publisher) {

        for (var resolution in publisher.resolutions) {
          if (publisher.resolutions[resolution].vcConnectionHandle) {
            publisher.resolutions[resolution].vcConnectionHandle.send({
              message: {
                request: 'configure',
                display: JSON.stringify({
                  resolution: resolution,
                  stream: publisher.stream
                })
              }
            });
          }
        }
      };

      self.configureAudioPublisher = function (streamId) {

        if (self.audioPublisher[streamId].vcConnectionHandle) {
          self.audioPublisher[streamId].vcConnectionHandle.send({
            message: {
              request: 'configure',
              display: JSON.stringify({
                resolution: 'audio-only-stream',
                stream: self.audioPublisher[streamId].streamObj
              })
            }
          });
        }
      };

      self.stopRestarting = function (streamId, resolution) {

        if (streamId && resolution === 'audio-only' && self.audioPublisher[streamId]) {
          if (self.audioPublisher[streamId].reattachTimer) {
            clearTimeout(self.audioPublisher[streamId].reattachTimer);
            self.audioPublisher[streamId].reattachTimer = null;
          }

          self.audioPublisher[streamId].stopRestarting = true;
          return;
        }

        if (!streamId || !self.deviceStreams[streamId]) {
          return;
        }
        Logger.info('stopRestarting called streamId, resolution: ', streamId, resolution);

        if (resolution) {
          if (self.deviceStreams[streamId].resolutions[resolution].abrTimer) {
            clearInterval(self.deviceStreams[streamId].resolutions[resolution].abrTimer);
            self.deviceStreams[streamId].resolutions[resolution].abrTimer = null;
          }

          if (self.deviceStreams[streamId].resolutions[resolution].restartTimer) {
            clearTimeout(self.deviceStreams[streamId].resolutions[resolution].restartTimer);
            self.deviceStreams[streamId].resolutions[resolution].restartTimer = null;
          }

          if (self.deviceStreams[streamId].resolutions[resolution].reattachTimer) {
            clearTimeout(self.deviceStreams[streamId].resolutions[resolution].reattachTimer);
            self.deviceStreams[streamId].resolutions[resolution].reattachTimer = null;
          }

          self.stopReportingStats(self.deviceStreams[streamId].resolutions[resolution]);

          self.deviceStreams[streamId].resolutions[resolution].stopRestarting = true;
        } else {
          for (resolution in self.deviceStreams[streamId].resolutions) {
            if (self.deviceStreams[streamId].resolutions[resolution].abrTimer) {
              clearInterval(self.deviceStreams[streamId].resolutions[resolution].abrTimer);
              self.deviceStreams[streamId].resolutions[resolution].abrTimer = null;
            }

            if (self.deviceStreams[streamId].resolutions[resolution].restartTimer) {
              clearTimeout(self.deviceStreams[streamId].resolutions[resolution].restartTimer);
              self.deviceStreams[streamId].resolutions[resolution].restartTimer = null;
            }

            if (self.deviceStreams[streamId].resolutions[resolution].reattachTimer) {
              clearTimeout(self.deviceStreams[streamId].resolutions[resolution].reattachTimer);
              self.deviceStreams[streamId].resolutions[resolution].reattachTimer = null;
            }

            self.stopReportingStats(self.deviceStreams[streamId].resolutions[resolution]);

            self.deviceStreams[streamId].resolutions[resolution].stopRestarting = true;

          }

          if (self.audioPublisher[streamId].reattachTimer) {
            clearTimeout(self.audioPublisher[streamId].reattachTimer);
            self.audioPublisher[streamId].reattachTimer = null;
          }

          self.audioPublisher[streamId].stopRestarting = true;
        }

      };

      self.unpublishStream = function (streamId, resolution, saveStream) {
        if (!streamId || !self.deviceStreams[streamId]) {
          return;
        }
        Logger.info('unpublishStream called streamId, resolution: ', streamId, resolution);

        if (self.deviceStreams[streamId].resolutions[resolution].abrTimer) {
          clearInterval(self.deviceStreams[streamId].resolutions[resolution].abrTimer);
          self.deviceStreams[streamId].resolutions[resolution].abrTimer = null;
        }

        if (self.deviceStreams[streamId].resolutions[resolution].restartTimer) {
          clearTimeout(self.deviceStreams[streamId].resolutions[resolution].restartTimer);
          self.deviceStreams[streamId].resolutions[resolution].restartTimer = null;
        }

        if (self.deviceStreams[streamId].resolutions[resolution].reattachTimer) {
          clearTimeout(self.deviceStreams[streamId].resolutions[resolution].reattachTimer);
          self.deviceStreams[streamId].resolutions[resolution].reattachTimer = null;
        }

        self.stopReportingStats(self.deviceStreams[streamId].resolutions[resolution]);

        if (!saveStream) {
          if (!!self.deviceStreams[streamId].resolutions[resolution].stream) {
            self.deviceStreams[streamId].resolutions[resolution].stream.getTracks().forEach(function (track) {
              track.stop();
            });
            self.deviceStreams[streamId].resolutions[resolution].stream = null;
          }
        }

        if (self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle) {
          self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle.send({
            message: {
              request: 'leave'
            }
          });
        }

        if (self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle) {
          self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle.detach();
          self.deviceStreams[streamId].resolutions[resolution].vcConnectionHandle = null;
        }
      };

      self.unpublishAudioStream = function (streamId, saveStream) {

        if (self.audioPublisher[streamId].restartTimer) {
          clearTimeout(self.audioPublisher[streamId].restartTimer);
          self.audioPublisher[streamId].restartTimer = null;
        }

        if (self.audioPublisher[streamId].reattachTimer) {
          clearTimeout(self.audioPublisher[streamId].reattachTimer);
          self.audioPublisher[streamId].reattachTimer = null;
        }

        if (!saveStream) {
          if (!!self.audioPublisher[streamId].stream) {
            self.audioPublisher[streamId].stream.getTracks().forEach(function (track) {
              track.stop();
            });
            self.audioPublisher[streamId].stream = null;
          }
        }

        if (self.audioPublisher[streamId].vcConnectionHandle) {
          self.audioPublisher[streamId].vcConnectionHandle.send({
            message: {
              request: 'leave'
            }
          });
        }

        if (self.audioPublisher[streamId].vcConnectionHandle) {
          self.audioPublisher[streamId].vcConnectionHandle.detach();
          self.audioPublisher[streamId].vcConnectionHandle = null;
        }

      };

      self.unpublishAndDetach = function (streamId, saveStream) {

        if (!streamId) {
          Logger.warn('[Error] Unable to remove publisher, streamId is missing');
          return;
        }

        if (!self.deviceStreams[streamId]) {
          Logger.warn('[Error] Stream not yet published? Ignoring');
          return;
        }

        if (self.deviceStreams[streamId].videoSource == 'screen') {
          if (self.canvasCopyTimer) {
            clearInterval(self.canvasCopyTimer);
            self.canvasCopyTimer = null;
          }
        }

        Logger.info('unpublishAndDetach called streamId, saveStream: ', streamId, saveStream);

        for (var resolution in self.deviceStreams[streamId].resolutions) {
          self.unpublishStream(streamId, resolution, saveStream);
        }

        if (self.deviceStreams[streamId].videoSource != 'screen') {
          self.unpublishAudioStream(streamId, saveStream);
        }

        if (self.deviceStreams[streamId].container && !saveStream) {
          self.deviceStreams[streamId].container.parentNode.removeChild(self.deviceStreams[streamId].container);
        }

        if (!self.deviceStreams[streamId].destroyed && !saveStream) {
          self.deviceStreams[streamId].dispatchEvent(new EventFactory.StreamEvent(EventMap.STREAM_DESTROYED, { streamId: self.deviceStreams[streamId] }, 'clientDisconnected', false));
        }
      };

      self.destroy = function () {
        for (var streamId in self.deviceStreams) {
          self.unpublishAndDetach(streamId);
        }
      };

      self.disconnect = function () {
        for (var streamId in self.deviceStreams) {
          self.unpublishAndDetach(streamId, true);
        }
      };

      self.republishPreviousStreams = function () {
        Logger.info('republishPreviousStreams called');
        for (var streamId in self.deviceStreams) {
          self.attachAndPublish(streamId, self.deviceStreams[streamId].publishCB || self.deviceStreams[streamId].initPublisherCB)
        }
      };

      function drawCanvas(canvas, img) {
        var ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
        var x = (canvas.width - img.width * ratio) / 2;
        var y = (canvas.height - img.height * ratio) / 2;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
          x, y, img.width * ratio, img.height * ratio);
      }
    }



    module.exports = new vcStreamsService();

  }, { "../errors/ErrorFactory": 1, "../errors/ErrorMap": 2, "../errors/ImpartusVCErrorClass": 4, "../events/EventFactory": 6, "../events/EventMap": 7, "../events/eventing": 8 }], 18: [function (require, module, exports) {
    'use strict';

    require('./scripts/impartusVC');


  }, { "./scripts/impartusVC": 10 }], 19: [function (require, module, exports) {
    'use strict'

    exports.byteLength = byteLength
    exports.toByteArray = toByteArray
    exports.fromByteArray = fromByteArray

    var lookup = []
    var revLookup = []
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i]
      revLookup[code.charCodeAt(i)] = i
    }

    revLookup['-'.charCodeAt(0)] = 62
    revLookup['_'.charCodeAt(0)] = 63

    function getLens(b64) {
      var len = b64.length

      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4')
      }

      var validLen = b64.indexOf('=')
      if (validLen === -1) validLen = len

      var placeHoldersLen = validLen === len
        ? 0
        : 4 - (validLen % 4)

      return [validLen, placeHoldersLen]
    }

    function byteLength(b64) {
      var lens = getLens(b64)
      var validLen = lens[0]
      var placeHoldersLen = lens[1]
      return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function _byteLength(b64, validLen, placeHoldersLen) {
      return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function toByteArray(b64) {
      var tmp
      var lens = getLens(b64)
      var validLen = lens[0]
      var placeHoldersLen = lens[1]

      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

      var curByte = 0

      var len = placeHoldersLen > 0
        ? validLen - 4
        : validLen

      var i
      for (i = 0; i < len; i += 4) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 18) |
          (revLookup[b64.charCodeAt(i + 1)] << 12) |
          (revLookup[b64.charCodeAt(i + 2)] << 6) |
          revLookup[b64.charCodeAt(i + 3)]
        arr[curByte++] = (tmp >> 16) & 0xFF
        arr[curByte++] = (tmp >> 8) & 0xFF
        arr[curByte++] = tmp & 0xFF
      }

      if (placeHoldersLen === 2) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 2) |
          (revLookup[b64.charCodeAt(i + 1)] >> 4)
        arr[curByte++] = tmp & 0xFF
      }

      if (placeHoldersLen === 1) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 10) |
          (revLookup[b64.charCodeAt(i + 1)] << 4) |
          (revLookup[b64.charCodeAt(i + 2)] >> 2)
        arr[curByte++] = (tmp >> 8) & 0xFF
        arr[curByte++] = tmp & 0xFF
      }

      return arr
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] +
        lookup[num >> 12 & 0x3F] +
        lookup[num >> 6 & 0x3F] +
        lookup[num & 0x3F]
    }

    function encodeChunk(uint8, start, end) {
      var tmp
      var output = []
      for (var i = start; i < end; i += 3) {
        tmp =
          ((uint8[i] << 16) & 0xFF0000) +
          ((uint8[i + 1] << 8) & 0xFF00) +
          (uint8[i + 2] & 0xFF)
        output.push(tripletToBase64(tmp))
      }
      return output.join('')
    }

    function fromByteArray(uint8) {
      var tmp
      var len = uint8.length
      var extraBytes = len % 3
      var parts = []
      var maxChunkLength = 16383

      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(
          uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
        ))
      }

      if (extraBytes === 1) {
        tmp = uint8[len - 1]
        parts.push(
          lookup[tmp >> 2] +
          lookup[(tmp << 4) & 0x3F] +
          '=='
        )
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1]
        parts.push(
          lookup[tmp >> 10] +
          lookup[(tmp >> 4) & 0x3F] +
          lookup[(tmp << 2) & 0x3F] +
          '='
        )
      }

      return parts.join('')
    }

  }, {}], 20: [function (require, module, exports) {
    (function (Buffer) {

      'use strict'

      var base64 = require('base64-js')
      var ieee754 = require('ieee754')
      var customInspectSymbol =
        (typeof Symbol === 'function' && typeof Symbol.for === 'function')
          ? Symbol.for('nodejs.util.inspect.custom')
          : null

      exports.Buffer = Buffer
      exports.SlowBuffer = SlowBuffer
      exports.INSPECT_MAX_BYTES = 50

      var K_MAX_LENGTH = 0x7fffffff
      exports.kMaxLength = K_MAX_LENGTH

      Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

      if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
        typeof console.error === 'function') {
        console.error(
          'This browser lacks typed array (Uint8Array) support which is required by ' +
          '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
        )
      }

      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1)
          var proto = { foo: function () { return 42 } }
          Object.setPrototypeOf(proto, Uint8Array.prototype)
          Object.setPrototypeOf(arr, proto)
          return arr.foo() === 42
        } catch (e) {
          return false
        }
      }

      Object.defineProperty(Buffer.prototype, 'parent', {
        enumerable: true,
        get: function () {
          if (!Buffer.isBuffer(this)) return undefined
          return this.buffer
        }
      })

      Object.defineProperty(Buffer.prototype, 'offset', {
        enumerable: true,
        get: function () {
          if (!Buffer.isBuffer(this)) return undefined
          return this.byteOffset
        }
      })

      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"')
        }
        var buf = new Uint8Array(length)
        Object.setPrototypeOf(buf, Buffer.prototype)
        return buf
      }


      function Buffer(arg, encodingOrOffset, length) {
        if (typeof arg === 'number') {
          if (typeof encodingOrOffset === 'string') {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            )
          }
          return allocUnsafe(arg)
        }
        return from(arg, encodingOrOffset, length)
      }

      if (typeof Symbol !== 'undefined' && Symbol.species != null &&
        Buffer[Symbol.species] === Buffer) {
        Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true,
          enumerable: false,
          writable: false
        })
      }

      Buffer.poolSize = 8192

      function from(value, encodingOrOffset, length) {
        if (typeof value === 'string') {
          return fromString(value, encodingOrOffset)
        }

        if (ArrayBuffer.isView(value)) {
          return fromArrayLike(value)
        }

        if (value == null) {
          throw new TypeError(
            'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
            'or Array-like Object. Received type ' + (typeof value)
          )
        }

        if (isInstance(value, ArrayBuffer) ||
          (value && isInstance(value.buffer, ArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length)
        }

        if (typeof value === 'number') {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          )
        }

        var valueOf = value.valueOf && value.valueOf()
        if (valueOf != null && valueOf !== value) {
          return Buffer.from(valueOf, encodingOrOffset, length)
        }

        var b = fromObject(value)
        if (b) return b

        if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
          typeof value[Symbol.toPrimitive] === 'function') {
          return Buffer.from(
            value[Symbol.toPrimitive]('string'), encodingOrOffset, length
          )
        }

        throw new TypeError(
          'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
          'or Array-like Object. Received type ' + (typeof value)
        )
      }

      Buffer.from = function (value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length)
      }

      Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
      Object.setPrototypeOf(Buffer, Uint8Array)

      function assertSize(size) {
        if (typeof size !== 'number') {
          throw new TypeError('"size" argument must be of type number')
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"')
        }
      }

      function alloc(size, fill, encoding) {
        assertSize(size)
        if (size <= 0) {
          return createBuffer(size)
        }
        if (fill !== undefined) {
          return typeof encoding === 'string'
            ? createBuffer(size).fill(fill, encoding)
            : createBuffer(size).fill(fill)
        }
        return createBuffer(size)
      }

      Buffer.alloc = function (size, fill, encoding) {
        return alloc(size, fill, encoding)
      }

      function allocUnsafe(size) {
        assertSize(size)
        return createBuffer(size < 0 ? 0 : checked(size) | 0)
      }

      Buffer.allocUnsafe = function (size) {
        return allocUnsafe(size)
      }
      Buffer.allocUnsafeSlow = function (size) {
        return allocUnsafe(size)
      }

      function fromString(string, encoding) {
        if (typeof encoding !== 'string' || encoding === '') {
          encoding = 'utf8'
        }

        if (!Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding)
        }

        var length = byteLength(string, encoding) | 0
        var buf = createBuffer(length)

        var actual = buf.write(string, encoding)

        if (actual !== length) {
          buf = buf.slice(0, actual)
        }

        return buf
      }

      function fromArrayLike(array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0
        var buf = createBuffer(length)
        for (var i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255
        }
        return buf
      }

      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds')
        }

        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds')
        }

        var buf
        if (byteOffset === undefined && length === undefined) {
          buf = new Uint8Array(array)
        } else if (length === undefined) {
          buf = new Uint8Array(array, byteOffset)
        } else {
          buf = new Uint8Array(array, byteOffset, length)
        }

        Object.setPrototypeOf(buf, Buffer.prototype)

        return buf
      }

      function fromObject(obj) {
        if (Buffer.isBuffer(obj)) {
          var len = checked(obj.length) | 0
          var buf = createBuffer(len)

          if (buf.length === 0) {
            return buf
          }

          obj.copy(buf, 0, 0, len)
          return buf
        }

        if (obj.length !== undefined) {
          if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
            return createBuffer(0)
          }
          return fromArrayLike(obj)
        }

        if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data)
        }
      }

      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
            'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
        }
        return length | 0
      }

      function SlowBuffer(length) {
        if (+length != length) {
          length = 0
        }
        return Buffer.alloc(+length)
      }

      Buffer.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true &&
          b !== Buffer.prototype
      }

      Buffer.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
        if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          )
        }

        if (a === b) return 0

        var x = a.length
        var y = b.length

        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i]
            y = b[i]
            break
          }
        }

        if (x < y) return -1
        if (y < x) return 1
        return 0
      }

      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'latin1':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true
          default:
            return false
        }
      }

      Buffer.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers')
        }

        if (list.length === 0) {
          return Buffer.alloc(0)
        }

        var i
        if (length === undefined) {
          length = 0
          for (i = 0; i < list.length; ++i) {
            length += list[i].length
          }
        }

        var buffer = Buffer.allocUnsafe(length)
        var pos = 0
        for (i = 0; i < list.length; ++i) {
          var buf = list[i]
          if (isInstance(buf, Uint8Array)) {
            buf = Buffer.from(buf)
          }
          if (!Buffer.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers')
          }
          buf.copy(buffer, pos)
          pos += buf.length
        }
        return buffer
      }

      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) {
          return string.length
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength
        }
        if (typeof string !== 'string') {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
            'Received type ' + typeof string
          )
        }

        var len = string.length
        var mustMatch = (arguments.length > 2 && arguments[2] === true)
        if (!mustMatch && len === 0) return 0

        var loweredCase = false
        for (; ;) {
          switch (encoding) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return len
            case 'utf8':
            case 'utf-8':
              return utf8ToBytes(string).length
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return len * 2
            case 'hex':
              return len >>> 1
            case 'base64':
              return base64ToBytes(string).length
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length
              }
              encoding = ('' + encoding).toLowerCase()
              loweredCase = true
          }
        }
      }
      Buffer.byteLength = byteLength

      function slowToString(encoding, start, end) {
        var loweredCase = false


        if (start === undefined || start < 0) {
          start = 0
        }
        if (start > this.length) {
          return ''
        }

        if (end === undefined || end > this.length) {
          end = this.length
        }

        if (end <= 0) {
          return ''
        }

        end >>>= 0
        start >>>= 0

        if (end <= start) {
          return ''
        }

        if (!encoding) encoding = 'utf8'

        while (true) {
          switch (encoding) {
            case 'hex':
              return hexSlice(this, start, end)

            case 'utf8':
            case 'utf-8':
              return utf8Slice(this, start, end)

            case 'ascii':
              return asciiSlice(this, start, end)

            case 'latin1':
            case 'binary':
              return latin1Slice(this, start, end)

            case 'base64':
              return base64Slice(this, start, end)

            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return utf16leSlice(this, start, end)

            default:
              if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
              encoding = (encoding + '').toLowerCase()
              loweredCase = true
          }
        }
      }

      Buffer.prototype._isBuffer = true

      function swap(b, n, m) {
        var i = b[n]
        b[n] = b[m]
        b[m] = i
      }

      Buffer.prototype.swap16 = function swap16() {
        var len = this.length
        if (len % 2 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 16-bits')
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1)
        }
        return this
      }

      Buffer.prototype.swap32 = function swap32() {
        var len = this.length
        if (len % 4 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 32-bits')
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3)
          swap(this, i + 1, i + 2)
        }
        return this
      }

      Buffer.prototype.swap64 = function swap64() {
        var len = this.length
        if (len % 8 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 64-bits')
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7)
          swap(this, i + 1, i + 6)
          swap(this, i + 2, i + 5)
          swap(this, i + 3, i + 4)
        }
        return this
      }

      Buffer.prototype.toString = function toString() {
        var length = this.length
        if (length === 0) return ''
        if (arguments.length === 0) return utf8Slice(this, 0, length)
        return slowToString.apply(this, arguments)
      }

      Buffer.prototype.toLocaleString = Buffer.prototype.toString

      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
        if (this === b) return true
        return Buffer.compare(this, b) === 0
      }

      Buffer.prototype.inspect = function inspect() {
        var str = ''
        var max = exports.INSPECT_MAX_BYTES
        str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
        if (this.length > max) str += ' ... '
        return '<Buffer ' + str + '>'
      }
      if (customInspectSymbol) {
        Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
      }

      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer.from(target, target.offset, target.byteLength)
        }
        if (!Buffer.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. ' +
            'Received type ' + (typeof target)
          )
        }

        if (start === undefined) {
          start = 0
        }
        if (end === undefined) {
          end = target ? target.length : 0
        }
        if (thisStart === undefined) {
          thisStart = 0
        }
        if (thisEnd === undefined) {
          thisEnd = this.length
        }

        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError('out of range index')
        }

        if (thisStart >= thisEnd && start >= end) {
          return 0
        }
        if (thisStart >= thisEnd) {
          return -1
        }
        if (start >= end) {
          return 1
        }

        start >>>= 0
        end >>>= 0
        thisStart >>>= 0
        thisEnd >>>= 0

        if (this === target) return 0

        var x = thisEnd - thisStart
        var y = end - start
        var len = Math.min(x, y)

        var thisCopy = this.slice(thisStart, thisEnd)
        var targetCopy = target.slice(start, end)

        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i]
            y = targetCopy[i]
            break
          }
        }

        if (x < y) return -1
        if (y < x) return 1
        return 0
      }

      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1

        if (typeof byteOffset === 'string') {
          encoding = byteOffset
          byteOffset = 0
        } else if (byteOffset > 0x7fffffff) {
          byteOffset = 0x7fffffff
        } else if (byteOffset < -0x80000000) {
          byteOffset = -0x80000000
        }
        byteOffset = +byteOffset
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : (buffer.length - 1)
        }

        if (byteOffset < 0) byteOffset = buffer.length + byteOffset
        if (byteOffset >= buffer.length) {
          if (dir) return -1
          else byteOffset = buffer.length - 1
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0
          else return -1
        }

        if (typeof val === 'string') {
          val = Buffer.from(val, encoding)
        }

        if (Buffer.isBuffer(val)) {
          if (val.length === 0) {
            return -1
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
        } else if (typeof val === 'number') {
          val = val & 0xFF
          if (typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
        }

        throw new TypeError('val must be string, number or Buffer')
      }

      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1
        var arrLength = arr.length
        var valLength = val.length

        if (encoding !== undefined) {
          encoding = String(encoding).toLowerCase()
          if (encoding === 'ucs2' || encoding === 'ucs-2' ||
            encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) {
              return -1
            }
            indexSize = 2
            arrLength /= 2
            valLength /= 2
            byteOffset /= 2
          }
        }

        function read(buf, i) {
          if (indexSize === 1) {
            return buf[i]
          } else {
            return buf.readUInt16BE(i * indexSize)
          }
        }

        var i
        if (dir) {
          var foundIndex = -1
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
            } else {
              if (foundIndex !== -1) i -= i - foundIndex
              foundIndex = -1
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
          for (i = byteOffset; i >= 0; i--) {
            var found = true
            for (var j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false
                break
              }
            }
            if (found) return i
          }
        }

        return -1
      }

      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1
      }

      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
      }

      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
      }

      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0
        var remaining = buf.length - offset
        if (!length) {
          length = remaining
        } else {
          length = Number(length)
          if (length > remaining) {
            length = remaining
          }
        }

        var strLen = string.length

        if (length > strLen / 2) {
          length = strLen / 2
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16)
          if (numberIsNaN(parsed)) return i
          buf[offset + i] = parsed
        }
        return i
      }

      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
      }

      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length)
      }

      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length)
      }

      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length)
      }

      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
      }

      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (offset === undefined) {
          encoding = 'utf8'
          length = this.length
          offset = 0
        } else if (length === undefined && typeof offset === 'string') {
          encoding = offset
          length = this.length
          offset = 0
        } else if (isFinite(offset)) {
          offset = offset >>> 0
          if (isFinite(length)) {
            length = length >>> 0
            if (encoding === undefined) encoding = 'utf8'
          } else {
            encoding = length
            length = undefined
          }
        } else {
          throw new Error(
            'Buffer.write(string, encoding, offset[, length]) is no longer supported'
          )
        }

        var remaining = this.length - offset
        if (length === undefined || length > remaining) length = remaining

        if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
          throw new RangeError('Attempt to write outside buffer bounds')
        }

        if (!encoding) encoding = 'utf8'

        var loweredCase = false
        for (; ;) {
          switch (encoding) {
            case 'hex':
              return hexWrite(this, string, offset, length)

            case 'utf8':
            case 'utf-8':
              return utf8Write(this, string, offset, length)

            case 'ascii':
              return asciiWrite(this, string, offset, length)

            case 'latin1':
            case 'binary':
              return latin1Write(this, string, offset, length)

            case 'base64':
              return base64Write(this, string, offset, length)

            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return ucs2Write(this, string, offset, length)

            default:
              if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
              encoding = ('' + encoding).toLowerCase()
              loweredCase = true
          }
        }
      }

      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        }
      }

      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf)
        } else {
          return base64.fromByteArray(buf.slice(start, end))
        }
      }

      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end)
        var res = []

        var i = start
        while (i < end) {
          var firstByte = buf[i]
          var codePoint = null
          var bytesPerSequence = (firstByte > 0xEF) ? 4
            : (firstByte > 0xDF) ? 3
              : (firstByte > 0xBF) ? 2
                : 1

          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint

            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 0x80) {
                  codePoint = firstByte
                }
                break
              case 2:
                secondByte = buf[i + 1]
                if ((secondByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
                  if (tempCodePoint > 0x7F) {
                    codePoint = tempCodePoint
                  }
                }
                break
              case 3:
                secondByte = buf[i + 1]
                thirdByte = buf[i + 2]
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
                  if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                    codePoint = tempCodePoint
                  }
                }
                break
              case 4:
                secondByte = buf[i + 1]
                thirdByte = buf[i + 2]
                fourthByte = buf[i + 3]
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
                  if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                    codePoint = tempCodePoint
                  }
                }
            }
          }

          if (codePoint === null) {
            codePoint = 0xFFFD
            bytesPerSequence = 1
          } else if (codePoint > 0xFFFF) {
            codePoint -= 0x10000
            res.push(codePoint >>> 10 & 0x3FF | 0xD800)
            codePoint = 0xDC00 | codePoint & 0x3FF
          }

          res.push(codePoint)
          i += bytesPerSequence
        }

        return decodeCodePointsArray(res)
      }

      var MAX_ARGUMENTS_LENGTH = 0x1000

      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints)
        }

        var res = ''
        var i = 0
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          )
        }
        return res
      }

      function asciiSlice(buf, start, end) {
        var ret = ''
        end = Math.min(buf.length, end)

        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 0x7F)
        }
        return ret
      }

      function latin1Slice(buf, start, end) {
        var ret = ''
        end = Math.min(buf.length, end)

        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i])
        }
        return ret
      }

      function hexSlice(buf, start, end) {
        var len = buf.length

        if (!start || start < 0) start = 0
        if (!end || end < 0 || end > len) end = len

        var out = ''
        for (var i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]]
        }
        return out
      }

      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end)
        var res = ''
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
        }
        return res
      }

      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length
        start = ~~start
        end = end === undefined ? len : ~~end

        if (start < 0) {
          start += len
          if (start < 0) start = 0
        } else if (start > len) {
          start = len
        }

        if (end < 0) {
          end += len
          if (end < 0) end = 0
        } else if (end > len) {
          end = len
        }

        if (end < start) end = start

        var newBuf = this.subarray(start, end)
        Object.setPrototypeOf(newBuf, Buffer.prototype)

        return newBuf
      }

      function checkOffset(offset, ext, length) {
        if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
        if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
      }

      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var val = this[offset]
        var mul = 1
        var i = 0
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul
        }

        return val
      }

      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) {
          checkOffset(offset, byteLength, this.length)
        }

        var val = this[offset + --byteLength]
        var mul = 1
        while (byteLength > 0 && (mul *= 0x100)) {
          val += this[offset + --byteLength] * mul
        }

        return val
      }

      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 1, this.length)
        return this[offset]
      }

      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        return this[offset] | (this[offset + 1] << 8)
      }

      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        return (this[offset] << 8) | this[offset + 1]
      }

      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return ((this[offset]) |
          (this[offset + 1] << 8) |
          (this[offset + 2] << 16)) +
          (this[offset + 3] * 0x1000000)
      }

      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset] * 0x1000000) +
          ((this[offset + 1] << 16) |
            (this[offset + 2] << 8) |
            this[offset + 3])
      }

      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var val = this[offset]
        var mul = 1
        var i = 0
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul
        }
        mul *= 0x80

        if (val >= mul) val -= Math.pow(2, 8 * byteLength)

        return val
      }

      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var i = byteLength
        var mul = 1
        var val = this[offset + --i]
        while (i > 0 && (mul *= 0x100)) {
          val += this[offset + --i] * mul
        }
        mul *= 0x80

        if (val >= mul) val -= Math.pow(2, 8 * byteLength)

        return val
      }

      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 1, this.length)
        if (!(this[offset] & 0x80)) return (this[offset])
        return ((0xff - this[offset] + 1) * -1)
      }

      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        var val = this[offset] | (this[offset + 1] << 8)
        return (val & 0x8000) ? val | 0xFFFF0000 : val
      }

      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        var val = this[offset + 1] | (this[offset] << 8)
        return (val & 0x8000) ? val | 0xFFFF0000 : val
      }

      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset]) |
          (this[offset + 1] << 8) |
          (this[offset + 2] << 16) |
          (this[offset + 3] << 24)
      }

      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset] << 24) |
          (this[offset + 1] << 16) |
          (this[offset + 2] << 8) |
          (this[offset + 3])
      }

      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)
        return ieee754.read(this, offset, true, 23, 4)
      }

      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)
        return ieee754.read(this, offset, false, 23, 4)
      }

      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 8, this.length)
        return ieee754.read(this, offset, true, 52, 8)
      }

      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 8, this.length)
        return ieee754.read(this, offset, false, 52, 8)
      }

      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
        if (offset + ext > buf.length) throw new RangeError('Index out of range')
      }

      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1
          checkInt(this, value, offset, byteLength, maxBytes, 0)
        }

        var mul = 1
        var i = 0
        this[offset] = value & 0xFF
        while (++i < byteLength && (mul *= 0x100)) {
          this[offset + i] = (value / mul) & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1
          checkInt(this, value, offset, byteLength, maxBytes, 0)
        }

        var i = byteLength - 1
        var mul = 1
        this[offset + i] = value & 0xFF
        while (--i >= 0 && (mul *= 0x100)) {
          this[offset + i] = (value / mul) & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
        this[offset] = (value & 0xff)
        return offset + 1
      }

      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        return offset + 2
      }

      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
        this[offset] = (value >>> 8)
        this[offset + 1] = (value & 0xff)
        return offset + 2
      }

      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
        this[offset + 3] = (value >>> 24)
        this[offset + 2] = (value >>> 16)
        this[offset + 1] = (value >>> 8)
        this[offset] = (value & 0xff)
        return offset + 4
      }

      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
        this[offset] = (value >>> 24)
        this[offset + 1] = (value >>> 16)
        this[offset + 2] = (value >>> 8)
        this[offset + 3] = (value & 0xff)
        return offset + 4
      }

      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          var limit = Math.pow(2, (8 * byteLength) - 1)

          checkInt(this, value, offset, byteLength, limit - 1, -limit)
        }

        var i = 0
        var mul = 1
        var sub = 0
        this[offset] = value & 0xFF
        while (++i < byteLength && (mul *= 0x100)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1
          }
          this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          var limit = Math.pow(2, (8 * byteLength) - 1)

          checkInt(this, value, offset, byteLength, limit - 1, -limit)
        }

        var i = byteLength - 1
        var mul = 1
        var sub = 0
        this[offset + i] = value & 0xFF
        while (--i >= 0 && (mul *= 0x100)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1
          }
          this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
        if (value < 0) value = 0xff + value + 1
        this[offset] = (value & 0xff)
        return offset + 1
      }

      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        return offset + 2
      }

      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
        this[offset] = (value >>> 8)
        this[offset + 1] = (value & 0xff)
        return offset + 2
      }

      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        this[offset + 2] = (value >>> 16)
        this[offset + 3] = (value >>> 24)
        return offset + 4
      }

      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
        if (value < 0) value = 0xffffffff + value + 1
        this[offset] = (value >>> 24)
        this[offset + 1] = (value >>> 16)
        this[offset + 2] = (value >>> 8)
        this[offset + 3] = (value & 0xff)
        return offset + 4
      }

      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError('Index out of range')
        if (offset < 0) throw new RangeError('Index out of range')
      }

      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4)
        return offset + 4
      }

      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert)
      }

      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert)
      }

      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8)
        return offset + 8
      }

      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert)
      }

      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert)
      }

      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
        if (!start) start = 0
        if (!end && end !== 0) end = this.length
        if (targetStart >= target.length) targetStart = target.length
        if (!targetStart) targetStart = 0
        if (end > 0 && end < start) end = start

        if (end === start) return 0
        if (target.length === 0 || this.length === 0) return 0

        if (targetStart < 0) {
          throw new RangeError('targetStart out of bounds')
        }
        if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
        if (end < 0) throw new RangeError('sourceEnd out of bounds')

        if (end > this.length) end = this.length
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start
        }

        var len = end - start

        if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
          this.copyWithin(targetStart, start, end)
        } else if (this === target && start < targetStart && targetStart < end) {
          for (var i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start]
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          )
        }

        return len
      }

      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === 'string') {
          if (typeof start === 'string') {
            encoding = start
            start = 0
            end = this.length
          } else if (typeof end === 'string') {
            encoding = end
            end = this.length
          }
          if (encoding !== undefined && typeof encoding !== 'string') {
            throw new TypeError('encoding must be a string')
          }
          if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding)
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0)
            if ((encoding === 'utf8' && code < 128) ||
              encoding === 'latin1') {
              val = code
            }
          }
        } else if (typeof val === 'number') {
          val = val & 255
        } else if (typeof val === 'boolean') {
          val = Number(val)
        }

        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError('Out of range index')
        }

        if (end <= start) {
          return this
        }

        start = start >>> 0
        end = end === undefined ? this.length : end >>> 0

        if (!val) val = 0

        var i
        if (typeof val === 'number') {
          for (i = start; i < end; ++i) {
            this[i] = val
          }
        } else {
          var bytes = Buffer.isBuffer(val)
            ? val
            : Buffer.from(val, encoding)
          var len = bytes.length
          if (len === 0) {
            throw new TypeError('The value "' + val +
              '" is invalid for argument "value"')
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len]
          }
        }

        return this
      }


      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

      function base64clean(str) {
        str = str.split('=')[0]
        str = str.trim().replace(INVALID_BASE64_RE, '')
        if (str.length < 2) return ''
        while (str.length % 4 !== 0) {
          str = str + '='
        }
        return str
      }

      function utf8ToBytes(string, units) {
        units = units || Infinity
        var codePoint
        var length = string.length
        var leadSurrogate = null
        var bytes = []

        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i)

          if (codePoint > 0xD7FF && codePoint < 0xE000) {
            if (!leadSurrogate) {
              if (codePoint > 0xDBFF) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                continue
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                continue
              }

              leadSurrogate = codePoint

              continue
            }

            if (codePoint < 0xDC00) {
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
              leadSurrogate = codePoint
              continue
            }

            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          }

          leadSurrogate = null

          if (codePoint < 0x80) {
            if ((units -= 1) < 0) break
            bytes.push(codePoint)
          } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break
            bytes.push(
              codePoint >> 0x6 | 0xC0,
              codePoint & 0x3F | 0x80
            )
          } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break
            bytes.push(
              codePoint >> 0xC | 0xE0,
              codePoint >> 0x6 & 0x3F | 0x80,
              codePoint & 0x3F | 0x80
            )
          } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break
            bytes.push(
              codePoint >> 0x12 | 0xF0,
              codePoint >> 0xC & 0x3F | 0x80,
              codePoint >> 0x6 & 0x3F | 0x80,
              codePoint & 0x3F | 0x80
            )
          } else {
            throw new Error('Invalid code point')
          }
        }

        return bytes
      }

      function asciiToBytes(str) {
        var byteArray = []
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 0xFF)
        }
        return byteArray
      }

      function utf16leToBytes(str, units) {
        var c, hi, lo
        var byteArray = []
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break

          c = str.charCodeAt(i)
          hi = c >> 8
          lo = c % 256
          byteArray.push(lo)
          byteArray.push(hi)
        }

        return byteArray
      }

      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str))
      }

      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if ((i + offset >= dst.length) || (i >= src.length)) break
          dst[i + offset] = src[i]
        }
        return i
      }

      function isInstance(obj, type) {
        return obj instanceof type ||
          (obj != null && obj.constructor != null && obj.constructor.name != null &&
            obj.constructor.name === type.name)
      }
      function numberIsNaN(obj) {
        return obj !== obj
      }

      var hexSliceLookupTable = (function () {
        var alphabet = '0123456789abcdef'
        var table = new Array(256)
        for (var i = 0; i < 16; ++i) {
          var i16 = i * 16
          for (var j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j]
          }
        }
        return table
      })()

    }).call(this, require("buffer").Buffer)
  }, { "base64-js": 19, "buffer": 20, "ieee754": 83 }], 21: [function (require, module, exports) {

    var objectCreate = Object.create || objectCreatePolyfill
    var objectKeys = Object.keys || objectKeysPolyfill
    var bind = Function.prototype.bind || functionBindPolyfill

    function EventEmitter() {
      if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
        this._events = objectCreate(null);
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;

    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    var defaultMaxListeners = 10;

    var hasDefineProperty;
    try {
      var o = {};
      if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
      hasDefineProperty = o.x === 0;
    } catch (err) { hasDefineProperty = false }
    if (hasDefineProperty) {
      Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
        enumerable: true,
        get: function () {
          return defaultMaxListeners;
        },
        set: function (arg) {
          if (typeof arg !== 'number' || arg < 0 || arg !== arg)
            throw new TypeError('"defaultMaxListeners" must be a positive number');
          defaultMaxListeners = arg;
        }
      });
    } else {
      EventEmitter.defaultMaxListeners = defaultMaxListeners;
    }

    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || isNaN(n))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n;
      return this;
    };

    function $getMaxListeners(that) {
      if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }

    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };

    function emitNone(handler, isFn, self) {
      if (isFn)
        handler.call(self);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self);
      }
    }
    function emitOne(handler, isFn, self, arg1) {
      if (isFn)
        handler.call(self, arg1);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1);
      }
    }
    function emitTwo(handler, isFn, self, arg1, arg2) {
      if (isFn)
        handler.call(self, arg1, arg2);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2);
      }
    }
    function emitThree(handler, isFn, self, arg1, arg2, arg3) {
      if (isFn)
        handler.call(self, arg1, arg2, arg3);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2, arg3);
      }
    }

    function emitMany(handler, isFn, self, args) {
      if (isFn)
        handler.apply(self, args);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].apply(self, args);
      }
    }

    EventEmitter.prototype.emit = function emit(type) {
      var er, handler, len, args, i, events;
      var doError = (type === 'error');

      events = this._events;
      if (events)
        doError = (doError && events.error == null);
      else if (!doError)
        return false;

      if (doError) {
        if (arguments.length > 1)
          er = arguments[1];
        if (er instanceof Error) {
          throw er;
        } else {
          var err = new Error('Unhandled "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
        return false;
      }

      handler = events[type];

      if (!handler)
        return false;

      var isFn = typeof handler === 'function';
      len = arguments.length;
      switch (len) {
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }

      return true;
    };

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = target._events;
      if (!events) {
        events = target._events = objectCreate(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener) {
          target.emit('newListener', type,
            listener.listener ? listener.listener : listener);

          events = target._events;
        }
        existing = events[type];
      }

      if (!existing) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          existing = events[type] =
            prepend ? [listener, existing] : [existing, listener];
        } else {
          if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
        }

        if (!existing.warned) {
          m = $getMaxListeners(target);
          if (m && m > 0 && existing.length > m) {
            existing.warned = true;
            var w = new Error('Possible EventEmitter memory leak detected. ' +
              existing.length + ' "' + String(type) + '" listeners ' +
              'added. Use emitter.setMaxListeners() to ' +
              'increase limit.');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            if (typeof console === 'object' && console.warn) {
              console.warn('%s: %s', w.name, w.message);
            }
          }
        }
      }

      return target;
    }

    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        switch (arguments.length) {
          case 0:
            return this.listener.call(this.target);
          case 1:
            return this.listener.call(this.target, arguments[0]);
          case 2:
            return this.listener.call(this.target, arguments[0], arguments[1]);
          case 3:
            return this.listener.call(this.target, arguments[0], arguments[1],
              arguments[2]);
          default:
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; ++i)
              args[i] = arguments[i];
            this.listener.apply(this.target, args);
        }
      }
    }

    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
      var wrapped = bind.call(onceWrapper, state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }

    EventEmitter.prototype.once = function once(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };

    EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

    EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');

        events = this._events;
        if (!events)
          return this;

        list = events[type];
        if (!list)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else
            spliceOne(list, position);

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

    EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (!events)
          return this;

        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = objectCreate(null);
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = objectCreate(null);
            else
              delete events[type];
          }
          return this;
        }

        if (arguments.length === 0) {
          var keys = objectKeys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = objectCreate(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

    function _listeners(target, type, unwrap) {
      var events = target._events;

      if (!events)
        return [];

      var evlistener = events[type];
      if (!evlistener)
        return [];

      if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];

      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }

    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };

    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };

    EventEmitter.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };

    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;

      if (events) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener) {
          return evlistener.length;
        }
      }

      return 0;
    }

    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };

    function spliceOne(list, index) {
      for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
        list[i] = list[k];
      list.pop();
    }

    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }

    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }

    function objectCreatePolyfill(proto) {
      var F = function () { };
      F.prototype = proto;
      return new F;
    }
    function objectKeysPolyfill(obj) {
      var keys = [];
      for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
        keys.push(k);
      }
      return k;
    }
    function functionBindPolyfill(context) {
      var fn = this;
      return function () {
        return fn.apply(context, arguments);
      };
    }

  }, {}], 22: [function (require, module, exports) {
    "use strict";

    var isValue = require("type/value/is")
      , ensureValue = require("type/value/ensure")
      , ensurePlainFunction = require("type/plain-function/ensure")
      , copy = require("es5-ext/object/copy")
      , normalizeOptions = require("es5-ext/object/normalize-options")
      , map = require("es5-ext/object/map");

    var bind = Function.prototype.bind
      , defineProperty = Object.defineProperty
      , hasOwnProperty = Object.prototype.hasOwnProperty
      , define;

    define = function (name, desc, options) {
      var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
      dgs = copy(desc);
      delete dgs.writable;
      delete dgs.value;
      dgs.get = function () {
        if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
        desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
        defineProperty(this, name, desc);
        return this[name];
      };
      return dgs;
    };

    module.exports = function (props) {
      var options = normalizeOptions(arguments[1]);
      if (isValue(options.resolveContext)) ensurePlainFunction(options.resolveContext);
      return map(props, function (desc, name) { return define(name, desc, options); });
    };

  }, { "es5-ext/object/copy": 40, "es5-ext/object/map": 48, "es5-ext/object/normalize-options": 49, "type/plain-function/ensure": 92, "type/value/ensure": 96, "type/value/is": 97 }], 23: [function (require, module, exports) {
    "use strict";

    var isValue = require("type/value/is")
      , isPlainFunction = require("type/plain-function/is")
      , assign = require("es5-ext/object/assign")
      , normalizeOpts = require("es5-ext/object/normalize-options")
      , contains = require("es5-ext/string/#/contains");

    var d = (module.exports = function (dscr, value) {
      var c, e, w, options, desc;
      if (arguments.length < 2 || typeof dscr !== "string") {
        options = value;
        value = dscr;
        dscr = null;
      } else {
        options = arguments[2];
      }
      if (isValue(dscr)) {
        c = contains.call(dscr, "c");
        e = contains.call(dscr, "e");
        w = contains.call(dscr, "w");
      } else {
        c = w = true;
        e = false;
      }

      desc = { value: value, configurable: c, enumerable: e, writable: w };
      return !options ? desc : assign(normalizeOpts(options), desc);
    });

    d.gs = function (dscr, get, set) {
      var c, e, options, desc;
      if (typeof dscr !== "string") {
        options = set;
        set = get;
        get = dscr;
        dscr = null;
      } else {
        options = arguments[3];
      }
      if (!isValue(get)) {
        get = undefined;
      } else if (!isPlainFunction(get)) {
        options = get;
        get = set = undefined;
      } else if (!isValue(set)) {
        set = undefined;
      } else if (!isPlainFunction(set)) {
        options = set;
        set = undefined;
      }
      if (isValue(dscr)) {
        c = contains.call(dscr, "c");
        e = contains.call(dscr, "e");
      } else {
        c = true;
        e = false;
      }

      desc = { get: get, set: set, configurable: c, enumerable: e };
      return !options ? desc : assign(normalizeOpts(options), desc);
    };

  }, { "es5-ext/object/assign": 37, "es5-ext/object/normalize-options": 49, "es5-ext/string/#/contains": 56, "type/plain-function/is": 93, "type/value/is": 97 }], 24: [function (require, module, exports) {

    "use strict";

    var value = require("../../object/valid-value");

    module.exports = function () {
      value(this).length = 0;
      return this;
    };

  }, { "../../object/valid-value": 55 }], 25: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? Array.from : require("./shim");

  }, { "./is-implemented": 26, "./shim": 27 }], 26: [function (require, module, exports) {
    "use strict";

    module.exports = function () {
      var from = Array.from, arr, result;
      if (typeof from !== "function") return false;
      arr = ["raz", "dwa"];
      result = from(arr);
      return Boolean(result && result !== arr && result[1] === "dwa");
    };

  }, {}], 27: [function (require, module, exports) {
    "use strict";

    var iteratorSymbol = require("es6-symbol").iterator
      , isArguments = require("../../function/is-arguments")
      , isFunction = require("../../function/is-function")
      , toPosInt = require("../../number/to-pos-integer")
      , callable = require("../../object/valid-callable")
      , validValue = require("../../object/valid-value")
      , isValue = require("../../object/is-value")
      , isString = require("../../string/is-string")
      , isArray = Array.isArray
      , call = Function.prototype.call
      , desc = { configurable: true, enumerable: true, writable: true, value: null }
      , defineProperty = Object.defineProperty;

    module.exports = function (arrayLike) {
      var mapFn = arguments[1]
        , thisArg = arguments[2]
        , Context
        , i
        , j
        , arr
        , length
        , code
        , iterator
        , result
        , getIterator
        , value;

      arrayLike = Object(validValue(arrayLike));

      if (isValue(mapFn)) callable(mapFn);
      if (!this || this === Array || !isFunction(this)) {
        if (!mapFn) {
          if (isArguments(arrayLike)) {
            length = arrayLike.length;
            if (length !== 1) return Array.apply(null, arrayLike);
            arr = new Array(1);
            arr[0] = arrayLike[0];
            return arr;
          }
          if (isArray(arrayLike)) {
            arr = new Array((length = arrayLike.length));
            for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
            return arr;
          }
        }
        arr = [];
      } else {
        Context = this;
      }

      if (!isArray(arrayLike)) {
        if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
          iterator = callable(getIterator).call(arrayLike);
          if (Context) arr = new Context();
          result = iterator.next();
          i = 0;
          while (!result.done) {
            value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
            if (Context) {
              desc.value = value;
              defineProperty(arr, i, desc);
            } else {
              arr[i] = value;
            }
            result = iterator.next();
            ++i;
          }
          length = i;
        } else if (isString(arrayLike)) {
          length = arrayLike.length;
          if (Context) arr = new Context();
          for (i = 0, j = 0; i < length; ++i) {
            value = arrayLike[i];
            if (i + 1 < length) {
              code = value.charCodeAt(0);
              if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
            }
            value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
            if (Context) {
              desc.value = value;
              defineProperty(arr, j, desc);
            } else {
              arr[j] = value;
            }
            ++j;
          }
          length = j;
        }
      }
      if (length === undefined) {
        length = toPosInt(arrayLike.length);
        if (Context) arr = new Context(length);
        for (i = 0; i < length; ++i) {
          value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
          if (Context) {
            desc.value = value;
            defineProperty(arr, i, desc);
          } else {
            arr[i] = value;
          }
        }
      }
      if (Context) {
        desc.value = null;
        arr.length = length;
      }
      return arr;
    };

  }, { "../../function/is-arguments": 28, "../../function/is-function": 29, "../../number/to-pos-integer": 35, "../../object/is-value": 44, "../../object/valid-callable": 53, "../../object/valid-value": 55, "../../string/is-string": 59, "es6-symbol": 68 }], 28: [function (require, module, exports) {
    "use strict";

    var objToString = Object.prototype.toString
      , id = objToString.call((function () { return arguments; })());

    module.exports = function (value) { return objToString.call(value) === id; };

  }, {}], 29: [function (require, module, exports) {
    "use strict";

    var objToString = Object.prototype.toString
      , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

    module.exports = function (value) {
      return typeof value === "function" && isFunctionStringTag(objToString.call(value));
    };

  }, {}], 30: [function (require, module, exports) {
    "use strict";

    module.exports = function () { };

  }, {}], 31: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? Math.sign : require("./shim");

  }, { "./is-implemented": 32, "./shim": 33 }], 32: [function (require, module, exports) {
    "use strict";

    module.exports = function () {
      var sign = Math.sign;
      if (typeof sign !== "function") return false;
      return sign(10) === 1 && sign(-20) === -1;
    };

  }, {}], 33: [function (require, module, exports) {
    "use strict";

    module.exports = function (value) {
      value = Number(value);
      if (isNaN(value) || value === 0) return value;
      return value > 0 ? 1 : -1;
    };

  }, {}], 34: [function (require, module, exports) {
    "use strict";

    var sign = require("../math/sign")
      , abs = Math.abs
      , floor = Math.floor;

    module.exports = function (value) {
      if (isNaN(value)) return 0;
      value = Number(value);
      if (value === 0 || !isFinite(value)) return value;
      return sign(value) * floor(abs(value));
    };

  }, { "../math/sign": 31 }], 35: [function (require, module, exports) {
    "use strict";

    var toInteger = require("./to-integer")
      , max = Math.max;

    module.exports = function (value) { return max(0, toInteger(value)); };

  }, { "./to-integer": 34 }], 36: [function (require, module, exports) {

    "use strict";

    var callable = require("./valid-callable")
      , value = require("./valid-value")
      , bind = Function.prototype.bind
      , call = Function.prototype.call
      , keys = Object.keys
      , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

    module.exports = function (method, defVal) {
      return function (obj, cb) {
        var list, thisArg = arguments[2], compareFn = arguments[3];
        obj = Object(value(obj));
        callable(cb);

        list = keys(obj);
        if (compareFn) {
          list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
        }
        if (typeof method !== "function") method = list[method];
        return call.call(method, list, function (key, index) {
          if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
          return call.call(cb, thisArg, obj[key], key, obj, index);
        });
      };
    };

  }, { "./valid-callable": 53, "./valid-value": 55 }], 37: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? Object.assign : require("./shim");

  }, { "./is-implemented": 38, "./shim": 39 }], 38: [function (require, module, exports) {
    "use strict";

    module.exports = function () {
      var assign = Object.assign, obj;
      if (typeof assign !== "function") return false;
      obj = { foo: "raz" };
      assign(obj, { bar: "dwa" }, { trzy: "trzy" });
      return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
    };

  }, {}], 39: [function (require, module, exports) {
    "use strict";

    var keys = require("../keys")
      , value = require("../valid-value")
      , max = Math.max;

    module.exports = function (dest, src) {
      var error, i, length = max(arguments.length, 2), assign;
      dest = Object(value(dest));
      assign = function (key) {
        try {
          dest[key] = src[key];
        } catch (e) {
          if (!error) error = e;
        }
      };
      for (i = 1; i < length; ++i) {
        src = arguments[i];
        keys(src).forEach(assign);
      }
      if (error !== undefined) throw error;
      return dest;
    };

  }, { "../keys": 45, "../valid-value": 55 }], 40: [function (require, module, exports) {
    "use strict";

    var aFrom = require("../array/from")
      , assign = require("./assign")
      , value = require("./valid-value");

    module.exports = function (obj) {
      var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
      if (copy !== obj && !propertyNames) return copy;
      var result = {};
      if (propertyNames) {
        aFrom(propertyNames, function (propertyName) {
          if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
        });
      } else {
        assign(result, obj);
      }
      return result;
    };

  }, { "../array/from": 25, "./assign": 37, "./valid-value": 55 }], 41: [function (require, module, exports) {

    "use strict";

    var create = Object.create, shim;

    if (!require("./set-prototype-of/is-implemented")()) {
      shim = require("./set-prototype-of/shim");
    }

    module.exports = (function () {
      var nullObject, polyProps, desc;
      if (!shim) return create;
      if (shim.level !== 1) return create;

      nullObject = {};
      polyProps = {};
      desc = { configurable: false, enumerable: false, writable: true, value: undefined };
      Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
        if (name === "__proto__") {
          polyProps[name] = {
            configurable: true,
            enumerable: false,
            writable: true,
            value: undefined
          };
          return;
        }
        polyProps[name] = desc;
      });
      Object.defineProperties(nullObject, polyProps);

      Object.defineProperty(shim, "nullPolyfill", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: nullObject
      });

      return function (prototype, props) {
        return create(prototype === null ? nullObject : prototype, props);
      };
    })();

  }, { "./set-prototype-of/is-implemented": 51, "./set-prototype-of/shim": 52 }], 42: [function (require, module, exports) {
    "use strict";

    module.exports = require("./_iterate")("forEach");

  }, { "./_iterate": 36 }], 43: [function (require, module, exports) {
    "use strict";

    var isValue = require("./is-value");

    var map = { function: true, object: true };

    module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };

  }, { "./is-value": 44 }], 44: [function (require, module, exports) {
    "use strict";

    var _undefined = require("../function/noop")();

    module.exports = function (val) { return val !== _undefined && val !== null; };

  }, { "../function/noop": 30 }], 45: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? Object.keys : require("./shim");

  }, { "./is-implemented": 46, "./shim": 47 }], 46: [function (require, module, exports) {
    "use strict";

    module.exports = function () {
      try {
        Object.keys("primitive");
        return true;
      } catch (e) {
        return false;
      }
    };

  }, {}], 47: [function (require, module, exports) {
    "use strict";

    var isValue = require("../is-value");

    var keys = Object.keys;

    module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };

  }, { "../is-value": 44 }], 48: [function (require, module, exports) {
    "use strict";

    var callable = require("./valid-callable")
      , forEach = require("./for-each")
      , call = Function.prototype.call;

    module.exports = function (obj, cb) {
      var result = {}, thisArg = arguments[2];
      callable(cb);
      forEach(obj, function (value, key, targetObj, index) {
        result[key] = call.call(cb, thisArg, value, key, targetObj, index);
      });
      return result;
    };

  }, { "./for-each": 42, "./valid-callable": 53 }], 49: [function (require, module, exports) {
    "use strict";

    var isValue = require("./is-value");

    var forEach = Array.prototype.forEach, create = Object.create;

    var process = function (src, obj) {
      var key;
      for (key in src) obj[key] = src[key];
    };

    module.exports = function (opts1) {
      var result = create(null);
      forEach.call(arguments, function (options) {
        if (!isValue(options)) return;
        process(Object(options), result);
      });
      return result;
    };

  }, { "./is-value": 44 }], 50: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? Object.setPrototypeOf : require("./shim");

  }, { "./is-implemented": 51, "./shim": 52 }], 51: [function (require, module, exports) {
    "use strict";

    var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

    module.exports = function () {
      var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
      if (typeof setPrototypeOf !== "function") return false;
      return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
    };

  }, {}], 52: [function (require, module, exports) {


    "use strict";

    var isObject = require("../is-object")
      , value = require("../valid-value")
      , objIsPrototypeOf = Object.prototype.isPrototypeOf
      , defineProperty = Object.defineProperty
      , nullDesc = { configurable: true, enumerable: false, writable: true, value: undefined }
      , validate;

    validate = function (obj, prototype) {
      value(obj);
      if (prototype === null || isObject(prototype)) return obj;
      throw new TypeError("Prototype must be null or an object");
    };

    module.exports = (function (status) {
      var fn, set;
      if (!status) return null;
      if (status.level === 2) {
        if (status.set) {
          set = status.set;
          fn = function (obj, prototype) {
            set.call(validate(obj, prototype), prototype);
            return obj;
          };
        } else {
          fn = function (obj, prototype) {
            validate(obj, prototype).__proto__ = prototype;
            return obj;
          };
        }
      } else {
        fn = function self(obj, prototype) {
          var isNullBase;
          validate(obj, prototype);
          isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
          if (isNullBase) delete self.nullPolyfill.__proto__;
          if (prototype === null) prototype = self.nullPolyfill;
          obj.__proto__ = prototype;
          if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
          return obj;
        };
      }
      return Object.defineProperty(fn, "level", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: status.level
      });
    })(
      (function () {
        var tmpObj1 = Object.create(null)
          , tmpObj2 = {}
          , set
          , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

        if (desc) {
          try {
            set = desc.set;
            set.call(tmpObj1, tmpObj2);
          } catch (ignore) { }
          if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
        }

        tmpObj1.__proto__ = tmpObj2;
        if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

        tmpObj1 = {};
        tmpObj1.__proto__ = tmpObj2;
        if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

        return false;
      })()
    );

    require("../create");

  }, { "../create": 41, "../is-object": 43, "../valid-value": 55 }], 53: [function (require, module, exports) {
    "use strict";

    module.exports = function (fn) {
      if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
      return fn;
    };

  }, {}], 54: [function (require, module, exports) {
    "use strict";

    var isObject = require("./is-object");

    module.exports = function (value) {
      if (!isObject(value)) throw new TypeError(value + " is not an Object");
      return value;
    };

  }, { "./is-object": 43 }], 55: [function (require, module, exports) {
    "use strict";

    var isValue = require("./is-value");

    module.exports = function (value) {
      if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
      return value;
    };

  }, { "./is-value": 44 }], 56: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? String.prototype.contains : require("./shim");

  }, { "./is-implemented": 57, "./shim": 58 }], 57: [function (require, module, exports) {
    "use strict";

    var str = "razdwatrzy";

    module.exports = function () {
      if (typeof str.contains !== "function") return false;
      return str.contains("dwa") === true && str.contains("foo") === false;
    };

  }, {}], 58: [function (require, module, exports) {
    "use strict";

    var indexOf = String.prototype.indexOf;

    module.exports = function (searchString) {
      return indexOf.call(this, searchString, arguments[1]) > -1;
    };

  }, {}], 59: [function (require, module, exports) {
    "use strict";

    var objToString = Object.prototype.toString, id = objToString.call("");

    module.exports = function (value) {
      return (
        typeof value === "string" ||
        (value &&
          typeof value === "object" &&
          (value instanceof String || objToString.call(value) === id)) ||
        false
      );
    };

  }, {}], 60: [function (require, module, exports) {
    "use strict";

    var generated = Object.create(null), random = Math.random;

    module.exports = function () {
      var str;
      do {
        str = random().toString(36).slice(2);
      } while (generated[str]);
      return str;
    };

  }, {}], 61: [function (require, module, exports) {
    "use strict";

    var setPrototypeOf = require("es5-ext/object/set-prototype-of")
      , contains = require("es5-ext/string/#/contains")
      , d = require("d")
      , Symbol = require("es6-symbol")
      , Iterator = require("./");

    var defineProperty = Object.defineProperty, ArrayIterator;

    ArrayIterator = module.exports = function (arr, kind) {
      if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
      Iterator.call(this, arr);
      if (!kind) kind = "value";
      else if (contains.call(kind, "key+value")) kind = "key+value";
      else if (contains.call(kind, "key")) kind = "key";
      else kind = "value";
      defineProperty(this, "__kind__", d("", kind));
    };
    if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

    delete ArrayIterator.prototype.constructor;

    ArrayIterator.prototype = Object.create(Iterator.prototype, {
      _resolve: d(function (i) {
        if (this.__kind__ === "value") return this.__list__[i];
        if (this.__kind__ === "key+value") return [i, this.__list__[i]];
        return i;
      })
    });
    defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));

  }, { "./": 64, "d": 23, "es5-ext/object/set-prototype-of": 50, "es5-ext/string/#/contains": 56, "es6-symbol": 68 }], 62: [function (require, module, exports) {
    "use strict";

    var isArguments = require("es5-ext/function/is-arguments")
      , callable = require("es5-ext/object/valid-callable")
      , isString = require("es5-ext/string/is-string")
      , get = require("./get");

    var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;

    module.exports = function (iterable, cb) {
      var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
      if (isArray(iterable) || isArguments(iterable)) mode = "array";
      else if (isString(iterable)) mode = "string";
      else iterable = get(iterable);

      callable(cb);
      doBreak = function () {
        broken = true;
      };
      if (mode === "array") {
        some.call(iterable, function (value) {
          call.call(cb, thisArg, value, doBreak);
          return broken;
        });
        return;
      }
      if (mode === "string") {
        length = iterable.length;
        for (i = 0; i < length; ++i) {
          char = iterable[i];
          if (i + 1 < length) {
            code = char.charCodeAt(0);
            if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
          }
          call.call(cb, thisArg, char, doBreak);
          if (broken) break;
        }
        return;
      }
      result = iterable.next();

      while (!result.done) {
        call.call(cb, thisArg, result.value, doBreak);
        if (broken) return;
        result = iterable.next();
      }
    };

  }, { "./get": 63, "es5-ext/function/is-arguments": 28, "es5-ext/object/valid-callable": 53, "es5-ext/string/is-string": 59 }], 63: [function (require, module, exports) {
    "use strict";

    var isArguments = require("es5-ext/function/is-arguments")
      , isString = require("es5-ext/string/is-string")
      , ArrayIterator = require("./array")
      , StringIterator = require("./string")
      , iterable = require("./valid-iterable")
      , iteratorSymbol = require("es6-symbol").iterator;

    module.exports = function (obj) {
      if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
      if (isArguments(obj)) return new ArrayIterator(obj);
      if (isString(obj)) return new StringIterator(obj);
      return new ArrayIterator(obj);
    };

  }, { "./array": 61, "./string": 66, "./valid-iterable": 67, "es5-ext/function/is-arguments": 28, "es5-ext/string/is-string": 59, "es6-symbol": 68 }], 64: [function (require, module, exports) {
    "use strict";

    var clear = require("es5-ext/array/#/clear")
      , assign = require("es5-ext/object/assign")
      , callable = require("es5-ext/object/valid-callable")
      , value = require("es5-ext/object/valid-value")
      , d = require("d")
      , autoBind = require("d/auto-bind")
      , Symbol = require("es6-symbol");

    var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;

    module.exports = Iterator = function (list, context) {
      if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
      defineProperties(this, {
        __list__: d("w", value(list)),
        __context__: d("w", context),
        __nextIndex__: d("w", 0)
      });
      if (!context) return;
      callable(context.on);
      context.on("_add", this._onAdd);
      context.on("_delete", this._onDelete);
      context.on("_clear", this._onClear);
    };

    delete Iterator.prototype.constructor;

    defineProperties(
      Iterator.prototype,
      assign(
        {
          _next: d(function () {
            var i;
            if (!this.__list__) return undefined;
            if (this.__redo__) {
              i = this.__redo__.shift();
              if (i !== undefined) return i;
            }
            if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
            this._unBind();
            return undefined;
          }),
          next: d(function () {
            return this._createResult(this._next());
          }),
          _createResult: d(function (i) {
            if (i === undefined) return { done: true, value: undefined };
            return { done: false, value: this._resolve(i) };
          }),
          _resolve: d(function (i) {
            return this.__list__[i];
          }),
          _unBind: d(function () {
            this.__list__ = null;
            delete this.__redo__;
            if (!this.__context__) return;
            this.__context__.off("_add", this._onAdd);
            this.__context__.off("_delete", this._onDelete);
            this.__context__.off("_clear", this._onClear);
            this.__context__ = null;
          }),
          toString: d(function () {
            return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
          })
        },
        autoBind({
          _onAdd: d(function (index) {
            if (index >= this.__nextIndex__) return;
            ++this.__nextIndex__;
            if (!this.__redo__) {
              defineProperty(this, "__redo__", d("c", [index]));
              return;
            }
            this.__redo__.forEach(function (redo, i) {
              if (redo >= index) this.__redo__[i] = ++redo;
            }, this);
            this.__redo__.push(index);
          }),
          _onDelete: d(function (index) {
            var i;
            if (index >= this.__nextIndex__) return;
            --this.__nextIndex__;
            if (!this.__redo__) return;
            i = this.__redo__.indexOf(index);
            if (i !== -1) this.__redo__.splice(i, 1);
            this.__redo__.forEach(function (redo, j) {
              if (redo > index) this.__redo__[j] = --redo;
            }, this);
          }),
          _onClear: d(function () {
            if (this.__redo__) clear.call(this.__redo__);
            this.__nextIndex__ = 0;
          })
        })
      )
    );

    defineProperty(
      Iterator.prototype,
      Symbol.iterator,
      d(function () {
        return this;
      })
    );

  }, { "d": 23, "d/auto-bind": 22, "es5-ext/array/#/clear": 24, "es5-ext/object/assign": 37, "es5-ext/object/valid-callable": 53, "es5-ext/object/valid-value": 55, "es6-symbol": 68 }], 65: [function (require, module, exports) {
    "use strict";

    var isArguments = require("es5-ext/function/is-arguments")
      , isValue = require("es5-ext/object/is-value")
      , isString = require("es5-ext/string/is-string");

    var iteratorSymbol = require("es6-symbol").iterator
      , isArray = Array.isArray;

    module.exports = function (value) {
      if (!isValue(value)) return false;
      if (isArray(value)) return true;
      if (isString(value)) return true;
      if (isArguments(value)) return true;
      return typeof value[iteratorSymbol] === "function";
    };

  }, { "es5-ext/function/is-arguments": 28, "es5-ext/object/is-value": 44, "es5-ext/string/is-string": 59, "es6-symbol": 68 }], 66: [function (require, module, exports) {

    "use strict";

    var setPrototypeOf = require("es5-ext/object/set-prototype-of")
      , d = require("d")
      , Symbol = require("es6-symbol")
      , Iterator = require("./");

    var defineProperty = Object.defineProperty, StringIterator;

    StringIterator = module.exports = function (str) {
      if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
      str = String(str);
      Iterator.call(this, str);
      defineProperty(this, "__length__", d("", str.length));
    };
    if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

    delete StringIterator.prototype.constructor;

    StringIterator.prototype = Object.create(Iterator.prototype, {
      _next: d(function () {
        if (!this.__list__) return undefined;
        if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
        this._unBind();
        return undefined;
      }),
      _resolve: d(function (i) {
        var char = this.__list__[i], code;
        if (this.__nextIndex__ === this.__length__) return char;
        code = char.charCodeAt(0);
        if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
        return char;
      })
    });
    defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));

  }, { "./": 64, "d": 23, "es5-ext/object/set-prototype-of": 50, "es6-symbol": 68 }], 67: [function (require, module, exports) {
    "use strict";

    var isIterable = require("./is-iterable");

    module.exports = function (value) {
      if (!isIterable(value)) throw new TypeError(value + " is not iterable");
      return value;
    };

  }, { "./is-iterable": 65 }], 68: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")()
      ? require("ext/global-this").Symbol
      : require("./polyfill");

  }, { "./is-implemented": 69, "./polyfill": 74, "ext/global-this": 81 }], 69: [function (require, module, exports) {
    "use strict";

    var global = require("ext/global-this")
      , validTypes = { object: true, symbol: true };

    module.exports = function () {
      var Symbol = global.Symbol;
      var symbol;
      if (typeof Symbol !== "function") return false;
      symbol = Symbol("test symbol");
      try { String(symbol); }
      catch (e) { return false; }

      if (!validTypes[typeof Symbol.iterator]) return false;
      if (!validTypes[typeof Symbol.toPrimitive]) return false;
      if (!validTypes[typeof Symbol.toStringTag]) return false;

      return true;
    };

  }, { "ext/global-this": 81 }], 70: [function (require, module, exports) {
    "use strict";

    module.exports = function (value) {
      if (!value) return false;
      if (typeof value === "symbol") return true;
      if (!value.constructor) return false;
      if (value.constructor.name !== "Symbol") return false;
      return value[value.constructor.toStringTag] === "Symbol";
    };

  }, {}], 71: [function (require, module, exports) {
    "use strict";

    var d = require("d");

    var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

    var created = create(null);
    module.exports = function (desc) {
      var postfix = 0, name, ie11BugWorkaround;
      while (created[desc + (postfix || "")])++postfix;
      desc += postfix || "";
      created[desc] = true;
      name = "@@" + desc;
      defineProperty(
        objPrototype,
        name,
        d.gs(null, function (value) {
          if (ie11BugWorkaround) return;
          ie11BugWorkaround = true;
          defineProperty(this, name, d(value));
          ie11BugWorkaround = false;
        })
      );
      return name;
    };

  }, { "d": 23 }], 72: [function (require, module, exports) {
    "use strict";

    var d = require("d")
      , NativeSymbol = require("ext/global-this").Symbol;

    module.exports = function (SymbolPolyfill) {
      return Object.defineProperties(SymbolPolyfill, {
        hasInstance: d(
          "", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
        ),
        isConcatSpreadable: d(
          "",
          (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
          SymbolPolyfill("isConcatSpreadable")
        ),
        iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
        match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
        replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
        search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
        species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
        split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
        toPrimitive: d(
          "", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
        ),
        toStringTag: d(
          "", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
        ),
        unscopables: d(
          "", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
        )
      });
    };

  }, { "d": 23, "ext/global-this": 81 }], 73: [function (require, module, exports) {
    "use strict";

    var d = require("d")
      , validateSymbol = require("../../../validate-symbol");

    var registry = Object.create(null);

    module.exports = function (SymbolPolyfill) {
      return Object.defineProperties(SymbolPolyfill, {
        for: d(function (key) {
          if (registry[key]) return registry[key];
          return (registry[key] = SymbolPolyfill(String(key)));
        }),
        keyFor: d(function (symbol) {
          var key;
          validateSymbol(symbol);
          for (key in registry) {
            if (registry[key] === symbol) return key;
          }
          return undefined;
        })
      });
    };

  }, { "../../../validate-symbol": 75, "d": 23 }], 74: [function (require, module, exports) {

    "use strict";

    var d = require("d")
      , validateSymbol = require("./validate-symbol")
      , NativeSymbol = require("ext/global-this").Symbol
      , generateName = require("./lib/private/generate-name")
      , setupStandardSymbols = require("./lib/private/setup/standard-symbols")
      , setupSymbolRegistry = require("./lib/private/setup/symbol-registry");

    var create = Object.create
      , defineProperties = Object.defineProperties
      , defineProperty = Object.defineProperty;

    var SymbolPolyfill, HiddenSymbol, isNativeSafe;

    if (typeof NativeSymbol === "function") {
      try {
        String(NativeSymbol());
        isNativeSafe = true;
      } catch (ignore) { }
    } else {
      NativeSymbol = null;
    }

    HiddenSymbol = function Symbol(description) {
      if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
      return SymbolPolyfill(description);
    };

    module.exports = SymbolPolyfill = function Symbol(description) {
      var symbol;
      if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
      if (isNativeSafe) return NativeSymbol(description);
      symbol = create(HiddenSymbol.prototype);
      description = description === undefined ? "" : String(description);
      return defineProperties(symbol, {
        __description__: d("", description),
        __name__: d("", generateName(description))
      });
    };

    setupStandardSymbols(SymbolPolyfill);
    setupSymbolRegistry(SymbolPolyfill);

    defineProperties(HiddenSymbol.prototype, {
      constructor: d(SymbolPolyfill),
      toString: d("", function () { return this.__name__; })
    });

    defineProperties(SymbolPolyfill.prototype, {
      toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
      valueOf: d(function () { return validateSymbol(this); })
    });
    defineProperty(
      SymbolPolyfill.prototype,
      SymbolPolyfill.toPrimitive,
      d("", function () {
        var symbol = validateSymbol(this);
        if (typeof symbol === "symbol") return symbol;
        return symbol.toString();
      })
    );
    defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

    defineProperty(
      HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
      d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
    );

    defineProperty(
      HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
      d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
    );

  }, { "./lib/private/generate-name": 71, "./lib/private/setup/standard-symbols": 72, "./lib/private/setup/symbol-registry": 73, "./validate-symbol": 75, "d": 23, "ext/global-this": 81 }], 75: [function (require, module, exports) {
    "use strict";

    var isSymbol = require("./is-symbol");

    module.exports = function (value) {
      if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
      return value;
    };

  }, { "./is-symbol": 70 }], 76: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? WeakMap : require("./polyfill");

  }, { "./is-implemented": 77, "./polyfill": 79 }], 77: [function (require, module, exports) {
    "use strict";

    module.exports = function () {
      var weakMap, obj;

      if (typeof WeakMap !== "function") return false;
      try {
        weakMap = new WeakMap([[obj = {}, "one"], [{}, "two"], [{}, "three"]]);
      } catch (e) {
        return false;
      }
      if (String(weakMap) !== "[object WeakMap]") return false;
      if (typeof weakMap.set !== "function") return false;
      if (weakMap.set({}, 1) !== weakMap) return false;
      if (typeof weakMap.delete !== "function") return false;
      if (typeof weakMap.has !== "function") return false;
      if (weakMap.get(obj) !== "one") return false;

      return true;
    };

  }, {}], 78: [function (require, module, exports) {

    "use strict";

    module.exports = (function () {
      if (typeof WeakMap !== "function") return false;
      return Object.prototype.toString.call(new WeakMap()) === "[object WeakMap]";
    }());

  }, {}], 79: [function (require, module, exports) {
    "use strict";

    var isValue = require("es5-ext/object/is-value")
      , setPrototypeOf = require("es5-ext/object/set-prototype-of")
      , object = require("es5-ext/object/valid-object")
      , ensureValue = require("es5-ext/object/valid-value")
      , randomUniq = require("es5-ext/string/random-uniq")
      , d = require("d")
      , getIterator = require("es6-iterator/get")
      , forOf = require("es6-iterator/for-of")
      , toStringTagSymbol = require("es6-symbol").toStringTag
      , isNative = require("./is-native-implemented")

      , isArray = Array.isArray, defineProperty = Object.defineProperty
      , objHasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
      , WeakMapPoly;

    module.exports = WeakMapPoly = function () {
      var iterable = arguments[0], self;

      if (!(this instanceof WeakMapPoly)) throw new TypeError("Constructor requires 'new'");
      self = isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)
        ? setPrototypeOf(new WeakMap(), getPrototypeOf(this)) : this;

      if (isValue(iterable)) {
        if (!isArray(iterable)) iterable = getIterator(iterable);
      }
      defineProperty(self, "__weakMapData__", d("c", "$weakMap$" + randomUniq()));
      if (!iterable) return self;
      forOf(iterable, function (val) {
        ensureValue(val);
        self.set(val[0], val[1]);
      });
      return self;
    };

    if (isNative) {
      if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
      WeakMapPoly.prototype = Object.create(WeakMap.prototype, { constructor: d(WeakMapPoly) });
    }

    Object.defineProperties(WeakMapPoly.prototype, {
      delete: d(function (key) {
        if (objHasOwnProperty.call(object(key), this.__weakMapData__)) {
          delete key[this.__weakMapData__];
          return true;
        }
        return false;
      }),
      get: d(function (key) {
        if (!objHasOwnProperty.call(object(key), this.__weakMapData__)) return undefined;
        return key[this.__weakMapData__];
      }),
      has: d(function (key) {
        return objHasOwnProperty.call(object(key), this.__weakMapData__);
      }),
      set: d(function (key, value) {
        defineProperty(object(key), this.__weakMapData__, d("c", value));
        return this;
      }),
      toString: d(function () {
        return "[object WeakMap]";
      })
    });
    defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d("c", "WeakMap"));

  }, { "./is-native-implemented": 78, "d": 23, "es5-ext/object/is-value": 44, "es5-ext/object/set-prototype-of": 50, "es5-ext/object/valid-object": 54, "es5-ext/object/valid-value": 55, "es5-ext/string/random-uniq": 60, "es6-iterator/for-of": 62, "es6-iterator/get": 63, "es6-symbol": 68 }], 80: [function (require, module, exports) {
    var naiveFallback = function () {
      if (typeof self === "object" && self) return self;
      if (typeof window === "object" && window) return window;
      throw new Error("Unable to resolve global `this`");
    };

    module.exports = (function () {
      if (this) return this;


      try {
        Object.defineProperty(Object.prototype, "__global__", {
          get: function () { return this; },
          configurable: true
        });
      } catch (error) {
        return naiveFallback();
      }
      try {
        if (!__global__) return naiveFallback();
        return __global__;
      } finally {
        delete Object.prototype.__global__;
      }
    })();

  }, {}], 81: [function (require, module, exports) {
    "use strict";

    module.exports = require("./is-implemented")() ? globalThis : require("./implementation");

  }, { "./implementation": 80, "./is-implemented": 82 }], 82: [function (require, module, exports) {
    "use strict";

    module.exports = function () {
      if (typeof globalThis !== "object") return false;
      if (!globalThis) return false;
      return globalThis.Array === Array;
    };

  }, {}], 83: [function (require, module, exports) {
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m
      var eLen = (nBytes * 8) - mLen - 1
      var eMax = (1 << eLen) - 1
      var eBias = eMax >> 1
      var nBits = -7
      var i = isLE ? (nBytes - 1) : 0
      var d = isLE ? -1 : 1
      var s = buffer[offset + i]

      i += d

      e = s & ((1 << (-nBits)) - 1)
      s >>= (-nBits)
      nBits += eLen
      for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) { }

      m = e & ((1 << (-nBits)) - 1)
      e >>= (-nBits)
      nBits += mLen
      for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) { }

      if (e === 0) {
        e = 1 - eBias
      } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity)
      } else {
        m = m + Math.pow(2, mLen)
        e = e - eBias
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
    }

    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c
      var eLen = (nBytes * 8) - mLen - 1
      var eMax = (1 << eLen) - 1
      var eBias = eMax >> 1
      var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
      var i = isLE ? 0 : (nBytes - 1)
      var d = isLE ? 1 : -1
      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

      value = Math.abs(value)

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0
        e = eMax
      } else {
        e = Math.floor(Math.log(value) / Math.LN2)
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--
          c *= 2
        }
        if (e + eBias >= 1) {
          value += rt / c
        } else {
          value += rt * Math.pow(2, 1 - eBias)
        }
        if (value * c >= 2) {
          e++
          c /= 2
        }

        if (e + eBias >= eMax) {
          m = 0
          e = eMax
        } else if (e + eBias >= 1) {
          m = ((value * c) - 1) * Math.pow(2, mLen)
          e = e + eBias
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
          e = 0
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) { }

      e = (e << mLen) | m
      eLen += mLen
      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) { }

      buffer[offset + i - d] |= s * 128
    }

  }, {}], 84: [function (require, module, exports) {

    (function (global) {
      "use strict";

      var Logger = {};

      Logger.VERSION = "1.6.0";

      var logHandler;

      var contextualLoggersByNameMap = {};

      var bind = function (scope, func) {
        return function () {
          return func.apply(scope, arguments);
        };
      };

      var merge = function () {
        var args = arguments, target = args[0], key, i;
        for (i = 1; i < args.length; i++) {
          for (key in args[i]) {
            if (!(key in target) && args[i].hasOwnProperty(key)) {
              target[key] = args[i][key];
            }
          }
        }
        return target;
      };

      var defineLogLevel = function (value, name) {
        return { value: value, name: name };
      };

      Logger.TRACE = defineLogLevel(1, 'TRACE');
      Logger.DEBUG = defineLogLevel(2, 'DEBUG');
      Logger.INFO = defineLogLevel(3, 'INFO');
      Logger.TIME = defineLogLevel(4, 'TIME');
      Logger.WARN = defineLogLevel(5, 'WARN');
      Logger.ERROR = defineLogLevel(8, 'ERROR');
      Logger.OFF = defineLogLevel(99, 'OFF');

      var ContextualLogger = function (defaultContext) {
        this.context = defaultContext;
        this.setLevel(defaultContext.filterLevel);
        this.log = this.info;
      };

      ContextualLogger.prototype = {
        setLevel: function (newLevel) {
          if (newLevel && "value" in newLevel) {
            this.context.filterLevel = newLevel;
          }
        },

        getLevel: function () {
          return this.context.filterLevel;
        },

        enabledFor: function (lvl) {
          var filterLevel = this.context.filterLevel;
          return lvl.value >= filterLevel.value;
        },

        trace: function () {
          this.invoke(Logger.TRACE, arguments);
        },

        debug: function () {
          this.invoke(Logger.DEBUG, arguments);
        },

        info: function () {
          this.invoke(Logger.INFO, arguments);
        },

        warn: function () {
          this.invoke(Logger.WARN, arguments);
        },

        error: function () {
          this.invoke(Logger.ERROR, arguments);
        },

        time: function (label) {
          if (typeof label === 'string' && label.length > 0) {
            this.invoke(Logger.TIME, [label, 'start']);
          }
        },

        timeEnd: function (label) {
          if (typeof label === 'string' && label.length > 0) {
            this.invoke(Logger.TIME, [label, 'end']);
          }
        },

        invoke: function (level, msgArgs) {
          if (logHandler && this.enabledFor(level)) {
            logHandler(msgArgs, merge({ level: level }, this.context));
          }
        }
      };

      var globalLogger = new ContextualLogger({ filterLevel: Logger.OFF });

      (function () {
        var L = Logger;

        L.enabledFor = bind(globalLogger, globalLogger.enabledFor);
        L.trace = bind(globalLogger, globalLogger.trace);
        L.debug = bind(globalLogger, globalLogger.debug);
        L.time = bind(globalLogger, globalLogger.time);
        L.timeEnd = bind(globalLogger, globalLogger.timeEnd);
        L.info = bind(globalLogger, globalLogger.info);
        L.warn = bind(globalLogger, globalLogger.warn);
        L.error = bind(globalLogger, globalLogger.error);

        L.log = L.info;
      }());

      Logger.setHandler = function (func) {
        logHandler = func;
      };

      Logger.setLevel = function (level) {
        globalLogger.setLevel(level);

        for (var key in contextualLoggersByNameMap) {
          if (contextualLoggersByNameMap.hasOwnProperty(key)) {
            contextualLoggersByNameMap[key].setLevel(level);
          }
        }
      };

      Logger.getLevel = function () {
        return globalLogger.getLevel();
      };

      Logger.get = function (name) {
        return contextualLoggersByNameMap[name] ||
          (contextualLoggersByNameMap[name] = new ContextualLogger(merge({ name: name }, globalLogger.context)));
      };

      Logger.createDefaultHandler = function (options) {
        options = options || {};

        options.formatter = options.formatter || function defaultMessageFormatter(messages, context) {
          if (context.name) {
            messages.unshift("[" + context.name + "]");
          }
        };

        var timerStartTimeByLabelMap = {};

        var invokeConsoleMethod = function (hdlr, messages) {
          Function.prototype.apply.call(hdlr, console, messages);
        };

        if (typeof console === "undefined") {
          return function () { };
        }

        return function (messages, context) {
          messages = Array.prototype.slice.call(messages);

          var hdlr = console.log;
          var timerLabel;

          if (context.level === Logger.TIME) {
            timerLabel = (context.name ? '[' + context.name + '] ' : '') + messages[0];

            if (messages[1] === 'start') {
              if (console.time) {
                console.time(timerLabel);
              }
              else {
                timerStartTimeByLabelMap[timerLabel] = new Date().getTime();
              }
            }
            else {
              if (console.timeEnd) {
                console.timeEnd(timerLabel);
              }
              else {
                invokeConsoleMethod(hdlr, [timerLabel + ': ' +
                  (new Date().getTime() - timerStartTimeByLabelMap[timerLabel]) + 'ms']);
              }
            }
          }
          else {
            if (context.level === Logger.WARN && console.warn) {
              hdlr = console.warn;
            } else if (context.level === Logger.ERROR && console.error) {
              hdlr = console.error;
            } else if (context.level === Logger.INFO && console.info) {
              hdlr = console.info;
            } else if (context.level === Logger.DEBUG && console.debug) {
              hdlr = console.debug;
            } else if (context.level === Logger.TRACE && console.trace) {
              hdlr = console.trace;
            }

            options.formatter(messages, context);
            invokeConsoleMethod(hdlr, messages);
          }
        };
      };

      Logger.useDefaults = function (options) {
        Logger.setLevel(options && options.defaultLevel || Logger.DEBUG);
        Logger.setHandler(Logger.createDefaultHandler(options));
      };

      if (typeof define === 'function' && define.amd) {
        define(Logger);
      }
      else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Logger;
      }
      else {
        Logger._prevLogger = global.Logger;

        Logger.noConflict = function () {
          global.Logger = Logger._prevLogger;
          return Logger;
        };

        global.Logger = Logger;
      }
    }(this));

  }, {}], 85: [function (require, module, exports) {
    'use strict';

    var SDPUtils = require('sdp');

    function fixStatsType(stat) {
      return {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
      }[stat.type] || stat.type;
    }

    function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
      var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

      sdp += SDPUtils.writeIceParameters(
        transceiver.iceGatherer.getLocalParameters());

      sdp += SDPUtils.writeDtlsParameters(
        transceiver.dtlsTransport.getLocalParameters(),
        type === 'offer' ? 'actpass' : dtlsRole || 'active');

      sdp += 'a=mid:' + transceiver.mid + '\r\n';

      if (transceiver.rtpSender && transceiver.rtpReceiver) {
        sdp += 'a=sendrecv\r\n';
      } else if (transceiver.rtpSender) {
        sdp += 'a=sendonly\r\n';
      } else if (transceiver.rtpReceiver) {
        sdp += 'a=recvonly\r\n';
      } else {
        sdp += 'a=inactive\r\n';
      }

      if (transceiver.rtpSender) {
        var trackId = transceiver.rtpSender._initialTrackId ||
          transceiver.rtpSender.track.id;
        transceiver.rtpSender._initialTrackId = trackId;
        var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
          trackId + '\r\n';
        sdp += 'a=' + msid;
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' ' + msid;

        if (transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' ' + msid;
          sdp += 'a=ssrc-group:FID ' +
            transceiver.sendEncodingParameters[0].ssrc + ' ' +
            transceiver.sendEncodingParameters[0].rtx.ssrc +
            '\r\n';
        }
      }
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
      if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
      }
      return sdp;
    }

    function filterIceServers(iceServers, edgeVersion) {
      var hasTurn = false;
      iceServers = JSON.parse(JSON.stringify(iceServers));
      return iceServers.filter(function (server) {
        if (server && (server.urls || server.url)) {
          var urls = server.urls || server.url;
          if (server.url && !server.urls) {
            console.warn('RTCIceServer.url is deprecated! Use urls instead.');
          }
          var isString = typeof urls === 'string';
          if (isString) {
            urls = [urls];
          }
          urls = urls.filter(function (url) {
            var validTurn = url.indexOf('turn:') === 0 &&
              url.indexOf('transport=udp') !== -1 &&
              url.indexOf('turn:[') === -1 &&
              !hasTurn;

            if (validTurn) {
              hasTurn = true;
              return true;
            }
            return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
              url.indexOf('?transport=udp') === -1;
          });

          delete server.url;
          server.urls = isString ? urls[0] : urls;
          return !!urls.length;
        }
      });
    }

    function getCommonCapabilities(localCapabilities, remoteCapabilities) {
      var commonCapabilities = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: []
      };

      var findCodecByPayloadType = function (pt, codecs) {
        pt = parseInt(pt, 10);
        for (var i = 0; i < codecs.length; i++) {
          if (codecs[i].payloadType === pt ||
            codecs[i].preferredPayloadType === pt) {
            return codecs[i];
          }
        }
      };

      var rtxCapabilityMatches = function (lRtx, rRtx, lCodecs, rCodecs) {
        var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
        var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
        return lCodec && rCodec &&
          lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
      };

      localCapabilities.codecs.forEach(function (lCodec) {
        for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
          var rCodec = remoteCapabilities.codecs[i];
          if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
            lCodec.clockRate === rCodec.clockRate) {
            if (lCodec.name.toLowerCase() === 'rtx' &&
              lCodec.parameters && rCodec.parameters.apt) {
              if (!rtxCapabilityMatches(lCodec, rCodec,
                localCapabilities.codecs, remoteCapabilities.codecs)) {
                continue;
              }
            }
            rCodec = JSON.parse(JSON.stringify(rCodec));
            rCodec.numChannels = Math.min(lCodec.numChannels,
              rCodec.numChannels);
            commonCapabilities.codecs.push(rCodec);

            rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
              for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                if (lCodec.rtcpFeedback[j].type === fb.type &&
                  lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                  return true;
                }
              }
              return false;
            });
            break;
          }
        }
      });

      localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
        for (var i = 0; i < remoteCapabilities.headerExtensions.length;
          i++) {
          var rHeaderExtension = remoteCapabilities.headerExtensions[i];
          if (lHeaderExtension.uri === rHeaderExtension.uri) {
            commonCapabilities.headerExtensions.push(rHeaderExtension);
            break;
          }
        }
      });

      return commonCapabilities;
    }

    function isActionAllowedInSignalingState(action, type, signalingState) {
      return {
        offer: {
          setLocalDescription: ['stable', 'have-local-offer'],
          setRemoteDescription: ['stable', 'have-remote-offer']
        },
        answer: {
          setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
          setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
        }
      }[type][action].indexOf(signalingState) !== -1;
    }

    function maybeAddCandidate(iceTransport, candidate) {
      var alreadyAdded = iceTransport.getRemoteCandidates()
        .find(function (remoteCandidate) {
          return candidate.foundation === remoteCandidate.foundation &&
            candidate.ip === remoteCandidate.ip &&
            candidate.port === remoteCandidate.port &&
            candidate.priority === remoteCandidate.priority &&
            candidate.protocol === remoteCandidate.protocol &&
            candidate.type === remoteCandidate.type;
        });
      if (!alreadyAdded) {
        iceTransport.addRemoteCandidate(candidate);
      }
      return !alreadyAdded;
    }


    function makeError(name, description) {
      var e = new Error(description);
      e.name = name;
      e.code = {
        NotSupportedError: 9,
        InvalidStateError: 11,
        InvalidAccessError: 15,
        TypeError: undefined,
        OperationError: undefined
      }[name];
      return e;
    }

    module.exports = function (window, edgeVersion) {
      function addTrackToStreamAndFireEvent(track, stream) {
        stream.addTrack(track);
        stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
          { track: track }));
      }

      function removeTrackFromStreamAndFireEvent(track, stream) {
        stream.removeTrack(track);
        stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
          { track: track }));
      }

      function fireAddTrack(pc, track, receiver, streams) {
        var trackEvent = new Event('track');
        trackEvent.track = track;
        trackEvent.receiver = receiver;
        trackEvent.transceiver = { receiver: receiver };
        trackEvent.streams = streams;
        window.setTimeout(function () {
          pc._dispatchEvent('track', trackEvent);
        });
      }

      var RTCPeerConnection = function (config) {
        var pc = this;

        var _eventTarget = document.createDocumentFragment();
        ['addEventListener', 'removeEventListener', 'dispatchEvent']
          .forEach(function (method) {
            pc[method] = _eventTarget[method].bind(_eventTarget);
          });

        this.canTrickleIceCandidates = null;

        this.needNegotiation = false;

        this.localStreams = [];
        this.remoteStreams = [];

        this._localDescription = null;
        this._remoteDescription = null;

        this.signalingState = 'stable';
        this.iceConnectionState = 'new';
        this.connectionState = 'new';
        this.iceGatheringState = 'new';

        config = JSON.parse(JSON.stringify(config || {}));

        this.usingBundle = config.bundlePolicy === 'max-bundle';
        if (config.rtcpMuxPolicy === 'negotiate') {
          throw (makeError('NotSupportedError',
            'rtcpMuxPolicy \'negotiate\' is not supported'));
        } else if (!config.rtcpMuxPolicy) {
          config.rtcpMuxPolicy = 'require';
        }

        switch (config.iceTransportPolicy) {
          case 'all':
          case 'relay':
            break;
          default:
            config.iceTransportPolicy = 'all';
            break;
        }

        switch (config.bundlePolicy) {
          case 'balanced':
          case 'max-compat':
          case 'max-bundle':
            break;
          default:
            config.bundlePolicy = 'balanced';
            break;
        }

        config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

        this._iceGatherers = [];
        if (config.iceCandidatePoolSize) {
          for (var i = config.iceCandidatePoolSize; i > 0; i--) {
            this._iceGatherers.push(new window.RTCIceGatherer({
              iceServers: config.iceServers,
              gatherPolicy: config.iceTransportPolicy
            }));
          }
        } else {
          config.iceCandidatePoolSize = 0;
        }

        this._config = config;

        this.transceivers = [];

        this._sdpSessionId = SDPUtils.generateSessionId();
        this._sdpSessionVersion = 0;

        this._dtlsRole = undefined;

        this._isClosed = false;
      };

      Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
        configurable: true,
        get: function () {
          return this._localDescription;
        }
      });
      Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
        configurable: true,
        get: function () {
          return this._remoteDescription;
        }
      });

      RTCPeerConnection.prototype.onicecandidate = null;
      RTCPeerConnection.prototype.onaddstream = null;
      RTCPeerConnection.prototype.ontrack = null;
      RTCPeerConnection.prototype.onremovestream = null;
      RTCPeerConnection.prototype.onsignalingstatechange = null;
      RTCPeerConnection.prototype.oniceconnectionstatechange = null;
      RTCPeerConnection.prototype.onconnectionstatechange = null;
      RTCPeerConnection.prototype.onicegatheringstatechange = null;
      RTCPeerConnection.prototype.onnegotiationneeded = null;
      RTCPeerConnection.prototype.ondatachannel = null;

      RTCPeerConnection.prototype._dispatchEvent = function (name, event) {
        if (this._isClosed) {
          return;
        }
        this.dispatchEvent(event);
        if (typeof this['on' + name] === 'function') {
          this['on' + name](event);
        }
      };

      RTCPeerConnection.prototype._emitGatheringStateChange = function () {
        var event = new Event('icegatheringstatechange');
        this._dispatchEvent('icegatheringstatechange', event);
      };

      RTCPeerConnection.prototype.getConfiguration = function () {
        return this._config;
      };

      RTCPeerConnection.prototype.getLocalStreams = function () {
        return this.localStreams;
      };

      RTCPeerConnection.prototype.getRemoteStreams = function () {
        return this.remoteStreams;
      };

      RTCPeerConnection.prototype._createTransceiver = function (kind, doNotAdd) {
        var hasBundleTransport = this.transceivers.length > 0;
        var transceiver = {
          track: null,
          iceGatherer: null,
          iceTransport: null,
          dtlsTransport: null,
          localCapabilities: null,
          remoteCapabilities: null,
          rtpSender: null,
          rtpReceiver: null,
          kind: kind,
          mid: null,
          sendEncodingParameters: null,
          recvEncodingParameters: null,
          stream: null,
          associatedRemoteMediaStreams: [],
          wantReceive: true
        };
        if (this.usingBundle && hasBundleTransport) {
          transceiver.iceTransport = this.transceivers[0].iceTransport;
          transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
        } else {
          var transports = this._createIceAndDtlsTransports();
          transceiver.iceTransport = transports.iceTransport;
          transceiver.dtlsTransport = transports.dtlsTransport;
        }
        if (!doNotAdd) {
          this.transceivers.push(transceiver);
        }
        return transceiver;
      };

      RTCPeerConnection.prototype.addTrack = function (track, stream) {
        if (this._isClosed) {
          throw makeError('InvalidStateError',
            'Attempted to call addTrack on a closed peerconnection.');
        }

        var alreadyExists = this.transceivers.find(function (s) {
          return s.track === track;
        });

        if (alreadyExists) {
          throw makeError('InvalidAccessError', 'Track already exists.');
        }

        var transceiver;
        for (var i = 0; i < this.transceivers.length; i++) {
          if (!this.transceivers[i].track &&
            this.transceivers[i].kind === track.kind) {
            transceiver = this.transceivers[i];
          }
        }
        if (!transceiver) {
          transceiver = this._createTransceiver(track.kind);
        }

        this._maybeFireNegotiationNeeded();

        if (this.localStreams.indexOf(stream) === -1) {
          this.localStreams.push(stream);
        }

        transceiver.track = track;
        transceiver.stream = stream;
        transceiver.rtpSender = new window.RTCRtpSender(track,
          transceiver.dtlsTransport);
        return transceiver.rtpSender;
      };

      RTCPeerConnection.prototype.addStream = function (stream) {
        var pc = this;
        if (edgeVersion >= 15025) {
          stream.getTracks().forEach(function (track) {
            pc.addTrack(track, stream);
          });
        } else {
          var clonedStream = stream.clone();
          stream.getTracks().forEach(function (track, idx) {
            var clonedTrack = clonedStream.getTracks()[idx];
            track.addEventListener('enabled', function (event) {
              clonedTrack.enabled = event.enabled;
            });
          });
          clonedStream.getTracks().forEach(function (track) {
            pc.addTrack(track, clonedStream);
          });
        }
      };

      RTCPeerConnection.prototype.removeTrack = function (sender) {
        if (this._isClosed) {
          throw makeError('InvalidStateError',
            'Attempted to call removeTrack on a closed peerconnection.');
        }

        if (!(sender instanceof window.RTCRtpSender)) {
          throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
            'does not implement interface RTCRtpSender.');
        }

        var transceiver = this.transceivers.find(function (t) {
          return t.rtpSender === sender;
        });

        if (!transceiver) {
          throw makeError('InvalidAccessError',
            'Sender was not created by this connection.');
        }
        var stream = transceiver.stream;

        transceiver.rtpSender.stop();
        transceiver.rtpSender = null;
        transceiver.track = null;
        transceiver.stream = null;

        var localStreams = this.transceivers.map(function (t) {
          return t.stream;
        });
        if (localStreams.indexOf(stream) === -1 &&
          this.localStreams.indexOf(stream) > -1) {
          this.localStreams.splice(this.localStreams.indexOf(stream), 1);
        }

        this._maybeFireNegotiationNeeded();
      };

      RTCPeerConnection.prototype.removeStream = function (stream) {
        var pc = this;
        stream.getTracks().forEach(function (track) {
          var sender = pc.getSenders().find(function (s) {
            return s.track === track;
          });
          if (sender) {
            pc.removeTrack(sender);
          }
        });
      };

      RTCPeerConnection.prototype.getSenders = function () {
        return this.transceivers.filter(function (transceiver) {
          return !!transceiver.rtpSender;
        })
          .map(function (transceiver) {
            return transceiver.rtpSender;
          });
      };

      RTCPeerConnection.prototype.getReceivers = function () {
        return this.transceivers.filter(function (transceiver) {
          return !!transceiver.rtpReceiver;
        })
          .map(function (transceiver) {
            return transceiver.rtpReceiver;
          });
      };


      RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex,
        usingBundle) {
        var pc = this;
        if (usingBundle && sdpMLineIndex > 0) {
          return this.transceivers[0].iceGatherer;
        } else if (this._iceGatherers.length) {
          return this._iceGatherers.shift();
        }
        var iceGatherer = new window.RTCIceGatherer({
          iceServers: this._config.iceServers,
          gatherPolicy: this._config.iceTransportPolicy
        });
        Object.defineProperty(iceGatherer, 'state',
          { value: 'new', writable: true }
        );

        this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
        this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
          var end = !event.candidate || Object.keys(event.candidate).length === 0;
          iceGatherer.state = end ? 'completed' : 'gathering';
          if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
            pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
          }
        };
        iceGatherer.addEventListener('localcandidate',
          this.transceivers[sdpMLineIndex].bufferCandidates);
        return iceGatherer;
      };

      RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
        var pc = this;
        var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
        if (iceGatherer.onlocalcandidate) {
          return;
        }
        var bufferedCandidateEvents =
          this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
        this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
        iceGatherer.removeEventListener('localcandidate',
          this.transceivers[sdpMLineIndex].bufferCandidates);
        iceGatherer.onlocalcandidate = function (evt) {
          if (pc.usingBundle && sdpMLineIndex > 0) {
            return;
          }
          var event = new Event('icecandidate');
          event.candidate = { sdpMid: mid, sdpMLineIndex: sdpMLineIndex };

          var cand = evt.candidate;
          var end = !cand || Object.keys(cand).length === 0;
          if (end) {
            if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
              iceGatherer.state = 'completed';
            }
          } else {
            if (iceGatherer.state === 'new') {
              iceGatherer.state = 'gathering';
            }
            cand.component = 1;
            cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

            var serializedCandidate = SDPUtils.writeCandidate(cand);
            event.candidate = Object.assign(event.candidate,
              SDPUtils.parseCandidate(serializedCandidate));

            event.candidate.candidate = serializedCandidate;
            event.candidate.toJSON = function () {
              return {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                usernameFragment: event.candidate.usernameFragment
              };
            };
          }

          var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
          if (!end) {
            sections[event.candidate.sdpMLineIndex] +=
              'a=' + event.candidate.candidate + '\r\n';
          } else {
            sections[event.candidate.sdpMLineIndex] +=
              'a=end-of-candidates\r\n';
          }
          pc._localDescription.sdp =
            SDPUtils.getDescription(pc._localDescription.sdp) +
            sections.join('');
          var complete = pc.transceivers.every(function (transceiver) {
            return transceiver.iceGatherer &&
              transceiver.iceGatherer.state === 'completed';
          });

          if (pc.iceGatheringState !== 'gathering') {
            pc.iceGatheringState = 'gathering';
            pc._emitGatheringStateChange();
          }

          if (!end) {
            pc._dispatchEvent('icecandidate', event);
          }
          if (complete) {
            pc._dispatchEvent('icecandidate', new Event('icecandidate'));
            pc.iceGatheringState = 'complete';
            pc._emitGatheringStateChange();
          }
        };

        window.setTimeout(function () {
          bufferedCandidateEvents.forEach(function (e) {
            iceGatherer.onlocalcandidate(e);
          });
        }, 0);
      };

      RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
        var pc = this;
        var iceTransport = new window.RTCIceTransport(null);
        iceTransport.onicestatechange = function () {
          pc._updateIceConnectionState();
          pc._updateConnectionState();
        };

        var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
        dtlsTransport.ondtlsstatechange = function () {
          pc._updateConnectionState();
        };
        dtlsTransport.onerror = function () {
          Object.defineProperty(dtlsTransport, 'state',
            { value: 'failed', writable: true });
          pc._updateConnectionState();
        };

        return {
          iceTransport: iceTransport,
          dtlsTransport: dtlsTransport
        };
      };

      RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (
        sdpMLineIndex) {
        var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
        if (iceGatherer) {
          delete iceGatherer.onlocalcandidate;
          delete this.transceivers[sdpMLineIndex].iceGatherer;
        }
        var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
        if (iceTransport) {
          delete iceTransport.onicestatechange;
          delete this.transceivers[sdpMLineIndex].iceTransport;
        }
        var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
        if (dtlsTransport) {
          delete dtlsTransport.ondtlsstatechange;
          delete dtlsTransport.onerror;
          delete this.transceivers[sdpMLineIndex].dtlsTransport;
        }
      };

      RTCPeerConnection.prototype._transceive = function (transceiver,
        send, recv) {
        var params = getCommonCapabilities(transceiver.localCapabilities,
          transceiver.remoteCapabilities);
        if (send && transceiver.rtpSender) {
          params.encodings = transceiver.sendEncodingParameters;
          params.rtcp = {
            cname: SDPUtils.localCName,
            compound: transceiver.rtcpParameters.compound
          };
          if (transceiver.recvEncodingParameters.length) {
            params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
          }
          transceiver.rtpSender.send(params);
        }
        if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
          if (transceiver.kind === 'video'
            && transceiver.recvEncodingParameters
            && edgeVersion < 15019) {
            transceiver.recvEncodingParameters.forEach(function (p) {
              delete p.rtx;
            });
          }
          if (transceiver.recvEncodingParameters.length) {
            params.encodings = transceiver.recvEncodingParameters;
          } else {
            params.encodings = [{}];
          }
          params.rtcp = {
            compound: transceiver.rtcpParameters.compound
          };
          if (transceiver.rtcpParameters.cname) {
            params.rtcp.cname = transceiver.rtcpParameters.cname;
          }
          if (transceiver.sendEncodingParameters.length) {
            params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
          }
          transceiver.rtpReceiver.receive(params);
        }
      };

      RTCPeerConnection.prototype.setLocalDescription = function (description) {
        var pc = this;

        if (['offer', 'answer'].indexOf(description.type) === -1) {
          return Promise.reject(makeError('TypeError',
            'Unsupported type "' + description.type + '"'));
        }

        if (!isActionAllowedInSignalingState('setLocalDescription',
          description.type, pc.signalingState) || pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
            'Can not set local ' + description.type +
            ' in state ' + pc.signalingState));
        }

        var sections;
        var sessionpart;
        if (description.type === 'offer') {
          sections = SDPUtils.splitSections(description.sdp);
          sessionpart = sections.shift();
          sections.forEach(function (mediaSection, sdpMLineIndex) {
            var caps = SDPUtils.parseRtpParameters(mediaSection);
            pc.transceivers[sdpMLineIndex].localCapabilities = caps;
          });

          pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
            pc._gather(transceiver.mid, sdpMLineIndex);
          });
        } else if (description.type === 'answer') {
          sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
          sessionpart = sections.shift();
          var isIceLite = SDPUtils.matchPrefix(sessionpart,
            'a=ice-lite').length > 0;
          sections.forEach(function (mediaSection, sdpMLineIndex) {
            var transceiver = pc.transceivers[sdpMLineIndex];
            var iceGatherer = transceiver.iceGatherer;
            var iceTransport = transceiver.iceTransport;
            var dtlsTransport = transceiver.dtlsTransport;
            var localCapabilities = transceiver.localCapabilities;
            var remoteCapabilities = transceiver.remoteCapabilities;

            var rejected = SDPUtils.isRejected(mediaSection) &&
              SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

            if (!rejected && !transceiver.rejected) {
              var remoteIceParameters = SDPUtils.getIceParameters(
                mediaSection, sessionpart);
              var remoteDtlsParameters = SDPUtils.getDtlsParameters(
                mediaSection, sessionpart);
              if (isIceLite) {
                remoteDtlsParameters.role = 'server';
              }

              if (!pc.usingBundle || sdpMLineIndex === 0) {
                pc._gather(transceiver.mid, sdpMLineIndex);
                if (iceTransport.state === 'new') {
                  iceTransport.start(iceGatherer, remoteIceParameters,
                    isIceLite ? 'controlling' : 'controlled');
                }
                if (dtlsTransport.state === 'new') {
                  dtlsTransport.start(remoteDtlsParameters);
                }
              }

              var params = getCommonCapabilities(localCapabilities,
                remoteCapabilities);

              pc._transceive(transceiver,
                params.codecs.length > 0,
                false);
            }
          });
        }

        pc._localDescription = {
          type: description.type,
          sdp: description.sdp
        };
        if (description.type === 'offer') {
          pc._updateSignalingState('have-local-offer');
        } else {
          pc._updateSignalingState('stable');
        }

        return Promise.resolve();
      };

      RTCPeerConnection.prototype.setRemoteDescription = function (description) {
        var pc = this;

        if (['offer', 'answer'].indexOf(description.type) === -1) {
          return Promise.reject(makeError('TypeError',
            'Unsupported type "' + description.type + '"'));
        }

        if (!isActionAllowedInSignalingState('setRemoteDescription',
          description.type, pc.signalingState) || pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
            'Can not set remote ' + description.type +
            ' in state ' + pc.signalingState));
        }

        var streams = {};
        pc.remoteStreams.forEach(function (stream) {
          streams[stream.id] = stream;
        });
        var receiverList = [];
        var sections = SDPUtils.splitSections(description.sdp);
        var sessionpart = sections.shift();
        var isIceLite = SDPUtils.matchPrefix(sessionpart,
          'a=ice-lite').length > 0;
        var usingBundle = SDPUtils.matchPrefix(sessionpart,
          'a=group:BUNDLE ').length > 0;
        pc.usingBundle = usingBundle;
        var iceOptions = SDPUtils.matchPrefix(sessionpart,
          'a=ice-options:')[0];
        if (iceOptions) {
          pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
            .indexOf('trickle') >= 0;
        } else {
          pc.canTrickleIceCandidates = false;
        }

        sections.forEach(function (mediaSection, sdpMLineIndex) {
          var lines = SDPUtils.splitLines(mediaSection);
          var kind = SDPUtils.getKind(mediaSection);
          var rejected = SDPUtils.isRejected(mediaSection) &&
            SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
          var protocol = lines[0].substr(2).split(' ')[2];

          var direction = SDPUtils.getDirection(mediaSection, sessionpart);
          var remoteMsid = SDPUtils.parseMsid(mediaSection);

          var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

          if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
            protocol === 'UDP/DTLS/SCTP'))) {
            pc.transceivers[sdpMLineIndex] = {
              mid: mid,
              kind: kind,
              protocol: protocol,
              rejected: true
            };
            return;
          }

          if (!rejected && pc.transceivers[sdpMLineIndex] &&
            pc.transceivers[sdpMLineIndex].rejected) {
            pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
          }

          var transceiver;
          var iceGatherer;
          var iceTransport;
          var dtlsTransport;
          var rtpReceiver;
          var sendEncodingParameters;
          var recvEncodingParameters;
          var localCapabilities;

          var track;
          var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
          var remoteIceParameters;
          var remoteDtlsParameters;
          if (!rejected) {
            remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
              sessionpart);
            remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
              sessionpart);
            remoteDtlsParameters.role = 'client';
          }
          recvEncodingParameters =
            SDPUtils.parseRtpEncodingParameters(mediaSection);

          var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

          var isComplete = SDPUtils.matchPrefix(mediaSection,
            'a=end-of-candidates', sessionpart).length > 0;
          var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
            .map(function (cand) {
              return SDPUtils.parseCandidate(cand);
            })
            .filter(function (cand) {
              return cand.component === 1;
            });

          if ((description.type === 'offer' || description.type === 'answer') &&
            !rejected && usingBundle && sdpMLineIndex > 0 &&
            pc.transceivers[sdpMLineIndex]) {
            pc._disposeIceAndDtlsTransports(sdpMLineIndex);
            pc.transceivers[sdpMLineIndex].iceGatherer =
              pc.transceivers[0].iceGatherer;
            pc.transceivers[sdpMLineIndex].iceTransport =
              pc.transceivers[0].iceTransport;
            pc.transceivers[sdpMLineIndex].dtlsTransport =
              pc.transceivers[0].dtlsTransport;
            if (pc.transceivers[sdpMLineIndex].rtpSender) {
              pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                pc.transceivers[0].dtlsTransport);
            }
            if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
              pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                pc.transceivers[0].dtlsTransport);
            }
          }
          if (description.type === 'offer' && !rejected) {
            transceiver = pc.transceivers[sdpMLineIndex] ||
              pc._createTransceiver(kind);
            transceiver.mid = mid;

            if (!transceiver.iceGatherer) {
              transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                usingBundle);
            }

            if (cands.length && transceiver.iceTransport.state === 'new') {
              if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                transceiver.iceTransport.setRemoteCandidates(cands);
              } else {
                cands.forEach(function (candidate) {
                  maybeAddCandidate(transceiver.iceTransport, candidate);
                });
              }
            }

            localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

            if (edgeVersion < 15019) {
              localCapabilities.codecs = localCapabilities.codecs.filter(
                function (codec) {
                  return codec.name !== 'rtx';
                });
            }

            sendEncodingParameters = transceiver.sendEncodingParameters || [{
              ssrc: (2 * sdpMLineIndex + 2) * 1001
            }];

            var isNewTrack = false;
            if (direction === 'sendrecv' || direction === 'sendonly') {
              isNewTrack = !transceiver.rtpReceiver;
              rtpReceiver = transceiver.rtpReceiver ||
                new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

              if (isNewTrack) {
                var stream;
                track = rtpReceiver.track;
                if (remoteMsid && remoteMsid.stream === '-') {
                } else if (remoteMsid) {
                  if (!streams[remoteMsid.stream]) {
                    streams[remoteMsid.stream] = new window.MediaStream();
                    Object.defineProperty(streams[remoteMsid.stream], 'id', {
                      get: function () {
                        return remoteMsid.stream;
                      }
                    });
                  }
                  Object.defineProperty(track, 'id', {
                    get: function () {
                      return remoteMsid.track;
                    }
                  });
                  stream = streams[remoteMsid.stream];
                } else {
                  if (!streams.default) {
                    streams.default = new window.MediaStream();
                  }
                  stream = streams.default;
                }
                if (stream) {
                  addTrackToStreamAndFireEvent(track, stream);
                  transceiver.associatedRemoteMediaStreams.push(stream);
                }
                receiverList.push([track, rtpReceiver, stream]);
              }
            } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
              transceiver.associatedRemoteMediaStreams.forEach(function (s) {
                var nativeTrack = s.getTracks().find(function (t) {
                  return t.id === transceiver.rtpReceiver.track.id;
                });
                if (nativeTrack) {
                  removeTrackFromStreamAndFireEvent(nativeTrack, s);
                }
              });
              transceiver.associatedRemoteMediaStreams = [];
            }

            transceiver.localCapabilities = localCapabilities;
            transceiver.remoteCapabilities = remoteCapabilities;
            transceiver.rtpReceiver = rtpReceiver;
            transceiver.rtcpParameters = rtcpParameters;
            transceiver.sendEncodingParameters = sendEncodingParameters;
            transceiver.recvEncodingParameters = recvEncodingParameters;

            pc._transceive(pc.transceivers[sdpMLineIndex],
              false,
              isNewTrack);
          } else if (description.type === 'answer' && !rejected) {
            transceiver = pc.transceivers[sdpMLineIndex];
            iceGatherer = transceiver.iceGatherer;
            iceTransport = transceiver.iceTransport;
            dtlsTransport = transceiver.dtlsTransport;
            rtpReceiver = transceiver.rtpReceiver;
            sendEncodingParameters = transceiver.sendEncodingParameters;
            localCapabilities = transceiver.localCapabilities;

            pc.transceivers[sdpMLineIndex].recvEncodingParameters =
              recvEncodingParameters;
            pc.transceivers[sdpMLineIndex].remoteCapabilities =
              remoteCapabilities;
            pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

            if (cands.length && iceTransport.state === 'new') {
              if ((isIceLite || isComplete) &&
                (!usingBundle || sdpMLineIndex === 0)) {
                iceTransport.setRemoteCandidates(cands);
              } else {
                cands.forEach(function (candidate) {
                  maybeAddCandidate(transceiver.iceTransport, candidate);
                });
              }
            }

            if (!usingBundle || sdpMLineIndex === 0) {
              if (iceTransport.state === 'new') {
                iceTransport.start(iceGatherer, remoteIceParameters,
                  'controlling');
              }
              if (dtlsTransport.state === 'new') {
                dtlsTransport.start(remoteDtlsParameters);
              }
            }

            var commonCapabilities = getCommonCapabilities(
              transceiver.localCapabilities,
              transceiver.remoteCapabilities);

            var hasRtx = commonCapabilities.codecs.filter(function (c) {
              return c.name.toLowerCase() === 'rtx';
            }).length;
            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
              delete transceiver.sendEncodingParameters[0].rtx;
            }

            pc._transceive(transceiver,
              direction === 'sendrecv' || direction === 'recvonly',
              direction === 'sendrecv' || direction === 'sendonly');

            if (rtpReceiver &&
              (direction === 'sendrecv' || direction === 'sendonly')) {
              track = rtpReceiver.track;
              if (remoteMsid) {
                if (!streams[remoteMsid.stream]) {
                  streams[remoteMsid.stream] = new window.MediaStream();
                }
                addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
              } else {
                if (!streams.default) {
                  streams.default = new window.MediaStream();
                }
                addTrackToStreamAndFireEvent(track, streams.default);
                receiverList.push([track, rtpReceiver, streams.default]);
              }
            } else {
              delete transceiver.rtpReceiver;
            }
          }
        });

        if (pc._dtlsRole === undefined) {
          pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
        }

        pc._remoteDescription = {
          type: description.type,
          sdp: description.sdp
        };
        if (description.type === 'offer') {
          pc._updateSignalingState('have-remote-offer');
        } else {
          pc._updateSignalingState('stable');
        }
        Object.keys(streams).forEach(function (sid) {
          var stream = streams[sid];
          if (stream.getTracks().length) {
            if (pc.remoteStreams.indexOf(stream) === -1) {
              pc.remoteStreams.push(stream);
              var event = new Event('addstream');
              event.stream = stream;
              window.setTimeout(function () {
                pc._dispatchEvent('addstream', event);
              });
            }

            receiverList.forEach(function (item) {
              var track = item[0];
              var receiver = item[1];
              if (stream.id !== item[2].id) {
                return;
              }
              fireAddTrack(pc, track, receiver, [stream]);
            });
          }
        });
        receiverList.forEach(function (item) {
          if (item[2]) {
            return;
          }
          fireAddTrack(pc, item[0], item[1], []);
        });

        window.setTimeout(function () {
          if (!(pc && pc.transceivers)) {
            return;
          }
          pc.transceivers.forEach(function (transceiver) {
            if (transceiver.iceTransport &&
              transceiver.iceTransport.state === 'new' &&
              transceiver.iceTransport.getRemoteCandidates().length > 0) {
              console.warn('Timeout for addRemoteCandidate. Consider sending ' +
                'an end-of-candidates notification');
              transceiver.iceTransport.addRemoteCandidate({});
            }
          });
        }, 4000);

        return Promise.resolve();
      };

      RTCPeerConnection.prototype.close = function () {
        this.transceivers.forEach(function (transceiver) {
          if (transceiver.iceTransport) {
            transceiver.iceTransport.stop();
          }
          if (transceiver.dtlsTransport) {
            transceiver.dtlsTransport.stop();
          }
          if (transceiver.rtpSender) {
            transceiver.rtpSender.stop();
          }
          if (transceiver.rtpReceiver) {
            transceiver.rtpReceiver.stop();
          }
        });
        this._isClosed = true;
        this._updateSignalingState('closed');
      };

      RTCPeerConnection.prototype._updateSignalingState = function (newState) {
        this.signalingState = newState;
        var event = new Event('signalingstatechange');
        this._dispatchEvent('signalingstatechange', event);
      };

      RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
        var pc = this;
        if (this.signalingState !== 'stable' || this.needNegotiation === true) {
          return;
        }
        this.needNegotiation = true;
        window.setTimeout(function () {
          if (pc.needNegotiation) {
            pc.needNegotiation = false;
            var event = new Event('negotiationneeded');
            pc._dispatchEvent('negotiationneeded', event);
          }
        }, 0);
      };

      RTCPeerConnection.prototype._updateIceConnectionState = function () {
        var newState;
        var states = {
          'new': 0,
          closed: 0,
          checking: 0,
          connected: 0,
          completed: 0,
          disconnected: 0,
          failed: 0
        };
        this.transceivers.forEach(function (transceiver) {
          if (transceiver.iceTransport && !transceiver.rejected) {
            states[transceiver.iceTransport.state]++;
          }
        });

        newState = 'new';
        if (states.failed > 0) {
          newState = 'failed';
        } else if (states.checking > 0) {
          newState = 'checking';
        } else if (states.disconnected > 0) {
          newState = 'disconnected';
        } else if (states.new > 0) {
          newState = 'new';
        } else if (states.connected > 0) {
          newState = 'connected';
        } else if (states.completed > 0) {
          newState = 'completed';
        }

        if (newState !== this.iceConnectionState) {
          this.iceConnectionState = newState;
          var event = new Event('iceconnectionstatechange');
          this._dispatchEvent('iceconnectionstatechange', event);
        }
      };

      RTCPeerConnection.prototype._updateConnectionState = function () {
        var newState;
        var states = {
          'new': 0,
          closed: 0,
          connecting: 0,
          connected: 0,
          completed: 0,
          disconnected: 0,
          failed: 0
        };
        this.transceivers.forEach(function (transceiver) {
          if (transceiver.iceTransport && transceiver.dtlsTransport &&
            !transceiver.rejected) {
            states[transceiver.iceTransport.state]++;
            states[transceiver.dtlsTransport.state]++;
          }
        });
        states.connected += states.completed;

        newState = 'new';
        if (states.failed > 0) {
          newState = 'failed';
        } else if (states.connecting > 0) {
          newState = 'connecting';
        } else if (states.disconnected > 0) {
          newState = 'disconnected';
        } else if (states.new > 0) {
          newState = 'new';
        } else if (states.connected > 0) {
          newState = 'connected';
        }

        if (newState !== this.connectionState) {
          this.connectionState = newState;
          var event = new Event('connectionstatechange');
          this._dispatchEvent('connectionstatechange', event);
        }
      };

      RTCPeerConnection.prototype.createOffer = function () {
        var pc = this;

        if (pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
            'Can not call createOffer after close'));
        }

        var numAudioTracks = pc.transceivers.filter(function (t) {
          return t.kind === 'audio';
        }).length;
        var numVideoTracks = pc.transceivers.filter(function (t) {
          return t.kind === 'video';
        }).length;

        var offerOptions = arguments[0];
        if (offerOptions) {
          if (offerOptions.mandatory || offerOptions.optional) {
            throw new TypeError(
              'Legacy mandatory/optional constraints not supported.');
          }
          if (offerOptions.offerToReceiveAudio !== undefined) {
            if (offerOptions.offerToReceiveAudio === true) {
              numAudioTracks = 1;
            } else if (offerOptions.offerToReceiveAudio === false) {
              numAudioTracks = 0;
            } else {
              numAudioTracks = offerOptions.offerToReceiveAudio;
            }
          }
          if (offerOptions.offerToReceiveVideo !== undefined) {
            if (offerOptions.offerToReceiveVideo === true) {
              numVideoTracks = 1;
            } else if (offerOptions.offerToReceiveVideo === false) {
              numVideoTracks = 0;
            } else {
              numVideoTracks = offerOptions.offerToReceiveVideo;
            }
          }
        }

        pc.transceivers.forEach(function (transceiver) {
          if (transceiver.kind === 'audio') {
            numAudioTracks--;
            if (numAudioTracks < 0) {
              transceiver.wantReceive = false;
            }
          } else if (transceiver.kind === 'video') {
            numVideoTracks--;
            if (numVideoTracks < 0) {
              transceiver.wantReceive = false;
            }
          }
        });

        while (numAudioTracks > 0 || numVideoTracks > 0) {
          if (numAudioTracks > 0) {
            pc._createTransceiver('audio');
            numAudioTracks--;
          }
          if (numVideoTracks > 0) {
            pc._createTransceiver('video');
            numVideoTracks--;
          }
        }

        var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
          pc._sdpSessionVersion++);
        pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
          var track = transceiver.track;
          var kind = transceiver.kind;
          var mid = transceiver.mid || SDPUtils.generateIdentifier();
          transceiver.mid = mid;

          if (!transceiver.iceGatherer) {
            transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
              pc.usingBundle);
          }

          var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
          if (edgeVersion < 15019) {
            localCapabilities.codecs = localCapabilities.codecs.filter(
              function (codec) {
                return codec.name !== 'rtx';
              });
          }
          localCapabilities.codecs.forEach(function (codec) {
            if (codec.name === 'H264' &&
              codec.parameters['level-asymmetry-allowed'] === undefined) {
              codec.parameters['level-asymmetry-allowed'] = '1';
            }

            if (transceiver.remoteCapabilities &&
              transceiver.remoteCapabilities.codecs) {
              transceiver.remoteCapabilities.codecs.forEach(function (remoteCodec) {
                if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                  codec.clockRate === remoteCodec.clockRate) {
                  codec.preferredPayloadType = remoteCodec.payloadType;
                }
              });
            }
          });
          localCapabilities.headerExtensions.forEach(function (hdrExt) {
            var remoteExtensions = transceiver.remoteCapabilities &&
              transceiver.remoteCapabilities.headerExtensions || [];
            remoteExtensions.forEach(function (rHdrExt) {
              if (hdrExt.uri === rHdrExt.uri) {
                hdrExt.id = rHdrExt.id;
              }
            });
          });

          var sendEncodingParameters = transceiver.sendEncodingParameters || [{
            ssrc: (2 * sdpMLineIndex + 1) * 1001
          }];
          if (track) {
            if (edgeVersion >= 15019 && kind === 'video' &&
              !sendEncodingParameters[0].rtx) {
              sendEncodingParameters[0].rtx = {
                ssrc: sendEncodingParameters[0].ssrc + 1
              };
            }
          }

          if (transceiver.wantReceive) {
            transceiver.rtpReceiver = new window.RTCRtpReceiver(
              transceiver.dtlsTransport, kind);
          }

          transceiver.localCapabilities = localCapabilities;
          transceiver.sendEncodingParameters = sendEncodingParameters;
        });

        if (pc._config.bundlePolicy !== 'max-compat') {
          sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
            return t.mid;
          }).join(' ') + '\r\n';
        }
        sdp += 'a=ice-options:trickle\r\n';

        pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
          sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
            'offer', transceiver.stream, pc._dtlsRole);
          sdp += 'a=rtcp-rsize\r\n';

          if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
            (sdpMLineIndex === 0 || !pc.usingBundle)) {
            transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
              cand.component = 1;
              sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
            });

            if (transceiver.iceGatherer.state === 'completed') {
              sdp += 'a=end-of-candidates\r\n';
            }
          }
        });

        var desc = new window.RTCSessionDescription({
          type: 'offer',
          sdp: sdp
        });
        return Promise.resolve(desc);
      };

      RTCPeerConnection.prototype.createAnswer = function () {
        var pc = this;

        if (pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
            'Can not call createAnswer after close'));
        }

        if (!(pc.signalingState === 'have-remote-offer' ||
          pc.signalingState === 'have-local-pranswer')) {
          return Promise.reject(makeError('InvalidStateError',
            'Can not call createAnswer in signalingState ' + pc.signalingState));
        }

        var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
          pc._sdpSessionVersion++);
        if (pc.usingBundle) {
          sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
            return t.mid;
          }).join(' ') + '\r\n';
        }
        sdp += 'a=ice-options:trickle\r\n';

        var mediaSectionsInOffer = SDPUtils.getMediaSections(
          pc._remoteDescription.sdp).length;
        pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
          if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
            return;
          }
          if (transceiver.rejected) {
            if (transceiver.kind === 'application') {
              if (transceiver.protocol === 'DTLS/SCTP') {
                sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
              } else {
                sdp += 'm=application 0 ' + transceiver.protocol +
                  ' webrtc-datachannel\r\n';
              }
            } else if (transceiver.kind === 'audio') {
              sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
                'a=rtpmap:0 PCMU/8000\r\n';
            } else if (transceiver.kind === 'video') {
              sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
                'a=rtpmap:120 VP8/90000\r\n';
            }
            sdp += 'c=IN IP4 0.0.0.0\r\n' +
              'a=inactive\r\n' +
              'a=mid:' + transceiver.mid + '\r\n';
            return;
          }

          if (transceiver.stream) {
            var localTrack;
            if (transceiver.kind === 'audio') {
              localTrack = transceiver.stream.getAudioTracks()[0];
            } else if (transceiver.kind === 'video') {
              localTrack = transceiver.stream.getVideoTracks()[0];
            }
            if (localTrack) {
              if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
                !transceiver.sendEncodingParameters[0].rtx) {
                transceiver.sendEncodingParameters[0].rtx = {
                  ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                };
              }
            }
          }

          var commonCapabilities = getCommonCapabilities(
            transceiver.localCapabilities,
            transceiver.remoteCapabilities);

          var hasRtx = commonCapabilities.codecs.filter(function (c) {
            return c.name.toLowerCase() === 'rtx';
          }).length;
          if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
            delete transceiver.sendEncodingParameters[0].rtx;
          }

          sdp += writeMediaSection(transceiver, commonCapabilities,
            'answer', transceiver.stream, pc._dtlsRole);
          if (transceiver.rtcpParameters &&
            transceiver.rtcpParameters.reducedSize) {
            sdp += 'a=rtcp-rsize\r\n';
          }
        });

        var desc = new window.RTCSessionDescription({
          type: 'answer',
          sdp: sdp
        });
        return Promise.resolve(desc);
      };

      RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
        var pc = this;
        var sections;
        if (candidate && !(candidate.sdpMLineIndex !== undefined ||
          candidate.sdpMid)) {
          return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
        }

        return new Promise(function (resolve, reject) {
          if (!pc._remoteDescription) {
            return reject(makeError('InvalidStateError',
              'Can not add ICE candidate without a remote description'));
          } else if (!candidate || candidate.candidate === '') {
            for (var j = 0; j < pc.transceivers.length; j++) {
              if (pc.transceivers[j].rejected) {
                continue;
              }
              pc.transceivers[j].iceTransport.addRemoteCandidate({});
              sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
              sections[j] += 'a=end-of-candidates\r\n';
              pc._remoteDescription.sdp =
                SDPUtils.getDescription(pc._remoteDescription.sdp) +
                sections.join('');
              if (pc.usingBundle) {
                break;
              }
            }
          } else {
            var sdpMLineIndex = candidate.sdpMLineIndex;
            if (candidate.sdpMid) {
              for (var i = 0; i < pc.transceivers.length; i++) {
                if (pc.transceivers[i].mid === candidate.sdpMid) {
                  sdpMLineIndex = i;
                  break;
                }
              }
            }
            var transceiver = pc.transceivers[sdpMLineIndex];
            if (transceiver) {
              if (transceiver.rejected) {
                return resolve();
              }
              var cand = Object.keys(candidate.candidate).length > 0 ?
                SDPUtils.parseCandidate(candidate.candidate) : {};
              if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                return resolve();
              }
              if (cand.component && cand.component !== 1) {
                return resolve();
              }
              if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
                transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
                if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                  return reject(makeError('OperationError',
                    'Can not add ICE candidate'));
                }
              }

              var candidateString = candidate.candidate.trim();
              if (candidateString.indexOf('a=') === 0) {
                candidateString = candidateString.substr(2);
              }
              sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
              sections[sdpMLineIndex] += 'a=' +
                (cand.type ? candidateString : 'end-of-candidates')
                + '\r\n';
              pc._remoteDescription.sdp =
                SDPUtils.getDescription(pc._remoteDescription.sdp) +
                sections.join('');
            } else {
              return reject(makeError('OperationError',
                'Can not add ICE candidate'));
            }
          }
          resolve();
        });
      };

      RTCPeerConnection.prototype.getStats = function (selector) {
        if (selector && selector instanceof window.MediaStreamTrack) {
          var senderOrReceiver = null;
          this.transceivers.forEach(function (transceiver) {
            if (transceiver.rtpSender &&
              transceiver.rtpSender.track === selector) {
              senderOrReceiver = transceiver.rtpSender;
            } else if (transceiver.rtpReceiver &&
              transceiver.rtpReceiver.track === selector) {
              senderOrReceiver = transceiver.rtpReceiver;
            }
          });
          if (!senderOrReceiver) {
            throw makeError('InvalidAccessError', 'Invalid selector.');
          }
          return senderOrReceiver.getStats();
        }

        var promises = [];
        this.transceivers.forEach(function (transceiver) {
          ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
            'dtlsTransport'].forEach(function (method) {
              if (transceiver[method]) {
                promises.push(transceiver[method].getStats());
              }
            });
        });
        return Promise.all(promises).then(function (allStats) {
          var results = new Map();
          allStats.forEach(function (stats) {
            stats.forEach(function (stat) {
              results.set(stat.id, stat);
            });
          });
          return results;
        });
      };

      var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
        'RTCIceTransport', 'RTCDtlsTransport'];
      ortcObjects.forEach(function (ortcObjectName) {
        var obj = window[ortcObjectName];
        if (obj && obj.prototype && obj.prototype.getStats) {
          var nativeGetstats = obj.prototype.getStats;
          obj.prototype.getStats = function () {
            return nativeGetstats.apply(this)
              .then(function (nativeStats) {
                var mapStats = new Map();
                Object.keys(nativeStats).forEach(function (id) {
                  nativeStats[id].type = fixStatsType(nativeStats[id]);
                  mapStats.set(id, nativeStats[id]);
                });
                return mapStats;
              });
          };
        }
      });

      var methods = ['createOffer', 'createAnswer'];
      methods.forEach(function (method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function () {
          var args = arguments;
          if (typeof args[0] === 'function' ||
            typeof args[1] === 'function') {
            return nativeMethod.apply(this, [arguments[2]])
              .then(function (description) {
                if (typeof args[0] === 'function') {
                  args[0].apply(null, [description]);
                }
              }, function (error) {
                if (typeof args[1] === 'function') {
                  args[1].apply(null, [error]);
                }
              });
          }
          return nativeMethod.apply(this, arguments);
        };
      });

      methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
      methods.forEach(function (method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function () {
          var args = arguments;
          if (typeof args[1] === 'function' ||
            typeof args[2] === 'function') {
            return nativeMethod.apply(this, arguments)
              .then(function () {
                if (typeof args[1] === 'function') {
                  args[1].apply(null);
                }
              }, function (error) {
                if (typeof args[2] === 'function') {
                  args[2].apply(null, [error]);
                }
              });
          }
          return nativeMethod.apply(this, arguments);
        };
      });

      ['getStats'].forEach(function (method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function () {
          var args = arguments;
          if (typeof args[1] === 'function') {
            return nativeMethod.apply(this, arguments)
              .then(function () {
                if (typeof args[1] === 'function') {
                  args[1].apply(null);
                }
              });
          }
          return nativeMethod.apply(this, arguments);
        };
      });

      return RTCPeerConnection;
    };

  }, { "sdp": 86 }], 86: [function (require, module, exports) {
    'use strict';

    var SDPUtils = {};

    SDPUtils.generateIdentifier = function () {
      return Math.random().toString(36).substr(2, 10);
    };

    SDPUtils.localCName = SDPUtils.generateIdentifier();

    SDPUtils.splitLines = function (blob) {
      return blob.trim().split('\n').map(function (line) {
        return line.trim();
      });
    };
    SDPUtils.splitSections = function (blob) {
      var parts = blob.split('\nm=');
      return parts.map(function (part, index) {
        return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
      });
    };

    SDPUtils.getDescription = function (blob) {
      var sections = SDPUtils.splitSections(blob);
      return sections && sections[0];
    };

    SDPUtils.getMediaSections = function (blob) {
      var sections = SDPUtils.splitSections(blob);
      sections.shift();
      return sections;
    };

    SDPUtils.matchPrefix = function (blob, prefix) {
      return SDPUtils.splitLines(blob).filter(function (line) {
        return line.indexOf(prefix) === 0;
      });
    };

    SDPUtils.parseCandidate = function (line) {
      var parts;
      if (line.indexOf('a=candidate:') === 0) {
        parts = line.substring(12).split(' ');
      } else {
        parts = line.substring(10).split(' ');
      }

      var candidate = {
        foundation: parts[0],
        component: parseInt(parts[1], 10),
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4],
        port: parseInt(parts[5], 10),
        type: parts[7]
      };

      for (var i = 8; i < parts.length; i += 2) {
        switch (parts[i]) {
          case 'raddr':
            candidate.relatedAddress = parts[i + 1];
            break;
          case 'rport':
            candidate.relatedPort = parseInt(parts[i + 1], 10);
            break;
          case 'tcptype':
            candidate.tcpType = parts[i + 1];
            break;
          case 'ufrag':
            candidate.ufrag = parts[i + 1];
            candidate.usernameFragment = parts[i + 1];
            break;
          default:
            candidate[parts[i]] = parts[i + 1];
            break;
        }
      }
      return candidate;
    };

    SDPUtils.writeCandidate = function (candidate) {
      var sdp = [];
      sdp.push(candidate.foundation);
      sdp.push(candidate.component);
      sdp.push(candidate.protocol.toUpperCase());
      sdp.push(candidate.priority);
      sdp.push(candidate.address || candidate.ip);
      sdp.push(candidate.port);

      var type = candidate.type;
      sdp.push('typ');
      sdp.push(type);
      if (type !== 'host' && candidate.relatedAddress &&
        candidate.relatedPort) {
        sdp.push('raddr');
        sdp.push(candidate.relatedAddress);
        sdp.push('rport');
        sdp.push(candidate.relatedPort);
      }
      if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
      }
      if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push('ufrag');
        sdp.push(candidate.usernameFragment || candidate.ufrag);
      }
      return 'candidate:' + sdp.join(' ');
    };

    SDPUtils.parseIceOptions = function (line) {
      return line.substr(14).split(' ');
    };

    SDPUtils.parseRtpMap = function (line) {
      var parts = line.substr(9).split(' ');
      var parsed = {
        payloadType: parseInt(parts.shift(), 10)
      };

      parts = parts[0].split('/');

      parsed.name = parts[0];
      parsed.clockRate = parseInt(parts[1], 10);
      parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
      parsed.numChannels = parsed.channels;
      return parsed;
    };

    SDPUtils.writeRtpMap = function (codec) {
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      var channels = codec.channels || codec.numChannels || 1;
      return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
        (channels !== 1 ? '/' + channels : '') + '\r\n';
    };

    SDPUtils.parseExtmap = function (line) {
      var parts = line.substr(9).split(' ');
      return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
        uri: parts[1]
      };
    };

    SDPUtils.writeExtmap = function (headerExtension) {
      return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
        (headerExtension.direction && headerExtension.direction !== 'sendrecv'
          ? '/' + headerExtension.direction
          : '') +
        ' ' + headerExtension.uri + '\r\n';
    };

    SDPUtils.parseFmtp = function (line) {
      var parsed = {};
      var kv;
      var parts = line.substr(line.indexOf(' ') + 1).split(';');
      for (var j = 0; j < parts.length; j++) {
        kv = parts[j].trim().split('=');
        parsed[kv[0].trim()] = kv[1];
      }
      return parsed;
    };

    SDPUtils.writeFmtp = function (codec) {
      var line = '';
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.parameters && Object.keys(codec.parameters).length) {
        var params = [];
        Object.keys(codec.parameters).forEach(function (param) {
          if (codec.parameters[param]) {
            params.push(param + '=' + codec.parameters[param]);
          } else {
            params.push(param);
          }
        });
        line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
      }
      return line;
    };

    SDPUtils.parseRtcpFb = function (line) {
      var parts = line.substr(line.indexOf(' ') + 1).split(' ');
      return {
        type: parts.shift(),
        parameter: parts.join(' ')
      };
    };
    SDPUtils.writeRtcpFb = function (codec) {
      var lines = '';
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
        codec.rtcpFeedback.forEach(function (fb) {
          lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
            (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
            '\r\n';
        });
      }
      return lines;
    };

    SDPUtils.parseSsrcMedia = function (line) {
      var sp = line.indexOf(' ');
      var parts = {
        ssrc: parseInt(line.substr(7, sp - 7), 10)
      };
      var colon = line.indexOf(':', sp);
      if (colon > -1) {
        parts.attribute = line.substr(sp + 1, colon - sp - 1);
        parts.value = line.substr(colon + 1);
      } else {
        parts.attribute = line.substr(sp + 1);
      }
      return parts;
    };

    SDPUtils.parseSsrcGroup = function (line) {
      var parts = line.substr(13).split(' ');
      return {
        semantics: parts.shift(),
        ssrcs: parts.map(function (ssrc) {
          return parseInt(ssrc, 10);
        })
      };
    };

    SDPUtils.getMid = function (mediaSection) {
      var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
      if (mid) {
        return mid.substr(6);
      }
    };

    SDPUtils.parseFingerprint = function (line) {
      var parts = line.substr(14).split(' ');
      return {
        algorithm: parts[0].toLowerCase(),
        value: parts[1]
      };
    };

    SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
      var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=fingerprint:');
      return {
        role: 'auto',
        fingerprints: lines.map(SDPUtils.parseFingerprint)
      };
    };

    SDPUtils.writeDtlsParameters = function (params, setupType) {
      var sdp = 'a=setup:' + setupType + '\r\n';
      params.fingerprints.forEach(function (fp) {
        sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
      });
      return sdp;
    };
    SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
      var lines = SDPUtils.splitLines(mediaSection);
      lines = lines.concat(SDPUtils.splitLines(sessionpart));
      var iceParameters = {
        usernameFragment: lines.filter(function (line) {
          return line.indexOf('a=ice-ufrag:') === 0;
        })[0].substr(12),
        password: lines.filter(function (line) {
          return line.indexOf('a=ice-pwd:') === 0;
        })[0].substr(10)
      };
      return iceParameters;
    };

    SDPUtils.writeIceParameters = function (params) {
      return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
        'a=ice-pwd:' + params.password + '\r\n';
    };

    SDPUtils.parseRtpParameters = function (mediaSection) {
      var description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
      };
      var lines = SDPUtils.splitLines(mediaSection);
      var mline = lines[0].split(' ');
      for (var i = 3; i < mline.length; i++) {
        var pt = mline[i];
        var rtpmapline = SDPUtils.matchPrefix(
          mediaSection, 'a=rtpmap:' + pt + ' ')[0];
        if (rtpmapline) {
          var codec = SDPUtils.parseRtpMap(rtpmapline);
          var fmtps = SDPUtils.matchPrefix(
            mediaSection, 'a=fmtp:' + pt + ' ');
          codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
          codec.rtcpFeedback = SDPUtils.matchPrefix(
            mediaSection, 'a=rtcp-fb:' + pt + ' ')
            .map(SDPUtils.parseRtcpFb);
          description.codecs.push(codec);
          switch (codec.name.toUpperCase()) {
            case 'RED':
            case 'ULPFEC':
              description.fecMechanisms.push(codec.name.toUpperCase());
              break;
            default:
              break;
          }
        }
      }
      SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
        description.headerExtensions.push(SDPUtils.parseExtmap(line));
      });
      return description;
    };

    SDPUtils.writeRtpDescription = function (kind, caps) {
      var sdp = '';

      sdp += 'm=' + kind + ' ';
      sdp += caps.codecs.length > 0 ? '9' : '0';
      sdp += ' UDP/TLS/RTP/SAVPF ';
      sdp += caps.codecs.map(function (codec) {
        if (codec.preferredPayloadType !== undefined) {
          return codec.preferredPayloadType;
        }
        return codec.payloadType;
      }).join(' ') + '\r\n';

      sdp += 'c=IN IP4 0.0.0.0\r\n';
      sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

      caps.codecs.forEach(function (codec) {
        sdp += SDPUtils.writeRtpMap(codec);
        sdp += SDPUtils.writeFmtp(codec);
        sdp += SDPUtils.writeRtcpFb(codec);
      });
      var maxptime = 0;
      caps.codecs.forEach(function (codec) {
        if (codec.maxptime > maxptime) {
          maxptime = codec.maxptime;
        }
      });
      if (maxptime > 0) {
        sdp += 'a=maxptime:' + maxptime + '\r\n';
      }
      sdp += 'a=rtcp-mux\r\n';

      if (caps.headerExtensions) {
        caps.headerExtensions.forEach(function (extension) {
          sdp += SDPUtils.writeExtmap(extension);
        });
      }
      return sdp;
    };

    SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
      var encodingParameters = [];
      var description = SDPUtils.parseRtpParameters(mediaSection);
      var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
      var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

      var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function (line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function (parts) {
          return parts.attribute === 'cname';
        });
      var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
      var secondarySsrc;

      var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
        .map(function (line) {
          var parts = line.substr(17).split(' ');
          return parts.map(function (part) {
            return parseInt(part, 10);
          });
        });
      if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
        secondarySsrc = flows[0][1];
      }

      description.codecs.forEach(function (codec) {
        if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
          var encParam = {
            ssrc: primarySsrc,
            codecPayloadType: parseInt(codec.parameters.apt, 10)
          };
          if (primarySsrc && secondarySsrc) {
            encParam.rtx = { ssrc: secondarySsrc };
          }
          encodingParameters.push(encParam);
          if (hasRed) {
            encParam = JSON.parse(JSON.stringify(encParam));
            encParam.fec = {
              ssrc: primarySsrc,
              mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
            };
            encodingParameters.push(encParam);
          }
        }
      });
      if (encodingParameters.length === 0 && primarySsrc) {
        encodingParameters.push({
          ssrc: primarySsrc
        });
      }

      var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
      if (bandwidth.length) {
        if (bandwidth[0].indexOf('b=TIAS:') === 0) {
          bandwidth = parseInt(bandwidth[0].substr(7), 10);
        } else if (bandwidth[0].indexOf('b=AS:') === 0) {
          bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
            - (50 * 40 * 8);
        } else {
          bandwidth = undefined;
        }
        encodingParameters.forEach(function (params) {
          params.maxBitrate = bandwidth;
        });
      }
      return encodingParameters;
    };

    SDPUtils.parseRtcpParameters = function (mediaSection) {
      var rtcpParameters = {};

      var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function (line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function (obj) {
          return obj.attribute === 'cname';
        })[0];
      if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
      }

      var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
      rtcpParameters.reducedSize = rsize.length > 0;
      rtcpParameters.compound = rsize.length === 0;

      var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
      rtcpParameters.mux = mux.length > 0;

      return rtcpParameters;
    };

    SDPUtils.parseMsid = function (mediaSection) {
      var parts;
      var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
      if (spec.length === 1) {
        parts = spec[0].substr(7).split(' ');
        return { stream: parts[0], track: parts[1] };
      }
      var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function (line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function (msidParts) {
          return msidParts.attribute === 'msid';
        });
      if (planB.length > 0) {
        parts = planB[0].value.split(' ');
        return { stream: parts[0], track: parts[1] };
      }
    };

    SDPUtils.parseSctpDescription = function (mediaSection) {
      var mline = SDPUtils.parseMLine(mediaSection);
      var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
      var maxMessageSize;
      if (maxSizeLine.length > 0) {
        maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
      }
      if (isNaN(maxMessageSize)) {
        maxMessageSize = 65536;
      }
      var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
      if (sctpPort.length > 0) {
        return {
          port: parseInt(sctpPort[0].substr(12), 10),
          protocol: mline.fmt,
          maxMessageSize: maxMessageSize
        };
      }
      var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
      if (sctpMapLines.length > 0) {
        var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0]
          .substr(10)
          .split(' ');
        return {
          port: parseInt(parts[0], 10),
          protocol: parts[1],
          maxMessageSize: maxMessageSize
        };
      }
    };

    SDPUtils.writeSctpDescription = function (media, sctp) {
      var output = [];
      if (media.protocol !== 'DTLS/SCTP') {
        output = [
          'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
          'c=IN IP4 0.0.0.0\r\n',
          'a=sctp-port:' + sctp.port + '\r\n'
        ];
      } else {
        output = [
          'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
          'c=IN IP4 0.0.0.0\r\n',
          'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
        ];
      }
      if (sctp.maxMessageSize !== undefined) {
        output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
      }
      return output.join('');
    };

    SDPUtils.generateSessionId = function () {
      return Math.random().toString().substr(2, 21);
    };

    SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
      var sessionId;
      var version = sessVer !== undefined ? sessVer : 2;
      if (sessId) {
        sessionId = sessId;
      } else {
        sessionId = SDPUtils.generateSessionId();
      }
      var user = sessUser || 'thisisadapterortc';
      return 'v=0\r\n' +
        'o=' + user + ' ' + sessionId + ' ' + version +
        ' IN IP4 127.0.0.1\r\n' +
        's=-\r\n' +
        't=0 0\r\n';
    };

    SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
      var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

      sdp += SDPUtils.writeIceParameters(
        transceiver.iceGatherer.getLocalParameters());

      sdp += SDPUtils.writeDtlsParameters(
        transceiver.dtlsTransport.getLocalParameters(),
        type === 'offer' ? 'actpass' : 'active');

      sdp += 'a=mid:' + transceiver.mid + '\r\n';

      if (transceiver.direction) {
        sdp += 'a=' + transceiver.direction + '\r\n';
      } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
        sdp += 'a=sendrecv\r\n';
      } else if (transceiver.rtpSender) {
        sdp += 'a=sendonly\r\n';
      } else if (transceiver.rtpReceiver) {
        sdp += 'a=recvonly\r\n';
      } else {
        sdp += 'a=inactive\r\n';
      }

      if (transceiver.rtpSender) {
        var msid = 'msid:' + stream.id + ' ' +
          transceiver.rtpSender.track.id + '\r\n';
        sdp += 'a=' + msid;

        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' ' + msid;
        if (transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' ' + msid;
          sdp += 'a=ssrc-group:FID ' +
            transceiver.sendEncodingParameters[0].ssrc + ' ' +
            transceiver.sendEncodingParameters[0].rtx.ssrc +
            '\r\n';
        }
      }
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' cname:' + SDPUtils.localCName + '\r\n';
      if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
      }
      return sdp;
    };

    SDPUtils.getDirection = function (mediaSection, sessionpart) {
      var lines = SDPUtils.splitLines(mediaSection);
      for (var i = 0; i < lines.length; i++) {
        switch (lines[i]) {
          case 'a=sendrecv':
          case 'a=sendonly':
          case 'a=recvonly':
          case 'a=inactive':
            return lines[i].substr(2);
          default:
        }
      }
      if (sessionpart) {
        return SDPUtils.getDirection(sessionpart);
      }
      return 'sendrecv';
    };

    SDPUtils.getKind = function (mediaSection) {
      var lines = SDPUtils.splitLines(mediaSection);
      var mline = lines[0].split(' ');
      return mline[0].substr(2);
    };

    SDPUtils.isRejected = function (mediaSection) {
      return mediaSection.split(' ', 2)[1] === '0';
    };

    SDPUtils.parseMLine = function (mediaSection) {
      var lines = SDPUtils.splitLines(mediaSection);
      var parts = lines[0].substr(2).split(' ');
      return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(' ')
      };
    };

    SDPUtils.parseOLine = function (mediaSection) {
      var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
      var parts = line.substr(2).split(' ');
      return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
      };
    };

    SDPUtils.isValidSDP = function (blob) {
      if (typeof blob !== 'string' || blob.length === 0) {
        return false;
      }
      var lines = SDPUtils.splitLines(blob);
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
          return false;
        }
      }
      return true;
    };

    if (typeof module === 'object') {
      module.exports = SDPUtils;
    }

  }, {}], 87: [function (require, module, exports) {
    "use strict";

    var isPrototype = require("../prototype/is");

    module.exports = function (value) {
      if (typeof value !== "function") return false;

      if (!hasOwnProperty.call(value, "length")) return false;

      try {
        if (typeof value.length !== "number") return false;
        if (typeof value.call !== "function") return false;
        if (typeof value.apply !== "function") return false;
      } catch (error) {
        return false;
      }

      return !isPrototype(value);
    };

  }, { "../prototype/is": 94 }], 88: [function (require, module, exports) {
    "use strict";

    var isValue = require("../value/is")
      , isObject = require("../object/is")
      , stringCoerce = require("../string/coerce")
      , toShortString = require("./to-short-string");

    var resolveMessage = function (message, value) {
      return message.replace("%v", toShortString(value));
    };

    module.exports = function (value, defaultMessage, inputOptions) {
      if (!isObject(inputOptions)) throw new TypeError(resolveMessage(defaultMessage, value));
      if (!isValue(value)) {
        if ("default" in inputOptions) return inputOptions["default"];
        if (inputOptions.isOptional) return null;
      }
      var errorMessage = stringCoerce(inputOptions.errorMessage);
      if (!isValue(errorMessage)) errorMessage = defaultMessage;
      throw new TypeError(resolveMessage(errorMessage, value));
    };

  }, { "../object/is": 91, "../string/coerce": 95, "../value/is": 97, "./to-short-string": 90 }], 89: [function (require, module, exports) {
    "use strict";

    module.exports = function (value) {
      try {
        return value.toString();
      } catch (error) {
        try { return String(value); }
        catch (error2) { return null; }
      }
    };

  }, {}], 90: [function (require, module, exports) {
    "use strict";

    var safeToString = require("./safe-to-string");

    var reNewLine = /[\n\r\u2028\u2029]/g;

    module.exports = function (value) {
      var string = safeToString(value);
      if (string === null) return "<Non-coercible to string value>";
      if (string.length > 100) string = string.slice(0, 99) + "…";
      string = string.replace(reNewLine, function (char) {
        switch (char) {
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw new Error("Unexpected character");
        }
      });
      return string;
    };

  }, { "./safe-to-string": 89 }], 91: [function (require, module, exports) {
    "use strict";

    var isValue = require("../value/is");

    var possibleTypes = { "object": true, "function": true, "undefined": true };

    module.exports = function (value) {
      if (!isValue(value)) return false;
      return hasOwnProperty.call(possibleTypes, typeof value);
    };

  }, { "../value/is": 97 }], 92: [function (require, module, exports) {
    "use strict";

    var resolveException = require("../lib/resolve-exception")
      , is = require("./is");

    module.exports = function (value) {
      if (is(value)) return value;
      return resolveException(value, "%v is not a plain function", arguments[1]);
    };

  }, { "../lib/resolve-exception": 88, "./is": 93 }], 93: [function (require, module, exports) {
    "use strict";

    var isFunction = require("../function/is");

    var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

    module.exports = function (value) {
      if (!isFunction(value)) return false;
      if (classRe.test(functionToString.call(value))) return false;
      return true;
    };

  }, { "../function/is": 87 }], 94: [function (require, module, exports) {
    "use strict";

    var isObject = require("../object/is");

    module.exports = function (value) {
      if (!isObject(value)) return false;
      try {
        if (!value.constructor) return false;
        return value.constructor.prototype === value;
      } catch (error) {
        return false;
      }
    };

  }, { "../object/is": 91 }], 95: [function (require, module, exports) {
    "use strict";

    var isValue = require("../value/is")
      , isObject = require("../object/is");

    var objectToString = Object.prototype.toString;

    module.exports = function (value) {
      if (!isValue(value)) return null;
      if (isObject(value)) {
        var valueToString = value.toString;
        if (typeof valueToString !== "function") return null;
        if (valueToString === objectToString) return null;
      }
      try {
        return "" + value;
      } catch (error) {
        return null;
      }
    };

  }, { "../object/is": 91, "../value/is": 97 }], 96: [function (require, module, exports) {
    "use strict";

    var resolveException = require("../lib/resolve-exception")
      , is = require("./is");

    module.exports = function (value) {
      if (is(value)) return value;
      return resolveException(value, "Cannot use %v", arguments[1]);
    };

  }, { "../lib/resolve-exception": 88, "./is": 97 }], 97: [function (require, module, exports) {
    "use strict";

    var _undefined = void 0;

    module.exports = function (value) { return value !== _undefined && value !== null; };

  }, {}], 98: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _adapter_factory = require("./adapter_factory.js");

    const adapter = (0, _adapter_factory.adapterFactory)({
      window
    });
    var _default = adapter;
    exports.default = _default;

  }, { "./adapter_factory.js": 99 }], 99: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.adapterFactory = adapterFactory;

    var utils = _interopRequireWildcard(require("./utils"));

    var chromeShim = _interopRequireWildcard(require("./chrome/chrome_shim"));

    var edgeShim = _interopRequireWildcard(require("./edge/edge_shim"));

    var firefoxShim = _interopRequireWildcard(require("./firefox/firefox_shim"));

    var safariShim = _interopRequireWildcard(require("./safari/safari_shim"));

    var commonShim = _interopRequireWildcard(require("./common_shim"));

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function adapterFactory({
      window
    } = {}, options = {
      shimChrome: true,
      shimFirefox: true,
      shimEdge: true,
      shimSafari: true
    }) {
      const logging = utils.log;
      const browserDetails = utils.detectBrowser(window);
      const adapter = {
        browserDetails,
        commonShim,
        extractVersion: utils.extractVersion,
        disableLog: utils.disableLog,
        disableWarnings: utils.disableWarnings
      };

      switch (browserDetails.browser) {
        case 'chrome':
          if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
            logging('Chrome shim is not included in this adapter release.');
            return adapter;
          }

          logging('adapter.js shimming chrome.');

          adapter.browserShim = chromeShim;
          chromeShim.shimGetUserMedia(window);
          chromeShim.shimMediaStream(window);
          chromeShim.shimPeerConnection(window);
          chromeShim.shimOnTrack(window);
          chromeShim.shimAddTrackRemoveTrack(window);
          chromeShim.shimGetSendersWithDtmf(window);
          chromeShim.shimGetStats(window);
          chromeShim.shimSenderReceiverGetStats(window);
          chromeShim.fixNegotiationNeeded(window);
          commonShim.shimRTCIceCandidate(window);
          commonShim.shimConnectionState(window);
          commonShim.shimMaxMessageSize(window);
          commonShim.shimSendThrowTypeError(window);
          commonShim.removeAllowExtmapMixed(window);
          break;

        case 'firefox':
          if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
            logging('Firefox shim is not included in this adapter release.');
            return adapter;
          }

          logging('adapter.js shimming firefox.');

          adapter.browserShim = firefoxShim;
          firefoxShim.shimGetUserMedia(window);
          firefoxShim.shimPeerConnection(window);
          firefoxShim.shimOnTrack(window);
          firefoxShim.shimRemoveStream(window);
          firefoxShim.shimSenderGetStats(window);
          firefoxShim.shimReceiverGetStats(window);
          firefoxShim.shimRTCDataChannel(window);
          firefoxShim.shimAddTransceiver(window);
          firefoxShim.shimCreateOffer(window);
          firefoxShim.shimCreateAnswer(window);
          commonShim.shimRTCIceCandidate(window);
          commonShim.shimConnectionState(window);
          commonShim.shimMaxMessageSize(window);
          commonShim.shimSendThrowTypeError(window);
          break;

        case 'edge':
          if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
            logging('MS edge shim is not included in this adapter release.');
            return adapter;
          }

          logging('adapter.js shimming edge.');

          adapter.browserShim = edgeShim;
          edgeShim.shimGetUserMedia(window);
          edgeShim.shimGetDisplayMedia(window);
          edgeShim.shimPeerConnection(window);
          edgeShim.shimReplaceTrack(window);

          commonShim.shimMaxMessageSize(window);
          commonShim.shimSendThrowTypeError(window);
          break;

        case 'safari':
          if (!safariShim || !options.shimSafari) {
            logging('Safari shim is not included in this adapter release.');
            return adapter;
          }

          logging('adapter.js shimming safari.');

          adapter.browserShim = safariShim;
          safariShim.shimRTCIceServerUrls(window);
          safariShim.shimCreateOfferLegacy(window);
          safariShim.shimCallbacksAPI(window);
          safariShim.shimLocalStreamsAPI(window);
          safariShim.shimRemoteStreamsAPI(window);
          safariShim.shimTrackEventTransceiver(window);
          safariShim.shimGetUserMedia(window);
          commonShim.shimRTCIceCandidate(window);
          commonShim.shimMaxMessageSize(window);
          commonShim.shimSendThrowTypeError(window);
          commonShim.removeAllowExtmapMixed(window);
          break;

        default:
          logging('Unsupported browser!');
          break;
      }

      return adapter;
    }

  }, { "./chrome/chrome_shim": 100, "./common_shim": 103, "./edge/edge_shim": 104, "./firefox/firefox_shim": 108, "./safari/safari_shim": 111, "./utils": 112 }], 100: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimMediaStream = shimMediaStream;
    exports.shimOnTrack = shimOnTrack;
    exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
    exports.shimGetStats = shimGetStats;
    exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
    exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
    exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
    exports.shimPeerConnection = shimPeerConnection;
    exports.fixNegotiationNeeded = fixNegotiationNeeded;
    Object.defineProperty(exports, "shimGetUserMedia", {
      enumerable: true,
      get: function () {
        return _getusermedia.shimGetUserMedia;
      }
    });
    Object.defineProperty(exports, "shimGetDisplayMedia", {
      enumerable: true,
      get: function () {
        return _getdisplaymedia.shimGetDisplayMedia;
      }
    });

    var utils = _interopRequireWildcard(require("../utils.js"));

    var _getusermedia = require("./getusermedia");

    var _getdisplaymedia = require("./getdisplaymedia");

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function shimMediaStream(window) {
      window.MediaStream = window.MediaStream || window.webkitMediaStream;
    }

    function shimOnTrack(window) {
      if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
          get() {
            return this._ontrack;
          },

          set(f) {
            if (this._ontrack) {
              this.removeEventListener('track', this._ontrack);
            }

            this.addEventListener('track', this._ontrack = f);
          },

          enumerable: true,
          configurable: true
        });
        const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
          if (!this._ontrackpoly) {
            this._ontrackpoly = e => {
              e.stream.addEventListener('addtrack', te => {
                let receiver;

                if (window.RTCPeerConnection.prototype.getReceivers) {
                  receiver = this.getReceivers().find(r => r.track && r.track.id === te.track.id);
                } else {
                  receiver = {
                    track: te.track
                  };
                }

                const event = new Event('track');
                event.track = te.track;
                event.receiver = receiver;
                event.transceiver = {
                  receiver
                };
                event.streams = [e.stream];
                this.dispatchEvent(event);
              });
              e.stream.getTracks().forEach(track => {
                let receiver;

                if (window.RTCPeerConnection.prototype.getReceivers) {
                  receiver = this.getReceivers().find(r => r.track && r.track.id === track.id);
                } else {
                  receiver = {
                    track
                  };
                }

                const event = new Event('track');
                event.track = track;
                event.receiver = receiver;
                event.transceiver = {
                  receiver
                };
                event.streams = [e.stream];
                this.dispatchEvent(event);
              });
            };

            this.addEventListener('addstream', this._ontrackpoly);
          }

          return origSetRemoteDescription.apply(this, arguments);
        };
      } else {
        utils.wrapPeerConnectionEvent(window, 'track', e => {
          if (!e.transceiver) {
            Object.defineProperty(e, 'transceiver', {
              value: {
                receiver: e.receiver
              }
            });
          }

          return e;
        });
      }
    }

    function shimGetSendersWithDtmf(window) {
      if (typeof window === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
        const shimSenderWithDtmf = function (pc, track) {
          return {
            track,

            get dtmf() {
              if (this._dtmf === undefined) {
                if (track.kind === 'audio') {
                  this._dtmf = pc.createDTMFSender(track);
                } else {
                  this._dtmf = null;
                }
              }

              return this._dtmf;
            },

            _pc: pc
          };
        };


        if (!window.RTCPeerConnection.prototype.getSenders) {
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            this._senders = this._senders || [];
            return this._senders.slice();
          };

          const origAddTrack = window.RTCPeerConnection.prototype.addTrack;

          window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
            let sender = origAddTrack.apply(this, arguments);

            if (!sender) {
              sender = shimSenderWithDtmf(this, track);

              this._senders.push(sender);
            }

            return sender;
          };

          const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;

          window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
            origRemoveTrack.apply(this, arguments);

            const idx = this._senders.indexOf(sender);

            if (idx !== -1) {
              this._senders.splice(idx, 1);
            }
          };
        }

        const origAddStream = window.RTCPeerConnection.prototype.addStream;

        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          this._senders = this._senders || [];
          origAddStream.apply(this, [stream]);
          stream.getTracks().forEach(track => {
            this._senders.push(shimSenderWithDtmf(this, track));
          });
        };

        const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
          this._senders = this._senders || [];
          origRemoveStream.apply(this, [stream]);
          stream.getTracks().forEach(track => {
            const sender = this._senders.find(s => s.track === track);

            if (sender) {
              this._senders.splice(this._senders.indexOf(sender), 1);
            }
          });
        };
      } else if (typeof window === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;

        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach(sender => sender._pc = this);
          return senders;
        };

        Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
          get() {
            if (this._dtmf === undefined) {
              if (this.track.kind === 'audio') {
                this._dtmf = this._pc.createDTMFSender(this.track);
              } else {
                this._dtmf = null;
              }
            }

            return this._dtmf;
          }

        });
      }
    }

    function shimGetStats(window) {
      if (!window.RTCPeerConnection) {
        return;
      }

      const origGetStats = window.RTCPeerConnection.prototype.getStats;

      window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;

        if (arguments.length > 0 && typeof selector === 'function') {
          return origGetStats.apply(this, arguments);
        }


        if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
          return origGetStats.apply(this, []);
        }

        const fixChromeStats_ = function (response) {
          const standardReport = {};
          const reports = response.result();
          reports.forEach(report => {
            const standardStats = {
              id: report.id,
              timestamp: report.timestamp,
              type: {
                localcandidate: 'local-candidate',
                remotecandidate: 'remote-candidate'
              }[report.type] || report.type
            };
            report.names().forEach(name => {
              standardStats[name] = report.stat(name);
            });
            standardReport[standardStats.id] = standardStats;
          });
          return standardReport;
        };


        const makeMapStats = function (stats) {
          return new Map(Object.keys(stats).map(key => [key, stats[key]]));
        };

        if (arguments.length >= 2) {
          const successCallbackWrapper_ = function (response) {
            onSucc(makeMapStats(fixChromeStats_(response)));
          };

          return origGetStats.apply(this, [successCallbackWrapper_, selector]);
        }


        return new Promise((resolve, reject) => {
          origGetStats.apply(this, [function (response) {
            resolve(makeMapStats(fixChromeStats_(response)));
          }, reject]);
        }).then(onSucc, onErr);
      };
    }

    function shimSenderReceiverGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
        return;
      }


      if (!('getStats' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;

        if (origGetSenders) {
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            const senders = origGetSenders.apply(this, []);
            senders.forEach(sender => sender._pc = this);
            return senders;
          };
        }

        const origAddTrack = window.RTCPeerConnection.prototype.addTrack;

        if (origAddTrack) {
          window.RTCPeerConnection.prototype.addTrack = function addTrack() {
            const sender = origAddTrack.apply(this, arguments);
            sender._pc = this;
            return sender;
          };
        }

        window.RTCRtpSender.prototype.getStats = function getStats() {
          const sender = this;
          return this._pc.getStats().then(result =>
            utils.filterStats(result, sender.track, true));
        };
      }


      if (!('getStats' in window.RTCRtpReceiver.prototype)) {
        const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;

        if (origGetReceivers) {
          window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
            const receivers = origGetReceivers.apply(this, []);
            receivers.forEach(receiver => receiver._pc = this);
            return receivers;
          };
        }

        utils.wrapPeerConnectionEvent(window, 'track', e => {
          e.receiver._pc = e.srcElement;
          return e;
        });

        window.RTCRtpReceiver.prototype.getStats = function getStats() {
          const receiver = this;
          return this._pc.getStats().then(result => utils.filterStats(result, receiver.track, false));
        };
      }

      if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
        return;
      }


      const origGetStats = window.RTCPeerConnection.prototype.getStats;

      window.RTCPeerConnection.prototype.getStats = function getStats() {
        if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
          const track = arguments[0];
          let sender;
          let receiver;
          let err;
          this.getSenders().forEach(s => {
            if (s.track === track) {
              if (sender) {
                err = true;
              } else {
                sender = s;
              }
            }
          });
          this.getReceivers().forEach(r => {
            if (r.track === track) {
              if (receiver) {
                err = true;
              } else {
                receiver = r;
              }
            }

            return r.track === track;
          });

          if (err || sender && receiver) {
            return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
          } else if (sender) {
            return sender.getStats();
          } else if (receiver) {
            return receiver.getStats();
          }

          return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
        }

        return origGetStats.apply(this, arguments);
      };
    }

    function shimAddTrackRemoveTrackWithNative(window) {
      window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        return Object.keys(this._shimmedLocalStreams).map(streamId => this._shimmedLocalStreams[streamId][0]);
      };

      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;

      window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        if (!stream) {
          return origAddTrack.apply(this, arguments);
        }

        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        const sender = origAddTrack.apply(this, arguments);

        if (!this._shimmedLocalStreams[stream.id]) {
          this._shimmedLocalStreams[stream.id] = [stream, sender];
        } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
          this._shimmedLocalStreams[stream.id].push(sender);
        }

        return sender;
      };

      const origAddStream = window.RTCPeerConnection.prototype.addStream;

      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        stream.getTracks().forEach(track => {
          const alreadyExists = this.getSenders().find(s => s.track === track);

          if (alreadyExists) {
            throw new DOMException('Track already exists.', 'InvalidAccessError');
          }
        });
        const existingSenders = this.getSenders();
        origAddStream.apply(this, arguments);
        const newSenders = this.getSenders().filter(newSender => existingSenders.indexOf(newSender) === -1);
        this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
      };

      const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

      window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        delete this._shimmedLocalStreams[stream.id];
        return origRemoveStream.apply(this, arguments);
      };

      const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;

      window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};

        if (sender) {
          Object.keys(this._shimmedLocalStreams).forEach(streamId => {
            const idx = this._shimmedLocalStreams[streamId].indexOf(sender);

            if (idx !== -1) {
              this._shimmedLocalStreams[streamId].splice(idx, 1);
            }

            if (this._shimmedLocalStreams[streamId].length === 1) {
              delete this._shimmedLocalStreams[streamId];
            }
          });
        }

        return origRemoveTrack.apply(this, arguments);
      };
    }

    function shimAddTrackRemoveTrack(window) {
      if (!window.RTCPeerConnection) {
        return;
      }

      const browserDetails = utils.detectBrowser(window);

      if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
        return shimAddTrackRemoveTrackWithNative(window);
      }


      const origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;

      window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        const nativeStreams = origGetLocalStreams.apply(this);
        this._reverseStreams = this._reverseStreams || {};
        return nativeStreams.map(stream => this._reverseStreams[stream.id]);
      };

      const origAddStream = window.RTCPeerConnection.prototype.addStream;

      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        stream.getTracks().forEach(track => {
          const alreadyExists = this.getSenders().find(s => s.track === track);

          if (alreadyExists) {
            throw new DOMException('Track already exists.', 'InvalidAccessError');
          }
        });

        if (!this._reverseStreams[stream.id]) {
          const newStream = new window.MediaStream(stream.getTracks());
          this._streams[stream.id] = newStream;
          this._reverseStreams[newStream.id] = stream;
          stream = newStream;
        }

        origAddStream.apply(this, [stream]);
      };

      const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

      window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
        delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
        delete this._streams[stream.id];
      };

      window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        if (this.signalingState === 'closed') {
          throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
        }

        const streams = [].slice.call(arguments, 1);

        if (streams.length !== 1 || !streams[0].getTracks().find(t => t === track)) {
          throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
        }

        const alreadyExists = this.getSenders().find(s => s.track === track);

        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }

        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        const oldStream = this._streams[stream.id];

        if (oldStream) {
          oldStream.addTrack(track);

          Promise.resolve().then(() => {
            this.dispatchEvent(new Event('negotiationneeded'));
          });
        } else {
          const newStream = new window.MediaStream([track]);
          this._streams[stream.id] = newStream;
          this._reverseStreams[newStream.id] = stream;
          this.addStream(newStream);
        }

        return this.getSenders().find(s => s.track === track);
      };


      function replaceInternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(internalId => {
          const externalStream = pc._reverseStreams[internalId];
          const internalStream = pc._streams[externalStream.id];
          sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
        });
        return new RTCSessionDescription({
          type: description.type,
          sdp
        });
      }

      function replaceExternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(internalId => {
          const externalStream = pc._reverseStreams[internalId];
          const internalStream = pc._streams[externalStream.id];
          sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
        });
        return new RTCSessionDescription({
          type: description.type,
          sdp
        });
      }

      ['createOffer', 'createAnswer'].forEach(function (method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
          [method]() {
            const args = arguments;
            const isLegacyCall = arguments.length && typeof arguments[0] === 'function';

            if (isLegacyCall) {
              return nativeMethod.apply(this, [description => {
                const desc = replaceInternalStreamId(this, description);
                args[0].apply(null, [desc]);
              }, err => {
                if (args[1]) {
                  args[1].apply(null, err);
                }
              }, arguments[2]]);
            }

            return nativeMethod.apply(this, arguments).then(description => replaceInternalStreamId(this, description));
          }

        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
      });
      const origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;

      window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
        if (!arguments.length || !arguments[0].type) {
          return origSetLocalDescription.apply(this, arguments);
        }

        arguments[0] = replaceExternalStreamId(this, arguments[0]);
        return origSetLocalDescription.apply(this, arguments);
      };


      const origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
      Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
        get() {
          const description = origLocalDescription.get.apply(this);

          if (description.type === '') {
            return description;
          }

          return replaceInternalStreamId(this, description);
        }

      });

      window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        if (this.signalingState === 'closed') {
          throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
        }


        if (!sender._pc) {
          throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
        }

        const isLocal = sender._pc === this;

        if (!isLocal) {
          throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
        }


        this._streams = this._streams || {};
        let stream;
        Object.keys(this._streams).forEach(streamid => {
          const hasTrack = this._streams[streamid].getTracks().find(track => sender.track === track);

          if (hasTrack) {
            stream = this._streams[streamid];
          }
        });

        if (stream) {
          if (stream.getTracks().length === 1) {
            this.removeStream(this._reverseStreams[stream.id]);
          } else {
            stream.removeTrack(sender.track);
          }

          this.dispatchEvent(new Event('negotiationneeded'));
        }
      };
    }

    function shimPeerConnection(window) {
      const browserDetails = utils.detectBrowser(window);

      if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
        window.RTCPeerConnection = window.webkitRTCPeerConnection;
      }

      if (!window.RTCPeerConnection) {
        return;
      }


      if (browserDetails.version < 53) {
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
          const nativeMethod = window.RTCPeerConnection.prototype[method];
          const methodObj = {
            [method]() {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            }

          };
          window.RTCPeerConnection.prototype[method] = methodObj[method];
        });
      }


      const nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;

      window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
        if (!arguments[0]) {
          if (arguments[1]) {
            arguments[1].apply(null);
          }

          return Promise.resolve();
        }


        if (browserDetails.version < 78 && arguments[0] && arguments[0].candidate === '') {
          return Promise.resolve();
        }

        return nativeAddIceCandidate.apply(this, arguments);
      };
    }

    function fixNegotiationNeeded(window) {
      utils.wrapPeerConnectionEvent(window, 'negotiationneeded', e => {
        const pc = e.target;

        if (pc.signalingState !== 'stable') {
          return;
        }

        return e;
      });
    }

  }, { "../utils.js": 112, "./getdisplaymedia": 101, "./getusermedia": 102 }], 101: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimGetDisplayMedia = shimGetDisplayMedia;

    function shimGetDisplayMedia(window, getSourceId) {
      if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }

      if (!window.navigator.mediaDevices) {
        return;
      }


      if (typeof getSourceId !== 'function') {
        console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
        return;
      }

      window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
        return getSourceId(constraints).then(sourceId => {
          const widthSpecified = constraints.video && constraints.video.width;
          const heightSpecified = constraints.video && constraints.video.height;
          const frameRateSpecified = constraints.video && constraints.video.frameRate;
          constraints.video = {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sourceId,
              maxFrameRate: frameRateSpecified || 3
            }
          };

          if (widthSpecified) {
            constraints.video.mandatory.maxWidth = widthSpecified;
          }

          if (heightSpecified) {
            constraints.video.mandatory.maxHeight = heightSpecified;
          }

          return window.navigator.mediaDevices.getUserMedia(constraints);
        });
      };
    }

  }, {}], 102: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimGetUserMedia = shimGetUserMedia;

    var utils = _interopRequireWildcard(require("../utils.js"));

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    const logging = utils.log;

    function shimGetUserMedia(window) {
      const navigator = window && window.navigator;

      if (!navigator.mediaDevices) {
        return;
      }

      const browserDetails = utils.detectBrowser(window);

      const constraintsToChrome_ = function (c) {
        if (typeof c !== 'object' || c.mandatory || c.optional) {
          return c;
        }

        const cc = {};
        Object.keys(c).forEach(key => {
          if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
            return;
          }

          const r = typeof c[key] === 'object' ? c[key] : {
            ideal: c[key]
          };

          if (r.exact !== undefined && typeof r.exact === 'number') {
            r.min = r.max = r.exact;
          }

          const oldname_ = function (prefix, name) {
            if (prefix) {
              return prefix + name.charAt(0).toUpperCase() + name.slice(1);
            }

            return name === 'deviceId' ? 'sourceId' : name;
          };

          if (r.ideal !== undefined) {
            cc.optional = cc.optional || [];
            let oc = {};

            if (typeof r.ideal === 'number') {
              oc[oldname_('min', key)] = r.ideal;
              cc.optional.push(oc);
              oc = {};
              oc[oldname_('max', key)] = r.ideal;
              cc.optional.push(oc);
            } else {
              oc[oldname_('', key)] = r.ideal;
              cc.optional.push(oc);
            }
          }

          if (r.exact !== undefined && typeof r.exact !== 'number') {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_('', key)] = r.exact;
          } else {
            ['min', 'max'].forEach(mix => {
              if (r[mix] !== undefined) {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_(mix, key)] = r[mix];
              }
            });
          }
        });

        if (c.advanced) {
          cc.optional = (cc.optional || []).concat(c.advanced);
        }

        return cc;
      };

      const shimConstraints_ = function (constraints, func) {
        if (browserDetails.version >= 61) {
          return func(constraints);
        }

        constraints = JSON.parse(JSON.stringify(constraints));

        if (constraints && typeof constraints.audio === 'object') {
          const remap = function (obj, a, b) {
            if (a in obj && !(b in obj)) {
              obj[b] = obj[a];
              delete obj[a];
            }
          };

          constraints = JSON.parse(JSON.stringify(constraints));
          remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
          remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
          constraints.audio = constraintsToChrome_(constraints.audio);
        }

        if (constraints && typeof constraints.video === 'object') {
          let face = constraints.video.facingMode;
          face = face && (typeof face === 'object' ? face : {
            ideal: face
          });
          const getSupportedFacingModeLies = browserDetails.version < 66;

          if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
            delete constraints.video.facingMode;
            let matches;

            if (face.exact === 'environment' || face.ideal === 'environment') {
              matches = ['back', 'rear'];
            } else if (face.exact === 'user' || face.ideal === 'user') {
              matches = ['front'];
            }

            if (matches) {
              return navigator.mediaDevices.enumerateDevices().then(devices => {
                devices = devices.filter(d => d.kind === 'videoinput');
                let dev = devices.find(d => matches.some(match => d.label.toLowerCase().includes(match)));

                if (!dev && devices.length && matches.includes('back')) {
                  dev = devices[devices.length - 1];
                }

                if (dev) {
                  constraints.video.deviceId = face.exact ? {
                    exact: dev.deviceId
                  } : {
                      ideal: dev.deviceId
                    };
                }

                constraints.video = constraintsToChrome_(constraints.video);
                logging('chrome: ' + JSON.stringify(constraints));
                return func(constraints);
              });
            }
          }

          constraints.video = constraintsToChrome_(constraints.video);
        }

        logging('chrome: ' + JSON.stringify(constraints));
        return func(constraints);
      };

      const shimError_ = function (e) {
        if (browserDetails.version >= 64) {
          return e;
        }

        return {
          name: {
            PermissionDeniedError: 'NotAllowedError',
            PermissionDismissedError: 'NotAllowedError',
            InvalidStateError: 'NotAllowedError',
            DevicesNotFoundError: 'NotFoundError',
            ConstraintNotSatisfiedError: 'OverconstrainedError',
            TrackStartError: 'NotReadableError',
            MediaDeviceFailedDueToShutdown: 'NotAllowedError',
            MediaDeviceKillSwitchOn: 'NotAllowedError',
            TabCaptureError: 'AbortError',
            ScreenCaptureError: 'AbortError',
            DeviceCaptureError: 'AbortError'
          }[e.name] || e.name,
          message: e.message,
          constraint: e.constraint || e.constraintName,

          toString() {
            return this.name + (this.message && ': ') + this.message;
          }

        };
      };

      const getUserMedia_ = function (constraints, onSuccess, onError) {
        shimConstraints_(constraints, c => {
          navigator.webkitGetUserMedia(c, onSuccess, e => {
            if (onError) {
              onError(shimError_(e));
            }
          });
        });
      };

      navigator.getUserMedia = getUserMedia_.bind(navigator);

      if (navigator.mediaDevices.getUserMedia) {
        const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

        navigator.mediaDevices.getUserMedia = function (cs) {
          return shimConstraints_(cs, c => origGetUserMedia(c).then(stream => {
            if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
              stream.getTracks().forEach(track => {
                track.stop();
              });
              throw new DOMException('', 'NotFoundError');
            }

            return stream;
          }, e => Promise.reject(shimError_(e))));
        };
      }
    }

  }, { "../utils.js": 112 }], 103: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimRTCIceCandidate = shimRTCIceCandidate;
    exports.shimMaxMessageSize = shimMaxMessageSize;
    exports.shimSendThrowTypeError = shimSendThrowTypeError;
    exports.shimConnectionState = shimConnectionState;
    exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

    var _sdp = _interopRequireDefault(require("sdp"));

    var utils = _interopRequireWildcard(require("./utils"));

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function shimRTCIceCandidate(window) {
      if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
        return;
      }

      const NativeRTCIceCandidate = window.RTCIceCandidate;

      window.RTCIceCandidate = function RTCIceCandidate(args) {
        if (typeof args === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
          args = JSON.parse(JSON.stringify(args));
          args.candidate = args.candidate.substr(2);
        }

        if (args.candidate && args.candidate.length) {
          const nativeCandidate = new NativeRTCIceCandidate(args);

          const parsedCandidate = _sdp.default.parseCandidate(args.candidate);

          const augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

          augmentedCandidate.toJSON = function toJSON() {
            return {
              candidate: augmentedCandidate.candidate,
              sdpMid: augmentedCandidate.sdpMid,
              sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
              usernameFragment: augmentedCandidate.usernameFragment
            };
          };

          return augmentedCandidate;
        }

        return new NativeRTCIceCandidate(args);
      };

      window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

      utils.wrapPeerConnectionEvent(window, 'icecandidate', e => {
        if (e.candidate) {
          Object.defineProperty(e, 'candidate', {
            value: new window.RTCIceCandidate(e.candidate),
            writable: 'false'
          });
        }

        return e;
      });
    }

    function shimMaxMessageSize(window) {
      if (!window.RTCPeerConnection) {
        return;
      }

      const browserDetails = utils.detectBrowser(window);

      if (!('sctp' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
          get() {
            return typeof this._sctp === 'undefined' ? null : this._sctp;
          }

        });
      }

      const sctpInDescription = function (description) {
        if (!description || !description.sdp) {
          return false;
        }

        const sections = _sdp.default.splitSections(description.sdp);

        sections.shift();
        return sections.some(mediaSection => {
          const mLine = _sdp.default.parseMLine(mediaSection);

          return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
        });
      };

      const getRemoteFirefoxVersion = function (description) {
        const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);

        if (match === null || match.length < 2) {
          return -1;
        }

        const version = parseInt(match[1], 10);

        return version !== version ? -1 : version;
      };

      const getCanSendMaxMessageSize = function (remoteIsFirefox) {
        let canSendMaxMessageSize = 65536;

        if (browserDetails.browser === 'firefox') {
          if (browserDetails.version < 57) {
            if (remoteIsFirefox === -1) {
              canSendMaxMessageSize = 16384;
            } else {
              canSendMaxMessageSize = 2147483637;
            }
          } else if (browserDetails.version < 60) {
            canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
          } else {
            canSendMaxMessageSize = 2147483637;
          }
        }

        return canSendMaxMessageSize;
      };

      const getMaxMessageSize = function (description, remoteIsFirefox) {
        let maxMessageSize = 65536;

        if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
          maxMessageSize = 65535;
        }

        const match = _sdp.default.matchPrefix(description.sdp, 'a=max-message-size:');

        if (match.length > 0) {
          maxMessageSize = parseInt(match[0].substr(19), 10);
        } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
          maxMessageSize = 2147483637;
        }

        return maxMessageSize;
      };

      const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

      window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        this._sctp = null;

        if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
          const {
            sdpSemantics
          } = this.getConfiguration();

          if (sdpSemantics === 'plan-b') {
            Object.defineProperty(this, 'sctp', {
              get() {
                return typeof this._sctp === 'undefined' ? null : this._sctp;
              },

              enumerable: true,
              configurable: true
            });
          }
        }

        if (sctpInDescription(arguments[0])) {
          const isFirefox = getRemoteFirefoxVersion(arguments[0]);

          const canSendMMS = getCanSendMaxMessageSize(isFirefox);

          const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

          let maxMessageSize;

          if (canSendMMS === 0 && remoteMMS === 0) {
            maxMessageSize = Number.POSITIVE_INFINITY;
          } else if (canSendMMS === 0 || remoteMMS === 0) {
            maxMessageSize = Math.max(canSendMMS, remoteMMS);
          } else {
            maxMessageSize = Math.min(canSendMMS, remoteMMS);
          }


          const sctp = {};
          Object.defineProperty(sctp, 'maxMessageSize', {
            get() {
              return maxMessageSize;
            }

          });
          this._sctp = sctp;
        }

        return origSetRemoteDescription.apply(this, arguments);
      };
    }

    function shimSendThrowTypeError(window) {
      if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
        return;
      }


      function wrapDcSend(dc, pc) {
        const origDataChannelSend = dc.send;

        dc.send = function send() {
          const data = arguments[0];
          const length = data.length || data.size || data.byteLength;

          if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
            throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
          }

          return origDataChannelSend.apply(dc, arguments);
        };
      }

      const origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;

      window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
        const dataChannel = origCreateDataChannel.apply(this, arguments);
        wrapDcSend(dataChannel, this);
        return dataChannel;
      };

      utils.wrapPeerConnectionEvent(window, 'datachannel', e => {
        wrapDcSend(e.channel, e.target);
        return e;
      });
    }


    function shimConnectionState(window) {
      if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
        return;
      }

      const proto = window.RTCPeerConnection.prototype;
      Object.defineProperty(proto, 'connectionState', {
        get() {
          return {
            completed: 'connected',
            checking: 'connecting'
          }[this.iceConnectionState] || this.iceConnectionState;
        },

        enumerable: true,
        configurable: true
      });
      Object.defineProperty(proto, 'onconnectionstatechange', {
        get() {
          return this._onconnectionstatechange || null;
        },

        set(cb) {
          if (this._onconnectionstatechange) {
            this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
            delete this._onconnectionstatechange;
          }

          if (cb) {
            this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
          }
        },

        enumerable: true,
        configurable: true
      });
      ['setLocalDescription', 'setRemoteDescription'].forEach(method => {
        const origMethod = proto[method];

        proto[method] = function () {
          if (!this._connectionstatechangepoly) {
            this._connectionstatechangepoly = e => {
              const pc = e.target;

              if (pc._lastConnectionState !== pc.connectionState) {
                pc._lastConnectionState = pc.connectionState;
                const newEvent = new Event('connectionstatechange', e);
                pc.dispatchEvent(newEvent);
              }

              return e;
            };

            this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
          }

          return origMethod.apply(this, arguments);
        };
      });
    }

    function removeAllowExtmapMixed(window) {
      if (!window.RTCPeerConnection) {
        return;
      }

      const browserDetails = utils.detectBrowser(window);

      if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
        return;
      }

      const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;

      window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
        if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
          desc.sdp = desc.sdp.split('\n').filter(line => {
            return line.trim() !== 'a=extmap-allow-mixed';
          }).join('\n');
        }

        return nativeSRD.apply(this, arguments);
      };
    }

  }, { "./utils": 112, "sdp": 86 }], 104: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimPeerConnection = shimPeerConnection;
    exports.shimReplaceTrack = shimReplaceTrack;
    Object.defineProperty(exports, "shimGetUserMedia", {
      enumerable: true,
      get: function () {
        return _getusermedia.shimGetUserMedia;
      }
    });
    Object.defineProperty(exports, "shimGetDisplayMedia", {
      enumerable: true,
      get: function () {
        return _getdisplaymedia.shimGetDisplayMedia;
      }
    });

    var utils = _interopRequireWildcard(require("../utils"));

    var _filtericeservers = require("./filtericeservers");

    var _rtcpeerconnectionShim = _interopRequireDefault(require("rtcpeerconnection-shim"));

    var _getusermedia = require("./getusermedia");

    var _getdisplaymedia = require("./getdisplaymedia");

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function shimPeerConnection(window) {
      const browserDetails = utils.detectBrowser(window);

      if (window.RTCIceGatherer) {
        if (!window.RTCIceCandidate) {
          window.RTCIceCandidate = function RTCIceCandidate(args) {
            return args;
          };
        }

        if (!window.RTCSessionDescription) {
          window.RTCSessionDescription = function RTCSessionDescription(args) {
            return args;
          };
        }


        if (browserDetails.version < 15025) {
          const origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
          Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
            set(value) {
              origMSTEnabled.set.call(this, value);
              const ev = new Event('enabled');
              ev.enabled = value;
              this.dispatchEvent(ev);
            }

          });
        }
      }


      if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
        Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
          get() {
            if (this._dtmf === undefined) {
              if (this.track.kind === 'audio') {
                this._dtmf = new window.RTCDtmfSender(this);
              } else if (this.track.kind === 'video') {
                this._dtmf = null;
              }
            }

            return this._dtmf;
          }

        });
      }


      if (window.RTCDtmfSender && !window.RTCDTMFSender) {
        window.RTCDTMFSender = window.RTCDtmfSender;
      }

      const RTCPeerConnectionShim = (0, _rtcpeerconnectionShim.default)(window, browserDetails.version);

      window.RTCPeerConnection = function RTCPeerConnection(config) {
        if (config && config.iceServers) {
          config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
          utils.log('ICE servers after filtering:', config.iceServers);
        }

        return new RTCPeerConnectionShim(config);
      };

      window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
    }

    function shimReplaceTrack(window) {
      if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
        window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
      }
    }

  }, { "../utils": 112, "./filtericeservers": 105, "./getdisplaymedia": 106, "./getusermedia": 107, "rtcpeerconnection-shim": 85 }], 105: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.filterIceServers = filterIceServers;

    var utils = _interopRequireWildcard(require("../utils"));

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function filterIceServers(iceServers, edgeVersion) {
      let hasTurn = false;
      iceServers = JSON.parse(JSON.stringify(iceServers));
      return iceServers.filter(server => {
        if (server && (server.urls || server.url)) {
          var urls = server.urls || server.url;

          if (server.url && !server.urls) {
            utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
          }

          const isString = typeof urls === 'string';

          if (isString) {
            urls = [urls];
          }

          urls = urls.filter(url => {
            if (url.indexOf('stun:') === 0) {
              return false;
            }

            const validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');

            if (validTurn && !hasTurn) {
              hasTurn = true;
              return true;
            }

            return validTurn && !hasTurn;
          });
          delete server.url;
          server.urls = isString ? urls[0] : urls;
          return !!urls.length;
        }
      });
    }

  }, { "../utils": 112 }], 106: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimGetDisplayMedia = shimGetDisplayMedia;

    function shimGetDisplayMedia(window) {
      if (!('getDisplayMedia' in window.navigator)) {
        return;
      }

      if (!window.navigator.mediaDevices) {
        return;
      }

      if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }

      window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
    }

  }, {}], 107: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimGetUserMedia = shimGetUserMedia;

    function shimGetUserMedia(window) {
      const navigator = window && window.navigator;

      const shimError_ = function (e) {
        return {
          name: {
            PermissionDeniedError: 'NotAllowedError'
          }[e.name] || e.name,
          message: e.message,
          constraint: e.constraint,

          toString() {
            return this.name;
          }

        };
      };


      const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

      navigator.mediaDevices.getUserMedia = function (c) {
        return origGetUserMedia(c).catch(e => Promise.reject(shimError_(e)));
      };
    }

  }, {}], 108: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimOnTrack = shimOnTrack;
    exports.shimPeerConnection = shimPeerConnection;
    exports.shimSenderGetStats = shimSenderGetStats;
    exports.shimReceiverGetStats = shimReceiverGetStats;
    exports.shimRemoveStream = shimRemoveStream;
    exports.shimRTCDataChannel = shimRTCDataChannel;
    exports.shimAddTransceiver = shimAddTransceiver;
    exports.shimCreateOffer = shimCreateOffer;
    exports.shimCreateAnswer = shimCreateAnswer;
    Object.defineProperty(exports, "shimGetUserMedia", {
      enumerable: true,
      get: function () {
        return _getusermedia.shimGetUserMedia;
      }
    });
    Object.defineProperty(exports, "shimGetDisplayMedia", {
      enumerable: true,
      get: function () {
        return _getdisplaymedia.shimGetDisplayMedia;
      }
    });

    var utils = _interopRequireWildcard(require("../utils"));

    var _getusermedia = require("./getusermedia");

    var _getdisplaymedia = require("./getdisplaymedia");

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function shimOnTrack(window) {
      if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
        Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
          get() {
            return {
              receiver: this.receiver
            };
          }

        });
      }
    }

    function shimPeerConnection(window) {
      const browserDetails = utils.detectBrowser(window);

      if (typeof window !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
        return;
      }

      if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
        window.RTCPeerConnection = window.mozRTCPeerConnection;
      }

      if (browserDetails.version < 53) {
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
          const nativeMethod = window.RTCPeerConnection.prototype[method];
          const methodObj = {
            [method]() {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            }

          };
          window.RTCPeerConnection.prototype[method] = methodObj[method];
        });
      }


      if (browserDetails.version < 68) {
        const nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;

        window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
          if (!arguments[0]) {
            if (arguments[1]) {
              arguments[1].apply(null);
            }

            return Promise.resolve();
          }


          if (arguments[0] && arguments[0].candidate === '') {
            return Promise.resolve();
          }

          return nativeAddIceCandidate.apply(this, arguments);
        };
      }

      const modernStatsTypes = {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
      };
      const nativeGetStats = window.RTCPeerConnection.prototype.getStats;

      window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;
        return nativeGetStats.apply(this, [selector || null]).then(stats => {
          if (browserDetails.version < 53 && !onSucc) {
            try {
              stats.forEach(stat => {
                stat.type = modernStatsTypes[stat.type] || stat.type;
              });
            } catch (e) {
              if (e.name !== 'TypeError') {
                throw e;
              }


              stats.forEach((stat, i) => {
                stats.set(i, Object.assign({}, stat, {
                  type: modernStatsTypes[stat.type] || stat.type
                }));
              });
            }
          }

          return stats;
        }).then(onSucc, onErr);
      };
    }

    function shimSenderGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
        return;
      }

      if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
        return;
      }

      const origGetSenders = window.RTCPeerConnection.prototype.getSenders;

      if (origGetSenders) {
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach(sender => sender._pc = this);
          return senders;
        };
      }

      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;

      if (origAddTrack) {
        window.RTCPeerConnection.prototype.addTrack = function addTrack() {
          const sender = origAddTrack.apply(this, arguments);
          sender._pc = this;
          return sender;
        };
      }

      window.RTCRtpSender.prototype.getStats = function getStats() {
        return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
      };
    }

    function shimReceiverGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
        return;
      }

      if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
        return;
      }

      const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;

      if (origGetReceivers) {
        window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
          const receivers = origGetReceivers.apply(this, []);
          receivers.forEach(receiver => receiver._pc = this);
          return receivers;
        };
      }

      utils.wrapPeerConnectionEvent(window, 'track', e => {
        e.receiver._pc = e.srcElement;
        return e;
      });

      window.RTCRtpReceiver.prototype.getStats = function getStats() {
        return this._pc.getStats(this.track);
      };
    }

    function shimRemoveStream(window) {
      if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
        return;
      }

      window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        utils.deprecated('removeStream', 'removeTrack');
        this.getSenders().forEach(sender => {
          if (sender.track && stream.getTracks().includes(sender.track)) {
            this.removeTrack(sender);
          }
        });
      };
    }

    function shimRTCDataChannel(window) {
      if (window.DataChannel && !window.RTCDataChannel) {
        window.RTCDataChannel = window.DataChannel;
      }
    }

    function shimAddTransceiver(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }

      const origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;

      if (origAddTransceiver) {
        window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
          this.setParametersPromises = [];
          const initParameters = arguments[1];
          const shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;

          if (shouldPerformCheck) {
            initParameters.sendEncodings.forEach(encodingParam => {
              if ('rid' in encodingParam) {
                const ridRegex = /^[a-z0-9]{0,16}$/i;

                if (!ridRegex.test(encodingParam.rid)) {
                  throw new TypeError('Invalid RID value provided.');
                }
              }

              if ('scaleResolutionDownBy' in encodingParam) {
                if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                  throw new RangeError('scale_resolution_down_by must be >= 1.0');
                }
              }

              if ('maxFramerate' in encodingParam) {
                if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                  throw new RangeError('max_framerate must be >= 0.0');
                }
              }
            });
          }

          const transceiver = origAddTransceiver.apply(this, arguments);

          if (shouldPerformCheck) {
            const {
              sender
            } = transceiver;
            const params = sender.getParameters();

            if (!('encodings' in params)) {
              params.encodings = initParameters.sendEncodings;
              this.setParametersPromises.push(sender.setParameters(params).catch(() => { }));
            }
          }

          return transceiver;
        };
      }
    }

    function shimCreateOffer(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }

      const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;

      window.RTCPeerConnection.prototype.createOffer = function createOffer() {
        if (this.setParametersPromises && this.setParametersPromises.length) {
          return Promise.all(this.setParametersPromises).then(() => {
            return origCreateOffer.apply(this, arguments);
          }).finally(() => {
            this.setParametersPromises = [];
          });
        }

        return origCreateOffer.apply(this, arguments);
      };
    }

    function shimCreateAnswer(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }

      const origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;

      window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
        if (this.setParametersPromises && this.setParametersPromises.length) {
          return Promise.all(this.setParametersPromises).then(() => {
            return origCreateAnswer.apply(this, arguments);
          }).finally(() => {
            this.setParametersPromises = [];
          });
        }

        return origCreateAnswer.apply(this, arguments);
      };
    }

  }, { "../utils": 112, "./getdisplaymedia": 109, "./getusermedia": 110 }], 109: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimGetDisplayMedia = shimGetDisplayMedia;

    function shimGetDisplayMedia(window, preferredMediaSource) {
      if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }

      if (!window.navigator.mediaDevices) {
        return;
      }

      window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
        if (!(constraints && constraints.video)) {
          const err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
          err.name = 'NotFoundError';

          err.code = 8;
          return Promise.reject(err);
        }

        if (constraints.video === true) {
          constraints.video = {
            mediaSource: preferredMediaSource
          };
        } else {
          constraints.video.mediaSource = preferredMediaSource;
        }

        return window.navigator.mediaDevices.getUserMedia(constraints);
      };
    }

  }, {}], 110: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimGetUserMedia = shimGetUserMedia;

    var utils = _interopRequireWildcard(require("../utils"));

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function shimGetUserMedia(window) {
      const browserDetails = utils.detectBrowser(window);
      const navigator = window && window.navigator;
      const MediaStreamTrack = window && window.MediaStreamTrack;

      navigator.getUserMedia = function (constraints, onSuccess, onError) {
        utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      };

      if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
        const remap = function (obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };

        const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

        navigator.mediaDevices.getUserMedia = function (c) {
          if (typeof c === 'object' && typeof c.audio === 'object') {
            c = JSON.parse(JSON.stringify(c));
            remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
            remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
          }

          return nativeGetUserMedia(c);
        };

        if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
          const nativeGetSettings = MediaStreamTrack.prototype.getSettings;

          MediaStreamTrack.prototype.getSettings = function () {
            const obj = nativeGetSettings.apply(this, arguments);
            remap(obj, 'mozAutoGainControl', 'autoGainControl');
            remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
            return obj;
          };
        }

        if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
          const nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;

          MediaStreamTrack.prototype.applyConstraints = function (c) {
            if (this.kind === 'audio' && typeof c === 'object') {
              c = JSON.parse(JSON.stringify(c));
              remap(c, 'autoGainControl', 'mozAutoGainControl');
              remap(c, 'noiseSuppression', 'mozNoiseSuppression');
            }

            return nativeApplyConstraints.apply(this, [c]);
          };
        }
      }
    }

  }, { "../utils": 112 }], 111: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
    exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
    exports.shimCallbacksAPI = shimCallbacksAPI;
    exports.shimGetUserMedia = shimGetUserMedia;
    exports.shimConstraints = shimConstraints;
    exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
    exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
    exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

    var utils = _interopRequireWildcard(require("../utils"));

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function shimLocalStreamsAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }

      if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
          if (!this._localStreams) {
            this._localStreams = [];
          }

          return this._localStreams;
        };
      }

      if (!('addStream' in window.RTCPeerConnection.prototype)) {
        const _addTrack = window.RTCPeerConnection.prototype.addTrack;

        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          if (!this._localStreams) {
            this._localStreams = [];
          }

          if (!this._localStreams.includes(stream)) {
            this._localStreams.push(stream);
          }


          stream.getAudioTracks().forEach(track => _addTrack.call(this, track, stream));
          stream.getVideoTracks().forEach(track => _addTrack.call(this, track, stream));
        };

        window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
          const stream = arguments[1];

          if (stream) {
            if (!this._localStreams) {
              this._localStreams = [stream];
            } else if (!this._localStreams.includes(stream)) {
              this._localStreams.push(stream);
            }
          }

          return _addTrack.apply(this, arguments);
        };
      }

      if (!('removeStream' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
          if (!this._localStreams) {
            this._localStreams = [];
          }

          const index = this._localStreams.indexOf(stream);

          if (index === -1) {
            return;
          }

          this._localStreams.splice(index, 1);

          const tracks = stream.getTracks();
          this.getSenders().forEach(sender => {
            if (tracks.includes(sender.track)) {
              this.removeTrack(sender);
            }
          });
        };
      }
    }

    function shimRemoteStreamsAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }

      if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
          return this._remoteStreams ? this._remoteStreams : [];
        };
      }

      if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
          get() {
            return this._onaddstream;
          },

          set(f) {
            if (this._onaddstream) {
              this.removeEventListener('addstream', this._onaddstream);
              this.removeEventListener('track', this._onaddstreampoly);
            }

            this.addEventListener('addstream', this._onaddstream = f);
            this.addEventListener('track', this._onaddstreampoly = e => {
              e.streams.forEach(stream => {
                if (!this._remoteStreams) {
                  this._remoteStreams = [];
                }

                if (this._remoteStreams.includes(stream)) {
                  return;
                }

                this._remoteStreams.push(stream);

                const event = new Event('addstream');
                event.stream = stream;
                this.dispatchEvent(event);
              });
            });
          }

        });
        const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
          const pc = this;

          if (!this._onaddstreampoly) {
            this.addEventListener('track', this._onaddstreampoly = function (e) {
              e.streams.forEach(stream => {
                if (!pc._remoteStreams) {
                  pc._remoteStreams = [];
                }

                if (pc._remoteStreams.indexOf(stream) >= 0) {
                  return;
                }

                pc._remoteStreams.push(stream);

                const event = new Event('addstream');
                event.stream = stream;
                pc.dispatchEvent(event);
              });
            });
          }

          return origSetRemoteDescription.apply(pc, arguments);
        };
      }
    }

    function shimCallbacksAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }

      const prototype = window.RTCPeerConnection.prototype;
      const origCreateOffer = prototype.createOffer;
      const origCreateAnswer = prototype.createAnswer;
      const setLocalDescription = prototype.setLocalDescription;
      const setRemoteDescription = prototype.setRemoteDescription;
      const addIceCandidate = prototype.addIceCandidate;

      prototype.createOffer = function createOffer(successCallback, failureCallback) {
        const options = arguments.length >= 2 ? arguments[2] : arguments[0];
        const promise = origCreateOffer.apply(this, [options]);

        if (!failureCallback) {
          return promise;
        }

        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };

      prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
        const options = arguments.length >= 2 ? arguments[2] : arguments[0];
        const promise = origCreateAnswer.apply(this, [options]);

        if (!failureCallback) {
          return promise;
        }

        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };

      let withCallback = function (description, successCallback, failureCallback) {
        const promise = setLocalDescription.apply(this, [description]);

        if (!failureCallback) {
          return promise;
        }

        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };

      prototype.setLocalDescription = withCallback;

      withCallback = function (description, successCallback, failureCallback) {
        const promise = setRemoteDescription.apply(this, [description]);

        if (!failureCallback) {
          return promise;
        }

        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };

      prototype.setRemoteDescription = withCallback;

      withCallback = function (candidate, successCallback, failureCallback) {
        const promise = addIceCandidate.apply(this, [candidate]);

        if (!failureCallback) {
          return promise;
        }

        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };

      prototype.addIceCandidate = withCallback;
    }

    function shimGetUserMedia(window) {
      const navigator = window && window.navigator;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaDevices = navigator.mediaDevices;

        const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);

        navigator.mediaDevices.getUserMedia = constraints => {
          return _getUserMedia(shimConstraints(constraints));
        };
      }

      if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
          navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
        }.bind(navigator);
      }
    }

    function shimConstraints(constraints) {
      if (constraints && constraints.video !== undefined) {
        return Object.assign({}, constraints, {
          video: utils.compactObject(constraints.video)
        });
      }

      return constraints;
    }

    function shimRTCIceServerUrls(window) {
      const OrigPeerConnection = window.RTCPeerConnection;

      window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
        if (pcConfig && pcConfig.iceServers) {
          const newIceServers = [];

          for (let i = 0; i < pcConfig.iceServers.length; i++) {
            let server = pcConfig.iceServers[i];

            if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
              utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
              server = JSON.parse(JSON.stringify(server));
              server.urls = server.url;
              delete server.url;
              newIceServers.push(server);
            } else {
              newIceServers.push(pcConfig.iceServers[i]);
            }
          }

          pcConfig.iceServers = newIceServers;
        }

        return new OrigPeerConnection(pcConfig, pcConstraints);
      };

      window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;

      if ('generateCertificate' in window.RTCPeerConnection) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get() {
            return OrigPeerConnection.generateCertificate;
          }

        });
      }
    }

    function shimTrackEventTransceiver(window) {
      if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
        Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
          get() {
            return {
              receiver: this.receiver
            };
          }

        });
      }
    }

    function shimCreateOfferLegacy(window) {
      const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;

      window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
        if (offerOptions) {
          if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
            offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
          }

          const audioTransceiver = this.getTransceivers().find(transceiver => transceiver.receiver.track.kind === 'audio');

          if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
            if (audioTransceiver.direction === 'sendrecv') {
              if (audioTransceiver.setDirection) {
                audioTransceiver.setDirection('sendonly');
              } else {
                audioTransceiver.direction = 'sendonly';
              }
            } else if (audioTransceiver.direction === 'recvonly') {
              if (audioTransceiver.setDirection) {
                audioTransceiver.setDirection('inactive');
              } else {
                audioTransceiver.direction = 'inactive';
              }
            }
          } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
            this.addTransceiver('audio');
          }

          if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
            offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
          }

          const videoTransceiver = this.getTransceivers().find(transceiver => transceiver.receiver.track.kind === 'video');

          if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
            if (videoTransceiver.direction === 'sendrecv') {
              if (videoTransceiver.setDirection) {
                videoTransceiver.setDirection('sendonly');
              } else {
                videoTransceiver.direction = 'sendonly';
              }
            } else if (videoTransceiver.direction === 'recvonly') {
              if (videoTransceiver.setDirection) {
                videoTransceiver.setDirection('inactive');
              } else {
                videoTransceiver.direction = 'inactive';
              }
            }
          } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
            this.addTransceiver('video');
          }
        }

        return origCreateOffer.apply(this, arguments);
      };
    }

  }, { "../utils": 112 }], 112: [function (require, module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.extractVersion = extractVersion;
    exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
    exports.disableLog = disableLog;
    exports.disableWarnings = disableWarnings;
    exports.log = log;
    exports.deprecated = deprecated;
    exports.detectBrowser = detectBrowser;
    exports.compactObject = compactObject;
    exports.walkStats = walkStats;
    exports.filterStats = filterStats;
    let logDisabled_ = true;
    let deprecationWarnings_ = true;

    function extractVersion(uastring, expr, pos) {
      const match = uastring.match(expr);
      return match && match.length >= pos && parseInt(match[pos], 10);
    }


    function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
      if (!window.RTCPeerConnection) {
        return;
      }

      const proto = window.RTCPeerConnection.prototype;
      const nativeAddEventListener = proto.addEventListener;

      proto.addEventListener = function (nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap) {
          return nativeAddEventListener.apply(this, arguments);
        }

        const wrappedCallback = e => {
          const modifiedEvent = wrapper(e);

          if (modifiedEvent) {
            cb(modifiedEvent);
          }
        };

        this._eventMap = this._eventMap || {};
        this._eventMap[cb] = wrappedCallback;
        return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
      };

      const nativeRemoveEventListener = proto.removeEventListener;

      proto.removeEventListener = function (nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
          return nativeRemoveEventListener.apply(this, arguments);
        }

        const unwrappedCb = this._eventMap[cb];
        delete this._eventMap[cb];
        return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
      };

      Object.defineProperty(proto, 'on' + eventNameToWrap, {
        get() {
          return this['_on' + eventNameToWrap];
        },

        set(cb) {
          if (this['_on' + eventNameToWrap]) {
            this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
            delete this['_on' + eventNameToWrap];
          }

          if (cb) {
            this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
          }
        },

        enumerable: true,
        configurable: true
      });
    }

    function disableLog(bool) {
      if (typeof bool !== 'boolean') {
        return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
      }

      logDisabled_ = bool;
      return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
    }


    function disableWarnings(bool) {
      if (typeof bool !== 'boolean') {
        return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
      }

      deprecationWarnings_ = !bool;
      return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
    }

    function log() {
      if (typeof window === 'object') {
        if (logDisabled_) {
          return;
        }

        if (typeof console !== 'undefined' && typeof console.log === 'function') {
          console.log.apply(console, arguments);
        }
      }
    }


    function deprecated(oldMethod, newMethod) {
      if (!deprecationWarnings_) {
        return;
      }

      console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
    }


    function detectBrowser(window) {
      const {
        navigator
      } = window;

      const result = {
        browser: null,
        version: null
      };

      if (typeof window === 'undefined' || !window.navigator) {
        result.browser = 'Not a browser.';
        return result;
      }

      if (navigator.mozGetUserMedia) {
        result.browser = 'firefox';
        result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
      } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
        result.browser = 'chrome';
        result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
      } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
        result.browser = 'edge';
        result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
      } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        result.browser = 'safari';
        result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
        result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
      } else {
        result.browser = 'Not a supported browser.';
        return result;
      }

      return result;
    }


    function isObject(val) {
      return Object.prototype.toString.call(val) === '[object Object]';
    }


    function compactObject(data) {
      if (!isObject(data)) {
        return data;
      }

      return Object.keys(data).reduce(function (accumulator, key) {
        const isObj = isObject(data[key]);
        const value = isObj ? compactObject(data[key]) : data[key];
        const isEmptyObject = isObj && !Object.keys(value).length;

        if (value === undefined || isEmptyObject) {
          return accumulator;
        }

        return Object.assign(accumulator, {
          [key]: value
        });
      }, {});
    }


    function walkStats(stats, base, resultSet) {
      if (!base || resultSet.has(base.id)) {
        return;
      }

      resultSet.set(base.id, base);
      Object.keys(base).forEach(name => {
        if (name.endsWith('Id')) {
          walkStats(stats, stats.get(base[name]), resultSet);
        } else if (name.endsWith('Ids')) {
          base[name].forEach(id => {
            walkStats(stats, stats.get(id), resultSet);
          });
        }
      });
    }


    function filterStats(result, track, outbound) {
      const streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
      const filteredResult = new Map();

      if (track === null) {
        return filteredResult;
      }

      const trackStats = [];
      result.forEach(value => {
        if (value.type === 'track' && value.trackIdentifier === track.id) {
          trackStats.push(value);
        }
      });
      trackStats.forEach(trackStat => {
        result.forEach(stats => {
          if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
            walkStats(result, stats, filteredResult);
          }
        });
      });
      return filteredResult;
    }

  }, {}]
}, {}, [18]);

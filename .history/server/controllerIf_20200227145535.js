'use strict';
const crypto = require('crypto');
const request = require('request');

/** @namespace ControllerIf */

module.exports = function (apiURL, apiKey, apiSecret) {
    let self = this;

    self.apiURL = apiURL;
    self.apiKey = apiKey;
    self.apiSecret = apiSecret;

    self.createAuthHeader = function () {
        let token = {};
        token.apiKey = self.apiKey;
        token.date = Math.round(Date.now() / 1000);
        token.nonce = Math.round(Math.random() * 100000);
        let msg = token.apiKey + token.date + token.nonce;
        token.signature = crypto.createHmac('sha1', apiSecret).update(msg).digest('hex');
        let AuthHeader = 'VCAuth ' + Buffer.from(JSON.stringify(token)).toString('base64');
        return AuthHeader;
    }


    /**
      @param {Object} options Contains following parameter
        <ul>
        <li><strong>sessionId</strong>
            <p> Integer <br>
                Default: null<br>
                Optionally a session identifier can be specified
            </p>
          </li>
          </ul>
  
      @return {Promise<sessionId>} Returns the sessionId of the session just created.
      @memberOf ControllerIf
    */
    self.createSession = function (options) {
        var reqObj = {
            "url": self.apiURL + "/api/session",
            "headers": {
                "Authorization": self.createAuthHeader(),
            },
            "json": true,
            "body": {
                "options": options
            }
        };

        return new Promise((resolve, reject) => {
            request.post(reqObj, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (body && body.status === "success" && body.sessionId) {
                    resolve(body.sessionId);
                } else {
                    reject(new Error('Room creation failed'));
                }
            });
        })
    }

    /**
      @param {Integer} sessionId session to be be joined.
      @param {Object} options Contains following parameters 
        <ul>
        <li><strong>role</strong>
            <p> publisher|subscriber|moderator<br>
                Default: publisher<br>
                Defines the role of the attendee.
            </p>
        </li>
        <li><strong>expireTime</strong>
            <p> Integer <br>
                Default: 24 hours from now<br>
                Token expiry time, in seconds from Epoch.
            </p>
        </li>
        <li><strong>data</strong>
            <p> String <br>
                Default: ''<br>
                Optional data, normally used to identify the client.
            </p>
        </li>
        </ul>
      @return {Promise<token>} Returns the token to be used by attendee.
      @memberOf ControllerIf
    */
    self.generateToken = function (sessionId, options) {
        var reqObj = {
            "url": self.apiURL + "/api/generateToken",
            "headers": {
                "Authorization": self.createAuthHeader(),
                "content-type": "application/json"
            },
            "json": true,
            "body": {
                sessionId: sessionId,
                options: options
            }
        };

        return new Promise((resolve, reject) => {
            request.post(reqObj, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (body && body.status === "success" && body.token) {
                    resolve(body.token);
                } else {
                    reject(new Error('Token generation failed'));
                }
            });
        })
    }

    /**
      @param {Integer} sessionId ID of the session to process
      @param {String} streamId ID of the stream to process (Optional).
      @param {String} userData data passed in generateToken call, to identify the attendee (Optional).
      @param {String} streamName name of the stream to process. Passed as part of options in initPublisher call (Optional).
      @param {Integer} startTime Unix timestamp of processing start time.
      @param {Integer} endTime Unix timestamp of processing end time.
      @return {Promise<String>} Returns URL of the processed output file.
      @memberOf ControllerIf
  
      Typically called with userData
    */
    self.processStreamRecording = function (sessionId, streamId, userData, streamName, startTime, endTime) {
        var reqObj = {
            "url": self.apiURL + "/api/recording",
            "headers": {
                "Authorization": self.createAuthHeader(),
                "content-type": "application/json"
            },
            "json": true,
            "body": {
                sessionId: sessionId,
                streamId: streamId,
                userData: userData,
                streamName: streamName,
                startTime: startTime,
                endTime: endTime
            }
        };

        return new Promise((resolve, reject) => {
            request.post(reqObj, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (body && body.status === "success" && body.filePath) {
                    resolve(body.filePath);
                } else {
                    reject(new Error('Unable to process recording'));
                }
            });
        })
    }
    return this;
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GtbPlayer = void 0;
var axios_1 = require("axios");
/**
 * Golang[WebrtcToWeb Server] to Botem Player ...
 *
 */
var GtbPlayer = /** @class */ (function () {
    // addStream
    /**
     *
     * @param rtspUri - rtsp 주소
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     */
    function GtbPlayer(rtspUri, streamId, webRtcServerUri) {
        if (webRtcServerUri === void 0) { webRtcServerUri = GtbPlayer.DEFAULT_WEBRTC_SERVER_URI; }
    }
    /**
     * getStreams - Stream 배열의 이름, 주소, 옵션값 등을 얻는다.
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     */
    GtbPlayer.getStreams = function (webRtcServerUri) {
        if (webRtcServerUri === void 0) { webRtcServerUri = GtbPlayer.DEFAULT_WEBRTC_SERVER_URI; }
        return axios_1.default.get(webRtcServerUri + GtbPlayer.GET_STREAMS);
    };
    /**
     * getStream - Stream 아이디를 통해 이름, 주소, 옵션값 등을 얻는다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     */
    GtbPlayer.getStream = function (streamId, webRtcServerUri) {
        if (webRtcServerUri === void 0) { webRtcServerUri = GtbPlayer.DEFAULT_WEBRTC_SERVER_URI; }
        return axios_1.default.get(webRtcServerUri + GtbPlayer.GET_STREAM(streamId));
    };
    GtbPlayer.prototype.greeting = function () {
        console.log("HELLO?");
    };
    /**
     * Static method, variable area
     */
    GtbPlayer.DEFAULT_WEBRTC_SERVER_URI = 'http://localhost:8083';
    //static uris for RtspToWeb Apis ...
    GtbPlayer.GET_STREAMS = function () { return '/streams'; };
    GtbPlayer.GET_STREAM = function (streamId) { return "/stream/" + streamId + "/info"; };
    GtbPlayer.ADD_STREAM = function (streamId) { return "/stream/" + streamId + "/add"; };
    GtbPlayer.EDIT_STREAM = function (streamId) { return "/stream/" + streamId + "/edit"; };
    GtbPlayer.RELOAD_STREAM = function (streamId) { return "/stream/" + streamId + "/reload"; };
    GtbPlayer.DELETE_STREAM = function (streamId) { return "/stream/" + streamId + "/delete"; };
    return GtbPlayer;
}());
exports.GtbPlayer = GtbPlayer;
//# sourceMappingURL=GtbPlayer.js.map
import axios, {AxiosResponse} from "axios";
import {Stream} from "./types/stream";

/**
 * Golang[WebrtcToWeb Server] to Botem Player ...
 *
 */
export class GbPlayer {
    /**
     * Static method, variable area
     */
    static DEFAULT_WEBRTC_SERVER_URI: string = 'http://rino:rino@localhost:8083'
    static DEFAULT_USER_NAME = 'rino'
    static DEFAULT_PASSWORD = 'rino'

    private stream: Stream | null = null
    private videoElementId: string
    private readonly webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI
    private readonly userName: string = GbPlayer.DEFAULT_USER_NAME
    private readonly password: string = GbPlayer.DEFAULT_PASSWORD

    /**
     * constructor - 생성자
     * @param videoElementId - ID of HTMLVideoElement
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    constructor(videoElementId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        this.videoElementId = videoElementId
        this.webRtcServerUri = webRtcServerUri
        this.userName = userName
        this.password = password
    }

    /**
     * getStreams - Stream 배열의 이름, 주소, 옵션값 등을 얻는다.
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static getStreams(webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.GET_STREAMS_URL(), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * getStream - Stream 아이디를 통해 이름, 주소, 옵션값 등을 얻는다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static getStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.GET_STREAM_URL(streamId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * addStream - Stream 을 WebRtc Server 에 등록한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static addStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.post(webRtcServerUri + GbPlayer.ADD_STREAM_URL(streamId), {
            name: streamId,
            channels: {}
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * editStream - Stream 정보를 WebRtc Server 에 보내 수정한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static editStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.post(webRtcServerUri + GbPlayer.EDIT_STREAM_URL(streamId), {
            name: streamId,
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * reloadStream - Stream 영상을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static reloadStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.RELOAD_STREAM_URL(streamId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * deleteStream - Stream 영상을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static deleteStream(streamId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.DELETE_STREAM_URL(streamId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * addChanel - Stream 에 Channel 을 추가한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param rtspUri - RTSP URI
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param isOnDemand - Stream Server 에서 영상을 항상 준비할 지 요청마다 줄 지 여부
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static addChannel(streamId: string, channelId: string, rtspUri: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD, isOnDemand: boolean = true,) {
        return axios.post(webRtcServerUri + GbPlayer.ADD_CHANNEL_URL(streamId, channelId), {
            name: streamId,
            url: rtspUri,
            on_demand: isOnDemand,
            debug: false,
            status: 0,
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * editChanel - Stream 의 Channel 정보를 수정한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param rtspUri - RTSP URI
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param isOnDemand - Stream Server 에서 영상을 항상 준비할 지 요청마다 줄 지 여부
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static editChannel(streamId: string, channelId: string, rtspUri: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD, isOnDemand: boolean = true,) {
        return axios.post(webRtcServerUri + GbPlayer.EDIT_CHANNEL_URL(streamId, channelId), {
            name: streamId,
            url: rtspUri,
            on_demand: isOnDemand,
            debug: false,
            status: 0,
        }, {
            headers: {
                'Content-type': 'application/json'
            },
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * reloadChannel - Stream 의 Channel 을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static reloadChannel(streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.RELOAD_CHANNEL_URL(streamId, channelId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * deleteChannel - Stream 의 Channel 을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static deleteChannel(streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        return axios.get(webRtcServerUri + GbPlayer.DELETE_CHANNEL_URL(streamId, channelId), {
            auth: {
                username: userName,
                password: password,
            }
        })
    }

    /**
     * playHls - HLS 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     */
    static playHls(videoElementId: string, streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI) {
        const videoElement: HTMLVideoElement = document.getElementById(videoElementId) as HTMLVideoElement
        videoElement.src = webRtcServerUri + GbPlayer.HLS_URL(streamId, channelId)
        videoElement.play().then()
    }

    /**
     * playWebrtc - Webrtc 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param webRtcServerUri - WebRTC 통신할 서버 주소
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    static playWebrtc(videoElementId: string, streamId: string, channelId: string, webRtcServerUri: string = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName: string = GbPlayer.DEFAULT_USER_NAME, password: string = GbPlayer.DEFAULT_PASSWORD,) {
        const videoElement: HTMLVideoElement = document.getElementById(videoElementId) as HTMLVideoElement
        const webrtc: RTCPeerConnection = new RTCPeerConnection()
        webrtc.onnegotiationneeded = async () => {
            const offer = await webrtc.createOffer();
            await webrtc.setLocalDescription(offer);
            const formData = new FormData()
            formData.append('data', btoa(webrtc.localDescription!.sdp))
            axios.post(webRtcServerUri + GbPlayer.WEBRTC_URL(streamId, channelId), formData, {

                headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                auth: {
                    username: userName,
                    password: password,
                }
            }).then((response: AxiosResponse) => {
                try {
                    webrtc.setRemoteDescription(new RTCSessionDescription({
                        type: 'answer',
                        sdp: atob(response.data)
                    }))
                } catch (e) {
                    console.warn(e);
                }
            })
        }

        webrtc.ontrack = function (event) {
            console.log(event.streams.length + ' track is delivered');
            videoElement.srcObject = event.streams[0];
            videoElement.play().then();
        }

        webrtc.addTransceiver('video', {
            direction: 'sendrecv'
        });

        let webrtcSendChannelInterval: NodeJS.Timeout
        const webrtcSendChannel = webrtc.createDataChannel('GtbPLayerChannel');
        webrtcSendChannel.onclose = () => {
            console.log('sendChannel has closed')
            clearInterval(webrtcSendChannelInterval)
        }
        webrtcSendChannel.onopen = () => {
            console.log('sendChannel has opened');
            webrtcSendChannel.send('ping');
            webrtcSendChannelInterval = setInterval(() => {
                webrtcSendChannel.send('ping');
            }, 1000)
        }
        webrtcSendChannel.onmessage = e => console.log(e.data);
        videoElement.addEventListener('loadeddata', () => {
            videoElement.play().then()
            // makePic();
        })
        videoElement.addEventListener('error', () => {
            console.log("VIDEO_ERROR")
        })
    }

    //static uris for RtspToWeb Apis ...
    private static GET_STREAMS_URL = () => '/streams'
    private static GET_STREAM_URL = (streamId: string) => `/stream/${streamId}/info`
    private static ADD_STREAM_URL = (streamId: string) => `/stream/${streamId}/add`
    private static EDIT_STREAM_URL = (streamId: string) => `/stream/${streamId}/edit`
    private static RELOAD_STREAM_URL = (streamId: string) => `/stream/${streamId}/reload`
    private static DELETE_STREAM_URL = (streamId: string) => `/stream/${streamId}/delete`
    private static ADD_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/add`
    private static EDIT_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/edit`
    private static RELOAD_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/reload`
    private static DELETE_CHANNEL_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/delete`
    private static HLS_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/hls/live/index.m3u8`
    private static WEBRTC_URL = (streamId: string, channelId: string) => `/stream/${streamId}/channel/${channelId}/webrtc?uuid=${streamId}&channel=${channelId}`

    /**
     * getStreams - Stream 배열의 이름, 주소, 옵션값 등을 얻는다.
     */
    getStreams() {
        return GbPlayer.getStreams(this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * getStream - Stream 아이디를 통해 이름, 주소, 옵션값 등을 얻는다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     */
    getStream(streamId: string) {
        return GbPlayer.getStream(streamId, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * addStream - Stream 을 WebRtc Server 에 등록한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     */
    addStream(streamId: string) {
        return GbPlayer.addStream(streamId, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * editStream - Stream 정보를 WebRtc Server 에 보내 수정한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     */
    editStream(streamId: string) {
        return GbPlayer.editStream(streamId, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * reloadStream - Stream 영상을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     */
    reloadStream(streamId: string) {
        return GbPlayer.reloadStream(streamId, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * deleteStream - Stream 영상을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     */
    deleteStream(streamId: string) {
        return GbPlayer.deleteStream(streamId, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * addChanel - Stream 에 Channel 을 추가한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param rtspUri - RTSP URI
     */
    addChannel(streamId: string, channelId: string, rtspUri: string) {
        return GbPlayer.addChannel(streamId, channelId, rtspUri, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * editChanel - Stream 의 Channel 정보를 수정한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     * @param rtspUri - RTSP URI
     */
    editChannel(streamId: string, channelId: string, rtspUri: string) {
        return GbPlayer.editChannel(streamId, channelId, rtspUri, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * reloadChannel - Stream 의 Channel 을 갱신한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     */
    reloadChannel(streamId: string, channelId: string) {
        return GbPlayer.reloadChannel(streamId, channelId, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * deleteChannel - Stream 의 Channel 을 삭제한다.
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     */
    deleteChannel(streamId: string, channelId: string) {
        return GbPlayer.deleteChannel(streamId, channelId, this.webRtcServerUri, this.userName, this.password).then(response => response.data)
    }

    /**
     * playHls - HLS 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     */
    playHls(streamId: string, channelId: string) {
        return GbPlayer.playHls(this.videoElementId, streamId, channelId, this.webRtcServerUri,)
    }

    /**
     * playWebrtc - Webrtc 재생
     * @param videoElementId - ID of HTMLVideoElement
     * @param streamId - VMS 에서 사용하는 Stream 아이디
     * @param channelId - Stream 내 영상 Channel 아이디. (VMS 에서는 Live, Vod 등의 구분 용도로 사용할 예정)
     */
    playWebrtc(streamId: string, channelId: string) {
        return GbPlayer.playWebrtc(this.videoElementId, streamId, channelId, this.webRtcServerUri, this.userName, this.password)
    }

    start(streamId: string, channelId: string, rtspUri: string) {

        const convertedChannelId = channelId.split('/').join('___')
        //Check Stream exist
        //add if not exist
        this.getStream(streamId).then(async data => {
            const stream = data.payload
            const channels = stream.channels

            const channel = channels && channels[convertedChannelId]
            //Check Channel exist
            if (channel) {
                //edit if rtspUri is not equals
                if (channel.url !== rtspUri) {
                    console.warn("RTSP URI is not equals", streamId, convertedChannelId, rtspUri)
                    await this.editChannel(streamId, convertedChannelId, rtspUri)
                }
            } else {
                console.warn("Channel not exist", streamId, convertedChannelId)
                //add if not exist
                await this.addChannel(streamId, convertedChannelId, rtspUri)
            }
        }).catch(async _ => {
            console.warn("Stream not exist", streamId)
            await this.addStream(streamId).then(async _ => {
                await this.addChannel(streamId, convertedChannelId, rtspUri)
            })
        }).finally(() => {
            //playWebrtc
            this.playWebrtc(streamId, convertedChannelId)
        })


    }

}

const config = {
  key: "[[Add Key here]]"
 }

const container = document.getElementById('my-player');
const player = new bitmovin.player.Player(container, config);

const video = document.createElement('video')

const codecs = {
  HEVC: {
    detectionString: 'video/mp4; codecs="hvc1.1.c.L60.90"',
    manifest: 'https://bitmovin-a.akamaihd.net/content/multi-codec/hevc/stream.mpd'
  },
  VP9: {
    detectionString: 'video/webm; codecs="vp9"',
    manifest: 'https://bitmovin-a.akamaihd.net/content/multi-codec/vp9/stream.mpd'
  },
  AVC: {
    detectionString: 'video/mp4; codecs="avc1.64002A"',
    manifest: 'https://bitmovin-a.akamaihd.net/content/multi-codec/h264/stream.mpd'
  }
}

const determineIdealFormat = ({HEVC, VP9, AVC}) => {

  const canPlayHEVC = video.canPlayType(HEVC.detectionString)
  const canPlayVP9 = video.canPlayType(VP9.detectionString)
  const canPlayAVC = video.canPlayType(AVC.detectionString)

  const source = {}

  if (canPlayHEVC === 'probably'){
    source.dash = HEVC.manifest
    console.log('Playing HEVC')

  } else if (canPlayVP9 === 'probably'){
    source.dash = VP9.manifest
    console.log('Playing VP9')

  } else if (canPlayAVC === 'probably'){
    source.dash = AVC.manifest
    console.log('Playing AVC')

  } else {
    console.error('No available formats, delete IE9 and download something else')
  }
  return source
}

player.load(determineIdealFormat(codecs)).then(
  function() {
    console.log('Successfully created Bitmovin Player instance');
  },
  function(reason) {
    console.log('Error while creating Bitmovin Player instance');
  }
);

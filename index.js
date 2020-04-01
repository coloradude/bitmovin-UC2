const config = {
  key: "[[Add Key here]]"
 }

const container = document.getElementById('my-player');
const player = new bitmovin.player.Player(container, config);

const video = document.createElement('video')

const HEVC = video.canPlayType('video/mp4; codecs="hvc1.1.c.L60.90"')
const VP9 = video.canPlayType('video/webm; codecs="vp9"')
const AVC = video.canPlayType('video/mp4; codecs="avc1.64002A"')

const source = {}

if (HEVC === 'probably'){
  source.dash = 'https://bitmovin-a.akamaihd.net/content/multi-codec/hevc/stream.mpd'
  console.log('Playing HEVC')
} else if (VP9 === 'probably'){
  source.dash = 'https://bitmovin-a.akamaihd.net/content/multi-codec/vp9/stream.mpd'
  console.log('Playing VP9')
} else {
  source.dash = 'https://bitmovin-test-stephen-2.s3-us-west-2.amazonaws.com/encoded/manifest.mpd'
  console.log('Playing AVC')
}

player.load(source).then(
  function() {
    console.log('Successfully created Bitmovin Player instance');
  },
  function(reason) {
    console.log('Error while creating Bitmovin Player instance');
  }
);

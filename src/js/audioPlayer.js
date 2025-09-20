export class SoundEffect {
    constructor(address) {
        this.address = address
        this.sound = null
        this.volume = 0.5
        this.playing = false
        this.subscribers ={"sound":[]}
    }
    init() {
        this.sound = new Audio(this.address)

    }

    setVolume(x) {
        this.volume = x
        this.sound.volume = x
    }

    togglePlay() {

        if (this.playing) {
            this.pauseSound()
            return
        }

        this.playSound()


    }

    playSound() {
        this.playing = true
        this.sound.currentTime = 0;
        this.sound.play()
        setTimeout(this.pauseSound.bind(this), 50)
        this.onPlay()
    }

    onPlay(){
        this.subscribers
    }

    pauseSound() {
        this.playing = false
        this.sound.currentTime = 0;
        this.sound.pause()
    }


    subscribeTo(item, callback) {
        callback.send(this.createMessage())
        this.subscribers[item].push(callback)

    }



}



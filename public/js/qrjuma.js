class QRjuma {
    constructor() {
        if (!this.hasGetUserMedia()) {
            console.log('getUserMedia() is not supported in your browser');
        }

        Object.assign(this, {
            localMediaStream: null,
            qr: new QCodeDecoder()
        });
    }

    hasGetUserMedia() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    onFailSoHard(e) {
        console.log('Reeeejected!', e);
    };

    // option: 0 - original, 1 - invertida horizontalmente, 2 - decodifica tentando os dois
    decode(selectorElement, option, callback) {
        this.video = document.querySelector(selectorElement);
        
        let snapshot = () => {
            // this.canvas = createElement('canvas');
            this.canvas = document.querySelector('canvas');
            this.ctx = this.canvas.getContext('2d');
            // this.img = document.createElement('img');
            this.img = document.querySelector('img');
            
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
            
            if (this.localMediaStream) {
                this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
                
                // PRIMEIRA VEZ
                if(option === 0 || option === 2){
                    this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
                    this.img.src = this.canvas.toDataURL('image/png');

                    decodeFromImg(this.img, (resultado) => {
                        
                        // SEGUNDA VEZ
                        if ((option === 1 || option === 2) && resultado == undefined) {
                            this.inverteHorizontal(this.img);

                            decodeFromImg(this.img, (resultado) => {
                                //passa o resultado da decodifição para o callback
                                callback(resultado);
                            });
                        } else {
                            //passa o resultado da decodifição para o callback
                            callback(resultado);
                        }
                        
                    });
                } else {
                    console.log('brbrbrrb');
                    
                    // SEGUNDA VEZ
                    if ((option === 1 || option === 2)) {
                        this.inverteHorizontal(this.img);

                        decodeFromImg(this.img, (resultado) => {
                            //passa o resultado da decodifição para o callback
                            callback(resultado);
                        });
                    } else {
                        //passa o resultado da decodifição para o callback
                        callback(resultado);
                    }

                }
            }
        }

        let decodeFromImg = (img, callback) => {
            // set callback
            qrcode.callback = (decodedInformation) => {
                callback(decodedInformation);
            };

            // Start decoding
            qrcode.decode(img.src);
        }

        navigator.getUserMedia({ video: true }, (stream) => {
            this.video.src = window.URL.createObjectURL(stream);
            this.localMediaStream = stream;

            setInterval(snapshot, 500);
            // setTimeout(() => {
                // snapshot();
            // }, 1000);
            // snapshot();
        }, this.onFailSoHard);
    }

    inverteHorizontal(img) {            
        this.ctx.translate(this.video.videoWidth, 0);
        this.ctx.scale(-1, 1);

        this.ctx.drawImage(this.video, 0, 0,
            this.video.videoWidth, this.video.videoHeight);

        this.img.src = this.canvas.toDataURL('image/png');
    }
}

let qrjuma = new QRjuma();
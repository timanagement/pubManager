var e = {
    decode: (t, r) => {
        console.log(t, r);
    }
}

function teste(t, r){
    return t = t.src ? t.src : t, e.decode(t, r), this
}

teste({src: 'Vinicius'}, 'Miiller');
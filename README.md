# [prj_firebase](https://github.com/eacevedof/prj_firebase)

## [Tutorial Firebase 2017 - Playlist](https://www.youtube.com/watch?v=KIp_WKM4BIE&list=PLEtcGQaT56chIjXff_cAEglfe6gBSNFHj)
- Author: Jesús Conde

# requerimientos
- [Consola](https://console.firebase.google.com/project/fir-test-2017/database/fir-test-2017/data)
- [fir-test-2017](https://fir-test-2017.firebaseio.com/)
- [Index.html - file:///C:/xampp/htdocs/prj_firebase/index.html](file:///C:/xampp/htdocs/prj_firebase/index.html)

## notas

1. [Conexión](https://www.youtube.com/watch?v=KIp_WKM4BIE&feature=youtu.be)
- Para desarrollo hay que quitar las reglas en la consola

```js
... código de firebase 
let eDivMain = document.getElementById("divMain")
let oDb = firebase.database().ref().child("text") 
//Se escucha un cambio en el valor, si lo hay. El evento value es el más util para sincronizar objetos
oDb.on("value",oData => eDivMain.innerText = oData.val())
//oDb.on("value",snap => { console.log(snap);return eDivMain.innerText = snap.val()})
console.log(eDivMain)

e {_e: e, ge: t, me: t}
ge:t {repo: e, path: e, Ae: e, De: false}
key:(...)
me:t {}
ref:(...)
_e:e {T: "Hola Mundo 3", y: e, m: null}
__proto__:Object
```

2. [Sincronización de objetos en tiempo real](https://youtu.be/lwdTgA1pTX0?list=PLEtcGQaT56chIjXff_cAEglfe6gBSNFHj)


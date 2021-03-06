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

- Con el listener `value` se cambia todo el objeto no solo el atributo cambiado.
- En el ejemplo, se cambia la edad y reenvia todo el objeto `objectinfb`

```js
//obtener el contenedor
const ePre = document.getElementById("preObjeto")
//hacer el bind con el objeto
//ref apunta a la raiz de la bd
//child apunta a la clave hijo del objeto. Algo parecido al nombre del campo
const dbRef = firebase.database().ref().child("objectinfb")
//sinronizar cambios en el objeto
//snap: (snapshot de la bd) Es un snapshot de la informacion que en ese momento se encuentra en la bd

//pasando el snap a un json a mostrar en el elemento <pre>
//JSON.stringify(valor[, remplazo [, espacio]])
dbRef.on("value",oSnap=> ePre.innerText = JSON.stringify(oSnap.val(),null,3))

//Se ha definido un POJO en firebase
const objectinfb = {
    apellidos: "López",
    edad:32,
    nombre: "Juan"
}
```
3. [Eventos Child](https://youtu.be/9pi0_6Li31k?list=PLEtcGQaT56chIjXff_cAEglfe6gBSNFHj)
- Así como el evento `value` existe otro evento, el `child` nos da un mayor control sobre
los elementos anidados

```js
const dbRefRoot = firebase.database().ref().child("objectinfb")
const dbRefList = dbRefRoot.child("habilidades")

//sinronizar cambios en el objeto
//snap: (snapshot de la bd) Es un snapshot de la informacion que en ese momento se encuentra en la bd
//pasando el snap a un json a mostrar en el elemento <pre>
//JSON.stringify(valor[, remplazo [, espacio]])
dbRefRoot.on("value",oSnap=> ePre.innerText = JSON.stringify(oSnap.val(),null,3))
// sincronizar cambios lista
// tal como está solo escucha los items borrados y nuevos, omite los updates
//para los updates hay que añadir un id (key=id)
dbRefList.on("child_added", oSnap => {
    const eLi = document.createElement("li")
    eLi.innerText = oSnap.val()
    eLi.id = oSnap.key
    eUlLista.appendChild(eLi)
})

dbRefList.on("child_changed", oSnap => {
    const eLiChanged = document.getElementById(oSnap.key)
    eLiChanged.innerText = oSnap.val()
})

dbRefList.on("child_removed", oSnap => {
    const eLiRemove = document.getElementById(oSnap.key)
    eLiRemove.remove()
})    
```

4. [Autentificación](https://youtu.be/TnKypnlf-1c?list=PLEtcGQaT56chIjXff_cAEglfe6gBSNFHj)
- `const auth = firebase.auth()`
- `auth.singInWithEmailAndPassword(email,pass)` 
- `auth.createUserWithEmailAndPassword(email,pass)` - Crea una cuenta nueva
- Estos metodos devuelven una promesa
- `auth.onAuthStateChanged(firebaseUser => {})` - Listener que comprueba el logueo y deslogueo de un usuario
```js
    const dbRefRoot = firebase.database().ref().child("objectinfb")

    const arForm = [
        {"id":"txtEmail"},
        {"id":"pasPassword"},
        {"id":"btnLogin"},
        {"id":"btnSignup"},
        {"id":"btnLogout"},
    ]

    const oForms = arForm.reduce((oAc,oItem)=>{
        let oTemp = {}
        oTemp[oItem.id] = document.getElementById(oItem.id)
        return Object.assign(oAc,oTemp)
    },{})
    
    //btnLogin
    oForms.btnLogin.addEventListener("click", oEvent => {
        const sEmail = oForms.txtEmail.value
        const sPass = oForms.pasPassword.value
        const oAuth = firebase.auth()

        //Sign in
        const oPromise = oAuth.signInWithEmailAndPassword(sEmail,sPass)
        oPromise.catch(oEvent => {

            console.log("oEvent.message:",oEvent.message)
        })
    })//btnLogin.click

    //btnSingup 
    oForms.btnSignup.addEventListener("click", oEvent => {
        //TODO: comprobar que el email sea real
        const sEmail = oForms.txtEmail.value
        const sPass = oForms.pasPassword.value
        const oAuth = firebase.auth()

        //Sign in
        const oPromise = oAuth.createUserWithEmailAndPassword(sEmail,sPass)
        oPromise.catch(oEvent => console.log("oEvent.message:",oEvent.message))
    })//btnSingup.click
    
    //btnLogout
    oForms.btnLogout.addEventListener("click", oEvent => {
        firebase.auth().signOut()
    })//btnLogout.click

    //añadir listener en tiempo real
    firebase.auth().onAuthStateChanged(oFireUser => {
        //si hay un usuario en sesion
        if(oFireUser) {
            console.log("oFireUser en sesion:",oFireUser)
            oForms.btnLogin.classList.add("invisible")
            oForms.btnLogout.classList.remove("invisible")
        }
        //no hay usuario en sesion
        else {
            oForms.btnLogin.classList.remove("invisible")
            oForms.btnLogout.classList.add("invisible")
        }
    })//onAutStateChanged

    //Titulo que se pasa al ejecutar la función
    document.getElementById("h1Top").innerText = sH1
```

5. [Almacenamiento](https://youtu.be/CN3N78KjY9o?list=PLEtcGQaT56chIjXff_cAEglfe6gBSNFHj)
- Ejemplo de subir archivo
- [Configurar reglas para almacenamiento](https://youtu.be/CN3N78KjY9o?list=PLEtcGQaT56chIjXff_cAEglfe6gBSNFHj&t=295)
- Me estaba dando un error de js y es que tenia puesto el listener `change` en la barra de progreso
- Tenia mal puesta la propiedad `bytesTransfered`, es `bytesTransferred` (con doble r)
```js
   const arForm = [
        {"id":"divAlert"},
        {"id":"prgUploader"},
        {"id":"filButton"}
    ]

    const oForms = arForm.reduce((oAc,oItem)=>{
        let oTemp = {}
        oTemp[oItem.id] = document.getElementById(oItem.id)
        return Object.assign(oAc,oTemp)
    },{})

    //https://youtu.be/CN3N78KjY9o?list=PLEtcGQaT56chIjXff_cAEglfe6gBSNFHj&t=276
    oForms.filButton.addEventListener("change",(oEvent) => {
        //alert("uploader changed")
        //guardamos el archivo que se está procesando
        const oFile = oEvent.target.files[0]
        console.log("oFile:",oFile)
        //un apuntador a la ruta de firebase
        const oStorageRef = firebase.storage().ref("mis_fotos/".concat(oFile.name))
        //subir archivo
        const oTask = oStorageRef.put(oFile)
        
        //actualizar barra de progreso
        oTask.on("state_changed",(oSnapShot)=>{
                console.log("progress","oSnapShot.totalBytes:",oSnapShot.totalBytes)
                console.log("progress","oSnapShot.bytesTransferred:",oSnapShot.bytesTransferred)
                const fPercentage =  (oSnapShot.bytesTransferred / oSnapShot.totalBytes) * 100
                console.log("fPercentage:",fPercentage)
                oForms.prgUploader.value = String(fPercentage)
            }
            ,(oErr)=>{console.log("error")}
            ,()=>{console.log("complete")}
        )//on.state_changed
    })//filButton.addEventListener
```
5. []()
```js
```
5. []()
```js
```
5. []()
```js
```

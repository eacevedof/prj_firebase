(function() {
    const oConfig = {
        apiKey: "AIzaSyDiHhSUfYfEZ4oiDXn7l9ydvXdVqQXS4dA",
        authDomain: "fir-test-2017.firebaseapp.com",
        databaseURL: "https://fir-test-2017.firebaseio.com",
        projectId: "fir-test-2017",
        storageBucket: "fir-test-2017.appspot.com",
        messagingSenderId: "350673738827"
    }

    firebase.initializeApp(oConfig) 

    //obtener el contenedor
    const ePre = document.getElementById("preObjeto")
    const ulLista = document.getElementById("ulLista")
    //hacer el bind con el objeto
    //ref apunta a la raiz de la bd
    //child apunta a la clave hijo del objeto. Algo parecido al nombre del campo
    const dbRefRoot = firebase.database().ref().child("objectinfb")
    const dbRefList = dbRefRoot.child("habilidades")

    //sinronizar cambios en el objeto
    //snap: (snapshot de la bd) Es un snapshot de la informacion que en ese momento se encuentra en la bd
    //pasando el snap a un json a mostrar en el elemento <pre>
    //JSON.stringify(valor[, remplazo [, espacio]])
    dbRefRoot.on("value",oSnap=> ePre.innerText = JSON.stringify(oSnap.val(),null,3))
    //d
    dbRefList.on("child_added",oSnap=>console.log(oSnap))
}())
(function(sH1) {
    const oConfig = {
        apiKey: "AIzaSyDiHhSUfYfEZ4oiDXn7l9ydvXdVqQXS4dA",
        authDomain: "fir-test-2017.firebaseapp.com",
        databaseURL: "https://fir-test-2017.firebaseio.com",
        projectId: "fir-test-2017",
        storageBucket: "fir-test-2017.appspot.com",
        messagingSenderId: "350673738827"
    }

    firebase.initializeApp(oConfig) 

    const dbRefRoot = firebase.database().ref().child("objectinfb")

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
        alert("uploader changed")
        //guardamos el archivo que se está procesando
        const oFile = oEvent.target.files[0]
        console.log(oFile)
        //un apuntador a la ruta de firebase
        const oStorageRef = firebase.storage().ref("mis_fotos/".concat(oFile.name))
        //subir archivo
        const oTask = oStorageRef.put(oFile)
        
        //actualizar barra de progreso
        oTask.on("state_changed",(oSnapShot)=>{
            console.log("progress")
            const fPercentage =  (oSnapShot.bytesTransfered / oSnapShot.totalBytes) * 100
            oForms.prgUploader.value = fPercentage
        }
        ,(oErr)=>{console.log("error")}
        ,()=>{console.log("complete")})//on.state_changed
    })

    //Titulo que se pasa al ejecutar la función
    document.getElementById("h1Top").innerText = sH1
}("Firebase - Almacenamiento"))
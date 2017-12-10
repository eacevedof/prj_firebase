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

    let eDivMain = document.getElementById("divMain")
    let oDb = firebase.database().ref().child("text") 
    //Se escucha un cambio en el valor, si lo hay 
    oDb.on("value",oData => eDivMain.innerText = oData.val())
    //oDb.on("value",snap => { console.log(snap);return eDivMain.innerText = snap.val()})
    console.log(eDivMain)    
}())
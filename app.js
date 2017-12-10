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
        {"id":"txtEmail"},
        {"id":"pasPassword"},
        {"id":"btnLogin"},
        {"id":"btnSignup"},
        {"id":"btnLogout"},
    ]

    const arElements = arForm.map(o => document.getElementById(o.id))
    console.log(arElements)

    //Titulo que se pasa al ejecutar la función
    document.getElementById("h1Top").innerText = sH1

}("Firebase - Autenticación"))
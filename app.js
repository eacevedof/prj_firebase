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

}("Firebase - Autenticación"))
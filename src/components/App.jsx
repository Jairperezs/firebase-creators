import React, { Component } from 'react'
import * as firebase from 'firebase'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            verify: null
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({verify: 'Estas logeado'})
            } else {
                this.setState({verify: 'No estas logeado'})
            }
        })
    }
    SignUp(e) {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.emailSignUp.value, this.passwordSignUp.value)
            .then(({uid}) => {
                localStorage.setItem("uid", uid)
                return this.setState({message: 'Te has registrado correctamente'})
            })
            .catch(error => {
                // Hanlde Errors here.
                let errorCode = error.code
                let errorMessage = error.message
                console.log(errorCode)
                return this.setState({message: errorMessage})
            })
    }

    SignIn(e) {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
            .then(({uid, displayName}) => {
                localStorage.setItem('uid', uid)
                return this.setState({message: `Has iniciado sesion correctamente, ${displayName ? displayName : 'por favor edita tu nombre'}`})
            })
            .catch(error => {
                let errorCode = error.code
                let errorMessage = error.message
                console.log(errorCode)
                this.setState({message: errorMessage})
            })
    }
    logout(e) {
        e.preventDefault()
        firebase.auth().signOut()
            .then(()=> {
                localStorage.removeItem('uid')
                return this.setState({message: 'Has cerrado sesion correctamente'})
            })
            .catch(error => console.log(error.message))
    }
    updateName (e) {
        e.preventDefault()
        firebase.database().ref('users/' + localStorage.uid).set({
            displayName: this.displayName.value
        })
    }
    render() {
        return (
            <div className="Container">
                <div className="signup-content">
                    <h1>Registro</h1>
                    <form onSubmit={this.SignUp.bind(this)}>
                        <div className="signup-item">
                            <input type="email" placeholder="Correo electronico" ref={emailRef => this.emailSignUp = emailRef} />
                        </div>
                        <div className="signup-item">
                            <input type="password" placeholder="Contraseña" ref={passwordRef => this.passwordSignUp = passwordRef} />
                        </div>
                        <div className="signup-button">
                            <button>Registrar</button>
                        </div>
                    </form>
                </div>
                <div className="signin-content">  
                    <h1>Iniciar sesion</h1>
                    <form onSubmit={this.SignIn.bind(this)}>
                        <div className="signin-item">
                            <input type="email" placeholder="Correo electronico" ref={emailRef => this.email = emailRef} />
                        </div>
                        <div className="signin-item">
                            <input type="password" placeholder="Contraseña" ref={passwordRef => this.password = passwordRef} />
                        </div>
                        <div className="signin-item">
                            <button>Inisiar sesion</button>
                        </div>
                    </form>
                </div>
                {localStorage.uid ?
                    (
                        <div className="update-content">
                            <h1>Editar nombre</h1>
                            <p>* Tienes que estar logeado</p>
                            <form onSubmit={this.updateName.bind(this)}>
                                <div className="update-item">
                                    <input type="text" placeholder="Nombre completo" ref={displayName => this.displayName = displayName}/>
                                </div>
                                <div className="update-button">
                                    <button>Actualizar nombre</button>
                                </div>
                            </form>
                        </div>
                    ) : null}
                <div className="message-content">
                    <p>{this.state.message}</p>
                </div>
                {localStorage.uid ? <button onClick={this.logout.bind(this)}>Cerrar sesion</button>: null}
            </div>
        )
    }
}

export default App

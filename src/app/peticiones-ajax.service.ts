import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, onSnapshot } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from '@angular/fire/auth';
import {onAuthStateChanged } from '@angular/fire/auth';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PeticionesAjaxService {
  datosAPI:any[]=[];
  busqueda:any[]=[];
  contenidoInput='';
  firestore=inject(Firestore);
  detallesMoneda: any;
  datosFS:any[]=[];
  usuario: any;
  datosGrafica:any[]=[];
  usuarioIniciadoSesion: boolean = false;
  
  
  
  constructor(private http: HttpClient, private router:Router) { 
    
  }

  peticionAjax(){
    this.http.get("https://api.coingecko.com/api/v3/search/trending").subscribe((datos:any)=>{
      this.datosAPI=datos.coins;
    console.log(datos)
  });
  }


  buscaCoin(coinName: string) {
    this.http.get("https://api.coingecko.com/api/v3/search?query=" + coinName).subscribe((datos: any) => {
      this.busqueda = datos.coins; 
      console.log(datos);
    });
  }

  obtenerDetalles(coinId: string) {
    this.http.get('https://api.coingecko.com/api/v3/coins/' + coinId).subscribe((datos: any) => {
      this.detallesMoneda = datos;
      console.log(datos);
    });
  }

  hacerGrafica(coinId: string){
    this.http.get('https://api.coingecko.com/api/v3/coins/'+coinId+'/market_chart?vs_currency=eur&days=30').subscribe((datos: any) => {;
    this.datosGrafica = datos.prices;
    console.log("DATOS AJAX DE LA GRAFICA", JSON.stringify(datos.prices));
    
  });
  }


  obtenerDatos(): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
  
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
  
          const colRef = collection(this.firestore, 'criptomonedas');
  
          const q = query(colRef, where('uid', '==', uid));
  
          getDocs(q)
            .then((response) => {
              this.datosFS = response.docs.map((doc) => doc.data());
              resolve(); // Resuelve la promesa después de obtener los datos
            })
            .catch((error) => {
              console.error('Error al obtener los datos:', error);
              reject(error); // Rechaza la promesa en caso de error
            });
        } else {
        }
      });
    });
  }


  iniciarSesion(){
    const auth=getAuth();
    const provider = new GoogleAuthProvider();

    //sing in with popup // token vacio

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    //const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    this.usuarioIniciadoSesion=true;
    this.router.navigate(["cuerpo/"])
    this.Usuario();
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }


  cerrarSesion(){
    const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  }

  estaUsuarioIniciadoSesion(): Promise<boolean> {
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(!!user);
      });
    });
  }


  Usuario() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      this.usuario = user;
    });
  }


  seguirMoneda(criptoMonedaNombre: string, criptoMonedaImagen: string, criptoMonedaSymbol: string, criptoMonedaId: string) {
    const auth = getAuth();
    const uid = this.usuario?.uid;
  
    if (!uid) {
      console.error('Error: No se pudo obtener el UID del usuario.');
      return;
    }
  
    const docRef = collection(this.firestore, 'criptomonedas');

    const fechaSeguido = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  
    addDoc(docRef, {
      nombre:criptoMonedaNombre,
      imagen:criptoMonedaImagen,
      symbol:criptoMonedaSymbol,
      idMoneda: criptoMonedaId,
      fechaSeguido: fechaSeguido,
      uid: uid
    })
      .then(() => {
        
        console.log('Moneda seguida exitosamente');
      })
      .catch((error) => {
        console.error('Error al seguir la moneda:', error);
      });
  }
  

  eliminarMoneda(uid: string, idMoneda: string) {
    const firestore = getFirestore();
    const colRef = collection(firestore, 'criptomonedas');
  
    const q = query(colRef, where('uid', '==', uid), where('idMoneda', '==', idMoneda));
  
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Obtener la referencia al documento y eliminarlo
          const docRef = doc.ref;
          deleteDoc(docRef)
            .then(() => {
              console.log('Moneda eliminada exitosamente');
            })
            .catch((error) => {
              console.error('Error al eliminar la moneda:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error al realizar la consulta:', error);
      });
  }
  

  async registrarUsuario(nombre: string, email: string, password: string): Promise<void> {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;

        // Actualiza el nombre del usuario
        updateProfile(user, { displayName: nombre })
          .then(() => {
            
            console.log('Usuario registrado correctamente');
          })
          .catch((error) => {
            console.error('Error al actualizar el nombre de usuario:', error);
          });
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        throw error; // Puedes propagar el error si es necesario manejarlo en algún lugar.
      });
  }


  async iniciarSesionConCorreo(email: string, password: string): Promise<void> {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        this.router.navigate(["cuerpo"]);
        console.log('Usuario inició sesión exitosamente:', user);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con correo y contraseña:', error);
        throw error; // Puedes propagar el error si es necesario manejarlo en algún lugar.
      });
  }

  async iniciarSesionConGitHub(): Promise<void> {
  try {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    this.router.navigate(["cuerpo"]);
    console.log('Usuario inició sesión con GitHub exitosamente:', user);
  } catch (error) {
    console.error('Error al iniciar sesión con GitHub:', error);
    throw error;
  }
}

}

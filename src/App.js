import React, {Component} from 'react';
import './bootstrap.min.css';

import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  
  state = {
    citas:[]
  }


  //Cuando la app carga
  componentDidMount(){
    const citasLS = localStorage.getItem('citas');

    if(citasLS) {
      this.setState({
        citas : JSON.parse(citasLS)
      })
    }
  }

  //cuando eliminamos o agregamos cita
  componentDidUpdate (){
    localStorage.setItem('citas',JSON.stringify(this.state.citas));
  }


  crearNuevaCita = datos => {
    //Copiar state actual
    const citas = [...this.state.citas, datos];

    //agregamos state
    this.setState ({
      /*nomrmalmente se usa asi, pero  como se llama igual no es neceario
       citas : citas*/
       citas
    })
  }

  //eliminas citas

  eliminarCita = id=> {
    //tomar state
    const citasActuales = [...this.state.citas]

    //utilizar filter para sacar elemento

    const citas = citasActuales.filter(cita => cita.id !== id)

    //actualizar state

    this.setState({
      citas
    })
  }

  render() {
    return (
      <div className="container">
        <Header 
           titulo ='Administrador Pacientes Veterinaria'/>

        <div className ="row">
          <div className ="col-md-10 mx-auto">

            <NuevaCita 
              crearNuevaCita={this.crearNuevaCita}        
            />  

          </div>

          <div className ="mt-5 col-md-10 mx-auto">
            <ListaCitas 
              citas = {this.state.citas}
              eliminarCita = {this.eliminarCita}
            />
          </div>

        </div>  
      </div>

    );
  }
}


export default App;

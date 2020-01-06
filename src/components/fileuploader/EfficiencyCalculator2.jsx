import React, { Component } from "react";
import { Label } from "semantic-ui-react";
import "./fileuploader.style.css";

class EfficiencyPcrComp2 extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      codeGraphA: null,
      grapA: null,
      grVar1: "",
      grVar2: "",
      eacHw: "",
      refGen: "",
      refGru: "",
      movies: []
    };
  }
  ///state =file, gv1,gv2,eacH,refGe,refGr

  handleFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0]

      //graph_a: null
    });
  };
  //// cuarto paso
  handleGv1 = event => {
    this.setState({
      grVar1: event.target.value
    });
  };

  handleGv2 = event => {
    this.setState({
      grVar2: event.target.value
    });
  };

  handleEach = event => {
    this.setState({
      eacHw: event.target.value
    });
  };

  handleRefgen = event => {
    this.setState({
      refGen: event.target.value
    });
  };

  handleRefgroup = event => {
    this.setState({
      refGru: event.target.value
    });
  };

  handleUpload = async event => {
    // define upload
    event.preventDefault();
    const data = new FormData();
    console.log(this.state.selectedFile, "selected file");
    data.append("csvFile", this.state.selectedFile); /// reqyyyy es el nompre en params
    let options = {
      method: "POST",
      //headers: { Authorization: localStorage.getItem("token") },
      body: data
      //mode: "no-cors"//// AQUI SE ENVIA EL ARCHIVO AL SERVIDOR.. EN EL LAS RUTAS DE ///MONGO YA ESTAN HECHAS
    };
    let response = await fetch(
      "http://159.89.83.159:4000/api/upload",
      options
    );
    let resBody = await response.text();
    console.log("this is from endpoint", resBody);

    let options2 = {
      method: "GET",
      headers: { Accept: "application/json" }
      //mode: "no-cors"///
    };
    let res = await fetch("http://159.89.83.159:4000/api/upload", options2);
    let newD = await res.text();
    let juju = JSON.parse(newD);
    let codecSV = juju.map(on => {
      return on.csvFile.replace(/\D+/g, "");
    })[0]; //// ESTE ES EL CODIGO DEL ARCHIVO ENVIADO SE RECUPERA DE MONGO
    console.log(codecSV); //// tipo string
    this.setState({
      codeGraphA: codecSV
    }); //// SE PASA AL ESTADO EL CODIGO
    console.log("code en state GraphA", this.state.codeGraphA);

    /* /// pa ver AQUI SE ENVIA EL CODIGO RECUPERADO A R, EN PRINCIPIO TODO LO DE ANTES SERIA IGUAL */

    //let seer = event.target[1].value;
    //console.log(seer);

    /* this.setState({
      refGen: event.target[1].value
    }); */

    /* /// pa ver AQUI SE ENVIA EL CODIGO RECUPERADO A R, EN PRINCIPIO TODO LO DE ANTES SERIA IGUAL */

    console.log("code en state refgen", this.state.refGen);
    var datat = new URLSearchParams();
    datat.append("file", this.state.codeGraphA);
    datat.append("gv1", this.state.grVar1);
    datat.append("gv2", this.state.grVar2);
    datat.append("eacH", this.state.eacHw);
    datat.append("refGe", this.state.refGen);
    datat.append("refGr", this.state.refGru);
    //// aqui arriva se asocian los nombres en r y el estado de las variables
    /* /// FILE ES EL NOMBRE DE LO QUE ESPERA //R EN ESTE CASO SOLO PARA GENERAR UNA GRAFICA.. EN R EL TOKEN ENVIADO 1) GENERA UNA CONECCION DE R Y MONGO QUE RECUPERA LOS NOMBRES DE LOS DOCUMENTOS Y COMPARA EL CODIGO ENVIADO POR EL USUARIO CON LOS CODIGOS DE LA BASE DE DATOS. SILOS CODIGOS COINCIDEN R LEE EL ARCHIVO DESCARGADO QUE TENGA EL COGIGO EN EL SERVIDOR, HACE LA OPERACION REQUERIDA Y DEVUELVE UN RESULTADO AL FRONTEND */
    let options3 = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: datat
      //mode: "no-cors"
    };
    let responseG = await fetch(
      "http://159.89.83.159:8000/amepleff",
      options3
    );
    let texte = await responseG.json();
    /*     let texte2 = texte.map(element=>{

    }) */
    console.log(texte, "fromj");
    this.setState({ movies: texte });
    console.log(this.state.movies, "fromj");
    let codecSVA = texte.map(on => {
      return on.gene;
    });

    /*   .then(res => res.json())
      .then(movies => this.setState({ movies }))
      .catch(err => console.log(err)); */

    /*  this.setState({ grapA: newB });
    console.log(this.state.grapA); */

    /*     let options3 = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
      //body: datat
      //mode: "no-cors"
    };
    let respe = await fetch(
      "http://159.89.83.159:8000/amepleff?file=1576393048841&gv1=brain&gv2=kidney&eacH=6&refGe=GAPDH&refGr=brain",
      options3
    );
    let texte = await respe.text();
    console.log(texte);
 */

    /*     var objectURL = URL.createObjectURL(newG);
    console.log(objectURL); */

    /*    const myJson = await res.json(); //// dio igual que esperar res.text
    
    let newDat = JSON.stringify(myJson);
    let code = JSON.parse(newDat);
    let code2 = JSON.parse(JSON.stringify(myJson));

    console.log(typeof newDat);
    console.log(typeof code);

    console.log(newDat);
    console.log(code);
    console.log(code2);
    console.log(Object.keys(code));
    let gt = Object.keys(code);
    console.log(Object.getOwnPropertyNames(code)); */
  };

  render() {
    return (
      <div>
        <h5>Delta delta ct model</h5>
        <div className="containerFileuploader">
          <form className="App" onSubmit={this.handleUpload}>
            <label className="inputFileuploader">
              <input type="file" name="file" onChange={this.handleFileChange} />
            </label>
            {/*  ///state =file, gv1,gv2,eacH,refGe,refGr */}
            <label className="inputFileuploader">
              <input
                type="text"
                name="gv1"
                onChange={this.handleGv1}
                value={this.state.grVar1}
                placeholder="Grouping variable 1"
              />
            </label>
            <label className="inputFileuploader">
              <input
                type="text"
                name="gv2"
                onChange={this.handleGv2}
                value={this.state.grVar2}
                placeholder="Grouping variable 2"
              />
            </label>
            <label className="inputFileuploader">
              <input
                type="text"
                name="eacH"
                onChange={this.handleEach}
                value={this.state.eacHw}
                placeholder="Each"
              />
            </label>
            <label className="inputFileuploader">
              <input
                type="text"
                name="refGe"
                onChange={this.handleRefgen} /* tercer paso */
                value={this.state.refGen} /* segundo paso */
                placeholder="Reference gen"
              />
            </label>
            <label className="inputFileuploader">
              <input
                type="text"
                name="refGr"
                onChange={this.handleRefgroup} /* tercer paso */
                value={this.state.refGru} /* segundo paso */
                placeholder="Reference for grouping"
              />
            </label>
            {/*  <input
              type="text"
              placeholder="Gen name"
              onChange={this.handleFileChange}
              value={this.state.refGen}
            /> */}
            {/*             <div className="imagE">
              <img className="plot plot3" src={this.state.grapA} />
            </div> */}
            <div>
              {/*               
              <ul>Gen: {items}</ul>
              <ul>Intercept: {effi}</ul>
              <ul>r_squared: {r_squa}</ul>
              <ul>Slope: {slop}</ul> */}
            </div>
            <div>
              {this.state.movies.map((genRes, index) => {
                return (
                  <div>
                    {genRes.gene} {genRes.group} {genRes.normalized}{" "}
                    {genRes.relative_expression}
                  </div>
                );
              })}
            </div>

            <button
              className=" buttonFileuploader btn btn-outline-success mb-2 mt-4"
              onClick={this.handleUpload}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default EfficiencyPcrComp2;

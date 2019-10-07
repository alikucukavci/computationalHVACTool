// import React, { useState, useEffect} from 'react'
// import Files from "react-files";
// import axios from "axios"
// const Home = () => {
    
//     const [jsonFile, setFile] = useState({})

    
//     useEffect(() => {
//         axios
//         .post("/projects", {
//           file: jsonFile
//         })
//         .then(() => {
//           console.log("MongoDB is working")
//           })
//         .catch(err => {
//           console.log(err);
//         });
//         console.log(jsonFile)


//     }, [jsonFile])

//     let fileReader = new FileReader()
//     fileReader.onload = event => {
//         setFile(JSON.parse(event.target.result));
//     };

    
//     return (
//       <div className="files">
//         <Files
//           className="files-dropzone btn-danger"
//           onChange={file => {
//             fileReader.readAsText(file[0]);
//           }}
//           onError={err => console.log(err)}
//           accepts={[".json"]}
//           multiple
//           maxFiles={3}
//           maxFileSize={10000000}
//           minFileSize={0}
//           clickable
//         >
//           Drop files here or click to upload
//         </Files>
//       </div>
//     );
// }
// export default Home



import React, { Component } from 'react'
import * as THREE from 'three';
import OrbitControls from "three-orbitcontrols"
import { Interaction } from "three.interaction"
import { Popover, OverlayTrigger, Button} from "react-bootstrap";


export default class ThreeJS extends Component {
  state = {
    popup: false,
    id:""
  }
  componentDidMount(){
    // const width = this.mount.clientWidth
    // const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      20,
      1000
    );
    
    this.camera.position.z = 100
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(this.renderer.domElement)
    //ADD Control to the renderer
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // ADD interaction
    this.interaction = new Interaction(this.renderer, this.scene, this.camera);
    //ADD geometry 
    const geometry = new THREE.BoxGeometry(3, 3, 3)
    const geometry1 = new THREE.BoxGeometry(7, 7, 7)
    //ADD material  
    const material = new THREE.MeshLambertMaterial({ color: '#0xF3FFE2'})
    const material1 = new THREE.MeshLambertMaterial({ color: '#007BFF'     })
    
    //ADD geometry and material to a mesh
    this.cube = new THREE.Mesh(geometry, material)
    this.cube1 = new THREE.Mesh(geometry1, material1)  
    
    //Add position to cube
    this.cube.position.set(0, 0, 0);
    this.cube1.position.set(5, 0, 0);

    //Add cube to scene
    this.scene.add(this.cube)
    this.scene.add(this.cube1)

    //Add ambient light
    this.lightAmbient = new THREE.AmbientLight(0xffffff, 0.5);
    //Add ambient light to scene
    this.scene.add(this.lightAmbient)

    // //Add pointlight
    // this.lightPoint = new THREE.PointLight(0xffffff, 0.5);
    // //Add point light to scene
    // this.scene.add(this.lightPoint)

    //Add ambient light
    this.sunLight = new THREE.DirectionalLight(0xffffff, 2.0, 1000);
    //Add ambient light to scene
    this.scene.add(this.sunLight)
    // Add interactions
    this.scene.add(this.cube);
    this.cube.cursor = 'pointer';
    this.cube1.cursor = 'pointer';

    this.popup = false
    this.cube.on('click', (ev) => {
      console.log(ev.target)
      console.log("clicked", this.popup)
      this.setState({
        popup: !this.state.popup,
        id:ev.target.uuid
      },()=>console.log("state update:",this.state))
    });

    this.cube1.on('click', (ev) => {
      console.log(ev.target)
      console.log("clicked", this.popup)
      this.setState({
        popup: !this.state.popup,
        id:ev.target.uuid
      },()=>console.log("state update:",this.state))
    });
    
    
    
// this.cube.on('touchstart', function(ev) {});
// this.cube.on('touchcancel', function(ev) {});
// this.cube.on('touchmove', function(ev) {});
// this.cube.on('touchend', function(ev) {});
// this.cube.on('mousedown', function(ev) {});
// this.cube.on('mouseout', function(ev) {});
// this.cube.on('mouseover', function(ev) {});
// this.cube.on('mousemove', function(ev) {});
//     this.cube.on('mouseup', function (ev) { });
    
    // this.scene.on('touchstart', ev => {
    //   console.log("ev");
    // })
    // this.scene.on('touchmove', ev => {
    //   console.log("ev");
    // })

this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.cube.rotation.x += 0.01
  this.cube.rotation.y += 0
  this.cube1.rotation.x -= 0.01
   this.cube1.rotation.y += 0
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
  }
  
  
  render() {

  return (
      <div>
      {this.state.popup && <h1 style={{ position: "absolute", backgroundColor: "white", color: "black" }}>Hallo im {this.state.id}</h1>} 
      <div
        style={{ width: '400px', height: '400px' }}
          ref={(mount) => { this.mount = mount }}
          
        
      >
</div>
    
      
      </div>
    )
  }
}
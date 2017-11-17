import { Component, HostListener } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare const THREE: any;

const SHADOWS = false;
const ADD_GROUND = true;
const URL = './assets/models/simple.gltf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;

  ngOnInit() {
    // RENDERER
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(.3, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    let loader = new THREE.GLTFLoader();
    loader.load(URL, data => {
      const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
      let geometry = data.scene.getObjectByName('Cube').geometry;
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
    });
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    if (this.mesh) {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
    }
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight)
  }
}

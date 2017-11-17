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
  camera = null;
  scene = null;

  ngOnInit() {
    // RENDERER
    this.scene = new THREE.Scene();

    let loader = new THREE.GLTFLoader();
    loader.load(URL, data => {
      this.camera = data.cameras[0];
      this.scene = data.scene;

			let ambient = new THREE.AmbientLight( 0x222222 );

      this.scene.add( ambient );

      let directionalLight = new THREE.DirectionalLight( 0xdddddd );
			directionalLight.position.set( 0, 0, 1 ).normalize();

      this.scene.add( directionalLight );

			let spot1 = new THREE.SpotLight( 0xffffff, 1 );

			spot1.position.set( 10, 20, 10 );
			spot1.angle = 0.25;
			spot1.distance = 1024;
			spot1.penumbra = 0.75;

			this.scene.add( spot1 );
    });
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    if (this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  getCamera(scene: any): any {

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight)
  }
}

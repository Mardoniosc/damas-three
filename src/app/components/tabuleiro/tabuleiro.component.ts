import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.scss'],
})
export class TabuleiroComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  pieces: THREE.Group = new THREE.Group();

  boardData: number[][] = [
    // Estrutura de dados para as peças
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ];

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.createBoard();
  }

  createBoard(): void {
    const container = this.canvasContainer.nativeElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Posicione a câmera para visualização em 3D
    camera.position.set(0, -100, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Ajuste a proporção de aspecto da câmera ao redimensionar a janela
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Criando o tabuleiro
    const board = new THREE.Group();

    const tileSize = 10; // Tamanho de cada casa do tabuleiro

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const geometry = new THREE.BoxGeometry(tileSize, tileSize, 1);
        const material = new THREE.MeshBasicMaterial({
          color: (i + j) % 2 === 0 ? 0xffffff : 0x808080,
        });
        const tile = new THREE.Mesh(geometry, material);
        tile.position.x = (i - 3.5) * tileSize;
        tile.position.y = (j - 3.5) * tileSize;
        board.add(tile);
      }
    }

    scene.add(board);

    camera.position.set(0, -70, 50);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    // Criando as peças
    let pieceSize = tileSize * 0.4; // Tamanho das peças

    // Limpe as peças existentes antes de adicionar as novas
    while (this.pieces.children.length) {
      this.pieces.remove(this.pieces.children[0]);
    }

    // Percorra a estrutura de dados e renderize as peças
    for (let i = 0; i < this.boardData.length; i++) {
      for (let j = 0; j < this.boardData[i].length; j++) {
        const pieceValue = this.boardData[i][j];
        if (pieceValue === 1 || pieceValue === 2) {
          const pieceGeometry = new THREE.CylinderGeometry(
            pieceSize / 2,
            pieceSize / 2,
            pieceSize,
            32
          );
          const pieceMaterial = new THREE.MeshBasicMaterial({
            color: pieceValue === 1 ? 0x000000 : 0xffffff,
          });
          const piece = new THREE.Mesh(pieceGeometry, pieceMaterial);
          piece.position.x = (j - 3.5) * tileSize;
          piece.position.y = (i - 3.5) * tileSize;
          this.pieces.add(piece);
        }
      }
    }

    // Adicione o grupo `pieces` à cena
    scene.add(this.pieces);
  }
}

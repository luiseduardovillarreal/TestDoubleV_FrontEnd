import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draggable-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draggable-icon.component.html',
  styleUrl: './draggable-icon.component.css'
})
export class DraggableIconComponent implements OnInit {
  @ViewChild('draggableIcon') iconElement!: ElementRef;
  
  // Estado de la posición y arrastre usando signals
  iconStyle = signal({
    right: '20px',
    top: '50%',
    left: 'auto',
    bottom: 'auto',
    transform: 'translateY(-50%)'
  });
  
  // Variables para control de arrastre
  isDragging = false;
  offsetX = 0;
  offsetY = 0;
  windowWidth = 0;
  windowHeight = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId))
      this.updateWindowDimensions();
  }
  
  // Actualiza las dimensiones de la ventana para cálculos de límites
  updateWindowDimensions() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }
  
  // Maneja redimensionamiento de ventana
  @HostListener('window:resize')
  onResize() {
    this.updateWindowDimensions();
    this.snapToEdge(); // Asegura que el ícono se mantenga en los bordes
  }
  
  // Inicia el arrastre
  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    
    // Obtiene el elemento y sus dimensiones
    const rect = this.iconElement.nativeElement.getBoundingClientRect();
    
    if (event instanceof MouseEvent) {
      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;
      
      // Registra eventos globales para mouse
      const moveListener = (e: MouseEvent) => this.onDrag(e);
      const upListener = () => {
        this.stopDrag();
        document.removeEventListener('mousemove', moveListener);
        document.removeEventListener('mouseup', upListener);
      };
      
      document.addEventListener('mousemove', moveListener);
      document.addEventListener('mouseup', upListener);
    } else {
      // Es un evento táctil
      this.offsetX = event.touches[0].clientX - rect.left;
      this.offsetY = event.touches[0].clientY - rect.top;
      
      // Registra eventos globales para touch
      const moveListener = (e: TouchEvent) => this.onDrag(e);
      const endListener = () => {
        this.stopDrag();
        document.removeEventListener('touchmove', moveListener as EventListener);
        document.removeEventListener('touchend', endListener);
      };
      
      document.addEventListener('touchmove', moveListener as EventListener);
      document.addEventListener('touchend', endListener);
    }
    
    // Previene comportamiento por defecto
    event.preventDefault();
  }
  
  // Durante el arrastre
  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    
    let clientX, clientY;
    
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      // Es un evento táctil
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }
    
    // Calcula nueva posición
    let newLeft = clientX - this.offsetX;
    let newTop = clientY - this.offsetY;
    
    // Ajusta la posición para que se mantenga dentro de la ventana
    const iconWidth = this.iconElement.nativeElement.offsetWidth;
    const iconHeight = this.iconElement.nativeElement.offsetHeight;
    
    newLeft = Math.max(0, Math.min(this.windowWidth - iconWidth, newLeft));
    newTop = Math.max(0, Math.min(this.windowHeight - iconHeight, newTop));
    
    // Actualiza posición usando la signal
    this.iconStyle.set({
      left: `${newLeft}px`,
      top: `${newTop}px`,
      right: 'auto',
      bottom: 'auto',
      transform: 'none'
    });
    
    event.preventDefault();
  }
  
  // Fin del arrastre
  stopDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      // Ajusta a los bordes
      this.snapToEdge();
    }
  }
  
  // Ajusta el ícono al borde más cercano
  snapToEdge() {
    if (!this.iconElement) return;
    
    const rect = this.iconElement.nativeElement.getBoundingClientRect();
    
    // Calcula distancias a cada borde
    const distToLeft = rect.left;
    const distToRight = this.windowWidth - rect.right;
    const distToTop = rect.top;
    const distToBottom = this.windowHeight - rect.bottom;
    
    // Encuentra el borde más cercano
    const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
    
    // Reset de valores
    const newStyles = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto',
      transform: 'none'
    };
    
    // Ajusta al borde más cercano
    if (minDist === distToLeft) {
      // Izquierda
      newStyles.left = '0px';
      newStyles.top = `${rect.top}px`;
    } else if (minDist === distToRight) {
      // Derecha
      newStyles.right = '0px';
      newStyles.top = `${rect.top}px`;
    } else if (minDist === distToTop) {
      // Arriba
      newStyles.top = '0px';
      newStyles.left = `${rect.left}px`;
    } else {
      // Abajo
      newStyles.bottom = '0px';
      newStyles.left = `${rect.left}px`;
    }
    
    this.iconStyle.set(newStyles);
  }
}
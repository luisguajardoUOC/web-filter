import { Component, OnInit } from '@angular/core';
import { WebFilterService } from '../../services/web-filter.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  proxyStatus: boolean | undefined;
  proxyMessage: string = '';
  certificateFile: File | undefined;

constructor (private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    this.getProxyStatus();
  }


  getProxyStatus() {
    this.webFilterService.getProxyStatus()
    .subscribe( {
      next:data => {
        this.proxyStatus = true;
      },
      error :(error) => {
        this.proxyStatus = false;
      }

    });
  }

  // Iniciar el proxy
  startProxy() {
    this.webFilterService.startProxy().subscribe(() => {
      this.proxyStatus = true;
    });
  }

  // Detener el proxy
  stopProxy() {
    this.webFilterService.stopProxy().subscribe(() => {
      this.proxyStatus = false;
    });
  }
  sendMessage() {
    this.messageChange(this.proxyMessage);
  }
   messageChange(message: string) {
    this.webFilterService.changeMessage(message).subscribe({
      next: () => console.log('Mensaje enviado correctamente'),
      error: (err) => console.error('Error al enviar el mensaje', err),
    });
    }
    onCertificateUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.certificateFile = input.files[0];
        console.log('Archivo cargado:', this.certificateFile.name);
      }
    }

    uploadCertificate() {
      if (this.certificateFile) {
        // Lógica para enviar el archivo de certificado al servidor
        this.webFilterService.uploadCertificate(this.certificateFile).subscribe(() => {
          console.log('Certificado subido con éxito');
        });
      } else {
        console.error('No se ha seleccionado ningún certificado');
      }
  }

}




/* this.webFilterService.addRule(newData)
          .subscribe({
            next: data => {  // Manejar la respuesta exitosa
              this.filteringRules = data;  // Actualizamos la lista de reglas
              this.getFilteringRules();
              this.getUsers();
              this.spanRow('url', (rule)=> data.url);
              this.clearForm();  // Limpiar el formulario aquí de agregar
            },
            error: error => {  // Manejar el error
              if (error.status === 400 && error.error.message) {  // Verificar si el error es un 400 y tiene un mensaje
                console.error("Error del servidor:", error.error.message);  // Registrar el mensaje de error
                alert(error.error.message);  // Mostrar el mensaje de error específico del servidor
              } else {
                console.error("Error al agregar la regla:", error);  // Registrar cualquier otro error
                alert("Ocurrió un error al agregar la regla. Intenta nuevamente.");  // Mostrar alerta genérica
              }*/

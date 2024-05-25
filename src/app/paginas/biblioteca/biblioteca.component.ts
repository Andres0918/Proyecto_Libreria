import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import { Message } from '../../domain/message';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {
  images: string[];
  mostrarContenedor: boolean = false;

  message: Message = new Message();
  messages: any;

  constructor(private storage: Storage, private informacionService:InformacionService) {
    this.images = [];
  }

  ngOnInit() {
    this.getImages();

    this.informacionService.getMessages().then(data => {
      this.messages = data.docs.map((doc:any) =>{
        console.log(doc.id)
        console.log(doc.data())
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      console.log('msgs', this.messages)
    })
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`); /*Se marca la referencia a donde se sube la img*/

    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response);
        this.getImages();
      })
      .catch(error => console.log(error));  /*Ya se suben las img a FireBase*/
  }

  getImages() {
    const imagesRef = ref(this.storage, 'images'); /*Referencia para obtener las imagenes*/

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) { /*Recorro los Items para descargar por su URL y mostrarlos*/
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  guardar(){
    this.informacionService.addMessage(this.message)
  }



  // Nuevo método para agregar un producto vacío
  addProduct() {
    this.mostrarContenedor = true;
  }
}

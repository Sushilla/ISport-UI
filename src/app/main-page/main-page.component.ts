import { Component, OnInit } from '@angular/core';
// import { IImage } from './modules/slideshow/IImage';
import {IImage} from '../modules/slideshow/IImage'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  // startIndex: number;
  Imagedata: any[] = [
    'https://www.gstatic.com/webp/gallery3/1.png',
    'https://www.gstatic.com/webp/gallery2/1.png',
    'https://www.gstatic.com/webp/gallery3/2.png',
    'https://lh3.googleusercontent.com/proxy/ljJ1e_UDhpjSj-SuNsLPLLtY9oh6pKzXnWUN8bJ0m9u9HC_vS2AujsmKn5lzXqN0knmj3iJkLl1Sa3X4vudc8VzK_f-x8zKehMxmzNnsMMPW',
    'https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk'
  ]
 
  // imageUrls: (string | IImage)[] = [
  //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg', caption: 'The first slide', href: '#config' },
  //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
  //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' }
  // ];

  

  constructor() { }

  ngOnInit(): void {
    // this.startIndex = 1;
    // this.Repeat();
  }

  // Repeat() {
    
  //     setTimeout(() => {
  //         this.__FunctionSlide();
  //         this.Repeat();
  //     }, 3000);
    
  // }

  // __FunctionSlide() {
  //   const slides = Array.from(document.getElementsByClassName('mall-show-slide'));
  //   if (slides === []) {
  //     this.Repeat();
  //   }
  //   for (const x of slides) {
  //     const y = x as HTMLElement;
  //     y.style.display = 'none';
  //   }
  //   if (this.startIndex > slides.length - 1) {
  //     this.startIndex = 0;
  //     const slide = slides[this.startIndex] as HTMLElement;
  //     slide.style.display = 'block';
  //     this.startIndex++;
  //   } else {
  //     const slide = slides[this.startIndex] as HTMLElement;
  //     slide.style.display = 'block';
  //     this.startIndex++;
  //   }
  // }

}


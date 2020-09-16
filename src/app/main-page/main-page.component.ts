import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  startIndex: number;
  Imagedata: any[] = [
    'https://www.gstatic.com/webp/gallery3/1.png',
    'https://www.gstatic.com/webp/gallery2/1.png',
    'https://www.gstatic.com/webp/gallery3/2.png',
    'https://lh3.googleusercontent.com/proxy/ljJ1e_UDhpjSj-SuNsLPLLtY9oh6pKzXnWUN8bJ0m9u9HC_vS2AujsmKn5lzXqN0knmj3iJkLl1Sa3X4vudc8VzK_f-x8zKehMxmzNnsMMPW',
    'https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk'
  ]
  selectImg: boolean;

  constructor() { }

  ngOnInit(): void {
    this.selectImg = false;
    this.startIndex = 1;
    this.Repeat();
  }

  Repeat() {
    
      setTimeout(() => {
        if (!this.selectImg) {
          this.__FunctionSlide();
          this.Repeat();
        }
      }, 3000);
    
  }

  __FunctionSlide() {
    const slides = Array.from(document.getElementsByClassName('mall-show-slide'));
    if (slides === []) {
      this.Repeat();
    }
    for (const x of slides) {
      const y = x as HTMLElement;
      y.style.display = 'none';
    }
    if (this.startIndex > slides.length - 1) {
      this.startIndex = 0;
      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    } else {
      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    }
  }

}

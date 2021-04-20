import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformServer} from '@angular/common';

interface PreloadOption {
  src: string;
  srcset?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'link-tag-img-attrs';

  constructor(@Inject(PLATFORM_ID) private platformId: {}, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit(): void {
    const option: PreloadOption = {
      src: 'https://res.cloudinary.com/hsuanlee/image/upload/c_fit,q_auto,w_256/v1618819484/photo-1618646034222-ecb3d5ecf3af_ued9fa.jpg',
      srcset: 'https://res.cloudinary.com/hsuanlee/image/upload/c_fit,q_auto,w_256/v1618819484/photo-1618646034222-ecb3d5ecf3af_ued9fa.jpg 1x, https://res.cloudinary.com/hsuanlee/image/upload/c_fit,q_auto,w_640/v1618819484/photo-1618646034222-ecb3d5ecf3af_ued9fa.jpg 2x'
    };
    this.appendPreloadLink(option);
  }

  private appendPreloadLink(option: PreloadOption): void {
    if (isPlatformServer(this.platformId)) {
      const linkNode = this.document.createElement('link') as HTMLLinkElement;
      linkNode.rel = 'preload';
      linkNode.as = 'image';
      linkNode.imageSrcset = option.srcset || '';
      //       ^^^^^^^^^^^
      // This attribute will not be set when rendering on the server side
      linkNode.href = option.src;
      this.document.head.appendChild(linkNode);
    }
  }


}

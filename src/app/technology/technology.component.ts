import { Component, HostListener, OnInit } from '@angular/core';
import { doc, docData, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  innerWidth!: number;
  isMobile!: boolean;
  technologyId!: string;
  technology$!: DocumentData;
  firestoreRef!: DocumentReference<DocumentData> | null;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    this.isMobile = (window.innerWidth < 769);

    document.querySelector('nav-link-icon')?.classList.add('active');

    //Gather id value from route to pass
    this.route.paramMap.subscribe(params => {
      if (params.get("itemid") !== null) {
        this.technologyId = params.get("itemid") || '';
        this.setFirestoreData();
      }
      else this.technologyId = '1';
      this.setFirestoreData();
    });
  }

  setFirestoreData() {
    this.firestoreRef = doc(this.firestore, `technology/${this.technologyId}`);

    if (this.firestoreRef) {
      docData(this.firestoreRef).pipe().subscribe(res => {
        this.technology$ = res;
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;

    if (window.innerWidth < 769) {
      this.isMobile = true;
    }
    else this.isMobile = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { doc, docData, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit {
  crewId!: string;
  crew$!: DocumentData;
  firestoreRef!: DocumentReference<DocumentData> | null;

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    document.querySelector('nav-link-icon')?.classList.add('active');

    //Gather id value from route to pass
    this.route.paramMap.subscribe(params => {
      if (params.get("itemid") !== null) {
        this.crewId = params.get("itemid") || '';
        this.setFirestoreData();
      }
      else this.crewId = '1';
      this.setFirestoreData();
    });
  }

  setFirestoreData() {
    this.firestoreRef = doc(this.firestore, `crew/${this.crewId}`);

    if (this.firestoreRef) {
      docData(this.firestoreRef).pipe().subscribe(res => {
        this.crew$ = res;
        console.log(this.crew$);
      });
    }
  }

}

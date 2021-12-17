import { Component, OnInit } from '@angular/core';
import { doc, docData, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinationId!: string;
  destination$!: DocumentData;
  firestoreRef!: DocumentReference<DocumentData> | null;

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    document.querySelector('destination-nav-link')?.classList.add('active');

    //Gather id value from route to pass
    this.route.paramMap.subscribe(params => {
      if (params.get("itemid") !== null) {
        this.destinationId = params.get("itemid") || '';
        this.setFirestoreData();
      }
      else this.destinationId = '1';
      this.setFirestoreData();
    });
  }

  setFirestoreData() {
    this.firestoreRef = doc(this.firestore, `destination/${this.destinationId}`);

    if (this.firestoreRef) {
      docData(this.firestoreRef).pipe().subscribe(res => {
        this.destination$ = res;
        console.log(this.destination$);
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { doc, docData, DocumentData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinationId!: string;
  destination$!: DocumentData;

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    //Gather id value from route to pass
    this.route.paramMap.subscribe(params => {
      if (params.get("itemid") !== null) {
        this.destinationId = params.get("itemid") || '';
      }
      else this.destinationId = '1';
    });

    console.log(this.destinationId);
    const firestoreRef = doc(this.firestore, `destination/${this.destinationId}`);

    if (firestoreRef) {
      docData(firestoreRef).pipe().subscribe(res => {
        this.destination$ = res;
        console.log(this.destination$);
      });
    }
  }

}

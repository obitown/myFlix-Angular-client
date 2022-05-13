import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(
    /**
     * @param data
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string
      description: string
    }
  ) { }

  ngOnInit(): void {
  }

}

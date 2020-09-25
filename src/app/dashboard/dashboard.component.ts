import { Component, AfterViewInit, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Hippo } from '../hippo.interface';
import { HippoService } from '../hippo.service';
declare var require: any;
import { AngularFirestore } from '@angular/fire/firestore';

const data = require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

	hippos: Observable<Hippo[]>; // = of([])
	items: Observable<any[]>;

	constructor(private hippoService: HippoService, firestore: AngularFirestore) {
		this.items = firestore.collection('items').valueChanges();
	}

	ngOnInit() {
		this.hippos = this.hippoService.get();
		this.hippoService.testCall().subscribe(res => console.log(res))
	}

	ngAfterViewInit() { }

	// Barchart
	barChart1: Chart = {
		type: 'Bar',
		data: data['Bar'],
		options: {
			seriesBarDistance: 15,
			high: 12,

			axisX: {
				showGrid: false,
				offset: 20
			},
			axisY: {
				showGrid: true,
				offset: 40
			},
			height: 360
		},

		responsiveOptions: [
			[
				'screen and (min-width: 640px)',
				{
					axisX: {
						labelInterpolationFnc: function (value: number, index: number): string {
							return index % 1 === 0 ? `${value}` : '';
						}
					}
				}
			]
		]
	};

	// This is for the donute chart
	donuteChart1: Chart = {
		type: 'Pie',
		data: data['Pie'],
		options: {
			donut: true,
			height: 260,
			showLabel: false,
			donutWidth: 20
		}
	};
}

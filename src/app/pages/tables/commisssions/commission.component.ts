import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { commissionTableData } from '../../../@core/data/commission-table';

@Component({
  selector: 'unicorn-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss'],
})
export class CommissionsComponent {

  settings = {
    actions: {  add:false, edit:false, delete:false,},
    columns: {
      currency: {
        title: '幣別',
        type: 'string',
      },
      Symbol: {
        title: '代號',
        type: 'string',
      },
      Put_Call: {
        title: '多空',
        type: 'string',
      },

      Date_Time: {
        title: '交易時間',
        type: 'string',
      },
      Buy_Sell: {
        title: '買/賣',
        type: 'string',
      },
      Quantity: {
        title: '數量',
        type: 'number',
      },
      Price: {
        title: '價格',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: commissionTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }


  search(searchTerm: string) {

  }

}

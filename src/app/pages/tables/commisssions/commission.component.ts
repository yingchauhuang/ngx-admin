import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { commissionTableData } from '../../../@core/data/commission-table';
import { commission } from '../../../@core/data/commission.interface';
@Component({
  selector: 'unicorn-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss'],
})
export class CommissionComponent {
  commissions : commission[];
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
    console.log(data);
    this.source.load(data);
  }

  getCommissions(): void {
    this.service.getData()
    .subscribe( commissions => this.commissions = commissions);
  }



}

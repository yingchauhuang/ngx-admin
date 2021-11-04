import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { commissionTableService } from '../../../@core/mock/commission-table.service';
import { commission } from '../../../@core/data/commission.interface';
@Component({
  selector: 'ngx-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss'],
})
export class CommissionComponent {
  commissions: commission[];
  settings = {
    actions: { add: false, edit: false, delete: false, },
    hideSubHeader: true,
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

  constructor(private service: commissionTableService) {
  }

  getCommissions(tRA: string,
    beginDate: string,
    endDate: string): void {
    this.service.getData(tRA,beginDate,endDate)
    .subscribe( commissions => { 
      // this.commissions= commissions;
      // console.log(this.commissions);
      // console.log(this.commissions[0]);
      this.source.load(commissions);});
  }



}

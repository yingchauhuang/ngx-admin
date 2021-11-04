import { Injectable } from '@angular/core';
import { commissionTableData } from '../data/commission-table';
import { commission } from "../data/commission.interface"
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class commissionTableService  {
  private commissionesUrl = 'http://127.0.0.1:3000/api/query/commission?';  // URL to web api

  constructor(
    private http: HttpClient,) {
  }

  /** GET heroes from the server */
  getData (tRA: string,
    beginDate: string,
    endDate: string): Observable<commission[]> {
    var url = new URL(this.commissionesUrl);
    url.searchParams.set('tRA',tRA);
    url.searchParams.set('beginDate',beginDate);
    url.searchParams.set('endDate',endDate);
    return this.http.get<commission[]>(url.href)
      .pipe(
        tap(_ => this.log('fetched commissions')),
        catchError(this.handleError('getcommissions', []))
      );
  }

  /** GET commission by id. Return `undefined` when id not found */
  getcommissionNo404<Data>(id: number): Observable<commission> {
    const url = `${this.commissionesUrl}/?id=${id}`;
    return this.http.get<commission[]>(url)
      .pipe(
        map(commissiones => commissiones[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} commission id=${id}`);
        }),
        catchError(this.handleError<commission>(`getcommission id=${id}`))
      );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T> (operation = 'operation', result?: T) {
    return (error: commission): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.TradeID}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a commissionService message with the MessageService */
  private log(message: string) {
    console.log(`commissionService: ${message}`);
    // this.messageService.add(`commissionService: ${message}`);
  }  
  // getData() {
  //   return JSON.parse(` [
  //     {"AccountId":"U10099528","acctAlias":"","currency":"USD","Symbol":"LBTYA","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 10:35:06","Buy_Sell":"SELL","Quantity":"-100","Price":"25.5","TradeID":"3928040722","TotalCommission":"-3.3851622500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10099528","acctAlias":"","currency":"USD","Symbol":"MYGN","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 14:09:53","Buy_Sell":"SELL","Quantity":"-100","Price":"30.4","TradeID":"3929435952","TotalCommission":"-3.6876612500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10099528","acctAlias":"","currency":"USD","Symbol":"CRBN","Multiplier":"1","Expiry":null,"Put_Call":"","Date_Time":"2021-07-16 10:11:49","Buy_Sell":"BUY","Quantity":"30","Price":"166.7","TradeID":"3931133984","TotalCommission":"-3.2862572500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10099528","acctAlias":"","currency":"USD","Symbol":"RRC","Multiplier":"1","Expiry":null,"Put_Call":"","Date_Time":"2021-07-16 10:28:03","Buy_Sell":"SELL","Quantity":"-100","Price":"15.135","TradeID":"3931341230","TotalCommission":"-3.3798761000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10099528","acctAlias":"","currency":"USD","Symbol":"AMAT","Multiplier":"1","Expiry":null,"Put_Call":"","Date_Time":"2021-07-16 13:56:05","Buy_Sell":"SELL","Quantity":"-60","Price":"130.34","TradeID":"3932536129","TotalCommission":"-3.3992812900","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"VWRA","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-14 09:04:58","Buy_Sell":"SELL","Quantity":"-43","Price":"113.6","TradeID":"3923295708","TotalCommission":"-2.7473330000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"GBP.USD","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-14 16:36:20","Buy_Sell":"BUY","Quantity":"19999","Price":"1.38632","TradeID":"3926527934","TotalCommission":"-0.5545002740","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"JPY","Symbol":"USD.JPY","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 02:43:28","Buy_Sell":"SELL","Quantity":"-250000","Price":"109.816","TradeID":"3926746444","TotalCommission":"-5.9034106410","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"CAD","Symbol":"USD.CAD","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 02:43:40","Buy_Sell":"SELL","Quantity":"-250000","Price":"1.25291","TradeID":"3926746534","TotalCommission":"-5.8074586300","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"CHF","Symbol":"USD.CHF","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 02:44:10","Buy_Sell":"SELL","Quantity":"-250000","Price":"0.9138","TradeID":"3926746506","TotalCommission":"-6.0895998950","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"GBP.USD","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 02:44:35","Buy_Sell":"BUY","Quantity":"180001","Price":"1.38632","TradeID":"3926746643","TotalCommission":"-5.9907797260","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"NZD.USD","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 02:44:35","Buy_Sell":"BUY","Quantity":"350000","Price":"0.70265","TradeID":"3926746685","TotalCommission":"-5.9185500000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"EUR.USD","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 02:44:44","Buy_Sell":"BUY","Quantity":"80000","Price":"1.18419","TradeID":"3926746779","TotalCommission":"-3.0000000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-1","Price":"71.62","TradeID":"779628777","TotalCommission":"-2.0700000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-1","Price":"71.62","TradeID":"779628779","TotalCommission":"-1.2200000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-2","Price":"71.62","TradeID":"779628780","TotalCommission":"-2.4400000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-1","Price":"71.62","TradeID":"779628781","TotalCommission":"-1.2200000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-1","Price":"71.62","TradeID":"779628782","TotalCommission":"-1.2200000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-1","Price":"71.62","TradeID":"779628784","TotalCommission":"-1.2200000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-1","Price":"71.62","TradeID":"779628785","TotalCommission":"-1.2200000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BZZ1","Multiplier":"1000","Expiry":"2021-11-01","Put_Call":"","Date_Time":"2021-07-15 02:54:58","Buy_Sell":"SELL","Quantity":"-2","Price":"71.62","TradeID":"779628786","TotalCommission":"-2.4400000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BSQR","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 10:51:00","Buy_Sell":"SELL","Quantity":"-100","Price":"3.32","TradeID":"3928207522","TotalCommission":"-1.6838504500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BSQR","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 10:51:00","Buy_Sell":"SELL","Quantity":"-400","Price":"3.3238","TradeID":"3928207551","TotalCommission":"-1.5354095520","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BSQR","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 10:51:00","Buy_Sell":"SELL","Quantity":"-100","Price":"3.32","TradeID":"3928207597","TotalCommission":"-0.3838504500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BSQR","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 10:51:00","Buy_Sell":"SELL","Quantity":"-100","Price":"3.32","TradeID":"3928207725","TotalCommission":"-0.6838504500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"BSQR","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 10:51:00","Buy_Sell":"SELL","Quantity":"-300","Price":"3.32","TradeID":"3928207791","TotalCommission":"-2.0515513500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"USD","Symbol":"MOFG","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 11:34:58","Buy_Sell":"BUY","Quantity":"100","Price":"29.03","TradeID":"3928520648","TotalCommission":"-1.3702572500","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083","acctAlias":"","currency":"JPY","Symbol":"USD.JPY","Multiplier":"1","Expiry":null,"Put_Call":"","Date_Time":"2021-07-15 21:12:57","Buy_Sell":"BUY","Quantity":"100000","Price":"109.892","TradeID":"3930127212","TotalCommission":"-2.9095043200","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083F","acctAlias":"","currency":"USD","Symbol":"XAUUSD","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-14 09:04:58","Buy_Sell":"BUY","Quantity":"3","Price":"1828.36","TradeID":"184136728","TotalCommission":"-2.0000000000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null},
  //     {"AccountId":"U10153083F","acctAlias":"","currency":"USD","Symbol":"XAUUSD","Multiplier":"1","Expiry":"0000-00-00","Put_Call":"","Date_Time":"2021-07-15 02:43:24","Buy_Sell":"BUY","Quantity":"147","Price":"1831.91","TradeID":"184213053","TotalCommission":"-66.6297848000","Revenue":null,"Expense":null,"Net":null,"RevenueInBase":null,"ExpenseInBase":null,"NetInBase":null}
  //   ]`);
  // }
}

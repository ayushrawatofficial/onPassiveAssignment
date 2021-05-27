import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private currentCartItems: any[] = [];
  private cartItemsList = new BehaviorSubject(this.currentCartItems);
  latestCartItemsList: Observable<any[]> = this.cartItemsList.asObservable();

  constructor() {}

  updateCart(pdt: any): void {
    this.latestCartItemsList.pipe(take(1)).subscribe((val) => {
      const newCartItemsArr = [...val];
      this.cartItemsList.next(newCartItemsArr);
    });
  }
}

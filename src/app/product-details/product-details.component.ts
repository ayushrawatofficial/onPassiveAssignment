import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  userName = '';
  displayedColumns: string[] = [
    'name',
    'quantity',
    'price',
    'totalPrice',
    'addToCart',
  ];
  displayedCartColumns: string[] = [
    'name',
    'quantity',
    'price',
    'totalPrice',
    'addToCart',
    'delete',
  ];

  dataList: Array<any> = [
    {
      id: 1,
      name: 'Rice',
      quantity: 3,
      price: 54,
      totalPrice: 162,
    },
    {
      id: 2,
      name: 'Rin',
      quantity: 1,
      price: 24,
      totalPrice: 24,
    },
    {
      id: 3,
      name: 'Apple',
      quantity: 10,
      price: 24,
      totalPrice: 240,
    },
    {
      id: 4,
      name: 'Ice cream Cone',
      quantity: 5,
      price: 60,
      totalPrice: 300,
    },
  ];

  cartItemsList: any[] = [];

  constructor(
    private cookieService: CookieService,
    private route: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.userName = this.cookieService.get('fname');
    this.commonService.latestCartItemsList.subscribe((cartItems) => {
      this.cartItemsList = cartItems;
    });
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/home']);
  }

  addToCart(productData: any): any {
    const productExistInCart = this.cartItemsList.find(
      ({ name }) => name === productData.name
    );

    this.dataList.forEach((element, index) => {
      if (element.id == productData.id) {
        element.quantity = productData.quantity - 1;
      }
    });

    if (!productExistInCart) {
      this.cartItemsList.push({
        ...productData,
        quantity: 1,
        totalPrice: productData.price,
      });
      this.commonService.updateCart(this.cartItemsList);
    } else {
      productExistInCart.quantity += 1;
      productExistInCart.totalPrice =
        productExistInCart.quantity * productData.price;
      this.commonService.updateCart(this.cartItemsList);
    }
  }

  getTotalPrice(productData: any) {
    return productData.quantity * productData.price;
  }

  getTotalCost() {
    return this.cartItemsList
      .map((t) => t.totalPrice)
      .reduce((acc, value) => acc + value, 0);
  }

  print() {
    const printContents = document.getElementById('printArea')?.innerHTML;
    let printWindow = window.open('', '');
    printWindow?.document.write('<html>');
    printWindow?.document.write('<body > <h1>Thanks For Shopping <br>');
    printWindow?.document.write(printContents || '');
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
    printWindow?.close();
  }

  delete(productData: any) {
    this.dataList.forEach((element, index) => {
      if (element.id == productData.id) {
        element.quantity = element.quantity + 1;
      }
    });

    if (productData.quantity > 1) {
      productData.quantity -= 1;
      productData.totalPrice = productData.quantity * productData.price;
      this.commonService.updateCart(this.cartItemsList);
    } else if ((productData.quantity = 1)) {
      productData.quantity -= 1;
      const newCartArr = this.cartItemsList.forEach((element, index) => {
        if (element.id == productData.id) this.cartItemsList.splice(index, 1);
      });
      this.commonService.updateCart(newCartArr);
    }
  }
}

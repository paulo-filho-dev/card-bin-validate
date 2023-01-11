import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'card-bin-validate';
  inputBrand = '';
  brand = '-';

  CARD_PATTERNS_TYPE: Map<string, any> = new Map([
    [SslCardType.AMEX, [34, 37]],
    [SslCardType.VISA, [4]],
    [
      SslCardType.ELO,
      [
        401178,
        401179,
        438935,
        457631,
        457632,
        431274,
        451416,
        457393,
        504175,
        [506699, 506778],
        [509000, 509999],
        627780,
        636297,
        636368,
        [650031, 650033],
        [650035, 650051],
        [650405, 650439],
        [650485, 650538],
        [650541, 650598],
        [650700, 650718],
        [650720, 650727],
        [650901, 650978],
        [651652, 651679],
        [655000, 655019],
        [655021, 655058],
      ],
    ],
    [SslCardType.DINERS, [[300, 305], 36, 38, 39]],
    [
      SslCardType.MASTERCARD,
      [
        [500000, 509999], //maestro
        [51, 55],
        [560000, 589999], //maestro
        [58],
        [600000, 699999], //maestro
        [2221, 2229],
        [223, 229],
        [23, 26],
        [270, 271],
        2720,
      ],
    ],
  ]);

  matchBrand(newValue: any): void {
    const brands = [
      {
        name: SslCardType.AMEX,
      },
      {
        name: SslCardType.DINERS,
      },
      {
        name: SslCardType.ELO,
      },
      {
        name: SslCardType.MASTERCARD,
      },
      {
        name: SslCardType.VISA,
      },
    ];
    for (let index = 0; index < brands.length; index++) {
      if (matches(newValue, this.CARD_PATTERNS_TYPE.get(brands[index].name))) {
        this.brand = brands[index].name;
        return;
      }
      this.brand = '-';
    }
  }
}
export enum SslCardType {
  AMEX = 'Amex',
  DINERS = 'Diners',
  ELO = 'Elo',
  MASTERCARD = 'Mastercard',
  VISA = 'Visa',
}

function matchesRange(
  cardNumber: string,
  min: number | string,
  max: number | string
): boolean {
  const maxLengthToCheck = String(min).length;
  const substr = cardNumber.substr(0, maxLengthToCheck);
  const integerRepresentationOfCardNumber = parseInt(substr, 10);

  min = parseInt(String(min).substr(0, substr.length), 10);
  max = parseInt(String(max).substr(0, substr.length), 10);

  return (
    integerRepresentationOfCardNumber >= min &&
    integerRepresentationOfCardNumber <= max
  );
}

function matchesPattern(cardNumber: string, pattern: string | number): boolean {
  pattern = String(pattern);

  return (
    pattern.substring(0, cardNumber.length) ===
    cardNumber.substring(0, pattern.length)
  );
}

function matches(cardNumber: string, pattern: string[] | number[]): boolean {
  let flag = false;
  pattern.forEach((element) => {
    if (Array.isArray(element)) {
      if (matchesRange(cardNumber, element[0], element[1])) {
        flag = true;
      }
    }
    if (matchesPattern(cardNumber, element)) {
      flag = true;
    }
  });
  return flag;
}

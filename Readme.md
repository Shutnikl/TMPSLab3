# Adapter Pattern: 
+ Este utilizat pentru a adapta interfața CarStockAdapter pentru a gestiona stocul de mașini în locul Singleton Pattern (CarStock). Adapterul CarStockAdapter oferă aceleași metode (addCar, removeCar, getStock), astfel încât codul existent să poată fi folosit fără modificări, în timp ce în spate utilizează o implementare diferită pentru gestionarea stocului de mașini.
```js
var CarStockAdapter = (function () {
    var stock = [];
  
    return {
      addCar: function (car) {
        stock.push(car);
        console.log('Mașina adăugată în stoc:', car);
      },
      removeCar: function (car) {
        var index = stock.indexOf(car);
        if (index > -1) {
          stock.splice(index, 1);
          console.log('Mașina eliminată din stoc:', car);
        }
      },
      getStock: function () {
        return stock;
      }
    };
  })();
```

# Decorator Pattern:
+  Este utilizat pentru a adăuga funcționalități suplimentare la obiectul Car prin intermediul decoratorilor. În exemplul dat, decoratorul YearDecorator adaugă anul mașinii în descrierea acesteia, extinzând comportamentul obiectului Car. Decoratorul utilizează moștenirea prototipală pentru a obține funcționalitatea adițională, păstrând în același timp legătura cu obiectul inițial Car.

```js
function CarDecorator(car) {
    this.car = car;
  }
  
  CarDecorator.prototype.getDescription = function () {
    return this.car.getDescription();
  };
  
  // Adaugă o funcționalitate suplimentară: afișează descrierea mașinii cu anul în paranteze
  function YearDecorator(car) {
    CarDecorator.call(this, car);
  }
  
  YearDecorator.prototype = Object.create(CarDecorator.prototype);
  
  YearDecorator.prototype.getDescription = function () {
    return this.car.getDescription() + ' (' + this.car.year + ')';
  };
```

# Composite Pattern: 
+ Este utilizat pentru a crea o structură ierarhică (CarList) pentru gestionarea listei de mașini. Aceasta permite adăugarea și eliminarea de mașini într-o structură compozită, unde atât obiectele individuale (Car) cât și grupurile de obiecte (CarList) pot fi tratate în mod uniform. Metoda getDescription este implementată pentru a obține descrierea listei de mașini prin concatenarea descrierilor individuale ale mașinilor.

```js
CarList.prototype.getDescription = function () {
    return this.cars.map(function (car) {
      return car.getDescription();
    }).join(', ');
  };
```

# Proxy Pattern:
 + Este utilizat pentru a controla accesul la metodele CarList prin intermediul unui proxy (CarListProxy). Proxy-ul oferă un strat suplimentar de securitate și control, verificând permisiunile înainte de a permite adăugarea sau eliminarea de mașini din stoc. În exemplul dat, se returnează întotdeauna true pentru a permite accesul în scopul demonstrativ, dar într-un scenariu real, logica de verificare a permisiunilor poate fi implementată aici.

```js
CarListProxy.prototype.addCar = function (car) {
    // Verifică dacă utilizatorul are permisiunea de a adăuga mașini
    if (this.checkPermissions()) {
      this.carList.addCar(car);
      console.log('Mașina adăugată în stoc:', car);
    } else {
      console.log('Nu aveți permisiunea de a adăuga mașini.');
    }
  };
```

# Concluzii: 
  Codul dat exemplifică utilizarea paternurilor de proiectare într-un context de gestionare a stocului de mașini. Adapter Pattern este utilizat pentru a adapta interfața existentă a Singleton-ului într-un Adapter care să gestioneze stocul de mașini. Decorator Pattern adaugă funcționalități suplimentare la obiectul Car, cum ar fi adăugarea anului în descrierea mașinii. Composite Pattern este utilizat pentru a crea o structură ierarhică pentru lista de mașini, permitând manipularea lor într-un mod uniform. Proxy Pattern oferă un strat suplimentar de control și securitate pentru accesul la metodele listei de mașini. Toate aceste paternuri de proiectare contribuie la crearea unui cod mai modular, flexibil și ușor de întreținut.
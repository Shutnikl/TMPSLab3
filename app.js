// Adapter Pattern: Adapter pentru gestionarea stocului de mașini
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
  
  // Clasa Car
  class Car {
    constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }
  
    getDescription() {
      return this.make + ' ' + this.model;
    }
  }

  // Decorator Pattern: Decorator pentru adăugarea de funcționalități suplimentare la obiectul Car
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
  
  // Composite Pattern: Structură ierarhică pentru lista de mașini
  function CarList() {
    this.cars = [];
  }
  
  CarList.prototype.addCar = function (car) {
    this.cars.push(car);
  };
  
  CarList.prototype.removeCar = function (car) {
    var index = this.cars.indexOf(car);
    if (index > -1) {
      this.cars.splice(index, 1);
    }
  };
  
  CarList.prototype.getDescription = function () {
    return this.cars.map(function (car) {
      return car.getDescription();
    }).join(', ');
  };
  
  // Proxy Pattern: Proxy pentru controlul accesului la metodele CarList
  function CarListProxy() {
    this.carList = new CarList();
  }
  
  CarListProxy.prototype.addCar = function (car) {
    // Verifică dacă utilizatorul are permisiunea de a adăuga mașini
    if (this.checkPermissions()) {
      this.carList.addCar(car);
      console.log('Mașina adăugată în stoc:', car);
    } else {
      console.log('Nu aveți permisiunea de a adăuga mașini.');
    }
  };
  

        CarListProxy.prototype.removeCar = function (car) {
            // Verifică dacă utilizatorul are permisiunea de a elimina mașini
            if (this.checkPermissions()) {
              this.carList.removeCar(car);
              console.log('Mașina eliminată din stoc:', car);
            } else {
              console.log('Nu aveți permisiunea de a elimina mașini.');
            }
          };
          
          CarListProxy.prototype.checkPermissions = function () {
            // Implementați logica de verificare a permisiunilor aici
            return true; // Exemplu: întotdeauna returnează true pentru scopul demonstrativ
          };
          
          // Controllerul
          var CarController = {
            init: function () {
              // Obține elementele HTML
              var form = document.getElementById('add-car-form');
              var makeInput = document.getElementById('make-input');
              var modelInput = document.getElementById('model-input');
              var yearInput = document.getElementById('year-input');
              var carListElement = document.getElementById('car-list');
          
              // Adaugă evenimentul de submit pentru formă
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                var make = makeInput.value.trim();
                var model = modelInput.value.trim();
                var year = parseInt(yearInput.value);
          
                if (make && model && year) {
                  // Creează o mașină și un decorator de an
                  var car = new Car(make, model, year);
                  var decoratedCar = new YearDecorator(car);
          
                  // Adaugă mașina în stoc și reafișează lista de mașini
                  CarStockAdapter.addCar(decoratedCar);
                  this.renderCarList(carListElement);
                  form.reset();
                }
              }.bind(this));
          
              // Afișează inițial lista de mașini
              this.renderCarList(carListElement);
            },
          
            renderCarList: function (element) {
              var stock = CarStockAdapter.getStock();
              var carList = '';
          
              stock.forEach(function (car) {
                carList += '<li>' + car.getDescription() + '</li>';
              });
          
              element.innerHTML = carList;
            }
          };
          
          // Inițializează controllerul
          CarController.init();
            
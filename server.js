const express = require('express');
const pug = require('pug');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'static', 'views', 'pages'));

app.get('/', (req, res)=>{
    res.render('index')
})

class SpaceStation{
    constructor(number, capacity, need) {
        this.number =number;
        this.capacity = capacity;
        this.need=need;
    }
}
class Planet{
    constructor(name, capacity,weight) {
        this.name=name;
        this.capacity = capacity;
        this.weight=weight;
    }
}
class SpaceStationOnOrbit{
    constructor(SpaceStation,Planet) {
        this.SpaceStation = SpaceStation;
        this.Planet = Planet;
    }
}
class Cargo
{
    constructor(code,name, weight) {
        this.code = code;
        this.name = name;
        this.weight = weight;
    }
}
class CargoFinishedOnSpaceStation
{
    constructor(SpaceStation,Cargo) {
        this.SpaceStation = SpaceStation;
        this.Cargo = Cargo;
    }
}
class CargoFinishedOnPlanet
{
    constructor(Planet,Cargo) {
        this.Planet = Planet;
        this.Cargo = Cargo;
    }
}

let SpaceStations = [new SpaceStation(50,16,1),new SpaceStation(12,16,1)]
let Planets = [new Planet('Mars',3,12)]
let SpaceStationsOnOrbit = []
let Cargos = [new Cargo(33,'Tesla',60)]
let CargosFinishedOnSpaceStation = []
let CargosFinishedOnPlanet = []
let CargosTransferedOnSpaceStation = []
let CargosTransferedOnPlanet = []



app.get('/SpaceStations', (req, res)=>{
    res.render('SpaceStations', {data: SpaceStations})
})
app.get('/Planets', (req, res)=>{
    res.render('Planets', {data: Planets})
})
app.get('/Cargos', (req, res)=>{
    res.render('Cargos', {data: Cargos})
})
app.get('/CargosToSpaceStation', (req, res)=>{
  res.render('CargosToSpaceStation', {Cargo: Cargos, SpaceStation:SpaceStations, CargoFinished: CargosFinishedOnSpaceStation})
})
app.get('/CargosToPlanet', (req, res)=>{
  res.render('CargosToPlanet', {Cargo: Cargos,Planet:Planets, CargoFinished: CargosFinishedOnPlanet})
})
app.get('/CargosFromStationToStation', (req, res)=>{
  res.render('CargosFromStationToStation', {CargoFinishedOnSpaceStation: CargosFinishedOnSpaceStation,SpaceStation:SpaceStations,
  CargoFinished: CargosTransferedOnSpaceStation})
})
app.get('/CargosFromPlanetToStation', (req, res)=>{
  res.render('CargosFromPlanetToStation', {CargoFinishedOnPlanet: CargosFinishedOnPlanet,SpaceStation:SpaceStations,
    CargoFinished:CargosTransferedOnPlanet})
})
app.get('/Summary', (req, res)=>{
        res.render('Summary', {SpaceStations:SpaceStations.filter(value=>{
        let c=0;
        CargosFinishedOnSpaceStation.forEach(value1=>{
            if(value1.SpaceStation === value) c++;
            })
        return value.need>=c/0.3;
        })
    })
})


app.post('/createSpaceStation', (req, res)=>{
    let body = req.body;
    console.log(body);
    console.log(body.number);
    let newSpaceStation = new SpaceStation(+body.number, +body.capacity, +body.need)
    let check = SpaceStations.some(value => value.number === +body.number)
    if(check) res.redirect('/SpaceStations')
    else {
        SpaceStations.push(newSpaceStation)
        res.redirect('/SpaceStations')}
});
app.post('/editSpaceStation', (req, res)=>{
    let body = req.body;
    let index = body.index[0];
    let check = SpaceStations.some(value => value.number === +body.number)

    console.log(index);
    if(check) res.redirect('/SpaceStations')
    else {
        if(body.number!='') SpaceStations[index].number=+body.number
        if(body.capacity!='') SpaceStations[index].capacity = +body.capacity
        if(body.need!='') SpaceStations[index].need = +body.need
        res.redirect('/SpaceStations')}
});
app.post('/deleteSpaceStation', (req, res)=>{
    let body = req.body;
    let index = body.index[0];

    SpaceStations.splice(index, 1)
    res.redirect('/SpaceStations')
});
app.post('/findSpaceStation', (req, res)=>{
    let body = req.body;
    let SpaceStation
    let check = SpaceStations.some(value => {
        if(value.number === +body.number) SpaceStation = value
        return value.number === +body.number
    })
    if(check) {
        res.render('SpaceStations', {info: SpaceStation, data: SpaceStations})
    } else res.redirect('/SpaceStations')
});


app.post('/createPlanet', (req, res)=>{
    let body = req.body;
    let check = Planets.some(value => value.name === body.name)
    let newPlanet = new Planet(body.name, +body.capacity, +body.weight)
    console.log(body, );

    if(check) res.redirect('/Planets');
    else {
        Planets.push(newPlanet)
        res.redirect('/Planets');
    }

});

app.post('/editPlanet', (req, res)=>{
    let body = req.body;
    let index = body.index[0];
    let check = Planets.some(value => value.name === body.name)
    if(!check) {
        if(body.name!='') Planets[index].name = body.name
        if(body.capacity!='') Planets[index].capacity = +body.capacity
        if(body.weight!='') Planets[index].weight = +body.weight
    }
    res.redirect('/Planets');
});

app.post('/deletePlanet', (req, res)=>{
    let body = req.body;
    let index = body.index[0];

    Planets.splice(index, 1)
    res.redirect('/Planets')
});

app.post('/findPlanet', (req, res)=>{
    let body = req.body;
    let Planet
    console.log(body);
    let check = Planets.some(value => {
        if(value.name === body.name) Planet = value
        return value.name === body.name
    })
    console.log(check);

    if(check) {
        res.render('Planets', {info: Planet, data: Planets})
    } else res.redirect('/Planets')
});

app.post('/createCargo', (req, res)=>{
    let body = req.body;
    let check = Cargos.some(value => value.code === +body.code)
    let newCargo = new Cargo(+body.code, body.name, +body.weight)
    console.log(body, );

    if(check) res.redirect('/Cargos');
    else {
        Cargos.push(newCargo)
        res.redirect('/Cargos');
    }

});

app.post('/editCargo', (req, res)=>{
    let body = req.body;
    let index = body.index[0];
    let check = Cargos.some(value => value.code === +body.code)
    if(!check) {
        if(body.code!='') Cargos[index].code = +body.code
        if(body.name!='') Cargos[index].name = body.name
        if(body.weight!='') Cargos[index].weight = +body.weight
    }
    res.redirect('/Cargos');
});

app.post('/deleteCargo', (req, res)=>{
    let body = req.body;
    let index = body.index[0];

    Cargos.splice(index, 1)
    res.redirect('/Cargos')
});

app.post('/findCargo', (req, res)=>{
    let body = req.body;
    let Cargo
    console.log(body);
    let check = Cargos.some(value => {
        if(value.code === +body.code) Cargo = value
        return value.code === +body.code
    })
    console.log(check);

    if(check) {
        res.render('Cargos', {info: Cargo, data: Cargos})
    } else res.redirect('/Cargos')
});
app.post('/CargoToSpaceStationDelivery', (req,res)=>{
    let body=req.body;
    console.log(body);
    let Cargo = body.Cargo[0];
    let SpaceStation = body.SpaceStation[0];
    let CargoOnSpaceStation = new CargoFinishedOnSpaceStation(SpaceStations[SpaceStation], Cargos[Cargo]);
    let check1 = CargosFinishedOnSpaceStation.some(value => value.Cargo.code === +CargoOnSpaceStation.Cargo.code)
    let check2 = CargosFinishedOnPlanet.some(value => value.Cargo.code === +CargoOnSpaceStation.Cargo.code)
    if(check1+check2)  res.redirect('/CargosToSpaceStation')
    else
    {
        SpaceStations.forEach(value=>{
            if(value.number === +CargoOnSpaceStation.SpaceStation.number)
            {
                let c=0;
                CargosFinishedOnSpaceStation.forEach(value1=>{
                    if(value1.SpaceStation === SpaceStations[SpaceStation]) c++;
                })
                if(c>=value.need) res.redirect('/CargosToSpaceStation')
                else 
                {
                    CargosFinishedOnSpaceStation.push(CargoOnSpaceStation);
                    res.render('CargosToSpaceStation',{Cargo: Cargos, SpaceStation: SpaceStations, CargoFinished: CargosFinishedOnSpaceStation})
                }
            }
        })
    }
});
app.post('/CargoToPlanetDelivery', (req,res)=>{
    let body=req.body;
    console.log(body);
    let Cargo = body.Cargo[0];
    let Planet = body.Planet[0];
    let CargoOnPlanet = new CargoFinishedOnPlanet(Planets[Planet], Cargos[Cargo]);
    let check1 = CargosFinishedOnSpaceStation.some(value => value.Cargo.code === +CargoOnPlanet.Cargo.code)
    let check2 = CargosFinishedOnPlanet.some(value => value.Cargo.code === +CargoOnPlanet.Cargo.code)
    if(check1+check2)  res.redirect('/CargosToPlanet')
    else
    {
        Planets.forEach(value=>{
            if(value.name === CargoOnPlanet.Planet.name)
            {
                let c=0;
                CargosFinishedOnPlanet.forEach(value1=>{
                    if(value1.Planet === Planets[Planet]) c++;
                })
                if(c>=value.capacity) res.redirect('/CargosToPlanet')
                else 
                {
                    CargosFinishedOnPlanet.push(CargoOnPlanet);
                    console.log(CargosFinishedOnPlanet);
                    res.render('CargosToPlanet',{Cargo: Cargos, Planet: Planets, CargoFinished: CargosFinishedOnPlanet})
                }
            }
        })
    }
});
app.post('/CargoFromStationToStationTransfer', (req,res)=>{
    let body=req.body;
    console.log(body);
    let SpaceStation = body.SpaceStation[0];
    let CargoOnSpaceStation = body.CargoFinishedOnSpaceStation[0];
    const Cargo = CargosFinishedOnSpaceStation[CargoOnSpaceStation];
    const CargoOnNewSpaceStation = new CargoFinishedOnSpaceStation(SpaceStations[SpaceStation], Cargos[CargoOnSpaceStation]);
    if(CargoOnNewSpaceStation.SpaceStation.number === Cargo.SpaceStation.number) res.redirect('/CargosFromStationToStation')
    else
    SpaceStations.forEach(value=>{
        if(value.number === +CargoOnNewSpaceStation.SpaceStation.number)
        {
            let c=0;
            CargosFinishedOnSpaceStation.forEach(value1=>{
                if(value1.SpaceStation === SpaceStations[SpaceStation]) c++;
            })
            if(c>=value.need) res.redirect('/CargosFromStationToStation')
            else
            {
                CargosFinishedOnSpaceStation.forEach(value1=>{
                    if(value1.Cargo.code === +CargoOnNewSpaceStation.Cargo.code) value1.SpaceStation=CargoOnNewSpaceStation.SpaceStation
                })
                CargosTransferedOnSpaceStation.push(CargoOnNewSpaceStation);
                res.render('CargosFromStationToStation', {CargoFinishedOnSpaceStation: CargosFinishedOnSpaceStation,SpaceStation:SpaceStations,
                CargoFinished: CargosTransferedOnSpaceStation})
            }
        }
    })
});
app.post('/CargoFromPlanetToStationTransfer', (req,res)=>{
    let body=req.body;
    console.log(body);
    let SpaceStation = body.SpaceStation[0];
    let CargoOnPlanet = body.CargoFinishedOnPlanet[0];
    const Cargo = CargosFinishedOnPlanet[CargoOnPlanet];
    const CargoOnNewSpaceStation = new CargoFinishedOnSpaceStation(SpaceStations[SpaceStation], Cargos[CargoOnPlanet]);
    SpaceStations.forEach(value=>{
        if(value.number === +CargoOnNewSpaceStation.SpaceStation.number)
        {
            let c=0;
            CargosFinishedOnSpaceStation.forEach(value1=>{
                if(value1.SpaceStation === SpaceStations[SpaceStation]) c++;
            })
            if(c>=value.need) res.redirect('/CargosFromStationToStation')
            else
            {
                CargosFinishedOnPlanet.forEach(value1=>{
                    if(value1 ===  Cargo)
                    {
                        CargosFinishedOnPlanet.splice(CargosFinishedOnPlanet.indexOf(value1),1);
                    }
                })
                CargosFinishedOnSpaceStation.push(CargoOnNewSpaceStation);
                CargosTransferedOnPlanet.push(CargoOnNewSpaceStation);
                res.render('CargosFromStationToStation', {CargoFinishedOnSpaceStation: CargosFinishedOnSpaceStation,SpaceStation:SpaceStations,
                CargoFinished: CargosTransferedOnPlanet})
            }
        }
    })
});
app.listen(3000, () => {
    console.log(3000)
});

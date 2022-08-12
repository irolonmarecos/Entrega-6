const fs = require("fs");

class Almacen  {
    constructor(data, price,img, id,date){
        this.Data = data,
        this.Price = price,
        this.Img = img,
        this.Id = id,
        this.Date = date
    }
} 
class container  {
    async getAllMsj(){
        try{
            const data =  fs.readFileSync("./routes/mensajes.json", "utf-8");
            let dataNuevo = JSON.parse(data)
            return dataNuevo.Mensajes
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async saveMsj(Data){
        try{
            const data = fs.readFileSync("./routes/mensajes.json", "utf-8");
            const dataNuevo = JSON.parse(data);
            const nvoProd = new Almacen (Data);
            dataNuevo.Mensajes.push(nvoProd);
            fs.writeFileSync("./routes/mensajes.json", JSON.stringify(dataNuevo, null, 2));
        }catch(err){
            throw new error ('ERROR');
        }
    }


    async getAll(){
        try{
            const data =  fs.readFileSync("./routes/stock.json", "utf-8");
            let dataNuevo = JSON.parse(data)
            return dataNuevo.Productos
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async save(Data, precio,img,date){
        try{
            const data = fs.readFileSync("./routes/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data);
            let Id = dataNuevo.Productos.length;
            const nvoProd = new Almacen (Data,precio,img,Id,date);
            nvoProd.Id = calcId (nvoProd.Id, dataNuevo);
            dataNuevo.Productos.push(nvoProd);
            fs.writeFileSync("./routes/stock.json", JSON.stringify(dataNuevo, null, 2));




            //
/*             const data = fs.readFileSync("./routes/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data);
            let Id = dataNuevo.Productos.length;
            const nvoProd = new Almacen (Data,precio,img,Id,date);
            nvoProd.Id = calcId (nvoProd.Id, dataNuevo);
            dataNuevo.Productos.push(nvoProd);
            fs.writeFileSync("./routes/stock.json", JSON.stringify(dataNuevo, null, 2));
 */        }catch(err){
            throw new error ('ERROR');
        }
    }
    async getById (id){
        try{
            const data = fs.readFileSync("./routes/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data);
            let filtro = dataNuevo.Productos.find((el) => el.id === id);
            return filtro;
        } catch(err){
            throw new error ('ERROR');
        }
    }
    async deleteById(id) {
        try{
            const data = fs.readFileSync("./routes/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data);
            const {Productos} = dataNuevo;
            let filtro = Productos.filter((el) => el.id !== id);
            dataNuevo.Productos = filtro;
            fs.writeFileSync("./routes/stock.json", JSON.stringify(dataNuevo, null, 2));
        }catch(err){
            throw new error ('ERROR');
        }
    } 
    async deleteAll() {
        try{
            const data = fs.readFileSync("./routes/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data);
            let borrado = [];
            dataNuevo.Productos = borrado;
            fs.writeFileSync("./routes/stock.json", JSON.stringify(dataNuevo, null, 2));
        }catch(err){
            throw new error ('ERROR');
        }
    } 
    async update(id,prod,pric) {
        try{
            const data = fs.readFileSync("./routes/stock.json", "utf-8");
            const dataNuevo = JSON.parse(data);
            let filtro = dataNuevo.Productos.find((el) => el.id === id);
            filtro.product = prod;
            filtro.price =  pric;
            fs.writeFileSync("./routes/stock.json", JSON.stringify(dataNuevo, null, 2));
        }catch(err){
            throw new error (err);
        }
    } 
} 

function calcId (Id,dataNuevo){
    if(Id == 0 ){
        return 1;
    } else{
        return dataNuevo.Productos[dataNuevo.Productos.length - 1].Id + 1;
    }
}


module.exports = container

const viewList = new container()

//viewList.update(30)
//mostrarProductos()
//viewList.save()
//viewList.getById (28)
//viewList.deleteById(4)
//viewList.deleteAll()
//viewList.getAll()


import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { agregarNotas, eliminarNotas, listarNotas, leerNotas,editarNotas } from './utiles/notas.js';
import chalk from 'chalk';
import readline from 'readline';


   const r1= readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

yargs(hideBin(process.argv))
    .command({
        command: 'agregar',
        describe: 'agrega una nueva nota',
        builder: {
            title: {
                describe: 'titulo de la nota',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'cuerpo de la nota',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            agregarNotas(argv.title, argv.body);
        }
    })
    .command({
        command: 'eliminar',
        describe: 'elimina una nota',
        builder: {
            title: {
                describe: 'titulo de la nota',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            eliminarNotas(argv.title);
        }
    })
    .command({
        command: 'ver',
        describe: 'lista todas las notas',
        handler() {
            listarNotas();
        }
    })
    .command({
        command: 'leer',
        describe: 'leer una nota',
        builder: {
            title: {
                describe: 'titulo de la nota',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            leerNotas(argv.title);
        }
    })
    .command({
        command: 'editar',
        describe: 'leer una nota',
        builder: {
            title: {
                describe: 'titulo de la nota',
                demandOption: true,
                type: 'string'
            },
            newBody: {
                describe: 'cuerpo nuevo de la nota',
                demandOption: true,
                type: 'string'
            }
        },
        
        handler(argv) {
            editarNotas(argv.title,argv.newBody);
        }
    })
    .parse();


   const preguntasIniciales=()=>{
    return `Proyecto de notas
    1. ver notas
    2.crear una nueva nota
    3.editar una nota
    4.leer una nota
    5.eliminar una nota
    6.salir
    TU OPCION: `
   }

   const preguntasTituloCuerpo=()=>{
    const opcion=[];
    r1.question('cual es el titulo de la nota',(titulo)=>{
        opcion.push(titulo);
        r1.question('cual es el titulo de tu nota',(cuerpo)=>{
            opcion.push(cuerpo);
        })

    })
    return opcion;
   }

   const preguntasTitulo=()=>{
    const opcion='';
    r1.question('cual es el titulo de la nota',(titulo)=>{
        opcion=titulo;

    })
    return opcion;
   }

    const regresar=()=>{
        r1.question(`deseas regresar al menu principal
        1. si 
        cualquier otra opcio para salir`,(regresar=>{
            if (parseInt(regresar)===1) {
                preguntar();
            }
        }))
    }
   const preguntar=()=>{
    r1.question(preguntasIniciales(),(opcion)=>{
        opcion=parseInt(opcion);
        if (opcion===1) {
            listarNotas();
            regresar();
            return;
        } else if (opcion===2) {
            const opciones=preguntasTituloCuerpo();
            agregarNotas(opciones[0],opciones[1])
            regresar();
            return;
        }else if (opcion===3) {
            console.log(chalk.blue('ingresar informacion de la nota a editar'));
            const opciones=preguntasTituloCuerpo();
            editarNotas(opciones[0],opciones[1]);
            regresar();
            return;
        }else if (opcion===4) {
            console.log(chalk.blue('ingresar informacion de la nota a leer'));
            const opciones=preguntasTitulo();
            leerNotas(opciones);
            regresar();
            return;
        }else if (opcion===5) {
            console.log(chalk.blue('ingresar informacion de la nota a eliminar'));
            const opciones=preguntasTitulo();
            eliminarNotas(opciones);
            regresar();
            return
        }else if(opcion===6){
            r1.close()
        }else{
            console.log(chalk.red.inverse('la opcion no es valida'));
        }
       })
   }
    
   preguntar();


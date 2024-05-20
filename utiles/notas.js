import fs from 'fs';
import chalk from 'chalk';

const cargarNota = () => {
    try {
        const dataBuffer = fs.readFileSync('notas.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
};

const guardarNotas = (notas) => {
    const dataJson = JSON.stringify(notas);
    fs.writeFileSync('notas.json', dataJson);
};

const agregarNotas = (title, body) => {
    const notas = cargarNota();
    const duplicateNote = notas.find((note) => note.title === title);
    if (!duplicateNote) {
        notas.push({
            title,
            body
        });
        guardarNotas(notas);
        console.log(chalk.green.inverse('Nota agregada'));
    } else {
        console.log(chalk.red.inverse('Nota no agregada, título duplicado'));
    }
};

const eliminarNotas = (title) => {
    const notas = cargarNota();
    const notasToKeep = notas.filter((note) => note.title !== title);
    if (notas.length > notasToKeep.length) {
        guardarNotas(notasToKeep);
        console.log(chalk.green.inverse('Nota eliminada'));
    } else {
        console.log(chalk.red.inverse('Nota no encontrada'));
    }
};

const listarNotas = () => {
    const notas = cargarNota();
    console.log(chalk.inverse('Tus notas'));
    notas.forEach(nota => {
        console.log(nota.title);
    });
};

const leerNotas = (title) => {
    const notas = cargarNota();
    const note = notas.find((note) => note.title === title);
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(chalk.blue(note.body));
    } else {
        console.log(chalk.red.inverse('Nota no encontrada'));
    }
};


const editarNotas = (title, newBody) => {
    const notas = cargarNota();
    const noteIndex = notas.findIndex((note) => note.title === title);

    if (noteIndex !== -1) {
        notas[noteIndex].body = newBody;
        guardarNotas(notas);
        console.log(chalk.green.inverse('Nota actualizada'));
    } else {
        console.log(chalk.red.inverse('Nota no encontrada'));
    }
};

export {
    agregarNotas,
    eliminarNotas,
    listarNotas,
    leerNotas,
    editarNotas  // Exportar el nuevo método
};

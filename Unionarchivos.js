const fs = require('fs');
const csv = require('csv-parser');
const fastcsv = require('fast-csv');

const file1 = 'Dataset1.csv';
const file2 = 'Dataset2.csv';
const outputFile = 'archivo_final.csv';

const data1 = [];
const data2 = [];

// Leer el primer archivo CSV
fs.createReadStream(file1)
   .pipe(csv())
   .on('data', (row) => {
      data1.push(row);
   })
   .on('end', () => {
      console.log(`Datos del ${file1} leídos.`);

      // Leer el segundo archivo CSV
      fs.createReadStream(file2)
         .pipe(csv())
         .on('data', (row) => {
            data2.push(row);
         })
         .on('end', () => {
            console.log(`Datos del ${file2} leídos.`);

            // Unir los datos sin afectar las columnas
            const datosFinales = data1.concat(data2);

            // Escribir los datos en un nuevo archivo CSV
            const ws = fs.createWriteStream(outputFile);
            fastcsv
               .writeToStream(ws, datosFinales, { headers: true })
               .on('finish', () => {
                  console.log(`Datos escritos en ${outputFile}`);
               });
         });
   });

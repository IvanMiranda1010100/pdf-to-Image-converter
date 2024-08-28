// Importa el paquete 'pdf-poppler' para la conversión de archivos PDF a imágenes
// Import the 'pdf-poppler' package for converting PDF files to images
const poppler = require('pdf-poppler');

// Importa el módulo 'path' para manipular rutas de archivos y directorios
// Import the 'path' module for handling file and directory paths
const path = require('path');

// Importa el módulo 'fs' (File System) para interactuar con el sistema de archivos
// Import the 'fs' (File System) module to interact with the file system
const fs = require('fs');

// Define las rutas de los archivos PDF que se van a convertir
// Define the paths of the PDF files to be converted
const pdfPaths = ['DB VOLUMEN2.pdf'];

// Define la ruta base de la carpeta donde se guardarán las imágenes convertidas
// Define the base path of the folder where the converted images will be saved
const baseImagesFolder = path.join(__dirname, 'DragonBallManga2');

// Verifica si la carpeta base existe; si no, la crea
// Check if the base folder exists; if not, create it
if (!fs.existsSync(baseImagesFolder)) {
  fs.mkdirSync(baseImagesFolder);
}

// Función asíncrona para convertir un archivo PDF a imágenes JPG
// Asynchronous function to convert a PDF file to JPG images
const convertPdfToJpg = async (pdfPath, outputFolder) => {
  try {
    const options = {
      format: 'jpg',             // Formato de salida (JPG)
      // Output format (JPG)
      out_dir: outputFolder,     // Directorio donde se guardarán las imágenes
      // Directory where the images will be saved
      out_prefix: 'page',        // Prefijo para el nombre de los archivos de imagen
      // Prefix for the image file names
      page: null                 // Convertir todas las páginas del PDF
      // Convert all pages of the PDF
    };

    // Ejecuta la conversión del PDF a imágenes usando 'pdf-poppler'
    // Perform the PDF to image conversion using 'pdf-poppler'
    await poppler.convert(pdfPath, options);
    console.log(`Imágenes guardadas en ${outputFolder} para ${pdfPath}`);
    // Log a message when the images are saved
  } catch (error) {
    console.error(`Error durante la conversión de ${pdfPath}:`, error);
    // Log an error message if the conversion fails
  }
};

// Función para renombrar las imágenes con numeración continua
// Function to rename the images with continuous numbering
const renameImages = (outputFolder, startIndex) => {
  try {
    const files = fs.readdirSync(outputFolder); // Lee todos los archivos en el directorio de salida
    // Read all files in the output directory
    const pdfFiles = files.filter(file => file.startsWith('page') && file.endsWith('.jpg'));
    // Filtra los archivos que comienzan con 'page' y terminan con '.jpg'

    pdfFiles.forEach((file, index) => {
      const oldPath = path.join(outputFolder, file); // Ruta original del archivo
      // Original file path
      const newIndex = startIndex + index;           // Nuevo índice para la numeración continua
      // New index for continuous numbering
      const newFileName = `page${newIndex}.jpg`;     // Nuevo nombre del archivo
      // New file name
      const newPath = path.join(outputFolder, newFileName); // Nueva ruta con el nombre actualizado
      // New path with the updated name
      fs.renameSync(oldPath, newPath); // Renombra el archivo
      // Rename the file
    });

    console.log(`Imágenes renombradas en ${outputFolder} comenzando desde ${startIndex}`);
    // Log a message indicating the images were renamed starting from a certain index
    return pdfFiles.length; // Devuelve el número de imágenes renombradas
    // Return the number of renamed images
  } catch (error) {
    console.error(`Error durante el renombrado de imágenes en ${outputFolder}:`, error);
    // Log an error message if renaming fails
    return 0;
  }
};

// Ejecutar la conversión y renombrado para cada PDF
// Execute the conversion and renaming for each PDF
const convertAllPdfs = async () => {
  let currentIndex = 1; // Inicia la numeración desde 1
  // Start numbering from 1

  for (const pdfPath of pdfPaths) {
    // Crea una carpeta específica para el PDF actual
    // Create a specific folder for the current PDF
    const pdfFolderName = path.basename(pdfPath, path.extname(pdfPath));
    const imagesFolder = path.join(baseImagesFolder, pdfFolderName);

    // Crear la carpeta si no existe
    // Create the folder if it doesn't exist
    if (!fs.existsSync(imagesFolder)) {
      fs.mkdirSync(imagesFolder);
    }

    // Convertir PDF a imágenes
    // Convert the PDF to images
    await convertPdfToJpg(pdfPath, imagesFolder);

    // Renombrar imágenes para seguir una numeración continua
    // Rename images to follow continuous numbering
    const imagesCount = renameImages(imagesFolder, currentIndex);
    currentIndex += imagesCount; // Actualiza el índice para la próxima serie de imágenes
    // Update the index for the next series of images
  }
};

// Ejecuta la conversión y renombrado de los PDFs
// Execute the conversion and renaming of the PDFs
convertAllPdfs();

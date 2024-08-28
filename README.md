# PDF to JPG/PNG Converter

Este proyecto permite convertir archivos PDF en imágenes JPG/PNG entre otros y renombrarlas en una secuencia numérica continua.

## Prerrequisitos

- Node.js
- npm (Node Package Manager)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/IvanMiranda1010100/pdf-to-Image-converter.git
    cd pdf-to-Image-converter
    ```

2. Instala los paquetes requeridos:

    ```bash
    npm install
    ```

## Uso

1. Coloca tus archivos PDF en el directorio raíz.

2. Actualiza el arreglo `pdfPaths` en el script para incluir los nombres de tus archivos PDF.

    ```javascript
    const pdfPaths = ['your-pdf-file.pdf'];
    ```

3. Ejecuta el script:

    ```bash
    node index.js
    ```

Las imágenes se guardarán en la carpeta `DragonBallManga2`, con cada archivo PDF en su propia subcarpeta. Las imágenes serán renombradas en una secuencia continua a partir del 1.

## Estructura del Proyecto

- `index.js`: Script principal para convertir y renombrar imágenes.
- `DragonBallManga2/`: Carpeta donde se almacenarán las imágenes.

## Dependencias

- `pdf-poppler`: Usado para convertir archivos PDF en imágenes.
- `fs`: Módulo de Node.js para interactuar con el sistema de archivos.
- `path`: Módulo de Node.js para manejar rutas de archivos.

---

# PDF to JPG/PNG Converter

This project allows you to convert PDF files into JPG images and rename them in a continuous numerical sequence.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/IvanMiranda1010100/pdf-to-Image-converter.git
    cd pdf-to-Image-converter
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

## Usage

1. Place your PDF files in the root directory.

2. Update the `pdfPaths` array in the script to include the names of your PDF files.

    ```javascript
    const pdfPaths = ['your-pdf-file.pdf'];
    ```

3. Run the script:

    ```bash
    node index.js
    ```

The images will be saved in the `DragonBallManga2` folder, with each PDF file having its own subfolder. The images will be renamed in a continuous sequence starting from 1.

## Project Structure

- `index.js`: Main script to convert and rename images.
- `DragonBallManga2/`: Folder where images will be stored.

## Dependencies

- `pdf-poppler`: Used to convert PDF files into images.
- `fs`: Node.js module for interacting with the file system.
- `path`: Node.js module for handling file paths.
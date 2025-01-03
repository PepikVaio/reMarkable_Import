const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('fontkit');
const path = require('path');

async function createPDF() {
  const fontBytes = fs.readFileSync('Ubuntu-M.ttf');  // Načteme vlastní font

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const page = pdfDoc.addPage([600, 400]);

  // Vložení fontu
  const customFont = await pdfDoc.embedFont(fontBytes);

  // Použití fontu pro text
  page.drawText('Ahoj světe z pdf-lib! Čeština: ěščřžýáíé', {
    x: 50,
    y: 350,
    size: 24,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  // Cesta pro uložení souboru
  const outputPath = path.join(__dirname, 'output.pdf');
  
  // Logování před uložením souboru
  console.log(`Ukládám soubor na: ${outputPath}`);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);

  // Logování po uložení souboru
  console.log('PDF bylo vytvořeno a uloženo na: ' + outputPath);

  // Kontrola existence souboru
  if (fs.existsSync(outputPath)) {
    console.log(`Soubor byl úspěšně vytvořen na: ${outputPath}`);
  } else {
    console.log('Chyba při vytváření souboru.');
  }
}

createPDF();

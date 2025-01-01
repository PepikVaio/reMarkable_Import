const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('fontkit');  // Importujeme fontkit

async function createPDF() {
  const fontBytes = fs.readFileSync('Ubuntu-M.ttf');  // Načteme vlastní font

  const pdfDoc = await PDFDocument.create();
  
  // Vytvoříme instanci fontkit podle nové verze
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

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
  console.log('PDF bylo vytvořeno!');
}

createPDF();

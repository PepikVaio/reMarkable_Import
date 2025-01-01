const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

async function createPDF() {
  // Načti vlastní font
  const fontBytes = fs.readFileSync('Ubuntu-M.ttf');

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  // Vlož vlastní font
  const customFont = await pdfDoc.embedFont(fontBytes);

  // Použij vlastní font pro text
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

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function createPDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  page.drawText('Ahoj světe z pdf-lib!', { x: 50, y: 350 });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
  console.log('PDF bylo vytvořeno!');
}

createPDF();

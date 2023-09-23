window.jsPDF = window.jspdf.jsPDF;

window.html2canvas = html2canvas;

$('.toPdf').on('click', function () {

      html2canvas(document.getElementById("allSelect"), {

            useCORS: true,

            allowTaint: true,

            scale: 1

      }).then(canvas => {

            let img = canvas.toDataURL('image/png');

            let myPdf = new jsPDF();

            let ratio = canvas.width / canvas.height;

            let width = myPdf.internal.pageSize.getWidth() - 40;

            let height = width / ratio

            myPdf.addImage(img, 'PNG', 20, 15, width, height)

            myPdf.save('test.pdf');

      })

})





$('.toPrint').on('click', function () {

      html2canvas(document.getElementById("allSelect"), {

            useCORS: true,

            allowTaint: true,

            scale: 1

      }).then(canvas => {

            let img = canvas.toDataURL('image/png');

            let myPdf = new jsPDF();

            let ratio = canvas.width / canvas.height;

            let width = myPdf.internal.pageSize.getWidth() - 40;

            let height = width / ratio

            myPdf.addImage(img, 'PNG', 20, 15, width, height)

            myPdf.autoPrint();

            let blob = myPdf.output('bloburl');

            window.open(blob)

      })

})
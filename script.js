document.getElementById("destinatarioSelect").addEventListener("change", function () {
  const valor = this.value;
  const campoCargoDestinatario = document.getElementById("cargoDestinatario");

  if (valor.includes("|")) {
    const [, cargo] = valor.split("|");
    campoCargoDestinatario.value = cargo;
  } else {
    campoCargoDestinatario.value = "";
  }
});

document.getElementById("correspondenciaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const form = document.getElementById("correspondenciaForm");
  
  const destinatarioRaw = document.getElementById("destinatarioSelect").value;
  if (!destinatarioRaw) {
    alert("Por favor selecciona un destinatario.");
    return;
  }

  const [destinatarioNombre] = destinatarioRaw.split("|");
  const cargoDestinatario = document.getElementById("cargoDestinatario").value;
  const instructivo = document.getElementById("instructivo").value;

  // Usa jsPDF para crear el PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Recuadro con título
  doc.setFontSize(10);

  doc.setFont("helvetica", "bold");
  doc.rect(10, 40, 190, 30); // Ampliado a 50 para incluir instructivo
  doc.text("OCTAVO DESTINATARIO:", 12, 45);
  doc.setFont("helvetica", "normal");
  doc.text(`${destinatarioNombre} - ${cargoDestinatario}`, 65, 45);
  doc.setFont("helvetica", "bold");
  doc.text("INSTRUCTIVO:", 12, 53);
  doc.setFont("helvetica", "normal");
  const instructivoTexto = doc.splitTextToSize(instructivo, 185);
  doc.text(instructivoTexto, 12, 58);

  const pdfUrl = doc.output('bloburl');
  const printWindow = window.open(pdfUrl);

  if (printWindow) {
    printWindow.focus();
    printWindow.onload = function () {
      printWindow.print();
      form.reset(); // ✅ AHORA FUNCIONA CORRECTAMENTE
    };
  } else {
    alert("Por favor, permite ventanas emergentes para generar e imprimir el documento.");
  }
});

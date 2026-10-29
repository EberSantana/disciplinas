// Cole entre as aspas o endereço do App da Web do Google Apps Script (termina em /exec).
// Enquanto estiver vazio, as disciplinas funcionam normalmente, só sem o ranking da turma.
window.RANKING_URL = "https://script.google.com/macros/s/AKfycbwfpbQESyRCNkeMf7feCEpuqe3hbNzOMqG7La9c_Zo7KZFRPdKjTyGy0TlrB1-bwYNR/exec";

// ---- Opcional: liberar materiais por data -------------------------------------------------
// Chave = pasta da disciplina ("banco-de-dados") ou a página ("banco-de-dados/apostila.html"); valor = data AAAA-MM-DD.
// Antes dessa data o aluno vê um aviso "disponível a partir de ..." (o professor sempre abre com ?professor).
// Atenção: é uma trava de organização no navegador; os arquivos continuam públicos no GitHub Pages.
window.LIBERACAO = {
  // "banco-de-dados/apostila.html": "2026-11-10"
};

// ---- Opcional: disciplinas por turma (quando duas turmas do mesmo curso veem coisas diferentes) ----
// Chave = texto exato da turma na planilha; valor = lista de pastas. Turmas que não aparecem aqui seguem a lista do curso.
window.DISCIPLINAS_POR_TURMA = {
  // "2º A": ["banco-de-dados"]
};

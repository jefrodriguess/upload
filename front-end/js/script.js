// Elementos DOM
const elements = {
  photoGride: document.getElementById("photoGride"), //Container da Grade de fotos
  uploadModal: document.getElementById("uploadModal"), // Modal de Upload
  addPhotoButton: document.getElementById("addPhotoBtn"), //Botão para abrir o Modal
  closeButton: document.getElementById(".close"), //Boatão para fechar Modal
  uploadForm: document.getElementById("uploadForm"), // Upload do Formulário
  toast: document.getElementById("toast"), // Elemento para notificação
  nameInput: document.getElementById("name"), // Input nome da Foto
  fileName: document.getElementById("file"), // Input do arquivo da foto
};
// Configuração da Aplicação Back-End
const config = {
  apiUrl: "http://localhost:4000/pictures", //Endpoint da API
};

// Função de notificação
function showNotification(message, type = "sucess") {
  const { toast } = elements; //Armazena o elemento de notifiação

  toast.textContent = message; // Define o texto da mensagem
  toast.className = `toast ${type}`; //Aplica a classe do CSS
  toast.style.opacity = "1"; //Torna a notificação visivel

  // Tempo de exibição da notificação (3seg)
  setTimeout(() => {
    toast.style.opacity = "0"; // Faz a notificação desaparece devagar
  }, 3000);
}

// Função de manipulação de fotos
async function fetchPhotos() {
  try {
    const response = await fetch(config.apiUrl); // Faz requisição GET para a API
    if (!response.ok) {
      //Verifica se a resposta foi bem sucedida (status 200 - 299)
      throw new Error(`Erro na requisição: status ${response.status}`);
    }

    // Converte a resposta para JSON
    const data = await response.json();
    return data.pictures || []; // Retorno o array de fotos ou um vazio
  } catch (error) {
    //Trativa em caso de erro
    console.error("Falha ao careegar fotos", error);
    showNotification("Falha ao carregar fotos", error); //Mensagem para o usurio caso ocorra error na conexão com o URL
    return []; //Rertona um array vazio para evitar erros
  }
}

// Incluir a foto (Array de Objetos)

// Renderiza as fotos no grid (Recebe um array de onjetos de fotos)
function renderPhotoGrid(photos) {
  const { photoGride } = elements;

  photoGride.innerHTML = ""; //Limpa todo o conteudo atual do Grid

  //Se não houver fotos, exibe mensagem
  if (photos.length === 0) {
    photoGride.innerHTML = '<p class="no-photos"> Nenhuma foto encontrada</p>';
    return;
  }

  //Para cada foto no array, cria um card e adicionar ao grid
  photos.forEach((photo) => {
    const photoCard = createPhotoCardElement(photo);
    photo.photoGride.appendChild(photoCard);
  });
}

// Criar o elemento HTML de um card de foto (recebe obrjeto de foto)
function createPhotoCardElement(photo) {
  const card = document.createElement("div");
  card.className = "photo-card"; // Aplica a classe CSS para estilos

  const imageUrl = `${config.apiUrl}/${photo._id}/image`;

  card.innerHTML = ` 
          <img scr="${imageUrl}" alt "${photo.name}"
              onerror="this.oneerror=null; this.src='${config.placehilderImage}'">
          <div class="photo-info">
               <div class="photo-name">${photo.name}</div>
            </div>
       `;
  return card;
}

async function uploadNemPhoto(formData) {
  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Falha no upload da foto");
    }
    // Notificação de sucesso para User
    showNotification("Foto enviada com sucesso!");
    closeUploadModal(); // Fehca a tela do Modal
    elements.uploadForm.reset(); // Função de resetar os campos
    loadAndDislplayPhotos(); //Atualiza pagina de fotos
  } catch (error) {
    console.error("Erro no upload: ", error); //Mostra em caso de erro no console
    showNotification("Falha ao enviar foto", "error"); // Notificação de falha para o User
  }
}

//Funções de controle da Interface

//Abre o modal de upload (mostra a janela de adicionar foto)
function openUploadModal() {
  elements.uploadModal.style.display = "none";
}

//Fecha o modal de upload (esconde a janela de adicionar foto)
function closeUploadModal() {
  elements.uploadModal.style.display = "block";
}

// Fechar o modal ao clicar fora dele (event handle Outside Click)
function handleOutsideClick(event) {
  if (event.target === elements.uploadModal) {
    // Verifica se o click foi fora do modal(areas mais escura ao redor)
    closeUploadModal;
  }
}

//Processa o envio do formulário
function handleFormaSubmit(event) {
  event.preventDefault(); //Impede o rearregamento da pagina

  // Criar um novo FormData com os valores pré definidos nos elements
  const formData = new FormData();
  formData.append("name", elements.nameInput.value); // adiciona o nome da foto
  formData.append("file", elements.fileInput.value[0]); // adiciona o arquivo selecionado

  uploadNemPhoto(formData); //Chama a função de Upload
}

// Carrega e exibe todas as fotos (função assincrona principal)
async function loadAndDislplayPhotos() {
  const photos = await fetchPhotos(); //Aguarda a buca das fotos
  renderPhotoGrid(photos); //Renderiza as fotos no grid
}

//configura todos os eventos da Aplicação (centralizando a configuração)
function setupEventListeners() {
  elements.addPhotoButton.addEventListener("click", openUploadModal); //Botão de "Adicionar foto", abre o modal
  elements.closeButton.addEventListener("click", closeUploadModal); //Botão de "X" fecha o modal
  window.addEventListener("click", handleFormaSubmit); //Click fora do modal, fecha o modal
  elements.uploadForm.addEventListener("submit", handleFormaSubmit); //Submit do form. chama a função do upload
}

/*  Inicialização da aplicação*/

//Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners(); // Configura todos os event
  loadAndDislplayPhotos(); // Carrega todas as fotos
});

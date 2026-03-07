import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore"; // Importações necessárias adicionadas
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcnH27vM03uP51PbBfSELIQ6tfDCmw1aE",
  authDomain: "meublog-da849.firebaseapp.com",
  projectId: "meublog-da849",
  storageBucket: "meublog-da849.firebasestorage.app",
  messagingSenderId: "527034794015",
  appId: "1:527034794015:web:023962cd3f01b23a17d52a",
  measurementId: "G-EWX80G4SJW"
};

// Inicialização
const app = initializeApp(firebaseConfig);

// Exportações das instâncias
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

/**
 * Função para salvar a assinatura do contrato
 */
export const saveContractSignature = async (userData) => {
  try {
    // Agora as funções collection e addDoc estão definidas via import
    const docRef = await addDoc(collection(db, "assinaturas_contrato"), {
      ...userData,
      status: "ativo",
      dataAssinatura: serverTimestamp(),
      versaoContrato: "1.0-2026", // Atualizado para o ano vigente
      organizacao: "Protect Clube Mineiro de Tiro"
    });
    return docRef.id;
  } catch (e) {
    console.error("Erro no Firestore:", e); // Log para ajudar no debug
    throw e;
  }
};
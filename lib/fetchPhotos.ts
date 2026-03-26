import { db } from "lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
}

/**
 * Busca fotos de uma coleção respeitando a ordem definida no painel admin.
 * - Se os documentos já tiverem o campo `order`, ordena por ele (asc).
 * - Caso contrário (coleção ainda sem campo `order`), cai para `createdAt`.
 */
export async function fetchOrderedPhotos(
  collectionName: string
): Promise<GalleryPhoto[]> {
  // 1ª tentativa: ordenar por `order`
  try {
    const q = query(
      collection(db, collectionName),
      orderBy("order", "asc")
    );
    const snapshot = await getDocs(q);

    // Se nenhum doc tiver o campo, o Firestore retorna vazio (índice ausente).
    // Nesse caso caímos no catch abaixo.
    if (snapshot.empty) throw new Error("empty");

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url as string,
      title: doc.data().title as string,
      description: doc.data().description as string | undefined,
    }));
  } catch {
    // 2ª tentativa: fallback para createdAt (comportamento original)
    const q = query(
      collection(db, collectionName),
      orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url as string,
      title: doc.data().title as string,
      description: doc.data().description as string | undefined,
    }));
  }
}
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

const COLLECTION_NAME = 'interviews';

/**
 * Créer un entretien
 */
export const createInterview = async (data) => {
  try {
    const interview = {
      candidateId: data.candidateId,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      department: data.department,
      date: data.date, // format: 'YYYY-MM-DD'
      time: data.time, // format: 'HH:MM'
      type: data.type || 'Visio', // Visio | Présentiel
      status: data.status || 'En attente',
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), interview);
    return { id: docRef.id, ...interview };
  } catch (error) {
    console.error('Erreur création entretien:', error);
    throw error;
  }
};

/**
 * Récupérer tous les entretiens
 */
export const getAllInterviews = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erreur récupération entretiens:', error);
    throw error;
  }
};

/**
 * Écouter les entretiens en temps réel
 */
export const subscribeToInterviews = (callback) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'asc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const interviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(interviews);
  });
  return unsubscribe;
};

/**
 * Mettre à jour un entretien
 */
export const updateInterview = async (id, data) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, id), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

/**
 * Supprimer un entretien
 */
export const deleteInterview = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return { success: true };
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
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
  serverTimestamp,
} from 'firebase/firestore';

const COLLECTION_NAME = 'candidatures';

/**
 * Récupère toutes les candidatures triées par date
 */
export const getAllCandidatures = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('submittedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erreur récupération candidatures:', error);
    throw error;
  }
};

/**
 * Crée une nouvelle candidature
 */
export const createCandidature = async (data) => {
  try {
    // On sauvegarde juste le nom du CV (pas le fichier)
    const cvFileName = data.cv?.name || null;

    const candidatureData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      educationLevel: data.educationLevel,
      university: data.university,
      stageType: data.stageType,
      department: data.department,
      startDate: data.startDate,
      endDate: data.endDate,
      motivation: data.motivation,
      skills: data.skills || '',
      cvFileName: cvFileName,
      status: 'En attente',
      submittedAt: new Date().toISOString(),
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), candidatureData);
    return { id: docRef.id, ...candidatureData };
  } catch (error) {
    console.error('Erreur création candidature:', error);
    throw error;
  }
};

/**
 * Met à jour le statut d'une candidature
 */
export const updateCandidatureStatus = async (id, newStatus) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    throw error;
  }
};

/**
 * Supprime une candidature
 */
export const deleteCandidature = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression:', error);
    throw error;
  }
};
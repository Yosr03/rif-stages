import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  writeBatch,
  getDocs,
} from 'firebase/firestore';

const COLLECTION_NAME = 'notifications';

/**
 * Créer une notification
 */
export const createNotification = async (data) => {
  try {
    const notification = {
      type: data.type, // 'new_application' | 'interview_reminder' | 'status_change'
      candidateName: data.candidateName,
      message: data.message,
      department: data.department || '',
      candidateId: data.candidateId || null,
      read: false,
      timestamp: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), notification);
    return { id: docRef.id, ...notification };
  } catch (error) {
    console.error('Erreur création notification:', error);
    throw error;
  }
};

/**
 * Écouter les notifications en temps réel
 */
export const subscribeToNotifications = (callback) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('timestamp', 'desc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(notifications);
  });

  return unsubscribe;
};

/**
 * Marquer une notification comme lue
 */
export const markAsRead = async (id) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, id), { read: true });
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

/**
 * Marquer toutes comme lues
 */
export const markAllAsRead = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    const batch = writeBatch(db);
    snapshot.docs.forEach((docSnap) => {
      if (!docSnap.data().read) {
        batch.update(docSnap.ref, { read: true });
      }
    });
    await batch.commit();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

/**
 * Supprimer une notification
 */
export const deleteNotification = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
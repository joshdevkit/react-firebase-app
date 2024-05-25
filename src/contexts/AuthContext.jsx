import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth, firestore, storage } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc, query, where, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        fetchAvatarUrl(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  const fetchAvatarUrl = async (userId) => {
    try {
      const userDetailsRef = doc(firestore, 'user_details', userId);
      const docSnapshot = await getDoc(userDetailsRef);
      if (docSnapshot.exists()) {
        const userDetailsData = docSnapshot.data();
        setAvatarUrl(userDetailsData.avatar || '');
      }
    } catch (error) {
      console.error('Error fetching avatar URL:', error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  const signUpAccount = async (email, password, firstName, lastName, imageFile) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      const userId = userCredential.user.uid;
      const avatarRef = ref(storage, `avatars/${userId}/${imageFile.name}`);
      await uploadBytes(avatarRef, imageFile);
      const avatarUrl = await getDownloadURL(avatarRef);

      const userDetailsRef = doc(firestore, 'user_details', userId);
      await setDoc(userDetailsRef, {
        firstName,
        lastName,
        avatar: avatarUrl,
      });
    } catch (error) {
      console.error('Error in signUpAccount:', error);
      throw error;
    }
  };

  const getUserDetails = async () => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in.');
      }
      const userDetailsRef = doc(firestore, 'user_details', currentUser.uid);
      const userDetailsSnapshot = await getDoc(userDetailsRef);

      if (userDetailsSnapshot.exists()) {
        return userDetailsSnapshot.data();
      } else {
        throw new Error('User details not found.');
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      throw error;
    }
  };

  const getUserInformations = async () => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in.');
      }
      const userDocRef = doc(firestore, 'user_informations', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
  };

  const addUserInformations = async (userInfo) => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in.');
      }

      const userInfoObject = {
        birthday: Timestamp.fromDate(userInfo.birthday),
        address: userInfo.address,
        contactNumber: userInfo.contactNumber,
      };

      const userDocRef = doc(firestore, 'user_informations', currentUser.uid);
      await setDoc(userDocRef, userInfoObject);
    } catch (error) {
      console.error('Error adding user information:', error);
      throw error;
    }
  };

  const fetchUsersExceptCurrentUser = async (currentUserId) => {
    try {
      if (!currentUserId) {
        throw new Error('Current user ID is required.');
      }

      const userQuerySnapshot = await getDocs(collection(firestore, 'user_details'));
      const usersList = userQuerySnapshot.docs
        .filter((doc) => doc.id !== currentUserId)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      const friendRequestsQuerySender = query(
        collection(firestore, 'friendRequests'),
        where('senderId', '==', currentUserId)
      );
      const friendRequestsQueryReceiver = query(
        collection(firestore, 'friendRequests'),
        where('receiverId', '==', currentUserId)
      );

      const [friendRequestsSnapshotSender, friendRequestsSnapshotReceiver] = await Promise.all([
        getDocs(friendRequestsQuerySender),
        getDocs(friendRequestsQueryReceiver),
      ]);

      const friendRequestsSender = friendRequestsSnapshotSender.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const friendRequestsReceiver = friendRequestsSnapshotReceiver.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const friendRequests = [...friendRequestsSender, ...friendRequestsReceiver];

      const combinedData = usersList.map((user) => {
        const sentRequest = friendRequests.find((fr) => fr.senderId === currentUserId && fr.receiverId === user.id);
        const receivedRequest = friendRequests.find((fr) => fr.receiverId === currentUserId && fr.senderId === user.id);
        return {
          ...user,
          friendRequest: sentRequest || receivedRequest || null,
        };
      });

      return combinedData;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const cancelFriendRequest = async (requestId) => {
    try {
      await deleteDoc(doc(firestore, 'friendRequests', requestId));
      return true;
    } catch (error) {
      console.error('Error canceling friend request:', error);
      return false;
    }
  };

  const uploadAvatar = async (file) => {
    if (!currentUser) return null;

    const avatarRef = ref(storage, `avatars/${currentUser.uid}/${file.name}`);
    await uploadBytes(avatarRef, file);
    const avatarURL = await getDownloadURL(avatarRef);
    return avatarURL;
  };

  const updateAvatar = async (file) => {
    const avatarURL = await uploadAvatar(file);

    if (avatarURL) {
      const userDetailsRef = doc(firestore, 'user_details', currentUser.uid);
      await setDoc(userDetailsRef, { avatar: avatarURL }, { merge: true });
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in.');
      }

      const existingRequestRef = doc(firestore, 'friendRequests', `${currentUser.uid}_${receiverId}`);
      const existingRequestSnap = await getDoc(existingRequestRef);
      if (existingRequestSnap.exists()) {
        throw new Error('Friend request already sent.');
      }

      const requestRef = doc(firestore, 'friendRequests', `${currentUser.uid}_${receiverId}`);
      await setDoc(requestRef, {
        senderId: currentUser.uid,
        receiverId,
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      return true;
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const value = {
    currentUser,
    loginWithEmailPassword,
    getUserDetails,
    signUpAccount,
    getUserInformations,
    logout,
    addUserInformations,
    fetchUsersExceptCurrentUser,
    sendFriendRequest,
    forgotPassword,
    cancelFriendRequest,
    updateAvatar,
    avatarUrl,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

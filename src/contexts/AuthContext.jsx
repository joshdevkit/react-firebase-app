import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth, firestore, storage } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { Timestamp } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const signUpAccount = async (email, password, firstName, lastName, imageFile) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      const userId = userCredential.user.uid;
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(storageRef, imageFile);
      const avatarUrl = await getDownloadURL(storageRef);

      const userDetailsRef = doc(firestore, 'user_details', userId);
      await setDoc(userDetailsRef, {
        firstName: firstName,
        lastName: lastName,
        avatar: avatarUrl,
      });
    } catch (error) {
      throw error;
    }
  };

  const getUserDetails = async () => {
    try {
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }
      const userDetailsRef = doc(firestore, 'user_details', currentUser.uid);
      const userDetailsSnapshot = await getDoc(userDetailsRef);

      if (userDetailsSnapshot.exists()) {
        return userDetailsSnapshot.data();
      } else {
        throw new Error("User details not found.");
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      throw error;
    }
  };


  const getUserInformations = async () => {
    try {
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }

      const userDocRef = doc(firestore, 'user_informations', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data();

      } else {
        console.log("No user information found for the current user.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      throw error;
    }
  };


  const addUserInformations = async (userInfo) => {
    try {
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }

      const userInfoObject = {
        birthday: Timestamp.fromDate(userInfo.birthday),
        address: userInfo.address,
        contactNumber: userInfo.contactNumber,
      };

      const userDocRef = doc(firestore, 'user_informations', currentUser.uid);
      const success = await setDoc(userDocRef, userInfoObject);
      if (success) {
        return true;
      }
    } catch (error) {
      console.error("Error adding user information:", error);
      throw error;
    }
  };



  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Failed to log out", error);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

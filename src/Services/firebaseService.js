import {db} from "../firebaseConfig";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where
} from "firebase/firestore";

const userCollectionRef = collection(db, "user");
const challengeCollectionRef = collection(db, "challenge");


const getAllChallenges = async() => {
  return await getDocs(challengeCollectionRef);
};

const addChallenge = (newchallenge) => {
  return addDoc(challengeCollectionRef, newchallenge);
};

const upvoteChallenge = async(id, updatechallenge) => {
  const challengeDoc = doc(db, "challenge", id);
  return updateDoc(challengeDoc, updatechallenge);
};

const getAllUsers = async() => {
    return await getDocs(userCollectionRef);
  };

  const addUser = (newuser) => {
    return addDoc(userCollectionRef, newuser);
  };

  const updateUser = async(id, updateduser) => {
    const userDoc = doc(db, "user", id);
    return await updateDoc(userDoc, updateduser);
  };

  const getUserById=async(id)=>{
    const querydata = query(userCollectionRef, where("employeeid","==",id));
     return await getDocs(querydata);
  }
  const getEmployeeIdByEmail=async(email)=>{
    const querydata = query(userCollectionRef, where("email","==",email));
     return await getDocs(querydata);
  }

export {getAllUsers,addUser,updateUser,getUserById,getAllChallenges,addChallenge,upvoteChallenge,getEmployeeIdByEmail};
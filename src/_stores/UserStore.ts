import { makeAutoObservable } from "mobx";

import { auth } from "../_utilities/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

class UserStore {
  private user: any = null;
  private isLoading: Boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  public loginPersists() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return (this.user = user);
      }
      this.user = null;
    });

    this.isLoading = false;
  }

  public getIsLoading(): Boolean {
    return this.isLoading;
  }

  public getUser(): any {
    return this.user;
  }

  public signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      this.user = user;

      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
}

export default new UserStore();

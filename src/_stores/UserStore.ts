import { makeAutoObservable } from "mobx";

import { setCookie } from "../_utilities/Helpers";

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

  public getIsLoading(): Boolean {
    return this.isLoading;
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem("user") ?? "");
  }

  public setUser(user: any): void {
    this.user = user;
  }

  public signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      sessionStorage.setItem("user", JSON.stringify(user));

      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public logout = async () => {
    try {
      await signOut(auth);
      setCookie("roomId", "undefined");
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    }
  };
}

export default new UserStore();

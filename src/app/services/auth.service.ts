import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
/**
 * FirebaseのAuthを直接呼びたくなかったのでラップするサービス
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly auth: Auth
  ) { }

  // 既存ユーザーでログイン
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  // 新規ユーザーでログイン
  signIn(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  logout() {
    return signOut(this.auth)
  }

  getAuthState() {
    return authState(this.auth)
  }
}

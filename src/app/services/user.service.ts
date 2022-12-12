import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { writeBatch } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly firestore: Firestore,
    private readonly auth: Auth
  ) { }

  /**
   * ユーザー作成時のuidをキーにドキュメントを作成する
   * 非公開情報(会員情報)
   * /user/{uid}
   */
  createUser(user: User) {
    const batch = writeBatch(this.firestore)
    // 非公開情報を作成
    batch.set(doc(this.firestore, 'users', user.uid), {
      name: null,
      address: null,
      email: user.email,
      phoneNumber: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    // 公開情報を作成
    batch.set(doc(this.firestore, 'public-profiles', user.uid), {
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return batch.commit()
  }

  /**
   * 公開プロフィールを取得する
   */
  async getProfile(uid: string) {
    const ref = doc(this.firestore, 'public-profiles', uid)
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) {
      return snapshot.data
    }
    return null
  }

  /**
   * アカウント情報を取得する
   */
  async getAccount(uid: string) {
    const ref = doc(this.firestore, 'users', uid)
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) {
      return snapshot
    }
    return null
  }

  // 変更履歴
  // 将来的に変更履歴を積んでからCloudFunctionsでユーザー作成・データの更新が良さそう
  // /user/{uid}/changelog/{changelog}

  // 退会処理
  // Authenticationアカウントを削除したあとはドキュメント操作ができないのでCloudFunctionsからドキュメントを削除する
  // /unsbscribed-user/{uid}
  withdrawMembership() {
    return this.auth.currentUser?.delete()
  }

  // 公開情報
  // /public-profile/{uid}
  updateProfile(uid: string, displayName: string, photoURL: string) {
    const ref = doc(this.firestore, 'public-profiles', uid)
    return setDoc(ref, {
      displayName,
      photoURL,
      updatedAt: serverTimestamp()
    })
  }

  // レビュー
  // レビューが公開情報のrefを持つ
  // /products/{product}/reviews/{id}
}

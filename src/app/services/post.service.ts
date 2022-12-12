import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private readonly firestore: Firestore
  ) { }

  // 投稿
  // /posts/{postid}
  post(data: any) {
    const ref = collection(this.firestore, 'posts')
    return addDoc(ref, data)
  }

  // 下書き
  // /users/{uid}/draft/{draftid}

  // 削除
  // /unpublish-posts/{postid}

  // いいね
  // /posts/{postid}/

  // コメント
  // /posts/{postid}/coments/{commentid}

  // 最新の投稿を取得
  async getPosts() {
    const ref = query(collection(this.firestore, 'posts'))
    const snapshot = await getDocs(ref)
    if (snapshot.empty) {
      return null
    }
    return snapshot.docs.map(doc => doc.data())
  }

  // 特定のユーザーの投稿一覧を取得する
}

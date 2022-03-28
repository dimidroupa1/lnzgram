export const uploadPost = (payload, user, storage, db) => {
    if (payload.image != "") {
        const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);
        upload.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Progress: ${progress}%`);
                if (snapshot.state === "RUNNING") {
                    console.log(`Progress: ${progress}%`)
                }
            },
            (error) => console.log(error.code),
            async () => {
                const downloadURL = await upload.snapshot.ref.getDownloadURL();
                db
                    .collection("posts")
                    .add({
                        caption: payload.description,
                        sharedImg: downloadURL,
                        profileImg: user.photoURL,
                        username: user.displayName,
                        userId: user.uid,
                        timestamp: payload.timestamp
                    })
                    .catch((error) => console.log(error.message));
                db
                    .collection("users")
                    .doc(user.uid)
                    .collection("postsUser")
                    .add({
                        caption: payload.description,
                        sharedImg: downloadURL,
                        profileImg: user.photoURL,
                        username: user.displayName,
                        timestamp: payload.timestamp
                    });
            }
        )
    }
}


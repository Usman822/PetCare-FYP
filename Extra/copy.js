// useEffect(() => {
//   const usermail = firebase.auth().currentUser.email;
//   firebase
//     .firestore()
//     .collection("doctors")
//     .where("email", "==", usermail)
//     .onSnapshot((querySnapshot) => {
//       const users = [];

//       querySnapshot.forEach((documentSnapshot) => {
//         users.push({
//           ...documentSnapshot.data(),
//           key: firebase.auth().uid,
//           // key: firebase.auth().currentUser.uid,
//         });
//       });

//       setUsers(users);
//     });
//   firebase
//     .firestore()
//     .collection("users")
//     .where("email", "==", usermail)
//     .onSnapshot((querySnapshot) => {
//       const users = [];

//       querySnapshot.forEach((documentSnapshot) => {
//         users.push({
//           ...documentSnapshot.data(),
//           key: firebase.auth().uid,
//           // key: firebase.auth().currentUser.uid,
//         });
//       });

//       setUsers(users);
//     });
//   return () => {};
// }, []);

//--------------------

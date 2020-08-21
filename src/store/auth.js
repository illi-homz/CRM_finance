import firebase from 'firebase/app'

export default {
  actions: {
    async LOGIN({commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async LOGOUT({commit}) {
      await firebase.auth().signOut()
      commit('CLEAR_INFO')
    },
    async REGISTER({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('GET_USER_ID')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    GET_USER_ID() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}

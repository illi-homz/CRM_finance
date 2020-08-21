import firebase from 'firebase/app'

export default {
  actions: {
    async CREATE_CATEGORY({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('GET_USER_ID')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async FETCH_CATEGORIES({dispatch, commit}) {
      try {
        const uid = await dispatch('GET_USER_ID')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async FETCH_CATEGORY_BY_ID({dispatch, commit}, id) {
      try {
        const uid = await dispatch('GET_USER_ID')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {...category, id}
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async ACTION_UPDATE_CATEGORY({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('GET_USER_ID')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    }
  }
}

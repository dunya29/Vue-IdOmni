import axios from "axios"
const instance = axios.create({
  baseURL: 'https://30e3c61cecffef28.mokky.dev/',
  /*  withCredentials: true,
 headers: {
    "API-KEY": ""
  } */
})
export const authApi = {
  getUser(email) {
    return instance.get('users?email=' + email)
  },
  setUser(data) {
    return instance.post('users', data)
  },
  logIn(email,password) {
    return instance.get(`users?email=${email}&password=${password}`)
  },
  getAuth() {
    //
  },
  logOut() {
    //
  },
  forbidden(email) {
    //
  },
  forgotPassword(email) {
    //
  },
  recoveryPassword(email, password) {
    //
  }
}
export const catalogApi = {
  getPages() {
    return instance.get('catalog?&sortBy=orderId')
  },
  delPage(id) {
    return instance.delete('catalog/' + id)
  },
  postPage(data) {
    return instance.post('catalog', data /*,  {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    } */)
  },
  changePageName(id, data) {
    return instance.patch('catalog/' + id, data)
  },
  sortPages(id, data) {
    return instance.patch('catalog/' + id, data)
  }
}
export const sectionsApi = {
  getSections(pageId) {
    return instance.get('sections')
  },
  delSection(pageId, id) {
    return instance.delete('sections/' + id)
  },
  postSection(pageId, data) {
    return instance.post('sections', data )
  },
  changeSectionTitle(pageId, id, data) {
    return instance.patch('sections/' + id, data)
  }
}
export const docsApi = {
  getDocs(pageId, ids) {
    let queryString = ids.map(item => 'sectionId[]=' + item).join("&")
    return instance.get(`docs?${queryString}&sortBy=orderId`)
  },
  delDoc(pageId, id) {
    return instance.delete('docs/' + id)
  },
  postDoc(pageId, data) {
    return instance.post('docs', data /*,  {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    } */)
  },
  changeDocName(pageId, id, data) {
    return instance.patch('docs/' + id, data)
  },
  changeDocDesc(pageId, id, data) {
    return instance.patch('docs/' + id, data)
  },
  sortDocs(pageId, id, data) {
    return instance.patch('docs/' + id, data)
  },
}
export const inviteApi = {
  getInviteLink(pageId) {
    return instance.get('invite/1')
  },
  setInviteLink(pageId, data) {
    return instance.patch('invite/1', data)
  },
  checkInviteLink(pageId, link) {
    return instance.get('invite?link=' + link)
  },
  getUsers(pageId) {
    return instance.get('inviteUsers')
  },
  setUser(pageId, data) {
    return instance.post('inviteUsers', data)
  },
  checkUser(pageId, email) {
    return instance.get('inviteUsers?email=' + email)
  },
  delUser(pageId, id) {
    return instance.delete('inviteUsers/' + id)
  },
}
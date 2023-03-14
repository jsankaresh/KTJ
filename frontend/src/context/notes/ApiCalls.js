const port=process.env.PORT
const host=`http://localhost:5000`;

async function getAllPublicPostApi() {
    const url=`${host}/api/posts/allPublicPosts`;
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
       
      } });
  
    return response.json();
  
  }

  async function getUserApi(token) {
    const url=`${host}/api/auth/getUser`;
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : `${token}`
      } });
  
    return response.json();
  
  }


  async function getProfileApi(id) {
    const url=`${host}/api/auth/getProfile/${id}`;
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
       
      } });
  
    return response.json();
  
  }

  async function getAllPrivatePostApi(auth) {
    const url=`${host}/api/posts/allPrivatePosts`;
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : `${auth}`
      } });
  
    return response.json();
  
  }

  async function deletePostApi(auth,id) {

    const url=`${host}/api/posts/deletePost/${id}`;
    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : `${auth}`
      } });
  
    return response.json();
  
  }




  async function selectMembersApi(auth,eventId,userId) {
      const url=`${host}/api/posts/select/${eventId}`
  const response = await fetch(url, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : `${auth}`
    },
   body: JSON.stringify({userId}) });

  return response.json();

}

async function removeMembersApi(auth,eventId,userId) {
  const url=`${host}/api/posts/remove/${eventId}`
const response = await fetch(url, {
method: 'PUT', 
headers: {
  'Content-Type': 'application/json',
  'auth-token' : `${auth}`
},
body: JSON.stringify({userId}) });

return response.json();

}

async function joinRequestApi(eventId,userId) {
  const url=`${host}/api/posts/requestJoin/${eventId}`
const response = await fetch(url, {
method: 'PUT', 
headers: {
  'Content-Type': 'application/json'
},
body: JSON.stringify({userId}) });

return response.json();

}







async function addPostApi(auth,name,requiredTeamMembers) {
    const url=`${host}/api/posts/addPost`
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : `${auth}`
    },
   body: JSON.stringify({name,requiredTeamMembers}) });

  return response.json();

}


async function loginApi(email,password) {
  const url=`${host}/api/auth/login`
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
   body: JSON.stringify({email,password}) });

  return response.json();

}


async function createUserApi(name,email,password,about) {
  const url=`${host}/api/auth/createUser`
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
   body: JSON.stringify({name,email,password,about}) });

  return response.json();

}


// async function postData(url = '', data = {}) {
//   const response = await fetch(url, {
//     method: 'POST', 
//     headers: {
//       'Content-Type': 'application/json'
//     },
//    body: JSON.stringify(data) });

//   return response.json();

// }











export {addPostApi,removeMembersApi,joinRequestApi,selectMembersApi,deletePostApi,getAllPrivatePostApi,getAllPublicPostApi,loginApi,createUserApi,getUserApi,getProfileApi};
export default getAllPublicPostApi
;



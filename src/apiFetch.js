const apiFetch = {};

/**
 * Creates a new user.
 *
 * @param {string} username
 * @param {string} email  
 * @return {JSON}
 */
apiFetch.createUser = async(username, email) => {
    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email
            })
        });

        if (!response.ok){
            throw new Error(`Error in creating user: ${response.status}`);
        }

        const data = await response.json();
        console.log('Here is the created user: ', data);
        return data;

    } catch(err){
        console.error("This is the error: ", err);
    };
};

/**
 * Deletes an existing user.
 *
 * @param id  
 * @return  
 */
apiFetch.deleteUser = async(id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`, { //!check id proper syntax
        //!possibly pass in username instead s
            method: 'DELETE'
        });

        if (!response.ok){
            throw new Error('Error in deleting user: ', response.error);
        }

        const data = await response.json();
        console.log('This is the deleted user: ', data);
        return data;

    } catch(err){
        console.error("THIS IS THE ERROR: ", err);
    }

};


/**
 * Returns all users.
 *
 * @return  
 */
apiFetch.getUsers = async() => {
    try {
        const response = await fetch('http://localhost:8080/api/users');

        if (!response.ok){
            throw new Error(`Failed to get users: ${response.status}`);
        }

        const data = await response.json();
        const userArr = data.map((user) => user.username);
        console.log('userArr in APIFetch: ' , userArr);
        
        return userArr;

    } catch(err){
        console.error("This is the getUser error: ", err);

    };
}; //!double check that deletion is successful


/**
 * Creates new chore.
 *
 * @param {string} task_name  
 * @param {string} type  
 * @return  
 */
apiFetch.createChore = async(task_name, type) => {
    try {
        const response = await fetch('http://localhost:8080/api/chores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_name,
                type
            })
        });

        if (!response.ok){
            throw new Error('Error in creating a chore: ', response.status);
        }

        const data = await response.json()
        console.log('This is the new chore (data): ', data);
        return data;

    } catch(err){
        console.error("This is the error, ", err);
    }
};

// assignChore
// apiFetch.assignChore = async(usersTurnIndex, chores) => {
//     // copy choresArr for mutations
//     const chores = [...choresArr]
//     // define an index to keep track of next user to assign
//     let userIndex = 0;
//     // iterate over chores array
//     for (let i = 0; i < chores.length - 1; i++) {
//         //with each iteration make a put request to the server 
//         //to assign the current chore to the user at index userIndex

//        try {

//        } catch {
       
       
//         //where's your special little function huh
//         // so because this functeion just mutates the same array like the HH we did we have to assign the chorelist to new array first

//     }}
   
//     try {

//     const response = await fetch('http://localhost:8080/api/assignChore', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             userId,
//             choreId
//         })
//     })

//     if (!response.ok){
//         throw new Error('Error in assigning chores ', response.error)
//     }

//     const data = await response.json()
//     console.log('This is the new assigned chore data: ', data);
//     return data;

//     } catch(err){
//         console.error('This is the error: ', err)
//     }
// };


/**
 * Deletes a chore.
 *
 * @param id  
 * @return  
 */
apiFetch.deleteChore = async(id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/chores/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok){
            throw new Error('Error in deleting chore: ', response.error)
        }

        const data = await response.json();
        console.log('This is the deleted chore: ', data)
        return data;


    } catch(err){
        console.error("THIS IS THE ERROR: ", err);
    }
}


/**
 * Returns all chores.
 *
 * @return {JSON}
 */
apiFetch.getChores = async() => {
    try {
        const response = await fetch('http://localhost:8080/api/chores'); 

        if (!response.ok) throw new Error(`Failed to get chores: ${response.status}`);

        const data = await response.json(); 
        return data;

    } catch(err){
        console.error("This is the getChore error: ", err);
    };
}



export default apiFetch;
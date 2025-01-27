import supabase from "@/services/supabase";

import { getImagePath } from "@/utils/helpers";
const url = import.meta.env.VITE_ENDPOINT_URL;

// todo: setup token at cookie and not in the localstorage
export async function login({ email, password }) {

    const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })

    });
    let { user: data, token, error } = await response.json();
    if (error)
        throw new Error(error.message);
    localStorage.setItem(`token`, JSON.stringify(`${token}`));
    const user = {
        id: data.id,
        email: data.email,
        user_metadata: {
            fullName: data.name,
            avatar: data.photo
        },
        created_at: data.created_at,
        updated_at: data.updated_at,
        last_sign_in_at: data.last_sign_in_at,
        role: data.role

    }
    return user;

}
// const username = data.user.identities?.[0]?.identity_data.fullName;
//done
export async function signUp({ user }) {
    const response = await fetch(`${url}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            passwordConfirm: user.passwordConfirm
        })
    })

    const { data, error } = await response.json();

    if (error) {
        throw Error(error.message);
    }

    return { user: data };

}
// for now I'll delete the token and it will be enough
export async function logout() {

    localStorage.removeItem("token")
}

export async function getUser() {

    const response = await fetch(`${url}/users/cur-user`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    const { data, error } = await response.json();
    if (error) {
        console.error(error.message);
        throw new Error("getUser: not getting user");
    }
    const user = {
        id: data.id,
        email: data.email,
        user_metadata: {
            fullName: data.name,
            avatar: data.photo
        },
        created_at: data.created_at,
        updated_at: data.updated_at,
        last_sign_in_at: data.last_sign_in_at,
        role: data.role

    }

    return user;

}
export async function updatePassword({ password }) {
    const response = await fetch(`${url}/users`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body: JSON.stringify({
            password
        })
    });
    const { data, error } = await response.json();
    if (error) {
        console.error(error.message);
        throw new Error(error.message)
    }
    return data;
}

export async function updateUserData({ updatedData }) {
    //  Accept data
    const { avatar, fullName, previousImage } = updatedData;

    /* await fetch(`${url}/users`, {
        method: "patch",
        headers: {
        },
        content: updatedData
    */

    //  get imagePath
    const { hasImagePath, imagePath, imageName } = getImagePath(avatar || previousImage, "avatars");


    // 4. generate a patch request
    const response = await fetch(`${url}/users`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body: JSON.stringify({
            fullName,
            photo: imagePath
        })
    })
    const { data, error } = await response.json();

    if (error) {
        // console.error(error.message);
        throw new Error(error.message);
    }



    // 4.  update for the second time.
    if (!hasImagePath) {
        const { error: imageError } = await supabase
            .storage
            .from('avatars')
            .upload(imageName, avatar);

        if (imageError) {
            const response = await fetch(`${url}/users`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`

                },
                body: JSON.stringify({
                    photo: previousImage
                })
            });
            console.error(imageError)
            throw new Error("updateUserData: error uploading Image");
        }
    }
    // 5. format update object to match the callers of this method
    const user = {
        id: data.id,
        email: data.email,
        user_metadata: {
            fullName: data.name,
            avatar: data.photo
        },
        created_at: data.created_at,
        updated_at: data.updated_at,
        last_sign_in_at: data.last_sign_in_at,
        role: data.role

    }
    return user;
}

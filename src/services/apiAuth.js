import supabase from "@/services/supabase";
import { getImagePath } from "@/utils/helpers";

export async function login({ email, password }) {

    let { data, error } = await supabase.auth.signInWithPassword({
        email, password
    });

    if (error)
        throw new Error(error.message);
    return data.user;

}
// const username = data.user.identities?.[0]?.identity_data.fullName;

export async function signUp({ user }) {
    if (!user.email || !user.password)
        throw Error("No email or password");


    let { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
            data: {
                fullName: user.fullName,
                avatar: ""

            }
        }
    });

    if (error) {
        console.error(error.message);
        throw Error("signUp: error");
    }

    console.log(data);
    return data;

}
export async function logout() {

    let { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error.message);
        throw Error("Logout: Error");
    }


}


export async function getUser() {

    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return null;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error(error.message);
        throw new Error("getUser: not getting user");
    }

    return data?.user;

}

export async function updatePassword({ password }) {
    const { data, error } = await supabase.auth.updateUser({
        password
    });
    if (error) {
        console.error(error.message);
        throw new Error("updatePassword: error")
    }
    console.log(data);
    return data;
}

export async function updateUserData({ updatedData }) {
    const { avatar, fullName, previousImage } = updatedData;

    const { hasImagePath, imagePath, imageName } = getImagePath(avatar||previousImage, "avatars");

    const { data, error } = await supabase.auth.updateUser({
        data: { fullName, avatar: imagePath }
    });



    if (error) {
        console.error(error);
        throw new Error("updateUserData: error")
    }



    if (!hasImagePath) {
        const { error: imageError } = await supabase
            .storage
            .from('avatars')
            .upload(imageName, avatar);

        if (imageError) {
            await supabase.auth.updateUser({
                data: { avatar: previousImage }
            });
            console.error(imageError)
            throw new Error("updateUserData: error uploading Image");
        }
    }
    

    return data;
}

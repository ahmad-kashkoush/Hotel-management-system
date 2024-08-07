import supabase from "@/services/supabase";

export async function login({ email, password }) {

    let { data, error } = await supabase.auth.signInWithPassword({
        email, password
    });

    if (error)
        throw new Error(error.message);
    return data.user;

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

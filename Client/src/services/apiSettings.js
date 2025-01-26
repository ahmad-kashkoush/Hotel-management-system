const url = import.meta.env.VITE_ENDPOINT_URL;


export async function getSettings() {
  const response = await fetch(`${url}/settings`);
  const { data, error } = await response.json();
  // const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const response = await fetch(`${url}/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSetting),
  });
  const {data, error}=await response.json();

  // const { data, error } = await supabase
  //   .from("settings")
  //   .update(newSetting)
  //   // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  //   .eq("id", newSetting.id)
  //   .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}

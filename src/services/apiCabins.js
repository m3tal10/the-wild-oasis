import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}- ${newCabin.image?.name}`.replace(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  //A) For creating
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) For updating
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  //02. Upload image if the image was provided.
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    //Delete the cabin if image upload was failed. Because, the cabin was already created before the image has been uploaded.
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Cabin image could not be saved.");
    }
    //https://prpaiwvligqiramoyipx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  }
  return data;
}

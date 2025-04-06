import supabase from "../../supabaseClient";

export const fetchPosts = async () => {
  try {
    const { data: fetchData, error: fetchError } = await supabase
      .from("Posts")
      .select("*, Users:uuid(displayName)");
    return fetchData || [];
  } catch (error) {
    console.error(error);
    setError(error);
  }
};

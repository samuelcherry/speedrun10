import supabase from "../../supabaseClient";

export const fetchComments = async (postId) => {
  if (!postId) {
    console.warn("fetchComments called without a valid postId");
    return [];
  }
  try {
    const { data: commentData, error: commentError } = await supabase
      .from("Comments")
      .select("*, Users:uuid(displayName)")
      .eq("postId", postId);

    return commentData || [];
  } catch (error) {
    console.error(error);
  }
};

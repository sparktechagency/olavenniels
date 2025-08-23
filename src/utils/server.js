// export const baseUrl = "http://10.10.20.54:5600";
export const baseUrl = "http://10.10.20.52:3000/api";
// export const baseUrl = "http://192.168.0.101:3000";
export const imageBaseUrl = "http://10.10.20.52:3000";

export const imageUrl = (image) => {
  return image
    ? image?.startsWith("http")
      ? image
      : image?.startsWith("/")
      ? `${imageBaseUrl}${image}`
      : `${imageBaseUrl}/${image}`
    : "https://placehold.co/178x200";
};

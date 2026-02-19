export const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    const json = await res.json();

    return json
  } catch (error) {
    console.log(error);
    return;
  }
}
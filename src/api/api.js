import axios from "axios";

export const getPeople = async (name, page) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://swapi.dev/api/people/",
      params: {
        search: name,
        page: page,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPeopleDetails = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://swapi.dev/api/people/${id}`,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

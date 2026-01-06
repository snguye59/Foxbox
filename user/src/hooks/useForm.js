import { useState } from "react";

export function useForm() {
  const [data, setData] = useState({});

  function handleFormInitialize(defaultData) {
    setData(defaultData);
  }

  function handleFormReset() {
    setData();
  }

  function handleInputChange(e) {
    const { type, name } = e.target;

    switch (type) {
      case "checkbox":
        const { checked } = e.target;
        return checked
          ? setData({ ...data, [name]: checked })
          : handleInputDelete(name);

      default:
        const { value } = e.target;
        return value
          ? setData({ ...data, [name]: value })
          : handleInputDelete(name);
    }
  }

  function handleInputDelete(name) {
    const updatedData = { ...data };
    delete updatedData[name];

    setData(updatedData);
  }

  function handleArrayElementDelete(arrayName, elementToRemove) {
    const updatedArray = data[arrayName].filter(
      (element) => element !== elementToRemove
    );

    setData({
      ...data,
      [arrayName]: updatedArray,
    });
  }

  return {
    data,
    handleFormReset,
    handleInputChange,
    handleFormInitialize,
    handleArrayElementDelete,
  };
}

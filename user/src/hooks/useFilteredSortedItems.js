import { useState, useEffect } from "react";
import { readTimestamp } from "src/helpers/time";
import { stringIncludesQuery } from "src/helpers/input";

export function useFilteredSortedItems(
  items,
  searchQuery,
  filterCriteria,
  sortCriteria
) {
  const { filteredBy, category, tag } = filterCriteria;
  const { sortedBy, sortedOrder } = sortCriteria;

  const [filteredSortedItems, setFilteredSortedItems] = useState([]);

  function isQueryRelevantToItem(item) {
    const { name, notes, attachments, category } = item;

    if (
      stringIncludesQuery(name, searchQuery) ||
      (notes && stringIncludesQuery(notes, searchQuery))
    ) {
      return true;
    }

    if (
      attachments &&
      attachments.some((attachment) =>
        stringIncludesQuery(attachment.name, searchQuery)
      )
    ) {
      return true;
    }

    const fieldsToCheck = {
      login: ["website", "username"],
      card: ["brand", "cardholder"],
      identity: [
        "title",
        "birthday",
        "firstName",
        "middleName",
        "lastName",
        "username",
        "company",
        "email",
        "phoneNumber",
        "address1",
        "address2",
        "city",
        "state",
        "country",
        "zip",
      ],
    };

    const categoryFields = fieldsToCheck[category] || [];

    return categoryFields.some(
      (field) => item[field] && stringIncludesQuery(item[field], searchQuery)
    );
  }

  function filterObject(sourceObject, filterCondition) {
    return Object.keys(sourceObject)
      .filter((key) => filterCondition(sourceObject[key], key))
      .reduce((filteredObject, key) => {
        filteredObject[key] = sourceObject[key];
        return filteredObject;
      }, {});
  }

  function filterItems(itemsToFilter) {
    const activeItems = filterObject(itemsToFilter, (item) => !item.isDeleted);

    switch (filteredBy) {
      case "favorites":
        return filterObject(activeItems, (item) => item.isFavorite);
      case "trash":
        return filterObject(itemsToFilter, (item) => item.isDeleted);
      case "category":
        return filterObject(activeItems, (item) => item.category === category);
      case "tag":
        return filterObject(activeItems, (item) => item.tags.includes(tag));
      default:
        return activeItems;
    }
  }

  function getItemSortValue(item, sortedBy) {
    const {
      name,
      timestamps: { createdAt, updatedAt },
    } = item;
    switch (sortedBy) {
      case "Name":
        return name.toLowerCase();
      case "Date Created":
        return readTimestamp(createdAt);
      case "Date Modified":
        return readTimestamp(updatedAt);
    }
  }

  function transformAndSortItems(itemsToSort) {
    let itemsArray = Object.keys(itemsToSort).map((key) => ({
      ...itemsToSort[key],
      id: key,
    }));

    return itemsArray.sort((a, b) => {
      const aValue = getItemSortValue(a, sortedBy);
      const bValue = getItemSortValue(b, sortedBy);

      let comparison = aValue > bValue ? 1 : -1;
      if (
        sortedOrder === "Z-A ordering" ||
        sortedOrder === "Newest First" ||
        sortedOrder === "Recently Modified"
      ) {
        comparison *= -1;
      }
      return comparison;
    });
  }

  useEffect(() => {
    let processedItems = filterObject(items, (item) =>
      isQueryRelevantToItem(item)
    );
    processedItems = filterItems(processedItems);
    processedItems = transformAndSortItems(processedItems);

    setFilteredSortedItems(processedItems);
  }, [items, searchQuery, filterCriteria, sortCriteria]);

  return filteredSortedItems;
}

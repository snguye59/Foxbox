import styles from "./CountriesMenu.module.css";
import Image from "next/image";
import { useState } from "react";
import { countriesData } from "src/data/countriesData";
import { stringIncludesQuery } from "src/helpers/input";
import { SearchInput } from "src/components/inputs";

const CountriesMenu = ({ onCountrySelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countriesData.filter((country) =>
    stringIncludesQuery(country.name, searchQuery)
  );

  return (
    <div className={styles.menu}>
      <SearchInput
        name="search"
        value={searchQuery}
        placeholder="Search"
        isBottomSquare
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={styles.lists}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => {
            const { name, icon } = country;

            return (
              <button
                type="button"
                key={name}
                className={styles.button}
                onClick={() => onCountrySelect(country)}
              >
                <Image src={icon} alt={name} width={24} height={24} />
                <p>{name}</p>
              </button>
            );
          })
        ) : (
          <div className={styles.text}>No matching country found 🦊</div>
        )}
      </div>
    </div>
  );
};

export default CountriesMenu;

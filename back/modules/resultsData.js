const abbreviations = [
  {
    country: "Albania",
    abbreviation: "al",
  },
  {
    country: "Armenia",
    abbreviation: "am",
  },
  {
    country: "Australia",
    abbreviation: "au",
  },
  {
    country: "Austria",
    abbreviation: "at",
  },
  {
    country: "Azerbaijan",
    abbreviation: "az",
  },
  {
    country: "Belarus",
    abbreviation: "by",
  },
  {
    country: "Belgium",
    abbreviation: "be",
  },
  {
    country: "Bosnia & Herzegovina",
    abbreviation: "ba",
  },
  {
    country: "Bulgaria",
    abbreviation: "bg",
  },
  {
    country: "Croatia",
    abbreviation: "hr",
  },
  {
    country: "Cyprus",
    abbreviation: "cy",
  },
  {
    country: "Czechia",
    abbreviation: "cz",
  },
  {
    country: "Denmark",
    abbreviation: "dk",
  },
  {
    country: "Estonia",
    abbreviation: "ee",
  },
  {
    country: "Finland",
    abbreviation: "fi",
  },
  {
    country: "France",
    abbreviation: "fr",
  },
  {
    country: "Georgia",
    abbreviation: "ge",
  },
  {
    country: "Germany",
    abbreviation: "de",
  },
  {
    country: "Greece",
    abbreviation: "gr",
  },
  {
    country: "Hungary",
    abbreviation: "hu",
  },
  {
    country: "Iceland",
    abbreviation: "is",
  },
  {
    country: "Ireland",
    abbreviation: "ie",
  },
  {
    country: "Israel",
    abbreviation: "il",
  },
  {
    country: "Italy",
    abbreviation: "it",
  },
  {
    country: "Latvia",
    abbreviation: "lv",
  },
  {
    country: "Lithuania",
    abbreviation: "lt",
  },
  {
    country: "Malta",
    abbreviation: "mt",
  },
  {
    country: "Moldova",
    abbreviation: "md",
  },
  {
    country: "Montenegro",
    abbreviation: "me",
  },
  {
    country: "Netherlands",
    abbreviation: "nl",
  },
  {
    country: "North Macedonia",
    abbreviation: "mk",
  },
  {
    country: "Norway",
    abbreviation: "no",
  },
  {
    country: "Poland",
    abbreviation: "pl",
  },
  {
    country: "Portugal",
    abbreviation: "pt",
  },
  {
    country: "Romania",
    abbreviation: "ro",
  },
  {
    country: "Russia",
    abbreviation: "ru",
  },
  {
    country: "San Marino",
    abbreviation: "sm",
  },
  {
    country: "Serbia",
    abbreviation: "rs",
  },
  {
    country: "Slovenia",
    abbreviation: "si",
  },
  {
    country: "Spain",
    abbreviation: "es",
  },
  {
    country: "Sweden",
    abbreviation: "se",
  },
  {
    country: "Switzerland",
    abbreviation: "ch",
  },
  {
    country: "Ukraine",
    abbreviation: "ua",
  },
  {
    country: "United Kingdom",
    abbreviation: "gb",
  },
  {
    country: "World",
    abbreviation: "wld",
  },
];

function Results(year, qualifiedCountries, nonQualifiedCountries) {
  this.year = year;
  this.qualifiedCountries = qualifiedCountries;
  this.nonQualifiedCountries = nonQualifiedCountries;
}

let time = 3;

module.exports = {
  abbreviations,
  Results,
  time,
};

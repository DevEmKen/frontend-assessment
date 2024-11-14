import React, { useState, useMemo } from "react";
import "./App.css";
import countries from "./countries";
import { Country } from "./countries";

type SortDirection = "asc" | "desc" | "none";

function App() {
  const [sortField, setSortField] = useState<keyof Country | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");

  const handleSort = (field: keyof Country) => {
    if (sortField === field) {
      switch (sortDirection) {
        case "none":
          setSortDirection("asc");
          break;
        case "asc":
          setSortDirection("desc");
          break;
        case "desc":
          setSortDirection("none");
          setSortField(null);
          break;
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCountries = useMemo(
    () =>
      countries.toSorted((a, b) => {
        if (!sortField || sortDirection === "none") return 0;

        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        const aString = String(aValue);
        const bString = String(bValue);

        return sortDirection === "asc"
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      }),
    [sortField, sortDirection]
  );

  const SortableHeader = ({ field, label }: { field: keyof Country; label: string }) => (
    <th onClick={() => handleSort(field)}>
      {label}{" "}
      {sortField === field &&
        (sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "")}
    </th>
  );

  return (
    <table>
      <thead>
        <tr>
          <SortableHeader field="country" label="Country" />
          <SortableHeader field="confirmed" label="Confirmed" />
          <SortableHeader field="recovered" label="Recovered" />
          <SortableHeader field="deaths" label="Deaths" />
          <SortableHeader field="population" label="Population" />
          <SortableHeader field="areaInSqKm" label="Area (km²)" />
          <SortableHeader field="lifeExpectancy" label="Life Expectancy" />
          <SortableHeader field="elevationMeters" label="Elevation (m)" />
          <SortableHeader field="continent" label="Continent" />
          <SortableHeader field="abbreviation" label="Abbreviation" />
          <SortableHeader field="location" label="Location" />
          <SortableHeader field="capitalCity" label="Capital City" />
          <SortableHeader field="lat" label="Latitude" />
          <SortableHeader field="lng" label="Longitude" />
        </tr>
      </thead>
      <tbody>
        {sortedCountries.map((country) => (
          <tr key={country.abbreviation}>
            <td>{country.country}</td>
            <td>{country.confirmed}</td>
            <td>{country.recovered}</td>
            <td>{country.deaths}</td>
            <td>{country.population}</td>
            <td>{country.areaInSqKm}</td>
            <td>{country.lifeExpectancy}</td>
            <td>{country.elevationMeters}</td>
            <td>{country.continent}</td>
            <td>{country.abbreviation}</td>
            <td>{country.location}</td>
            <td>{country.capitalCity}</td>
            <td>{country.lat}</td>
            <td>{country.lng}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;

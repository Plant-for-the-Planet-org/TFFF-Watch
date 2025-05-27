export default function Select() {
  return <></>;
}

const years = [2020, 2021, 2022, 2023, 2024, 2025];
export function YearSelect() {
  return (
    <select className="year-select rounded-full font-bold bg-white pl-4 pr-8 py-1 border border-base-gray outline-none">
      {years.map((el, key) => (
        <option key={key} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
}

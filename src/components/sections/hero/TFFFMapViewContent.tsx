export function PrimaryHeaderContent() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="flex gap-2 flex-wrap typo-p">
        <span className="grow text-center font-bold">
          Forest loss in <i>Tropical Forest Forever Facility</i> countries in
        </span>
        <span className="grow text-center">2024 ^</span>
      </h2>
      <p className="text-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl typo-p">
        % of eligible forest cover deforested or degraded in tropical forest
        countries according to the TFFF’s standards
      </p>
    </div>
  );
}

export function SecondaryHeaderContent() {}

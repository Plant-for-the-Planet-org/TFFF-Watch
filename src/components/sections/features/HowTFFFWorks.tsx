export default function HowTFFFWorks() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          How the{" "}
          <span className="text-green-600">
            Tropical Forest Forever Facility
          </span>{" "}
          would work
        </h1>
        <p className="text-gray-600 max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>

      {/* Mobile Layout (xs, sm) */}
      <div className="block md:hidden">
        {/* Investors Section */}
        <div className="border-2 border-dashed border-green-300 rounded-lg p-4 mb-6 bg-white">
          <h3 className="text-center font-semibold text-gray-700 mb-4">
            Investors
          </h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
              <div>
                <div className="font-semibold text-gray-800">Sponsors</div>
                <div className="text-xs text-gray-600">
                  (governments & foundations)
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
              <div>
                <div className="font-semibold text-gray-800">
                  Financial markets
                </div>
                <div className="text-xs text-gray-600">
                  (e.g. institutional investors, sovereign wealth funds,
                  endowments)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-6">
          <div className="w-0.5 h-8 bg-green-500"></div>
          <div className="absolute mt-6">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
          </div>
        </div>

        {/* Investment Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-xs text-gray-500 mb-1">JUNIOR DEBT</div>
            <div className="font-bold text-lg">$25bn invested</div>
            <div className="text-xs text-gray-600 mt-2">
              as long-dated concessional loans, grants or guarantees (min $1 bn
              for board seat)
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="text-xs text-gray-500 mb-1">SENIOR DEBT</div>
            <div className="font-bold text-lg">$100bn invested</div>
            <div className="text-xs text-gray-600 mt-2">
              as market-rate fixed income bonds
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-6">
          <div className="w-0.5 h-8 bg-green-500"></div>
          <div className="absolute mt-6">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
          </div>
        </div>

        {/* Investment Fund */}
        <div className="bg-white p-6 rounded-lg border mb-6 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-green-600 mb-2">
            Tropical Forest Investment Fund (TFIF)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            The fund, hosted by the <strong>World Bank</strong>, invests the{" "}
            <strong>$125 bn</strong> into capital markets with expected returns
            of
          </p>
          <div className="text-2xl font-bold text-green-600 mb-4">
            ~7.6% or ~$9.5 bn
          </div>
          <p className="text-xs text-gray-600">
            The fund will primarily invest in climate and sustainability-linked
            instruments (e.g., green, blue, or sustainable bonds) in
            ODA-eligible countries.
          </p>
        </div>

        {/* Returns Split */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">~2.7%</div>
            <div className="text-xs text-gray-600">
              remains after investor interest payments and goes to the TFFF
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">~4.9%</div>
            <div className="text-xs text-gray-600">
              interest payments to investors
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-6">
          <div className="w-0.5 h-8 bg-green-500"></div>
          <div className="absolute mt-6">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
          </div>
        </div>

        {/* TFFF */}
        <div className="bg-green-500 text-white p-6 rounded-lg text-center mb-6">
          <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-lg mb-2">
            Tropical Forest Forever Facility (TFFF)
          </h3>
          <p className="text-sm">also managed by the World Bank</p>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-6">
          <div className="w-0.5 h-8 bg-green-500"></div>
          <div className="absolute mt-6">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
          </div>
        </div>

        {/* Recipient Country */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
          <h3 className="text-center font-semibold text-gray-700 mb-2">
            Example recipient country
          </h3>
          <p className="text-center text-sm text-gray-600 mb-4">
            73 countries are potentially eligible
          </p>

          {/* Map placeholder */}
          <div className="w-full h-32 bg-green-200 rounded-lg mb-6"></div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded mt-1"></div>
              <div>
                <div className="font-semibold text-sm">
                  Minimum requirements
                </div>
                <div className="text-xs text-gray-600">
                  Countries with moist tropical broadleaf forest and an annual
                  deforestation rate below 0.5% can participate.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded mt-1"></div>
              <div>
                <div className="font-semibold text-sm">Discounts</div>
                <div className="text-xs text-gray-600">
                  For every hectare newly deforested, $400-$800 will be
                  deducted, depending on the scale of deforestation and $100 is
                  deducted for each hectare newly degraded.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full mt-1"></div>
              <div>
                <div className="font-semibold text-sm">Base payout</div>
                <div className="text-xs text-gray-600">
                  Every year, rainforest countries receive $4 for each hectare
                  of intact forest, as measured by satellite data.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded mt-1"></div>
              <div>
                <div className="font-semibold text-sm">Use of funds</div>
                <div className="text-xs text-gray-600">
                  • 20% of the received money shall go to the countrys
                  Indigenous People and Local Communities.
                  <br />• Rainforest countries are encouraged, but not required,
                  to spend the rest on conservation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (md and above) */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Investors Section */}
          <div className="border-2 border-dashed border-green-300 rounded-lg p-6 mb-8 bg-white relative">
            <h3 className="text-center font-semibold text-gray-700 mb-6">
              Investors
            </h3>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded"></div>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">
                    Sponsors
                  </div>
                  <div className="text-sm text-gray-600">
                    (governments & foundations)
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">
                    Financial markets
                  </div>
                  <div className="text-sm text-gray-600">
                    (e.g. institutional investors, sovereign wealth funds,
                    endowments)
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow pointing right */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-0.5 bg-green-500"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-l-green-500 border-t-transparent border-b-transparent"></div>
              </div>
            </div>
          </div>

          {/* Investment Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border relative">
              <div className="text-sm text-gray-500 mb-2">JUNIOR DEBT</div>
              <div className="font-bold text-2xl mb-4">$25bn invested</div>
              <div className="text-sm text-gray-600">
                as long-dated concessional loans, grants or guarantees (min $1
                bn for board seat)
              </div>

              {/* Arrow pointing down */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-0.5 h-8 bg-green-500"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border relative">
              <div className="text-sm text-gray-500 mb-2">SENIOR DEBT</div>
              <div className="font-bold text-2xl mb-4">$100bn invested</div>
              <div className="text-sm text-gray-600">
                as market-rate fixed income bonds
              </div>

              {/* Arrow pointing down */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-0.5 h-8 bg-green-500"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Fund */}
          <div className="bg-white p-8 rounded-lg border mb-8 text-center relative">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6"></div>
            <h3 className="font-bold text-green-600 text-xl mb-4">
              Tropical Forest Investment Fund (TFIF)
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              The fund, hosted by the <strong>World Bank</strong>, invests the{" "}
              <strong>$125 bn</strong> into capital markets with expected
              returns of
            </p>
            <div className="text-4xl font-bold text-green-600 mb-6">
              ~7.6% or ~$9.5 bn
            </div>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              The fund will primarily invest in climate and
              sustainability-linked instruments (e.g., green, blue, or
              sustainable bonds) in ODA-eligible countries.
            </p>

            {/* Arrow pointing down */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-8 bg-green-500"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
              </div>
            </div>
          </div>

          {/* Returns Split */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ~2.7%
              </div>
              <div className="text-sm text-gray-600">
                remains after investor interest payments and goes to the TFFF
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ~4.9%
              </div>
              <div className="text-sm text-gray-600">
                interest payments to investors
              </div>
            </div>
          </div>

          {/* TFFF */}
          <div className="bg-green-500 text-white p-8 rounded-lg text-center mb-8 relative">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-6"></div>
            <h3 className="font-bold text-2xl mb-4">
              Tropical Forest Forever Facility (TFFF)
            </h3>
            <p className="text-lg">also managed by the World Bank</p>

            {/* Arrow pointing down */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-8 bg-green-500"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500"></div>
              </div>
            </div>
          </div>

          {/* Success-based payouts text */}
          <div className="text-center mb-8">
            <div className="text-sm text-gray-600">
              Success-based payouts to rainforest countries
            </div>
          </div>

          {/* Recipient Country */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
            <h3 className="text-center font-semibold text-gray-700 text-xl mb-4">
              Example recipient country
            </h3>
            <p className="text-center text-gray-600 mb-8">
              73 countries are potentially eligible
            </p>

            {/* Map placeholder */}
            <div className="w-full h-64 bg-green-200 rounded-lg mb-8"></div>

            {/* Requirements Grid */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded mt-1"></div>
                  <div>
                    <div className="font-semibold text-lg mb-2">
                      Minimum requirements
                    </div>
                    <div className="text-sm text-gray-600">
                      Countries with moist tropical broadleaf forest and an
                      annual deforestation rate below 0.5% can participate.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded mt-1"></div>
                  <div>
                    <div className="font-semibold text-lg mb-2">Discounts</div>
                    <div className="text-sm text-gray-600">
                      For every hectare newly deforested, $400-$800 will be
                      deducted, depending on the scale of deforestation and $100
                      is deducted for each hectare newly degraded.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-semibold text-lg mb-2">
                      Base payout
                    </div>
                    <div className="text-sm text-gray-600">
                      Every year, rainforest countries receive $4 for each
                      hectare of intact forest, as measured by satellite data.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-500 rounded mt-1"></div>
                  <div>
                    <div className="font-semibold text-lg mb-2">
                      Use of funds
                    </div>
                    <div className="text-sm text-gray-600">
                      • 20% of the received money shall go to the countrys
                      Indigenous People and Local Communities.
                      <br />• Rainforest countries are encouraged, but not
                      required, to spend the rest on conservation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Dispatch, SetStateAction } from "react";
export type FilterState = {
  priceRange: [number, number];
  regions: string[];
  roasts: string[];
};
interface FilterSidebarProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}
const ALL_REGIONS = ['South America', 'Africa', 'Asia'];
const ALL_ROASTS = ['Light', 'Medium', 'Dark'];
export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };
  const handleRegionChange = (region: string) => {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };
  const handleRoastChange = (roast: string) => {
    setFilters((prev) => ({
      ...prev,
      roasts: prev.roasts.includes(roast)
        ? prev.roasts.filter((r) => r !== roast)
        : [...prev.roasts, roast],
    }));
  };
  return (
    <aside className="w-full lg:w-64 xl:w-72 space-y-8">
      <h2 className="text-3xl font-display font-bold text-brand-primary">Filters</h2>
      <Accordion type="multiple" defaultValue={['price', 'region', 'roast']} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-xl font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="px-1">
              <Slider
                min={10}
                max={30}
                step={1}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="region">
          <AccordionTrigger className="text-xl font-semibold">Region</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-3">
            {ALL_REGIONS.map((region) => (
              <div key={region} className="flex items-center space-x-2">
                <Checkbox
                  id={`region-${region}`}
                  checked={filters.regions.includes(region)}
                  onCheckedChange={() => handleRegionChange(region)}
                />
                <Label htmlFor={`region-${region}`} className="text-base">{region}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="roast">
          <AccordionTrigger className="text-xl font-semibold">Roast Level</AccordionTrigger>
          <AccordionContent className="pt-2 space-y-3">
            {ALL_ROASTS.map((roast) => (
              <div key={roast} className="flex items-center space-x-2">
                <Checkbox
                  id={`roast-${roast}`}
                  checked={filters.roasts.includes(roast)}
                  onCheckedChange={() => handleRoastChange(roast)}
                />
                <Label htmlFor={`roast-${roast}`} className="text-base">{roast}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
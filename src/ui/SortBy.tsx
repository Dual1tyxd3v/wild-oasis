import { ChangeEvent } from 'react';
import { SortOption } from '../types';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

type SortByProps = {
  options: SortOption[];
};

function SortBy({ options }: SortByProps) {
  const [params, setParams] = useSearchParams();
  const sortBy = params.get('sort') || options[0].value;

  function handleChange(e: ChangeEvent) {
    params.set('sort', (e.target as HTMLSelectElement).value);
    setParams(params);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={sortBy}
      type="white"
    />
  );
}

export default SortBy;

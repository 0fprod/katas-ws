import { CSVFilter } from '../src/CSVFilter';

describe('CSV filter', () => {
  const header = 'Num_Factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_Cliente, NIF_Cliente';
  it('allows correct lines', () => {
    const invoiceLine = '1,01/01/2020,100,100,21,,Product,A12345678,';
    const csvFilter = CSVFilter.create([header, invoiceLine]);
    
    expect(csvFilter.filteredLines).toEqual([header, invoiceLine]);
  })

  it('remove the line when IVA and IGIC are fulfilled', () => {
    const invoiceLine = '1,01/01/2020,100,100,21,7,Product,A12345678,';
    const csvFilter = CSVFilter.create([header, invoiceLine]);
    
    expect(csvFilter.filteredLines).toEqual([header]);
  })

  it('remove the line when IVA and IGIC are not fulfilled', () => {
    const invoiceLine = '1,01/01/2020,100,100,,,Product,A12345678,';
    const csvFilter = CSVFilter.create([header, invoiceLine]);
    
    expect(csvFilter.filteredLines).toEqual([header]);
  })

  it('remove the line when IVA or IGIC contains non decimal characters', () => { 
    const invoiceLine = '1,01/01/2020,100,100,IVA,,Product,A12345678,';
    const csvFilter = CSVFilter.create([header, invoiceLine]);
    
    expect(csvFilter.filteredLines).toEqual([header]);
  });
});
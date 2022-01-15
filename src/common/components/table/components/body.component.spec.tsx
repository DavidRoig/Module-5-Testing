import * as React from 'react';
import { Row } from 'react-table';
import { render } from '@testing-library/react';
import { BodyComponent } from './body.component';
import { RowComponent } from './row.component';
import { CellComponent } from './cell.component';
import { RowRendererProps } from '../table.vm';

describe('common/table/BodyComponent', () => {
  it('should render as expected', () => {
    // Arrange
    const TestRowComponent: React.FunctionComponent<RowRendererProps<Row>> = (
      props
    ) => (
      <RowComponent key={props.row.id}>
        <CellComponent>{props.row.testRow}</CellComponent>
      </RowComponent>
    );

    const props = {
      rows: [
        { getRowProps: jest.fn(), original: { testRow: 1, id: 1 } },
        { getRowProps: jest.fn(), original: { testRow: 2, id: 2 } },
        { getRowProps: jest.fn(), original: { testRow: 3, id: 3 } },
      ] as unknown as Row[],
      rowRenderer: TestRowComponent,
      prepareRow: jest.fn(),
    };

    // Act
    const { getByText } = renderBody(<BodyComponent {...props} />);

    // Assert
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });
});

const renderBody = (element: React.ReactChild) =>
  render(<table>{element}</table>);

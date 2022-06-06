import React from 'react';

type MatrixCellProps = {
    row: number;
    column: number;
    onChange: (data: { value: number; row: number; column: number }) => void;
};

class MatrixCell extends React.Component<MatrixCellProps> {
    render() {
        return (
            <input
                type="number"
                id="matrix-cell-input"
                defaultValue={0}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    this.props.onChange({
                        value: Number(ev.target.value),
                        row: this.props.row,
                        column: this.props.column,
                    })
                }
            />
        );
    }
}

export default MatrixCell;
